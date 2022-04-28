
//sert a compter le nombre de carte seconde qu'il y a l'indice un étant pour la 
//carte 1, l'indice 2 la 2 ect.
let nbr_carte = [0,0,0,0,0,0,0,0,0,0,0,0]

//sert juste pour le premier tour de jeu

let round = 1
let nbTour = 0
let current_equip 
let id_current_coureur = 0
//Les points en plus ajouter pour les tours ajouter
let point_en_plus = 0
let premier_joueur_fini = false

//sert pour les tours d'après
let current_coureur 
let coureur_fall = []
class Equipe {
    constructor(nom,id){
        // ajout des cartes pour chaques équipes
        recharge_carte(this)
        //le nom de l'équipe
        this.nom = nom
        //son id dans la liste de toutes les équipes
        this.id = id
        //les 3 coureurs de l'équipe
        this.coureurs = [new Coureur(1,this.nom),new Coureur(2,this.nom),new Coureur(3,this.nom)]
        //les points de l'équipe
        this.point = 0
    }
}

class Coureur {
    constructor(numero,equipe){
        //La case ou est positionner le coureur
        this.position = new Case(0,0,false,false, 888, 888)
        //son numéro dans l'équipe, ça peut être donc soit 1, 2 ou 3
        this.numero = numero
        //le nom de l'équipe a laquel il appartient
        this.equipe = equipe
    }
}

//Voir si c'est plus pratique de faire une classe rangée contenant toutes
//les case d'une rangée pour plus tard

class Case {
    constructor(numero, position, chance, isUse,coord_x, coord_y){
        // l'avancement de la case 
        this.numero = numero
        // la position horizontale de la case 
        this.position = position
        // si la case est une case chance ou non
        this.chance = chance
        // si la case est une case finale ou non
        this.isUse = isUse
        this.coord_x = coord_x
        this.coord_y = coord_y
        // par exemple la case(2,2,True, false) est la deuxième rangée de case 
        //à la deuxième position (gauche ou milieu) qui est une case chance mais non finale
    }
}

