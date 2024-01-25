'use client'

import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef } from "react";

const Calendar = () => {
    const calendarRef = useRef({
        start: 'title',
        center: '',
        end: 'today prev,next'
    });
    return (
        <FullCalendar
            innerRef={calendarRef}
            plugins={[timeGridPlugin, interactionPlugin]}
            editable
            selectable
        />
    );
};

export default Calendar;