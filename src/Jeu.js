/*jslint browser:true, esnext:true*/
import App from "./App.js";
export default class Jeu {
	constructor(get) {
        this.points = 0;
        this.but = 10;
        this.pause = 10; // Pause entre les mots en millisecondes
        this.difficulte = 2; // 1=facile plus de temps, 2=moyen 1 seconde par mot restant ou 3=Difficile moitie moins de temps pour répondre
		if (get.difficulte && !isNaN(get.difficulte)) {
            this.difficulte = parseInt(get.difficulte);
        }
        if (get.langue && !isNaN(get.langue)) {
            this.langue = get.langue;
        }
	}
	piger(array) {
        var pos = Math.floor(Math.random() * array.length);
        return array[pos];
	}
	construire_booleen() { //Booleen
		return (Math.floor(Math.random() * 2) === 0) ? "true" : "false";
	}
	construire_chaine() { //Chaine
		var mot = this.piger(App.mots);
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
	}
	construire_entier() { //Entier
		var reponse = Math.floor(Math.random() * 10000);
		if (Math.floor(Math.random() * 3) === 0) {
			reponse = -reponse;
		}
		return reponse;
	}
	construire_reel() { //Entier
		var reponse = Math.floor(Math.random() * 1000000);
		var nbDec = Math.floor(Math.random() * 5) + 1;
		nbDec = Math.pow(10, nbDec);
		reponse = reponse / nbDec;
		if (Math.floor(Math.random() * 3) === 0) {
			reponse = -reponse;
		}
		return reponse;
	}
	static init() {
		this.prototype.construire = {
			booleen: this.prototype.construire_booleen,
			chaine: this.prototype.construire_chaine,
			entier: this.prototype.construire_entier,
			reel: this.prototype.construire_reel,
		};
	}
}
Jeu.init();