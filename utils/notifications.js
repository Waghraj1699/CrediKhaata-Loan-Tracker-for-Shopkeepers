const sendMockSms = (phone, message) => {
    console.log(`Mock SMS Sent to ${phone}: "${message}"`);
};

const sendMockWhatsAppMessage = (phone, message) => {
    console.log(`Mock WhatsApp Message Sent to ${phone}: "${message}"`);
};

module.exports = { sendMockSms, sendMockWhatsAppMessage };
