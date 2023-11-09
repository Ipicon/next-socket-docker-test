// just a different way to implement stream

import {NextResponse} from "next/server";
import {ResponseAborted} from "next/dist/server/web/spec-extension/adapters/next-request";

export async function GET() {
    const encoder = new TextEncoder();
    const stream = new TransformStream()
    const writer = stream.writable.getWriter()
    let counter = 0;
    let isClosed = false;

    writer.ready.then(
        async () => {
            while (!isClosed) {
                await writer.write(encoder.encode(`data: sent from stream: ${counter++}\n\n`))
                await new Promise(resolve => setTimeout(resolve, 1000))
            }
        }
    ).catch(e => {
        isClosed = true
    })

    return new NextResponse(stream.readable, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache, no-transform',
        },
    })
}
