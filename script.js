/*
TODO:Choix de langue
TODO:Difficulté
TODO:Ajouter des mots pas rapport
*/
$(function(){
	tdd.get = recupererGet();
	if (tdd.get.jeu == 'trouvertype') trouvertype();
	else if (tdd.get.jeu == 'bonmauvais') bonmauvais();
});
function bonmauvais() {
	tdd.langue = 1;	// 1=fr; 2=en; 3=les deux
	tdd.ratioBonMauvais = 1; // Autant de bons que de mauvais
	var get = recupererGet();
	if (get.difficulte && !isNaN(get.difficulte)) tdd.difficulte = parseInt(get.difficulte);
	if (get.langue && !isNaN(get.langue)) tdd.langue = get.langue;
	tdd.regleTransition = window.document.styleSheets[0].cssRules[0].style;
	tdd.choix = {bon:'Bon', mauvais:'Mauvais'}
	tdd.bon = [];
	if (tdd.langue & 1) tdd.bon = tdd.bon.concat(['Entier', 'Réel', 'Booléen', 'Chaîne', 'Tableau', 'Fonction', 'Objet']);
	if (tdd.langue & 2) tdd.bon = tdd.bon.concat(['Integer', 'Float', 'Boolean', 'String', 'Array', 'Function', 'Object']);
	tdd.mauvais = [];
	if (tdd.langue & 1) tdd.mauvais = tdd.mauvais.concat(['Date', 'Code Postal', 'Nom', 'Fichier', 'Variable', 'Alphabet', 'Personne', 'Base', 'Concaténation', 'Boucle', 'Mot de passe', 'Alternative', 'Propriété', 'Instruction']);
	if (tdd.langue & 2) tdd.mauvais = tdd.mauvais.concat(['Date', 'Postal Code', 'Name', 'File', 'Variable', 'Alphabet', 'Person', 'Base', 'Concatenation', 'Loop', 'Password', 'Alternative', 'Property', 'Instruction']);

	$(document.body).html('<h1><a href="index.htm">Dénichez les types de données</a></h1>');
	$(document.body).append(affichageTdd());
	$(window).bind("keydown", evtTouche)
	majMot = function() {
		do {
			tdd.reponse = (Math.random()*(1+tdd.ratioBonMauvais) < 1) ? "bon" : "mauvais";
			mot = piger(tdd[tdd.reponse]);
		} while (mot == tdd.mot);
		$('div.mot').text("??????").removeClass("on");
		tdd.mot = mot;

		redemarrerChrono();
		return mot;
	}
	valider = function(classe) {
		if (classe=="bon" && tdd.reponse=="bon") {
			//On augmente les points
			tdd.points++;
			$(".score").addClass("correct")
		} else if (tdd.reponse=="bon" || classe=="bon") {
			//On reset les points et augmente le but
			tdd.points = 0;
			if (tdd.difficulte > 1) tdd.but++;
			$(".score").addClass("erreur")
		} else {
			// On passe à un autre mot
		}
	}
	majMot();
}
function trouvertype() {
	tdd.langue = 1;	// 1=fr; 2=en; 3=les deux
	tdd.ratioBonMauvais = 1; // Autant de bons que de mauvais
	var get = tdd.get;
	if (get.difficulte && !isNaN(get.difficulte)) tdd.difficulte = parseInt(get.difficulte);
	if (get.langue && !isNaN(get.langue)) tdd.langue = get.langue;
	tdd.regleTransition = window.document.styleSheets[0].cssRules[0].style;
	tdd.choix = {entier:'Entier', reel:'Réel', booleen:'Booléen', chaine:'Chaîne', tableau:'Tableau', fonction:'Fonction', objet:'Objet'}
	tdd.choix = {entier:'Entier', reel:'Réel', booleen:'Booléen', chaine:'Chaîne'}
	tdd.bon = [];
	if (tdd.langue & 1) tdd.bon = tdd.bon.concat(['Entier', 'Réel', 'Booléen', 'Chaîne', 'Tableau', 'Fonction', 'Objet']);
	if (tdd.langue & 2) tdd.bon = tdd.bon.concat(['Integer', 'Float', 'Boolean', 'String', 'Array', 'Function', 'Object']);
	tdd.mauvais = [];
	if (tdd.langue & 1) tdd.mauvais = tdd.mauvais.concat(['Date', 'Code Postal', 'Nom', 'Fichier', 'Variable', 'Alphabet', 'Personne', 'Base', 'Concaténation', 'Boucle', 'Mot de passe', 'Alternative', 'Propriété', 'Instruction']);
	if (tdd.langue & 2) tdd.mauvais = tdd.mauvais.concat(['Date', 'Postal Code', 'Name', 'File', 'Variable', 'Alphabet', 'Person', 'Base', 'Concatenation', 'Loop', 'Password', 'Alternative', 'Property', 'Instruction']);

	$(document.body).html('<h1><a href="index.htm">Donnez le bon type de données</h1></a>');
	$(document.body).append(affichageTdd());
	$(window).bind("keydown", evtTouche)
	majMot = function() {
		do {
			tdd.reponse = piger(['booleen','chaine','entier','reel']);
			var mot = construire[tdd.reponse]();
		} while (mot == tdd.mot);
		$('div.mot').text("??????").removeClass("on");
		tdd.mot = mot;

		redemarrerChrono();
		return mot;
	}
	valider = function(classe) {
		debugger;if (classe==tdd.reponse) {
			//On augmente les points
			tdd.points++;
			$(".score").addClass("correct")
		} else {
			//On reset les points et augmente le but
			tdd.points -= 1;
			//tdd.but++;
			$(".score").addClass("erreur")
		}
	}
	majMot();
}
construire = {
	booleen:function() {	//Booleen
		return (Math.floor(Math.random()*2)==0) ? "true" : "false";
	},
	chaine:function() {	//Chaine
		var mots = ["à","à côté","à côté de","à droite","à gauche","à l’endroit","à l’envers","à moitié","abandonné","abeille","abîmé","abricot","absent","accident","accompagner","accoucher","accrocher","acheter","acrobate","adresse","adroit","adulte","aéroport","affaire","affiche","agacer","âge","agiter","agneau","aider","aigle","aiguille","ail","aile","aimer","aîné","air","ajouter","album","aliment","aller","aller bien","allumer","allumette","alphabet","ambulance","amener","ami","amour","ampoule","amusant","an","ananas","ancien","âne","angle","animal","animaux","année","anniversaire","anorak","appareil","appartement","appeler","appétit","apporter","appuyer","après","après-midi","aquarium","araignée","arbre","arc","arc-en-ciel","arête","argent","armoire","arracher","arrêt","arrière","arriver","arroser","arrosoir","ascenseur","aspirateur","assez","assiette","assis","attacher","attendre","attention","atterrir","attraper","attraper une maladie","au","au delà","au milieu","au milieu de","au-delà","au-dessous","au-dessous de","au-dessus","au-dessus de","aujourd’hui","autant","auto","autour","autour de","avaler","avancer","avant","avec","avion","bagage","bagarre","bague","baguette","baigner","bâiller","bain","baiser","balai","balançoire","balayer","balcon","baleine","balle","ballon","banane","banc","bande","bande dessinée","barbe","barboter","barbouillé","barque","barre","barreau","barrer","barrette","bas","bassin","bassine","bateau","bâton","battre","baver","bavoir","beau","beaucoup","bébé","bébés","bec","belle","bercer","bête","bêtes","bêtise","beurre","biberon","bibliothèque","bicyclette","bien","bientôt","bifteck","bijou","bille","billet","biscuit","bisou","bizarre","blanc","bleu","blond","bœuf","boire","bois","boisson","boîte","bol","bon","bonbon","bondir","bonhomme","bonnet","bord","bosse","bosser","botte","botte de foin","bottes","bouche","boucher","boucherie","bouchon","bouder","boue","bouée","bouger","bouillir","boulanger","boulangerie","boule","bouquet","bourgeon","bousculer","bout","bouteille","boutique","bouton","bracelet","branche","bras","bretelle","bricolage","briller","brosse","brouette","brouillard","bruit","brun","bûche","buisson","bulles","bureau","bus","cabane","cabinet","caché","cadeau","cadenas","cadre","café","cage","cage à écureuil","cagoule","cahier","caillou","caisse","calendrier","câlin","câliner","calme","camarade","caméscope","camion","camp","campagne","camper","canapé","canard","caniveau","canne","canne à pêche","caprice","car","caravane","caresse","caresser","carnet","carotte","carré","carreau","carrefour","cartable","carte d’appel","carton","casier","casque","casquette","cassé","casser","casserole","cassette","catalogue","cauchemar","cave","cédé","cédérom","ceinture","cerceau","céréale","cerf","cerf-volant","cerise","chaîne","chaise","chaises","chambre","champ","champignon","chance","changeant","changer","chanson","chanter","chapeau","charcuterie","charger","chariot","chasser","chasseur","chat","châtaigne","château","chaud","chauffer","chaussette","chausson","chaussure","chemin","cheminée","chemise","chêne","chenille","cher","chercher","cheval","cheveu","cheville","chèvre","chez","chien","chiffon","chiffre","chocolat","choisir","chose","chou","chouette","chuchoter","chute","ciel","cigarette","cigogne","cil","cimetière","cinéma","cinq","cirque","ciseaux","citron","citrouille","clair","classe","clé","clémentine","clignoter","clin d’œil","cloche","clocher","clou","clown","coccinelle","cochon","cochon d’Inde","cocotte","cœur","coffre","coffret","coiffeur","coin","col","colère","colis-route","collant","colle","coller","collier","colline","coloriage","colorier","commencer","comparer","compter","concombre","conduire","confiture","confortable","consoler","consommé","construire","conte","content","continuer","contraire","contre","copain","copier","coq","coquelicot","coquet","coquetier","coquillage","coquille","coquin","corbeau","corbeille","corde","corps","côté","cou","couché","coude","coudre","couette","couleur","couloir","coup","couper","cour","courir","courir après","couronne","courrier","course","court","cousin","cousine","coussin","couteau","coûter","couver","couvercle","couvert","couverture","crabe","cracher","craie","crapaud","cravate","crayon","crèche","crêpes","creuser","creux","crevette","cri","crier","crochet","crocodile","croix","croquer","croûte","cru","cruel","cube","cueillir","cuillère","cuire","cuisine","cuisiner","cuisinière","cuisse","cuit","culotte","curieux","cuvette","cygne","d’abord","dame","danger","dangereux","dans","danse","danser","dauphin","de","dé","déborder","debout","début","déchirer","décoller","décorer","découpage","découper","déçu","dedans","défendre","défiler","déguisement","déguiser","dehors","déjeuner","délicieux","demain","demander","démarrer","déménager","demi","démolir","dent","dentifrice","dentiste","départ","dépasser","déranger","dernier","derrière","descendre","désobéir","désordre","dessert","dessin","dessiner","détester","détruire","deux","deuxième","devant","devoir","dictionnaire","différence","différent","difficile","dimanche","dindon","dîner","dînette","dinosaure","dire","directeur","directrice","discuter","disparaître","distribuer","dix","docteur","doigt","doigts","domino","donner","donner à manger","dormir","dos","dossier","douche","doucher","douillet","doux","drap","drapeau","droit","drôle","du","dur","eau","écarter","échanger","écharpe","échasse","échasses","échelle","éclabousser","éclair","éclairer","éclater","école","écorce","écouter","écran","écraser","écrire","écriture","écureuil","effacer","effort","effrayé","égal","église","élastique","électrique","éléphant","élève","élever","embouteillage","emmener","empêcher","emporter","en argent","en avance","en bas","en bas de","en face","en haut","en haut de","en or","en rang","en retard","enceinte","encore","endive","endroit","énervé","enfant","enfermer","enfiler","enfoncer","engin","enlever","énorme","ensemble","entendre","enterrer","entier","entonnoir","entourer","entrée","entrer","enveloppe","envie","envoyer","épais","épaule","épée","épingle","éplucher","épluchure","éponge","équipe","escabeau","escalader","escalier","escargot","essayer","essence","essuyer","étagère","étaler","étang","été","éteindre","éternuer","étiquette","étoile","étroit","étude","étudier","évier","expliquer","extérieur","fabriquer","facile","facteur","faim","faire","faire beau","faire boire","faire peur","falloir","farce","farine","fatigue","faute","fauteuil","fée","femme","fenêtre","fer à repasser","ferme","fermer","fermier","fesse","fête","feu","feuille","feutre","fève","ficelle","fièvre","figure","fil","filet","fille","film","fils","fin","finir","flamme","flaque","flèche","fleur","fleuriste","flocon","flotter","foin","foire","fois","foncé","fond","fontaine","forêt","fort","fou","fouiller","four","fourchette","fourmi","fraise","framboise","frange","frapper","frein","frère","frite","froid","fromage","front","frotter","fruit","fumée","fumer","fusée","fusil","gagner","galette","galoper","gant","garage","garçon","garder","gardien","gare","garer","gâteau","gauche","géant","gelé","geler","gêner","genou","gens","gentil","girafe","glace","glaçon","glisser","gobelet","gomme","gonfler","gorge","gourde","gourmand","goût","goûter","goutte","gouttes","grain","graine","graines","grand","grandir","grand-mère","grand-parent","grand-père","gratter","grenouille","griffe","griffer","grignoter","griller","grimace","grimper","gris","gronder","gros","grotte","groupé","grue","guêpe","guéri","guérir","guetter","guirlande","gymnastique","habit","habiter","hamster","hanche","handicapé","haricot","haut","hélicoptère","herbe","hérisson","hésiter","heure","heure des mamans","heureux","hibou","hier","hippopotame","hirondelle","histoire","hiver","homme","hôpital","horloge","hôtel","huile","huit","humeur","humide","hurler","ici","idée","île","image","imiter","immense","immeuble","immobile","important","impossible","incendie","infirmier","infirmière","inonder","insecte","inséparable","instable","installer","instrument","intéressant","intérieur","intrus","invitation","inviter","jaloux","jamais","jambe","jambes","jambon","jardin","jardiner","jaune","jean","jeter","jeu","jeudi","jeune","joie","joli","jongler","jonquille","joue","jouer","jouet","jour","journaux","journée","joyeux","jumeau","jumelles","jupe","jus","kangourou","kiwi","là","lac","lacer","lacet","lâcher","laine","laisse","laisser","lait","lame","lampe","lancer","langue","lapin","large","larme","lavabo","lave-linge","laver","lécher","lecture","léger","légume","lent","lessive","lettre","lever","lèvres","lézard","ligne","linge","lion","liquide","lire","lisse","liste","lit","litre","livre","loin","loin de","long","louche","loup","loupe","lourd","luge","lumière","lundi","lune","lunettes","lutin","machine","madame","magasin","magazine","magicien","magie","magnétoscope","maigre","maillot","main","mains","maintenant","maison","maître","maîtresse","mal","malade","maladroit","maman","manche","manège","manger","manquer","manteau","maquillage","maquiller","marchand","marche","marcher","marcher à quatre pattes","marcher sur","mardi","mare","marguerite","mari","mariage","marin","marionnette","marron","marteau","masque","matelas","maternelle","matin","mauvais","méchant","médecin","médicament","meilleur","mélanger","melon","même","ménage","mensonge","menton","mer","mercredi","mère","mesurer","métal","mètre","mettre","mettre du temps","meuble","micro","midi","mie","miel","mieux","milieu","mince","mine","minuit","minute","mixer","modèle","moineau","moins","mois","moitié","moment","monde","monnaie","monsieur","montagne","monter","montre","montrer","monument","morceau","morceau de pain","mordre","mort","mot","moteur","moto","mouche","mouchoir","mouette","moufle","mouillé","mouiller","moule","moulin","mourir","mousse","moustache","moustique","mouton","moyen","muet","muguet","multicolore","mur","mûr","mur d’escalade","mûre","muscle","musique","nager","nain","naître","nappe","navet","navire","né","ne pas oublier","neige","neiger","nettoyer","neuf","nez","nid","Noël","nœud","noir","noisette","noix","nom","nombre","nourrir","nourriture","nouveau","noyau","nu","nuage","nuageux","nuit","numéro","obéir","objet","obliger","odeur","œil","œuf","offrir","ogre","oie","oignon","oiseau","ombre","ongle","or","orage","orange","orchestre","ordinateur","ordonnance","ordre","oreille","oreiller","os","oublier","ouragan","ours","outil","ouvrier","ouvrir","ouvrir un livre","page","paille","pain","paire","paix","palais","pâle","pamplemousse","panda","panier","panne","panneau","pansement","pantalon","panthère","papa","papier","papillon","pâquerette","paquet","parapluie","parasol","parc","parcours","pardon","pareil","parent","parfum","parking","parler","part","partager","partie","partir","pas","passage","passer","passerelle","patauger","pâte","pâte à modeler","pâtes","patient","pâtisserie","patte","payer","pays","paysage","peau","pêche","pêcheur","pédale","pédaler","peigne","peindre","peinture","pelle","peluche","pendule","penser","pente","percer","perdre","père","perle","perroquet","persil","personne","peser","petit","petit pois","petite-fille","petit-enfant","petit-fils","peu","peur","pharmacie","pharmacien","phoque","photo","photographier","pied","pieds","pierre","pigeon","pile","pilote","pin","pinceau","pion","pique-niquer","piquer","piqûre","piscine","placard","place","plafond","plage","plaire","planche","plante","planter","plat","plateau","plâtre","plein","pleurer","pleuvoir","pli","pliage","plier","plongeoir","plonger","pluie","plume","plus","pluvieux","pneu","poche","poêle","poignet","poing","point","pointe","pointu","poire","poireau","poison","poisson","poli","police","policier","pomme","pomme de terre","pompe","pompier","poney","pont","pont de singe","port","porte","portemanteau","porter","portière","poser","poste","poster","pot","potage","poubelle","pouce","pouf","poule","poulet","poupée","poursuivre","pousser","poussette","poussière","poussin","poutre d’équilibre","pouvoir","prairie","préau","préférer","premier","prendre","prénom","préparer","près","près de","présent","presque","presser","prêt","prêter","prince","princesse","prises","priver","prix","profond","promenade","promettre","propre","protéger","prudent","prune","puis","pull-over","punir","purée","puzzle","pyjama","quai","quartier","quatre","question","queue","raconter","radiateur","radio","radis","raisin","ramasser","ramer","rampe","ramper","rangée","ranger","râpe","râper","rapide","raquette","rasoir","rat","râteau","rater","rayon","rayure","recette","recevoir","réciter","recommencer","reconnaître","recoudre","récréation","reculer","réfrigérateur","refuser","regard","regarder","reine","remercier","remettre","remplacer","remplir","remuer","renard","rencontrer","rendre","rentrée","rentrer","renverser","réparer","repas","repasser","répéter","répondre","requin","respirer","ressembler","ressembler à","restaurant","rester","retard","retarder","retour","retourner","retrouver","réussir","réveil","revenir","rêver","revoir","rhinocéros","riche","rideau","rire","rivière","rivière des crocodiles","riz","robe","robinet","rocher","roi","rond","rondelle","ronfler","ronger","rosé","roue","rouge","roulade","rouleau","rouler","route","roux","ruban","rue","rugueux","s’abriter","s’accrocher","s’agiter","s’allonger","s’amuser","s’appeler","s’appuyer","s’arrêter","s’asseoir","s’échapper","s’écorcher","s’éloigner ","s’embrasser","s’endormir","s’ennuyer","s’envoler","s’excuser","s’habiller","s’imaginer","s’installer","s’occuper de","s’ouvrir","sable","sac","sac en plastique","sage","saigner","saison","salade","saladier","sale","salle","saluer","samedi","sang","santé","sapin","sardine","saut","sauter","savoir","savon","scie","se bagarrer","se baigner","se baisser","se balancer","se battre","se blesser","se blottir","se brûler","se cacher","se changer","se chausser","se cogner","se coiffer","se coucher","se couvrir","se croiser","se dégonfler","se déguiser","se dépêcher","se déshabiller","se détester","se disputer","se doucher","se fâcher","se faner","se garer","se gratter","se laver","se lever","se maquiller","se marier","se mettre debout","se moquer","se moucher","se mouiller","se noyer","se pencher","se percher","se perdre","se pincer","se plaindre","se poser","se presser","se promener","se protéger","se quitter","se rappeler","se raser","se réchauffer","se régaler","se reposer","se retourner","se réveiller","se salir","se sauver","se sécher","se serrer","se servir","se taire","se toucher","se tromper","se trouver","seau","sec","sécher","secouer","sel","semaine","semelle","sens","sentir","séparer","sept","sérieux","serpent","serré","serrer","serrure","serviette","servir","seul","shampoing","siège","sieste","siffler","sifflet","signe","silence","singe","six","ski","sœur","soif","soigner","soir","sol","soldat","sole","soleil","solide","sombre","sommeil","sommet","sonner","sonnette","sorcière","sortie","sortir","souffler","souffrir","souhaiter","soulever","souligner","soupe","souple","sourcil","sourd","sourire","souris","sous","souvent","spectacle","sport","square","squelette","stylo","sucer","sucre","suivant","suivre","sur","surprise","surveiller","table","tableau","tablier","tabouret","tache","taille","taille-crayon","tailler","talon","tambour","tampon","taper","taper sur","tapis","tard","tarte","tartine","tas","tasse","tâter","taupe","télécommande","téléphone","téléphoner","télévision","tempête","temps","tendre","tenir","tente","terminer","terrain","terre","terrible","terrier","tête","téter","thé","thermomètre","ticket","tige","tigre","timbre","tirer","tiroir","tissu","titre","toboggan","toilette","toit","tomate","tomber","tonnerre","torchon","tordu","tortue","tôt","toucher","toujours","tour","tourner","tournevis","tousser","tout de suite","tracteur","train","traîneau","traîner","traire","trait","trampoline","tranche","tranquille","transparent","transpirer","transporter","travail","travailler","travaux","traverser","trembler","tremper","trésor","tricher","tricot","tricoter","tricycle","trier","triste","trois","troisième","trompette","trop","trottoir","trou","trouer","trous","trousse","trouver","tube","tuer","tulipe","tunnel","tuyau","un","uniforme","univers","usé","usine","utile","vacances","vache","vague","vaisselle","valise","vase","vélo","vendre","vendredi","venir","vent","venter","ventre","ver","verre","vers","verser","vert","veste","vêtement","vétérinaire","viande","vide","vider","vieux","village","ville","vin","virage","vis","visage","visiter","vite","vitesse","vitre","vivant","vivre","voile","voir","voisin","voiture","voix","voler","volet","vouloir","voyage","voyager","w.-c.","wagon","xylophone","yaourt","yeux","zèbre","zéro","zigzag","zoo"];
		var mot = piger(mots);
		var exception = Math.floor(Math.random()*10);
		if (exception==0) mot = construire.booleen();
		if (exception==1) mot = construire.entier();
		if (exception==2) mot = construire.reel();
		var mot = (Math.floor(Math.random()*2)==0) ? '"'+mot+'"' : "'"+mot+"'";

		return mot;
	},
	entier:function() {	//Entier
		var reponse = Math.floor(Math.random()*10000);
		if (Math.floor(Math.random()*3)==0) reponse = -reponse;
		return reponse;
	},
	reel:function() {	//Entier
		var reponse = Math.floor(Math.random()*1000000);
		var nbDec = Math.floor(Math.random()*5)+1;
		var nbDec = Math.pow(10,nbDec);
		reponse = reponse / nbDec;
		if (Math.floor(Math.random()*3)==0) reponse = -reponse;
		return reponse;
	},
}
