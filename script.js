// script.js
document.getElementById('compression-level').addEventListener('input', function() {
    const compressionLevel = parseFloat(this.value);
    const compressionLevelValue = document.getElementById('compression-level-value');
    compressionLevelValue.textContent = `${Math.round(compressionLevel * 100)}%`;
});

document.getElementById('compress-btn').addEventListener('click', function() {
    const fileInput = document.getElementById('image-input');
    const compressionLevel = parseFloat(document.getElementById('compression-level').value);
    const imageContainer = document.getElementById('output-image');
    const downloadLink = document.getElementById('download-link');

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

                canvas.toBlob(function(blob) {
                    const compressedImageUrl = URL.createObjectURL(blob);
                    imageContainer.src = compressedImageUrl;
                    downloadLink.href = compressedImageUrl;
                }, 'image/jpeg', compressionLevel);
            };
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
});
