// DOMContentLoaded garantit que script attend que tout le HTML soit chargé avant de s'exécuter (nécessaire car le <script> est dans le <head>)
window.addEventListener("DOMContentLoaded", function() {

    // récupère le formulaire via son id "monFormulaire"
    let monForm = document.getElementById("monFormulaire");

    // listen l'évènement "submit" (clic bouton Envoyer)
    monForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche envoi du formulaire et le rechargement de la page
        validerFormulaire();    // lance notre validation
    });

});


// Affiche msg erreur dans <span> et colore champ en rouge
function afficherErreur(champId, erreurId, message) {
    let champ  = document.getElementById(champId);
    let erreur = document.getElementById(erreurId);
    erreur.textContent = message;
    champ.classList.add("invalide");
}

// Efface msg erreur et retire liseré rouge
function effacerErreur(champId, erreurId) {
    let champ  = document.getElementById(champId);
    let erreur = document.getElementById(erreurId);
    erreur.textContent = "";
    champ.classList.remove("invalide");
}


function validerNom() {
    let champNom = document.getElementById("nom");

    // .trim() supprime espaces inutiles début/fin de saisie
    if (champNom.value.trim() === "") {
        afficherErreur("nom", "erreur-nom", "Le nom est obligatoire.");
        return false;
    }

    effacerErreur("nom", "erreur-nom");
    return true;
}


function validerEmail() {
    let champEmail = document.getElementById("email");

    // regex vérifie le format de l'email :
    // - Autorise lettres, chiffres, point, tiret, underscore avant le @
    // - Exige un @
    // - Refuse les caractères spéciaux (!, #, $, %, &...)
    // - Format attendu : quelquechose@domaine.extension
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (champEmail.value.trim() === "") {
        afficherErreur("email", "erreur-email", "L'email est obligatoire.");
        return false;
    } else if (!regex.test(champEmail.value)) {
        afficherErreur("email", "erreur-email", "L'email est invalide. Format attendu : nom@domaine.fr");
        return false;
    }

    effacerErreur("email", "erreur-email");
    return true;
}


function validerTelephone() {
    let champTel = document.getElementById("telephone");

    // Regex : exactement 10 chiffres, ex: 0612345678
    let regex = /^[0-9]{10}$/;

    if (champTel.value.trim() === "") {
        afficherErreur("telephone", "erreur-telephone", "Le téléphone est obligatoire.");
        return false;
    } else if (!regex.test(champTel.value)) {
        afficherErreur("telephone", "erreur-telephone", "Le téléphone doit contenir exactement 10 chiffres (ex: 0612345678).");
        return false;
    }

    effacerErreur("telephone", "erreur-telephone");
    return true;
}


function validerType() {
    let champType = document.getElementById("type");

    // .selectedIndex donne indice de l'option sélectionnée
    // .options[indice] donne option correspondante
    let optionSelectionnee = champType.options[champType.selectedIndex];

    // Si la valeur est "", l'utilisateur est resté sur "-- Choisissez un type --"
    if (optionSelectionnee.value === "") {
        afficherErreur("type", "erreur-type", "Veuillez choisir un type de bistrot.");
        return false;
    }

    effacerErreur("type", "erreur-type");
    return true;
}


function validerVille() {
    let champVille = document.getElementById("ville");

    if (champVille.value.trim() === "") {
        afficherErreur("ville", "erreur-ville", "La ville est obligatoire.");
        return false;
    }

    effacerErreur("ville", "erreur-ville");
    return true;
}



function validerPrix() {
    let champPrix = document.getElementById("prix");

    let optionSelectionnee = champPrix.options[champPrix.selectedIndex];

    // Si valeur est "", l'utilisateur est resté sur "-- Choisissez une gamme de prix --"
    if (optionSelectionnee.value === "") {
        afficherErreur("prix", "erreur-prix", "Veuillez choisir une fourchette de prix.");
        return false;
    }

    effacerErreur("prix", "erreur-prix");
    return true;
}



function validerService() {
    let erreur = document.getElementById("erreur-service");

    // querySelector récupère bouton radio coché parmi ceux qui ont name="service"
    // Retourne null si aucun n'est coché
    let serviceSelectionne = document.querySelector('input[name="service"]:checked');

    if (serviceSelectionne === null) {
        erreur.textContent = "Veuillez choisir un type de service.";
        return false;
    }

    erreur.textContent = "";
    return true;
}


function validerFormulaire() {

    // on stocke chaque résultat dans une variable
    // pour que TOUTES les erreurs s'affichent en même temps
    // (et non pas seulement la première)
    let nomOk     = validerNom();
    let emailOk   = validerEmail();
    let telOk     = validerTelephone();
    let typeOk    = validerType();
    let villeOk   = validerVille();
    let prixOk    = validerPrix();
    let serviceOk = validerService();

    // Si tous les champs valides, on confirme l'envoi
    if (nomOk && emailOk && telOk && typeOk && villeOk && prixOk && serviceOk) {
        alert("Formulaire envoyé avec succès ! Merci pour votre contribution à Bistrotter.");
    }
    else {
    alert("Le formulaire est incomplet. Veuillez corriger les erreurs indiquées en rouge.");
}
}
