// script.js
document.getElementById('doc-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('convert-btn').disabled = false;
    }
});

document.getElementById('convert-btn').addEventListener('click', async function() {
    const file = document.getElementById('doc-input').files[0];
    if (!file) {
        alert("Please select a DOC or DOCX file.");
        return;
    }

    try {
        // Use Mammoth.js to extract text from DOCX
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
        const textContent = result.value; // Extracted text from DOCX

        // Use PDF-Lib to create a PDF
        const pdfDoc = await PDFLib.PDFDocument.create();
        const page = pdfDoc.addPage([600, 800]); // Set page size
        const { width, height } = page.getSize();

        // Add text to the PDF
        page.drawText(textContent, {
            x: 50,
            y: height - 50,
            size: 12,
            color: PDFLib.rgb(0, 0, 0),
        });

        // Save the PDF
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        // Enable download link
        const downloadLink = document.getElementById('download-link');
        downloadLink.href = url;
        downloadLink.style.display = 'block';
    } catch (error) {
        console.error("Error converting DOC to PDF:", error);
        alert("An error occurred while converting the file. Please try again.");
    }
});
