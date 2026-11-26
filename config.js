// Configuración de la web y del panel: horarios, servicios, profesionales, WhatsApp y Firebase.
const CONFIG = {
  whatsapp: "543625181576", // código de país + número, sin + ni espacios
  duracion: 60, // minutos por turno
  diasAdelante: 60, // cuántos días a futuro se puede reservar
  profesionales: [
    // una agenda por profesional o cabina; dejá una sola para ocultar el selector
    { id: "ana", n: "Ana" },
    { id: "lucia", n: "Lucía" }, // opcional, horarios propios: {id:"lucia",n:"Lucía",horarios:{1:["14:00","19:00"]}}
  ],
  horarios: {
    1: ["09:00", "19:00"],
    2: ["09:00", "19:00"],
    3: ["09:00", "19:00"],
    4: ["09:00", "19:00"],
    5: ["09:00", "19:00"],
    6: ["09:00", "13:00"],
  }, // 0 = domingo (cerrado)
  servicios: [
    {
      n: "Manicura",
      items: ["Cuidado y embellecimiento de uñas y cutículas, con un acabado prolijo y delicado."],
      p: "",
    },
    {
      n: "Pedicura",
      items: ["Limpieza, cuidado y esmaltado para lucir pies suaves, saludables y bien arreglados."],
      p: "",
    },
    {
      n: "Gel Rubber",
      items: ["Refuerzo flexible para uñas naturales, ideal para aportar resistencia y un acabado uniforme."],
      p: "",
    },
    {
      n: "Acrílicas",
      items: ["Extensión y construcción de uñas resistentes, con la forma y el largo que elijas."],
      p: "",
    },
    {
      n: "Nail Art",
      items: ["Diseños personalizados, detalles y combinaciones creativas para darle identidad a tus uñas."],
      p: "",
    },
  ],
};

// Configuración de Firebase compartida por la web (app.js) y el panel (admin.js).
// Pegá acá el firebaseConfig que te da la consola de Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyDF-3x0QxjwpkP5xbXL7n8n91IGOQ3pK7w",
  authDomain: "usuarioprueba-68bd9.firebaseapp.com",
  projectId: "usuarioprueba-68bd9",
  storageBucket: "usuarioprueba-68bd9.firebasestorage.app",
  messagingSenderId: "977813418974",
  appId: "1:977813418974:web:859b1c49dc4d1142bc234f"
};
