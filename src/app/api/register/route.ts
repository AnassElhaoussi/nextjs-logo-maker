export function POST(req: Request) {
    const body = req.body
    return new Response(body)
}