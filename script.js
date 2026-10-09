
const $ = (selector) => document.querySelector(selector);

const albumModal = $("#albumModal");
const modalTitle = $("#modalTitle");
const modalEyebrow = $("#modalEyebrow");
const modalDescription = $("#modalDescription");
const mediaGrid = $("#mediaGrid");

const lightbox = $("#lightbox");
const lightboxContent = $("#lightboxContent");
const lightboxCaption = $("#lightboxCaption");

const backgroundMusic = $("#backgroundMusic");
const musicButton = $("#musicButton");
const musicLabel = $("#musicLabel");
const musicHint = $("#musicHint");

let currentAlbum = [];
let currentMediaIndex = 0;
let hintTimer;

// Semua nama file media berada langsung di halaman utama GitHub.
// Gunakan nama file yang sama persis dengan yang diunggah.

function imageFile(name) {
  return encodeURIComponent(name).replace(/%2F/gi, "/");
}

function imageItem(filename, caption) {
  return {
    type: "image",
    src: imageFile(filename),
    caption
  };
}

function videoItem(filename, caption, poster = "") {
  return {
    type: "video",
    src: imageFile(filename),
    poster: poster ? imageFile(poster) : "",
    caption
  };
}

const albums = {
  keluarga: {
    title: "Keluarga Besar",
    eyebrow: "POTRET KEBERSAMAAN",
    description:
      "Satu foto untuk menyimpan begitu banyak cerita tentang keluarga kita.",
    items: [
      imageItem("fotokeluarga.jpeg", "Keluarga Besar")
    ]
  },

  bukber: {
    title: "Bukber",
    eyebrow: "MOMEN KEBERSAMAAN",
    description:
      "Kenangan saat berkumpul dan berbuka puasa bersama.",
    items: [
      imageItem("bukber (1).jpeg", "Bukber — Foto 1"),
      imageItem("bukber (2).jpeg", "Bukber — Foto 2"),
      videoItem("bukber (1).mp4", "Video Bukber", "bukber (1).jpeg")
    ]
  },

  wisuda: {
    title: "Wisuda",
    eyebrow: "MOMEN ISTIMEWA",
    description:
      "Sebuah pencapaian yang menjadi bagian dari cerita keluarga.",
    items: [
      imageItem("wisuda (1).jpeg", "Momen Wisuda"),
      videoItem("wisuda (1).mp4", "Video Wisuda — 1", "wisuda (1).jpeg"),
      videoItem("wisuda (2).mp4", "Video Wisuda — 2", "wisuda (1).jpeg")
    ]
  },

  kenangan: {
    title: "Kenangan Keluarga",
    eyebrow: "CERITA KITA",
    description:
      "Foto dan video dari berbagai momen yang ingin kita kenang kembali.",
    items: [
      ...Array.from({ length: 35 }, (_, index) => {
        const number = index + 1;
        return imageItem(
          `kenangan (${number}).jpeg`,
          `Kenangan ${number}`
        );
      }),

      videoItem("kenangan (1).mp4", "Video Kenangan — 1", "kenangan (1).jpeg"),
      videoItem("kenangan (2).mp4", "Video Kenangan — 2", "kenangan (2).jpeg")
    ]
  }
};

// Album bisa dibuka dari kartu pada halaman utama.
document.querySelectorAll("[data-album]").forEach((card) => {
  card.addEventListener("click", () => {
    openAlbum(card.dataset.album);
  });
});

function openAlbum(albumName) {
  const album = albums[albumName];
  if (!album) return;

  currentAlbum = album.items;
  modalTitle.textContent = album.title;
  modalEyebrow.textContent = album.eyebrow;
  modalDescription.textContent = album.description;

  mediaGrid.replaceChildren();

  currentAlbum.forEach((item, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "media-item";

    const thumb = document.createElement("div");
    thumb.className = "media-thumb";

    const img = document.createElement("img");
    img.src = item.type === "video"
      ? (item.poster || "fotokeluarga.jpeg")
      : item.src;
    img.alt = item.caption;
    img.loading = "lazy";

    img.addEventListener("error", () => {
      img.alt = "File tidak ditemukan: " + item.caption;
      img.style.opacity = "0.2";
      img.title = "Periksa nama file di GitHub";
    });

    thumb.appendChild(img);

    if (item.type === "video") {
      const playIcon = document.createElement("span");
      playIcon.className = "video-indicator";
      playIcon.textContent = "▶";
      thumb.appendChild(playIcon);
    }

    const label = document.createElement("span");
    label.className = "media-label";
    label.textContent = item.caption;

    card.append(thumb, label);
    card.addEventListener("click", () => openLightbox(index));

    mediaGrid.appendChild(card);
  });

  albumModal.classList.add("open");
  albumModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  $("#closeModal").focus();
}

