// variables globales
var TABR = new Array;
var Chaine_TABR;
var test_tab = new Array;

// classe case qui stocke l'abr, et l'intervale
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
// arbre binaire de recherche
class ABR {
    // constructeur de la classe
    constructor(val) {
        this.val = val;
        this.sag = null;
        this.sad = null;
    }
    // insetion d'une valeur dans l'arbre
    insertion(abr, val) {

        if (val <= abr.val) {

            if (abr.sag === null)
                abr.sag = new ABR(val);
            else
                this.insertion(abr.sag, val);
        } else {
            // if 
            if (abr.sad === null)
                abr.sad = new ABR(val);
            else

                this.insertion(abr.sad, val);
        }
    }
    // parcours prefixe dans une chaine
    prefixe_to_chaine(abr) {

        if (abr != null) {
            Chaine_TABR += abr.val + ":";
            this.prefixe_to_chaine(abr.sag);
            this.prefixe_to_chaine(abr.sad);
        }
    }
    // parcours infixe dans un tableau
    infixe_to_tab(abr) {
        if (abr != null) {

            this.infixe_to_tab(abr.sag);
            test_tab.push(abr.val);
            this.infixe_to_tab(abr.sad);
        }
    }
    // parcours infixe dans une chaine
    infixe_to_chaine(abr) {
        if (abr != null) {

            this.infixe_to_chaine(abr.sag);
            Chaine_TABR += abr.val + ":";
            this.infixe_to_chaine(abr.sad);
        }
    }
    prefixe_to_tab(abr) {
        if (abr != null) {
            test_tab.push(abr.val);
            this.infixe_to_tab(abr.sag);

            this.infixe_to_tab(abr.sad);
        }
    }
}
// affichage ou non du bouton lecture
window.onload = function () {
    document.getElementById("fichier").onchange = function () {
        document.getElementById("startFile").style.visibility = "visible";
    };
};

//Gère la saisie par fichier
function fichier() {
    clearResult();
    //Récupère le fichier
    var file = document.getElementById("fichier").files[0];
    if (!file) {
        return;
    }
    //Récupère les données du fichier
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
        // on verifie que la ligne est valide
        if (tabABR.length > 1) {
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
        }
    });
    // affichage de l'objet dans la console de debuggage 
    // sur navigateur F12 --> onglet console
    console.log("TABR", TABR);
    setResult(texte);
}

