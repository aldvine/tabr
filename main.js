// ****** variables globales ********
var TABR = new Array;
var Chaine_TABR;
var test_tab = new Array;
var tamp_entier;
// ***********
// classe case qui stocke l'abr, et l'intervale
class Case {

    constructor(debut, fin, tab) {// temps O(n*P)
        this.debut = debut;
        this.fin = fin;

        // si c'est un arbre vide , instanciation obligatoire 
        //pour appeler les méthodes insertion, suppression, parcours ...
        if (tab[0].trim() == 'null') {
            this.abr = null;
        } else { // sinon on le rempli avec une premiere valeur

            this.abr = new ABR(parseInt(tab[0]));
        }
        // suppression de l'element inséré du tableau
        tab.splice(0, 1);
        // temps k*P où k est le nombre d'element à inserer et
        //  P la profondeur de l'arbre, la complexite de l'insertion au pire est O(P)
        //  donc O(k*p)
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
    // insertion adapté du cours car impossible de remplacer l'instance de l'objet
    //  par une autre directement
    // on peut remplacer uniquement ses valeurs

    insertion(abr, val) { // O(P) où P est la profondeur de l'abr

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
    // parcours prefixe dans une chaine, theta(n) où n= nombre de noeuds
    prefixe_to_chaine(abr) {

        if (abr != null) {
            Chaine_TABR += abr.val + ":";
            this.prefixe_to_chaine(abr.sag);
            this.prefixe_to_chaine(abr.sad);
        }
    }
    // parcours infixe dans un tableau, theta(n)
    infixe_to_tab(abr) {
        if (abr != null) {

            this.infixe_to_tab(abr.sag);
            test_tab.push(abr.val);
            this.infixe_to_tab(abr.sad);
        }
    }
    // parcours infixe dans une chaine, theta(n)
    infixe_to_chaine(abr) {
        if (abr != null) {

            this.infixe_to_chaine(abr.sag);
            Chaine_TABR += abr.val + ":";
            this.infixe_to_chaine(abr.sad);
        }
    }
    // theta(n) où n= nombre de noeuds
    prefixe_to_tab(abr) {
        if (abr != null) {
            test_tab.push(abr.val);
            this.infixe_to_tab(abr.sag);

            this.infixe_to_tab(abr.sad);
        }
    }
    // recherche de la valeur, O(n)
    rechercher(abr, entier) {
        if (abr != null) {
            if (entier == abr.val) {
                // trouvé
                return true;
            } else {
                if (entier < abr.val) {
                    return this.rechercher(abr.sag, entier);
                } else {
                    return this.rechercher(abr.sad, entier);
                }
            }
        } else {
            // pas trouvé
            return false;
        }
    }
    // supression d'une valeur : adapté du cours car impossible de remplacer l'instance de l'objet
    //  par une autre directement
    // on peut remplacer uniquement ses valeurs, on retourne la valeur de l'arbre .
    // retourn le nouvel abr.
    suppression(abr, entier) { // O(n)
        if (abr != null) {
            if (entier < abr.val) {
                // trouvé
                abr.sag = this.suppression(abr.sag, entier);
                return abr;
            } else {
                if (entier > abr.val) {
                    abr.sad = this.suppression(abr.sad, entier);
                    return abr;
                } else {
                    if (abr.sag == null) {

                        abr = abr.sad;
                        return abr;
                    } else {
                        if (abr.sad == null) {
                            abr = abr.sag;
                            return abr;
                        } else {
                            abr.sag = this.supprimax(abr.sag);
                            abr.val = tamp_entier;
                            return abr;
                        }

                    }
                }
            }
        }
    }
    // adptation de la fonction supprimax du cours (utile dans suppression)
    supprimax(abr) {
        if (abr.sad == null) {
            tamp_entier = abr.val;
            abr = abr.sag;
            return abr;
        } else {
            abr.sad = this.supprimax(abr.sad, entier);
            return abr
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
    var reader = new FileReader(); // temps constant
    var texte;

    reader.onload = function (e) {
        texte = e.target.result;
        createTABR(texte);
    };
    reader.readAsText(file);
}
// creer un TABR a partir d'une chaine O(x*(k*P))
function createTABR(texte) {
    let tabLigne;
    let tabDebFin;

    TABR = new Array; // remise à zero
    // console.log(texte);
    tabLigne = texte.split('\n'); // temps constant (js)
    // console.log("tabLigne", tabLigne);
    
    // temps  O(x*(k*P))
    // x --> le nombre de ligne du fichier à traité 
    // k --> le nombre d'element à inserer dans l'abr
    // P --> profondeur de l'ABR
    tabLigne.forEach(function (element, index) { 

        let tabABR = element.split(';'); // constant
        // on verifie que la ligne est valide
        if (tabABR.length > 1) {
            tabDebFin = tabABR[0].split(':');
            let debut = parseInt(tabDebFin[0]);
            let fin = parseInt(tabDebFin[1]);

            tabABR = tabABR[1].split(':');

            TABR.push(new Case(debut, fin, tabABR));
        }
    });
    // on verifie que le TABR est bien rempli sinon on le reinitialise
    //  car aucune autre action n'est possible si le TABR n'est pas correct.
    if (verification() == 1) {
        // affichage de l'objet dans la console de debuggage 
        // sur navigateur F12 --> onglet console
        clearResult();
        setResult("TABR bien rempli");
        console.log("TABR", TABR);
        setResult(texte);
    } else {
        TABR = new Array();
        setResult("Le TABR n'est pas correctement rempli");
    }

}

// fonction d'affichage
function affichage() {

    clearResult();
    creation_chaine();
    if (Chaine_TABR) {
        setResult(Chaine_TABR);
    } else {
        setResult("chaine vide");
    }

}
// creation de la chaine à inserer dans le fichier
// i --> taille du tableau TABR
// n --> nombre de noeud (parcours prefixe)
// complexite au pire --> O(i*n)
function creation_chaine() {

    Chaine_TABR = "";
    TABR.forEach(function (element, index) {

        Chaine_TABR += element.debut + ":" + element.fin + ";";
        // si l'abre est null on ajoute null comme valeur 
        if (TABR[index].abr == null) {
            Chaine_TABR += "null";
        } else { // sinon on ajoute le contenu d'un parcours infixe
            element.abr.prefixe_to_chaine(element.abr);
            Chaine_TABR = Chaine_TABR.substring(0, Chaine_TABR.length - 1); // retrait du dernier ":"
        }
        Chaine_TABR += "\n";
    });
    // correction d'un bug aleatoire qui ecrit un caractère en debut de chaine dans certains cas
    if (isNaN(parseInt(Chaine_TABR[0]))) {
        Chaine_TABR = Chaine_TABR.substring(1);
    }
}
// transforme l'objet TABR vers une chaine à écrire dans un fichier
function TABR_to_file() {

    // clearResult();
    if (TABR.length > 0) {
        // verifie si le TABR est correct avant tout traitement
        // if (verification() == 1) {
        clearResult();
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
        // } else {
        //     setResult("ERREUR: le TABR n'est pas correct");
        // }
    } else {
        clearResult();
        setResult("Erreur: le TABR est vide");
    }
}

// complexite à finir 
// fonction pour tester la validité du TABR
function verification() {

    clearResult();
    let error = false;
    if (TABR.length <= 0) {
        setResult("Erreur TABR vide");
        error = true;
    } else {
        // pour toutes les cases du TABR
        // complexité 
        // k --> nb de cases de TABR
        // n --> nombre de noeuds d'un abr
        // i --> nombre d'elements d'un abr à tester
        // complexite au pire --> verification des abr (k*)
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
            if (element.abr != null) {
                // infixe -> O(n)
                element.abr.infixe_to_tab(element.abr);
                // test de ABR 
                let i = 0;
                let abr_error = false;
                // O(i) --> i nombre de parcours de la boucle au pire
                do {
                    if (test_tab[i] > test_tab[i + 1]) {
                        error = true;
                        setResult("Erreur à la ligne " + (index + 1) + " : le TABR contient un ABR erroné");
                        abr_error = true;
                    } else if (isNaN(test_tab[i])) {
                        error = true;
                        setResult("Erreur à la ligne " + (index + 1) + " : le TABR contient un ABR avec une valeur qui n'est pas un entier");
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
            }
        });
    }
    // si pas d'erreur le tableau est bien rempli.
    if (!error) {
        setResult("le TABR est bien rempli");
        creation_chaine(); // comlpexite O(i*n)
        setResult(Chaine_TABR);
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
        
        clearResult();

        if (TABR.length < 1) {
            setResult("Erreur : Le TABR est vide");
        } else {
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
                        if (TABR[index].abr == null) {
                            TABR[index].abr = new ABR(entier);
                        } else {
                            TABR[index].abr.insertion(TABR[index].abr, entier);
                        }
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
        }
    
    }
    console.log("TABR", TABR);
}


//Permet la suppression d'un entier 
function suppression_entier() {
    //On récupère l'entier

    var entier = document.getElementById("entier2").value;
    entier = parseInt(entier);
    //On vérifie si la saisie est un entier
    if (isNaN(entier)) {
        setResult("Erreur saisie entier");
    } else {
        // on verifie si le TABR est correct sinon, ça en sert à rien d'aller plus loin
        

        clearResult();


        if (TABR.length < 1) {
            setResult("Erreur : Le TABR est vide");
        } else {
            //Si l'entier se situe avant le debut du premier interval
            //  ou apres la fin du dernier intervalle,
            //  l'algo s'arrete directement donc au mieux --> O(1)
            if (entier < TABR[0].debut || entier > TABR[TABR.length - 1].fin) {
                setResult("L'entier ne peut pas être supprimé car il ne fait partie d'aucun des intervalles");

            } else {
                let index = 0;
                let fin = false;
                //On vérifie pour chaque intervalle si on peut supprimé l'entier
                do {
                    // console.log(index); // compte le nombre de parcours
                    // on vérifie que l'entier à supprimer peut faire partie de l'intervale de la case 
                    if (entier >= TABR[index].debut && entier <= TABR[index].fin) {
                        // on test is l'entier est present dans l'abr
                        if (TABR[index].abr == null) {
                            setResult("L'entier ne peut pas être supprimé car il ne fait pas partie d'un ABR (ABR vide)");
                        } else {
                            let trouve = TABR[index].abr.rechercher(TABR[index].abr, entier);
                            // entier trouve
                            if (trouve) {
                                //Si l'entier appartient à un ABR, on utilise la fonction, supression de la classe abr

                                TABR[index].abr = TABR[index].abr.suppression(TABR[index].abr, entier);
                                // if(isNaN(TABR[index].abr.val)){
                                //     TABR[index].abr=null;
                                // }

                                setResult("L'entier entier " + entier + " a été supprimé");
                                // pour afficher le resultat
                                creation_chaine();
                                setResult(Chaine_TABR);

                            } else {
                                setResult("L'entier ne peut pas être supprimé car il ne fait pas partie d'un ABR");
                            }
                        }

                        fin = true;
                    }
                    index++;
                } while (index != TABR.length && !fin);
                if (index > TABR.length) {
                    setResult("Aucun intervalle ne contient l'entier saisi");
                }
            }
        }
     
    }
    console.log("TABR", TABR);
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
                if (TABR[indice + 1].abr != null) {
                    TABR[indice + 1].abr.prefixe_to_tab(TABR[indice + 1].abr);
                }
                TABR.splice(indice + 1, 1);
                // insertion des élements de l'ABR indice i+1 dans l'ABR indice i
                test_tab.forEach(element => {
                    if (TABR[indice].abr == null) {
                        TABR[indice].abr = new ABR(element);
                    } else {
                        TABR[indice].abr.insertion(TABR[indice].abr, element);
                    }
                });
                // affichage du résultat
                setResult("Deux cases du TABR on été fusionné");
                creation_chaine();
                setResult(Chaine_TABR);
                console.log("TABR", TABR); //affichage dans la console de debug
            }
        }
       
    }

}

// Construction d'un ABR a partir d'un TABR Valide
function TABR_vers_ABR() {

    // on verifie si le TABR est correct sinon, ça ne sert à rien d'aller plus loin

    clearResult();

    if (TABR.length < 1) {
        setResult("Erreur : Le TABR est vide");
    } else {

        // si le tableau est de taille 1, il suffit de recuperer le seul ABR disponible --> O(1)
        if (TABR.length == 1) {
            arbre = TABR[0].abr;
        } else {
            test_tab = new Array();
            TABR.forEach(function (element, index) {
                if (element.abr != null) {
                    element.abr.prefixe_to_tab(element.abr);
                }

            });

            // ajout de la première valeur racine
            arbre = new ABR(test_tab[0]);
            // console.log("tab ",tab)
            test_tab.splice(0, 1); // supression de la premiere valeur du tableau
            // pour chaque valeur du tableau, on l'insere dans l'arbre
            test_tab.forEach(function (element) {
                arbre.insertion(arbre, element);
            });

        }

        // ********* affichage du resultats dans le bloc Resultat
        setResult("Création de l'ABR reussi ! (F12 pour afficher la console pour + d'infos)")

        console.log("arbre", arbre); // affichage de l'arbre dans la console debug
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