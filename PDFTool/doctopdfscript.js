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
        // Render DOCX file in the preview container
        const previewContainer = document.getElementById('preview-container');
        previewContainer.innerHTML = ''; // Clear previous content

        // Use docx-preview to render the DOCX file
        const arrayBuffer = await file.arrayBuffer();
        docx.renderAsync(arrayBuffer, previewContainer)
            .then(() => {
                // Use html2pdf.js to convert the rendered HTML to PDF
                const element = previewContainer;
                const options = {
                    margin: 10,
                    filename: 'converted_file.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };

                html2pdf().from(element).set(options).save();

                // Enable download link
                const downloadLink = document.getElementById('download-link');
                downloadLink.style.display = 'block';
            })
            .catch((error) => {
                console.error("Error rendering DOCX file:", error);
                alert("An error occurred while rendering the DOCX file. Please try again.");
            });
    } catch (error) {
        console.error("Error converting DOCX to PDF:", error);
        alert("An error occurred while converting the file. Please try again.");
    }
});
