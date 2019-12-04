/*jslint browser:true, esnext:true*/
/*global Tdd, Tdd */
/*
TODO:Choix de langue
TODO:Difficulté
TODO:Ajouter des mots pas rapport
*/
import TrouverType from "./TrouverType.js";
import BonMauvais from "./BonMauvais.js";
import Tdd from "./Tdd.js";
window.addEventListener("load", function () {
    Tdd.get = Tdd.recupererGet();
    if (Tdd.get.jeu === 'trouvertype') {
        Tdd.jeu = TrouverType;
    } else if (Tdd.get.jeu === 'bonmauvais') {
        Tdd.jeu = BonMauvais;
    } else {
        return;
    }
    Tdd.jeu.demarrer();
});
