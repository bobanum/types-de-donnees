/*jslint browser:true, esnext:true*/
/*
TODO:Choix de langue
TODO:Difficulté
TODO:Ajouter des mots pas rapport
*/
class Tdd {
    static recupererGet() {
        var resultat = {};
        if (location.search === "") {
            return resultat;
        }
        var ligne = location.search.substr(1);
        var donnees = ligne.split(/&/g);
        for (var i = 0; i < donnees.length; i += 1) {
            var d = donnees[i].split(/=/g);
            if (d.length > 0) {
                var nom = d.shift();
                var val = d.join("=");
                resultat[nom] = val;
            }
        }
        return resultat;
    }
    static affichage() {
        var resultat = document.createElement('div');
        resultat.classList.add('tdd');
        var mot = resultat.appendChild(document.createElement('div'));
        mot.classList.add('mot');
        mot.innerHTML = "??????";
        mot.addEventListener('transitionend', this.evt.mot.transitionend);
        resultat.appendChild(this.affichageChoix(this.jeu.choix));
        resultat.appendChild(this.affichageScore());
        return resultat;
    }
    static redemarrerChrono() {
        var duration = this.but - this.points;
        if (this.difficulte === 1) {
            duration += 1;
        } else if (this.difficulte >= 3) {
            duration *= 1.5 - ((this.difficulte - 1) / (this.difficulte));
        }
        this.regleTransition['transition-duration'] = duration + "s";
        setTimeout(() => {
            var mot = document.querySelector('div.mot');
            mot.innerHTML = this.mot;
            mot.classList.add("on");
            var score = document.querySelector("div.score");
            score.classList.remove("correct");
            score.classList.remove("erreur");
            score.classList.remove("delai");
        }, this.pause);
    }
    static majScore() {
        document.querySelector("span.points").innerHTML = this.points;
        document.querySelector("span.but").innerHTML = this.but;
    }

    static setEvts() {
        this.evt = {
            window: {
                keydown: (e) => {
                    var choix = this.jeu.choix;
                    for (var ch in choix) {
                        var label = choix[ch].textContent.toUpperCase().charCodeAt(0);
                        if (e.keyCode === label || e.keyCode === label + 32) {
                            choix[ch].dispatchEvent(new Event("click"));
                        }
                    }
                }
            },
            mot: {
                transitionend: () => {
                    if (this.points >= this.but) {
                        return;
                    }
                    if (this.difficulte > 2) {
                        this.points = 0;
                    } else {
                        this.points -= 1;
                    }
                    // this.but += 1;
                    document.querySelector(".score").classList.add("delai");
                    this.majScore();
                    this.jeu.majMot();
                }
            },
            bouton: {
                click: (e) => {
                    var classe = e.target.getAttribute("class");
                    this.jeu.valider(classe);
                    this.majScore();
                    if (!this.verifierVictoire()) {
                        this.jeu.majMot();
                    }
                }
            }
        };
    }
    static affichageChoix(choix) {
        var resultat = document.createElement("div");
        resultat.classList.add("choix");
        for (let ch in choix) {
            let bouton = this.affichageBouton(choix[ch], ch);
            resultat.append(bouton);
            choix[ch] = bouton;
        }
        return resultat;
    }
    static affichageBouton(etiquette, classe) {
        var resultat = document.createElement('div');
        resultat.setAttribute("class", classe);
        resultat.innerHTML = etiquette;
        resultat.addEventListener("click", this.evt.bouton.click);
        return resultat;
    }
    static affichageScore() {
        var resultat = document.createElement("div");
        resultat.classList.add("score");
        var points = resultat.appendChild(document.createElement("span"));
        points.classList.add("points");
        points.innerHTML = this.points;
        resultat.appendChild(document.createTextNode("/"));
        var but = resultat.appendChild(document.createElement("span"));
        but.classList.add("but");
        but.innerHTML = this.but;
        return resultat;
    }
    static verifierVictoire() {
        if (this.points < this.but) {
            return false;
        }
        document.querySelector(".tdd").innerHTML = '<div class="bravo">Bravo!</div>';
        return true;
    }
    static loadJson(url) {
        return new Promise(resolve => {
            var xhr = new XMLHttpRequest();
            xhr.open("get", url);
            xhr.responseType = "json";
            xhr.addEventListener("load", () => {
                resolve(xhr.response);
            });
            xhr.send();
        });
    }
    static init() {
        this.setEvts();
        this.get = this.recupererGet();
        this.points = 0;
        this.but = 10;
        this.pause = 10; // Pause entre les mots en millisecondes
        this.difficulte = 2; // 1=facile plus de temps, 2=moyen 1 seconde par mot restant ou 3=Difficile moitie moins de temps pour répondre
        this.loadJson("mots.json").then(data => {
            for (let k in data) {
                this[k] = data[k];
            }
        });
    }
}
Tdd.init();