//Création de la map
//Chaque sous tableau est une rangée de la carte contenant une ou plusieurs case.
//Quand il y a un "_" ça veut dire qu'il y a une séparation dans la rangée.
let map = [[new Case(1,1,false,false, 321, -72),new Case(1,2,false,false, 321, -60),new Case(1,3,false,false, 321, -48)],
            [new Case(2,1,false,false, 333, -72),new Case(2,2,false,false, 333, -60),new Case(2,3,false,false, 333, -48)],
            [new Case(3,1,false,false, 345, -72),new Case(3,2,false,false, 345, -60),new Case(3,3,false,false, 345, -48)],
            [new Case(4,1,false,false, 357, -72),new Case(4,2,false,false, 357, -60),new Case(4,3,false,false, 357, -48)],
            [new Case(5,1,false,false, 369, -72),new Case(5,2,false,false, 369, -60),new Case(5,3,false,false, 369, -48)],
            [new Case(6,1,false,false, 381, -72),new Case(6,2,false,false, 381, -60),new Case(6,3,false,false, 381, -48)],
            [new Case(7,1,false,false, 393, -72),new Case(7,2,false,false, 393, -60),new Case(7,3,false,false, 393, -48)],
            [new Case(8,1,false,false, 405, -72),new Case(8,2,false,false, 405, -60),new Case(8,3,false,false, 405, -48)],
            [new Case(9,1,true,false, 411, -72),new Case(9,2,false,false, 417, -60),new Case(9,3,false,false, 411, -48)],
            [new Case(10,1,true,false, 447, -70),new Case(10,2,false,false, 441, -59),new Case(10,3,false,false, 453, -57)],
            [new Case(11,1,true,false),new Case(11,2,false,false)],
            [new Case(12,1,true,false),new Case(12,2,false,false)],
            [new Case(13,1,false,false),new Case(13,2,false,false)],
            [new Case(14,1,false,false),new Case(14,2,false,false)],
            [new Case(15,1,false,false),new Case(15,2,false,false)],
            [new Case(16,1,false,false),new Case(16,2,true,false)],
            [new Case(17,1,false,false),new Case(17,2,false,false)],
            [new Case(18,1,false,false),new Case(18,2,false,false)],
            [new Case(19,1,false,false),new Case(19,2,false,false),new Case(19,3,true,false)],
            [new Case(20,1,false,false),new Case(20,2,false,false),new Case(20,3,false,false)],
            [new Case(21,1,false,false),new Case(21,2,false,false),new Case(21,3,true,false)],
            [new Case(22,1,false,false),new Case(22,2,false,false),"_",new Case(22,3,false,false)],
            [new Case(23,1,false,false),new Case(23,2,false,false),"_",new Case(23,3,false,false)],
            [new Case(24,1,true,false),new Case(24,2,false,false),"_",new Case(24,3,false,false)],
            [new Case(25,1,false,false),new Case(25,2,false,false),"_",new Case(25,3,false,false)],
            [new Case(26,1,true,false),new Case(26,2,false,false),"_",new Case(26,3,false,false),new Case(26,4,false,false)],
            [new Case(27,1,false,false),new Case(27,2,false,false),"_",new Case(27,3,false,false), new Case(27,4,false,false)],
            [new Case(28,1,true,false),new Case(28,2,false,false),"_",new Case(28,3,false,false)],
            [new Case(29,1,false,false),new Case(29,2,false,false),"_",new Case(29,3,false,false)],
            [new Case(30,1,true,false),new Case(30,2,false,false),"_",new Case(30,3,false,false)],
            [new Case(31,1,false,false),new Case(31,2,false,false),"_",new Case(31,3,false,false)],
            [new Case(32,1,true,false),new Case(32,2,false,false),"_",new Case(32,3,false,false)],
            [new Case(33,1,false,false),new Case(33,2,false,false),"_",new Case(33,3,false,false)],
            [new Case(34,1,true,false),new Case(34,2,false,false),"_",new Case(34,3,false,false)],
            [new Case(35,1,false,false),new Case(35,2,false,false),"_",new Case(35,3,false,false)],
            [new Case(36,1,false,false),new Case(36,2,false,false)],
            [new Case(37,1,false,false),new Case(37,2,false,false)],
            [new Case(38,1,false,false),new Case(38,2,false,false)],
            [new Case(39,1,false,false),new Case(39,2,false,false)],
            [new Case(40,1,false,false),new Case(40,2,false,false)],
            [new Case(41,1,false,false),new Case(41,2,false,false)],
            [new Case(42,1,false,false),new Case(42,2,false,false)],
            [new Case(43,1,false,false),new Case(43,2,false,false)],
            [new Case(44,1,false,false),new Case(44,2,false,false)],
            [new Case(45,1,false,false),new Case(45,2,false,false)],
            [new Case(46,1,false,false),new Case(46,2,false,false)],
            [new Case(47,1,false,false),new Case(47,2,false,false)],
            [new Case(48,1,true,false),new Case(48,2,false,false)],
            [new Case(49,1,false,false),new Case(49,2,false,false)],
            [new Case(50,1,false,false),new Case(50,2,false,false)],
            [new Case(51,1,false,false),new Case(51,2,false,false)],
            [new Case(52,1,false,false),new Case(52,2,false,false)],
            [new Case(53,1,false,false),new Case(53,2,false,false)],
            [new Case(54,1,false,false),new Case(54,2,false,false)],
            [new Case(55,1,false,false),new Case(55,2,false,false)],
            [new Case(56,1,false,false),new Case(56,2,false,false)],
            [new Case(57,1,true,false),new Case(57,false,false)],
            [new Case(58,1,false,false),new Case(58,2,false,false)],
            [new Case(59,1,false,false),new Case(59,2,false,false)],
            [new Case(60,1,false,false),new Case(60,2,false,false)],
            [new Case(61,1,false,false),new Case(61,2,false,false)],
            [new Case(62,1,false,false),new Case(62,2,false,false)],
            [new Case(63,1,false,false),new Case(63,2,false,false),new Case(63,3,false,false)],
            [new Case(64,1,true,false),new Case(64,2,false,false),new Case(64,3,false,false)],
            [new Case(65,1,false,false),new Case(65,2,false,false)],
            [new Case(66,1,true,false),new Case(66,2,true,false)],
            [new Case(67,1,false,false),new Case(67,2,false,false)],
            [new Case(68,1,false,false),new Case(68,2,false,false)],
            [new Case(69,1,false,false),new Case(69,2,false,false)],
            [new Case(70,1,false,false),new Case(70,2,false,false)],
            [new Case(71,1,false,false),new Case(71,2,false,false)],
            [new Case(72,1,false,false),new Case(72,2,false,false)],
            [new Case(73,1,false,false)],
            [new Case(74,1,true,false)],
            [new Case(75,1,false,false)],
            [new Case(76,1,false,false),new Case(76,2,false,false)],
            [new Case(77,1,false,false),new Case(77,2,false,false)],
            [new Case(78,1,false,false),new Case(78,2,false,false)],
            [new Case(79,1,false,false),new Case(79,2,false,false)],
            [new Case(80,1,false,false),new Case(80,2,false,false)],
            [new Case(81,1,false,false),new Case(81,2,false,false)],
            [new Case(82,1,false,false),new Case(82,2,false,false)],
            [new Case(83,1,false,false),new Case(83,2,false,false)],
            [new Case(84,1,false,false),new Case(84,2,false,false)],
            [new Case(85,1,false,false),"_",new Case(86,2,false,false)],
            [new Case(86,1,false,false),"_",new Case(86,2,false,false)],
            [new Case(87,1,false,false),"_",new Case(87,2,false,false)],
            [new Case(88,1,false,false),"_",new Case(88,2,false,false)],
            [new Case(89,1,false,false),"_",new Case(89,2,false,false),new Case(89,3,false,false)],
            [new Case(90,1,false,false),"_",new Case(90,2,true,false),new Case(90,3,false,false)],
            [new Case(91,1,false,false),"_",new Case(91,2,false,false)],
            [new Case(92,1,false,false),"_",new Case(92,2,false,false)],
            [new Case(93,1,false,false),"_",new Case(93,2,false,false)],
            [new Case(94,1,false,false),"_",new Case(94,2,false,false)],
            [new Case(95,1,false,false),new Case(95,2,false,false),new Case(95,3,false,false)],
            [new Case(0,1,false,false),new Case(0,2,false,false),new Case(0,3,false,false)],
            [new Case(-1,1,false,false),new Case(-1,2,false,false),new Case(-1,3,false,false)],
            [new Case(-2,1,false,false),new Case(-2,2,false,false),new Case(-2,3,false,false)],
            [new Case(-3,1,false,false),new Case(-3,2,false,false),new Case(-3,3,false,false)],
            [new Case(-4,1,false,false),new Case(-4,2,false,false),new Case(-4,3,false,false)],
            [new Case(-5,1,false,false),new Case(-5,2,false,false),new Case(-5,3,false,false)],
            [new Case(-6,1,false,false),new Case(-6,2,false,false),new Case(-6,3,false,false)],
            [new Case(-7,1,false,false),new Case(-7,2,false,false),new Case(-7,3,false,false)],
            [new Case(-8,1,false,false),new Case(-8,2,false,false),new Case(-8,3,false,false)],
            [new Case(-9,1,false,false),new Case(-9,2,false,false),new Case(-9,3,false,false)]]

