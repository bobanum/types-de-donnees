/*jslint browser:true, esnext:true*/
/*global majMot, valider */
/*
TODO:Choix de langue
TODO:Difficulté
TODO:Ajouter des mots pas rapport
*/
var tdd = {
    points: 0,
    but: 10,
    pause: 10, // Pause entre les mots en millisecondes
    difficulte: 2, // 1=facile plus de temps, 2=moyen 1 seconde par mot restant ou 3=Difficile moitie moins de temps pour répondre
};
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
        mot.addEventListener('transitionend', Tdd.evt.mot.transitionend);
        resultat.appendChild(this.affichageChoix());
        resultat.appendChild(this.affichageScore());
        return resultat;
    }
    static piger(array) {
        var pos = Math.floor(Math.random() * array.length);
        return array[pos];
    }
    static redemarrerChrono() {
        var duration = tdd.but - tdd.points;
        if (tdd.difficulte === 1) {
            duration += 1;
        } else if (tdd.difficulte >= 3) {
            duration *= 1.5 - ((tdd.difficulte - 1) / (tdd.difficulte));
        }
        tdd.regleTransition['transition-duration'] = duration + "s";
        setTimeout(function () {
            var mot = document.querySelector('div.mot');
            mot.innerHTML = tdd.mot;
            mot.classList.add("on");
            var score = document.querySelector("div.score");
            score.classList.remove("correct");
            score.classList.remove("erreur");
            score.classList.remove("delai");
        }, tdd.pause);
    }
    static majScore() {
        document.querySelector("span.points").innerHTML = tdd.points;
        document.querySelector("span.but").innerHTML = tdd.but;
    }

    static setEvts() {
        this.evt = {
            window: {
                keydown: (e) => {
                    for (var ch in tdd.choix) {
                        var label = tdd.choix[ch].textContent.toUpperCase().charCodeAt(0);
                        if (e.keyCode === label || e.keyCode === label + 32) {
                            tdd.choix[ch].dispatchEvent(new Event("click"));
                        }
                    }
                }
            },
            mot: {
                transitionend: () => {
                    if (tdd.points >= tdd.but) {
                        return;
                    }
                    if (tdd.difficulte > 2) {
                        tdd.points = 0;
                    } else {
                        tdd.points -= 1;
                    }
                    // tdd.but += 1;
                    document.querySelector(".score").classList.add("delai");
                    this.majScore();
                    majMot();
                }
            },
            bouton: {
                click: (e) => {
                    var classe = e.target.getAttribute("class");
                    valider(classe);
                    this.majScore();
                    if (!this.verifierVictoire()) {
                        majMot();
                    }
                }
            }
        };
    }
    static init() {
        this.setEvts();
    }
    static affichageChoix() {
        var resultat = document.createElement("div");
        resultat.classList.add("choix");
        for (let ch in tdd.choix) {
            let bouton = this.affichageBouton(tdd.choix[ch], ch);
            resultat.append(bouton);
            tdd.choix[ch] = bouton;
        }
        return resultat;
    }
    static affichageBouton(etiquette, classe) {
        var resultat = document.createElement('div');
        resultat.setAttribute("class", classe);
        resultat.innerHTML = etiquette;
        resultat.addEventListener("click", Tdd.evt.bouton.click);
        return resultat;
    }
    static affichageScore() {
        var resultat = document.createElement("div");
        resultat.classList.add("score");
        var points = resultat.appendChild(document.createElement("span"));
        points.classList.add("points");
        points.innerHTML = tdd.points;
        resultat.appendChild(document.createTextNode("/"));
        var but = resultat.appendChild(document.createElement("span"));
        but.classList.add("but");
        but.innerHTML = tdd.but;
        return resultat;
    }
    static verifierVictoire() {
        if (tdd.points < tdd.but) {
            return false;
        }
        document.querySelector(".tdd").innerHTML = '<div class="bravo">Bravo!</div>';
        return true;
    }
}
Tdd.init();

