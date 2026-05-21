import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Configuração obtida do seu console do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC4koNDGhZuh3xDiQLbmGLiRmROScUqqzg",
  authDomain: "gymzuspass.firebaseapp.com",
  projectId: "gymzuspass",
  storageBucket: "gymzuspass.firebasestorage.app",
  messagingSenderId: "824032440181",
  appId: "1:824032440181:web:62abcd7f6d43dbd0fcad3c"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta as instâncias para usar nos componentes
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;