//Initialisation des équipes
const bel = new Equipe("Belgique",0);
const it = new Equipe("Italie",1);
const hol = new Equipe("Hollande",2);
const all = new Equipe("Allemagne",3);
const all_equipe = [bel,it,hol,all]

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

//Initialisation des coureurs
function initialize_coureur(all_coureur){
    for (const equipe of all_equipe){
        for (const coureur of equipe.coureurs){
            all_coureur.push(coureur)
        }
    }
}
//peut être modifier pour passer entre les coureurs
let all_coureur = []
initialize_coureur(all_coureur)
//ne peut pas être modifier pour avoir tout les coureurs
let all_coureur_const = []
initialize_coureur(all_coureur_const)
//Les coureurs ayant finis
let finish_coureur = []

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
 * Execute une action carte sur un joueur et une équipe
 */
function action(){

    //On prends la valeur de l'input
    let action = parseInt(document.getElementById("action").value)
    let cartes = all_equipe[current_equip].cartes
    //si c'est le premier tour c'est comme ça que ça fonctionne
    if (nbTour ==0) {
        //on vérifie si la valeur est bien dans les cartes de l'équipe actuelle
        if (cartes.includes(action)){
            //On avance la position du coureur
            current_coureur = all_equipe[current_equip].coureurs[id_current_coureur]
            
            assigner_nouvelle_case(current_coureur, action)
            
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
            //si nous somme au round 12 alors c'est la fin du premier tour et nous devons préparer le prochain tour
            if(round==12){
                nbTour ++
                round = 1
                //on affiche le prochain coureur a passer
                let max_position = 0
                //On selectionne le coureur qui est le plus à l'avant de la course
                all_coureur.forEach(function(coureur){
                    if (coureur.position>max_position){
                        max_position = coureur.position
                        current_coureur = coureur
                    }
                })
                //on le supprime de la liste des coureurs pour pas le resélectionner
                let id = all_coureur.indexOf(current_coureur)
                all_coureur.splice(id, 1)
                var name_next_equipe = current_coureur.equipe 
                id_current_coureur = current_coureur.numero -1
                all_equipe.forEach(function(equipe){
                    if(equipe.nom==current_coureur.equipe){
                        current_equip = equipe.id
                    }
                })
                //On retire les personnes qui sont tomber
                coureur_fall.forEach(function retirer(coureur){
                    all_coureur.splice(all_coureur.indexOf(coureur), 1)
                })
                coureur_fall = []

            }
            else {
                var name_next_equipe = all_equipe[current_equip].nom
            }
            //on passe au round suivant
            round ++

        }
        else{
            var name_next_equipe = all_equipe[current_equip].nom
        }

    }
    //On n'est plus dans le premier tour donc c'est au tour du coureur le plus
    //loin de commencer ect.
    else{
        if(cartes.includes(action)){
            if (all_coureur.length==0){ 
                initialize_coureur(all_coureur)
                //On retire les personnes qui sont tomber
                coureur_fall.forEach(function retirer(coureur){
                    all_coureur.splice(all_coureur.indexOf(coureur), 1)
                })
                coureur_fall = []
                //si un joueur a finis alors on ajoute 10 points de pénalitées et on retire les personnes qui ont finis
                if(premier_joueur_fini){
                    point_en_plus +=10
                    finish_coureur.forEach(function retirer(coureur){
                        all_coureur.splice(all_coureur.indexOf(coureur), 1)
                    })
                }
                nbTour ++
            }
            //on assigne une nouvelle case
            assigner_nouvelle_case(current_coureur, action)

            //On retire le coureur de la liste pour ne pas le resélectionner
            let id = all_coureur.indexOf(current_coureur)
            all_coureur.splice(id,1)

            //On retire la carte seconde utilisée
            cartes.splice(cartes.indexOf(action),1)
            if (cartes.length==0){
                recharge_carte(all_equipe[current_equip])
            }

            let max_position = 0
            //On selectionne le coureur qui est le plus à l'avant de la course pour le prochain round
            all_coureur.forEach(function(coureur){
                if (coureur.position.numero>max_position){
                    max_position = coureur.position.numero
                    current_coureur = coureur
                }
            })


            var name_next_equipe = current_coureur.equipe 
            id_current_coureur = current_coureur.numero -1
            all_equipe.forEach(function(equipe){
                if(equipe.nom==current_coureur.equipe){
                    current_equip = equipe.id
                }
            })
        }
        else{
            var name_next_equipe = current_coureur.equipe
        }
        
    }
    //partie changement du label
    let laction = document.getElementById("label_action")
    let new_label = document.createTextNode(name_next_equipe + " coureur " + (id_current_coureur+1) + ":")
    let old_label = laction.childNodes
    laction.removeChild(old_label[1])
    laction.appendChild(new_label)

    //permet de réafficher les cartes
    affiche_carte()
    //permet de modifier les coordonées des joueurs
    updateCoordinates()
}

