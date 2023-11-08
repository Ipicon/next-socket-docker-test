"use client"

import { useSocket } from "@/components/providers/socket-provider"
import { useEffect, useState } from "react"

export default function Home() {
  const {isConnected, socket} = useSocket()
  const [data, setData] = useState("")

  useEffect(() => {
    if (isConnected) {
      socket.on("data", (data: {data: string}) => {
        setData(data.data)
      })
    }
  }, [isConnected])
  
  return (
    <main className="grid place-items-center w-screen h-screen bg-white">
      <h1>is connected: {isConnected.toString()} </h1>
      <p>{data}</p>
    </main>
  )
}
