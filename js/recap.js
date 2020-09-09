let commande = JSON.parse(localStorage.getItem("NewOrder"));
let elt = document.getElementById("recap");
let p = document.createElement("p");

elt.appendChild(p).innerHTML = "<br/>Récapitulatif de la commande : <br/> n° de la commande : " + commande["idOrder"] + "</br> Total : "+ commande["prix"] + " € <br/><br/> Vous recerverez par mail la confirmation de votre commmande.<br/>A bientôt !"
localStorage.clear()
sessionStorage.clear()