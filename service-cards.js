const SERVICE_WORKS={
 facial:[
  {name:"Limpieza facial básica",description:"Resultados inmediatos para una piel más radiante desde la primera sesión. Incluye evaluación, limpieza, mascarilla de carbón, tratamiento calmante, sérum e hidratación.",meta:"30,00 € · 1 h",image:"assets/limpiezaBasica.jpg"},
  {name:"Limpieza facial profunda",description:"Tratamiento completo con exfoliación, extracción de comedones y mascarilla adaptada a tu tipo de piel, además de sérum e hidratación.",meta:"45,00 € · 1 h 20 min",image:"assets/limpiezaProfunda.jpg"}
 ],
 pestanas:[
  {name:"Extensión de pestañas - Clásicas",description:"Aplicación de una extensión sobre cada pestaña natural para conseguir un resultado elegante, natural y definido, aportando longitud y un ligero extra de volumen.",meta:"40,00 € · 2 h 50 min",image:"assets/extensioPestañaClasica.jpeg"},
  {name:"Extensión de pestañas - Efecto rímel",description:"Aplicación de una espiga de 2 a 4 extensiones sobre cada pestaña natural, creando un efecto agrupado, definido e intenso, similar al acabado de la máscara de pestañas.",meta:"45,00 € · 2 h 50 min",image:"assets/extensionPestañaRimel.jpeg"},
  {name:"Extensión de pestañas - Volumen hawaiano",description:"Aplicación de una extensión en forma de Y sobre cada pestaña natural para conseguir mayor densidad y un acabado ligero, con textura y definición.",meta:"48,00 € · 2 h 30 min",image:"assets/expansioefectohawaiano.jpeg"},
  {name:"Extensión de pestañas - Volumen",description:"Aplicación de espigas de 2 a 7 extensiones sobre cada pestaña natural para conseguir mayor densidad, volumen e intensidad, adaptando el resultado al diseño deseado.",meta:"50,00 € · 2 h 30 min",image:"assets/extensioPestañasVolumen.jpeg"},
  {name:"Extensión de pestañas - Híbridas",description:"Combinación de la técnica clásica y la técnica de volumen para lograr un equilibrio entre naturalidad, textura y densidad.",meta:"45,00 € · 2 h 30 min",image:"assets/extensiónpestañasHibridas.jpeg"},
  {name:"Lifting de pestañas",description:"Tratamiento que eleva, curva y estira las pestañas naturales desde la raíz para conseguir una mirada más abierta y definida. Su duración estimada es de 6 a 8 semanas.",meta:"35,00 € · 1 h",image:"assets/liftingpestañas.jpeg"},
  {name:"Retiro de extensiones de pestañas",description:"Retiro cuidadoso de extensiones. Realizadas en Maison Studio: 10,00 €. Realizadas en otro centro: 14,00 €.",meta:"10 min · 10,00 € Maison Studio / 14,00 € otro centro",image:"assets/retiropestañas.jpg"},
  {name:"Mantenimiento de extensión de pestañas",description:"Servicio disponible únicamente para extensiones realizadas en Maison Studio que conserven al menos el 50 % de las extensiones iniciales. Precio base: 30,00 €. Variantes: clásicas 35,00 €, efecto rímel 35,00 €, híbridas 40,00 €, volumen 38,00 € y volumen hawaiano (consultar precio).",meta:"Desde 30,00 € · 1 h 30 min",image:"assets/mantenimientopestañas.png"}
 ],
 cejas:[
  {name:"Pigmentación de cejas",description:"Tratamiento que aporta color y definición a las cejas, realzando su forma natural. Incluye diseño y depilación para conseguir un resultado armonioso y personalizado.",meta:"25,00 € · 1 h",image:"https://d375139ucebi94.cloudfront.net/region2/es/180259/service_photos/572d522431eb4459a06e97cc05759b11.jpeg"},
  {name:"Laminado de cejas",description:"Tratamiento que alisa y fija el pelo de las cejas, aportando un aspecto más poblado, ordenado y definido. Incluye diseño y depilación.",meta:"35,00 € · 1 h",image:"https://d375139ucebi94.cloudfront.net/region2/es/180259/service_photos/b56f6ad632c043de872f18c471a8cf2d.jpeg"}
 ],
 manos:[
  {name:"Esmaltado tradicional de manos",description:"Esmaltado clásico para mantener tus manos prolijas. La manicura no está incluida.",meta:"7,00 € · 30 min",image:"assets/esmaltadoTradicional.jpg"},
  {name:"Solo manicura",description:"Cuidado y forma de uñas y cutículas. El esmaltado no está incluido.",meta:"9,00 € · 30 min",image:"assets/manicura.jpeg"},
  {name:"Manicura + esmaltado tradicional",description:"Manicura completa con un acabado clásico y elegante.",meta:"14,00 € · 40 min",image:"assets/emaltadoCuticula.jpg"},
  {name:"Manicura + esmaltado semipermanente con refuerzo",description:"Incluye refuerzo con rubber o polygel, francesa y diseño en un máximo de 2 uñas sin relieve. No incluye retiro de otro centro.",meta:"19,00 € · 1 h",image:"assets/manicuraRefuerzo.jpeg"},
  {name:"Manicura + semipermanente",description:"Manicura con esmaltado semipermanente, francesa y diseño en un máximo de 2 uñas sin relieve.",meta:"16,00 € · 50 min",image:"assets/manicuraSemi.jpeg"},
  {name:"Manicura + esmaltado semipermanente + Gel Rubber",description:"Manicura con Gel Rubber, francesa y diseño en un máximo de 2 uñas sin relieve.",meta:"24,00 € · 1 h 15 min",image:"assets/manicuraGel.jpeg"},
  {name:"Manicura + acrílicas (S)",description:"Tamaño pequeño (S) nº 1 - nº 2",meta:"35,00 € · 1 h 20 min",image:"assets/manicuraAcrilicas.jpeg"},
  {name:"Manicura + acrílicas (M)",description:"Tamaño mediano (M) nº 3 - nº 4",meta:"40,00 € · 1 h 40 min",image:"assets/manicuraAcrilicas.jpeg"},
  {name:"Manicura + acrílicas (L)",description:"Tamaño largo (L) nº5 - nº6",meta:"45,00 € · 2 h",image:"assets/manicuraAcrilicas.jpeg"},
  {name:"Manicura + acrílicas (XL)",description:"Tamaño extra largo (XL) nº 7 - nº 8",meta:"55,00 € · 2 h 30 min",image:"assets/manicuraAcrilicas.jpeg"},
  {name:"Manicura + relleno acrílicas",description:"Relleno de uñas acrílicas realizadas previamente en Maison Studio.",meta:"30,00 € · 1 h 40 min",image:"assets/acrilicasRelleno.jpeg"},
  {name:"Retiro de uñas acrílicas",description:"Retiro cuidadoso del producto acrílico para preparar nuevamente tus uñas.",meta:"7,90 € · 30 min",image:"assets/retiroUñas.jpg"},
  {name:"Retiro de manicura semipermanente",description:"Retiro de esmaltado semipermanente para dejar tus uñas listas para el próximo servicio.",meta:"5,90 € · 15 min",image:"assets/retiroSemi.jpg"},
  {name:"Manos & Pies Semipermanente",description:"Experiencia combinada de manicura con refuerzo y pedicura con esmaltado semipermanente.",meta:"44,00 € · 2 h",image:"assets/manosPies.jpg"},
  {name:"Reparación de uña rota",description:"Reparación puntual para recuperar la forma y continuidad de una uña dañada.",meta:"3,90 € · 15 min",image:"assets/uñaRota.jpg"}
 ],
 pies:[
  {name:"Solo esmaltado tradicional de pies",description:"Esmaltado clásico para tus pies. La pedicura no está incluida.",meta:"8,00 € · 30 min",image:"assets/esmaltadoPie.jpg"},
  {name:"Solo pedicura",description:"Cuidado de pies y uñas. El esmaltado no está incluido.",meta:"14,00 € · 30 min",image:"assets/pedicuraPie.png"},
  {name:"Retiro pedicura semipermanente",description:"Retiro cuidadoso del esmaltado semipermanente de pies.",meta:"6,90 € · 15 min",image:"assets/retiroSemiPie.jpg"},
  {name:"Pedicura express + esmaltado semipermanente",description:"Incluye retiro de cutícula, limado, corte de uñas y esmaltado semipermanente.",meta:"14,00 € · 30 min",image:"assets/retiromasEsmaltadoPie.jpg"},
  {name:"Pedicura + esmaltado tradicional",description:"Pedicura completa con un acabado clásico y elegante.",meta:"18,00 € · 50 min",image:"assets/pedicuraEsmaltadoCompleto.jpg"},
  {name:"Pedicura + esmaltado semipermanente",description:"Pedicura completa con esmaltado semipermanente para un resultado duradero.",meta:"25,00 € · 1 h",image:"assets/pedicuraEsmaltadoSemi.jpeg"},
  {name:"Manos & Pies Semipermanente",description:"Experiencia combinada de manicura con refuerzo y pedicura con esmaltado semipermanente.",meta:"44,00 € · 2 h",image:"assets/manosPies.jpg"}
 ],
 depilacion:[
  {name:"Depilación mentón",description:"Depilación con cera para mantener la zona del mentón suave y prolija.",meta:"3,00 € · 10 min",image:"assets/servicios/depilacion-01.jpg"},
  {name:"Depilación labio superior",description:"Depilación con cera del labio superior, realizada de forma rápida y cuidadosa.",meta:"5,00 € · 10 min",image:"assets/servicios/depilacion-02.jpg"},
  {name:"Depilación de cejas",description:"Incluye diseño y depilación con cera para armonizar la mirada.",meta:"9,00 € · 25 min",image:"assets/servicios/depilacion-03.jpg"},
  {name:"Depilación axilas",description:"Depilación con cera para una piel suave y cuidada.",meta:"12,00 € · 20 min",image:"assets/servicios/depilacion-04.jpg"},
  {name:"Depilación medias piernas",description:"Depilación con cera desde el tobillo hasta la rodilla.",meta:"10,00 € · 20 min",image:"assets/servicios/depilacion-05.jpg"},
  {name:"Depilación piernas enteras",description:"Depilación con cera de piernas completas para una sensación de suavidad duradera.",meta:"15,00 € · 30 min",image:"assets/servicios/depilacion-06.jpg"}
 ]
};

