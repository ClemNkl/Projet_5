let order = JSON.parse(sessionStorage.getItem("order"));
let idOrder = order["orderId"];
let price = sessionStorage.getItem("prixOrder");
let elt = document.getElementById("recap");
let p = document.createElement("p");

elt.appendChild(p).innerHTML = "<br/>Récapitulatif de la commande : <br/> n° de la commande : " + idOrder + "</br> Total : "+ price + " € <br/><br/> Vous recerverez par mail la confirmation de votre commmande.<br/>A bientôt !"
localStorage.clear();
sessionStorage.clear();
