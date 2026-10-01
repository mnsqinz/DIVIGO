/* Divi, karakter DIVIGO: selalu tersenyum, ekspresinya berubah sesuai suasana */
const Divi=(()=>{
const S3='stroke="#3b1f2b" stroke-width="3.5" fill="none" stroke-linecap="round"';
const eye=(x,m)=>m==='cheer'?`<path d="M${x-7} 46q7-9 14 0" ${S3}/>`:`<ellipse cx="${x}" cy="46" rx="6.5" ry="7.5" fill="#fff"/><circle cx="${x+(m==='think'?2:0)}" cy="${m==='think'?44:47}" r="3.6" fill="#3b1f2b"/>`;
const mouth=m=>m==='cheer'?'<path d="M34 58q16 22 32 0z" fill="#9c2f4f"/><path d="M42 66q8 6 16 0" fill="#ff8fa8"/>':`<path d="M37 60q13 12 26 0" ${S3}/>`;
const extra=m=>m==='think'?`<path d="M56 32q7-6 14-1" ${S3}/><text x="78" y="26" font-size="20" font-weight="800" fill="#ffc933">?</text>`:m==='push'?`<path d="M30 33q7-4 13 0M57 33q6-4 13 0" ${S3}/><text x="2" y="30" font-size="20">💪</text>`:m==='cheer'?'<text x="4" y="24" font-size="18">⭐</text><text x="78" y="22" font-size="18">🎉</text>':'';
const svg=m=>`<svg viewBox="0 0 100 100" class="dv ${m}" role="img" aria-label="Divi, karakter DIVIGO yang selalu tersenyum"><path d="M20 40Q18 14 42 16Q50 6 60 16Q84 14 80 40" fill="#ff9bb5"/><circle cx="50" cy="56" r="36" fill="#ff9bb5"/><path d="M38 24q6 8 0 14M62 24q-6 8 0 14" stroke="#e5708f" stroke-width="3" fill="none" stroke-linecap="round"/>${eye(38,m)}${eye(62,m)}<circle cx="28" cy="58" r="5" fill="#ff6f91" opacity=".6"/><circle cx="72" cy="58" r="5" fill="#ff6f91" opacity=".6"/>${mouth(m)}${extra(m)}</svg>`;
return{svg,say(m,t){const e=document.getElementById('divi');if(e)e.innerHTML=svg(m)+`<div class=bub>${t}</div>`}}})();
