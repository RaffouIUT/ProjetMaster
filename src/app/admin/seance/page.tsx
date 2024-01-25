import Calendar from "@/components/calendar";

export default function Page()  {
    return (
        /* section gestion des séances du module intervenant */
        <section className="flex flex-row">
            {/* Menu latéral gauche, boutons d'actions */}
            <div className={"basis-2/7 p-3 bg-sky-500/100 flex flex-col items-center"}>
                <button className={"w-96 bg-amber-500 my-2"}>Gérer données présence</button>
                <button className={"w-96 bg-amber-500 my-2"}>Paramètres</button>
            </div>

            {/* Partie centrale, calendrier des séances */}
            <div className={"basis-5/7 p-3"}>
                <Calendar />
            </div>

        </section>
    );
}