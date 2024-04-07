"use client";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

interface ToastProviderProps {
    children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {

    const [childrenList, setChildrenList] = useState<any>();

    useEffect(() => {
        setChildrenList(children)
    }, []);

    return (
        <>
            {childrenList}
            <ToastContainer containerId={"mainContainer"} />
        </>
    );
}