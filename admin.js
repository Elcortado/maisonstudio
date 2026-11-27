const FB="https://www.gstatic.com/firebasejs/10.12.2/";
const PAIS="549"; // prefijo para armar el link de WhatsApp si la clienta no escribió el código de país

const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const key=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const fmtF=f=>f.split("-").reverse().join("/");
const hoy0=()=>{const d=new Date();d.setHours(0,0,0,0);return d};
const copyCatalog=()=>({servicios:CONFIG.servicios.map(s=>({n:String(s.n),p:String(s.p||"Consultar"),items:Array.isArray(s.items)?s.items.map(String):[]})),profesionales:CONFIG.profesionales.map(p=>{const clean={id:String(p.id),n:String(p.n)};if(Array.isArray(p.esp)&&p.esp.length)clean.esp=p.esp.map(String);return clean})});
const CATEGORIAS_OFICIALES=CONFIG.servicios.map(s=>s.n);
const catalogoDeServiciosValido=servicios=>servicios.length===CATEGORIAS_OFICIALES.length&&CATEGORIAS_OFICIALES.every(nombre=>servicios.some(s=>s.n===nombre));
let catalog=copyCatalog();
const PN=id=>(catalog.profesionales.find(p=>p.id===id)||{}).n||"";
const esp=t=>(catalog.servicios.find(s=>s.n===t.servicio||s.items.includes(t.servicio))||{n:"Otro"}).n; // servicio = categoría del catálogo
let F,AU,db,auth,turnos={},estados={},unsubs=[],fe="todos",ef="",dD=key(hoy0()),dH="";

function wa(t){
 let d=String(t.telefono).replace(/\D/g,"").replace(/^0+/,"");
 if(!d.startsWith("54"))d=PAIS+d;
 const momento=t.hora&&t.hora!=="A confirmar"?` el ${fmtF(t.fecha)} a las ${t.hora} h`:` el ${fmtF(t.fecha)}; coordinamos el horario por WhatsApp`;
 const m=`Hola ${t.nombre}! Te confirmamos tu cita de ${t.servicio}${PN(t.pro)?" con "+PN(t.pro):""}${momento}. ¡Te esperamos en Maison Studio!`;
 return`https://wa.me/${d}?text=${encodeURIComponent(m)}`;
}
const txtRango=()=>dD&&dH?(dD===dH?`el ${fmtF(dD)}`:`del ${fmtF(dD)} al ${fmtF(dH)}`):dD?`desde el ${fmtF(dD)} en adelante`:dH?`hasta el ${fmtF(dH)}`:"en todo el historial";

function render(){
 const all=Object.entries(turnos).map(([id,t])=>({...t,id,estado:t.estado||estados[id]||"pendiente"}));
 const rows=all.filter(t=>(!ef||esp(t)===ef)&&(fe==="todos"||t.estado===fe))
  .sort((a,b)=>(a.fecha+(a.hora||"")).localeCompare(b.fecha+(b.hora||"")));
 const pend=rows.filter(t=>t.estado==="pendiente").length;
 const cuenta=f=>{const m={};rows.forEach(t=>{const k=f(t);m[k]=(m[k]||0)+1});return Object.entries(m).map(([k,v])=>`${esc(k)} <b>${v}</b>`).join(" · ")};
 $("#tot").innerHTML=`<p class="n"><b>${rows.length}</b> ${rows.length===1?"cita":"citas"} ${txtRango()}</p>`+(rows.length
  ?`<p>${pend} pendientes · ${rows.length-pend} confirmados</p><p>Por servicio: ${cuenta(esp)}</p>`+(catalog.profesionales.length>1?`<p>Por profesional: ${cuenta(t=>PN(t.pro)||"Sin asignar")}</p>`:""):"");
 if(!rows.length){$("#lista").innerHTML='<p class="vacio">No hay citas para esta selección.</p>';return}
 let h="",dia="";
 for(const t of rows){
  if(t.fecha!==dia){
   dia=t.fecha;const[y,m,d]=dia.split("-").map(Number);
   h+=`<h3 class="dia">${new Date(y,m-1,d).toLocaleDateString("es-AR",{weekday:"long",day:"numeric",month:"long"})}</h3>`;
  }
  const ok=t.estado==="confirmado";
  h+=`<div class="t"><div class="h">${esc(t.hora&&t.hora!=="A confirmar"?t.hora:"Horario a coordinar")}</div>
   <div><p><strong>${esc(t.nombre)}</strong> <span class="tag${ok?" ok":""}">${ok?"Confirmado":"Pendiente"}</span></p>
   <p>${esc(esp(t))}${t.servicio!==esp(t)?": "+esc(t.servicio):""}${PN(t.pro)?" · "+esc(PN(t.pro)):""} · Tel. ${esc(t.telefono)}</p>${t.comentario?`<p>“${esc(t.comentario)}”</p>`:""}</div>
   <div class="acc">${ok?"":`<button class="btn" data-a="ok" data-id="${esc(t.id)}">Confirmar</button>`}
   <a class="btn g" target="_blank" rel="noopener" href="${esc(wa(t))}">WhatsApp</a>
   <button class="btn r" data-a="del" data-id="${esc(t.id)}">Cancelar</button></div></div>`;
 }
 $("#lista").innerHTML=h;
}

