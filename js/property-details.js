// =====================================
// DRUKRENT PROPERTY DISPLAY
// FIREBASE + CLOUDINARY IMAGE VERSION
// APPROVED PROPERTY SYSTEM
// FILTER + SEARCH SYSTEM
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


const gewogFilter =
document.getElementById("gewogFilter");


const bedroomFilter =
document.getElementById("bedroomFilter");


const priceFilter =
document.getElementById("priceFilter");




let allProperties = [];




// =====================================
// LOCATION DATA
// =====================================


const locations = {


"Thimphu":[
"Chang",
"Kawang",
"Mewang",
"Naro",
"Geney"
],


"Paro":[
"Doteng",
"Dopshari",
"Hungrel",
"Lamgong",
"Shaba",
"Wangchang"
],


"Punakha":[
"Barp",
"Chubu",
"Kabisa",
"Toewang"
],


"Chhukha":[
"Bongo",
"Chapcha",
"Phuentsholing"
]


};






// =====================================
// LOAD DZONGKHAG
// =====================================


function loadDzongkhag(){


if(!dzongkhagFilter)
return;



dzongkhagFilter.innerHTML = `

<option value="">
All Dzongkhag
</option>

`;



Object.keys(locations).forEach(dzongkhag=>{


dzongkhagFilter.innerHTML += `

<option value="${dzongkhag}">
${dzongkhag}
</option>

`;

});


}






// =====================================
// LOAD GEWOG
// =====================================


function loadGewog(){


if(!gewogFilter)
return;



gewogFilter.innerHTML = `

<option value="">
All Gewog
</option>

`;



gewogFilter.disabled = true;



const selected =
dzongkhagFilter.value;



if(selected){


locations[selected].forEach(gewog=>{


gewogFilter.innerHTML += `

<option value="${gewog}">
${gewog}
</option>

`;

});


gewogFilter.disabled = false;


}


}








// =====================================
// LOAD FIRESTORE PROPERTIES
// =====================================


async function loadProperties(){


console.log(
"Loading properties once"
);



try{


const snapshot =
await getDocs(
collection(db,"properties")
);



allProperties = [];



snapshot.forEach(doc=>{


const property = {

id:doc.id,

...doc.data()

};



// only approved

if(property.status === "approved"){


allProperties.push(property);


}



});



displayProperties(allProperties);



}



catch(error){


console.error(
"Error loading properties:",
error
);



if(container){

container.innerHTML = `

<h2>
Failed loading properties
</h2>

`;

}


}



}








// =====================================
// DISPLAY PROPERTIES
// =====================================


function displayProperties(list){



if(!container)
return;




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




let html = "";




list.forEach(property=>{


let image =
"images/no-image.jpg";



if(

Array.isArray(property.images)

&&

property.images.length > 0

){

image =
property.images[0];

}





html += `


<div class="property-card">



<img

src="${image}"

alt="Property Image"

loading="eager"

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
🛏 ${property.bedrooms || 0} Bedroom(s)
</p>



<p class="price">

Nu. ${Number(property.rent || 0).toLocaleString()}

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




container.innerHTML = html;



}









// =====================================
// FILTER
// =====================================


function filterProperties(){


const dz =
dzongkhagFilter.value.toLowerCase();


const gew =
gewogFilter.value.toLowerCase();


const bed =
bedroomFilter.value;


const price =
priceFilter.value;




const filtered =
allProperties.filter(property=>{


return (


dz === ""

||

property.dzongkhag
?.toLowerCase()
=== dz


)


&&


(


gew === ""

||

property.gewog
?.toLowerCase()
=== gew


)


&&


(


bed === ""

||

Number(property.bedrooms)
>= Number(bed)


)


&&


(


price === ""

||

Number(property.rent)
<= Number(price)


);



});



displayProperties(filtered);



}









// =====================================
// SEARCH
// =====================================


if(searchInput){


searchInput.addEventListener(
"input",
()=>{


const keyword =
searchInput.value.toLowerCase();



const filtered =
allProperties.filter(property=>{


return (

property.title
?.toLowerCase()
.includes(keyword)


||

property.location
?.toLowerCase()
.includes(keyword)


||

property.dzongkhag
?.toLowerCase()
.includes(keyword)


||

property.gewog
?.toLowerCase()
.includes(keyword)


);


});



displayProperties(filtered);



});


}








// =====================================
// EVENTS
// =====================================


if(dzongkhagFilter){

dzongkhagFilter.addEventListener(
"change",
()=>{

loadGewog();

filterProperties();

}
);

}



if(gewogFilter){

gewogFilter.addEventListener(
"change",
filterProperties
);

}



if(bedroomFilter){

bedroomFilter.addEventListener(
"change",
filterProperties
);

}



if(priceFilter){

priceFilter.addEventListener(
"change",
filterProperties
);

}






// =====================================
// START
// =====================================


loadDzongkhag();

loadProperties();