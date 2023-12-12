import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
import { auth, db ,storage} from "./config.js"

const registerform = document.querySelector("#form");
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmpassword = document.querySelector("#confirmpassword");
const errorMess = document.querySelector("#errormess")
const userimg = document.querySelector("#img")

registerform.addEventListener('submit', (e) => {
    e.preventDefault()
    if (password.value === confirmpassword.value) {
        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                const img = userimg.files[0]
                const storageRef = ref(storage, email.value);
                uploadBytes(storageRef, img).then(() => {
                    getDownloadURL(ref(storageRef))
                        .then((url) => {
                            addDoc(collection(db, "registeruser"), {
                                firstname: firstname.value,
                                lastname: lastname.value,
                                email: email.value,
                                uid: user.uid,
                                profilepic: url
                            });
                            Swal.fire("REGISTER SUCCESSFULLY");
                            // window.location = 'index.html'
                        })
                        // .then(() => {
                        // //     console.log(res);
                        //
                            //  
                        // })
                        .catch((error) => {
                            console.log(error);
                          });
                        
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                errorMess.innerHTML = errorCode

            });
    } else {
        errorMess.innerHTML = `Password are not same`
    }

    // firstname.value = "";
    // lastname.value = "";
    // email.value = "";
    // password.value = "";
    // confirmpassword.value = "";

})
