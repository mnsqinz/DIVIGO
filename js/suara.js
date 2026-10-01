/* Efek suara dibuat langsung dengan WebAudio, jadi tidak perlu file audio */
const Snd=(()=>{let ctx=null,on=true;try{on=localStorage.getItem('divigo_snd')!=='0'}catch(e){}
const c=()=>{if(!ctx){try{ctx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){return null}}if(ctx.state==='suspended')ctx.resume();return ctx};
const tone=(f,t0,d,type='sine',v=.14)=>{const a=c();if(!a||!on)return;const o=a.createOscillator(),g=a.createGain(),t=a.currentTime+t0;o.type=type;o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+d+.05)};
const seq=(n,gap,d,type)=>n.forEach((f,i)=>tone(f,i*gap,d,type));
return{get on(){return on},unlock(){c()},toggle(){on=!on;try{localStorage.setItem('divigo_snd',on?'1':'0')}catch(e){}if(on)this.tap();return on},
tap(){tone(660,0,.07,'triangle',.08)},pick(){tone(520,0,.06,'triangle',.08)},drop(){tone(392,0,.1,'sine',.12)},
ok(){seq([523,659,784],.09,.18,'triangle')},retry(){seq([440,523],.12,.2,'sine')},star(){seq([880,1175],.08,.15,'triangle')},win(){seq([523,659,784,1047,784,1047],.12,.22,'triangle')}}})();
