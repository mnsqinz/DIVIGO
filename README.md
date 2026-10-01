# DIVIGO - Petualangan Memahami Pembagian

Platform belajar pembagian untuk siswa SD kelas 5. HTML + CSS + JavaScript murni, tanpa build dan tanpa server.

## Struktur
- `index.html` halaman utama
- `css/style.css` tampilan (mendukung mode gelap)
- `js/app.js` navigasi layar (dimuat paling akhir)
- `js/materi.js` bank soal tiap misi, tambah soal di sini
- `js/latihan.js` seret-lepas, keypad angka, pemeriksaan jawaban
- `js/game.js` misi 9, tantangan waktu
- `js/motivasi.js` kalimat motivasi (tanpa kata yang menjatuhkan)
- `js/karakter.js` karakter Divi yang selalu tersenyum
- `js/suara.js` efek suara WebAudio, tanpa file audio
- `js/config.js` alamat API (kosong = mode lokal)
- `js/sinkron.js` sinkronisasi ke server sekolah
- `js/progres.js` penyimpanan progres di browser (localStorage)
- `js/guru.js` dashboard guru

- `api/` backend PHP + MySQL (api.php, schema.sql, config.sample.php)
- `sw.js` dan `manifest.webmanifest` agar bisa dipasang dan jalan offline (PWA)

**Panduan lengkap: lihat `PANDUAN-INSTALASI.md`.**

## Menjalankan
Buka `index.html` di browser, atau jalankan `python3 -m http.server` di folder ini.

## Catatan
- Cara bermain di layar sentuh: seret benda ke kotak, atau pakai tombol + dan -. Jawaban angka memakai keypad di layar.
