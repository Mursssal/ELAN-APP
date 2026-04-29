const uploadBox = document.querySelector(".upload-box");
const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const uploadText = document.getElementById("uploadText");

function showPreview(file) {
  if (!file) return;

  preview.src = URL.createObjectURL(file);
  preview.style.display = "block";
  uploadText.innerHTML = "Change outfit image";
}

function previewImage() {
  showPreview(imageInput.files[0]);
}

uploadBox.addEventListener("dragover", function(event) {
  event.preventDefault();
  uploadBox.classList.add("dragging");
});

uploadBox.addEventListener("dragleave", function() {
  uploadBox.classList.remove("dragging");
});

uploadBox.addEventListener("drop", function(event) {
  event.preventDefault();
  uploadBox.classList.remove("dragging");

  const file = event.dataTransfer.files[0];

  if (file && file.type.startsWith("image/")) {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    imageInput.files = dataTransfer.files;

    showPreview(file);
  }
});

async function rateOutfit() {
  const result = document.getElementById("result");

  if (!imageInput.files[0]) {
    result.innerHTML = "Upload an outfit image first.";
    return;
  }

  const formData = new FormData();
  formData.append("image", imageInput.files[0]);

  try {
    const response = await fetch("http://127.0.0.1:5000/rate", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    result.innerHTML = `<strong>${data.score}/10</strong><br>${data.comment}`;
  } catch (error) {
    result.innerHTML = "Error connecting to server.";
  }
}
