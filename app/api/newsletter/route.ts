import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Please enter a valid email address.' },
                { status: 400 }
            );
        }

        const apiKey = process.env.BREVO_API_KEY;
        const listId = process.env.BREVO_LIST_ID;

        if (!apiKey) {
            console.error('BREVO_API_KEY is not defined');
            return NextResponse.json(
                { error: 'Newsletter service is not configured.' },
                { status: 500 }
            );
        }

        // Brevo API endpoint for creating a contact
        const response = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'api-key': apiKey,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                email,
                ...(listId ? { listIds: [Number(listId)] } : {}),
                updateEnabled: true // Update contact if they already exist
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Check for specific Brevo error codes if needed
            console.error('Brevo API Error:', data);

            // Handle "Contact already exists" (error code usually requires parsing message)
            if (data.message === 'Contact already exist') {
                return NextResponse.json(
                    { error: 'You are already subscribed!' },
                    { status: 409 }
                );
            }

            return NextResponse.json(
                { error: 'Failed to subscribe. Please try again later.' },
                { status: response.status }
            );
        }

        return NextResponse.json({ success: true, message: 'Successfully subscribed!' });

    } catch (error) {
        console.error('Newsletter API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error.' },
            { status: 500 }
        );
    }
}
