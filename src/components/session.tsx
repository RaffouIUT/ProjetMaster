export default function Session() {
    const liste = [];

    {/* à changer pour chercher les cours du prof dans la bdd */}
    for (let i = 0; i < 10; i++) {
        liste.push(
            <div
                className={"flex bg-gray-300 rounded-lg mx-4 my-4 justify-center justify-self-center text-center w-5/6 h-5/6 text-2xl"}>
                <button className={"w-full h-full hover:bg-primary-700  rounded-lg"}> Conference NOM_COURS <br/> nom_inter <br/> 01/01/2024 <br/> 16h30-17h30</button>
            </div>
        )
    }

    return (liste);
}