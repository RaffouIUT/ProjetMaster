import { useQRCode } from 'next-qrcode';
import React, { useEffect, useState } from 'react';
import { setTokenById } from '@/components/utils/coursUtils';
import { Button, Progress } from 'reactstrap';

import '@/components/custom.css';
import { TbHelp } from 'react-icons/tb';

interface Params {
    tempsMaxQr: number,
    coursId: string,
    setActualize: React.Dispatch<boolean>,
    actualize: boolean
}

export default function QrCode({ tempsMaxQr, coursId, setActualize, actualize } : Params) {

    const [code, setCode] = useState<boolean>(false)

    const [BuffTempsMaxQR, setBuffTempsMaxQR] = useState(tempsMaxQr);
    const [TempsQR, setTempsQR] = useState(tempsMaxQr);
    const [tokenQr, setTokenQr] = useState<string>('');

    const { SVG } = useQRCode();

    const toggleCode = () => { setCode(!code); }

    useEffect(() => {
        if (coursId)
            actualiserToken()
    }, [coursId]);

    setTimeout(() => {
        if (TempsQR > 0) {
          setTempsQR(TempsQR - 1);
        } else {
          setTempsQR(tempsMaxQr);
          setBuffTempsMaxQR(tempsMaxQr);
          actualiserToken();
          setActualize(!actualize);
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
            console.log("nouveau token : "+token);
        })
    }

    return (<>
        <div className={"flex flex-column align-items-center basis-1/8"}>
            <div className={"flex flex-row"}>
                <Button color={'secondary'} onClick={toggleCode}>Afficher le lien</Button>
                &nbsp;
                <span className={'align-content-center'}>
                    <TbHelp className={'cursor-help'}
                            title={"Si certains étudiants n'arrivent pas à scanner le QR code, cliquer sur le bouton pour afficher l'URL où ils doivent se rendre."} />
                </span>
            </div>
            <div className={'mt-4 w-5/6'}>
                <Progress value={(TempsQR / BuffTempsMaxQR) * 100} />
            </div>
        </div>
        {/* QR CODE */}
        <div className={'flex justify-center my-4 basis-5/8 svg-container'}>
            <SVG text={`${process.env.SERVER_URL}/etu/${coursId}/${tokenQr}`}
                options={{
                    errorCorrectionLevel: 'M',
                    margin: 0,
                    scale: 0,
                    color: {
                        dark: '#000000',
                        light: '#ffffff',
                    },
                }}
            />
        </div>
        <div className={"flex text-xl text-center justify-center basis-1/8"}>
            {code ? ( <>
                Lien pour s’inscrire :<br/>
                {`${process.env.SERVER_URL}/etu/${coursId}/${tokenQr}`}
            </>) : (<>
                Veuillez cliquer sur le bouton pour afficher le code
            </>)}
        </div>
    </>)
}