// script.js
document.getElementById('convert-btn').addEventListener('click', async function() {
    const fileInput = document.getElementById('file-input');
    const fileType = document.getElementById('file-type').value;
    const downloadLink = document.getElementById('download-link');

    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = async function(e) {
            let textContent = '';

            if (fileType === 'docx') {
                // Convert DOCX to text using Mammoth.js
                const result = await mammoth.extractRawText({ arrayBuffer: e.target.result });
                textContent = result.value;
            } else if (fileType === 'doc' || fileType === 'txt') {
                // Extract plain text from DOC or TXT
                textContent = e.target.result;
            }

            // Create PDF using PDF-Lib
            const pdfDoc = await PDFLib.PDFDocument.create();
            const page = pdfDoc.addPage();
            const { width, height } = page.getSize();
            page.drawText(textContent, {
                x: 50,
                y: height - 50,
                size: 12,
                color: PDFLib.rgb(0, 0, 0),
            });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            // Show download link
            downloadLink.href = url;
            downloadLink.style.display = 'block';
        };

        if (fileType === 'docx') {
            reader.readAsArrayBuffer(file);
        } else {
            reader.readAsText(file);
        }
    } else {
        alert('Please select a file to convert.');
    }
});
