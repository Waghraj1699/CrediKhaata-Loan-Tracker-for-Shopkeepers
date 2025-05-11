const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

async function generateRepaymentPDF(repaymentData) {
    return new Promise((resolve, reject) => {
        const receiptsDir = path.join(__dirname, "../receipts");

         // Ensure the "receipts" folder exists before saving the file
         if (!fs.existsSync(receiptsDir)) {
            fs.mkdirSync(receiptsDir, { recursive: true });
            console.log("Created 'receipts' directory!");
        }
        
        const filePath = `${receiptsDir}/repayment_${repaymentData._id}.pdf`;
        const doc = new PDFDocument();
        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);

        doc.fontSize(16).text("Repayment Receipt", { align: "center" });
        doc.moveDown();
        doc.fontSize(12).text(`Loan ID: ${repaymentData.loan}`);
        doc.text(`Customer: ${repaymentData.customerName}`);
        doc.text(`Phone: ${repaymentData.customerPhone}`);
        doc.text(`Amount Paid: ${repaymentData.amount}`);
        doc.text(`Date: ${repaymentData.date}`);

        doc.end();

        stream.on("finish", () => resolve(filePath));
        stream.on("error", reject);
    });
}

module.exports = { generateRepaymentPDF };
