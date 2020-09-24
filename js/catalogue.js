// Récupération des éléments
function teddiesGet() {
    return new Promise((resolve, reject) => {
        let recoverHttp = new XMLHttpRequest();
        recoverHttp.open('GET', 'http://localhost:3000/api/teddies/');
        recoverHttp.send();
        recoverHttp.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText));
                    var response = JSON.parse(this.responseText);
                } else {
                    reject(XMLHttpRequest);
                }
            }
        }
    })
};

// Création d'un bloc peluche
teddiesGet()
    .then(function (response) {
        for (let i = 0; i < response.length; i++) {
            let elt = document.getElementById("teddy");
            let myImg = new Image();
            myImg.addEventListener('load', function () {
            });
            myImg.src = response[i]["imageUrl"];
            myImg.classList.add('card-img-top');
            let divColonne = document.createElement("div");
            divColonne.classList.add("col-md-4")
            let divCard = document.createElement("div");
            divCard.classList.add("card");
            let divCardBody = document.createElement("div");
            divCardBody.classList.add("card-body");
            let nameTeddy = document.createElement("h5");
            nameTeddy.classList.add('card-title');
            let priceTeddy = document.createElement("p");
            priceTeddy.classList.add('card-text');
            let descriptionTeddy = document.createElement("p");
            descriptionTeddy.classList.add('card-text');
            let lienProduct = document.createElement("a");
            let idLien = response[i]["_id"]
            lienProduct.href = "produit.html?id=" + idLien
            lienProduct.classList.add("btn");
            elt.appendChild(divColonne).appendChild(divCard).appendChild(myImg);
            elt.appendChild(divColonne).appendChild(divCard).appendChild(divCardBody).appendChild(nameTeddy).innerHTML = response[i]["name"];
            elt.appendChild(divColonne).appendChild(divCard).appendChild(divCardBody).appendChild(descriptionTeddy).innerHTML = response[i]["description"];
            elt.appendChild(divColonne).appendChild(divCard).appendChild(divCardBody).appendChild(priceTeddy).innerHTML = "Prix : " + response[i]["price"] / 100 + "€";
            elt.appendChild(divColonne).appendChild(divCard).appendChild(divCardBody).appendChild(lienProduct).innerHTML = "En savoir plus";
        }
    })
    .catch(function (error) {
    });
