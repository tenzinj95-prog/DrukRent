const form = document.getElementById("contactForm");


if(form){


form.addEventListener("submit", function(e){


e.preventDefault();


alert(
"Thank you for contacting DrukRent. We will reply soon."
);


form.reset();


});


}