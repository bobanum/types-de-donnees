/*jslint browser:true, esnext:true*/
import Jeu from "./Jeu.js";
import App from "./App.js";
export default class BonMauvais extends Jeu {
	constructor(get) {
		super(get);
	}
	demarrer() {
        this.langue = 1; // 1=fr; 2=en; 3=les deux
        this.ratioBonMauvais = 1; // Autant de bons que de mauvais
        this.regleTransition = window.document.styleSheets[0].cssRules[0].style;
        this.choix = {
            bon: 'Bon',
            mauvais: 'Mauvais'
        };
        this.bon = [];
        if (this.langue & 1) {
            this.bon = this.bon.concat(['Entier', 'Réel', 'Booléen', 'Chaîne', 'Tableau', 'Fonction', 'Objet']);
        }
        if (this.langue & 2) {
            this.bon = this.bon.concat(['Integer', 'Float', 'Boolean', 'String', 'Array', 'Function', 'Object']);
        }
        this.mauvais = [];
        if (this.langue & 1) {
            this.mauvais = this.mauvais.concat(['Date', 'Code Postal', 'Nom', 'Fichier', 'Variable', 'Alphabet', 'Personne', 'Base', 'Concaténation', 'Boucle', 'Mot de passe', 'Alternative', 'Propriété', 'Instruction']);
        }
        if (this.langue & 2) {
            this.mauvais = this.mauvais.concat(['Date', 'Postal Code', 'Name', 'File', 'Variable', 'Alphabet', 'Person', 'Base', 'Concatenation', 'Loop', 'Password', 'Alternative', 'Property', 'Instruction']);
        }
        document.body.innerHTML = '<h1><a href="index.html">Dénichez les types de données</a></h1>';
        document.body.appendChild(App.affichage());
        window.addEventListener("keydown", this.evt.window.keydown);
        this.majMot();
    }
    majMot() {
        var mot;
        do {
            this.reponse = (Math.random() * (1 + this.ratioBonMauvais) < 1) ? "bon" : "mauvais";
            mot = this.piger(this[this.reponse]);
        } while (mot === this.mot);
        var dom_mot = document.querySelector('div.mot');
        dom_mot.innerHTML = "??????";
        dom_mot.classList.remove("on");
        this.mot = mot;
        this.redemarrerChrono();
        return this.mot;
    }
    valider(classe) {
        if (classe === "bon" && this.reponse === "bon") {
            //On augmente les points
            this.points += 1;
            document.querySelector(".score").classList.add("correct");
        }
        else if (this.reponse === "bon" || classe === "bon") {
            //On reset les points et augmente le but
            this.points = 0;
            if (this.difficulte > 1) {
                this.but += 1;
            }
            document.querySelector(".score").classList.add("erreur");
        }
        else {
            // On passe à un autre mot
        }
    }
}
