import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, query, where, getDocs, orderBy, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { auth, db } from "./config.js"

const username = document.querySelector("#username")
const logout = document.querySelector("#logout")
const Dashboard = document.querySelector("#dashboard")


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

// LOGOUT FUNCTION 

logout.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location = "login.html"
    }).catch((error) => {
    });
})


const allposts = document.querySelector("#allposts")
let allblogsarr = [];

const q = query(collection(db, "posts"), orderBy('postDate', 'desc'));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    allblogsarr.push({ ...doc.data(), docId: doc.id })
    
    console.log(doc.data().profilepic);

});


           

async function getdatafromfirestore() {
    allposts.innerHTML = ''
    allblogsarr.map((item) => {
        let timestamp = item.postDate.seconds;
        let date = new Date(timestamp * 1000);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

        allposts.innerHTML +=   
         `
        <div class="bg-white mt-6 border-gray-300 pb-11 border-solid border-[1px] ml-[10%] mr-[20%] rounded-xl ">

        <div class="flex">
        <div>
        <img class="postprofile ml-4 mt-2 h-[50px] rounded-2xl w-[50px]"
        src="${item.profilepic}" alt="">
         </div>
            <div class="postname">
                <h1 class="ml-4 mt-6 font-poppins font-bold text-xl">${item.title}</h1>
                <p class="ml-4 mt-[9px] font-poppins text-gray-400">${item.names} ${formattedDate}</p>
            </div>
        </div>

        <div>
            <p class="postdescription ml-9 mt-10 text-gray-400 mr-8">${item.description}</p>
        </div>
        <a class="font-poppins cursor-pointer   text-purple-400" >
        <p class="postseeallpage" id="specificuserdata" class="mb-6 ml-9 mt-6">See all from this user</p>
    </a>
    </div>`

    });
    const specificuserdata = document.querySelectorAll("#specificuserdata");
    let arrr = [];

    specificuserdata.forEach((btn, index) => {
        const obj = {
            title: allblogsarr[index].title,
            description: allblogsarr[index].description,
            profilepic: allblogsarr[index].profilepic,
            date: allblogsarr[index].postDate,
            uid: allblogsarr[index].userid,
            names:  allblogsarr[index].names,
            email:  allblogsarr[index].email
        };

        arrr.push(obj);

        btn.addEventListener('click', async () => {
            const userId = obj.uid;
            console.log(obj.uid);
            localStorage.setItem("id" , obj.uid)
            const querys = query( collection(db, "posts"), where("userid", "==", userId));
            const querySnapshot = await getDocs(querys);
            const userPosts = [];
            querySnapshot.forEach((doc) => {
                userPosts.push(doc.data());
                addDoc(collection(db, "specificuser"), doc.data());
        });
        console.log("User Posts:", userPosts);
       
        window.location = "./allblogs.html";
        });
       

    });

}


getdatafromfirestore()









const currentTime = new Date();
const currentHour = currentTime.getHours();
const readers = document.querySelector('#helloreaders')

if (currentHour >= 5 && currentHour < 12) {
    readers.innerHTML = `
    <h1 class=" font-poppins text-[35px] ml-[10%] mt-5 font-bold">Good Morning Readers!</h1>`
} else if (currentHour >= 12 && currentHour < 17) {
    readers.innerHTML = `
    <h1 class=" font-poppins text-[35px] ml-[10%] mt-5 font-bold">Good Evening Readers!</h1>`
} else if (currentHour >= 17 && currentHour < 21) {
    readers.innerHTML = `
    <h1 class=" font-poppins text-[35px] ml-[10%] mt-5 font-bold">Good AfterNoon Readers!</h1>`
} else {
    readers.innerHTML = `
    <h1 class=" font-poppins text-[35px] ml-[10%] mt-5 font-bold">Good Night Readers!</h1>`
}

