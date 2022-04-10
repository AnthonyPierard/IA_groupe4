
//sert a compter le nombre de carte seconde qu'il y a l'indice un étant pour la 
//carte 1, l'indice 2 la 2 ect.
let nbr_carte = [0,0,0,0,0,0,0,0,0,0,0,0]

//sert juste pour le premier tour de jeu
let premier_tour = true
let round = 1
let current_equip
let id_current_coureur = 0

//sert pour les tours d'après
let current_coureur

class Equipe {
    constructor(nom){
        // ajout des cartes pour chaques équipes
        recharge_carte(this)
        this.nom = nom
        this.coureurs = [new Coureur(1,this.nom),new Coureur(2,this.nom),new Coureur(3,this.nom)]
    }
}

class Coureur {
    constructor(numero,equipe){
        this.position = 0
        this.numero = numero
        this.equipe = equipe
    }
}

class Case {
    constructor(numero, chance){
        this.numero = numero
        this.chance = chance
    }
}


//Création de la map
let map = []
for (let i=0; i<10;i++){
    let chance = Math.random()
    let case_chance
    if (chance>0.9) {case_chance = true}
    else {case_chance = false}
    map[i] = new Case(i,case_chance)
}

//Initialisation des équipes
const bel = new Equipe("Belgique");
const it = new Equipe("Italie");
const hol = new Equipe("Hollande");
const all = new Equipe("Allemagne");
const all_equipe = [bel,it,hol,all]

//Initialisation des coureurs
function initialize_coureur(all_coureur){
    for (const equipe of all_equipe){
        for (const coureur of equipe.coureurs){
            all_coureur.push(coureur)
        }
    }
}
let all_coureur = []
initialize_coureur(all_coureur)

//Ajoute un br
function add_br(pCarte){
    var br = document.createElement("br");
    pCarte.appendChild(br)
}

function load(){
    //partie initialisation des cartes//

    affiche_carte()

    //partie initialisation de l'entrée des actions//
    let laction = document.getElementById("label_action")
    let first_card = bel.cartes[ bel.cartes.length - 1]
    let first_nom = bel.nom
    let first_equipe = bel
    for (const equip of all_equipe) {
        if (equip.cartes[equip.cartes.length - 1] > first_card){
            first_card = equip.cartes[equip.cartes.length - 1]
            first_nom = equip.nom
            first_equipe = equip
        }
    }
    let nEquip = document.createTextNode(first_nom + " coureur 1 :")
    laction.appendChild(nEquip)
    current_equip = all_equipe.indexOf(first_equipe)
}

/**
 * Recharge les cartes de l'équipe passer en paramètre
 * 
 * @class 
 * @see Equipe
 * @param {Equipe} equipe l'équipe qui a besoin de nouvelle carte
 * @return {list} cartes les 5 cartes secondes de l'équipe.
 */
function recharge_carte(equipe){
    equipe.cartes = [0,0,0,0,0]
    for (let i=0; i<5;i++){
        let ok = false
        while (ok==false){
            let carte = Math.floor(Math.random()*12) +1
            if (nbr_carte[carte-1]<8){
                nbr_carte[carte-1]+=1
                equipe.cartes[i] = carte
                ok = true
            }
        }
    }
    const by_value = (a,b) => a -b
    equipe.cartes.sort(by_value)
}

function action(){

    //On prends la valeur de l'input
    let action = parseInt(document.getElementById("action").value)
    let cartes = all_equipe[current_equip].cartes
    //si c'est le premier tour c'est comme ça que ça fonctionne
    if (premier_tour==true) {
        //on vérifie si la valeur est bien dans les cartes de l'équipe actuelle
        if (cartes.includes(action)){
            //On avance la position du coureur
            all_equipe[current_equip].coureurs[id_current_coureur].position += action
            
            cartes.splice(cartes.indexOf(action),1)
            if (cartes.length==0){
                recharge_carte(all_equipe[current_equip])
            }
            //On prends le prochain coureur si on arrive a la prochaine équipe
            //et on remet la premiere équipe a jouer
            if (current_equip==3){ current_equip= 0 }
            //sinon on passe a la prochaine
            else{ current_equip+=1 }
            //tout les 4 rounds on change de coureur
            if(round%4==0){ id_current_coureur ++ }
            //on passe au round suivant
            //si nous somme au round 12 alors c'est la fin du premier tour
            if(round==12){
                premier_tour = false
                round = 1
                console.log(all_coureur)
                //on affiche le prochain coureur a passer
                let max_position = 0
                //On selectionne le coureur qui est le plus à l'avant de la course
                all_coureur.forEach(function(coureur){
                    if (coureur.position>max_position){
                        max_position = coureur.position
                        current_coureur = coureur
                    }
                })
                var name_next_equipe = current_coureur.equipe 
                id_current_coureur = current_coureur.numero -1

            }
            else {
                var name_next_equipe = all_equipe[current_equip].nom
            }
            //on passe au round suivant
            round ++
            let laction = document.getElementById("label_action")
            let new_label = document.createTextNode(name_next_equipe + " coureur " + (id_current_coureur+1) + ":")
            let old_label = laction.childNodes
            laction.removeChild(old_label[1])
            laction.appendChild(new_label)

            affiche_carte()
            displayAnswer()

        }

    }
    else{
        //On n'est plus dans le premier tour donc c'est au tour du coureur le plus
        //loin de commencer ect.
        console.log("hello")
        

        let max_position = 0
        //On selectionne le coureur qui est le plus à l'avant de la course
        all_coureur.forEach(function(coureur){
            if (coureur.position>max_position){
                max_position = coureur.position
                current_coureur = coureur
            }
        })


    }

}

function affiche_carte(){
    let pCarte = document.getElementById("carte");
    
    while (pCarte.firstChild) {
        pCarte.removeChild(pCarte.firstChild)
    }
    let br = document.createElement("br");
    let itText = "Equipe d'Italie :" + String(it.cartes[0] + " ")
    for (i=1; i<it.cartes.length;i++){
        itText += ' - '
        itText += it.cartes[i]
    }
    let itCarte = document.createTextNode(itText)
    pCarte.appendChild(itCarte)
    pCarte.appendChild(br)
    let holText = "Equipe de Hollande : " + String(hol.cartes[0])
    for (i=1; i<hol.cartes.length;i++){
        holText += ' - '
        holText += hol.cartes[i]
    }
    let holCarte = document.createTextNode(holText);
    pCarte.appendChild(holCarte)
    let br2 = document.createElement("br");
    pCarte.appendChild(br2)
    let belText = "Equipe de Belgique : " + String(bel.cartes[0])
    for (i=1; i<bel.cartes.length;i++){
        belText += ' - '
        belText += bel.cartes[i]
    }
    let belCarte = document.createTextNode(belText)
    pCarte.appendChild(belCarte)
    let br3 = document.createElement("br");
    pCarte.appendChild(br3)
    let allText = "Equipe d'Allemagne : " + String(all.cartes[0])
    for (i=1; i<all.cartes.length;i++){
        allText += ' - '
        allText += all.cartes[i]
    }
    let allCarte = document.createTextNode(allText)
    pCarte.appendChild(allCarte)
}


function displayAnswer(){
    let bot = document.getElementById("jac-bot");
    bot.appendChild(PrologSession.get_response());
}