const aviso=m=>{$("#aviso").textContent=m;$("#aviso").classList.remove("hide")};
const sinPermiso=()=>aviso("No tienes permiso para ver las citas. Revisa las reglas de Firestore y que el UID cargado sea el tuyo.");
const catalogStatus=m=>{const el=$("#catalogStatus");el.textContent=m;el.classList.remove("hide")};
const slug=s=>String(s).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");

function renderCatalogo(){
 const espList=$("#espList"),proList=$("#proList");
 if(!espList||!proList)return;
 $("#espCount").textContent=catalog.servicios.length;
 $("#proCount").textContent=catalog.profesionales.length;
 espList.innerHTML=catalog.servicios.length?catalog.servicios.map(s=>`<div class="catalog-item"><div class="catalog-item__main"><strong>${esc(s.n)}</strong><small>${esc((s.items||[]).join(" · ")||"Sin descripción")} · Desde ${esc(s.p||"Consultar")}</small></div><button class="delete-catalog" type="button" data-del-catalog="esp" data-id="${esc(s.n)}">Borrar</button></div>`).join(""):'<p class="vacio">Todavía no hay servicios cargados.</p>';
 proList.innerHTML=catalog.profesionales.length?catalog.profesionales.map(p=>`<div class="catalog-item"><div class="catalog-item__main"><strong>${esc(p.n)}</strong><small>${esc(Array.isArray(p.esp)&&p.esp.length?p.esp.join(" · "):"Todas las especialidades")}</small></div><button class="delete-catalog" type="button" data-del-catalog="pro" data-id="${esc(p.id)}">Borrar</button></div>`).join(""):'<p class="vacio">Todavía no hay especialistas cargados.</p>';
}
function renderFiltros(){
  const espActual=catalog.servicios.some(s=>s.n===ef);
  if(!espActual)ef="";
 $("#efil").innerHTML='<option value="">Todas</option>'+[...catalog.servicios.map(s=>s.n),"Otro"].map(n=>`<option>${esc(n)}</option>`).join("");
  $("#efil").value=ef;
}
async function cargarCatalogo(){
 const snap=await F.getDoc(F.doc(db,"config","catalogo"));
 if(snap.exists()){
  const data=snap.data();
   if(Array.isArray(data.servicios)){
    const serviciosRemotos=data.servicios.filter(s=>s&&s.n).map(s=>({n:String(s.n),p:String(s.p||"Consultar"),items:Array.isArray(s.items)?s.items.filter(Boolean).map(String):[]}));
    if(catalogoDeServiciosValido(serviciosRemotos))catalog.servicios=serviciosRemotos;
   }
  if(Array.isArray(data.profesionales))catalog.profesionales=data.profesionales.filter(p=>p&&p.id&&p.n).map(p=>{const clean={id:String(p.id),n:String(p.n)};if(Array.isArray(p.esp)&&p.esp.length)clean.esp=p.esp.filter(Boolean).map(String);return clean});
 }
 renderCatalogo();renderFiltros();
}
async function guardarCatalogo(){
 const data={
  servicios:catalog.servicios.map(s=>({n:String(s.n),p:String(s.p||"Consultar"),items:Array.isArray(s.items)?s.items.filter(Boolean).map(String):[]})),
  profesionales:catalog.profesionales.map(p=>{const clean={id:String(p.id),n:String(p.n)};if(Array.isArray(p.esp)&&p.esp.length)clean.esp=p.esp.filter(Boolean).map(String);return clean})
 };
 await F.setDoc(F.doc(db,"config","catalogo"),data);
 renderCatalogo();renderFiltros();render();
}

