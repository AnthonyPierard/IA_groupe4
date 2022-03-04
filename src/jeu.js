
//sert a compter le nombre de carte seconde qu'il y a l'indice un étant pour la 
//carte 1, l'indice 2 la 2 ect.
let nbr_carte = [0,0,0,0,0,0,0,0,0,0,0,0]

//sert juste pour le premier tour de jeu
let tour = true
let current_equip
let id_current_coureur = 0
let next_coureur = 0

class Equipe {
    constructor(nom){
        // ajout des cartes pour chaques équipes
        recharge_carte(this)
        this.nom = nom
        this.coureurs = [new Coureur(),new Coureur(),new Coureur()]
    }


}

class Coureur {
    constructor(){
        this.position = 0
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
    let nEquip = document.createTextNode(first_nom + ":")
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

    let action = parseInt(document.getElementById("action").value)
    let cartes = all_equipe[current_equip].cartes

    if (cartes.includes(action)){
        all_equipe[current_equip].coureurs[id_current_coureur].position += action

        if (next_coureur==4 && id_current_coureur<3){
            id_current_coureur+=1
        }

        cartes.splice(cartes.indexOf(action),1)
        if (cartes.length==0){
            recharge_carte(all_equipe[current_equip])
        }
        if (current_equip==3){ current_equip= 0}
        else { current_equip+=1 }
        let name_next_equipe = all_equipe[current_equip].nom
        let new_label = document.createTextNode(name_next_equipe + ":")
        let laction = document.getElementById("label_action")
        let old_label = laction.childNodes
        laction.removeChild(old_label[1])
        laction.appendChild(new_label)
        affiche_carte()
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