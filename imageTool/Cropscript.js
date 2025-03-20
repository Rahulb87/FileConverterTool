// script.js
document.getElementById('image-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('output-image');
            img.src = e.target.result;
            img.style.display = 'block';
            document.getElementById('download-link').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('resize-level').addEventListener('input', function() {
    document.getElementById('resize-value').textContent = this.value + '%';
});

document.getElementById('resize-btn').addEventListener('click', function() {
    const img = document.getElementById('output-image');
    const resizeLevel = document.getElementById('resize-level').value / 100;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = img.width * resizeLevel;
    canvas.height = img.height * resizeLevel;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const downloadLink = document.getElementById('download-link');
        downloadLink.href = url;
        downloadLink.style.display = 'block';
    }, 'image/jpeg', 0.7);
});
