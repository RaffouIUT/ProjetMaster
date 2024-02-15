import { EventInput } from '@fullcalendar/core'

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

// importer les cours depuis la bd
export const INITIAL_EVENTS: EventInput[] = [
    {
        id: createEventId(),
        title: 'All-day event',
        start: todayStr,
        extendedProps: {
            description: "truc"
        },
    },
    {
        id: createEventId(),
        title: 'Timed event',
        start: todayStr + 'T12:00:00',
        extendedProps: {
            description: "machin"
        },
    }
]

export function createEventId() {
    return String(eventGuid++)
}