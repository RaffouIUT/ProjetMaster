'use client'

import FullCalendar from "@fullcalendar/react";
import {CalendarApi, DateSelectArg, EventApi, EventClickArg, EventContentArg} from '@fullcalendar/core';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid"
import {createEventId, INITIAL_EVENTS} from "@/components/event-utils";
import React, {useState} from 'react'
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import {Props} from "next/script";


interface CalendarState {
    weekendsVisible: boolean
    currentEvents: EventApi[]
}

export default class CalendarCustom extends React.Component<Props, CalendarState> {

    calendarRef : {
        current: FullCalendar | null,
    };

    state: CalendarState = {
        weekendsVisible: true,
        currentEvents: []
    }

    constructor(props: Props) {
        super(props);

        this.calendarRef = React.createRef()
    }

    render () {
        return (
            <>
                {this.menuLateral()}
                <div className={"basis-5/7 p-3 min-h-full"}>
                    <FullCalendar
                        ref={this.calendarRef}
                        initialView="dayGridMonth"
                        plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        locale="fr"
                        editable={true}
                        selectable={true}
                        select={this.handleDateSelect}
                        weekends={this.state.weekendsVisible}
                        events={INITIAL_EVENTS}
                        eventContent={this.renderEventContent} // modification du rendu des events dans le calendrier
                        eventClick={this.handleEventClick}
                        eventsSet={this.handleEvents}
                        fixedWeekCount={false}
                        height="100%"/>
                </div>
            </>
        );
    }

    handleDateSelect = (selectInfo: DateSelectArg) => {
        /* fonction click sur une case */
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (title) {
            console.log(selectInfo)
            calendarApi.addEvent({
                id: createEventId(),
                title: title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                // allDay: selectInfo.allDay
                allDay: false,
                description: "intervenant"
            })
        }
    }

    handleEventClick = (clickInfo: EventClickArg) => {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
        }
    }

    handleEvents = (events: EventApi[]) => {
        this.setState({
            currentEvents: events
        })
    }

    menuLateral = () => {
        return (
            <div className={"basis-2/7 p-3 bg-sky-500/100 flex flex-col items-center"}>
                <button className={"w-96 bg-amber-500 my-2"}>Gérer données présence</button>
                <button className={"w-96 bg-amber-500 my-2"}>Paramètres</button>
                <this.Form_cours />
            </div>
        )
    }

    renderEventContent(eventContent: EventContentArg) {
        return (
            <>
                <b>{eventContent.timeText}</b>
                <i>&nbsp; {eventContent.event.title}</i><br/>
                <i>{eventContent.event.extendedProps.description}</i>
            </>
        )
    }

    handleSubmit = (e: any) => {
        e.preventDefault()
        let nom = e.target.nom_cours.value
        let datec = e.target.date_cours.value
        let salle = e.target.salle_cours.value
        let heure_deb = e.target.heure_deb_cours.value
        let heure_fin = e.target.heure_fin_cours.value
        let inter = e.target.inter_cours.value

        if (this.calendarRef.current != null) {
            let calApi: CalendarApi = this.calendarRef.current.getApi();

            calApi.addEvent({
                id: createEventId(),
                title: nom,
                start: datec + "T" + heure_deb + ":00",
                end: datec + "T" + heure_fin + ":00",
                allDay: false,
                description: "Salle :" + salle + "inter: " + inter
            })
        }

        // ajout bd
    }

    Form_cours = (data: any) => {

        const [modal, setModal] = useState(false);
        console.log(data)
        const toggle = () => setModal(!modal);

        return (
            <>
                <Button color="primary" className={"form-control my-2"} onClick={toggle}>
                    Ajouter un cours
                </Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Ajouter un cours</ModalHeader>
                    <ModalBody>
                        <Form className={"form"} onSubmit={event => this.handleSubmit(event)}>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for={"nomc"}>Nom du cours</Label>
                                        <Input id={"nomc"} name={"nom_cours"} type={"text"} value={data ? data.nom : ""}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for={"datec"}>Date du cours</Label>
                                        <Input id={"datec"} name={"date_cours"} type={"date"}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for={"sallec"}>Nom de la salle</Label>
                                        <Input id={"sallec"} name={"salle_cours"} type={"text"}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for={"heuredebc"}>Heure de début de cours</Label>
                                        <Input id={"heuredebc"} name={"heure_deb_cours"} type={"time"}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for={"interc"}>Nom de l'intervenant</Label>
                                        <Input id={"interc"} name={"inter_cours"} type={"select"}>
                                            <option>nom1</option>
                                            <option>nom2</option>
                                            <option>nom3</option>
                                            <option>nom4</option>
                                            <option>nom5</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for={"heurefinc"}>Heure de fin de cours</Label>
                                        <Input id={"heurefinc"} name={"heure_fin_cours"} type={"time"}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Button color="primary" className={"form-control"} type={"submit"}>
                                        Ajouter
                                    </Button>{' '}
                                </Col>
                                <Col md={6}>
                                    <Button color="secondary" className={"form-control"} onClick={toggle}>
                                        Annuler
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                    {/*<ModalFooter>*/}
                    {/*    */}
                    {/*</ModalFooter>*/}
                </Modal></>
        );
    }
};
