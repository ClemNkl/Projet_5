if (sessionStorage.length == 6) {
    let article = (JSON.stringify({
        idArticle : sessionStorage.id,
        imageArticle : sessionStorage.image,
        nameArticle : sessionStorage.name,
        priceArticle : sessionStorage.price,
        colorArticle : sessionStorage.color,
        amountArticle : sessionStorage.amount,
    }));
    sessionStorage.clear();
    if (localStorage.length == 0) {
    localStorage.setItem("NewArticle", article);
    }
    else {
        localStorage.setItem("NewArticle" + localStorage.length++, article);
    }
}

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
        imgTeddy.classList.add('teddy-img-mini');
        let teddyName = document.createElement("td");
        let teddyColor = document.createElement('td');
        let teddyQuantité = document.createElement('td');
        let teddyPrice = document.createElement('td');
        let teddyRemote = document.createElement('td');
        let teddyXRemote = document.createElement('a');
        teddyXRemote.classList.add("btn");
        teddyXRemote.addEventListener("click", function() {
            localStorage.removeItem("NewArticle");
            window.location ="panier.html";
        });
        elt.appendChild(ligneNewArticle).appendChild(divIMG).appendChild(imgTeddy);
        elt.appendChild(ligneNewArticle).appendChild(teddyName).innerHTML = newArticle["nameArticle"];
        elt.appendChild(ligneNewArticle).appendChild(teddyColor).innerHTML = newArticle["colorArticle"];
        elt.appendChild(ligneNewArticle).appendChild(teddyQuantité).innerHTML = newArticle["amountArticle"];
        elt.appendChild(ligneNewArticle).appendChild(teddyPrice).innerHTML = newArticle["priceArticle"] + "€";
        elt.appendChild(ligneNewArticle).appendChild(teddyRemote).appendChild(teddyXRemote).innerHTML = "X";
    }
}
else {
    let secondElt = document.getElementById("message");
    secondElt.innerHTML = "Votre panier est vide!";
}