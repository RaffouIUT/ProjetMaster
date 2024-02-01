export default function Session() {
    const liste = [];

    {/* à changer pour chercher les cours du prof dans la bdd */}
    for (let i = 0; i < 60; i++) {
        liste.push(
            <p className={"text-3xl"}> NOM{i} Prénom{i}</p>
        )
    }

    return (liste);
}