import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { auth, db } from "./config.js"

const data = document.querySelector('#data')
const username = document.querySelector("#username")
const logout = document.querySelector("#logout")
const Dashboard = document.querySelector("#dashboard")
const userprofile = document.querySelector("#userprofile")

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        logout.innerHTML = "Login"

    } else {
        logout.innerHTML = "logout"
        Dashboard.innerHTML = "Dashboard"
        const uid = user.uid;
        const q = query(collection(db, "registeruser"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            username.innerHTML = `${doc.data().firstname}  ${doc.data().lastname}`
        });
    }
});

logout.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location = "login.html"
    }).catch((error) => {
    });
})

const spasificBlogsArry = [];

let userid;
// async function getdatafromfirestore() {
    // spasificBlogsArry.length = 0;
    const id = localStorage.getItem('id')
    console.log(id);
    const q = query(collection(db, "specificuser"), orderBy('postDate', 'desc'), where('userid', "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        spasificBlogsArry.push({ ...doc.data() })
        userid = doc.data().userid
        // console.log();
    });
// }
// getdatafromfirestore()


function printdata() {
    // spasificBlogsArry.length = 0
    data.innerHTML = "";
    spasificBlogsArry.map((item) => {
        // console.log(item);
        let timestamp = item.postDate.seconds;
        let date = new Date(timestamp * 1000);
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate();
        let formattedDate = `${day.toString().padStart(2, '0')} ${month} ${year}`
        data.innerHTML += ` <div class="bg-white mb-5 border-gray-300 pb-7 border-solid border-[1px] ml-[10%] mr-[20%] rounded-xl ">
        
            <div class="flex">
                <img class="postprofile"
                    src="${item.profilepic}"
                    alt="">
                <div class="postname">
                    <h1 class=" ml-4 mt-6 font-poppins font-bold text-xl">${item.title}</h1>
                    <p class="ml-4 mt-[9px] font-poppins text-gray-400">${item.names} : ${formattedDate}</p>
                </div>
            </div>
        
            <div>
                <p class="postdescription">i${item.description}</p>
            </div>
           
        </div>`

        userprofile.innerHTML = `
        <div class="flex mb-6">
                <img class="profile2  ml-[10%] rounded-full   shadow-lg " src="${item.profilepic}" alt="">
                <div class="profile2name mt-9 ml-6">
                <h1 class=" font-poppins text-3xl ">${item.names}</h1>
                <p class="mt-3 font-poppins text-gray-400">${item.email}</p>
                </div>
            </div>`

    })



}
printdata()

// let date = new Date(1228282 * 1000)
// console.log(date);