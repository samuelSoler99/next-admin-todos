
export async function GET(request: Request) {
    return Response.json({
        hola: 'mundo',
        method: 'get',
    })
}

export async function POST(request: Request) {
    return Response.json({
        hola: 'mundo',
        method: 'post'
    })
}