// =====================================
// DRUKRENT ADMIN DASHBOARD
// FIREBASE APPROVAL SYSTEM
// FIXED VERSION
// =====================================


import { db, auth } from "./firebase-config.js";


import {

collection,
getDocs,
updateDoc,
deleteDoc,
doc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


import {

onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";





// =====================================
// AUTH CHECK
// =====================================


onAuthStateChanged(auth,(user)=>{


if(!user){

window.location.href =
"admin-login.html";

}


});








const container =
document.getElementById(
"adminContainer"
);



let properties = [];








// =====================================
// LOAD PROPERTIES
// =====================================


async function loadProperties(){



try{


container.innerHTML = `

<h2>
Loading properties...
</h2>

`;





const snapshot =

await getDocs(

collection(
db,
"properties"
)

);





properties = [];





snapshot.forEach(item=>{


properties.push({

id:item.id,

...item.data()

});


});





displayAdmin();



}

catch(error){



console.error(
error
);



container.innerHTML = `

<h2>
Error loading properties
</h2>

`;



}



}










// =====================================
// DISPLAY
// =====================================


function displayAdmin(){



container.innerHTML = "";





if(properties.length===0){



container.innerHTML = `

<h2>
No properties found
</h2>

`;

return;


}







properties.forEach(property=>{





const image =

property.images && property.images.length

?

property.images[0]

:

"images/no-image.jpg";







container.innerHTML += `



<div class="property-card">





<img

src="${image}"

class="property-image"

onerror="this.src='images/no-image.jpg'"

>







<div class="property-info">






<h3>

${property.title || "Rental House"}

</h3>






<p>
📍 ${property.location || ""}
</p>





<p>
🏛 ${property.dzongkhag || ""}
</p>





<p>
🏘 ${property.gewog || ""}
</p>





<p>
👤 ${property.owner || ""}
</p>





<p>
📞 ${property.phone || ""}
</p>





<p>
💰 Nu. ${Number(property.rent || 0).toLocaleString()} / month
</p>






<h3>

Status:
${property.status || "pending"}

</h3>








${
property.paymentScreenshot

?

`

<h4>
Payment Screenshot
</h4>


<img

src="${property.paymentScreenshot}"

class="payment-image"

>

`

:

""

}







<a

href="property.html?id=${property.id}"

class="btn">

View

</a>








<button

class="btn approve-btn"

data-id="${property.id}"

>

✅ Approve

</button>








<button

class="btn reject-btn"

data-id="${property.id}"

>

❌ Reject

</button>








<button

class="btn delete-btn"

data-id="${property.id}"

>

🗑 Delete

</button>







</div>





</div>



`;




});





addButtonEvents();



}









// =====================================
// BUTTON EVENTS
// =====================================


function addButtonEvents(){





document
.querySelectorAll(".approve-btn")
.forEach(button=>{


button.addEventListener(
"click",

()=>approveProperty(
button.dataset.id
)

);


});







document
.querySelectorAll(".reject-btn")
.forEach(button=>{


button.addEventListener(
"click",

()=>rejectProperty(
button.dataset.id
)

);


});







document
.querySelectorAll(".delete-btn")
.forEach(button=>{


button.addEventListener(
"click",

()=>deleteProperty(
button.dataset.id
)

);


});





}









// =====================================
// APPROVE
// =====================================


async function approveProperty(id){



try{


await updateDoc(

doc(
db,
"properties",
id
),

{

status:"approved"

}

);




alert(
"Property approved"
);



loadProperties();



}

catch(error){


alert(
"Approve failed: "+error.message
);


}



}










// =====================================
// REJECT
// =====================================


async function rejectProperty(id){



try{


await updateDoc(

doc(
db,
"properties",
id
),

{

status:"rejected"

}

);




alert(
"Property rejected"
);



loadProperties();



}

catch(error){


alert(
"Reject failed: "+error.message
);


}



}










// =====================================
// DELETE
// =====================================


async function deleteProperty(id){



const answer =
confirm(
"Delete this property?"
);



if(!answer)
return;






try{


await deleteDoc(

doc(
db,
"properties",
id
)

);



alert(
"Property deleted"
);



loadProperties();



}

catch(error){


alert(
"Delete failed: "+error.message
);


}



}









// =====================================
// START
// =====================================


loadProperties();