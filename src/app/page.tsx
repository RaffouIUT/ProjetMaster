import {Damion} from "next/dist/compiled/@next/font/dist/google";

export default function Page() {

    return (
        <div>
            <div className="flex mt-5 justify-center">
                <img src="/logoLMU.png" alt="logo"/>
            </div>

            <div className="flex items-center justify-center mt-10">
                <div className="grid grid-cols-2 gap-4">

                    <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mr-5">Login</p>
                    <input type="text" id="login" name="login" className="bg-white-50 border border-black text-white-900 text-sm rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2.5"/>
                    <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mr-5 ">Mot de passe</p>
                    <input type="password" id="pdw" name="pdw" className="bg-white-50 border border-black text-white-900 text-sm rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2.5"/>

                </div>
            </div>
            <div className="flex items-center justify-center mt-5">
                <button
                    className="flex text-black bg-primary-600 hover:bg-primary-700 rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 text-xl leading-tight tracking-tight text-gray-900">Connexion
                </button>
            </div>
        </div>
    );
}

