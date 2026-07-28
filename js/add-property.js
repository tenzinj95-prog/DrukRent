// =====================================
// DRUKRENT ADD PROPERTY
// FIREBASE + CLOUDINARY VERSION
// =====================================


import { db } from "./firebase-config.js";


import {

    collection,
    addDoc,
    serverTimestamp

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





// =====================================
// CLOUDINARY CONFIG
// =====================================


const CLOUD_NAME = "blywb9ml";

const UPLOAD_PRESET = "drukrent_upload";






// =====================================
// ELEMENTS
// =====================================


const form =
document.getElementById("propertyForm");


const imageInput =
document.getElementById("images");


const paymentInput =
document.getElementById("paymentScreenshot");


const previewContainer =
document.getElementById("imagePreviewContainer");


const paymentPreviewContainer =
document.getElementById("paymentPreviewContainer");


const uploadStatus =
document.getElementById("uploadStatus");






let imageURLs = [];

let paymentImageURL = "";








// =====================================
// CLOUDINARY UPLOAD FUNCTION
// =====================================


async function uploadToCloudinary(file){



const formData =
new FormData();



formData.append(
"file",
file
);



formData.append(
"upload_preset",
UPLOAD_PRESET
);





const response =
await fetch(

`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,

{

method:"POST",

body:formData

}

);





const data =
await response.json();






if(!data.secure_url){


throw new Error(
"Cloudinary upload failed"
);


}




return data.secure_url;



}









// =====================================
// IMAGE PREVIEW
// =====================================


if(imageInput){


imageInput.addEventListener(

"change",

function(){


previewContainer.innerHTML="";



Array.from(this.files).forEach(file=>{


const img =
document.createElement("img");



img.src =
URL.createObjectURL(file);



img.style.width="150px";

img.style.height="120px";

img.style.objectFit="cover";

img.style.margin="10px";

img.style.borderRadius="10px";



previewContainer.appendChild(img);



});



}


);


}









// =====================================
// PAYMENT PREVIEW
// =====================================


if(paymentInput){


paymentInput.addEventListener(

"change",

function(){



paymentPreviewContainer.innerHTML="";



const file =
this.files[0];



if(file){



const img =
document.createElement("img");



img.src =
URL.createObjectURL(file);



img.style.width="250px";

img.style.borderRadius="10px";



paymentPreviewContainer.appendChild(img);



}



}


);


}









// =====================================
// SUBMIT PROPERTY
// =====================================


form.addEventListener(

"submit",

async function(e){


e.preventDefault();





try{



if(imageInput.files.length === 0){


alert(
"Please select house images"
);


return;


}



if(!paymentInput.files[0]){


alert(
"Please upload payment screenshot"
);


return;


}






uploadStatus.innerHTML =
"Uploading house images...";







// ===============================
// UPLOAD PROPERTY IMAGES
// ===============================


imageURLs = [];



for(
let file of imageInput.files
){



const url =
await uploadToCloudinary(file);



imageURLs.push(url);



}







// ===============================
// UPLOAD PAYMENT IMAGE
// ===============================



uploadStatus.innerHTML =
"Uploading payment screenshot...";




paymentImageURL =

await uploadToCloudinary(

paymentInput.files[0]

);








// ===============================
// FIRESTORE DATA
// ===============================



const propertyData = {



title:

document.getElementById("title")
.value.trim(),





location:

document.getElementById("location")
.value.trim(),





dzongkhag:

document.getElementById("dzongkhag")
.value.trim(),





gewog:

document.getElementById("gewog")
.value.trim(),





map:

document.getElementById("map")
.value.trim(),





rent:

Number(

document.getElementById("rent")
.value

),





bedrooms:

Number(

document.getElementById("bedrooms")
.value

),





bathrooms:

Number(

document.getElementById("bathrooms")
.value

),





images:

imageURLs,





owner:

document.getElementById("owner")
.value.trim(),





phone:

document.getElementById("phone")
.value.trim(),





description:

document.getElementById("description")
.value.trim(),





paymentScreenshot:

paymentImageURL,





status:

"pending",





createdAt:

serverTimestamp()



};








// SAVE TO FIRESTORE


uploadStatus.innerHTML =
"Saving property...";





await addDoc(

collection(
db,
"properties"
),

propertyData

);








alert(

"Property submitted successfully. Waiting for approval."

);







form.reset();



previewContainer.innerHTML="";


paymentPreviewContainer.innerHTML="";


uploadStatus.innerHTML="";



imageURLs=[];


paymentImageURL="";





}

catch(error){



console.error(
"Submit Error:",
error
);




alert(

"Error submitting property: "

+

error.message

);




uploadStatus.innerHTML="";



}



}

);