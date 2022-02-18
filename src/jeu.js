
let nbr_carte = [0,0,0,0,0,0,0,0,0,0,0,0]

class Equipe {
    constructor(){
        // ajout des cartes pour chaques équipes
        recharge_carte(this)
    }

}

function add_br(){
    var pCarte = document.getElementById("carte");
    var br = document.createElement("br");
    pCarte.appendChild(br)
}
function load(){
    const bel = new Equipe();
    const it = new Equipe();
    const hol = new Equipe();
    const all = new Equipe();
    
    var pCarte = document.getElementById("carte");
    var br = document.createElement("br");
    var itCarte = document.createTextNode("Equipe d'Italie : "+String(it.cartes[0])+" - "+String(it.cartes[1])+" - "+String(it.cartes[2])+" - "+String(it.cartes[3])+" - "+String(it.cartes[4]));
    pCarte.appendChild(itCarte)
    add_br()
    var holCarte = document.createTextNode("Equipe de Hollande : "+String(hol.cartes[0])+" - "+String(hol.cartes[1])+" - "+String(hol.cartes[2])+" - "+String(hol.cartes[3])+" - "+String(hol.cartes[4]));
    pCarte.appendChild(holCarte)
    add_br()
    var belCarte = document.createTextNode("Equipe de Belgique : "+String(bel.cartes[0])+" - "+String(bel.cartes[1])+" - "+String(bel.cartes[2])+" - "+String(bel.cartes[3])+" - "+String(bel.cartes[4]));
    pCarte.appendChild(belCarte)
    add_br()
    var allCarte = document.createTextNode("Equipe d'Allemagne : "+String(all.cartes[0])+" - "+String(all.cartes[1])+" - "+String(all.cartes[2])+" - "+String(all.cartes[3])+" - "+String(all.cartes[4]));
    pCarte.appendChild(allCarte)
    add_br()
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