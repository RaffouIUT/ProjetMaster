'use client'
import { getTokenById } from '@/components/utils/coursUtils';
import { useEffect, useState } from 'react';
import {redirectToCas, validateTicket} from "@/components/casLogin";
import {useSearchParams} from "next/navigation";

export default function Page({ params }: {
    params: {id: string, token: string}
}) {
    const [access, setAccess] = useState<boolean>(false);

    const useParams = useSearchParams();
    useEffect(() => {
        getTokenById(params.id).then((response) => {
            if(response != null) {
                if(response.tokenQrCode === params.token) {
                    setAccess(true);
                    const paramTicket = useParams.get("ticket");
                    if (paramTicket == "" || paramTicket == null) {
                        redirectToCas(params.id, params.token)
                    } else {
                        validateTicket(params.id, params.token, paramTicket);
                    }
                }
            }
        });
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