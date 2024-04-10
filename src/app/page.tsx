'use client';
import Image from "next/image";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Button, Input } from 'reactstrap';
import {fonctionConnexion} from "@/components/utils/connexionUtils";

export default function Page() {
    const router = useRouter();

    async function connexion () : Promise<void>{
        const login = (document.getElementById('login') as HTMLInputElement).value;
        const pdw = (document.getElementById('pdw') as HTMLInputElement).value;
        console.log(login, pdw)
        
        const [user,value] = await fonctionConnexion(login, pdw);
        if(user === undefined || user === '') {
            alert('Login ou mot de passe incorrect');
            return ;
        }else if(user === 'inter') {
            Cookies.set('authInter', value);
            router.push('/');
        }else if(user === 'admin') {
            Cookies.set('authAdmin', value);
            router.push('/');
        }
        return ;
    }


    return (
        <section className={"p-4 flex flex-column align-items-center"}>
            <div className="flex mb-20 justify-center">
                {/*<Image src="/logoLMU.png" alt="logo" width={800} height={500}/>*/}
                <Image src={'/logoLMU.png'} alt={"Logo de l'université"} width={0} height={0}
                       sizes="70vw" className={"w-auto h-100"}
                />
            </div>
            <h1>Gestion des présences</h1>
            <div className="flex justify-center mt-10 mb-12">
                <div className="grid grid-cols-3 gap-4 items-center mr-4 text-right">
                    <h4>Login</h4>
                    <Input type="text" id="login" name="login" bsSize={"lg"} className={"col-span-2"}/>
                    <h4>Mot de passe</h4>
                    <Input type="password" id="pdw" name="pdw" bsSize={"lg"} className={"col-span-2"}/>
                    <div></div>
                    <Button onClick={connexion} color={"primary"}>Connexion </Button>
                </div>
            </div>
        </section>
    );
}

