import { onAuthStateChanged, updatePassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, getDocs, updateDoc, doc, where, query } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { auth, db } from "./config.js"

const username = document.querySelector("#username")
const username2 = document.querySelector("#username2")

const pfimage = document.querySelector("#pf-image")

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const q = query(collection(db, "registeruser"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            username.innerHTML = `${doc.data().firstname}  ${doc.data().lastname}`
            // console.log(doc.data().firstname + doc.data().lastname);
            namerender(doc.data().firstname + " " + doc.data().lastname)
            nameupdate(doc.id)
            pfimage.src = doc.data().profilepic
        });
    } else {
        username.innerHTML = `ENTER VALUE`
    }
});

function nameupdate(docId){
    const editbtn = document.querySelector("#btn")

        editbtn.addEventListener("click", async () => {
            const updatefirstname = prompt("enter your firstname")
            const updatelastname = prompt("enter your lastname")
            if (updatefirstname !== null && updatelastname !== null) {
            await updateDoc(doc(db, "registeruser", docId), {
                firstname: updatefirstname,
                lastname: updatelastname
            });
            username2.innerHTML = `${updatefirstname}  ${updatelastname}`;
            nameupdate(docId);
        }

        })

}

function namerender(doce) {
    username2.innerHTML = `
    <h1 class="profilename">${doce}</h1>
    <p><i id="btn" class="mt-8 text-[#7c47f6] text-xl fa-regular fa-pen-to-square"></i></p>`

    console.log(doce);

}
// namerender()

const updatepass = document.querySelector("#updatepassword")
const newpass = document.querySelector("#newpass")
const newconfirmpass = document.querySelector("#newconfirmpass")
const passerror = document.querySelector("#passerror")



updatepass.addEventListener("submit" , (e)=>{
    e.preventDefault()   
    if(newpass.value === newconfirmpass.value){
        const user = auth.currentUser;
        const newPassword = newpass.value
        updatePassword(user, newPassword).then(() => {
            console.log("update pass");
          }).catch((error) => {
            passerror.innerHTML = error
          });
    }else{
        passerror.innerHTML = "enter same pass"
    }
    newpass.value = ''
    newconfirmpass.value = ''
    
})
