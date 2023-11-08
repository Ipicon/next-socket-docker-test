import { Server as HttpServer } from "http"
import { Socket } from "net"
import { NextApiRequest, NextApiResponse } from "next"
import { Server as ServerIO } from "socket.io"

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: HttpServer & {
            io: ServerIO
        }
    }
}

export const config = {
    api: {
        bodyParser: false
    }
}

const emitter = async (io: ServerIO) => { // async to let ioHandler finish but still run on the event loop

    let counter = 0;

    setInterval(() => {
        io.emit("data", {
            data: `data from the server: ${counter}`
        })

        counter++;
    }, 5000)

}

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (!res.socket.server.io) {
        const path = "/api/socket/io"
        const httpServer: HttpServer = res.socket.server
        const io = new ServerIO(httpServer, {
            path: path,
            addTrailingSlash: false
        });
        
        emitter(io)
        res.socket.server.io = io;
    }
    
    res.end()
}

export default ioHandler;