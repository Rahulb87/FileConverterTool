// script.js
document.getElementById('docx-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('convert-btn').disabled = false;
    }
});

document.getElementById('convert-btn').addEventListener('click', async function() {
    const file = document.getElementById('docx-input').files[0];
    if (!file) {
        alert("Please select a DOCX file.");
        return;
    }

    try {
        // Hide the download link initially
        const downloadLink = document.getElementById('download-link');
        downloadLink.style.display = 'none';

        // Render DOCX file in the preview container
        const previewContainer = document.getElementById('preview-container');
        previewContainer.innerHTML = ''; // Clear previous content

        // Use docx-preview to render the DOCX file
        const arrayBuffer = await file.arrayBuffer();
        await docx.renderAsync(arrayBuffer, previewContainer);

        // Use html2pdf.js to convert the rendered HTML to PDF
        const element = previewContainer;
        const options = {
            margin: 10,
            filename: 'converted_file.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Generate PDF and show the download link
        await html2pdf().from(element).set(options).save();
        downloadLink.style.display = 'block';
    } catch (error) {
        console.error("Error converting DOCX to PDF:", error);
        alert("An error occurred while converting the file. Please try again.");
    }
});
