

export async function GET() {
    return Response.json({ 
        actions: [
            { "id": "send_email", "label": "Send Email", "params": ["to", "subject"] },
            { "id": "generate_doc", "label": "Generate Document", "params": ["template", "recipient"] }
        ]
    })
}