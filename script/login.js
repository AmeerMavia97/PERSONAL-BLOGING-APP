import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js"

const loginform = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const errorMess = document.querySelector("#errormess");

loginform.addEventListener("submit", (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            window.location = "dashboard.html"
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            errorMess.innerHTML = errorCode
        });


})