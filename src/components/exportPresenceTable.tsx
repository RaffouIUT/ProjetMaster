import { Button } from 'reactstrap';
import React from 'react';
import jsPDF from 'jspdf';

export default function ExportPresenceTable() {

	const getContentFromCell = (cell: Element) => {
		if (cell.children.length == 0) {
			return "" + cell.textContent
		} else {
			let texte = "";
			for (let j = 0; j < cell.children.length; j++) {
				const enfant = cell.children.item(j)
				if (enfant instanceof HTMLButtonElement) {
					texte += enfant.textContent
				} else if (enfant instanceof HTMLSelectElement) {
					texte += enfant.value
				}
			}
			return texte
		}
	}

	const getTableHeaders = () => {
		let headers: string[][] = [[]]

		const headerHTMLTable = document.querySelectorAll<HTMLElement>("#tab-activite thead th")
		headerHTMLTable.forEach((th) => {
			headers[0].push(getContentFromCell(th))
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
				const cell: Element | null = cells.item(i);
				if (cell != null)
					dataRow.push(getContentFromCell(cell));
				else
					dataRow.push("")
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
		<>
			<Button color={"primary"} className={"mr-4"} onClick={exportToPdf}>Exporter en PDF</Button>
			<Button color={"primary"} onClick={exportToCsv}>Exporter en CSV</Button>
		</>
	)
}