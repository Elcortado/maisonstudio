// Configuración de la web y del panel: horarios, servicios, profesionales, WhatsApp y Firebase.
const CONFIG = {
  whatsapp: "543625181576", // código de país + número, sin + ni espacios
  duracion: 60, // minutos por cita
  diasAdelante: 60, // cuántos días a futuro se puede reservar
  profesionales: [
    // una agenda por profesional o cabina; deja una sola para ocultar el selector
    { id: "ana", n: "Ana" },
    { id: "lucia", n: "Lucía" }, // opcional, horarios propios: {id:"lucia",n:"Lucía",horarios:{1:["14:00","19:00"]}}
  ],
  horarios: {
    1: ["09:00", "21:30"],
    2: ["09:00", "21:30"],
    3: ["09:00", "21:30"],
    4: ["09:00", "21:30"],
    5: ["09:00", "21:30"],
    6: ["09:00", "21:30"],
    7: ["09:00", "21:30"],
  },
  servicios: [
    {
      n: "Facial",
      slug: "facial",
      items: ["Limpieza, hidratación y cuidado personalizado para devolverle luminosidad y equilibrio a tu piel."],
      p: "",
    },
    {
      n: "Pestañas",
      slug: "pestanas",
      items: ["Diseños de mirada que realzan tus ojos con resultados naturales, definidos y personalizados."],
      p: "",
    },
    {
      n: "Cejas",
      slug: "cejas",
      items: ["Diseño y perfilado para armonizar tus facciones y destacar la expresión de tu rostro."],
      p: "",
    },
    {
      n: "Manos",
      slug: "manos",
      items: ["Manicura, esmaltado y cuidado de cutículas para mantener tus manos prolijas y elegantes."],
      p: "",
    },
    {
      n: "Pies",
      slug: "pies",
      items: ["Pedicura y cuidado integral para lucir pies suaves, saludables y siempre bien arreglados."],
      p: "",
    },
    {
      n: "Depilación",
      slug: "depilacion",
      items: ["Métodos de depilación pensados para una piel suave, cuidada y confortable."],
      p: "",
    },
  ],
};

// Configuración de Firebase compartida por la web (app.js) y el panel (admin.js).
// Pega aquí el firebaseConfig que te da la consola de Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyDF-3x0QxjwpkP5xbXL7n8n91IGOQ3pK7w",
  authDomain: "usuarioprueba-68bd9.firebaseapp.com",
  projectId: "usuarioprueba-68bd9",
  storageBucket: "usuarioprueba-68bd9.firebasestorage.app",
  messagingSenderId: "977813418974",
  appId: "1:977813418974:web:859b1c49dc4d1142bc234f"
};
