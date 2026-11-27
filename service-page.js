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

const SERVICE_IMAGES={facial:"assets/limpiezaBasica.jpg",pestanas:"assets/extensioPestañaClasica.jpeg",cejas:"assets/depilacionCejas.jpg",manos:"assets/manicura.jpeg",pies:"assets/pedicuraPie.png",depilacion:"assets/depilacionMenton.jpg"};
const currentService=document.body.dataset.service;
const serviceHero=document.querySelector(".service-detail__hero");
const serviceImage=SERVICE_IMAGES[currentService];
if(serviceHero&&serviceImage&&!serviceHero.querySelector(".service-detail__hero-media")){
 serviceHero.insertAdjacentHTML("beforeend",`<div class="service-detail__hero-media" aria-hidden="true"><img src="${serviceImage}" alt=""></div>`);
}
