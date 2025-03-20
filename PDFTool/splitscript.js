// script.js
document.getElementById('pdf-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('split-btn').disabled = false;
    }
});

document.getElementById('split-btn').addEventListener('click', async function() {
    const file = document.getElementById('pdf-input').files[0];
    if (!file) {
        alert("Please select a PDF file.");
        return;
    }

    const { PDFDocument } = PDFLib;

    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pageCount = pdfDoc.getPageCount();
        const pageList = document.getElementById('pdf-pages');
        const downloadLinks = document.getElementById('download-links');

        pageList.innerHTML = ''; // Clear previous list
        downloadLinks.innerHTML = ''; // Clear previous download links

        for (let i = 0; i < pageCount; i++) {
            const newPdf = await PDFDocument.create();
            const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
            newPdf.addPage(copiedPage);
            const newPdfBytes = await newPdf.save();

            const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            const listItem = document.createElement('li');
            listItem.textContent = `Page ${i + 1}`;
            pageList.appendChild(listItem);

            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = `page_${i + 1}.pdf`;
            downloadLink.textContent = `Download Page ${i + 1}`;
            downloadLinks.appendChild(downloadLink);
        }
    } catch (error) {
        console.error("Error splitting PDF:", error);
        alert("An error occurred while splitting the PDF. Please try again.");
    }
});
