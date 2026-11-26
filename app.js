const $=s=>document.querySelector(s),p2=n=>String(n).padStart(2,"0");
const key=d=>`${d.getFullYear()}-${p2(d.getMonth()+1)}-${p2(d.getDate())}`;
const MES=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const today=new Date();today.setHours(0,0,0,0);
const maxD=new Date(today);maxD.setDate(maxD.getDate()+CONFIG.diasAdelante);
let SERVICIOS=CONFIG.servicios,PROS=CONFIG.profesionales;
const CATEGORIAS_OFICIALES=CONFIG.servicios.map(s=>s.n);
const catalogoDeServiciosValido=servicios=>servicios.length===CATEGORIAS_OFICIALES.length&&CATEGORIAS_OFICIALES.every(nombre=>servicios.some(s=>s.n===nombre));
const proDe=id=>PROS.find(p=>p.id===id)||PROS[0];
let view=new Date(today.getFullYear(),today.getMonth(),1),selD=null,selT=null,selP=null,selE=null,booked={};
const demo=firebaseConfig.apiKey.startsWith("TU_");
let db,F,unsub=null,fbReady=null,tok=0;

$("#waFlot").href="https://wa.me/"+CONFIG.whatsapp;
const renderServices=()=>$("#cats").innerHTML=SERVICIOS.map((s,i)=>{const description=(s.items||[]).filter(Boolean).join(" ");return`<article class="card service-card"><span class="service-card__number">${String(i+1).padStart(2,"0")}</span><h3>${s.n}</h3><p class="service-card__description">${description}</p>${s.p?`<small>Consultar disponibilidad</small>`:""}</article>`}).join("");
renderServices();

/* Menú responsive */
const navToggle=$("#navToggle"),mainNav=$("#mainNav");
if(navToggle&&mainNav){
 const closeMenu=()=>{navToggle.classList.remove("is-open");mainNav.classList.remove("is-open");navToggle.setAttribute("aria-expanded","false");navToggle.setAttribute("aria-label","Abrir menú")};
 navToggle.onclick=()=>{const open=!mainNav.classList.contains("is-open");navToggle.classList.toggle("is-open",open);mainNav.classList.toggle("is-open",open);navToggle.setAttribute("aria-expanded",String(open));navToggle.setAttribute("aria-label",open?"Cerrar menú":"Abrir menú")};
 mainNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
 document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()});
}

/* Contadores que comienzan al entrar en pantalla */
const counters=[...document.querySelectorAll(".counter")];
function animateCounter(el){
 const target=Number(el.dataset.target||0),prefix=el.dataset.prefix||"",suffix=el.dataset.suffix||"",duration=1500,start=performance.now();
 const draw=now=>{const progress=Math.min((now-start)/duration,1),ease=1-Math.pow(1-progress,3),value=Math.round(target*ease);el.textContent=prefix+(value>=1000?value.toLocaleString("es-AR"):value)+suffix;if(progress<1)requestAnimationFrame(draw)};
 requestAnimationFrame(draw);
}
if("IntersectionObserver" in window){
 const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){animateCounter(entry.target);counterObserver.unobserve(entry.target)}}),{threshold:.35});
 counters.forEach(el=>counterObserver.observe(el));
}else counters.forEach(animateCounter);

