/* Dashboard guru: mode lokal (perangkat ini) atau mode sekolah (database) */
function rekapHtml(L,srv){
const rows=Object.keys(TOP).map(k=>{let q=0,f=0;L.forEach(s=>{const x=(s.st||{})[k];if(x){q+=x.q;f+=x.f}});const p=q?Math.round(f/q*100):0;return `<div style="margin:8px 0"><div style="display:flex;justify-content:space-between"><span>${TOP[k]}</span><b>${q?p+'%':'-'}</b></div><div class=pb><i style="width:${p}%"></i></div></div>`}).join('');
const sr=L.map(s=>{let w=null,m=101;const st=s.st||{};for(const k in st){const x=st[k],p=x.q?x.f/x.q*100:101;if(p<m){m=p;w=k}}const dn=s.done||{};return `<tr><td>${esc(s.name)}</td><td>${Object.keys(dn).length}/10</td><td>${Object.values(dn).reduce((a,b)=>a+b,0)}⭐</td><td>${w&&m<75?TOP[w]:'-'}</td>${srv?`<td style="white-space:nowrap"><button class=cb data-pin=${s.id} aria-label="Atur ulang PIN">🔑</button> <button class=cb data-del=${s.id} aria-label="Hapus siswa">🗑</button></td>`:''}</tr>`}).join('');
return `<div class=card><h2>👨‍🏫 Dashboard Guru</h2><p class=sm>Jumlah siswa: ${L.length}</p>${L.length?rows:'<p>Belum ada data. Data muncul setelah siswa mengerjakan misi.</p>'}</div>${L.length?`<div class=card style="overflow-x:auto"><b>Rekap per siswa</b><table class=tb><tr><th>Nama</th><th>Misi</th><th>Bintang</th><th>Perlu latihan</th>${srv?'<th></th>':''}</tr>${sr}</table></div>`:''}<p class=sm>Persentase = soal yang dijawab benar pada percobaan pertama tanpa petunjuk.${srv?' 🔑 mengatur ulang PIN, 🗑 menghapus siswa.':' Mode lokal: data hanya dari perangkat ini. Aktifkan mode sekolah untuk rekap satu kelas.'}</p>`}
function teacher(){stop();M.onclick=null;Divi.say('happy','Ini rekap belajar siswa untuk Bapak/Ibu guru.');
if(!Sync.on)return void(M.innerHTML=rekapHtml(Object.values(DB)));
Sync.gtok?guruKelas():guruLogin()}
function guruLogin(msg){M.innerHTML=`<div class=card><h2>👨‍🏫 Masuk Guru</h2><label for=gp><b>Kata sandi guru</b></label><input type=password id=gp><div class=fb role=alert>${msg?`<div>${esc(msg)}</div>`:''}</div><div class=row><button class=btn id=gb>Masuk</button></div></div>`;
const go=async()=>{try{const r=await Sync.call('guru_masuk',{password:$('#gp').value});Sync.gtok=r.token;guruKelas()}catch(e){guruLogin(e.code?e.message:'Belum ada internet.')}};
$('#gb').onclick=go;$('#gp').onkeydown=e=>{if(e.key==='Enter')go()}}
function guruErr(e){if(e.code===401){Sync.gtok=null;guruLogin(e.message)}else M.innerHTML=`<div class=card><p>🌱 ${esc(e.code?e.message:'Belum ada internet.')}</p></div>`}
async function guruKelas(){try{const r=await Sync.call('kelas_daftar',{},Sync.gtok);
M.innerHTML=`<div class=card><h2>🏫 Kelas saya</h2>${r.kelas.length?'<div class=map>'+r.kelas.map(k=>`<button class=ms data-k=${k.id}><span class=n>🏫</span><span><b>${esc(k.nama)}</b><small>Kode kelas: ${esc(k.kode)} · ${k.jml} siswa</small></span></button>`).join('')+'</div>':'<p>Belum ada kelas. Buat kelas pertama di bawah.</p>'}<label for=kn><b>Buat kelas baru</b></label><input type=text id=kn maxlength=40 placeholder="Contoh: V-A"><div class=row><button class=btn id=kb>Buat kelas</button><button class="btn s" id=ko>Keluar</button></div></div>`;
M.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>guruRekap(+b.dataset.k));
$('#kb').onclick=async()=>{const n=$('#kn').value.trim();if(!n)return;try{await Sync.call('kelas_buat',{nama:n},Sync.gtok);guruKelas()}catch(e){alert(e.message)}};
$('#ko').onclick=()=>{Sync.gtok=null;teacher()}}catch(e){guruErr(e)}}
async function guruRekap(id){try{const r=await Sync.call('rekap',{kelas_id:id},Sync.gtok);
const L=r.siswa.map(x=>Object.assign({done:{},st:{}},x.data||{},{name:x.nama,id:x.id}));
M.innerHTML='<button class="btn s" id=bk>⬅ Kelas</button><div style="height:10px"></div>'+rekapHtml(L,1);$('#bk').onclick=guruKelas;
M.onclick=async e=>{const p=e.target.closest('[data-pin]'),d=e.target.closest('[data-del]');
try{if(p){const v=prompt('PIN baru (4 angka):');if(v&&/^\d{4}$/.test(v)){await Sync.call('siswa_pin',{id:+p.dataset.pin,pin:v},Sync.gtok);alert('PIN sudah diganti.')}}
else if(d&&confirm('Hapus siswa ini beserta progresnya?')){await Sync.call('siswa_hapus',{id:+d.dataset.del},Sync.gtok);guruRekap(id)}}catch(x){alert(x.message)}}}catch(e){guruErr(e)}}
