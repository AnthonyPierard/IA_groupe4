
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


function add_br(){
    var pCarte = document.getElementById("carte");
    var br = document.createElement("br");
    pCarte.appendChild(br)
}

function load(){
    //partie initialisation des cartes//

    let pCarte = document.getElementById("carte");
    let itCarte = document.createTextNode("Equipe d'Italie : "+String(it.cartes[0])+" - "+String(it.cartes[1])+" - "+String(it.cartes[2])+" - "+String(it.cartes[3])+" - "+String(it.cartes[4]));
    pCarte.appendChild(itCarte)
    add_br()
    let holCarte = document.createTextNode("Equipe de Hollande : "+String(hol.cartes[0])+" - "+String(hol.cartes[1])+" - "+String(hol.cartes[2])+" - "+String(hol.cartes[3])+" - "+String(hol.cartes[4]));
    pCarte.appendChild(holCarte)
    add_br()
    let belCarte = document.createTextNode("Equipe de Belgique : "+String(bel.cartes[0])+" - "+String(bel.cartes[1])+" - "+String(bel.cartes[2])+" - "+String(bel.cartes[3])+" - "+String(bel.cartes[4]));
    pCarte.appendChild(belCarte)
    add_br()
    let allCarte = document.createTextNode("Equipe d'Allemagne : "+String(all.cartes[0])+" - "+String(all.cartes[1])+" - "+String(all.cartes[2])+" - "+String(all.cartes[3])+" - "+String(all.cartes[4]));
    pCarte.appendChild(allCarte)
    add_br()

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
    if (all_equipe[current_equip].cartes.includes(action)){
        all_equipe[current_equip].coureurs[id_current_coureur].position += action
        
        console.log(all_equipe[current_equip])
        if (next_coureur==4 && id_current_coureur<3){
            id_current_coureur+=1
        }
        if (current_equip==4){ current_equip= 0}
        else { current_equip+=1 }
        let name_next_equipe = all_equipe[current_equip].nom
        let new_label = document.createTextNode(name_next_equipe + ":")
        let laction = document.getElementById("label_action")
        let old_label = laction.childNodes
        console.log(old_label)
        laction.removeChild(old_label[1])
        laction.appendChild(new_label)

        //ensuite il faut retirer la carte
    
    }

}
