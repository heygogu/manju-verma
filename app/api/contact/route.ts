import connectToDatabase from "@/app/utils/db";
import Contact from "@/app/models/Contact";
import type { NextRequest } from 'next/server';
import {Resend} from 'resend'

const RESEND_API_KEY = process.env.NEXT_PUBLIC_RESEND_API_KEY!; // Store your API key securely

// Resend email function
async function sendEmailFromUserToAdmin(name: string, email: string, subject: string, message: string) {
  try {
    // Send an email using Resend API
    const resend = new Resend(RESEND_API_KEY);
    resend.emails.send(
      
      {
        from: "client_enquiry@resend.dev", // Email from the user
        to: "rohitnarnolia88@gmail.com", // Your email address (recipient)
        subject: `Client Inquiry: ${subject}`, // Subject of the email
        html: `
        <div style="width: 100%; max-width: 680px; margin: 0 auto; font-family: 'Segoe UI', system-ui, sans-serif; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.05);">
        <!-- Header Section -->
        <div style="background: radial-gradient(circle at center, #FF00FF 0%, #00FFFF 100%); padding: 48px 24px; text-align: center; position: relative;">
        <div style="backdrop-filter: blur(8px); padding: 16px; border-radius: 12px; display: inline-block;">
            <h1 style="font-size: 24px; margin: 0; color: white; letter-spacing: -0.5px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            ✨ New Client Inquiry
            </h1>
           
        </div>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 32px; background: #fcfcfc;">
        <!-- Client Card -->
        <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div style="display: flex; align-items: center; gap: 40px; margin-bottom: 24px;">
            <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #FF00FF 0%, #00FFFF 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-size: 24px;">📝</span>
            </div>
            <div>
                <h2 style="margin: 0; font-size: 20px; color: #1a1a1a;">${name}</h2>
                <p style="margin: 4px 0 0; color: #666; font-size: 14px;">${email}</p>
            </div>
            </div>

            <!-- Details Grid -->
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
            <div>
                <p style="margin: 0; font-size: 12px; color: #999; text-transform: uppercase;">Submitted</p>
                <p style="margin: 4px 0 0; font-size: 14px; color: #333;">${new Date().toLocaleDateString()} • ${new Date().toLocaleTimeString()}</p>
            </div>
            
            </div>

            <!-- Message Block -->
            <div style="border-left: 3px solid #00FFFF; padding-left: 16px; margin: 24px 0;">
            <h3 style="margin: 0 0 12px; font-size: 16px; color: #1a1a1a;">${subject}</h3>
            <p style="margin: 0; color: #666; line-height: 1.6; font-size: 15px;">
                ${message}
            </p>
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; gap: 12px; margin-top: 32px;">
            <a href="mailto:${email}" style="flex: 1; text-align: center; padding: 12px 20px; background: linear-gradient(135deg, #FF00FF 0%, #00FFFF 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; transition: transform 0.2s ease;">
                Reply Now →
            </a>
               
            </div>
        </div>

           
        </div>

        <!-- Footer -->
        <div style="padding: 32px 24px; background: #f8f8f8; text-align: center;">
        <div style="margin-bottom: 24px;">
            <a href="#" style="margin: 0 8px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
            </a>
            <a href="#" style="margin: 0 8px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
            </svg>
            </a>
            <a href="#" style="margin: 0 8px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
            </svg>
            </a>
        </div>
        <p style="margin: 8px 0; font-size: 12px; color: #999;">
            © ${new Date().getFullYear()} Manju Verma<br>
            Content Writer<br>
            <a href="#" style="color: #666; text-decoration: none;">Privacy Policy</a> • <a href="#" style="color: #666; text-decoration: none;">Unsubscribe</a>
        </p>
        </div>
    </div>
        `, // HTML content for the email
      },
      
    );
    
  } catch (error) {
    console.error("Error sending email with Resend:", error);
    throw new Error("Error sending email.");
  }
}

export async function POST(req: NextRequest) {
    console.log("POST request received");
    
  try {

    const body = await req.json();
    console.log("Body:", body);
    const { name, email, subject, message } = body;

    // Connect to the database
    await connectToDatabase();

    // Check if email already exists
    const existingContact = await Contact.findOne({ email });
    if (existingContact) {
      const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000;
      const now = new Date();
      const lastUpdated = new Date(existingContact.updatedAt);
      if (now.getTime() - lastUpdated.getTime() < twoDaysInMillis) {
        return new Response(
          JSON.stringify("You can only send a new email after 2 days from the last update."),
          { status: 400 }
        );
      }
      // If email exists, append the new email to the emails array
      existingContact.emails.push(email);
      await existingContact.save();
    } else {
      // If email doesn't exist, create a new contact record
      const contact = new Contact({
        name,
        email,
        subject,
        message,
        emails: [email],
      });
      await contact.save();
    }

    // Send an email to your email address (admin email) using Resend
    await sendEmailFromUserToAdmin(name, email, subject, message);

    return new Response(
      JSON.stringify({ message: "Form submitted successfully!" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving contact form:", error);
    return new Response(JSON.stringify({ error: "Something went wrong!" }), { status: 500 });
  }
}
