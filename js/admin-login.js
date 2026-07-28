// =====================================
// DRUKRENT ADMIN LOGIN
// FIREBASE AUTHENTICATION
// =====================================


import { auth } from "./firebase-config.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";





// Get Login Form

const loginForm =
document.getElementById("loginForm");





loginForm.addEventListener(
"submit",
async function(e){


    e.preventDefault();



    const email =
    document.getElementById("email").value;



    const password =
    document.getElementById("password").value;



    const message =
    document.getElementById("message");



    try{


        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );



        message.innerHTML =
        "Login successful...";



        window.location.href =
        "admin.html";



    }



    catch(error){



        console.error(
            "Login Error:",
            error
        );



        message.innerHTML =
        "Wrong email or password";



    }



});