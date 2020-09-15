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
        teddyXRemote.setAttribute("id", localStorage.key(i));
        teddyXRemote.addEventListener("click", function() {
            let attribut = teddyXRemote.getAttribute("id");
            localStorage.removeItem(attribut);
            window.location = "panier.html";
        });
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

// Formulaire de contact
let idOrder = Math.random() * 10000000;
let idOrderInt = parseInt(idOrder);
let orderContent = localStorage;
let prix = sessionStorage.getItem("prixOrder");

if (localStorage.length >= 1) {
  let buttonOrder = document.getElementById("btnOrder");
  buttonOrder.addEventListener("click", function() {
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let mail = document.getElementById("email").value;
    let adresse = document.getElementById("adresse").value;
    let cp = document.getElementById("cp").value;
    let ville = document.getElementById("ville").value;
    let order = (JSON.stringify({
        idOrder : idOrderInt,
        prix : prix,
        nom : nom,
        prenom : prenom,
        mail : mail,
        adresse : adresse,
        cp : cp,
        ville : ville,
        content: orderContent
    }));
    localStorage.setItem("NewOrder", order);
    window.location = "recap.html";
  });
}
else {
    alert("Veuillez choisir au moins un article du catalogue pour passer commande.");
}
