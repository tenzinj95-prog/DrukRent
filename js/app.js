// =====================================
// DRUKRENT HOME PAGE
// FIREBASE + CLOUDINARY VERSION
// APPROVED PROPERTIES ONLY
// SEARCH SYSTEM
// =====================================


import { db } from "./firebase-config.js";


import {

    collection,
    getDocs

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





const container =
document.getElementById(
    "propertyContainer"
);



const searchInput =
document.getElementById(
    "searchInput"
);



let allProperties = [];







// =====================================
// TEXT NORMALIZER
// =====================================


function normalizeText(text){


return String(text)

.toLowerCase()

.replace(/\s+/g,"")

.replace(/-/g,"")

.trim();


}









// =====================================
// LOAD PROPERTIES
// =====================================


async function loadProperties(){



try{


const snapshot =

await getDocs(

collection(
db,
"properties"
)

);





allProperties = [];





snapshot.forEach(doc=>{


const property = {


id:doc.id,


...doc.data()


};







// SHOW ONLY APPROVED

if(property.status === "approved"){


allProperties.push(property);


}



});







console.log(
"Approved Properties:",
allProperties
);






displayProperties(
allProperties
);




}

catch(error){


console.error(
"Firebase Error:",
error
);



if(container){


container.innerHTML = `

<h2>
Failed to load properties
</h2>

`;

}


}



}











// =====================================
// DISPLAY PROPERTY CARDS
// =====================================


function displayProperties(list){



if(!container)
return;





container.innerHTML = "";






if(list.length === 0){



container.innerHTML = `


<div class="no-property">


<h2>
No approved properties available
</h2>


<p>
Please check again later.
</p>


</div>


`;

return;


}









// SHOW ONLY 6 ON HOME PAGE

list.slice(0,6).forEach(property=>{





let image =
"images/no-image.jpg";





// CLOUDINARY IMAGE URL

if(

Array.isArray(property.images)

&&

property.images.length > 0

){


image =
property.images[0];


}









container.innerHTML += `



<div class="property-card">





<img

src="${image}"

alt="Property Image"

loading="lazy"

onerror="this.src='images/no-image.jpg'"

>








<div class="property-info">






<h3>

${property.title || "Rental House"}

</h3>






<p>

📍 ${property.location || "Not added"}

</p>






<p>

🏛 ${property.dzongkhag || ""}

</p>






<p>

🏘 ${property.gewog || ""}

</p>






<p>

🛏 ${property.bedrooms || 0}

Bedroom(s)

</p>






<p class="price">

Nu. ${Number(

property.rent || 0

).toLocaleString()}

/ month

</p>







<a

href="property.html?id=${property.id}"

class="btn">

View Details

</a>






</div>






</div>



`;





});




}









// =====================================
// SEARCH
// =====================================


if(searchInput){



searchInput.addEventListener(

"input",

()=>{



const keyword =

normalizeText(

searchInput.value

);






const filtered =

allProperties.filter(property=>{





const title =

normalizeText(
property.title || ""
);





const location =

normalizeText(
property.location || ""
);





const dzongkhag =

normalizeText(
property.dzongkhag || ""
);





const gewog =

normalizeText(
property.gewog || ""
);







return (

title.includes(keyword)

||

location.includes(keyword)

||

dzongkhag.includes(keyword)

||

gewog.includes(keyword)


);



});






displayProperties(filtered);





}


);



}










// =====================================
// START APP
// =====================================


loadProperties();