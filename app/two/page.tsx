"use client"
import {useEffect, useState} from "react";

export default function Two() {
    const [data, setData] = useState("")
    const [data2, setData2] = useState("")

    useEffect(() => {
        const eventSource = new EventSource(`/api/stream`, {
            withCredentials: true,
        });
        const eventSource2 = new EventSource(`/api/transformStream`, {
            withCredentials: true,
        });

        eventSource.onopen = () => {
            setData("open stream!")
        };
        eventSource.onmessage = (e) => {
            setData(e.data)
        };
        eventSource.onerror = (e) => {
            setData(JSON.stringify(e))
        };

        eventSource2.onopen = () => {
            setData2("open stream2!")
        };
        eventSource2.onmessage = (e) => {
            setData2(e.data)
        };
        eventSource2.onerror = (e) => {
            setData2(JSON.stringify(e))
        };

        return () => {
            eventSource.close();
            eventSource2.close();
        };
    }, [])

    return (
        <main className="grid place-items-center w-screen h-screen bg-white">
            <p>{data}</p>
            <p>{data2}</p>
        </main>
    )
}