/* Carrusel de trabajos: preparado para imágenes verticales en assets/ */
const TRABAJOS=[
 {src:"assets/trabajo-01.jpg",alt:"Trabajo de manicura clásica"},
 {src:"assets/trabajo-02.jpg",alt:"Trabajo de pedicura"},
 {src:"assets/trabajo-03.jpg",alt:"Trabajo de uñas con Gel Rubber"},
 {src:"assets/trabajo-04.jpeg",alt:"Trabajo de uñas acrílicas"},
 {src:"assets/trabajo-05.jpeg",alt:"Diseño de Nail Art"},
 {src:"assets/trabajo-06.jpeg",alt:"Diseño de uñas nude y elegante"},
 {src:"assets/trabajo-07.jpeg",alt:"Diseño minimalista de Nail Art"},
 {src:"assets/trabajo-08.jpeg",alt:"Uñas acrílicas con acabado sofisticado"}
];
const renderWorks=()=>$("#workTrack").innerHTML=TRABAJOS.map(work=>`<figure class="work-card"><div class="work-card__media"><img src="${work.src}" alt="${work.alt}" loading="lazy" onerror="this.remove();this.parentElement.classList.add('is-missing')"><span class="work-card__placeholder">Cargá una imagen vertical</span></div></figure>`).join("");
renderWorks();
const workCarousel=$("#workCarousel"),workTrack=$("#workTrack"),workPrev=$("#workPrev"),workNext=$("#workNext"),workDots=$("#workDots");
if(workCarousel&&workTrack){
 const workCards=[...workTrack.children],reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
 let workIndex=0,workTimer=null;
 const visibleWorks=()=>window.innerWidth<=600?1:window.innerWidth<=940?2:4;
 const maxWorkIndex=()=>Math.max(0,workCards.length-visibleWorks());
 const updateDots=()=>{
  const total=maxWorkIndex()+1;
  if(workIndex>=total)workIndex=total-1;
  workDots.innerHTML=Array.from({length:total},(_,i)=>`<button type="button" role="tab" aria-label="Ir al grupo ${i+1}" aria-selected="${i===workIndex}" data-slide="${i}"></button>`).join("");
  workDots.querySelectorAll("button").forEach(dot=>dot.onclick=()=>{workIndex=Number(dot.dataset.slide);updateCarousel();startWorkAuto()});
 };
 const updateCarousel=()=>{
  const cardWidth=workCards[0]?.getBoundingClientRect().width||0,gap=parseFloat(getComputedStyle(workTrack).gap)||20;
  workIndex=Math.min(workIndex,maxWorkIndex());workTrack.style.transform=`translate3d(-${workIndex*(cardWidth+gap)}px,0,0)`;
  workPrev.disabled=workIndex===0;workNext.disabled=workIndex===maxWorkIndex();
  workDots.querySelectorAll("button").forEach((dot,i)=>dot.setAttribute("aria-selected",String(i===workIndex)));
 };
 const goToWork=index=>{const max=maxWorkIndex();workIndex=index>max?0:index<0?max:index;updateCarousel()};
 const startWorkAuto=()=>{clearInterval(workTimer);workTimer=null;if(!reduceMotion.matches&&maxWorkIndex()>0)workTimer=setInterval(()=>goToWork(workIndex+1),5000)};
 workPrev.onclick=()=>{goToWork(workIndex-1);startWorkAuto()};workNext.onclick=()=>{goToWork(workIndex+1);startWorkAuto()};
 workCarousel.addEventListener("mouseenter",()=>clearInterval(workTimer));workCarousel.addEventListener("mouseleave",startWorkAuto);workCarousel.addEventListener("focusin",()=>clearInterval(workTimer));workCarousel.addEventListener("focusout",e=>{if(!workCarousel.contains(e.relatedTarget))startWorkAuto()});
 updateDots();updateCarousel();startWorkAuto();
 window.addEventListener("resize",()=>{updateDots();updateCarousel();startWorkAuto()});
}

