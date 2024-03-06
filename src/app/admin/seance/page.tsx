'use client';

import CalendarCustom from '@/components/calendar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Page()  {
    return (
        /* section gestion des séances du module intervenant */
        <section className="flex flex-row min-h-screen">
            <ToastContainer />
            <CalendarCustom />
        </section>
    );
}