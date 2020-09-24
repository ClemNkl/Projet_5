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

    // Ajout du bouton pour vider le panier
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

// Création n° de commande + récupération du contenu et du prix total de la commande
let idOrder = Math.random() * 10000000;
let idOrderInt = parseInt(idOrder);
let orderContent = localStorage;
let prix = sessionStorage.getItem("prixOrder");

// Vérifications des valeurs des inputs du formulaire
let textValidation = /[A-Za-z]/;
let mailValidation = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
let cpValidation = /^[0-9]{5}$/;

let nom = document.getElementById("nom");
nom.addEventListener('change', function(event) {
    event.preventDefault();
    if (textValidation.test(nom.value) == false) {
        alert('Veuillez entrer un nom correct');
    }
});

let prenom = document.getElementById("prenom");
prenom.addEventListener('change', function(event) {
    event.preventDefault();
    if (textValidation.test(prenom.value) == false) {
        alert('Veuillez entrer un prénom correct');
    }
});

let mail = document.getElementById("email");
mail.addEventListener('change', function(event) {
    event.preventDefault();
    if (mailValidation.test(mail.value) == false) {
        alert('Veuillez entrer un mail correct');
    }
});

let cp = document.getElementById("cp");
cp.addEventListener('change', function(event) {
    event.preventDefault();
    if (cpValidation.test(cp.value) == false) {
        alert('Veuillez entrer un code postal correct');
    }
});

let ville = document.getElementById("ville");
ville.addEventListener('change', function(event) {
    event.preventDefault();
    if (textValidation.test(ville.value) == false) {
        alert('Veuillez entrer une ville correct');
    }
});

// POST du formulaire de contact
let buttonOrder = document.getElementById("btnOrder");
buttonOrder.addEventListener("click", function(event) {
    if (localStorage.length == 0) {
      alert('Veuillez ajouter un article au panier pour passer commande.');
    }
    else {
      let order = (JSON.stringify({
          idOrder : idOrderInt,
          prix : prix,
          nom : nom.value,
          prenom : prenom.value,
          mail : mail.value,
          adresse : adresse.value,
          cp : cp.value,
          ville : ville.value,
          content: orderContent
      }));
      localStorage.setItem("NewOrder", order);
      new Promise((resolve, reject) => {
          let request = new XMLHttpRequest();
          request.open('POST', 'http://localhost:3000/api/teddies/');
          request.setRequestHeader("Content-Type", "application/json");
          request.onreadystatechange = function () {
              if (this.readyState === XMLHttpRequest.DONE) {
                  if (this.status === 200) {
                      request.send(order);
                      window.location = "recap.html";
                  }
                  else {
                      reject(XMLHttpRequest);
                  }
              }
          }
      });
    }
  });
