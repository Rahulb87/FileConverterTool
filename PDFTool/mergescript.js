// script.js
document.getElementById('pdf-input').addEventListener('change', function(event) {
    const files = event.target.files;
    const pdfNamesList = document.getElementById('pdf-names');
    pdfNamesList.innerHTML = ''; // Clear previous list

    for (let i = 0; i < files.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = files[i].name;
        pdfNamesList.appendChild(listItem);
    }

    document.getElementById('merge-btn').disabled = files.length === 0;
});

document.getElementById('merge-btn').addEventListener('click', async function() {
    const files = document.getElementById('pdf-input').files;
    if (files.length === 0) {
        alert("Please select at least one PDF file.");
        return;
    }

    const { PDFDocument } = PDFLib;

    try {
        const mergedPdf = await PDFDocument.create();

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
            copiedPages.forEach(page => mergedPdf.addPage(page));
        }

        const mergedPdfBytes = await mergedPdf.save();
        const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        const downloadLink = document.getElementById('download-link');
        downloadLink.href = url;
        downloadLink.style.display = 'block';
    } catch (error) {
        console.error("Error merging PDFs:", error);
        alert("An error occurred while merging the PDFs. Please try again.");
    }
});
