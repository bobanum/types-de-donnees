/*jslint browser:true, esnext:true*/

export default class Jigsaw {
	constructor() {
		
	}
	get dom() {
		if (!this._dom) {
			this.creerDom();
		}
		return this._dom;
	}
	creerDom() {
		var points = [
			"c", [150, -60], [400,-70], [400,0],
			"c", [0, 50], [-50,75], [-50,150],
			"c", [0, 150], [300,150], [300,0],
			"c", [0, -75], [-50,-100], [-50,-150],
			"c", [0, -70], [250,-60], [400,0],
			"l", [0, 300], [-1000, 0],
		];
		points = points.join(" ");
		console.log(points);
		var resultat = this.createElement("path", {d: "m 0,500 "+points+" z"});
		resultat.style.stroke = "red";
		this._dom = resultat;
		return resultat;
	}
	createElement(name, attributes = {}, parent = null) {
		var resultat = document.createElementNS("http://www.w3.org/2000/svg", name);
		if (parent) {
			parent.appendChild(resultat);
		}
		for (let aName in attributes) {
			resultat.setAttribute(aName, attributes[aName]);
		}
		return resultat;
	}
	static load() {
		return new Promise(resolve => {
			window.addEventListener("load", () => {
				resolve();					
			});
		});
	}
}