window.onload = function () {

    document.getElementById("fichier").onchange = function () {
        document.getElementById("startFile").style.visibility = "visible";

    };

};

function fichier() {
	clearResult();
    //R�cup�re le fichier
    var file = document.getElementById("fichier").files[0];
    if (!file) {
        return;
    }
    //R�cup�re les donn�es du fichier
    var reader = new FileReader();
    var texte;
    var tabLigne;
	var tabDebFin;
    var tabTABR;
    var tabABR;
    reader.onload = function (e) {
        texte = e.target.result;
		console.log(texte);
		tabLigne = texte.split('\n');
		console.log(tabLigne);
		for (let index1 = 0; index1 < tabLigne.length; index1++) {

            tabABR = tabLigne[index1].split(';');
			console.log(tabABR);
			tabDebFin = tabABR[0].split(':');
			console.log(tabDebFin);
			//tabTABR[index1] = new TABR(tabDebFin[0],tabDebFin[1],tabABR[1]);
        }

		setResult(texte);
    };
    reader.readAsText(file);
}

//Permet de clean l'affichage du r�sultat
function clearResult() {
    document.getElementById("resultat").innerHTML = "";
}

//Permet l'affichage du r�sultat
function setResult(texte) {
    document.getElementById("resultat").append(texte + "\n");
}