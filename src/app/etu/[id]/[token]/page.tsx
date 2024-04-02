'use client'
import { getTokenById } from '@/components/utils/coursUtils';
import { useEffect, useState } from 'react';
import {redirectToCas, validateTicket} from "@/components/casLogin";
import {useSearchParams} from "next/navigation";

export default function Page({ params }: {
    params: {id: string, token: string}
}) {
    const [access, setAccess] = useState<boolean>(false);

    useEffect(() => {
        console.log(params.id, params.token)
        getTokenById(params.id).then((response) => {
            if(response != null) {
                console.log(response.tokenQrCode, params.token)
                if(response.tokenQrCode === params.token) {
                    setAccess(true);
                    redirectToCas(params.id, params.token).then( r => {
                        const paramticket: string = "" + useSearchParams().get("ticket")
                        validateTicket(params.id, params.token, paramticket).then(r => console.log(r));
                    });
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