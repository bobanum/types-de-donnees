/*jslint browser:true, esnext:true*/
/*global Tdd, Tdd */
/*
TODO:Choix de langue
TODO:Difficulté
TODO:Ajouter des mots pas rapport
*/
window.addEventListener("load", function () {
    Tdd.get = Tdd.recupererGet();
    if (Tdd.get.jeu === 'trouvertype') {
        Tdd.jeu = TrouverType;
    } else if (Tdd.get.jeu === 'bonmauvais') {
        Tdd.jeu = BonMauvais;
    }
    Tdd.jeu.demarrer();
});
var construire;

class Jeu {
    static piger(array) {
        var pos = Math.floor(Math.random() * array.length);
        return array[pos];
    }
}
class BonMauvais extends Jeu {
    static demarrer() {
        Tdd.langue = 1; // 1=fr; 2=en; 3=les deux
        Tdd.ratioBonMauvais = 1; // Autant de bons que de mauvais
        var get = Tdd.recupererGet();
        if (get.difficulte && !isNaN(get.difficulte)) {
            Tdd.difficulte = parseInt(get.difficulte);
        }
        if (get.langue && !isNaN(get.langue)) {
            Tdd.langue = get.langue;
        }
        Tdd.regleTransition = window.document.styleSheets[0].cssRules[0].style;
        this.choix = {
            bon: 'Bon',
            mauvais: 'Mauvais'
        };
        this.bon = [];
        if (Tdd.langue & 1) {
            this.bon = this.bon.concat(['Entier', 'Réel', 'Booléen', 'Chaîne', 'Tableau', 'Fonction', 'Objet']);
        }
        if (Tdd.langue & 2) {
            this.bon = this.bon.concat(['Integer', 'Float', 'Boolean', 'String', 'Array', 'Function', 'Object']);
        }
        this.mauvais = [];
        if (Tdd.langue & 1) {
            this.mauvais = this.mauvais.concat(['Date', 'Code Postal', 'Nom', 'Fichier', 'Variable', 'Alphabet', 'Personne', 'Base', 'Concaténation', 'Boucle', 'Mot de passe', 'Alternative', 'Propriété', 'Instruction']);
        }
        if (Tdd.langue & 2) {
            this.mauvais = this.mauvais.concat(['Date', 'Postal Code', 'Name', 'File', 'Variable', 'Alphabet', 'Person', 'Base', 'Concatenation', 'Loop', 'Password', 'Alternative', 'Property', 'Instruction']);
        }

        document.body.innerHTML = '<h1><a href="index.html">Dénichez les types de données</a></h1>';
        document.body.appendChild(Tdd.affichage());
        window.addEventListener("keydown", Tdd.evt.window.keydown);
        this.majMot();
    }
    static majMot() {
        var mot;
        do {
            Tdd.reponse = (Math.random() * (1 + Tdd.ratioBonMauvais) < 1) ? "bon" : "mauvais";
            mot = this.piger(this[Tdd.reponse]);
        } while (mot === Tdd.mot);
        var dom_mot = document.querySelector('div.mot');
        dom_mot.innerHTML = "??????";
        dom_mot.classList.remove("on");
        Tdd.mot = mot;

        Tdd.redemarrerChrono();
        return this.mot;
    }
    static valider(classe) {
        if (classe === "bon" && Tdd.reponse === "bon") {
            //On augmente les points
            Tdd.points += 1;
            document.querySelector(".score").classList.add("correct");
        } else if (Tdd.reponse === "bon" || classe === "bon") {
            //On reset les points et augmente le but
            Tdd.points = 0;
            if (Tdd.difficulte > 1) {
                Tdd.but += 1;
            }
            document.querySelector(".score").classList.add("erreur");
        } else {
            // On passe à un autre mot
        }
    }
}

class TrouverType extends Jeu {
    static demarrer() {
        Tdd.langue = 1; // 1=fr; 2=en; 3=les deux
        Tdd.ratioBonMauvais = 1; // Autant de bons que de mauvais
        var get = Tdd.get;
        if (get.difficulte && !isNaN(get.difficulte)) {
            Tdd.difficulte = parseInt(get.difficulte);
        }
        if (get.langue && !isNaN(get.langue)) {
            Tdd.langue = get.langue;
        }
        Tdd.regleTransition = window.document.styleSheets[0].cssRules[0].style;
        this.choix = {
            entier: 'Entier',
            reel: 'Réel',
            booleen: 'Booléen',
            chaine: 'Chaîne',
            /*tableau: 'Tableau',
            fonction: 'Fonction',
            objet: 'Objet',*/
        };

        document.body.innerHTML = '<h1><a href="index.htm">Donnez le bon type de données</h1></a>';
        document.body.appendChild(Tdd.affichage());
        window.addEventListener("keydown", Tdd.evt.window.keydown);
        this.majMot();
    }
    static majMot() {
        var mot;
        do {
            Tdd.reponse = this.piger(Object.keys(construire));
            mot = construire[Tdd.reponse]();
        } while (mot === Tdd.mot);
        var dom_mot = document.querySelector('div.mot');
        dom_mot.innerHTML = ("??????");
        dom_mot.classList.remove("on");
        Tdd.mot = mot;

        Tdd.redemarrerChrono();
        return mot;
    }
    static valider(classe) {
        if (classe === Tdd.reponse) {
            //On augmente les points
            Tdd.points += 1;
            document.querySelector(".score").classList.add("correct");
        } else {
            //On reset les points et augmente le but
            Tdd.points -= 1;
            //Tdd.but += 1;
            document.querySelector(".score").classList.add("erreur");
        }
    }
}

construire = {
    booleen: function () { //Booleen
        return (Math.floor(Math.random() * 2) === 0) ? "true" : "false";
    },
    chaine: function () { //Chaine
        var mot = this.piger(Tdd.mots);
        var exception = Math.floor(Math.random() * 10);
        if (exception === 0) {
            mot = construire.booleen();
        }
        if (exception === 1) {
            mot = construire.entier();
        }
        if (exception === 2) {
            mot = construire.reel();
        }
        mot = (Math.floor(Math.random() * 2) === 0) ? '"' + mot + '"' : "'" + mot + "'";

        return mot;
    },
    entier: function () { //Entier
        var reponse = Math.floor(Math.random() * 10000);
        if (Math.floor(Math.random() * 3) === 0) {
            reponse = -reponse;
        }
        return reponse;
    },
    reel: function () { //Entier
        var reponse = Math.floor(Math.random() * 1000000);
        var nbDec = Math.floor(Math.random() * 5) + 1;
        nbDec = Math.pow(10, nbDec);
        reponse = reponse / nbDec;
        if (Math.floor(Math.random() * 3) === 0) {
            reponse = -reponse;
        }
        return reponse;
    },
};
