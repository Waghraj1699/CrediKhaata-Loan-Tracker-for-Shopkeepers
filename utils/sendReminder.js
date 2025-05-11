// since twilio is paid so I used mock implementation but below is real implementation we can use in project

const twilio = require("twilio");
const axios = require("axios");

const TWILIO_SID = process.env.TWILIO_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE = process.env.TWILIO_PHONE;

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

// Twilio SMS API Function
async function sendSms(phone, message) {
    const client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);
    try {
        await client.messages.create({
            body: message,
            from: TWILIO_PHONE,
            to: phone
        });
        console.log(`SMS Sent to ${phone}`);
    } catch (error) {
        console.error("SMS Error:", error.message);
    }
}

// WhatsApp Cloud API Function
async function sendWhatsAppMessage(phone, message) {
    try {
        await axios.post(
            `https://graph.facebook.com/v17.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to: phone,
                text: { body: message }
            },
            { headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` } }
        );
        console.log(`WhatsApp Message Sent to ${phone}`);
    } catch (error) {
        console.error("WhatsApp Error:", error.message);
    }
}

module.exports = { sendSms, sendWhatsAppMessage };