/* Solo se leen los turnos del rango elegido */
function suscribir(){
 unsubs.forEach(u=>u());turnos={};estados={};render();
 const w=[];if(dD)w.push(F.where("fecha",">=",dD));if(dH)w.push(F.where("fecha","<=",dH));
 const q=c=>F.query(F.collection(db,c),...w);
 unsubs=[
  F.onSnapshot(q("turnos"),s=>{turnos={};s.forEach(d=>turnos[d.id]=d.data());render()},sinPermiso),
  F.onSnapshot(q("ocupados"),s=>{estados={};s.forEach(d=>estados[d.id]=d.data().estado);render()},sinPermiso)
 ];
}
function rango(r){
 const h=hoy0();
 if(r==="prox"){dD=key(h);dH=""}
 else if(r==="hoy"){dD=dH=key(h)}
 else if(r==="mes"){dD=key(new Date(h.getFullYear(),h.getMonth(),1));dH=key(new Date(h.getFullYear(),h.getMonth()+1,0))}
 else if(r==="30"){const a=new Date(h);a.setDate(a.getDate()-30);dD=key(a);dH=key(h)}
 else{dD=dH=""}
 $("#fd").value=dD;$("#fh").value=dH;suscribir();
}
async function entrar(u){
 $("#loginBox").classList.add("hide");$("#panel").classList.remove("hide");$("#salir").classList.remove("hide");
 $("#quien").textContent=u.email;
 try{await cargarCatalogo()}catch(x){catalogStatus("No se pudo cargar el catálogo guardado. Se muestra la configuración local.");renderCatalogo();renderFiltros()}
 suscribir();
}
function salir(){
 unsubs.forEach(u=>u());unsubs=[];turnos={};estados={};
 $("#panel").classList.add("hide");$("#salir").classList.add("hide");$("#quien").textContent="";
 $("#aviso").classList.add("hide");$("#loginBox").classList.remove("hide");
}

$("#tabs").onclick=e=>{
 const b=e.target.closest("[data-f]");if(!b)return;
 fe=b.dataset.f;document.querySelectorAll("#tabs button").forEach(x=>x.classList.toggle("on",x===b));render();
};
$("#rapidos").onclick=e=>{const b=e.target.closest("[data-r]");if(b)rango(b.dataset.r)};
$("#fd").onchange=$("#fh").onchange=()=>{
 dD=$("#fd").value;dH=$("#fh").value;
 if(dD&&dH&&dD>dH){[dD,dH]=[dH,dD];$("#fd").value=dD;$("#fh").value=dH}
 suscribir();
};
$("#efil").onchange=e=>{ef=e.target.value;render()};
renderFiltros();
$("#fd").value=dD;

$("#togglePass").onclick=()=>{
 const input=$("#pass"),visible=input.type==="text";
 input.type=visible?"password":"text";$("#togglePass").textContent=visible?"Mostrar":"Ocultar";$("#togglePass").setAttribute("aria-label",visible?"Mostrar contraseña":"Ocultar contraseña");$("#togglePass").setAttribute("aria-pressed",String(!visible));
};

