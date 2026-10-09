
"use strict";

// ==============================
// MUSIK
// ==============================

const musik = document.getElementById("musik");

function putarMusik() {
    if (!musik) return;

    musik.play().catch(() => {
        // Browser dapat memblokir autoplay bersuara.
        // Musik akan dicoba kembali saat pengunjung berinteraksi.
    });
}

// Mencoba autoplay saat halaman dibuka.
putarMusik();

// Jika autoplay diblokir, coba lagi saat interaksi pertama.
function mulaiMusikSekali() {
    putarMusik();

    document.removeEventListener("click", mulaiMusikSekali);
    document.removeEventListener("keydown", mulaiMusikSekali);
    document.removeEventListener("touchstart", mulaiMusikSekali);
}

document.addEventListener("click", mulaiMusikSekali);
document.addEventListener("keydown", mulaiMusikSekali);
document.addEventListener("touchstart", mulaiMusikSekali, {
    passive: true
});


// ==============================
// NAVIGASI MENU
// ==============================

function bukaAcara() {
    document.getElementById("acara").scrollIntoView({
        behavior: "smooth"
    });
}

function bukaKenangan() {
    document.getElementById("kenangan").scrollIntoView({
        behavior: "smooth"
    });
}


// ==============================
// GALERI FOTO KENANGAN
// Semua file ada di folder utama.
// ==============================

const galeriKenangan =
    document.getElementById("galeri-kenangan");

for (let i = 1; i <= 35; i++) {
    const foto = document.createElement("img");

    foto.src = `kenangan (${i}).jpeg`;
    foto.alt = `Kenangan keluarga ${i}`;
    foto.loading = "lazy";

    // Sembunyikan gambar jika file tidak ditemukan.
    foto.addEventListener("error", function () {
        this.remove();
    }, { once: true });

    galeriKenangan.appendChild(foto);
}


// ==============================
// VIDEO KENANGAN
// ==============================

const videoKenangan =
    document.getElementById("video-kenangan");

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
