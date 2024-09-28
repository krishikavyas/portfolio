"use server"
import nodemailer from 'nodemailer';
import info from "../../assets/joneralInfo.json"

const { email }  = info

export async function sendEmailAction(formData) {

    const transporter = nodemailer.createTransport({
        service: "Gmail", 
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: formData.email, 
        to: email, 
        subject: `Contact Form Submission from ${formData.name}`,
        text: formData.message, 
        html: `<p>You have a new message from the contact form:</p>
               <p><strong>Name:</strong> ${formData.name}</p>
               <p><strong>Email:</strong> ${formData.email}</p>
               <p><strong>Message:</strong> ${formData.message}</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: error.message };
    }
}
