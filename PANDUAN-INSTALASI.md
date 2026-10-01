# Panduan Instalasi DIVIGO

DIVIGO punya dua mode. Pilih salah satu, bisa dimulai dari Mode 1 lalu naik ke Mode 2 kapan saja.

| | Mode 1: Lokal | Mode 2: Sekolah |
|---|---|---|
| Server | hosting statis (GitHub Pages, dsb.) | hosting statis atau server sendiri + PHP + MySQL |
| Login siswa | nama panggilan saja | kode kelas + nama + PIN 4 angka |
| Progres | tersimpan di tiap HP | tersimpan di database, bisa lanjut di HP lain |
| Dashboard guru | hanya data perangkat itu | rekap satu kelas, atur ulang PIN, hapus siswa |

## Mode 1: Lokal (paling cepat)
1. Buat repository di GitHub, unggah **isi** folder `DIVIGO/` (file `index.html` harus di root).
2. Settings, Pages, Source: *Deploy from a branch*, pilih `main` dan `/ (root)`.
3. Buka `https://<akun>.github.io/<repo>/` dari HP. Selesai. `js/config.js` dibiarkan `const DIVIGO_API='';`

## Mode 2: Sekolah (login + database)
Kebutuhan: PHP 7.4+, MySQL/MariaDB, HTTPS.

1. **Database.** Di phpMyAdmin buat database `divigo` (collation `utf8mb4_unicode_ci`) dan satu user MySQL khusus.
2. **Tabel.** Pilih database tersebut, menu *Import*, pilih `api/schema.sql`.
3. **Konfigurasi.** Salin `api/config.sample.php` menjadi `api/config.php`, lalu isi:
   - `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`
   - `APP_SECRET`: jalankan `php -r "echo bin2hex(random_bytes(32));"`
   - `TEACHER_HASH`: jalankan `php -r "echo password_hash('SandiGuruAnda',PASSWORD_DEFAULT);"`
   - `ALLOW_ORIGIN`: alamat situs DIVIGO (lihat langkah 4)
   Jika tidak ada akses terminal, buat hash di file PHP sementara berisi `<?php echo password_hash('SandiGuruAnda',PASSWORD_DEFAULT);`, buka sekali di browser, salin hasilnya, lalu hapus file itu.
4. **Unggah dan hubungkan.** Ada dua susunan:
   - *Satu server (disarankan):* unggah seluruh folder `DIVIGO/` ke server. Di `js/config.js` isi `const DIVIGO_API='api/api.php';` dan `ALLOW_ORIGIN` boleh `'*'` atau domain Anda.
   - *Tampilan di GitHub Pages, API di server sekolah:* di `js/config.js` isi alamat penuh, misalnya `'https://server.go.id/divigo/api/api.php'`, dan di `config.php` isi `ALLOW_ORIGIN` dengan `'https://<akun>.github.io'`. Unggah hanya folder `api/` ke server.
5. **Uji API.** Buka `.../api/api.php` di browser. Jawaban `{"error":"Aksi tidak dikenal."}` berarti API hidup. Jika `Koneksi database gagal`, periksa `config.php`.
6. **Guru.** Buka DIVIGO, *Area Guru*, masuk dengan sandi guru, *Buat kelas*. Bagikan **kode kelas** (5 karakter) ke siswa.
7. **Siswa.** Memasukkan kode kelas, nama panggilan, dan PIN 4 angka. Nama baru otomatis terdaftar. Jika lupa PIN, guru memakai tombol 🔑 di rekap kelas.

## Memasang sebagai aplikasi (PWA)
Syarat: situs dibuka lewat **HTTPS**.
- **Android (Chrome):** tekan tombol **📲 Pasang** di bagian atas, atau menu ⋮ lalu *Instal aplikasi*.
- **iPhone/iPad (Safari):** tombol Bagikan, lalu *Tambah ke Layar Utama*.
- **Komputer (Chrome/Edge):** ikon pasang di kolom alamat.
Setelah sekali dibuka dengan internet, DIVIGO bisa dipakai tanpa internet. Di Mode 2, progres yang dikerjakan saat offline ikut tersimpan ke server pada login berikutnya.

## Memperbarui
Ubah file yang perlu, lalu naikkan nomor versi di `sw.js` (`const V='divigo-v3'` menjadi `'divigo-v4'`). Tanpa itu, HP siswa bisa tetap memakai versi lama.

## Menambah atau mengubah soal
Buka `js/materi.js`. Soal acak ada di bagian *Generator soal*; soal tetap ada di fungsi `m1()` sampai `m10()`.

## Keamanan dan privasi
- Simpan data seminimal mungkin: gunakan nama panggilan, bukan NIK atau nama lengkap. Sebaiknya ada pemberitahuan atau izin dari sekolah dan orang tua.
- PIN disimpan dalam bentuk hash, bukan teks asli.
- Pastikan `api/config.php` tidak bisa dibuka dari browser (file `api/.htaccess` sudah memblokirnya di Apache; di Nginx tambahkan aturan `deny`). Lebih aman lagi, taruh `config.php` di luar folder web dan ubah baris `require` di `api.php`.
- Lakukan cadangan (backup) database secara berkala.

## Masalah umum
| Gejala | Penyebab dan solusi |
|---|---|
| Siswa selalu muncul "Belum ada internet" | `DIVIGO_API` salah, server mati, atau CORS: periksa `ALLOW_ORIGIN` |
| "Kode kelas belum dikenali" | Kode salah ketik atau kelas belum dibuat guru |
| Tombol Pasang tidak muncul | Belum HTTPS, atau aplikasi sudah terpasang. Di iPhone memang tanpa tombol, pakai menu Bagikan |
| Perubahan file tidak tampil di HP | Naikkan versi `V` di `sw.js`, lalu muat ulang dua kali |
