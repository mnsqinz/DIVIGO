/* Service worker DIVIGO: aplikasi bisa dibuka tanpa internet.
   Setiap mengubah file, naikkan nomor versi di bawah (v3 -> v4) agar HP mengambil pembaruan. */
const V='divigo-v3';
const SHELL=["./", "index.html", "manifest.webmanifest", "css/style.css", "js/config.js", "js/suara.js", "js/motivasi.js", "js/karakter.js", "js/progres.js", "js/sinkron.js", "js/materi.js", "js/latihan.js", "js/game.js", "js/guru.js", "js/app.js", "assets/ikon/divi.svg", "assets/ikon/icon-192.png", "assets/ikon/icon-512.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin)return;
e.respondWith(caches.match(r).then(hit=>{const net=fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>hit||caches.match('index.html'));return hit||net}))});
