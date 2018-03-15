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
    //Récupère les données du fichier
    var reader = new FileReader();
    var contents;
    reader.onload = function (e) {
        contents = e.target.result;
        console.log(contents);
        calcul(contents);
    };
    reader.readAsText(file);
}