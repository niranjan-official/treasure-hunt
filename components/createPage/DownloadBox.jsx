import React from "react";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import { IoMdDownload } from "react-icons/io";

const qrCodes = [
    "123123",
    "123123",
    "123123",
    "123123",
    "123123",
    "123123",
    "123123",
    "123123",
    "123123",
    "123123",
    "123123",
    "123123",
];

const DownloadBox = () => {
    const generatePDF = async () => {
        console.log(qrCodes);

        const pdf = new jsPDF();
        const qrPerPage = 6; // Number of QR codes per page
        const qrPerRow = 3; // Number of QR codes per row
        const qrSize = 50; // Size of each QR code
        const margin = 10; // Margin between QR codes
        const labelHeight = 10; // Height for the label section
        const startX = 10; // Starting x-coordinate
        const startY = 20; // Starting y-coordinate

        let x = startX;
        let y = startY;

        for (let i = 0; i < qrCodes.length; i++) {
            // Add label above the QR code
            pdf.text(qrCodes[i], x, y - 5); // Adjust y-coordinate to position the label

            // Generate QR Code as Base64
            const qrCodeDataURL = await QRCode.toDataURL(qrCodes[i]);

            // Add QR code to PDF
            pdf.addImage(qrCodeDataURL, "PNG", x, y, qrSize, qrSize);

            // Adjust position for the next QR code
            if ((i + 1) % qrPerRow === 0) {
                x = startX; // Reset x to the start of the row
                y += qrSize + margin + labelHeight; // Move to the next row
            } else {
                x += qrSize + margin; // Move to the next column
            }

            // Add a new page after filling the page
            if ((i + 1) % qrPerPage === 0 && i + 1 < qrCodes.length) {
                pdf.addPage();
                x = startX;
                y = startY;
            }
        }

        // Download the PDF
        pdf.save("qr-codes.pdf");
    };

    return (
        <button
            onClick={generatePDF}
            className="bg-green-600 text-white p-2 rounded-[0.4rem] mb-1 flex items-center justify-center gap-1"
        >
            Download QR Sheet <IoMdDownload size={20} />
        </button>
    );
};

export default DownloadBox;