// creation de la chaine à inserer dans le fichier
function creation_chaine() {

    Chaine_TABR = TABR[0].debut + ":" + TABR[0].fin + ";" // premier remplissage 
    TABR.forEach(function (element, index) {

        Chaine_TABR += element.debut + ":" + element.fin + ";" // cette ligne est ignoré 
        element.abr.prefixe_to_chaine(element.abr);
        Chaine_TABR = Chaine_TABR.substring(Chaine_TABR.length - 1, 1); // retrait du dernier ":"
        Chaine_TABR += "\n";
    });
    // correction d'un bug aleatoire qui ecrit un caractère en debut de chaine dans certains cas
    if (isNaN(parseInt(Chaine_TABR[0]))) {
        Chaine_TABR = Chaine_TABR.substring(1);
    }
}
// transforme l'objet TABR vers une chaine à écrire dans un fichier
function TABR_to_file() {

    clearResult();
    if (TABR.length > 0) {
        // verifie si le TABR est correct avant tout traitement
        if (verification() == 1) {
            var nomFichier = document.getElementById("nomFichier").value;
            creation_chaine();
            setResult(Chaine_TABR);
            if (nomFichier) {
                //On récupère les données dans résultats
                var resultat = document.getElementById("resultat").textContent;
                //On créer un objet blob contenant le résultat
                var blob = new Blob([resultat], {
                    type: 'plain/text',
                    endings: 'native'
                });
                //On sauvegarde le résultat dans un fichier selon le nom saisi dans le formulaire
                saveAs(blob, nomFichier + ".txt");
            } else {
                clearResult();
                setResult("Pas de nom de fichier");
            }
        } else {
            setResult("ERREUR: le TABR n'est pas correct");
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
        // pour toutes les cases du TABR
        TABR.forEach(function (element, index) {

            // verification si l'intervalle est correct
            if (element.debut > element.fin) {
                setResult("Erreur à la ligne " + (index + 1) + " : debut>fin ");
                error = true;
            }

            // console.log(index);
            // pour les cases suivant la première
            if (index != 0) {
                // console.log(TABR[index - 1].fin);
                // on vérifie si les intervalles ne se chevauche pas et s'ils sont dans l'ordre croissant
                if (TABR[index - 1].fin == element.debut) {
                    setResult("Erreur à la ligne " + (index + 1) + " : deux intervalles ne peuvent se chevauchés");
                    error = true;
                } else if (TABR[index - 1].fin > element.debut) {
                    setResult("Erreur à la ligne " + (index + 1) + " : le TABR n'es pas ordonné par ordre croissant");
                    error = true;
                }
            }

            // vérification des ABRs , un parcours infixe permet de construire un tableau trié par ordre croissant
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
            // on verifie que les valeurs qui sont dans l'abr font partie de l'intervalle,
            //    il suffit de vérifier le premier et dernier element du tableau trié
            if (!abr_error) {
                // console.log(test_tab[0] + '<' + element.debut + "||" + test_tab[test_tab.length - 1] + ">" + element.fin)
                if (test_tab[0] < element.debut || test_tab[test_tab.length - 1] > element.fin) {
                    setResult("Erreur à la ligne " + (index + 1) + " : une valeur n'est pas placé dans le bon intervale");
                    error = true;
                }
            }

        });
    }
    // si pas d'erreur le tableau est bien rempli.
    if (!error) {
        setResult("le TABR est bien rempli");
        return 1;
    } else {
        return 0;
    }
}

//Permet l'insertion d'un entier rentré par l'utilisateur dans le TABR
function insertion_entier() {
    //On récupère l'entier

    var entier = document.getElementById("entier").value;
    entier = parseInt(entier);
    //On vérifie si la saisie est un entier
    if (isNaN(entier)) {
        setResult("Erreur saisie entier");
    } else {
        // on verifie si le TABR est correct sinon, ça ne sert à rien d'aller plus loin
        if (verification() == 1) {
            clearResult();
            //Si l'entier se situe avant le debut du premier interval
            //  ou apres la fin du dernier intervalle,
            //  l'algo s'arrete directement donc au mieux --> O(1)
            if (entier < TABR[0].debut || entier > TABR[TABR.length - 1].fin) {
                setResult("L'entier ne peut pas être inséré car il n'entre dans aucun des intervalles");

            } else {
                let index = 0;
                let fin = false;
                //on test chaque intervale jusqu'a trouvé un ou l'on peut inserer l'entier
                do {
                    // console.log(index); // compte le nombre de parcours
                    // on vérifie qu'il fait partie de l'intervale de la case 
                    if (entier >= TABR[index].debut && entier <= TABR[index].fin) {
                        //Si l'entier appartient à un intervalle, on utilise la fonction, insertion de la classe ABR
                        TABR[index].abr.insertion(TABR[index].abr, entier);
                        // console.log(TABR);
                        setResult("Entier inséré");
                        // creation de la nouvelle chaine du TABR et affichage de celle-ci dans le bloc resultat
                        creation_chaine();
                        setResult(Chaine_TABR);
                        fin = true;
                    }
                    index++;
                } while (index != TABR.length && !fin);
                // erreur, pas d'intervalle disponible
                if (!fin) {
                    setResult("Aucun intervalle ne peut contenir l'entier saisi");
                }
            }
        } else {
            clearResult();
            setResult("Impossible d'inserer la valeur, le TABR n'est pas correct");
        }
    }
    console.log(TABR);
}


//Permet la suppression d'un entier (A faire)
function suppression_entier() {
    //On récupère l'entier

    var entier = document.getElementById("entier2").value;
    entier = parseInt(entier);
    //On vérifie si la saisie est un entier
    if (isNaN(entier)) {
        setResult("Erreur saisie entier");
    } else {
        // on verifie si le TABR est correct sinon, ça en sert à rien d'aller plus loin
        if (verification() == 1) {
            clearResult();


            //Si l'entier se situe avant le debut du premier interval
            //  ou apres la fin du dernier intervalle,
            //  l'algo s'arrete directement donc au mieux --> O(1)
            if (entier < TABR[0].debut || entier > TABR[TABR.length - 1].fin) {
                setResult("L'entier ne peut pas être supprimé car il ne fait partie d'aucun des intervalles");

            } else {
                let index = 0;
                let fin = false;
                //On vérifie pour chaque intervalle si on peut insérer l'entier
                do {
                    // console.log(index); // compte le nombre de parcours
                    // on vérifie qu'il fait partie de l'intervale de la case 
                    if (entier >= TABR[index].debut && entier <= TABR[index].fin) {
                        //Si l'entier appartient à un intervalle, on utilise la fonction, insertion de la classe abr
                        TABR[index].abr.insertion(TABR[index].abr, entier);
                        // console.log(TABR);
                        setResult("Entier inséré");
                        creation_chaine();
                        setResult(Chaine_TABR);
                        fin = true;
                    }
                    index++;
                } while (index != TABR.length && !fin);
                if (index >= TABR.length) {
                    setResult("Aucun intervalle ne peut contenir l'entier saisi");
                }
            }
        } else {
            clearResult();
            setResult("Impossible de supprimer la valeur, le TABR n'est pas correct");
        }
    }
    console.log(TABR);
}
// permet de fusionner deux cases du TABR 
function fusion_TABR() {
    //On récupère l'indice saisie

    var indice = document.getElementById("indice").value;

    // on applique -1 pour faire commencer l'index à 0
    indice = parseInt(indice - 1);
    //On vérifie si la saisie est un entier
    if (isNaN(indice)) {
        setResult("Erreur saisie entier");
    } else {
        // on verifie si le TABR est correct sinon, ça ne sert à rien d'aller plus loin
        if (verification() == 1) {
            clearResult();
            // on verifie que le TABR contient au moins 2 cases pour fusionner
            if (TABR.length < 2) {
                setResult("Erreur : Le TABR ne contient pas au moins 2 cases, fusion impossible");
            } else {
                // attention aux indices du tableau commençant à 0
                if (indice < 0 || indice > TABR.length - 2) {
                    setResult("ERREUR : L'indice saisi doit être au moins égale à 1 et inférieur à la taille du TABR : " + TABR.length);
                } else {
                    // fusion de deux cases
                    TABR[indice].fin = TABR[indice + 1].fin;

                    test_tab = new Array();
                    TABR[indice + 1].abr.prefixe_to_tab(TABR[indice + 1].abr);
                    TABR.splice(indice + 1, 1);
                    // insertion des élements de l'ABR indice i+1 dans l'ABR indice i
                    test_tab.forEach(element => {
                        TABR[indice].abr.insertion(TABR[indice].abr, element);
                    });
                    // affichage du résultat
                    setResult("Deux cases du TABR on été fusionné");
                    creation_chaine();
                    setResult(Chaine_TABR);
                    console.log(TABR); //affichage dans la console de debug
                }
            }
        } else {
            clearResult();
            setResult("Impossible de supprimer la valeur, le TABR n'est pas correct");
        }
    }

}

// Construction d'un ABR a partir d'un TABR Valide
function TABR_vers_ABR() {

    // on verifie si le TABR est correct sinon, ça ne sert à rien d'aller plus loin
    if (verification() == 1) {
        clearResult();

        // if (TABR.length < 1) {
        //     setResult("Erreur : Le TABR est vide");
        // } else {

        // si le tableau est de taille 1, il suffit de recuperer le seul ABR disponible --> O(1)
        if (TABR.length == 1) {
            arbre = TABR[0].abr;
        } else {
            test_tab = new Array();
            TABR.forEach(function (element, index) {
                element.abr.prefixe_to_tab(element.abr);
            });
            // ajout de la première valeur racine
            arbre = new ABR(test_tab[0]);
            // console.log("tab ",tab)
            test_tab.splice(0, 1); // supression de la premiere valeur du tableau
            // pour chaque valeur du tableau, on l'insere dans l'arbre
            test_tab.forEach(function (element) {
                arbre.insertion(arbre, element);
            });
            console.log(arbre); // affichage de l'arbre dans la console debug

        }

        // ********* affichage du resultats dans le bloc Resultat
        setResult("Création de l'ABR reussi !")
        // *********** affichage parcours prefixe 
        Chaine_TABR = "" + arbre.val;
        arbre.prefixe_to_chaine(arbre);
        Chaine_TABR = Chaine_TABR.substring(Chaine_TABR.length - 1, 1);
        // if (isNaN(parseInt(Chaine_TABR[0]))) {
        //     Chaine_TABR = Chaine_TABR.substring(1);
        // }
        setResult("Résultat parcours préfixe")
        setResult(Chaine_TABR);

        // *********** affichage parcours infixe
        Chaine_TABR = "" + arbre.val;
        // console.log(Chaine_TABR);

        // test_tab = new Array();
        arbre.infixe_to_chaine(arbre);
        Chaine_TABR = Chaine_TABR.substring(Chaine_TABR.length - 1, 1);

        setResult("Résultat parcours infixe")
        setResult(Chaine_TABR);
        // console.log(test_tab);
        // }
    } else {
        clearResult();
        setResult("Erreur : impossible de créer l'ABR, le TABR n'est pas correct");
    }
}


//Permet de clean l'affichage du résultat
function clearResult() {
    document.getElementById("resultat").innerHTML = "";
}

//Permet l'affichage du résultat
function setResult(texte) {
    document.getElementById("resultat").append(texte + "\n");
}