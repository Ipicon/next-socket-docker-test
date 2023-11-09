function indexWorker() {
    if ((global as any).index == undefined) {
        (global as any).index = 0

        setInterval(() => {
            (global as any).index++
        }, 1000)
    }
}

export async function GET() {
    const encoder = new TextEncoder();

    indexWorker()

    const readable = new ReadableStream({
        async pull(controller) {
            controller.enqueue(encoder.encode(`data: sent from stream: ${(global as any).index}\n\n`));
            await new Promise(resolve => setTimeout(resolve, 1000));
        },
    })

    return new Response(readable, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        }
    })
}
