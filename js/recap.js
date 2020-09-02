let commande = JSON.parse(localStorage.getItem("commande"));
let elt = document.getElementById("recap");
let p = document.createElement("p");

elt.appendChild(p).innerHTML = "Récapitulatif de la commande : <br/> n° de la commande : " + order["orderId"] + "</br> Total : " + sessionStorage.getItem("totalPrice") + "€ <br/> Vous recerverez par mail la confirmation de votre commmande. A bientôt !"
localStorage.clear()
sessionStorage.clear()