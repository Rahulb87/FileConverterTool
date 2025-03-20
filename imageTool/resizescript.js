// script.js
document.getElementById('resize-btn').addEventListener('click', function() {
    const fileInput = document.getElementById('image-input');
    const resizeLevel = parseFloat(document.getElementById('resize-level').value) / 100;
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

                // Calculate new dimensions based on resize level
                canvas.width = img.width * resizeLevel;
                canvas.height = img.height * resizeLevel;

                // Draw the resized image on the canvas
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Convert the canvas to a Blob and create a download link
                canvas.toBlob(function(blob) {
                    const resizedImageUrl = URL.createObjectURL(blob);
                    imageContainer.src = resizedImageUrl;

                    // Show the download link after resizing is complete
                    downloadLink.href = resizedImageUrl;
                    downloadLink.style.display = 'block';
                }, 'image/jpeg', 0.8); // Adjust quality if needed
            };
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
});

// Update the resize level display
const resizeLevelSlider = document.getElementById('resize-level');
const resizeValue = document.getElementById('resize-value');

resizeLevelSlider.addEventListener('input', function () {
    resizeValue.textContent = `${this.value}%`;
});
