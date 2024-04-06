'use client';
import Image from "next/image";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import {Button} from "reactstrap";
import {fonctionConnexion} from "@/components/utils/connexionUtils";



export default function Page() {
    const router = useRouter();

    async function handleValiderClick () : Promise<void>{
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

        <div>
            <div className="flex mt-5 mb-32 justify-center"><Image src="/logoLMU.png" alt="logo" width={800} height={500}/></div>

            <div className="flex justify-center mt-10 mb-12">
                <div className="grid grid-cols-3 gap-4 items-center mr-4 text-right">

                    <div><p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mr-5">Login</p></div>
                    <div><input type="text" id="login" name="login" size={50} className="border border-black text-white-900 text-sm rounded-lg focus:ring-black focus:border-black-500 block w-full p-2.5"/></div>
                    <div>{/*IMAGE TUTO*/}</div>
                    <div><p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mr-5 ">Mot de passe</p></div>
                    <div><input type="password" id="pdw" name="pdw" size={50} className="border border-black text-white-900 text-sm rounded-lg focus:ring-black focus:border-black-500 block w-full p-2.5"/></div>

                </div>
            </div>
            <div className="flex items-center justify-center mt-5"><Button onClick={handleValiderClick} className="flex text-black hover:bg-primary-700 rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 leading-tight tracking-tight">Connexion </Button></div>

        </div>

    );
}

