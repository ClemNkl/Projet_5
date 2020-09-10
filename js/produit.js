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
let divImg = document.getElementById("divImg");
let myImg = new Image();
myImg.addEventListener('load', function () { });
myImg.classList.add('teddy-img');
let nameTeddy = document.getElementById("nameTeddy");
let teddyDescription = document.getElementById("description");
let teddyPrice = document.getElementById("price");
let choiceColor = document.getElementById("choiceColor");
let choiceAmount = document.getElementById("choiceAmount");
let addCart = document.getElementById("addCart");

// Remplissage du bloc descriptif de la peluche
teddyGet()
    .then(function (response) {
        document.title = response["name"];
        myImg.src = response["imageUrl"];
        divImg.appendChild(myImg);
        nameTeddy.innerHTML = response["name"];
        teddyDescription.innerHTML = response["description"];
        teddyPrice.innerHTML = "Prix : " + response["price"] / 100 + "€";
})

// Choix de la couleur
let colorStorage = 0;
teddyGet()
    .then(function (response) {
        for (i = -1; i < response["colors"].length; i++) {
            if (i < 0) {
                let option = document.createElement("option");
                option.text = "---";
                choiceColor.add(option);
            }
            else {
                let option = document.createElement("option");
                option.text = response["colors"][i];
                option.setAttribute("value", option.text);
                choiceColor.add(option);
                choiceColor.addEventListener("click", function (event) {
                    if (choiceColor.value != "---") {
                        event.preventDefault();
                        colorStorage = choiceColor.value;
                    }
                })
            }
        }
    })

// Choix de la quantité
let amountStorage = 1;
teddyGet()
    .then(function () {
        for (d = 1; d <= 5; d++) {
            var optionAmount = document.createElement("option");
            optionAmount.text = d
            choiceAmount.add(optionAmount);
            choiceAmount.addEventListener("change", function (event) {
                event.preventDefault();
                amountStorage = choiceAmount.value
            });
        }
    })

// Ajout au panier
teddyGet()
    .then(function (response) {
        addCart.addEventListener("click", function (event) {
            if (colorStorage != 0) {
                event.preventDefault();
                let article = (JSON.stringify({
                    idArticle : response["id"],
                    nameArticle : response["name"],
                    imageArticle : response["imageUrl"],
                    priceArticle : response["price"] / 100,
                    colorArticle : colorStorage,
                    amountArticle : amountStorage,
                }));
                let nomArticle = response["id"];
                localStorage.setItem("nomArticle", article);
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
