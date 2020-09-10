// Création du bloc/tableau panier
if (localStorage.length >= 1) {
    for (i = 0; i < localStorage.length; i++) {
        let newArticle = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let elt = document.getElementById("panier");
        let ligneNewArticle = document.createElement("tr");
        let divIMG = document.createElement("td");
        let imgTeddy = new Image();
        imgTeddy.src = newArticle["imageArticle"];
        imgTeddy.addEventListener("load", function () { });
        imgTeddy.classList.add("teddy-img-mini");
        let teddyName = document.createElement("td");
        let teddyColor = document.createElement("td");
        let teddyQuantité = document.createElement("td");
        let teddyPrice = document.createElement("td");
        let teddyRemote = document.createElement("td");
        let teddyXRemote = document.createElement("a");
        teddyXRemote.classList.add("btn");
        teddyXRemote.setAttribute("data-id", localStorage.key(i));
        elt.appendChild(ligneNewArticle).appendChild(divIMG).appendChild(imgTeddy);
        elt.appendChild(ligneNewArticle).appendChild(teddyName).innerHTML = newArticle["nameArticle"];
        elt.appendChild(ligneNewArticle).appendChild(teddyColor).innerHTML = newArticle["colorArticle"];
        elt.appendChild(ligneNewArticle).appendChild(teddyQuantité).innerHTML = newArticle["amountArticle"];
        elt.appendChild(ligneNewArticle).appendChild(teddyPrice).innerHTML = newArticle["priceArticle"] + "€";
        elt.appendChild(ligneNewArticle).appendChild(teddyRemote).appendChild(teddyXRemote).innerHTML = "X";
    }

    // Calcul du prix total du panier
    let ligneTotalPrice = document.createElement("tr");
    let celTotal = document.createElement("td");
    celTotal.classList.add("text-right");
    celTotal.setAttribute("colspan", "4");
        let celPrice = document.createElement("td");
    let totalPrice = [0];
    for (i = 0; i < localStorage.length; i++) {
        let article = JSON.parse(localStorage.getItem(localStorage.key(i)))
        let calcul = (article["priceArticle"] * article["amountArticle"]);
        let somme = calcul + totalPrice[i];
        totalPrice.push(somme);
    }
    let variable = totalPrice.pop();
    let elt = document.getElementById("panier");
    elt.appendChild(ligneTotalPrice).appendChild(celTotal).innerHTML = "Total du panier :";
    elt.appendChild(ligneTotalPrice).appendChild(celPrice).innerHTML = variable + "€";
    sessionStorage.setItem("prixOrder", variable);

    // Création bouton pour vider le panier
    let secondElt = document.getElementById("message");
    let removePanier = document.createElement("p");
    let removePanierA = document.createElement("a");
    removePanierA.classList.add("btn");
    secondElt.appendChild(removePanier).appendChild(removePanierA).innerHTML = "Vider votre panier";
    removePanierA.addEventListener("click", function () {
        localStorage.clear();
        window.location = "panier.html";
    });
    }
else {
    let secondElt = document.getElementById("message");
    secondElt.innerHTML = "Votre panier est vide!";
}

// Boutons suppression d'un seul article
let elt = document.getElementById("panier");
let button = elt.querySelectorAll("a.btn");
for (i = 0; i < button.length; i++) {
    button[i].addEventListener("click", function(){
        let articleToRemove = localStorage.key(i);
        localStorage.removeItem(articleToRemove);
        //window.location = "panier.html";
    });
}

// Formulaire de contact
let nom = document.getElementById("nom");
let prenom = document.getElementById("prenom");
let mail = document.getElementById("email");
let adresse = document.getElementById("adresse");
let cp = document.getElementById("cp");
let ville = document.getElementById("ville");

let idOrder = Math.random() * 10000000;
let idOrderInt = parseInt(idOrder);
let orderContent = localStorage;
let prix = sessionStorage.getItem("prixOrder");

let buttonOrder = document.getElementById("btnOrder");
buttonOrder.addEventListener("click", function() {
    let nomValue = nom.value;
    let prenomValue = prenom.value;
    let mailValue = mail.value;
    let adresseValue = adresse.value;
    let cpValue = cp.value;
    let villeValue = ville.value;
    let order = (JSON.stringify({
        idOrder : idOrderInt,
        prix : prix,
        nom : nomValue,
        prenom : prenomValue,
        mail : mailValue,
        adresse : adresseValue,
        cp : cpValue,
        ville : villeValue,
        content: orderContent
    }));
    localStorage.clear();
    localStorage.setItem("NewOrder", order);
    windon.location = "recap.html";
});
