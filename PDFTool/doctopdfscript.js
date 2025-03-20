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
        const arrayBuffer = await file.arrayBuffer();
        const docx = await window.docx.Packer.unpack(arrayBuffer);
        const pdfDoc = await PDFLib.PDFDocument.create();

        // Convert DOCX content to PDF (simplified example)
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const textContent = docx.getBody().getText();
        page.drawText(textContent, {
            x: 50,
            y: height - 50,
            size: 12,
            color: PDFLib.rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        const downloadLink = document.getElementById('download-link');
        downloadLink.href = url;
        downloadLink.style.display = 'block';
    } catch (error) {
        console.error("Error converting DOC to PDF:", error);
        alert("An error occurred while converting the file. Please try again.");
    }
});
