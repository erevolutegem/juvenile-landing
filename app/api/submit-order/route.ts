import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

// --- CONFIGURATION ---
// 1. Email Config (Add to .env.local)
// GMAIL_USER=your_email@gmail.com
// GMAIL_PASS=your_app_password

// 2. Google Sheets Config (Add to .env.local)
// GOOGLE_SHEET_ID=your_sheet_id
// GOOGLE_CLIENT_EMAIL=your_service_account_email
// GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, mobile, address, quantity, totalPrice } = body;
        const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });

        // 1. Send Email Notification
        if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
            try {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.GMAIL_USER,
                        pass: process.env.GMAIL_PASS,
                    },
                });

                await transporter.sendMail({
                    from: process.env.GMAIL_USER,
                    to: process.env.GMAIL_USER, // Sending to self (Admin)
                    subject: `New Order from ${name} - ${totalPrice} Tk`,
                    html: `
                        <h2>New Order Received</h2>
                        <p><strong>Time:</strong> ${date}</p>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Mobile:</strong> ${mobile}</p>
                        <p><strong>Address:</strong> ${address}</p>
                        <p><strong>Quantity:</strong> ${quantity}</p>
                        <p><strong>Total Price:</strong> ${totalPrice} Tk</p>
                    `,
                });
                console.log('Use Email sent:', name);
            } catch (emailError: any) {
                console.error('Email Error:', emailError.message);
            }
        }

        // 2. Append to Google Sheet
        if (process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
            try {
                const auth = new google.auth.GoogleAuth({
                    credentials: {
                        client_email: process.env.GOOGLE_CLIENT_EMAIL,
                        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                    },
                    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
                });

                const sheets = google.sheets({ version: 'v4', auth });

                await sheets.spreadsheets.values.append({
                    spreadsheetId: process.env.GOOGLE_SHEET_ID,
                    range: 'Sheet1!A:F', // Assumes Sheet1 exists
                    valueInputOption: 'USER_ENTERED',
                    requestBody: {
                        values: [
                            [date, name, mobile, address, quantity, totalPrice]
                        ],
                    },
                });
                console.log('Sheet updated:', name);
            } catch (sheetError: any) {
                console.error('Sheet Error:', sheetError.message);
            }
        }

        return NextResponse.json({ success: true, message: 'Order processed' });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
