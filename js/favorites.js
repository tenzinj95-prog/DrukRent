const container =
document.getElementById("favoriteContainer");




// Get favorite IDs

const favorites = JSON.parse(

localStorage.getItem("favorites")

) || [];




// Get user added properties

const savedProperties = JSON.parse(

localStorage.getItem("properties")

) || [];




// Combine properties

const allProperties = [

...properties,

...savedProperties

];




// Find favorites

const favoriteProperties = allProperties.filter(

property => favorites.includes(property.id)

);







if(favoriteProperties.length === 0){


container.innerHTML = `

<h2>
No favorite houses yet ❤️
</h2>

<p>
Go back and click Favorite on houses you like.
</p>

`;



}

else{



favoriteProperties.forEach(property => {



let image;



if(property.images && property.images.length > 0){

image = property.images[0];

}

else{

image = property.image;

}







container.innerHTML += `


<div class="property-card">



<img
src="${image}"
alt="${property.title}">






<div class="property-info">



<h3>
${property.title}
</h3>





<p>
📍 ${property.location}
</p>





<p>
🏛 ${property.dzongkhag || "Not added"}
</p>





<p>
🏘 ${property.gewog || "Not added"} Gewog
</p>





<p class="price">

Nu. ${property.rent.toLocaleString()} / month

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