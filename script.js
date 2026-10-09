
"use strict";

// ===================================
// MUSIK
// ===================================

const musik = document.getElementById("musik");
const tombolMusik = document.getElementById("tombol-musik");

async function putarMusik() {
    try {
        await musik.play();
        tombolMusik.textContent = "❚❚ Jeda Musik";
        tombolMusik.setAttribute("aria-label", "Jeda musik");
    } catch (error) {
        tombolMusik.textContent = "▶ Putar Musik";
    }
}

function jedaMusik() {
    musik.pause();
    tombolMusik.textContent = "▶ Putar Musik";
    tombolMusik.setAttribute("aria-label", "Putar musik");
}

tombolMusik.addEventListener("click", async () => {
    if (musik.paused) {
        await putarMusik();
    } else {
        jedaMusik();
    }
});

// Browser akan mencoba autoplay ketika halaman dibuka.
// Jika autoplay diblokir, pengunjung bisa menekan tombol musik.
window.addEventListener("load", () => {
    putarMusik();
});

// ===================================
// NAVIGASI HALAMAN
// ===================================

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

// ===================================
// GALERI 35 FOTO KENANGAN
// ===================================

const galeriKenangan = document.getElementById("galeri-kenangan");

for (let i = 1; i <= 35; i++) {
    const foto = document.createElement("img");

    foto.src = `kenangan (${i}).jpeg`;
    foto.alt = `Kenangan keluarga ${i}`;
    foto.loading = "lazy";

    // Foto yang tidak ditemukan tidak akan menampilkan kotak kosong.
    foto.addEventListener("error", () => {
        foto.remove();
    }, { once: true });

    galeriKenangan.appendChild(foto);
}

// ===================================
// GALERI 2 VIDEO KENANGAN
// ===================================

const videoKenangan = document.getElementById("video-kenangan");

for (let i = 1; i <= 2; i++) {
    const video = document.createElement("video");
    const sumber = document.createElement("source");

    video.controls = true;
    video.preload = "metadata";
    video.playsInline = true;

    sumber.src = `kenangan (${i}).mp4`;
    sumber.type = "video/mp4";

    video.appendChild(sumber);
    videoKenangan.appendChild(video);
}

// ===================================
// KLIK FOTO UNTUK MEMPERBESAR
// ===================================

const pemutarFoto = document.getElementById("pemutar-foto");
const fotoBesar = document.getElementById("foto-besar");
const tombolTutupFoto = document.getElementById("tutup-foto");

function bukaFoto(foto) {
    if (!foto || !foto.src) return;

    fotoBesar.src = foto.src;
    fotoBesar.alt = foto.alt || "Foto keluarga";
    pemutarFoto.hidden = false;
    document.body.style.overflow = "hidden";
    tombolTutupFoto.focus();
}

function tutupFoto() {
    pemutarFoto.hidden = true;
    fotoBesar.src = "";
    document.body.style.overflow = "";
}

document.addEventListener("click", (event) => {
    const elemen = event.target;

    if (!(elemen instanceof HTMLImageElement)) return;
    if (elemen.id === "foto-besar") return;

    if (
        elemen.classList.contains("foto-utama") ||
        elemen.closest(".photo-grid") ||
        elemen.closest(".kenangan-gallery")
    ) {
        bukaFoto(elemen);
    }
});

tombolTutupFoto.addEventListener("click", tutupFoto);

pemutarFoto.addEventListener("click", (event) => {
    if (event.target === pemutarFoto) {
        tutupFoto();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !pemutarFoto.hidden) {
        tutupFoto();
    }
});
