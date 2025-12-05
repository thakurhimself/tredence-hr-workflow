

export async function POST(request: Request) {
    console.log("console.log", request);
    return Response.json({message: 'step 1 is done'})
}