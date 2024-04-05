'use client';
import ProgressBar from '@/components/progressbar';
import { useQRCode } from 'next-qrcode';
import { useState } from 'react';
import { setTokenById } from '@/components/utils/coursUtils';
import { Button } from 'reactstrap';

interface Params {
  tempsMaxQr: number,
  coursId: string
}

export default function QrCode({ tempsMaxQr, coursId } : Params) {

    const [code, setCode] = useState<boolean>(false)

    const [BuffTempsMaxQR, setBuffTempsMaxQR] = useState(tempsMaxQr);
    const [TempsQR, setTempsQR] = useState(tempsMaxQr);
    const [tokenQr, setTokenQr] = useState<string>('');

    const { SVG } = useQRCode();

    const toggleCode = () => { setCode(!code); }

    setTimeout(() => {
        if(TempsQR > 0){
          setTempsQR(TempsQR - 1);
        }else{
          setTempsQR(tempsMaxQr);
          setBuffTempsMaxQR(tempsMaxQr);
          actualiserToken();
        }
    }, 1000);

    const generateToken = ():string => {
        let token:string = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 15; i++)
          token += possible.charAt(Math.floor(Math.random() * possible.length));
        return token;
    }

    const actualiserToken = () => {
        let token:string = generateToken();
        setTokenById(coursId, token).then(() => {
          setTokenQr(token);
        })
        console.log("nouveau token : "+token);
    }


    return (
        <section className={'basis-1/2'}>
            <div className={"text-center"}>
                <Button color={"secondary"} onClick={toggleCode}>Afficher code</Button>
            </div>
            {/* barre de chargement */}
            <div className={" flex flex-row justify-center"}>
                <div className={"mt-4 w-5/6 h-1/6 bg-gray-500 text-center rounded-md"}>
                    <ProgressBar progress={(TempsQR / BuffTempsMaxQR) * 100} />
                </div>
            </div>
            {/* QR CODE */}
            <div className={"flex justify-center mt-4"}>
                <SVG
                text={'http://umbriel.univ-lemans.fr/etu/' + coursId + '/' + tokenQr}
                options={{
                    errorCorrectionLevel: 'M',
                    margin: 0,
                    scale: 0,
                    width: 620,
                    color: {
                    dark: '#000000',
                    light: '#ffffff',
                    },
                }}
                />
            </div>
            <div className={"flex text-xl text-center justify-center"}>
                {code ? ( <>
                Code et lien pour s’inscrire :<br/>
                {'http://umbriel.univ-lemans.fr/etu/' + coursId + '/' + tokenQr}
                </>) : (<>
                Veuillez cliquer sur le bouton pour afficher le code
                </>)}
            </div>
        </section>
    )
}