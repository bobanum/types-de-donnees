/*jslint browser:true, esnext:true*/
import Jeu from "./Jeu.js";
import App from "./App.js";
export default class TrouverType extends Jeu {
	constructor(get) {
		super(get);
	}
	demarrer() {
        this.langue = 1; // 1=fr; 2=en; 3=les deux
        this.ratioBonMauvais = 1; // Autant de bons que de mauvais
        var get = this.get;
        if (get.difficulte && !isNaN(get.difficulte)) {
            this.difficulte = parseInt(get.difficulte);
        }
        if (get.langue && !isNaN(get.langue)) {
            this.langue = get.langue;
        }
        this.regleTransition = window.document.styleSheets[0].cssRules[0].style;
        this.choix = {
            entier: 'Entier',
            reel: 'Réel',
            booleen: 'Booléen',
            chaine: 'Chaîne',
        };
        document.body.innerHTML = '<h1><a href="index.htm">Donnez le bon type de données</h1></a>';
        document.body.appendChild(this.affichage());
        window.addEventListener("keydown", this.evt.window.keydown);
        this.majMot();
    }
    majMot() {
        var mot;
        do {
            this.reponse = this.piger(Object.keys(Jeu.construire));
            mot = Jeu.construire[this.reponse]();
        } while (mot === this.mot);
        var dom_mot = document.querySelector('div.mot');
        dom_mot.innerHTML = ("??????");
        dom_mot.classList.remove("on");
        this.mot = mot;
        this.redemarrerChrono();
        return mot;
    }
    valider(classe) {
        if (classe === this.reponse) {
            //On augmente les points
            this.points += 1;
            document.querySelector(".score").classList.add("correct");
        }
        else {
            //On reset les points et augmente le but
            this.points -= 1;
            //this.but += 1;
            document.querySelector(".score").classList.add("erreur");
        }
    }
}
