'use client'
import { getCoursById, getTokenById } from '@/components/utils/coursUtils';
import { useEffect, useState } from 'react';
import {redirectToCas, validateTicket} from "@/components/casLogin";
import {useSearchParams} from "next/navigation";
import { Cours } from '@prisma/client';
import { CoursVide } from '@/components/utils/customTypes';

export default function Page({ params }: {
    params: {id: string, token: string}
}) {
    const [access, setAccess] = useState<boolean>(false);

    const [cours, setCours] = useState<Cours>(structuredClone(CoursVide));

    const useParams = useSearchParams();
    useEffect(() => {
        getCoursById(params.id).then((coursU) => {
            setCours(coursU)
            getTokenById(params.id).then((response) => {
                if(response != null) {
                    if(response.tokenQrCode === params.token) {
                        setAccess(true);
                        const paramTicket = useParams.get("ticket");
                        if (paramTicket == "" || paramTicket == null) {
                            redirectToCas(params.id, params.token)
                        } else {
                            validateTicket(coursU, params.token, paramTicket);
                        }
                    }
                }
            });
        })
    }, []);


    return (
        <div>
            {
                access ? (
                    <p>Accès accordé</p>
                ) : (
                    <p>Accès refusé</p>
                )
            }
        </div>
    );
}