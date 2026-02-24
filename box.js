const storedBox = localStorage.getItem("selectedBox");

if (!storedBox) {
  window.location.href = "index.html";
}

const box = JSON.parse(storedBox);

document.getElementById("boxTitle").textContent = box.name;

const boxImage = document.getElementById("boxImage");
boxImage.src = box.image;
boxImage.alt = box.name;

document.getElementById("boxDescription").innerHTML =
  formatLongDescription(box.longDescription);

const video = document.getElementById("boxVideo");
const playBtn = document.getElementById("playBtn");

if (box.video && video) {
  video.src = box.video;
  video.muted = true;
  video.volume = 0;

  playBtn.addEventListener("click", () => {
    video.play();
    playBtn.classList.add("hidden");
  });

  video.addEventListener("pause", () => {
    playBtn.classList.remove("hidden");
  });
} else {
  document.querySelector(".video-wrapper").style.display = "none";
}

const whatsappBtn = document.getElementById("whatsappBtn");

const phone = "5491112345678";
const message = encodeURIComponent(
  `Hola 😊 Quiero consultar por el ${box.name}. ¿Me pasás info?`
);

whatsappBtn.href = `https://wa.me/${phone}?text=${message}`;

function formatLongDescription(text) {
  return text
    .split("\n\n")
    .map(block => {
      if (block.startsWith("-")) {
        const items = block
          .split("\n")
          .map(item => `<li>${item.replace("-", "")}</li>`)
          .join("");
        return `<ul class="box-list">${items}</ul>`;
      }
      return `<p>${block}</p>`;
    })
    .join("");
}