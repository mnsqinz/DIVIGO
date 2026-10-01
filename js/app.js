/* Navigasi layar & inisialisasi (dimuat paling akhir) */
/* ---------- Layar ---------- */
function home(){stop();Divi.say('happy','Halo! Aku Divi, teman belajarmu. Ayo mulai!');M.innerHTML=`<div class="card hero"><div class=mas>🧠</div><h1>DIVIGO</h1><h2>Petualangan Memahami Pembagian</h2><p>"Bukan sekadar menghitung. Temukan bagaimana pembagian bekerja!"</p><button class=btn id=go>🚀 MULAI PETUALANGAN</button><p class=sm>🌱 Belajar sambil bermain · Setiap usaha adalah langkah menuju pemahaman</p></div>`;
$('#go').onclick=()=>S?map():nameScr()}
function nameScr(){Divi.say('happy','Siapa namamu? Aku senang berkenalan!');
let L={};try{L=JSON.parse(localStorage.getItem('divigo_last')||'{}')}catch(e){}
M.innerHTML=`<div class=card><div class=mas>😊</div><h2>Halo, calon ahli matematika! 👋</h2><p>Hari ini kita akan belajar membagi benda, menemukan pola, dan memecahkan masalah. Tidak perlu takut salah. Kita akan belajar bersama!</p>${Sync.on?`<label for=kk><b>Kode kelas</b></label><input type=text id=kk maxlength=10 placeholder="Dari gurumu" autocapitalize=characters value="${esc(L.kode||'')}">`:''}<label for=nn><b>Siapa namamu?</b></label><input type=text id=nn maxlength=20 placeholder="Nama panggilan" value="${esc(L.nama||'')}">${Sync.on?`<label for=pp><b>PIN rahasia (4 angka)</b></label><input type=password id=pp inputmode=numeric maxlength=4 placeholder="••••" autocomplete=off>`:''}<div id=er class=fb role=alert></div><div class=row><button class=btn id=ok>LANJUTKAN</button></div></div>`;
const er=t=>{$('#er').innerHTML=`<div>🌱 ${t}</div>`};
const go=async()=>{const n=$('#nn').value.trim();if(!n)return $('#nn').focus();
if(!Sync.on){S=DB[n]||fresh(n);save();return S.pre==null?preIntro():map()}
const kode=$('#kk').value.trim().toUpperCase(),pin=$('#pp').value.trim();
if(!kode||!/^\d{4}$/.test(pin))return er('Isi kode kelas dan PIN 4 angka ya.');
$('#ok').disabled=true;
try{const r=await Sync.call('siswa_masuk',{kode,nama:n,pin});Sync.tok=r.token;
const lo=DB[kode+'|'+n],sv=r.data,sc=x=>x?Object.keys(x.done||{}).length+(x.pre==null?0:1):-1;
S=Object.assign(fresh(n),sc(lo)>sc(sv)?lo:(sv||{}));S.name=n;S.kode=kode;
try{localStorage.setItem('divigo_last',JSON.stringify({kode,nama:n}))}catch(e){}
save();S.pre==null?preIntro():map()}
catch(e){$('#ok').disabled=false;if(e.code)return er(e.message);const lo=DB[kode+'|'+n];
if(lo){S=lo;Sync.tok=null;map()}else er('Belum ada internet. Coba lagi setelah tersambung ya.')}};
$('#ok').onclick=go;$('#nn').focus()}
function preIntro(){M.innerHTML=`<div class=card><div class=mas>🎯</div><h2>Halo, ${esc(S.name)}!</h2><p>Sebelum masuk materi, DIVIGO punya beberapa pertanyaan sederhana. Tujuannya hanya untuk mengetahui dari mana kita mulai, bukan untuk memberi nilai.</p><button class=btn id=s>🎯 MULAI TES AWAL</button></div>`;$('#s').onclick=()=>run(0,pre(),'test')}
const MS=[['🌱','Mengenal Pembagian'],['🍎','Membagi Benda'],['🧺','Membuat Kelompok Sama Banyak'],['✖️','Hubungan Perkalian dan Pembagian'],['🔢','Pembagian Bilangan'],['📚','Pembagian Bersusun'],['🔢','Pembagian dengan Sisa'],['📖','Soal Cerita'],['🏆','Tantangan Pembagian'],['👑','Master Pembagian']];
function map(){stop();Divi.say('happy','Pilih misi yang terbuka ya!');if(!S)return nameScr();const tot=Object.values(S.done).reduce((a,b)=>a+b,0);S.stars=tot;
M.innerHTML=`<h2 style="margin:8px 0">Halo, ${esc(S.name)}! 😊</h2><div class=chips><span class=chip>⭐ Bintang usaha: ${tot}</span><span class="chip ${S.pers?'':'off'}">🏅 Lencana ketekunan</span><span class="chip ${S.done[10]?'':'off'}">🏆 Lencana pemahaman</span></div><div class=map>`+MS.map((m,i)=>{const id=i+1,lock=id>1&&!S.done[id-1];const s=S.done[id];return `<button class=ms data-id=${id} ${lock?'disabled':''}><span class=n>${lock?'🔒':m[0]}</span><span><b>Misi ${id}</b><small>${m[1]}</small></span><span class=st>${s?'⭐'.repeat(s):''}</span></button>`}).join('')+'</div>';
M.querySelectorAll('.ms').forEach(b=>b.onclick=()=>mission(+b.dataset.id))}
function mission(id){const L={1:m1,2:m2,3:m3,4:m4,5:m5,6:m6,7:m7,8:m8,10:m10};if(id===9)return game();run(id,L[id]())}


const sb=$('#snd');sb.textContent=Snd.on?'🔊':'🔇';sb.onclick=()=>{sb.textContent=Snd.toggle()?'🔊':'🔇'};
document.addEventListener('pointerdown',()=>Snd.unlock(),{once:true});
$('#nm').onclick=home;$('#lg').onclick=home;$('#nmap').onclick=()=>S?map():nameScr();$('#ng').onclick=teacher;
home();

let ip=null;addEventListener('beforeinstallprompt',e=>{e.preventDefault();ip=e;const b=$('#inst');b.hidden=false;b.onclick=async()=>{b.hidden=true;ip.prompt();try{await ip.userChoice}catch(x){}}});
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(()=>{});
