'use client';

import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

import FullCalendar from '@fullcalendar/react';
import { DateSelectArg, EventClickArg, EventContentArg, EventInput } from '@fullcalendar/core';
import { EventImpl } from '@fullcalendar/core/internal';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';

import { FormCours, FormCoursVide, InterReduit } from '@/components/utils/customTypes';
import { addSeance, deleteSeance, getSeances, updateSeance } from '@/components/utils/coursUtils';
import { getAllInter } from '@/components/utils/interUtils';
import '@/components/custom.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Promotion } from '@prisma/client';
import { getAllPromo } from '@/components/utils/promotionUtils';

export default function CalendarCustom()  {

    const [calendarRef, setCalendar] = useState<FullCalendar>();

    const [modal, setModal] = useState(false);

    const [formData, setFormData] = useState<FormCours>(structuredClone(FormCoursVide));

    const [cours, setCours] = useState<EventInput[]>([]);

    const [inters, setInters] = useState<InterReduit[]>([]);

    const [promos, setPromos] = useState<Promotion[]>([]);

    const [actualize, setActualize] = useState(true);

    const notifySuccess = (message: string) => toast.success(message);

    const notifyFailure = (message: string) => toast.error(message)

    const toggle = () => setModal(!modal);

    useEffect(() => {
        /**
         * Permet de pas faire des requêtes comme un porc, pour pas que ça lag
         * La dépendance "actualize" permet d'executer useEffect uniquement quand la valeur de actualize est modifiée
         * Le if permet de faire la requête que quand on demande une actualisation (2 fois moins de requêtes)
         */
        if (actualize) {
            getSeances().then((liste) => {
                setCours(liste);
                setActualize(false)
            });
        }

    }, [actualize]);

    useEffect(() => {
        /**
         * La dépendance liste vide [] permet de n'exécuter le code QU'UNE SEULE FOIS
         * de ce que j'ai compris, en mode developpement c'est exec 2 fois avec []
         */
        getAllInter().then((liste) => {
            setInters(liste);
        });
        getAllPromo().then((liste) => {
            setPromos(liste)
        });
    }, []);

    const handleDateSelect = (dateSelected: DateSelectArg | null) => {
        /**
         * Ouvre le popup pour ajouter un cours
         * Si on sélectionne une date, le formulaire est pré-rempli
         * Sinon, le formulaire est vide
         */
        let defaultForm = structuredClone(FormCoursVide);

        if (dateSelected != null) {
            const currentView = calendarRef?.getApi().view;

            switch (currentView?.type) {
                case "dayGridMonth":
                    defaultForm.date = dateSelected.startStr
                    break;

                case "timeGridWeek":
                case "timeGridDay":
                    defaultForm.date = dateSelected.startStr.split("T")[0]
                    defaultForm.heureDeb = dateSelected.startStr.split("T")[1].slice(0, 5)
                    defaultForm.heureFin = dateSelected.endStr.split("T")[1].slice(0, 5)
                    break;

                default:
                    break;
            }
        }

        setFormData(defaultForm);
        toggle()
    }

    const handleEventClick = (clickInfo: EventClickArg)=> {
        /**
         * Fonction qui s'exécute lorsqu'on clique sur un événement du calendrier
         * On remplit le formulaire et on ouvre la modale
         */
        const event: EventImpl = clickInfo.event;

        let formCours: FormCours = {
            id: event.id,
            nom: event.title,
            date: event.startStr.split("T")[0],
            salle: event.extendedProps.salle,
            heureDeb: event.startStr.split("T")[1].slice(0, 5),
            heureFin: event.endStr.split("T")[1].slice(0, 5),
            intervenant: event.extendedProps.intervenant,
            promo: event.extendedProps.promo
        }

        setFormData(formCours);
        toggle();
    }

    const renderEventContent = (eventContent: EventContentArg) => {
        // Change l'affichage des cours en fonction de la vue (mois, semaine, jour)
        const currentView = calendarRef?.getApi().view;

        switch (currentView?.type) {
            case "dayGridMonth":
                return (
                    <>
                        <p className={"m-0"}>
                            <b>{eventContent.timeText}</b>
                            <i>&nbsp; {eventContent.event.title} - {eventContent.event.extendedProps.promo.nom}</i>
                        </p>
                        <p className={"m-0"}>
                            <i>Salle : {eventContent.event.extendedProps.salle}</i>
                        </p>
                        <p className={'m-0'}>
                            <i>Intervenant : {eventContent.event.extendedProps.intervenant.prenom} {eventContent.event.extendedProps.intervenant.nom}</i>
                        </p>
                    </>
                )
            case "timeGridWeek":
            case "timeGridDay":
            default:
                return (
                    <>
                        <p className={'m-0'}>
                            <b>{eventContent.timeText}</b>
                            <i>&nbsp; {eventContent.event.title}</i>
                            <i> - Salle : {eventContent.event.extendedProps.salle}</i>
                            <i> - Intervenant : {eventContent.event.extendedProps.intervenant.prenom} {eventContent.event.extendedProps.intervenant.nom}</i>
                        </p>
                    </>
                )
        }
    }

    const checkField = (data: string, typeField: string = "text") : boolean => {
        switch (typeField) {
            case "date":
                return !!(data && data.trim().length > 0 &&
                    data.trim().match(/^\d{4}-\d{2}-\d{2}$/));

            case "time":
                return !!(data && data.trim().length > 0 &&
                    data.trim().match(/^\d{2}:\d{2}$/));

            case "text":
            default:
                return !!(data && data.trim().length > 0);
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const nom = e.target.nom_cours.value
        const datec = e.target.date_cours.value
        const salle = e.target.salle_cours.value
        const heure_deb = e.target.heure_deb_cours.value
        const heure_fin = e.target.heure_fin_cours.value
        const interId = e.target.inter_cours.value
        const promoId = e.target.promo_cours.value

        if (calendarRef != null && checkField(nom) && checkField(salle) && checkField(promoId) && checkField(interId)
            && checkField(datec, "date") && checkField(heure_deb, "time") && checkField(heure_fin, "time")){

            if (heure_deb != heure_fin) {
                let newCours: FormCours = {
                    id: '',
                    nom: nom,
                    date: datec,
                    salle: salle,
                    intervenant: { id: interId, nom: '', prenom: '', mail: '', login: '' },
                    promo: { id: promoId, nom: '', abreviation: '' },
                    heureDeb: heure_deb,
                    heureFin: heure_fin
                };

                // Ajout ou mise à jour de la séance dans la base de données
                if (formData.id == '') {
                    // Si le formulaire était vide quand on a chargé la modale, alors le cours vient d'être crée
                    addSeance(newCours).then(() => {
                        setActualize(true)
                        notifySuccess("Le cours a bien été ajouté !")
                        toggle();
                    }).catch((e: any) => {
                        notifyFailure("Erreur lors de l'insertion BD.");
                        console.log(e);
                    })
                } else {
                    // Sinon, on modifie un cours déjà enregistré
                    newCours.id = formData.id;
                    updateSeance(newCours).then(() => {
                        setActualize(true)
                        notifySuccess("Le cours a bien été modifié !")
                        toggle();
                    }).catch((e: any) => {
                        notifyFailure("Erreur lors de l'insertion BD.");
                        console.log(e);
                    })
                }
            } else {
                notifyFailure("L'heure de début et de fin doit être différente.")
            }

        } else {
            notifyFailure("Erreur de saisie dans le formulaire.")
        }
    }

    const handleRemoveOrCancel = () => {
        if (formData.id != '') {
            if (confirm("Etes-vous sûr de supprimer cette séance ?")) {
                deleteSeance(formData.id).then(() => {
                    setActualize(true)
                    notifySuccess("Le cours a bien été supprimé !")
                    toggle();
                }).catch((e: any) => {
                    notifyFailure("Erreur lors de la suppression en BD.");
                    console.log(e);
                })
            }
        } else {
            toggle()
        }
    }

    const Form_cours = () => {
        return (
            <>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Ajouter un cours</ModalHeader>
                    <ModalBody>
                        <Form className={"form"} onSubmit={event => handleSubmit(event)}>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for={"nomc"} className={"required"}>Nom du cours</Label>
                                        <Input id={"nomc"} name={"nom_cours"} type={"text"} defaultValue={formData.nom} required/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for={"datec"} className={"required"}>Date du cours</Label>
                                        <Input id={"datec"} name={"date_cours"} type={"date"} defaultValue={formData.date} required/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for={"sallec"} className={"required"}>Nom de la salle</Label>
                                        <Input id={"sallec"} name={"salle_cours"} type={"text"} defaultValue={formData.salle} required/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for={"heuredebc"} className={"required"}>Heure de début de cours</Label>
                                        <Input id={"heuredebc"} name={"heure_deb_cours"} type={"time"} defaultValue={formData.heureDeb} required/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for={"promoc"} className={"required"}>Promotion</Label>
                                        <Input id={"promoc"} name={"promo_cours"} type={"select"} defaultValue={formData.promo.id} required>
                                            {promos.map((promo) => (
                                                <option value={promo.id} key={promo.id}>{promo.nom}</option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for={"heurefinc"} className={"required"}>Heure de fin de cours</Label>
                                        <Input id={"heurefinc"} name={"heure_fin_cours"} type={"time"} defaultValue={formData.heureFin} required/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for={"interc"} className={"required"}>Nom de l'intervenant</Label>
                                        <Input id={'interc'} name={'inter_cours'} type={'select'}
                                               defaultValue={formData.intervenant.id} required>
                                            {inters.map((inter) => (
                                                <option value={inter.id} key={inter.id}>{inter.prenom} {inter.nom}</option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Button color="primary" className={"form-control"} type={"submit"}>
                                        {formData.id == '' ? "Ajouter" : "Modifier"}
                                    </Button>{' '}
                                </Col>
                                <Col md={6}>
                                    <Button color={formData.id == '' ? "secondary" : "danger"} className={"form-control"} onClick={handleRemoveOrCancel}>
                                        {formData.id == '' ? "Annuler" : "Supprimer"}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        );
    }

    const menuLateral = () => {
        return (
            <div className={"basis-1/4 p-3 flex flex-col items-center"}>
                <Button color="primary" className={"form-control my-2"} onClick={() => handleDateSelect(null)}>
                    Ajouter un cours
                </Button>
                <Button color="secondary" className={"form-control my-2"}>Gérer données présence</Button>
                <Button color="secondary" className={"form-control my-2"}>Paramètres</Button>
                <Form_cours />
            </div>
        )
    }

    return (
        <>
            {menuLateral()}
            <div className={"basis-3/4 p-3 min-h-full"}>
                <FullCalendar
                    // @ts-ignore
                    ref={setCalendar}
                    initialView="dayGridMonth"
                    timeZone={'UTC'}
                    plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    buttonText={{
                        today: "Aujourd'hui",
                        month: "mois",
                        week: "semaine",
                        day: "jour"
                    }}
                    locale="fr"
                    selectable={true}
                    select={handleDateSelect}
                    weekends={false}
                    events={cours}
                    eventContent={renderEventContent} // modification du rendu des events dans le calendrier
                    eventClick={handleEventClick}
                    eventDisplay={'block'}
                    fixedWeekCount={false}
                    height="100%"/>
            </div>
        </>
    );
};
