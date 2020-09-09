// Récupération de l'ID de la peluche à afficher
let idUrl = window.location.search;
let idTeddy = idUrl.substr(4);
let newArticle = []

// Récupération des éléments
function teddyGet() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:3000/api/teddies/' + idTeddy);
        request.send();
        request.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText));
                    let response = JSON.parse(this.responseText);
                }
                else {
                    reject(XMLHttpRequest);
                }
            }
        }
    })
};

//Eléments pour construire le bloc présentation de la peluche
let teddy = document.getElementById("teddy");
let divImg = document.createElement("div");
divImg.classList.add("col-6");
let myImg = new Image();
myImg.addEventListener('load', function () { });
myImg.classList.add('teddy-img');
let divDescription = document.createElement("div");
divDescription.classList.add("col-6");
let nameTeddy = document.createElement("h3");
nameTeddy.classList.add('text-center');
let teddyDescription = document.createElement("p");
let teddyPrice = document.createElement("p");
let divColor = document.createElement('div');
divColor.classList.add('div-color');
let labelColor = document.createElement("p");
let choiceColor = document.createElement("select");
let divQuantité = document.createElement('div');
divQuantité.classList.add('div-quantite');
let addCart = document.createElement("button");
addCart.classList.add("btn", "btn-lg");

// Création du bloc descriptif de la peluche
teddyGet()
    .then(function (response) {
        document.title=response["name"];
        myImg.src = response["imageUrl"];
        teddy.appendChild(divImg).appendChild(myImg);
        teddy.appendChild(divDescription).appendChild(nameTeddy).innerHTML = response["name"];
        teddy.appendChild(divDescription).appendChild(teddyDescription).innerHTML = response["description"];
        teddy.appendChild(divDescription).appendChild(teddyPrice).innerHTML = "Prix : " + response["price"] / 100 + "€";
        teddy.appendChild(divDescription).appendChild(divColor).appendChild(labelColor).innerHTML = "Veuillez choisir une couleur : ";

    })

// Choix de la couleur
teddyGet()
    .then(function (response) {
        for (i = -1; i < response["colors"].length; i++) {
            if (i < 0) {
                let x = teddy.appendChild(divDescription).appendChild(divColor).appendChild(choiceColor);
                let option = document.createElement("option");
                option.text = "---";
                x.add(option);
            }
            else {
                let x = teddy.appendChild(divDescription).appendChild(divColor).appendChild(choiceColor);
                let option = document.createElement("option");
                option.text = response["colors"][i];
                option.setAttribute("value", option.text);
                x.add(option);
                sessionStorage.removeItem("color");
                choiceColor.addEventListener("click", function (event) {
                    if (x.value != "---") {
                        let colorStorage = x.value;                        
                        event.preventDefault();
                        sessionStorage.setItem("color", colorStorage);
                    }
                })


            }
        }

    })

// Choix de la quantité
teddyGet()
    .then(function () {
        let nombreTeddies = document.createElement("p");
        nombreTeddies.innerHTML = "Quantité : ";
        teddy.appendChild(divDescription).appendChild(divQuantité).appendChild(nombreTeddies);
        let amount = document.createElement("select");
        var xAmount = teddy.appendChild(divDescription).appendChild(divQuantité).appendChild(amount);
        for (d = 1; d <= 3; d++) {
            var optionAmount = document.createElement("option");
            optionAmount.text = d
            xAmount.add(optionAmount);
            sessionStorage.setItem("amount", "1")
            amount.addEventListener("click", function (event) {
                let amountStorage = xAmount.value
                event.preventDefault();
                sessionStorage.setItem("amount", amountStorage);
            });
        }
    })

// Ajout du bouton commande
teddyGet()
    .then(function (response) {
        addCart.type = "submit";
        teddy.appendChild(divDescription).appendChild(addCart).innerHTML = "Ajouter au panier";
        addCart.addEventListener("click", function (event) {
            if (sessionStorage.getItem("color")) {
                event.preventDefault();
                sessionStorage.setItem("id", response["_id"]);
                sessionStorage.setItem("name", response["name"]);
                sessionStorage.setItem("price", response["price"] / 100);
                sessionStorage.setItem("image", response["imageUrl"]);
                window.location = "panier.html";
            }
            else {
                event.preventDefault();
                alert("Merci de choisir une couleur!")
            }

        })
    })

    .catch(function (error) {
    });