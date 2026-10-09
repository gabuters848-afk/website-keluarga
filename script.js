
"use strict";

// MUSIK
const musik = document.getElementById("musik");
const tombolMusik = document.getElementById("tombol-musik");

async function toggleMusik() {
    try {
        if (musik.paused) {
            await musik.play();
            tombolMusik.textContent = "❚❚ Jeda Musik";
        } else {
            musik.pause();
            tombolMusik.textContent = "▶ Putar Musik";
        }
    } catch (error) {
        tombolMusik.textContent = "▶ Coba Putar Musik";
        console.error("Musik gagal diputar:", error);
    }
}

// Coba autoplay; browser mungkin memblokirnya.
window.addEventListener("load", async () => {
    try {
        await musik.play();
        tombolMusik.textContent = "❚❚ Jeda Musik";
    } catch (error) {
        tombolMusik.textContent = "▶ Putar Musik";
    }
});


// NAVIGASI
const menuUtama = document.getElementById("menu-utama");
const bagianAcara = document.getElementById("acara");
const bagianKenangan = document.getElementById("kenangan");

function bukaAcara() {
    menuUtama.hidden = true;
    bagianKenangan.hidden = true;
    bagianAcara.hidden = false;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function bukaKenangan() {
    menuUtama.hidden = true;
    bagianAcara.hidden = true;
    bagianKenangan.hidden = false;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function kembaliKeMenu() {
    bagianAcara.hidden = true;
    bagianKenangan.hidden = true;
    menuUtama.hidden = false;

    window.scrollTo({ top: 0, behavior: "smooth" });
}


// GALERI FOTO KENANGAN
const galeriKenangan = document.getElementById("galeri-kenangan");

for (let i = 1; i <= 35; i++) {
    const foto = document.createElement("img");

    foto.src = `kenangan (${i}).jpeg`;
    foto.alt = `Kenangan keluarga ${i}`;
    foto.loading = "lazy";

    foto.addEventListener("error", () => foto.remove(), { once: true });

    galeriKenangan.appendChild(foto);
}


// VIDEO KENANGAN
const videoKenangan = document.getElementById("video-kenangan");

for (let i = 1; i <= 2; i++) {
    const video = document.createElement("video");
    video.controls = true;
    video.preload = "metadata";
    video.playsInline = true;

    const source = document.createElement("source");
    source.src = `kenangan (${i}).mp4`;
    source.type = "video/mp4";

    video.appendChild(source);
    videoKenangan.appendChild(video);
}
