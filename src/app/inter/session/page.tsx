'use client'
import ListeNom from "@/components/listenom";
import {useQRCode} from "next-qrcode";

export default function Page() {
    const { SVG } = useQRCode();

    return (
        <div className={"flex flex-row h-screen text-4xl"}>

            {/* Menu latéral gauche, boutons d'actions */}
            <div className={"w-1/4"}>
                <div className={"h-1/6 flex items-center ml-5"}>
                    <button className="flex text-black hover:bg-primary-700 rounded-lg text-xl px-5 py-2.5 text-center bg-gray-300 leading-tight tracking-tight">Ajouter étudiant </button>
                    <button className="ml-5 flex text-black hover:bg-primary-700 rounded-lg text-xl px-5 py-2.5 text-center bg-gray-300  leading-tight tracking-tight">?</button>
                </div>
                <div className={"m-4 bg-gray-500"}> PAGE OPTIONS</div>
            </div>

            {/* Partie centrale, QR CODE*/}
            <div className={"w-1/2"}>
                {/* 3 boutons centraux */}
                <div className={"h-1/6 items-center flex flex-row justify-center"}>
                    <button className="ml-5  flex text-black hover:bg-primary-700 rounded-lg text-xl px-5 py-2.5 text-center bg-gray-300  leading-tight tracking-tight">⚙️</button>
                    <button className="ml-5 flex text-black hover:bg-primary-700 rounded-lg text-xl px-5 py-2.5 text-center bg-gray-300  leading-tight tracking-tight">Afficher code</button>
                    <button className="ml-5 mr-5 flex text-black hover:bg-primary-700 rounded-lg text-xl px-5 py-2.5 text-center bg-gray-300  leading-tight tracking-tight">?</button>
                </div>
                {/* barre de chargement */}
                <div className={" flex flex-row justify-center"}>
                    <div className={"mt-4 w-5/6 h-1/6 bg-gray-500 text-center"}> BARRE DE CHARGEMENT</div>
                </div>
                {/* QR CODE */}
                <div className={"flex justify-center mt-4"}>
                    <SVG
                        text={'http://localhost:3000/inter/session'}
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
                <div className={"flex text-xl text-center justify-center"}>Code et lien pour s’inscrire :<br/>
                    https://inscription-cours.univ-lemans.fr<br/>
                    256318342
                </div>
            </div>

            {/* Partie droite, liste des étudiants */}
            <div className={"w-1/4 bg-gray-400"}>
                <div className={"h-1/6 items-center flex flex-row justify-center"}>LISTE NOMS ETU</div>
                <div className={"h-5/6 text-center max-h-full overflow-scroll "}><ListeNom/></div>
            </div>
        </div>
    );
}