// ==============================
// MUSIK
// ==============================

const musik = document.getElementById("musik");


// Coba putar otomatis ketika halaman dibuka

window.addEventListener("load", function () {

    musik.play().catch(function () {

        console.log(
            "Browser memblokir autoplay. Musik akan mulai setelah klik."
        );

    });

});


// Kalau autoplay diblokir browser,
// klik pertama di halaman akan menjalankan musik.

document.addEventListener("click", function () {

    musik.play().catch(function () {});

}, { once: true });


// ==============================
// BUKA ACARA
// ==============================

function bukaAcara() {

    document.getElementById("acara").scrollIntoView({
        behavior: "smooth"
    });

}


// ==============================
// BUKA KENANGAN
// ==============================

function bukaKenangan() {

    document.getElementById("kenangan").scrollIntoView({
        behavior: "smooth"
    });

}


// ==============================
// GALERI KENANGAN
// ==============================

const galeriKenangan =
    document.getElementById("galeri-kenangan");


// Membuat 35 foto secara otomatis

for (let i = 1; i <= 35; i++) {

    const foto = document.createElement("img");

    foto.src =
        `kenangan/kenangan (${i}).jpeg`;

    foto.alt =
        `Kenangan keluarga ${i}`;

    foto.loading = "lazy";

    galeriKenangan.appendChild(foto);

}


// ==============================
// VIDEO KENANGAN
// ==============================

const videoKenangan =
    document.getElementById("video-kenangan");


// Membuat 2 video secara otomatis

for (let i = 1; i <= 2; i++) {

    const video =
        document.createElement("video");

    video.controls = true;

    video.preload = "metadata";


    const source =
        document.createElement("source");

    source.src =
        `kenangan/kenangan (${i}).mp4`;

    source.type =
        "video/mp4";


    video.appendChild(source);

    videoKenangan.appendChild(video);

}