$("#espForm").onsubmit=async e=>{
 e.preventDefault();
 const name=$("#nuevaEsp").value.trim(),price=$("#precioEsp").value.trim()||"Consultar",items=$("#tratamientosEsp").value.split(/[\n,]/).map(x=>x.trim()).filter(Boolean),button=e.submitter;
  if(catalog.servicios.some(s=>s.n.toLocaleLowerCase()===name.toLocaleLowerCase())){catalogStatus("Ese servicio ya existe.");return}
  catalog.servicios.push({n:name,p:price,items:items.length?items:["Consultar servicio"]});button.disabled=true;
  try{await guardarCatalogo();e.target.reset();catalogStatus("Servicio agregado correctamente.")}catch(x){catalog.servicios.pop();console.error(x);catalogStatus(`No se pudo guardar el servicio (${x.code||"error"}). Revisa las reglas de Firestore.`)}finally{button.disabled=false}
};
$("#proForm").onsubmit=async e=>{
 e.preventDefault();
 const name=$("#nuevoPro").value.trim(),input=$("#especialidadesPro").value,requested=input.split(/[\n,]/).map(x=>x.trim().toLocaleLowerCase()).filter(Boolean),assigned=catalog.servicios.map(s=>s.n).filter(n=>requested.includes(n.toLocaleLowerCase())),button=e.submitter;
 if(catalog.profesionales.some(p=>p.n.toLocaleLowerCase()===name.toLocaleLowerCase())){catalogStatus("Ese especialista ya existe.");return}
 const id=`${slug(name)||"especialista"}-${Date.now().toString(36)}`;
 catalog.profesionales.push(assigned.length?{id,n:name,esp:assigned}:{id,n:name});button.disabled=true;
 try{await guardarCatalogo();e.target.reset();catalogStatus("Especialista agregado correctamente.")}catch(x){catalog.profesionales.pop();console.error(x);catalogStatus(`No se pudo guardar el especialista (${x.code||"error"}). Revisa las reglas de Firestore.`)}finally{button.disabled=false}
};
$("#catalogo").onclick=async e=>{
 const button=e.target.closest("[data-del-catalog]");if(!button)return;
 const type=button.dataset.delCatalog,id=button.dataset.id;
  if(!confirm(`¿Borrar ${type==="esp"?"este servicio":"este especialista"}?`))return;
 const previous=catalog;
 if(type==="esp"){
  catalog.servicios=catalog.servicios.filter(s=>s.n!==id);
  catalog.profesionales=catalog.profesionales.map(p=>Array.isArray(p.esp)?{...p,esp:p.esp.filter(n=>n!==id)}:p);
 }else catalog.profesionales=catalog.profesionales.filter(p=>p.id!==id);
  try{await guardarCatalogo();catalogStatus(`${type==="esp"?"Servicio":"Especialista"} eliminado correctamente.`)}catch(x){catalog=previous;renderCatalogo();renderFiltros();console.error(x);catalogStatus(`No se pudo eliminar (${x.code||"error"}). Revisa las reglas de Firestore.`)}
};

$("#lista").onclick=async e=>{
 const b=e.target.closest("[data-a]");if(!b)return;const id=b.dataset.id;
 try{
  if(b.dataset.a==="ok")await F.updateDoc(F.doc(db,"turnos",id),{estado:"confirmado"});
  else if(confirm("¿Cancelar esta solicitud de cita?")){
   const w=F.writeBatch(db);w.delete(F.doc(db,"ocupados",id));w.delete(F.doc(db,"turnos",id));await w.commit();
  }
 }catch(x){alert("No se pudo completar la acción. Revisa tu conexión y los permisos.")}
};
$("#login").onsubmit=async e=>{
 e.preventDefault();const f=Object.fromEntries(new FormData(e.target)),er=$("#lerr");er.classList.add("hide");
 try{await AU.signInWithEmailAndPassword(auth,f.email,f.pass)}
 catch(x){er.textContent="Email o contraseña incorrectos.";er.classList.remove("hide")}
};
$("#salir").onclick=()=>AU.signOut(auth);

(async()=>{
 if(firebaseConfig.apiKey.startsWith("TU_")){aviso("Falta configurar Firebase: pega tu firebaseConfig en config.js.");return}
 try{
  const[a,f,au]=await Promise.all([import(FB+"firebase-app.js"),import(FB+"firebase-firestore.js"),import(FB+"firebase-auth.js")]);
  F=f;AU=au;const app=a.initializeApp(firebaseConfig);db=f.getFirestore(app);auth=au.getAuth(app);
  au.onAuthStateChanged(auth,u=>u?entrar(u):salir());
 }catch(x){aviso("No se pudo cargar Firebase. Revisa tu conexión.")}
})();
