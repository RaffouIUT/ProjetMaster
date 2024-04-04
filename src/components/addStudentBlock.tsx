import { ToastContainer } from 'react-toastify';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { Etudiant, Promotion } from '@prisma/client';
import { TbHelp } from 'react-icons/tb';
import { checkField } from '@/components/utils/calendarUtils';
import { addOrChangeEtu } from '@/components/utils/etuUtils';
import { notifyFailure, notifySuccess } from '@/components/utils/toastUtils';
import { EtudiantVide } from '@/components/utils/customTypes';

interface Params {
	promos: Promotion[],
	setActualize: React.Dispatch<React.SetStateAction<any>>,
	etudiant: Etudiant
}

export default function AddStudentBlock({ promos, setActualize, etudiant }: Params) {

	const [idEtu, setIdEtu] = useState<string>("");
	const [nomEtu, setNomEtu] = useState<string>("");
	const [prenomEtu, setPrenomEtu] = useState<string>("");
	const [promoIdEtu, setPromoIdEtu] = useState<string>("");
	const [idEtuDisabled, setIdEtuDisabled] = useState<boolean>(false);

	useEffect(() => {
		fillConstants(etudiant)
	}, [etudiant]);

	const addStudent = (e: any) => {
		e.preventDefault();

		if (checkField(idEtu, "idEtu") && checkField(nomEtu) && checkField(prenomEtu) && checkField(promoIdEtu)) {
			addOrChangeEtu({id: idEtu, nom: nomEtu, prenom: prenomEtu, promotionId: promoIdEtu }).then(() => {
				notifySuccess("L'étudiant a bien été ajouté ou modifié.");
				fillConstants(structuredClone(EtudiantVide));
				setActualize(true);
			}).catch(() => {
				notifyFailure("Erreur lors de l'ajout ou la modification de l'étudiant.")
			});
		}
	}

	const fillConstants = (etudiant: Etudiant) => {
		setIdEtu(etudiant.id)
		setNomEtu(etudiant.nom)
		setPrenomEtu(etudiant.prenom)
		setPromoIdEtu(etudiant.promotionId)

		setIdEtuDisabled(etudiant.id != "")
	}

	return (
		<section className={"mb-4 flex flex-row"}>
			<ToastContainer />
			<section className={"basis-2/3 mr-6"}>
				<h3>Ajouter un Etudiant</h3>
				<Form className={"form"} onSubmit={addStudent}>
					<Row>
						<Col md={2}>
							<FormGroup noMargin={true}>
								<Label for={'idInput'}>ID de l'étudiant</Label>
								<Input bsSize={"sm"} type="text" id={'idInput'} name="id_etu"
									   placeholder={'s123456'} value={idEtu}
									   disabled={idEtuDisabled}
									   onChange={e => setIdEtu(e.target.value)} />
							</FormGroup>
						</Col>
						<Col md={3}>
							<FormGroup noMargin={true}>
								<Label for={'nomInput'}>Nom de l'étudiant</Label>
								<Input bsSize={"sm"} type="text" id="nomInput" name="nom_etu"
									   placeholder={'Laurent'} value={nomEtu}
									   onChange={e => setNomEtu(e.target.value)} />
							</FormGroup>
						</Col>
						<Col md={3}>
							<FormGroup noMargin={true}>
								<Label for={'prenomInput'}>Prénom de l'étudiant</Label>
								<Input bsSize={"sm"} type="text" id={'prenomInput'} name="prenom_etu"
									   placeholder={'Antoine'} value={prenomEtu}
									   onChange={e => setPrenomEtu(e.target.value)}/>
							</FormGroup>
						</Col>
						<Col md={3}>
							<FormGroup noMargin={true}>
								<Label for={'promo'} className={'mr-2'}>Promotion </Label>
								<Input bsSize={"sm"} id={'promo'} name={'promo_etu'} type={'select'} value={promoIdEtu}
									   onChange={e => setPromoIdEtu(e.target.value)}  required>
									<option disabled value={''}>Sélectionner une promo</option>
									{promos.map((promo) => (
										<option value={promo.id} key={promo.id}>{promo.nom}</option>
									))}
								</Input>
							</FormGroup>
						</Col>
						<Col md={1} className={"align-content-end"}>
							<Button size={"sm"} color={'primary'} type="submit">Ajouter</Button>
						</Col>
					</Row>
				</Form>
			</section>
			<section className={"basis-1/3"}>
				<h3>Ou importer les étudiants depuis un fichier</h3>
				<Form className={"form"}>
					<Row>
						<Col md={10}>
							<FormGroup noMargin={true}>
								<p className={"flex flex-row mb-2"}>
									Importer depuis un fichier &nbsp;
									<span className={"align-content-center"}>
										<TbHelp className={"cursor-pointer"}  title={"Importer les étudiants depuis un fichier. Le fichier doit correspondre au format du fichier d'export d'umtice."} />
									</span>
								</p>
								<Input bsSize={"sm"} id="exampleFile" name="file" type="file" />
							</FormGroup>
						</Col>
						<Col md={2} className={"align-content-end"}>
							<Button size={"sm"} color={'primary'} type="button">Importer</Button>
						</Col>
					</Row>
				</Form>
			</section>
		</section>
	);
}