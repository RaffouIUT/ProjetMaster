'use client';

import '@/components/custom.css';
import { FormCours } from '@/components/utils/customTypes';
import { DateSelectArg, EventContentArg, ViewApi } from '@fullcalendar/core';
import React from 'react';

export const fillForm = (type: string, defaultForm: FormCours, date: DateSelectArg) => {
    switch (type) {
        case "dayGridMonth":
            defaultForm.date = date.startStr
            break;

        case "timeGridWeek":
        case "timeGridDay":
            defaultForm.date = date.startStr.split("T")[0]
            defaultForm.heureDeb = date.startStr.split("T")[1].slice(0, 5)
            defaultForm.heureFin = date.endStr.split("T")[1].slice(0, 5)
            break;

        default:
            break;
    }

    return defaultForm
}

export const checkField = (data: string, typeField: string = "text") : boolean => {
    switch (typeField) {
        case "date":
            return !!(data && data.trim().length > 0 &&
                data.trim().match(/^\d{4}-\d{2}-\d{2}$/));

        case "time":
            return !!(data && data.trim().length > 0 &&
                data.trim().match(/^\d{2}:\d{2}$/));

        case "idEtu":
            return !!(data && data.trim().length > 0 &&
                data.trim().match(/^[a-z][0-9]+$/));

        case "text":
        default:
            return !!(data && data.trim().length > 0);
    }
}

export const getCorrectRender = (eventContent: EventContentArg, currentView: ViewApi) => {
    // Change l'affichage des cours en fonction de la vue (mois, semaine, jour)

    switch (currentView.type) {
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
                </>)
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
            </>)
    }
}