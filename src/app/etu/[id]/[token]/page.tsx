'use client'
import { getTokenById } from '@/components/utils/coursUtils';
import { useEffect, useState } from 'react';

export default function Page({ params }: {
    params: {id: string, token: string}
}) {
    const [token, setToken] = useState<string>("");
    const [access, setAccess] = useState<boolean>(false);

    useEffect(() => {
        getTokenById(params.id).then((response) => {
            if(response != null) {
                setToken(response.tokenQrCode)
            }
        });
    }, []);

    useEffect(() => {
        console.log("token : "+token+" params.token : "+params.token)
        if(token === params.token) {
            setAccess(true);
        }
    }, [token])


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