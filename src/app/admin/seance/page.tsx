import CalendarCustom from "@/components/calendar";

export default function Page()  {
    return (
        /* section gestion des séances du module intervenant */
        <section className="flex flex-row min-h-screen">
                <CalendarCustom />
        </section>
    );
}