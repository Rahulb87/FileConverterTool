// script.js
document.getElementById('compress-btn').addEventListener('click', function() {
    const fileInput = document.getElementById('image-input');
    const compressionLevel = parseFloat(document.getElementById('compression-level').value);
    const imageContainer = document.getElementById('output-image');
    const downloadLink = document.getElementById('download-link');

    // Hide the download link initially
    downloadLink.style.display = 'none';

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;

            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0);

                // Compress the image and create a Blob
                canvas.toBlob(function(blob) {
                    const compressedImageUrl = URL.createObjectURL(blob);
                    imageContainer.src = compressedImageUrl;

                    // Show the download link after compression is complete
                    downloadLink.href = compressedImageUrl;
                    downloadLink.style.display = 'block';
                }, 'image/jpeg', compressionLevel);
            };
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
});

// Update the slider value display
const compressionLevelSlider = document.getElementById('compression-level');
const sliderValue = document.getElementById('slider-value');

compressionLevelSlider.addEventListener('input', function () {
    sliderValue.textContent = `${this.value}%`;
});