function assigner_nouvelle_case(current_coureur, action){
    let i=0
    //On regarde dans la rangée si il y a des cases de libre
    //si c'est le cas on l'assigne au coureur
    let assigner = true
    while (assigner){
        //sinon on crée une chute en série si on ne trouve pas de case dispo
        if(i == map[current_coureur.position.numero + action-1].length){
            chute_en_serie(map[current_coureur.position.numero + action])
            assigner = false
        }
        else{
            //si une case sur une ligne n'est pas utilisée alors on l'assigne
            if(!(map[current_coureur.position.numero + action-1][i].isUse)){
                //Si c'est une case finale
                if(map[current_coureur.position.numero + action-1][i].position<=0){
                    //On ajoute le coureur qui a finit
                    finish_coureur.push(current_coureur)
                    //On ajoute les points à l'équipe
                    current_equip.point += 95 + point_en_plus - map[current_coureur.position.numero + action-1][i].position
                    current_coureur.position = map[current_coureur.position.numero + action-1][i]
                    if(!premier_joueur_fini){
                        premier_joueur_fini = true
                    }
                    //On regarde si tout les joueurs n'ont pas finis
                    if(finish_coureur.length==12){
                        console.log("fin de partie")
                    }

                }
                //si c'est une case chance
                else if(map[current_coureur.position.numero + action-1][i].chance){
                    //nombre aléatoire entre -3 et 3 
                    let rand = Math.floor(Math.random()*6) - 2
                    let assigner2 = true
                    let j = 0
                    while (assigner2){
                        if(j == map[current_coureur.position.numero + action-1 + rand].length){
                            chute_en_serie(map[current_coureur.position.numero + action - 1 + rand])
                            assigner2 = false
                        }
                        else{
                            if(!(map[current_coureur.position.numero + action-1 + rand][j].isUse)){
                                map[current_coureur.position.numero][current_coureur.position.position-1].isUse = false
                                map[current_coureur.position.numero + action-1 + rand][j].isUse = true
                                current_coureur.position = map[current_coureur.position.numero + action-1 + rand][j]
                                assigner2 = false
                            }
                            else{
                                j++
                            }    
                        }
                    }
                    
                }
                //Si la case de devant est pas vide alors il peut profiter du système d'aspiration
                else if(map[current_coureur.position.numero + action].length > i){
                    if(map[current_coureur.position.numero + action][i].isUse){
                        //Vérifier qu'une case de la rangée est vide pour qu'il puisse s'y mettre
                        
                    }
                }
                //Si il n'y a aucune particularité
                else{
                    map[current_coureur.position.numero][current_coureur.position.position-1].isUse = false
                    map[current_coureur.position.numero + action-1][i].isUse = true
                    current_coureur.position = map[current_coureur.position.numero + action-1][i]
                }
                assigner = false
            }
            else {
                i++
            }
        }
    }
}