function closeAlbum() {
  albumModal.classList.remove("open");
  albumModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

$("#closeModal").addEventListener("click", closeAlbum);

albumModal.addEventListener("click", (event) => {
  if (event.target === albumModal) closeAlbum();
});

// Pembesar foto dan pemutar video.
function openLightbox(index) {
  currentMediaIndex = index;
  renderLightbox();

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function renderLightbox() {
  const item = currentAlbum[currentMediaIndex];
  if (!item) return;

  lightboxContent.replaceChildren();

  if (item.type === "video") {
    const video = document.createElement("video");
    video.src = item.src;
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.autoplay = true;

    if (item.poster) video.poster = item.poster;

    lightboxContent.appendChild(video);

    // Jika autoplay video diblokir, kontrol tetap tersedia.
    video.play().catch(() => {});
  } else {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.caption;
    img.draggable = false;
    lightboxContent.appendChild(img);
  }

  lightboxCaption.textContent =
    `${item.caption} · ${currentMediaIndex + 1} dari ${currentAlbum.length}`;
}

function closeLightbox() {
  const video = lightboxContent.querySelector("video");
  if (video) {
    video.pause();
    video.removeAttribute("src");
    video.load();
  }

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxContent.replaceChildren();
}

$("#closeLightbox").addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (
    event.target === lightbox ||
    event.target === lightboxContent
  ) {
    closeLightbox();
  }
});

function changeMedia(direction) {
  if (!currentAlbum.length) return;

  currentMediaIndex =
    (currentMediaIndex + direction + currentAlbum.length) %
    currentAlbum.length;

  renderLightbox();
}

$("#prevMedia").addEventListener("click", () => changeMedia(-1));
$("#nextMedia").addEventListener("click", () => changeMedia(1));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (lightbox.classList.contains("open")) {
      closeLightbox();
    } else if (albumModal.classList.contains("open")) {
      closeAlbum();
    }
  }

  if (lightbox.classList.contains("open")) {
    if (event.key === "ArrowRight") changeMedia(1);
    if (event.key === "ArrowLeft") changeMedia(-1);
  }
});

// Menu navigasi HP.
const menuToggle = $("#menuToggle");
const navMenu = $("#navMenu");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Animasi saat bagian halaman muncul di layar.
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Musik latar.
// Browser sering memblokir autoplay bersuara sampai pengunjung berinteraksi.
backgroundMusic.volume = 0.45;

function showMusicHint(message) {
  musicHint.textContent = message;
  musicHint.classList.add("show");

  clearTimeout(hintTimer);
  hintTimer = setTimeout(() => {
    musicHint.classList.remove("show");
  }, 4000);
}

function updateMusicButton() {
  if (!backgroundMusic.paused) {
    musicButton.classList.add("playing");
    musicLabel.textContent = "Musik Aktif";
  } else {
    musicButton.classList.remove("playing");
    musicLabel.textContent = "Putar Musik";
  }
}

async function startMusic() {
  try {
    await backgroundMusic.play();
    updateMusicButton();
    musicHint.classList.remove("show");
  } catch (error) {
    updateMusicButton();
    showMusicHint("Tekan ♫ Putar Musik untuk mendengarkan lagu.");
  }
}

musicButton.addEventListener("click", async () => {
  if (backgroundMusic.paused) {
    await startMusic();
  } else {
    backgroundMusic.pause();
    updateMusicButton();
  }
});

backgroundMusic.addEventListener("play", updateMusicButton);
backgroundMusic.addEventListener("pause", updateMusicButton);

backgroundMusic.addEventListener("error", () => {
  showMusicHint("Musik belum tersedia. Periksa file lagu.mpeg di GitHub.");
});

// Coba mulai musik ketika halaman dimuat.
// Jika diblokir browser, tombol musik tetap bisa digunakan.
window.addEventListener("load", () => {
  setTimeout(() => {
    $("#loadingScreen").classList.add("hidden");
  }, 500);

  startMusic();
});

// Foto sampul dapat diperbesar dengan membuka album keluarga.
$("#familyCover").addEventListener("click", () => {
  openAlbum("keluarga");
});
