/* Penyimpanan kemajuan siswa + fungsi bantu */
const M=document.getElementById('M');
const TOP={konsep:'Konsep dasar',kali:'Perkalian & pembagian',bil:'Pembagian bilangan',bers:'Pembagian bersusun',sisa:'Pembagian dengan sisa',cer:'Soal cerita'};
let DB={},S=null,gt=null;
try{DB=JSON.parse(localStorage.getItem('divigo2')||'{}')}catch(e){}
const ky=s=>(s.kode?s.kode+'|':'')+s.name;
const save=()=>{if(S&&S.name){DB[ky(S)]=S;try{localStorage.setItem('divigo2',JSON.stringify(DB))}catch(e){}if(typeof Sync!=='undefined'&&Sync.tok)Sync.push(S)}};
const fresh=n=>({name:n,done:{},st:{},stars:0,pre:null,help:false,pers:0});
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const $=s=>document.querySelector(s);
const stop=()=>{if(gt){clearInterval(gt);gt=null}document.onkeydown=null};
const vis=(n,g,e='🔵')=>{const k=Math.floor(n/g),r=n-k*g;return '<div class=vis>'+Array.from({length:g},()=>`<div class=vb>${e.repeat(k)}</div>`).join('')+(r?`<div class="vb rs">sisa: ${e.repeat(r)}</div>`:'')+'</div>'};

