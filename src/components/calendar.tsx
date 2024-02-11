'use client'

import FullCalendar from "@fullcalendar/react";
import {
    EventApi,
    DateSelectArg, EventContentArg, EventClickArg,
} from '@fullcalendar/core'
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid"
import { INITIAL_EVENTS, createEventId} from "@/components/event-utils";
import React from 'react'


interface CalendarState {
    weekendsVisible: boolean
    currentEvents: EventApi[]
}

export default class Calendar extends React.Component<{}, CalendarState> {

    state: CalendarState = {
        weekendsVisible: true,
        currentEvents: []
    }

    render () {
        return (
            <FullCalendar
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
                initialEvents={INITIAL_EVENTS}
                eventContent={renderEventContent} // modification du rendu des events dans le calendrier
                eventClick={this.handleEventClick}
                eventsSet={this.handleEvents}
                fixedWeekCount={false}
                height="100%"

                /* you can update a remote database when these fire:
                eventAdd={function(){}}
                eventChange={function(){}}
                eventRemove={function(){}}
                */
            />
        );
    }

    handleDateSelect = (selectInfo: DateSelectArg) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (title) {
            console.log(selectInfo)
            calendarApi.addEvent({
                id: createEventId(),
                title,
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
};

function renderEventContent(eventContent: EventContentArg) {
    return (
        <>
            <b>{eventContent.timeText}</b>
            <i>{eventContent.event.title}</i>
        </>
    )
}