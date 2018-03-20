// tabbleau d'ABR
var TABR = new Array;
var Chaine_TABR;
var test_tab = new Array;
class Case {
    constructor(debut, fin, tab) {
        this.debut = debut;
        this.fin = fin;

        this.abr = new ABR(parseInt(tab[0]));
        // console.log("tab ",tab)
        tab.splice(0, 1);
        tab.forEach(element => {
            this.abr.insertion(this.abr, parseInt(element));
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
        } else {
            // if sad is null insert node here
            if (abr.sad === null)
                abr.sad = new ABR(val);
            else

                this.insertion(abr.sad, val);
        }
    }
    prefixe_to_chaine(abr) {

        if (abr != null) {
            // if (abr.sag == null && abr.sad == null) {
            //     Chaine_TABR += abr.val;
            // } else {
            Chaine_TABR += abr.val + ":";
            // }

            this.prefixe_to_chaine(abr.sag);
            this.prefixe_to_chaine(abr.sad);
        }
    }
    infixe_to_tab(abr) {

        if (abr != null) {

            this.infixe_to_tab(abr.sag);
            test_tab.push(abr.val);
            this.infixe_to_tab(abr.sad);
        }
    }


}
// tabr = new Case("1", "5", ["4", "3", "2"]);
// console.log(tabr);

window.onload = function () {

    document.getElementById("fichier").onchange = function () {
        document.getElementById("startFile").style.visibility = "visible";

    };

};




//Gère l'instance de la saisie par fichier
function fichier() {
    clearResult();
    //Récupère le fichier
    var file = document.getElementById("fichier").files[0];
    if (!file) {
        return;
    }
    //R�cup�re les donn�es du fichier
    var reader = new FileReader();
    var texte;

    reader.onload = function (e) {
        texte = e.target.result;
        createTABR(texte);
    };
    reader.readAsText(file);
}
// creer un TABR a partir d'une chaine
function createTABR(texte) {
    let tabLigne;
    let tabDebFin;

    TABR = new Array; // remise à zero
    // console.log(texte);
    tabLigne = texte.split('\n');
    // console.log("tabLigne", tabLigne);
    tabLigne.forEach(function (element, index) {

        let tabABR = element.split(';');
	
        tabDebFin = tabABR[0].split(':');
        let debut = parseInt(tabDebFin[0]);
        let fin = parseInt(tabDebFin[1]);
        tabABR = tabABR[1].split(':');


        // ************* verification avant d'inserer non nécessaire ********//
        // if (debut > fin) {
        //     setResult("Erreur, la ligne " + (index + 1) + " du fichier n'as pas été traité : debut>fin ");

        // } else if (TABR.length > 0) {

        //     if (TABR[TABR.length - 1].fin >= debut) {
        //         setResult("Erreur, la ligne " + (index + 1) + " du fichier n'as pas été traité : deux intervalles ne peuvent se chevauchés");
        //     } else {
        //         TABR.push(new Case(debut, fin, tabABR));
        //     }
        //     // console.log("TABR", TABR);

        // } else {
        //     TABR.push(new Case(debut, fin, tabABR));
        //     // setResult("test");
        // }

        TABR.push(new Case(debut, fin, tabABR));

    });

    console.log("TABR", TABR);
    setResult(texte);
}

function creation_chaine(TABR) {
    Chaine_TABR = TABR[0].debut + ":" + TABR[0].fin + ";" // premier remplissage sinon bug bizarre à vérifier
    TABR.forEach(function (element, index) {
        Chaine_TABR += element.debut + ":" + element.fin + ";"
        element.abr.prefixe_to_chaine(element.abr);
        Chaine_TABR = Chaine_TABR.substring(Chaine_TABR.length - 1, 1); // retrait du dernier ":"
        Chaine_TABR += "\n";
    });
}

function TABR_to_file() {
    if (TABR.length > 0) {
        var nomFichier = document.getElementById("nomFichier").value;

        creation_chaine(TABR);
        if (nomFichier) {
            //On récupère les données dans résultats
            var resultat = document.getElementById("resultat").textContent;
            //On créer un objet blob contenant le résultat
            var blob = new Blob([resultat], {
                type: 'plain/text',
                endings: 'native'
            });
            //On sauvegarde le résultat dans selon le nom saisi dans le formulaire
            saveAs(blob, nomFichier + ".txt");
            clearResult();
            setResult(Chaine_TABR);
        } else {
            clearResult();
            setResult("Pas de nom de fichier");
        }
    } else {
        clearResult();
        setResult("Erreur: le TABR est vide");
    }
}
// fonction pour tester la validité du TABR
function verification() {

    clearResult();
    let error = false;
    if (TABR.length <= 0) {
        setResult("Erreur TABR vide");
        error = true;
    } else {
        TABR.forEach(function (element, index) {

            if (element.debut > element.fin) {
                setResult("Erreur à la ligne " + (index + 1) + " : debut>fin ");
                error = true;
            }
			console.log(index);
			if(index !=0){
				console.log(TABR[index - 1].fin);
				if (TABR[index - 1].fin == element.debut) {
					setResult("Erreur à la ligne " + (index + 1) + " : deux intervalles ne peuvent se chevauchés");
					error = true;
				} else if (TABR[index - 1].fin > element.debut) {
					setResult("Erreur à la ligne " + (index + 1) + " : le TABR n'es pas ordonné par ordre croissant");
					error = true;
				}
			}
            test_tab = new Array;
            // console.log(test_tab);
            element.abr.infixe_to_tab(element.abr);
            // test de ABR 
            let i = 0;
            let abr_error = false;
            do {
                if (test_tab[i] > test_tab[i + 1]) {
                    error = true;
                    setResult("Erreur à la ligne " + (index + 1) + " : le TABR contient un ABR erroné");
                    abr_error = true;
                }
                i++;
            } while (i < test_tab.length && !abr_error);
            if (!abr_error) {
                // console.log(test_tab[0] + '<' + element.debut + "||" + test_tab[test_tab.length - 1] + ">" + element.fin)
                if (test_tab[0] < element.debut || test_tab[test_tab.length - 1] > element.fin) {
                    setResult("Erreur à la ligne " + (index + 1) + " : une valeur n'est pas placé dans le bon intervale");
                    error = true;
                }
            }

        });
    }
    if (!error) {

        setResult("le TABR est bien rempli");
		return 1;
    } else {
		return 0;
	}
}

//Permet l'insertion d'un entier rentré par l'utilisateur dans le TABR
function insertion_entier(){
	clearResult();
	//On récupère l'entier
	var entier = document.getElementById("entier").value;
	entier = parseInt(entier);
	//On vérifie si la saisie est un entier
	if(isNaN(entier)){
		setResult("Erreur saisie entier");
	} else {
		let index = 0;
		let error = false;
		//On vérifie pour chaque intervalle si on peut insérer l'entier
		do{
			if(entier>= TABR[index].debut && entier <= TABR[index].fin){
				//Si l'entier appartient à un intervalle, on utilise la fonction, insertion de la classe abr
				TABR[index].abr.insertion(TABR[index].abr,entier);
				console.log(TABR);
				setResult("Entier inséré");
			} else {
				//Si l'entier se situe entre deux intervalles alors il y a une erreur
				if(entier > TABR[index].fin && entier < TABR[index+1].debut){
					setResult("L'entier ne peut pas être inséré car il n'entre dans aucun des intervalles");
					error = true;
				}
			}
			index++;
		}while(index!=TABR.length && !error);
	}
}
//Permet de clean l'affichage du r�sultat
function clearResult() {
    document.getElementById("resultat").innerHTML = "";
}

//Permet l'affichage du r�sultat
function setResult(texte) {
    document.getElementById("resultat").append(texte + "\n");
}