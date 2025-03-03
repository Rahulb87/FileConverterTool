document.getElementById('compress-btn').addEventListener('click', function () {
    const fileInput = document.getElementById('pdf-input');
    const compressionLevel = parseFloat(document.getElementById('compression-level').value);
    const outputDiv = document.getElementById('output');

    if (fileInput.files.length === 0) {
        alert('Please select a PDF file to compress.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const pdfData = event.target.result;

        // Simulate compression (for demonstration purposes)
        // In a real-world scenario, you would use a backend service or library like PDF-LIB.
        const compressedBlob = new Blob([pdfData], { type: 'application/pdf' });

        // Create a download link for the compressed PDF
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(compressedBlob);
        downloadLink.download = `compressed-pdf-${Date.now()}.pdf`;
        downloadLink.textContent = 'Download Compressed PDF';

        outputDiv.innerHTML = '';
        outputDiv.appendChild(downloadLink);
    };

    reader.readAsArrayBuffer(file);
});

document.getElementById('imgcompress-btn').addEventListener('click', function() {
        const fileInput = document.getElementById('image-input');
        const compressionLevel = parseFloat(document.getElementById('compression-level').value);
        const outputDiv = document.getElementById('output');

        if (fileInput.files.length === 0) {
            alert('Please select an image to compress.');
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            canvas.toBlob(function(blob) {
                const compressedImg = document.createElement('img');
                compressedImg.src = URL.createObjectURL(blob);
                outputDiv.innerHTML = '';
                outputDiv.appendChild(compressedImg);
            }, 'image/jpeg', compressionLevel);
        };
    };

    reader.readAsDataURL(file);
});
compressionLevelSlider.addEventListener('input', function () {
    sliderValue.textContent = `${this.value}%`;
});
