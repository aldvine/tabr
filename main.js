class TABR {

    constructor(debut, fin, tab) {
        this.debut = parseInt(debut);
        this.fin = parseInt(fin);

        //  Creation de l'abr
        this.abr = new ABR(parseInt(tab[0]));
        tab.splice(0, 1);
        tab.forEach(element => {
           this.abr.insertion(this.abr,parseInt(element));
        });
    }
}

class ABR {
    constructor(val) {
        this.val = val;
        this.sag = null;
        this.sad = null;
    }

    insertion(abr, val) {

        if (val < abr.val) {
      
            if (abr.sag === null)
                abr.sag = new ABR(val);
            else
                this.insertion(abr.sag, val);
        }

        else {
            // if sad is null insert node here
            if (abr.sad === null)
                abr.sad = new ABR(val);
            else

                this.insertion(abr.sad, val);
        }
    }


}
tabr = new TABR("1", "5", ["4", "3", "2"]);
console.log(tabr);

//Gère l'instance de la saisie par fichier
function fichier() {

    //Récupère le fichier
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