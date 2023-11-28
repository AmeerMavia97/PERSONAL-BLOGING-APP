import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAeWLz13-v0f2MmuHHga4x_BQ5HagCZzfs",
    authDomain: "personal-bloging-app.firebaseapp.com",
    projectId: "personal-bloging-app",
    storageBucket: "personal-bloging-app.appspot.com",
    messagingSenderId: "668330497342",
    appId: "1:668330497342:web:4dd1e960a5fcc39a87086f",
    measurementId: "G-V3DV9C1YXL"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);