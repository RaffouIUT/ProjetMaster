import Session from "@/components/session";

export default function Page() {

    return (
        <div className={"text-justify"}>
            <div className={"my-8 text-6xl w-screen text-center"}>Séléction<p>conférence</p></div>
            <div className={"grid grid-cols-3"}>
                <Session/>
            </div>
        </div>
    );
}