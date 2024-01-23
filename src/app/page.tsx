import {Damion} from "next/dist/compiled/@next/font/dist/google";

export default function Page() {

    return (
        <div>
            <div className="flex mt-5 justify-center">
                <img src="/logoLMU.png" alt="logo"/>
            </div>

            <div className="flex items-center justify-center mt-10">
                <div className="grid grid-cols-2 gap-4">

                    <div><p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mr-5">Login</p></div>
                    <div><input type="text" id="login" name="login" className="bg-white-50 border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/></div>
                    <div><p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mr-5 ">Mot de passe</p></div>
                    <div><input type="password" id="pdw" name="pdw" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/></div>


                </div>

            </div>
            <div className="flex items-center justify-center mt-5">
                <button
                    className="flex text-black bg-primary-600 hover:bg-primary-700 rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700">Connexion
                </button>
            </div>
        </div>
    );
}

