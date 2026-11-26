const navToggle=document.querySelector("#navToggle");
const mainNav=document.querySelector("#mainNav");

if(navToggle&&mainNav){
 const closeMenu=()=>{navToggle.classList.remove("is-open");mainNav.classList.remove("is-open");navToggle.setAttribute("aria-expanded","false");navToggle.setAttribute("aria-label","Abrir menú")};
 navToggle.onclick=()=>{const open=!mainNav.classList.contains("is-open");navToggle.classList.toggle("is-open",open);mainNav.classList.toggle("is-open",open);navToggle.setAttribute("aria-expanded",String(open));navToggle.setAttribute("aria-label",open?"Cerrar menú":"Abrir menú")};
 mainNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
 document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()});
}

const wa=document.querySelector("#waFlot");
if(wa&&typeof CONFIG!=="undefined")wa.href="https://wa.me/"+CONFIG.whatsapp;
