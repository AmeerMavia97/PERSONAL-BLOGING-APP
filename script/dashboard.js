import { onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, addDoc, getDocs , updateDoc,   orderBy,  doc, deleteDoc, query, where, Timestamp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { auth, db } from "./config.js"

const username = document.querySelector("#username");
const form = document.querySelector("#form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const userpost = document.querySelector("#posts");

let dp;
let email;
let names;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const q = query(collection(db, "registeruser"),  where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            username.innerHTML = `${doc.data().firstname}  ${doc.data().lastname}`
            dp = doc.data().profilepic
            getdatafromfirestore(uid)
            names = doc.data().firstname + doc.data().lastname
            email = doc.data().email
        });
    } else {
        username.innerHTML = `ENTER VALUE`
    }
});


// LOGOUT FUNCTION 
const logout = document.querySelector("#logout")

logout.addEventListener("click" , ()=>{
    signOut(auth).then(() => {
        window.location = "login.html"
      }).catch((error) => {
        // An error happened.
      });
})



// const date = new date() 

let arr = [];

// PRINT DATA FROM FIRESTORE
function printdata() {
    userpost.innerHTML = ''
    let date = new Date().toLocaleDateString()
    arr.map((item) => {
        userpost.innerHTML += `
        <div class="bg-white  mt-6 border-gray-300 pb-11 border-solid border-[1px] ml-[10%] mr-[20%] rounded-xl ">

        <div class="flex">
            <img class="postprofile ml-9 mt-6 h-[86px] rounded-2xl w-[90px]"
                src="${item.profilepic}" alt="">
            <div class="postname" >
                <h1 class="ml-4 mt-6 font-poppins font-bold text-xl">${item.title}</h1>
                <p class="ml-4 mt-[9px] font-poppins text-gray-400">${names + " " +  date}</p>
            </div>
        </div>

        <div class="">
            <p class="postdescription ml-9 mt-10 text-gray-400 mr-8">${item.description}</p>
        </div>

        <div>
            <button id="delete" class="postseeallpage2 ml-9 mr-2 mt-7 font-poppins  text-[#7c47f6]">DELETE</button>
            <button id="edit" class="ml-6 font-poppins text-[#7c47f6]">EDIT</button>
        </div>

    </div>`
    })

    const deleteval = document.querySelectorAll("#delete")
    const editval = document.querySelectorAll("#edit")

    deleteval.forEach((btn , index)=>{
        btn.addEventListener("click" , async ()=>{
            await deleteDoc(doc(db, "posts", arr[index].docId ))
            .then(() => {
                arr.splice(index, 1);
                printdata()
            });

    
        })
    })


    editval.forEach((btn ,index)=>{
        btn.addEventListener('click' ,async ()=>{
            let updatetitle =  prompt("Enter update title")
            let updatedesciption = prompt("Enter updaate description")
            await updateDoc(doc(db, "posts", arr[index].docId), {
                title: updatetitle,
                description: updatedesciption
            });
            arr[index].title = updatetitle;
            arr[index].description = updatedesciption;
            printdata()

        })

    })


}

// GET DATA FROM FIRESTORE
async function getdatafromfirestore(uid) {
    arr.length = 0;
    const q = query(collection(db, "posts"),orderBy('postDate' , 'desc') , where("userid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), docId: doc.id })
        
    });
    console.log(arr);
    printdata();
}





// ADD DATA FROM FIRESTORE
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const objdata = {
            title: title.value,
            description: description.value,
            userid: auth.currentUser.uid,
            postDate: Timestamp.fromDate(new Date()),
            profilepic: dp,
            names : names,
            email: email

        }
        const docRef = await addDoc(collection(db, "posts"), objdata);
        // console.log("Document written with ID: ", docRef.id);
        objdata.docId = docRef.id;
        arr = [objdata , ...arr];
        console.log(arr);
        printdata();
    } catch {
        console.log("error");
    }

    // title.value = "";
    // description.value = "";
})

console.log(arr);

