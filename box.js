document.addEventListener("DOMContentLoaded", () => {

  if (!window.location.pathname.includes("box.html")) return;

  const storedBox = localStorage.getItem("selectedBox");

  if (!storedBox) {
    window.location.href = "index.html";
    return;
  }

  let box;
  try {
    box = JSON.parse(storedBox);
  } catch {
    window.location.href = "index.html";
    return;
  }

  const titleEl = document.getElementById("boxTitle");
  const imageEl = document.getElementById("boxImage");
  const descEl = document.getElementById("boxDescription");
  const videoEl = document.getElementById("boxVideo");
  const playBtn = document.getElementById("playBtn");

  if (!titleEl || !imageEl || !descEl) return;

  titleEl.textContent = box.name;
  imageEl.src = box.image;
  imageEl.alt = box.name;
  descEl.innerHTML = formatLongDescription(box.longDescription);

  if (box.video && videoEl) {
    videoEl.src = box.video;
    videoEl.muted = true;
    videoEl.volume = 0;

    playBtn?.addEventListener("click", () => {
      videoEl.play();
      playBtn.classList.add("hidden");
    });

    videoEl.addEventListener("pause", () => {
      playBtn?.classList.remove("hidden");
    });
  } else {
    document.querySelector(".box-video-wrapper")?.remove();
  }

  const phone = "5491131752110";
  const message = encodeURIComponent(
    `Hola 😊 Quiero consultar por el ${box.name}. ¿Me pasás info?`
  );

  document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
    btn.href = `https://wa.me/${phone}?text=${message}`;
  });
});


function formatLongDescription(text) {
  const lines = text.split("\n");
  let html = "";
  let inList = false;

  lines.forEach(line => {
    if (line.trim().startsWith("-")) {
      if (!inList) {
        html += `<ul class="box-list">`;
        inList = true;
      }
      html += `<li>${line.replace("-", "").trim()}</li>`;
    } else {
      if (inList) {
        html += `</ul>`;
        inList = false;
      }
      if (line.trim() !== "") {
        html += `<p>${line}</p>`;
      }
    }
  });

  if (inList) html += `</ul>`;

  return html;
}