function renderServiceWorks(){
 const root=document.querySelector("[data-service-works]");
 if(!root)return;
 const service=document.body.dataset.service,works=SERVICE_WORKS[service]||[];
 if(!works.length){
  root.innerHTML='<article class="service-work-empty"><p class="eyebrow">Próximamente</p><h3>Consultá por pestañas</h3><p>Actualmente Booksy no muestra servicios publicados en esta categoría. Escribinos y te contamos las opciones disponibles.</p><a class="btn" href="https://wa.me/'+CONFIG.whatsapp+'?text='+encodeURIComponent('Hola Maison Studio! Quiero consultar por el servicio de pestañas.')+'" target="_blank" rel="noopener">Consultar por WhatsApp</a></article>';
  return;
 }
 root.innerHTML=works.map(work=>{
  const message=encodeURIComponent('Hola Maison Studio! Quiero reservar el servicio: '+work.name+'. ¿Qué disponibilidad tienen?');
  return '<article class="service-work-card"><div class="service-work-card__image"><img src="'+work.image+'" alt="Imagen de ejemplo de '+work.name+'" loading="lazy" onerror="this.remove();this.parentElement.classList.add(\'is-missing\')"><span>Imagen de ejemplo</span></div><div class="service-work-card__body"><h3>'+work.name+'</h3><p>'+work.description+'</p><small>'+work.meta+'</small><a class="btn" href="https://wa.me/'+CONFIG.whatsapp+'?text='+message+'" target="_blank" rel="noopener">Reservar turno</a></div></article>';
 }).join("");
}

renderServiceWorks();
