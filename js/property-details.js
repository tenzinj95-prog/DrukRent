// =====================================
// DRUKRENT PROPERTY DETAILS
// CLOUDINARY IMAGE VERSION
// =====================================


import { db } from "./firebase-config.js";


import {

    doc,
    getDoc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





const container = document.getElementById(
    "propertyDetails"
);





const urlParams =
new URLSearchParams(
    window.location.search
);



const propertyId =
urlParams.get("id");







async function loadProperty(){



if(!propertyId){


container.innerHTML = `

<h2>
Property not found
</h2>

`;

return;


}







try{


const propertyRef =
doc(
    db,
    "properties",
    propertyId
);



const snapshot =
await getDoc(propertyRef);





if(!snapshot.exists()){


container.innerHTML = `

<h2>
Property not found
</h2>

`;

return;


}






const property =
snapshot.data();







let gallery = "";





if(property.images && property.images.length > 0){



property.images.forEach(image=>{


gallery += `


<img

src="${image}"

class="detail-image"

alt="House Image"

onerror="this.src='images/no-image.jpg'"

>


`;



});



}

else{


gallery = `


<img

src="images/no-image.jpg"

class="detail-image"

>


`;



}










container.innerHTML = `



<div class="property-gallery">


${gallery}


</div>





<div class="property-info">





<h1>

${property.title || "Rental Property"}

</h1>





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
🛏 ${property.bedrooms || 0} Bedroom(s)
</p>





<p>
🚿 ${property.bathrooms || 0} Bathroom(s)
</p>





<h2 class="price">

Nu. ${Number(property.rent || 0).toLocaleString()} / month

</h2>







<p>

${property.description || "No description available"}

</p>






<h2>
Owner Contact
</h2>





<p>
👤 ${property.owner || ""}
</p>





<p>
📞 ${property.phone || ""}
</p>






<a

href="tel:${property.phone}"

class="btn">

Call Owner

</a>





<a

href="https://wa.me/975${property.phone}"

target="_blank"

class="btn">

WhatsApp

</a>







${

property.map

?

`

<br><br>

<a

href="${property.map}"

target="_blank"

class="btn">

Google Map

</a>

`

:

""

}






</div>



`;





}

catch(error){


console.error(
error
);



container.innerHTML = `

<h2>
Error loading property
</h2>

`;



}




}





loadProperty();