import Session from "@/components/session";

export default function Page() {
    const liste = [];

    for (let i = 0; i < 10; i++) {
        liste.push(<Session/>)
    }

    return (
        <div className={"text-justify"}>
            <div className={"my-8 text-6xl w-screen text-center"}>Séléction<p>conférence</p></div>
            <div className={"grid grid-cols-3"}>
                {liste}
            </div>
        </div>
    );
}