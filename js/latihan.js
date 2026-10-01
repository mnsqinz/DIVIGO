/* Soal, seret-lepas, keypad, dan pemeriksaan jawaban */
/* ---------- Mesin soal ---------- */
let Q,qi,tries,hinted,mode,mid,qs,fin;
const MT={1:'konsep',2:'konsep',3:'konsep',4:'kali',5:'bil',6:'bers',7:'sisa',8:'cer',10:'konsep'};
function run(id,list,m){Q=list;qi=0;mid=id;mode=m||'learn';qs=[];S.tc=0;show()}
function show(){document.onkeydown=null;if(qi>=Q.length)return finish();const q=Q[qi];tries=0;hinted=false;fin=false;
if(q.t==='dist')q.s={pool:q.total,box:Array(q.groups).fill(0)};
const title=mode==='test'?'🎯 Tes awal':`Misi ${mid}`;
M.innerHTML=`<div class=card><div class=top><span>${title}</span><span>${qi+1}/${Q.length}</span></div><div class=bar><i style="width:${qi/Q.length*100}%"></i></div><div class=q>${q.q}</div>${q.pre?`<pre>${q.pre}</pre>`:''}<div id=in></div><div id=fb class=fb role=status aria-live=polite></div><div class=row id=act></div></div>`;
const A=$('#act'),I=$('#in');
Divi.say('happy',q.t==='dist'?'Seret benda ke kotaknya ya!':pick(MOT.start));
if(q.t==='dist'){drawD();dragInit(q);
I.onclick=e=>{if(fin)return;const s=q.s,a=e.target.closest('[data-a]'),r=e.target.closest('[data-r]');if(a&&s.pool>0){s.box[+a.dataset.a]++;s.pool--;Snd.drop();drawD()}else if(r&&s.box[+r.dataset.r]>0){s.box[+r.dataset.r]--;s.pool++;Snd.tap();drawD()}};
A.innerHTML='<button class=btn id=chk>✔ Periksa</button>';
$('#chk').onclick=()=>{const s=q.s;if(s.pool>0)return bad(`Masih ada ${s.pool} ${q.noun} yang belum dibagikan.`);s.box.every(x=>x===s.box[0])?good():bad('💡 Hampir berhasil! Ada satu benda yang perlu dipindahkan agar semua kelompok sama banyak.')}}
else if(q.t==='mc'){I.innerHTML='<div class=opts>'+q.opts.map((o,i)=>`<button class=opt data-i=${i}>${o}</button>`).join('')+'</div>';I.onclick=e=>{const b=e.target.closest('.opt');if(!b||fin)return;const i=+b.dataset.i;Snd.tap();if(q.free||i===q.a)good();else{b.disabled=true;bad('')}}}
else pad(q);
if(mode==='learn'&&q.hint){A.insertAdjacentHTML('beforeend','<button class="btn s" id=hb>💡 Lihat Petunjuk</button>');$('#hb').onclick=()=>{hinted=true;Snd.tap();$('#fb').innerHTML=`<div>💡 ${q.hint}</div>`}}}
function pad(q){const I=$('#in'),num=q.t==='num';
I.innerHTML=(num?'<input class=ans readonly id=a1 aria-label="Jawaban">':'<input class=ans readonly id=a1 aria-label="Hasil bagi"> <b>sisa</b> <input class=ans readonly id=a2 aria-label="Sisa">')+'<div class=kp>'+[1,2,3,4,5,6,7,8,9,'del',0,'ok'].map(k=>`<button data-k=${k} aria-label="${k}">${k==='del'?'⌫':k==='ok'?'✔':k}</button>`).join('')+'</div>';
const ins=[...I.querySelectorAll('input')];let cur=ins[0];const hl=()=>ins.forEach(x=>x.classList.toggle('on',x===cur));hl();
ins.forEach(x=>x.onclick=()=>{cur=x;hl();Snd.tap()});
q.reset=()=>{ins.forEach(x=>x.value='');cur=ins[0];hl()};
const f=()=>{if(fin)return;if(!num&&cur===ins[0]&&ins[1].value===''&&ins[0].value!==''){cur=ins[1];hl();Snd.tap();return}
if(ins.some(x=>x.value==='')){Snd.tap();return}const v=+ins[0].value;(num?v===q.a:(v===q.a[0]&&+ins[1].value===q.a[1]))?good():bad('')};
const key=k=>{if(fin)return;if(k==='ok')return f();if(k==='del')cur.value=cur.value.slice(0,-1);else if(cur.value.length<4)cur.value+=k;Snd.tap()};
I.onclick=e=>{const b=e.target.closest('[data-k]');if(b)key(b.dataset.k)};
document.onkeydown=e=>{if(/^\d$/.test(e.key))key(e.key);else if(e.key==='Backspace')key('del');else if(e.key==='Enter')key('ok')}}
function drawD(){const q=Q[qi],s=q.s,it=(n,v)=>Array.from({length:n},()=>`<span class=it data-s=${v}>${q.emoji}</span>`).join('');
$('#in').innerHTML=`<div class=pool id=pool aria-label="Belum dibagikan: ${s.pool}">${s.pool?it(s.pool,'p'):'✔ Semua sudah dibagikan'}</div><div class=boxes>`+s.box.map((n,i)=>`<div class=bw data-i=${i} role=group aria-label="${q.names[i]}: ${n}"><b>${q.names[i]}</b><div class=bi>${it(n,i)}</div><div class=ctl><button class=cb data-r=${i} aria-label="Ambil kembali" ${n?'':'disabled'}>−</button><button class=cb data-a=${i} aria-label="Tambah" ${s.pool?'':'disabled'}>＋</button></div></div>`).join('')+`</div><p class=sm>Seret ${q.noun} ke kotak. Bisa juga pakai tombol ＋ dan −.</p>`}
function dragInit(q){const I=$('#in');let g=null;
const mv=e=>{if(g){g.el.style.left=e.clientX+'px';g.el.style.top=e.clientY+'px'}};
I.onpointerdown=e=>{if(fin)return;const it=e.target.closest('.it');if(!it)return;e.preventDefault();g={src:it.dataset.s,el:it.cloneNode(true)};g.el.className='it ghost';document.body.appendChild(g.el);mv(e);it.classList.add('lift');Snd.pick();try{I.setPointerCapture(e.pointerId)}catch(x){}};
I.onpointermove=mv;
I.onpointerup=I.onpointercancel=e=>{if(!g)return;const s=q.s,from=g.src;g.el.style.display='none';const t=document.elementFromPoint(e.clientX,e.clientY);g.el.remove();g=null;
const bw=t&&t.closest('.bw'),to=bw?+bw.dataset.i:(t&&t.closest('#pool'))?'p':null;
if(to===null||String(to)===from)return drawD();
if(from==='p')s.pool--;else s.box[+from]--;
if(to==='p')s.pool++;else s.box[to]++;Snd.drop();drawD()}}
function bad(extra){const q=Q[qi];tries++;if(mode==='test'){return endQ(false,false)}
Snd.retry();Divi.say(tries>=3?'push':'think',pick(tries>=3?MOT.hard:MOT.tryy));if(q.reset)q.reset();const m=document.querySelector('.card');m.classList.remove('wig');void m.offsetWidth;m.classList.add('wig');
let h=`<div>${extra?extra+'<br>':''}${WR[Math.min(tries,3)-1]}`;
if(tries>=(S.help?2:3)&&q.v)h+=vis(q.v[0],q.v[1],q.v[2]);
if(q.hint&&tries>=2)h+=`<br>💡 ${q.hint}`;
h+='</div>';
if(tries>=4){const a=q.t==='mc'?q.opts[q.a]:q.t==='rem'?`${q.a[0]} sisa ${q.a[1]}`:q.t==='dist'?'bagi sama banyak':q.a;h+=`<div style="margin-top:8px">⭐ Kamu semakin dekat! Jawabannya: <b>${a}</b>. Yuk lanjut, kita pelajari bersama.</div>`;$('#fb').innerHTML=h;return endQ(false,true)}
$('#fb').innerHTML=h}
function good(){endQ(true,false)}
function endQ(ok,reveal){const q=Q[qi];fin=true;
if(mode==='test'){if(ok)S.tc++;Snd.tap();Divi.say('happy','Terima kasih sudah mencoba!');qi++;return $('#fb').innerHTML='<div>🌱 Terima kasih sudah mencoba!</div>',nextBtn()}
const f=ok&&tries===0&&!hinted;const t=q.topic||MT[mid];if(t){const s=S.st[t]||(S.st[t]={q:0,f:0});s.q++;if(f)s.f++}
qs.push(f?3:tries<3?2:1);if(ok&&tries>0)S.pers=1;
if(ok){Snd.ok();Divi.say('cheer',tries>0?pick(MOT.pers):pick(MOT.ok))}else Divi.say('think','Kita pelajari bersama ya!');if(ok)$('#fb').innerHTML=`<div class=g>${tries>0?'💪 Luar biasa! Ketekunanmu membuahkan hasil.':'🎉 Hebat! Kamu berhasil!'}${q.ex?'<br>'+q.ex:q.free?'':'<br>Kamu sudah menemukan jawabannya. Yuk lanjut ke tantangan berikutnya!'}</div>`;
else $('#fb').insertAdjacentHTML('beforeend',q.ex?`<div style="margin-top:8px">${q.ex}</div>`:'');
document.querySelectorAll('#in button,#in input,#chk').forEach(e=>e.disabled=true);qi++;save();nextBtn()}
function nextBtn(){const A=$('#act');A.innerHTML='<button class=btn id=nx>➡️ LANJUT MISI</button>';$('#nx').onclick=show;$('#nx').focus()}
function finish(){
if(mode==='test'){Snd.star();Divi.say('happy','Terima kasih sudah mencoba!');S.pre=S.tc;S.help=S.tc<=2;save();M.innerHTML=`<div class="card hero"><div class=mas>🌱</div><h2>Terima kasih sudah mencoba, ${esc(S.name)}!</h2><p>Kita akan mulai dari kegiatan yang sesuai dengan kebutuhan belajarmu. Tes awal digunakan untuk menentukan titik awal pembelajaran.</p><button class=btn id=m>🗺️ LIHAT PETA MISI</button></div>`;return $('#m').onclick=map}
const s=Math.max(1,Math.round(qs.reduce((a,b)=>a+b,0)/qs.length));S.done[mid]=Math.max(S.done[mid]||0,s);save();
Snd.win();const last=mid===10;Divi.say('cheer',last?'Kamu Master Pembagian! 👑':'Misi selesai! Aku bangga padamu!');M.innerHTML=`<div class="card hero"><div class=mas>${last?'👑':'🏆'}</div><h2>${last?'Kamu Master Pembagian!':'Misi selesai!'}</h2><div class=big>${'⭐'.repeat(s)}</div><p>${last?'🌟 Kamu sudah berusaha dan belajar banyak hari ini! Ingat, memahami matematika membutuhkan latihan. Teruslah mencoba dan jangan takut membuat kesalahan.':'Kamu telah menambah pengetahuan baru. Bintang diberikan untuk usahamu!'}</p><div class=row style="justify-content:center"><button class=btn id=m>🗺️ Peta Misi</button>${last?'':'<button class="btn s" id=nx>Misi berikutnya ➡️</button>'}</div></div>`;
$('#m').onclick=map;if(!last)$('#nx').onclick=()=>mission(mid+1)}

