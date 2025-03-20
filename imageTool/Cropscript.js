// script.js
let cropper;

document.getElementById('image-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('crop-image');
            img.src = e.target.result;

            // Initialize Cropper.js
            if (cropper) {
                cropper.destroy();
            }
            cropper = new Cropper(img, {
                aspectRatio: NaN, // Free aspect ratio
                viewMode: 1,
                autoCropArea: 1,
                responsive: true,
                restore: true,
            });

            document.getElementById('download-btn').disabled = false;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('crop-btn').addEventListener('click', function() {
    if (cropper) {
        const canvas = cropper.getCroppedCanvas();
        const croppedImage = document.getElementById('crop-image');
        croppedImage.src = canvas.toDataURL();

        // Enable download button
        const downloadBtn = document.getElementById('download-btn');
        downloadBtn.href = canvas.toDataURL();
        downloadBtn.download = 'cropped_image.png';
    }
});

document.getElementById('download-btn').addEventListener('click', function(event) {
    if (!this.href) {
        event.preventDefault();
    }
});
