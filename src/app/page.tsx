import Image from "next/image";
import db from "@/modules/db";
import { revalidatePath } from "next/cache";
import Button from "@/components/Button";

export default async function Page() {
    const posts = await db.post.findMany({orderBy: {createdAt: "desc"}})

    const generatePosts = async () => {
        'use server';
        
        await db.post.createMany({
            data: [
                {content: "Hello world"},
                {content: "Hello world"},
                {content: "Hello world"},
            ],                  
        });
        revalidatePath('/');
    };

    return (
        /*
        <div>
        <main>
            <div className="flex mt-5 mb-32 justify-center"><Image src="/logoLMU.png" alt="logo" width={800} height={500}/></div>

            <div className="flex justify-center mt-10 mb-12">
                <div className="grid grid-cols-3 gap-4 items-center mr-4 text-right">

                    <div><p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mr-5">Login</p></div>
                    <div><input type="text" id="login" name="login" size={50} className="border border-black text-white-900 text-sm rounded-lg focus:ring-black focus:border-black-500 block w-full p-2.5"/></div>
                    <div>{/*IMAGE TUTO}</div>
                    <div><p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mr-5 ">Mot de passe</p></div>
                    <div><input type="password" id="pdw" name="pdw" size={50} className="border border-black text-white-900 text-sm rounded-lg focus:ring-black focus:border-black-500 block w-full p-2.5"/></div>

                </div>
            </div>
            <div className="flex items-center justify-center mt-5"><button className="flex text-black hover:bg-primary-700 rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 leading-tight tracking-tight">Connexion </button></div>

        </div>*/
        <main className="flex min-h-screen flex-col p-24">
            <Button onClick={generatePosts}>Generate posts</Button>
            {posts.map((post) => (
                <div key={post.id}>{post.content}</div>
            ))}
        </main>
    );
}

