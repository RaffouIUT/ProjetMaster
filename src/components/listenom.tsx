export default function Session({listeNom}: any) {
    const liste = [];

    for(const personne of listeNom){
        liste.push(
            <p>{personne}</p>
        )
    }

    return (liste);
}