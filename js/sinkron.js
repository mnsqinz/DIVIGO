/* Sinkronisasi progres ke server sekolah (opsional, aktif jika DIVIGO_API diisi) */
const API=(typeof DIVIGO_API==='string'&&DIVIGO_API)||'';
const Sync={on:!!API,tok:null,gtok:null,pend:null,dirty:false,
async call(a,body,t){const r=await fetch(API+(API.includes('?')?'&':'?')+'a='+a,{method:'POST',headers:Object.assign({'Content-Type':'application/json'},t?{'X-Token':t}:{}),body:JSON.stringify(body||{})});let j={};try{j=await r.json()}catch(e){}if(!r.ok){const e=new Error(j.error||'Terjadi kendala. Coba lagi ya.');e.code=r.status;throw e}return j},
push(s){if(!this.tok)return;clearTimeout(this.pend);this.dirty=true;this.pend=setTimeout(()=>this.flush(s),700)},
async flush(s){try{await this.call('simpan',{data:s},this.tok);this.dirty=false}catch(e){if(e.code===401)this.tok=null}}};
addEventListener('online',()=>{if(Sync.dirty&&typeof S!=='undefined'&&S)Sync.flush(S)});