function chute_en_serie(rangee){
    let i = 0
    rangee.forEach(function chuter(el){
        all_coureur_const.forEach(function chute(coureur){
            if(coureur.position == el){
                coureur_fall.push(coureur)
            }
        })
    })

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


function updateCoordinates(){
    document.getElementById("belgium_player_1").style.left = all_equipe[0].coureurs[0].position.coord_x + "px"; // belgian 1 coordinates
    document.getElementById("belgium_player_1").style.top = all_equipe[0].coureurs[0].position.coord_y + "px";
    if (all_equipe[0].coureurs[0].position.coord_x != 888 && all_equipe[0].coureurs[0].position.coord_y != 888){
        document.getElementById("belgium_player_1").style.visibility = "visible"; // set the player visible
    }

    document.getElementById("belgium_player_2").style.left = all_equipe[0].coureurs[1].position.coord_x + "px"; // belgian 2 coordinates
    document.getElementById("belgium_player_2").style.top = all_equipe[0].coureurs[1].position.coord_y + "px";
    if (all_equipe[0].coureurs[1].position.coord_x != 888 && all_equipe[0].coureurs[1].position.coord_y != 888){
        document.getElementById("belgium_player_2").style.visibility = "visible"; // set the player visible
    }

    document.getElementById("belgium_player_3").style.left = all_equipe[0].coureurs[2].position.coord_x + "px"; // belgian 3 coordinates
    document.getElementById("belgium_player_3").style.top = all_equipe[0].coureurs[2].position.coord_y + "px";
    if (all_equipe[0].coureurs[2].position.coord_x != 888 && all_equipe[0].coureurs[2].position.coord_y != 888){
        document.getElementById("belgium_player_3").style.visibility = "visible"; // set the player visible
    }


    document.getElementById("germany_player_1").style.left = all_equipe[3].coureurs[0].position.coord_x + "px"; // german 1 coordinates
    document.getElementById("germany_player_1").style.top = all_equipe[3].coureurs[0].position.coord_y + "px";
    if (all_equipe[3].coureurs[0].position.coord_x != 888 && all_equipe[3].coureurs[0].position.coord_y !=888){
        document.getElementById("germany_player_1").style.visibility = "visible"; // set the player visible
    }

    document.getElementById("germany_player_2").style.left = all_equipe[3].coureurs[1].position.coord_x + "px"; // german 2 coordinates
    document.getElementById("germany_player_2").style.top = all_equipe[3].coureurs[1].position.coord_y + "px";
    if (all_equipe[3].coureurs[1].position.coord_x != 888 && all_equipe[3].coureurs[1].position.coord_y != 888){
        document.getElementById("germany_player_2").style.visibility = "visible"; // set the player visible
    }

    document.getElementById("germany_player_3").style.left = all_equipe[3].coureurs[2].position.coord_x + "px"; // german 3 coordinates
    document.getElementById("germany_player_3").style.top = all_equipe[3].coureurs[2].position.coord_y + "px";
    if (all_equipe[3].coureurs[2].position.coord_x != 888 && all_equipe[3].coureurs[2].position.coord_y != 888){
        document.getElementById("germany_player_3").style.visibility = "visible"; // set the player visible
    }


    document.getElementById("netherlands_player_1").style.left = all_equipe[2].coureurs[0].position.coord_x + "px"; // dutch 1 coordinates
    document.getElementById("netherlands_player_1").style.top = all_equipe[2].coureurs[0].position.coord_y + "px";
    if (all_equipe[2].coureurs[0].position.coord_x != 888 && all_equipe[2].coureurs[0].position.coord_y != 888){
        document.getElementById("netherlands_player_1").style.visibility = "visible"; // set the player visible
    }
    
    document.getElementById("netherlands_player_2").style.left = all_equipe[2].coureurs[1].position.coord_x + "px"; // dutch 2 coordinates
    document.getElementById("netherlands_player_2").style.top = all_equipe[2].coureurs[1].position.coord_y + "px";
    if (all_equipe[2].coureurs[1].position.coord_x != 888 && all_equipe[2].coureurs[1].position.coord_y != 888){
        document.getElementById("netherlands_player_2").style.visibility = "visible"; // set the player visible
    }
    
    document.getElementById("netherlands_player_3").style.left = all_equipe[2].coureurs[2].position.coord_x + "px"; // ducth 3 coordinates
    document.getElementById("netherlands_player_3").style.top = all_equipe[2].coureurs[2].position.coord_y + "px";
    if (all_equipe[2].coureurs[2].position.coord_x != 888 && all_equipe[2].coureurs[2].position.coord_y != 888){
        document.getElementById("netherlands_player_3").style.visibility = "visible"; // set the player visible
    }


    document.getElementById("italy_player_1").style.left = all_equipe[1].coureurs[0].position.coord_x + "px"; // italian 1 coordinates
    document.getElementById("italy_player_1").style.top = all_equipe[1].coureurs[0].position.coord_y + "px";
    if (all_equipe[1].coureurs[0].position.coord_x != 888 && all_equipe[1].coureurs[0].position.coord_y != 888){
        document.getElementById("italy_player_1").style.visibility = "visible"; // set the player visible
    }

    document.getElementById("italy_player_2").style.left = all_equipe[1].coureurs[1].position.coord_x + "px"; // italian 2 coordinates
    document.getElementById("italy_player_2").style.top = all_equipe[1].coureurs[1].position.coord_y + "px";
    if (all_equipe[1].coureurs[1].position.coord_x != 888 && all_equipe[1].coureurs[1].position.coord_y != 888){
        document.getElementById("italy_player_2").style.visibility = "visible"; // set the player visible
    }

    document.getElementById("italy_player_3").style.left = all_equipe[1].coureurs[2].position.coord_x + "px"; // ttalian 3 coordinates
    document.getElementById("italy_player_3").style.top = all_equipe[1].coureurs[2].position.coord_y + "px";
    if (all_equipe[1].coureurs[2].position.coord_x != 888 && all_equipe[1].coureurs[2].position.coord_y != 888){
        document.getElementById("italy_player_3").style.visibility = "visible"; // set the player visible
    }

}