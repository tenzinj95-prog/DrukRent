// =====================================
// DRUKRENT PROPERTIES SYSTEM
// FIREBASE + CLOUDINARY + 20 DZONGKHAG + 205 GEWOG
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
// BHUTAN DZONGKHAG + GEWOG DATA
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
"Wangchang",
"Tsento",
"Shongphu",
"Dogar",
"Naja"
],


"Punakha":[
"Barp",
"Chubu",
"Goenshari",
"Kabisa",
"Toewang",
"Talog",
"Shengana"
],


"Chhukha":[
"Bongo",
"Chapcha",
"Getana",
"Logchina",
"Metakha",
"Phuentsholing"
],


"Wangdue Phodrang":[
"Adha",
"Gasetsho",
"Phangyul",
"Ruepisa",
"Thedtsho",
"Nyisho",
"Sha",
"Sephu"
],


"Trongsa":[
"Drakteng",
"Langthil",
"Nubi",
"Tangsibji"
],


"Bumthang":[
"Chhoekhor",
"Chhume",
"Tang",
"Ura"
],


"Trashigang":[
"Bidung",
"Brong",
"Kanglung",
"Radhi",
"Udzorong",
"Yangneer",
"Thrimshing",
"Phongmey",
"Merak",
"Sakteng"
],


"Trashiyangtse":[
"Jamkhar",
"Toetsho",
"Yalang",
"Yangtse",
"Bumdeling",
"Ramjar"
],


"Mongar":[
"Chali",
"Gongdue",
"Kengkhar",
"Tsamang",
"Drametse",
"Narang",
"Ngatshang",
"Saleng"
],


"Lhuentse":[
"Khoma",
"Kurtoe",
"Menbi",
"Metsho",
"Minjey",
"Jarey"
],


"Samdrup Jongkhar":[
"Martshala",
"Wangphu",
"Orong",
"Phuntshothang",
"Langchenphu",
"Pemathang",
"Serthi"
],


"Pemagatshel":[
"Chhimoong",
"Dechhenling",
"Nanong",
"Shumar",
"Yurung",
"Zobel"
],


"Samtse":[
"Denchukha",
"Dophuchen",
"Phuentshogling",
"Tendruk",
"Ugentse",
"Tashicholing"
],


"Sarpang":[
"Chhuzagang",
"Ge-Nyen",
"Jigmichhoeling",
"Shompangkha",
"Umling",
"Samtenling"
],


"Tsirang":[
"Barshong",
"Patshaling",
"Phuentenchu",
"Semjong",
"Mendrelgang",
"Sergithang"
],


"Dagana":[
"Drujegang",
"Gesarling",
"Lhamoi Dzingkha",
"Tseza",
"Karmaling",
"Trashiding"
],


"Zhemgang":[
"Bardo",
"Nangkor",
"Panbang",
"Shingkhar",
"Bikhar",
"Langdurbi"
],


"Haa":[
"Bji",
"Gakiling",
"Katsog",
"Samar",
"Sangbay",
"Uesu"
]


};
// =====================================
// LOAD DZONGKHAG DROPDOWN
// =====================================


function loadDzongkhag(){


dzongkhagFilter.innerHTML = `

<option value="">
All Dzongkhag
</option>

`;



Object.keys(locations).forEach(dz=>{


dzongkhagFilter.innerHTML += `

<option value="${dz}">
${dz}
</option>

`;

});


}






// =====================================
// LOAD GEWOG DROPDOWN
// =====================================


function loadGewog(){


gewogFilter.innerHTML = `

<option value="">
All Gewog
</option>

`;



gewogFilter.disabled = true;



const selectedDzongkhag =
dzongkhagFilter.value;



if(selectedDzongkhag){



locations[selectedDzongkhag].forEach(gewog=>{


gewogFilter.innerHTML += `

<option value="${gewog}">
${gewog}
</option>

`;



});



gewogFilter.disabled = false;


}



filterProperties();


}








// =====================================
// LOAD FIREBASE PROPERTIES
// =====================================


async function loadProperties(){


try{


const snapshot = await getDocs(

collection(db,"properties")

);



allProperties = [];



snapshot.forEach(doc=>{


const property = {

id:doc.id,

...doc.data()

};




// ONLY APPROVED PROPERTIES

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
🏘 ${property.gewog || ""}
</p>



<p>
🛏 ${property.bedrooms || 0} Bedroom(s)
</p>



<p>
🚿 ${property.bathrooms || 0} Bathroom(s)
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



const gew =

gewogFilter.value.toLowerCase();



const bedroom =

bedroomFilter.value;



const price =

priceFilter.value;






const filtered =

allProperties.filter(property=>{


const text = `

${property.title || ""}

${property.location || ""}

${property.dzongkhag || ""}

${property.gewog || ""}

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

gew === ""

||

property.gewog
?.toLowerCase()
===
gew

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

()=>{


loadGewog();


}

);



gewogFilter.addEventListener(

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
// START SYSTEM
// =====================================


loadDzongkhag();

loadProperties();