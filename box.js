const storedBox = localStorage.getItem("selectedBox");

if (!storedBox) {
  window.location.href = "index.html";
}

const box = JSON.parse(storedBox);

document.getElementById("boxTitle").textContent = box.name;
document.getElementById("boxImage").src = box.image;
document.getElementById("boxImage").alt = box.name;
document.getElementById("boxDescription").textContent = box.longDescription;
document.getElementById("boxVideo").src = box.video;