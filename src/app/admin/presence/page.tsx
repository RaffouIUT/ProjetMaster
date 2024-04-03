'use client';
import React, { useEffect, useState } from 'react';
import { Cours, Promotion } from '@prisma/client';
import { getAllPromo } from '@/components/utils/promotionUtils';
import { getInscriptionsByPromoId } from '@/components/utils/inscriptionsUtils';
import { Button, Input, Label, Table } from 'reactstrap';
import { PresenceEtuCours } from '@/components/utils/customTypes';
import { getAllCoursByPromoId } from '@/components/utils/coursUtils';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import NavBarAdmin from '@/components/navBarAdmin';

export default function Page() {

    const [promos, setPromos] = useState<Promotion[]>([]);

    const [selectedPromoId, setSelectedPromoId] = useState<string>('');

    const [inscriptions, setInscriptions] = useState<PresenceEtuCours[]>([]);

    const [cours, setCours] = useState<Cours[]>([]);

    useEffect(() => {
        getInscriptionsByPromoId(selectedPromoId).then((inscriptions) => {
            setInscriptions(inscriptions);
        });
        getAllCoursByPromoId(selectedPromoId).then((cours) => {
            setCours(cours);
        })

    }, [selectedPromoId]);

    useEffect(() => {
        getAllPromo().then((promos) => {
            setPromos(promos);
        });
    }, []);

    const handlePromo = (elem:  React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPromoId(elem.target.value);
    }

    const getTableHeaders = () => {
        let headers: string[][] = [[]]

        const headerHTMLTable = document.querySelectorAll<HTMLElement>("#tab-activite thead th")
        headerHTMLTable.forEach((th) => {
            headers[0].push("" + th.textContent)
        });
        return headers;
    }

    const getTableData = () => {
        let data: string[][] = [];
        const HTMLTableRows = document.querySelectorAll<HTMLElement>("#tab-activite tbody tr")
        HTMLTableRows.forEach((row) => {
            let cells = row.children;
            let dataRow: string[] = []
            for (let i = 0; i < cells.length; i++) {
                dataRow.push("" + cells.item(i)?.textContent)
            }
            data.push(dataRow)
        });
        return data;
    }

    const getTableTitle = (): string => {
        let select = document.querySelector<HTMLSelectElement>("#promo");
        return `${select?.selectedOptions[0].textContent}`;
    }

    const exportToPdf = () => {
        const promo_name = getTableTitle()
        const marginLeft = 40;
        const doc = new jsPDF("portrait", "pt", "A4");
        const title = "Feuille de présence - " + promo_name;

        let content = {
            startY: 50,
            head: getTableHeaders(),
            body: getTableData()
        };

        doc.text(title, marginLeft, 40);
        doc.setFontSize(15);

        // @ts-ignore
        doc.autoTable(content);
        doc.save(`feuille_presence_${promo_name.replace(" ", "_")}.pdf`);
    }

    const exportToCsv = () => {
        const headers = getTableHeaders();
        const data = getTableData();

        let csv = headers.join(",") + "\n";

        const tmp: string[] = []
        data.map((user) => tmp.push(user.join(",")))
        csv += tmp.join("\n");

        let hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = `feuille_presence_${getTableTitle().replace(" ", "_")}.csv`;
        hiddenElement.click();
    }

    return (
        /* section gestion des séances du module administrateur */
        <section className={"flex flex-column min-h-screen"}>
            <NavBarAdmin presence={false}/>
            <section className={"p-4"}>
                <section className={"flex flex-row items-center"}>
                    <div className={"basis-1/5 flex flex-row items-center"}>
                        <Label for={"promo"} className={"my-0 mr-2"}>Promotion </Label>
                        <Input id={"promo"} name={"promo_cours"} type={"select"} onChange={handlePromo} defaultValue={""} required>
                            <option disabled value={""}>Sélectionner une promo</option>
                            {promos.map((promo) => (
                                <option value={promo.id} key={promo.id}>{promo.nom}</option>
                            ))}
                        </Input>
                    </div>
                    <div className={"basis-1/5 mx-3"}>
                        <Button color={"primary"} className={"mr-4"} onClick={exportToPdf}>Exporter en PDF</Button>
                        <Button color={"primary"} onClick={exportToCsv}>Exporter en CSV</Button>
                    </div>
                </section>
                <hr/>
                <section>
                    <Table id={"tab-activite"}>
                        <thead>
                            <tr>
                                <th>Cours</th>
                                {cours.map((cours) => (
                                    <th className={"text-center"} key={cours.id}>{cours.dateDebut.toLocaleDateString("fr-FR")}</th>
                                ))}
                                <th className={"text-center"}>Total présence</th>
                            </tr>
                        </thead>
                        <tbody>
                        {inscriptions.map((inscription) => (
                            <tr key={inscription.etudiant.id}>
                                <th scope={"row"}>{inscription.etudiant.nom} {inscription.etudiant.prenom}</th>
                                {inscription.cours.map((presenceCours) => (
                                    <td className={"text-center"} key={presenceCours.cours.id + "-" + inscription.etudiant.id}>{presenceCours.present ? "présent" : "absent"}</td>
                                ))}
                                <td className={"text-center"}>{inscription.total} / {cours.length}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </section>
            </section>
        </section>
    );
}