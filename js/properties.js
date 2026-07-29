// =====================================
// DRUKRENT PROPERTIES SYSTEM
// FIREBASE + CLOUDINARY VERSION
// =====================================


import { db } from "./firebase-config.js";


import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";




// =====================================
// ELEMENTS
// =====================================


const container =
document.getElementById("propertyContainer");


const searchInput =
document.getElementById("searchProperty");


const dzongkhagFilter =
document.getElementById("dzongkhagFilter");


const bedroomFilter =
document.getElementById("bedroomFilter");


const priceFilter =
document.getElementById("priceFilter");



let allProperties = [];




// =====================================
// DZONGKHAG LIST
// =====================================


const dzongkhags = [

"Thimphu",
"Paro",
"Punakha",
"Chhukha",
"Wangdue Phodrang",
"Trongsa",
"Bumthang",
"Trashigang",
"Trashiyangtse",
"Mongar",
"Lhuentse",
"Samdrup Jongkhar",
"Pemagatshel",
"Samtse",
"Sarpang",
"Tsirang",
"Dagana",
"Zhemgang",
"Haa"

];





// =====================================
// LOAD DZONGKHAG OPTIONS
// =====================================


function loadDzongkhag(){


dzongkhagFilter.innerHTML = `

<option value="">
All Dzongkhag
</option>

`;



dzongkhags.forEach(dz=>{


dzongkhagFilter.innerHTML += `

<option value="${dz}">
${dz}
</option>

`;

});


}






// =====================================
// LOAD PROPERTIES FROM FIREBASE
// =====================================


async function loadProperties(){


try{


const snapshot = await getDocs(

collection(db,"properties")

);



allProperties = [];



snapshot.forEach(doc=>{


const property = {

id: doc.id,

...doc.data()

};



// only approved listings

if(property.status === "approved"){

allProperties.push(property);

}


});



console.log(
"Approved Properties:",
allProperties
);



displayProperties(allProperties);



}

catch(error){


console.error(
"Firebase Error:",
error
);



container.innerHTML = `

<h2>
Unable to load properties
</h2>

`;

}


}







// =====================================
// DISPLAY PROPERTY CARDS
// =====================================


function displayProperties(list){


container.innerHTML = "";



if(list.length === 0){


container.innerHTML = `

<div class="no-property">

<h2>
No properties available
</h2>

<p>
Please check again later.
</p>

</div>

`;

return;

}





list.forEach(property=>{


let image =
"images/no-image.jpg";



if(
property.images &&
Array.isArray(property.images) &&
property.images.length > 0
){

image = property.images[0];

}




container.innerHTML += `


<div class="property-card">


<img

src="${image}"

alt="Rental House"

loading="lazy"

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
🛏 ${property.bedrooms || 0} Bedrooms
</p>



<p>
🚿 ${property.bathrooms || 0} Bathrooms
</p>



<p class="price">

Nu. ${Number(property.rent || 0).toLocaleString()} / month

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
// FILTER SYSTEM
// =====================================


function filterProperties(){


const searchValue =
searchInput.value.toLowerCase();



const dz =
dzongkhagFilter.value.toLowerCase();



const bedroom =
bedroomFilter.value;



const price =
priceFilter.value;





const filtered =
allProperties.filter(property=>{


const text = `

${property.title}

${property.location}

${property.dzongkhag}

`.toLowerCase();




return (


text.includes(searchValue)



&&



(

dz === ""

||

property.dzongkhag
?.toLowerCase()
===
dz

)



&&



(

bedroom === ""

||

Number(property.bedrooms)
>=
Number(bedroom)

)



&&



(

price === ""

||

Number(property.rent)
<=
Number(price)

)


);


});



displayProperties(filtered);


}






// =====================================
// EVENTS
// =====================================


searchInput.addEventListener(

"keyup",

filterProperties

);



dzongkhagFilter.addEventListener(

"change",

filterProperties

);



bedroomFilter.addEventListener(

"change",

filterProperties

);



priceFilter.addEventListener(

"change",

filterProperties

);







// =====================================
// START WEBSITE
// =====================================


loadDzongkhag();

loadProperties();