/* Consulta personalizada por WhatsApp */
const consultaForm=$("#consultaForm");
if(consultaForm){
 const consultaStatus=$("#consultaStatus");
 consultaForm.onsubmit=e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(e.target));
  const msg=`Hola Maison Studio! Quiero hacer una consulta personalizada:\n\nNombre: ${data.nombre.trim()}\nTeléfono: ${data.telefono.trim()}\nConsulta: ${data.mensaje.trim()}`;
  const url=`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  consultaStatus.textContent="Abrimos WhatsApp para que puedas enviar tu consulta.";
  consultaStatus.classList.remove("hide");
  e.target.reset();
  window.open(url,"_blank","noopener");
 };
}

const toM=t=>{const[a,b]=t.split(":");return a*60+ +b};
function slotsDe(d,p){const h=(p.horarios||CONFIG.horarios)[d.getDay()];if(!h)return[];const o=[];for(let m=toM(h[0]);m+CONFIG.duracion<=toM(h[1]);m+=CONFIG.duracion)o.push(p2(m/60|0)+":"+p2(m%60));return o}
const idOf=(f,t,p)=>`${f}_${t.replace(":","")}_${p}`;
const fmtF=f=>f.split("-").reverse().join("/");
const prosDe=(e,dt)=>PROS.filter(p=>(!p.esp||p.esp.includes(e))&&slotsDe(dt,p).length);
const espsDe=dt=>SERVICIOS.map(s=>s.n).filter(e=>prosDe(e,dt).length);
const horariosDe=(e,dt)=>[...new Set(prosDe(e,dt).flatMap(p=>slotsDe(dt,p)))].sort((a,b)=>toM(a)-toM(b));
const proParaHorario=(fecha,e,dt,hora)=>prosDe(e,dt).find(p=>!booked[idOf(fecha,hora,p.id)]);

function cal(){
 const y=view.getFullYear(),m=view.getMonth();
 $("#mes").textContent=MES[m]+" "+y;
 let h=["L","M","M","J","V","S","D"].map(x=>`<b>${x}</b>`).join("");
 h+="<i></i>".repeat((new Date(y,m,1).getDay()+6)%7);
 for(let d=1,n=new Date(y,m+1,0).getDate();d<=n;d++){
  const dt=new Date(y,m,d),k=key(dt),ok=dt>=today&&dt<=maxD&&PROS.some(p=>slotsDe(dt,p).length);
  h+=`<button class="day${k===selD?" sel":""}${+dt===+today?" hoy":""}" data-d="${k}" ${ok?"":"disabled"}>${d}</button>`;
 }
 $("#grid").innerHTML=h;
 $("#prev").disabled=view<=new Date(today.getFullYear(),today.getMonth(),1);
 $("#next").disabled=new Date(y,m+1,1)>maxD;
}
function slots(){
 if(!selD)return;
 const[y,m,d]=selD.split("-").map(Number),dt=new Date(y,m-1,d),now=new Date(),es=espsDe(dt);
 if(selE&&!es.includes(selE)){selE=selP=selT=null}
 const chips=(a,k,sel)=>a.map(x=>`<button type="button" class="${x.id===sel?"on":""}" data-${k}="${x.id}">${x.n}</button>`).join("");
 $("#slotHint").classList.add("hide");$("#fechaTxt").classList.remove("hide");
 $("#fechaTxt").textContent=dt.toLocaleDateString("es-AR",{weekday:"long",day:"numeric",month:"long"});
 $("#espBox").classList.remove("hide");
 $("#esps").innerHTML=es.length?chips(es.map(n=>({id:n,n})),"e",selE):'<p class="hint" style="margin:0">No hay atención ese día.</p>';
 const ver=!!selE;
 const horarios=ver?horariosDe(selE,dt):[];
 if(selT)selP=proParaHorario(selD,selE,dt,selT)?.id||null;
 $("#horBox").classList.toggle("hide",!ver);$("#legend").classList.toggle("hide",!ver);
 $("#slots").innerHTML=ver?horarios.map(t=>{
  const pro=proParaHorario(selD,selE,dt,t),bloqueados=prosDe(selE,dt).filter(p=>booked[idOf(selD,t,p.id)]);
  if(!pro)return`<button class="slot" disabled><s>${t}</s><small>${bloqueados.some(p=>booked[idOf(selD,t,p.id)]==="confirmado")?"Reservado":"Pendiente"}</small></button>`;
  const past=selD===key(now)&&new Date(`${selD}T${t}`)<=now;
  return`<button class="slot${t===selT?" sel":""}" data-t="${t}" ${past?"disabled":""}>${t}</button>`;
 }).join(""):"";
}
function refresh(){
 if(selT&&selD&&selE){const[y,m,d]=selD.split("-").map(Number),dt=new Date(y,m-1,d);selP=proParaHorario(selD,selE,dt,selT)?.id||null;if(!selP){selT=null;$("#formBox").classList.add("hide")}}
 cal();slots();
}
function limpiarSel(){
 selD=selT=selE=selP=null;$("#formBox").classList.add("hide");$("#slotHint").classList.remove("hide");
 ["#fechaTxt","#espBox","#horBox","#legend"].forEach(s=>$(s).classList.add("hide"));$("#slots").innerHTML="";
}

/* Solo se descargan los turnos ocupados del mes que se está mirando */
function escuchar(){
 if(demo){refresh();return}
 const y=view.getFullYear(),m=view.getMonth(),mm=p2(m+1),my=++tok;
 const lo=(y===today.getFullYear()&&m===today.getMonth())?key(today):`${y}-${mm}-01`,hi=`${y}-${mm}-31`;
 if(unsub){unsub();unsub=null}
 booked={};refresh();
 fbReady.then(()=>{
  if(my!==tok)return;
  unsub=F.onSnapshot(F.query(F.collection(db,"ocupados"),F.where("fecha",">=",lo),F.where("fecha","<=",hi)),snap=>{
   booked={};snap.forEach(d=>booked[d.id]=d.data().estado);refresh();
  },()=>{$("#slotHint").textContent="No se pudo cargar la disponibilidad. Recargá la página."});
 }).catch(()=>{$("#slotHint").textContent="No se pudo conectar con Firebase. Recargá la página."});
}
async function guardar(id,rec){
 if(demo){booked[id]="pendiente";try{localStorage.setItem("maison_demo2",JSON.stringify(booked))}catch(e){}return}
 await fbReady;
 const b=F.writeBatch(db);
 b.set(F.doc(db,"ocupados",id),{fecha:rec.fecha,hora:rec.hora,pro:rec.pro,estado:"pendiente"});
 b.set(F.doc(db,"turnos",id),{...rec,creado:F.serverTimestamp()});
 await b.commit();
}
if(demo){
 $("#demo").classList.remove("hide");
 try{booked=JSON.parse(localStorage.getItem("maison_demo2")||"{}")}catch(e){}
}else{
 const FB="https://www.gstatic.com/firebasejs/10.12.2/";
 fbReady=Promise.all([import(FB+"firebase-app.js"),import(FB+"firebase-firestore.js")]).then(([a,f])=>{F=f;db=f.getFirestore(a.initializeApp(firebaseConfig))});
}

$("#grid").onclick=e=>{const b=e.target.closest(".day");if(!b)return;selD=b.dataset.d;selT=null;$("#formBox").classList.add("hide");$("#okBox").classList.add("hide");refresh()};
$("#esps").onclick=e=>{const b=e.target.closest("[data-e]");if(!b)return;selE=b.dataset.e;selP=null;selT=null;$("#formBox").classList.add("hide");slots()};
$("#slots").onclick=e=>{
 const b=e.target.closest("[data-t]");if(!b)return;selT=b.dataset.t;
 const[y,m,d]=selD.split("-").map(Number),dt=new Date(y,m-1,d);selP=proParaHorario(selD,selE,dt,selT)?.id||null;
 if(!selP){slots();return}
 $("#okBox").classList.add("hide");$("#formBox").classList.remove("hide");$("#err").classList.add("hide");
 $("#resumen").textContent="Turno de "+selE+": "+fmtF(selD)+" a las "+selT+" h";
 slots();$("#formBox").scrollIntoView({behavior:"smooth",block:"nearest"});
};
const mover=n=>{view=new Date(view.getFullYear(),view.getMonth()+n,1);limpiarSel();$("#okBox").classList.add("hide");cal();escuchar()};
$("#prev").onclick=()=>mover(-1);$("#next").onclick=()=>mover(1);

$("#form").onsubmit=async e=>{
 e.preventDefault();
 const f=Object.fromEntries(new FormData(e.target)),btn=$("#enviar"),err=$("#err"),id=idOf(selD,selT,selP);
 const rec={nombre:f.nombre.trim(),telefono:f.telefono.trim(),servicio:selE,comentario:(f.comentario||"").trim(),fecha:selD,hora:selT,pro:selP};
 btn.disabled=true;btn.textContent="Reservando…";err.classList.add("hide");
 try{await guardar(id,rec)}
 catch(x){
  err.textContent=x.code==="permission-denied"?"Ese horario se acaba de ocupar. Elegí otro, por favor.":"No pudimos guardar el turno. Revisá tu conexión e intentá de nuevo.";
  err.classList.remove("hide");btn.disabled=false;btn.textContent="Reservar turno";
  if(x.code==="permission-denied"){booked[id]="pendiente";refresh()}
  return;
 }
 const msg=`Hola Maison Studio! Quiero reservar un turno:\n\nNombre: ${rec.nombre}\nTeléfono: ${rec.telefono}\nServicio: ${rec.servicio}\nFecha: ${fmtF(rec.fecha)}\nHora: ${rec.hora} h\n`+(rec.comentario?`Comentarios: ${rec.comentario}\n`:"")+`\nTurno pendiente de confirmación.`;
 const url=`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
 $("#waLink").href=url;
 $("#formBox").classList.add("hide");$("#okBox").classList.remove("hide");
 e.target.reset();btn.disabled=false;btn.textContent="Reservar turno";
 booked[id]="pendiente";selT=null;refresh();
 window.open(url,"_blank");
};
$("#otro").onclick=()=>$("#okBox").classList.add("hide");

async function cargarCatalogoPublico(){
 if(demo)return;
 try{
  await fbReady;
  const snap=await F.getDoc(F.doc(db,"config","catalogo"));
  if(!snap.exists())return;
  const data=snap.data();
  if(Array.isArray(data.servicios)){
   const serviciosRemotos=data.servicios.filter(s=>s&&s.n).map(s=>({n:String(s.n),p:String(s.p||""),items:Array.isArray(s.items)?s.items.filter(Boolean).map(String):[]}));
   SERVICIOS=catalogoDeServiciosValido(serviciosRemotos)?serviciosRemotos:CONFIG.servicios;
  }
  if(Array.isArray(data.profesionales))PROS=data.profesionales.filter(p=>p&&p.id&&p.n).map(p=>{const clean={id:String(p.id),n:String(p.n)};if(Array.isArray(p.esp)&&p.esp.length)clean.esp=p.esp.filter(Boolean).map(String);return clean});
  renderServices();refresh();
 }catch(e){/* Se mantiene el catálogo local si Firebase no permite lectura pública. */}
}

cal();escuchar();cargarCatalogoPublico();
