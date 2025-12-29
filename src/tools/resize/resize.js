const fileEl = document.getElementById('file');
const widthInput = document.getElementById('widthInput');
const qualityEl = document.getElementById('quality');
const qLabel = document.getElementById('qLabel');
const applyBtn = document.getElementById('applyBtn');
const downloadLink = document.getElementById('downloadLink');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let originalImage = new Image();
let originalWidth = 0;
let originalHeight = 0;

qualityEl.addEventListener('input', () => qLabel.textContent = qualityEl.value + '%');

fileEl.addEventListener('change', () => {
  const file = fileEl.files && fileEl.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  originalImage = new Image();
  originalImage.onload = () => {
    originalWidth = originalImage.naturalWidth;
    originalHeight = originalImage.naturalHeight;
    widthInput.value = originalWidth;
    drawPreview(originalWidth, originalHeight);
    URL.revokeObjectURL(url);
  };
  originalImage.src = url;
});

applyBtn.addEventListener('click', () => {
  const targetWidth = parseInt(widthInput.value, 10);
  if (!originalImage.src || !targetWidth || targetWidth <= 0) {
    alert('Choose an image and a valid width.');
    return;
  }
  const scale = targetWidth / originalWidth;
  const targetHeight = Math.round(originalHeight * scale);

  const ratio = window.devicePixelRatio || 1;
  canvas.width = targetWidth * ratio;
  canvas.height = targetHeight * ratio;
  canvas.style.width = targetWidth + 'px';
  canvas.style.height = targetHeight + 'px';
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, targetWidth, targetHeight);
  ctx.drawImage(originalImage, 0, 0, targetWidth, targetHeight);

  const quality = Math.max(0.1, Math.min(1, parseInt(qualityEl.value, 10) / 100));
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.style.display = 'inline-block';
    downloadLink.download = 'resized.jpg';
    downloadLink.textContent = `Download (${Math.round(blob.size / 1024)} KB)`;
    downloadLink.onclick = () => setTimeout(()=>URL.revokeObjectURL(url), 1500);
  }, 'image/jpeg', quality);
});

function drawPreview(w, h){
  const ratio = window.devicePixelRatio || 1;
  canvas.width = w * ratio;
  canvas.height = h * ratio;
  canvas.style.width = Math.min(w, 560) + 'px';
  canvas.style.height = (h * Math.min(560/w,1)) + 'px';
  ctx.setTransform(ratio,0,0,ratio,0,0);
  ctx.clearRect(0,0,w,h);
  ctx.drawImage(originalImage,0,0,w,h);
}
