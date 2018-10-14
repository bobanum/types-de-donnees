/*
TODO:Choix de langue
TODO:Difficulté
TODO:Ajouter des mots pas rapport
*/
window.tdd = {
	points:0,
	but:10,
	pause:10,	// Pause entre les mots en millisecondes
	difficulte:2, // 1=facile plus de temps, 2=moyen 1 seconde par mot restant ou 3=Difficile moitie moins de temps pour répondre
};
function recupererGet() {
	var resultat = {};
	if (location.search == "") return resultat;
	var ligne = location.search.substr(1);
	var donnees = ligne.split(/&/g);
	for (var i=0; i<donnees.length; i++) {
		var d = donnees[i].split(/=/g);
		if (d.length > 0) {
			var nom = d.shift();
			var val = d.join("=");
			resultat[nom] = val;
		}
	}
	return resultat;
}
function evtTouche(e) {
	for (var ch in tdd.choix) {
		var label = tdd.choix[ch].text().toUpperCase().charCodeAt(0);
		if (e.keyCode == label || e.keyCode == label+32) {
			tdd.choix[ch].trigger("click");
		}
	}
}
function affichageTdd() {
	var $resultat = $(document.createElement('div'))
		.addClass('tdd')
	;
	$(document.createElement('div'))
		.addClass('mot')
		.text("??????")
		.appendTo($resultat)
		.bind('transitionend', evtDelaiFini)
	;
	$resultat.append(affichageChoix());
	$resultat.append(affichageScore());
	return $resultat
}
function evtDelaiFini() {
	if (tdd.points >= tdd.but) return;
	if (tdd.difficulte > 2) tdd.points = 0;
	else tdd.points -= 1;
	// tdd.but++;
	$(".score").addClass("delai")
	majScore();
	majMot();
}
function piger(array) {
	var pos = Math.floor(Math.random()*array.length);
	return array[pos];
}
function affichageChoix(etiquette, classe) {
	$resultat = $(document.createElement("div")).addClass("choix")
	for (var ch in tdd.choix) {
		var $bouton = affichageBouton(tdd.choix[ch], ch);
		$resultat.append($bouton);
		tdd.choix[ch] = $bouton;
	}
	return $resultat;
}
function affichageBouton(etiquette, classe) {
	var $resultat = $(document.createElement('div'))
		.addClass(classe)
		.html(etiquette)
		.click(evtClic)
	;
	return $resultat;
}
function affichageScore() {
	var $resultat = $('<div class="score"><span class="points">'+tdd.points+'</span>/<span class="but">'+tdd.but+'</span></div>');
	return $resultat;
}
function evtClic(e) {
	var $this = $(this);
	var classe = $this.attr("class");
	valider(classe);
	majScore();
	if (!verifierVictoire()) {
		majMot();
	}
}
function verifierVictoire() {
	if (tdd.points < tdd.but) return false;
	$(".tdd").html('<div class="bravo">Bravo!</div>');
	return true;
}
function majScore() {
	$("span.points").html(tdd.points);
	$("span.but").html(tdd.but);
}
function redemarrerChrono() {
	duration = tdd.but-tdd.points;
	if (tdd.difficulte == 1) duration++;
	else if (tdd.difficulte >= 3) duration *= 1.5-((tdd.difficulte-1)/(tdd.difficulte)) ;
	tdd.regleTransition.MozTransitionDuration = duration+"s";
	setTimeout(function(){$('div.mot').text(tdd.mot).addClass("on"); $("div.score").removeClass("correct erreur delai");}, tdd.pause);
}
