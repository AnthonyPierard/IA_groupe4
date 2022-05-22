
/** */


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

//sert pour les sprints
let sprint_1 = false
let sprint_2 = false
let sprint_3 = false

//sert pour les tours d'après
let current_coureur 
let coureur_fall = []


//Sert à envoyer au prolog
let Pos_general_const = [["belgique",0,0],["belgique",1,0],["belgique",2,0],["italie",0,0],["italie",1,0],["italie",2,0],["allemagne",0,0],["allemagne",1,0],["allemagne",2,0],["hollande",0,0],["hollande",1,0],["hollande",2,0]]
let Pos_general = []
let bel_pos = [["belgique",0,0],["belgique",1,0],["belgique",2,0]]
let it_pos = [["italie",0,0],["italie",1,0],["italie",2,0]]
let all_pos = [["allemagne",0,0],["allemagne",1,0],["allemagne",2,0]]
let hol_pos = [["hollande",0,0],["hollande",1,0],["hollande",2,0]]
let all_card


class Equipe {
    constructor(nom,id, point, type){
        // ajout des cartes pour chaques équipes
        recharge_carte(this)
        //le nom de l'équipe
        this.nom = nom
        //son id dans la liste de toutes les équipes
        this.id = id
        //les 3 coureurs de l'équipe
        this.coureurs = [new Coureur(1,this.nom),new Coureur(2,this.nom),new Coureur(3,this.nom)]
        //les points de l'équipe
        this.point = point
        //si le joueur est un humain ou une IA
        this.type = type
    }
}

class Coureur {
    constructor(numero,equipe){
        //La case ou est positionner le coureur
        this.position = map[90][0]
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
            [new Case(9,1,true,false, 423, -72),new Case(9,2,false,false, 417, -60),new Case(9,3,false,false, 429, -60)],
            [new Case(10,1,true,false, 447, -70),new Case(10,2,false,false, 441, -59),new Case(10,3,false,false, 453, -57)],
            [new Case(11,1,true,false, 465, -65),new Case(11,2,false,false, 465, -53)],
            [new Case(12,1,true,false, 477, -62),new Case(12,2,false,false, 477, -50)],
            [new Case(13,1,false,false, 489, -58),new Case(13,2,false,false, 489, -46)],
            [new Case(14,1,false,false, 501, -54),new Case(14,2,false,false, 501, -42)],
            [new Case(15,1,false,false, 513, -48),new Case(15,2,false,false, 513, -36)],
            [new Case(16,1,false,false, 525, -42),new Case(16,2,true,false, 525, -30)],
            [new Case(17,1,false,false, 537, -34),new Case(17,2,false,false, 537, -22)],
            [new Case(18,1,false,false, 549, -34),new Case(18,2,false,false, 549, -22)],
            [new Case(19,1,false,false, 561, -10),new Case(19,2,false,false, 549, -10),new Case(19,3,true,false, 537, -10)],
            [new Case(20,1,false,false, 561, 2),new Case(20,2,false,false, 549, 2),new Case(20,3,false,false, 537, 2)],
            [new Case(21,1,false,false, 561, 14),new Case(21,2,false,false, 549, 14),new Case(21,3,true,false, 537, 14)],
            [new Case(22,1,false,false, 561, 26),new Case(22,2,false,false, 549, 26),"_",new Case(22,3,false,false, 525, 26)],
            [new Case(23,1,false,false, 561, 38),new Case(23,2,false,false, 549, 38),"_",new Case(23,3,false,false, 525, 38)],
            [new Case(24,1,true,false, 561, 50),new Case(24,2,false,false, 549, 50),"_",new Case(24,3,false,false, 525, 50)],
            [new Case(25,1,false,false, 561, 62),new Case(25,2,false,false, 549, 62),"_",new Case(25,3,false,false, 525, 62)],
            [new Case(26,1,true,false, 561, 86),new Case(26,2,false,false, 549, 86),"_",new Case(26,3,false,false, 525, 74),new Case(26,4,false,false, 525, 86)],
            [new Case(27,1,false,false, 561, 104),new Case(27,2,false,false, 549, 104),"_",new Case(27,3,false,false, 525, 98), new Case(27,4,false,false, 525, 110)],
            [new Case(28,1,true,false, 561, 122),new Case(28,2,false,false, 549, 122),"_",new Case(28,3,false,false, 525, 122)],
            [new Case(29,1,false,false, 561, 134),new Case(29,2,false,false, 549, 134),"_",new Case(29,3,false,false, 525, 134)],
            [new Case(30,1,true,false, 561, 146),new Case(30,2,false,false, 549, 146),"_",new Case(30,3,false,false, 525, 146)],
            [new Case(31,1,false,false, 561, 158),new Case(31,2,false,false, 549, 158),"_",new Case(31,3,false,false, 525, 158)],
            [new Case(32,1,true,false, 561, 170),new Case(32,2,false,false, 549, 170),"_",new Case(32,3,false,false, 525, 170)],
            [new Case(33,1,false,false, 561, 182),new Case(33,2,false,false, 549, 182),"_",new Case(33,3,false,false, 525, 182)],
            [new Case(34,1,true,false, 561, 194),new Case(34,2,false,false, 549, 194),"_",new Case(34,3,false,false, 525, 194)],
            [new Case(35,1,false,false, 561, 206),new Case(35,2,false,false, 549, 206),"_",new Case(35,3,false,false, 525, 206)],
            [new Case(36,1,false,false, 549, 218),new Case(36,2,false,false, 537, 218)],
            [new Case(37,1,false,false, 549, 230),new Case(37,2,false,false, 537, 230)],
            [new Case(38,1,false,false, 551, 242),new Case(38,2,false,false, 539, 242)],
            [new Case(39,1,false,false, 552, 254),new Case(39,2,false,false, 540, 254)],
            [new Case(40,1,false,false, 554, 266),new Case(40,2,false,false, 542, 266)],
            [new Case(41,1,false,false, 557, 278),new Case(41,2,false,false, 545, 278)],
            [new Case(42,1,false,false, 560, 290),new Case(42,2,false,false, 548, 290)],
            [new Case(43,1,false,false, 563, 302),new Case(43,2,false,false, 551, 302)],
            [new Case(44,1,false,false, 567, 314),new Case(44,2,false,false, 555, 314)],
            [new Case(45,1,false,false, 573, 326),new Case(45,2,false,false, 573, 326)],
            [new Case(46,1,false,false, 570, 338),new Case(46,2,false,false, 558, 338)],
            [new Case(47,1,false,false, 570, 350),new Case(47,2,false,false, 558, 350)],
            [new Case(48,1,true,false, 570, 362),new Case(48,2,false,false, 558, 362)],
            [new Case(49,1,false,false, 546, 353),new Case(49,2,false,false, 546, 341)],
            [new Case(50,1,false,false, 534, 356),new Case(50,2,false,false, 534, 344)],
            [new Case(51,1,false,false, 522, 353),new Case(51,2,false,false, 522, 341)],
            [new Case(52,1,false,false, 510, 350),new Case(52,2,false,false, 510, 338)],
            [new Case(53,1,false,false, 498, 350),new Case(53,2,false,false, 498, 338)],
            [new Case(54,1,false,false, 486, 350),new Case(54,2,false,false, 486, 338)],
            [new Case(55,1,false,false, 474, 350),new Case(55,2,false,false, 474, 338)],
            [new Case(56,1,false,false, 462, 353),new Case(56,2,false,false, 462, 341)],
            [new Case(57,1,false,false, 450, 359),new Case(57,2,true,false, 450, 347)],
            [new Case(58,1,false,false, 438, 367),new Case(58,2,false,false, 438, 355)],
            [new Case(59,1,false,false, 426, 373),new Case(59,2,false,false, 426, 361)],
            [new Case(60,1,false,false,414,380),new Case(60,2,false,false,414,368)],
            [new Case(61,1,false,false,402,390),new Case(61,2,false,false,402,378)],
            [new Case(62,1,false,false,390,401),new Case(62,2,false,false,390,389)],
            [new Case(63,1,false,false,372,412),new Case(63,2,false,false,366,401),new Case(63,3,false,false,378,398)],
            [new Case(64,1,false,false,349,422),new Case(64,2,false,false,342,411),new Case(64,3,false,false,354,406)],
            [new Case(65,1,false,false,330,430),new Case(65,2,false,false,330,419)],
            [new Case(66,1,true,false,318,425),new Case(66,2,true,false,318,414)],
            [new Case(67,1,false,false,306,417),new Case(67,2,false,false,306,406)],
            [new Case(68,1,false,false,294,410),new Case(68,2,false,false,294,399)],
            [new Case(69,1,false,false,282,405),new Case(69,2,false,false,282,394)],
            [new Case(70,1,false,false,270,401),new Case(70,2,false,false,270,389)],
            [new Case(71,1,false,false,259,394),new Case(71,2,false,false,259,382)],
            [new Case(72,1,false,false,247,387),new Case(72,2,false,false,247,375)],
            [new Case(73,1,false,false,234,374)],
            [new Case(74,1,true,false,234,362)],
            [new Case(75,1,false,false,234,350)],
            [new Case(76,1,false,false,234,338),new Case(76,2,false,false,246,338)],
            [new Case(77,1,false,false,237,326),new Case(77,2,false,false,249,326)],
            [new Case(78,1,false,false,240,314),new Case(78,2,false,false,252,314)],
            [new Case(79,1,false,false,243,302),new Case(79,2,false,false,255,302)],
            [new Case(80,1,false,false,246,290),new Case(80,2,false,false,258,290)],
            [new Case(81,1,false,false,249,278),new Case(81,2,false,false,261,278)],
            [new Case(82,1,false,false,249,266),new Case(82,2,false,false,261,266)],
            [new Case(83,1,false,false,245,254),new Case(83,2,false,false,257,254)],
            [new Case(84,1,false,false,242,242),"_",new Case(84,2,false,false,266,242)],
            [new Case(85,1,false,false,240,230),"_",new Case(85,2,false,false,264,230)],
            [new Case(86,1,false,false,234,218),"_",new Case(86,2,false,false,258,218)],
            [new Case(87,1,false,false,230,206),"_",new Case(87,2,false,false,254,206)],
            [new Case(88,1,false,false,224,194),"_",new Case(88,2,false,false,248,194)],
            [new Case(89,1,false,false,214,176),"_",new Case(89,2,false,false,236,170),new Case(89,3,false,false,242,182)],
            [new Case(90,1,false,false,208,150),"_",new Case(90,2,false,false,232,144),new Case(90,3,true,false,132,158)],
            [new Case(91,1,false,false,209,132),"_",new Case(91,2,false,false,233,132)],
            [new Case(92,1,false,false,209,120),"_",new Case(92,2,false,false,233,120)],
            [new Case(93,1,false,false,209,108),"_",new Case(93,2,false,false,233,108)],
            [new Case(94,1,false,false,209,96),"_",new Case(94,2,false,false,233,96)],
            [new Case(95,1,false,false,212,84),new Case(95,2,false,false,224,84),new Case(95,3,false,false,236,84)],
            [new Case(0,1,false,false,215,72),new Case(0,2,false,false,215,72),new Case(0,3,false,false,215,72)],
            [new Case(-1,1,false,false,218,60),new Case(-1,2,false,false,230,60),new Case(-1,3,false,false,242,60)],
            [new Case(-2,1,false,false,222,48),new Case(-2,2,false,false,234,48),new Case(-2,3,false,false,246,48)],
            [new Case(-3,1,false,false,227,36),new Case(-3,2,false,false,239,36),new Case(-3,3,false,false,251,36)],
            [new Case(-4,1,false,false,231,24),new Case(-4,2,false,false,243,24),new Case(-4,3,false,false,255,24)],
            [new Case(-5,1,false,false,237,12),new Case(-5,2,false,false,249,12),new Case(-5,3,false,false,261,12)],
            [new Case(-6,1,false,false,243,0),new Case(-6,2,false,false,255,0),new Case(-6,3,false,false,267,0)],
            [new Case(-7,1,false,false,250,-12),new Case(-7,2,false,false,262,-12),new Case(-7,3,false,false,274,-12)],
            [new Case(-8,1,false,false,256,-24),new Case(-8,2,false,false,274,-24),new Case(-8,3,false,false,286,-24)],
            [new Case(-9,1,false,false,259,-36),new Case(-9,2,false,false,271,-36),new Case(-9,3,false,false,283,-36)]]

//Initialisation des équipes
const bel = new Equipe("belgique",0, 0, "human");
const it = new Equipe("italie",1, 0, "human");
const hol = new Equipe("hollande",2, 0, "IA");
const all = new Equipe("allemagne",3, 0, "IA");
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
    equipe.cartes.reverse()
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
    let first_card = bel.cartes[0]
    let first_nom = bel.nom
    let first_equipe = bel
    for (const equip of all_equipe) {
        if (equip.cartes[0] > first_card){
            first_card = equip.cartes[0]
            first_nom = equip.nom
            first_equipe = equip
        }
    }
    let nEquip = document.createTextNode(first_nom + " coureur 1 :")
    laction.appendChild(nEquip)
    current_equip = all_equipe.indexOf(first_equipe)

    if(current_equip == 0){
        for (let i = 0; i<3; i++){
            Pos_general.push(bel_pos[i])
            Pos_general.push(it_pos[i])
            Pos_general.push(hol_pos[i])
            Pos_general.push(all_pos[i])
        }
    }
    else if (current_equip == 1){
        for (let i = 0; i<3; i++){
            Pos_general.push(it_pos[i])
            Pos_general.push(hol_pos[i])
            Pos_general.push(all_pos[i])
            Pos_general.push(bel_pos[i])
        }
    }
    else if(current_equip == 2){
        for (let i = 0; i<3; i++){
            Pos_general.push(hol_pos[i])
            Pos_general.push(all_pos[i])
            Pos_general.push(bel_pos[i])
            Pos_general.push(it_pos[i])
        }
    }

    else {
        for (let i = 0; i<3; i++){
            Pos_general.push(all_pos[i])
            Pos_general.push(bel_pos[i])
            Pos_general.push(it_pos[i])
            Pos_general.push(hol_pos[i])
        }
    }
}

/**
 * Execute une action carte sur un joueur et une équipe
 */
function action(){
    let action
    if(all_equipe[current_equip].type == "IA"){
        //On va envoyer les informations à l'équipe

        // Valeurs de test rapides
        var test = new Object()
        test.pos_gen= [["belgique", 0, 0], ["italie", 0, 0], ["hollande", 0, 0], ["allemagne", 0, 0]]
        test.pos_gen_const= [["belgique", 0, 0], ["italie", 0, 0], ["hollande", 0, 0], ["allemagne", 0, 0]]
        test.all_cards= [[1,2,3],[2,4,6],[4,6],[7,3]]
        test.forwho="ia"

        var json_to_pl = JSON.stringify(test);

        sendMessage(connection,envoyer_A_prolog())
        //ici on devra récuperer la carte jouer par l'IA 
        action = parseInt(document.getElementById("action").value)
    }
    else {
        action = parseInt(document.getElementById("action").value)
    }
    //On prends la valeur de l'input
    let cartes = all_equipe[current_equip].cartes
    //si c'est le premier tour c'est comme ça que ça fonctionne
    if (nbTour == 0) {
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
                //On retire les personnes qui sont tomber
                coureur_fall.forEach(function retirer(coureur){
                    all_coureur.splice(all_coureur.indexOf(coureur), 1)
                })
                coureur_fall = []
                //on affiche le prochain coureur a passer
                let max_position = 0
                //On selectionne le coureur qui est le plus à l'avant de la course
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
            else {
                var name_next_equipe = all_equipe[current_equip].nom
            }
            //on passe au round suivant
            round ++
            Pos_general.splice(0,1)
        }
        else{
            var name_next_equipe = all_equipe[current_equip].nom
        }

    }
    //On n'est plus dans le premier tour donc c'est au tour du coureur le plus
    //loin de commencer ect.
    else{
        if(cartes.includes(action)){

            //on assigne une nouvelle case
            assigner_nouvelle_case(current_coureur, action)

            //On retire le coureur de la liste pour ne pas le resélectionner
            if(all_coureur.includes(current_coureur)) { all_coureur.splice(all_coureur.indexOf(current_coureur),1) }

            //On retire la carte seconde utilisée
            cartes.splice(cartes.indexOf(action),1)
            if (cartes.length==0){
                recharge_carte(all_equipe[current_equip])
            }
            
            //Si il n'y a plus de coureur disponible on re remplit la liste avec les coureurs qui ne sont pas tombé ou qui n'ont pas finit
            if (all_coureur.length==0){ 
                initialize_coureur(all_coureur)
                //On retire les personnes qui sont tomber
                coureur_fall.forEach(function retirer(coureur){
                    if(all.coureurs.includes(coureur)){
                        all_coureur.splice(all_coureur.indexOf(coureur), 1)
                    }    
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
    //on retire la carte de nbr_carte
    nbr_carte[action-1] --
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
            if(current_coureur.position.numero!=0){ map[current_coureur.position.numero-1][current_coureur.position.position-1].isUse = false }
            chute_en_serie(map[current_coureur.position.numero + action-1],current_coureur, -1)
            current_coureur.position = map[current_coureur.position.numero + action-1][0]
            assigner = false
        }
        //Si c'est une case finale
        else if(map[current_coureur.position.numero + action-1][i].numero<=0){
            console.log("je passe")
            //On ajoute le coureur qui a finit
            finish_coureur.push(current_coureur)
            //On ajoute les points à l'équipe
            all_equipe[current_equip].point += 95 + point_en_plus - map[current_coureur.position.numero + action-1][i].numero
            current_coureur.position = map[current_coureur.position.numero + action-1][i]
            if(!premier_joueur_fini){
                premier_joueur_fini = true
            }
            //On regarde si tout les joueurs n'ont pas finis
            if(finish_coureur.length==12){
                document.getElementById("ac-wrapper-fin").style.visibility = "visible"
                let p_fin = document.getElementById("fin_test")
                let fin = document.createTextNode("Fin de partie, voici les résultats : \n")
                p_fin.appendChild(fin)
                add_br(p_fin)
                add_br(p_fin)
                
                let meilleur_equipe = new Equipe("temp", 6, 1000)
                all_equipe.forEach(function(equipe){
                    let fin1 = document.createTextNode("score de l'équipe de/d' " + equipe.nom + " : " + equipe.point)
                    p_fin.appendChild(fin1)
                    add_br(p_fin)
                    if(meilleur_equipe.point > equipe.point){
                        meilleur_equipe = equipe
                    }
                })
                let fin2 = document.createTextNode("L'équipe gagnante est : " + meilleur_equipe.nom)
                let fin3 = document.createTextNode("Merci d'avoir joué, veuillez actualiser la page si vous souhaitez rejouer.")
                add_br(p_fin)
                p_fin.appendChild(fin2)
                add_br(p_fin)
                add_br(p_fin)
                p_fin.appendChild(fin3)
                add_br(p_fin)

            }
            assigner = false
        }

        //si on va plus loin que les cases finales
        else if(current_coureur.position.numero + action-1 >= map.length){
            finish_coureur.push(current_coureur)
            all_equipe[current_equip].point += 95 + point_en_plus - 9
            current_coureur.position = map[105-1][0]
            if(!premier_joueur_fini){
                premier_joueur_fini = true
            }
            //On regarde si tout les joueurs n'ont pas finis
            if(finish_coureur.length==12){
                document.getElementById("ac-wrapper-fin").style.visibility = "visible"
                let p_fin = document.getElementById("fin_test")
                let fin = document.createTextNode("Fin de partie, voici les résultats : \n")
                p_fin.appendChild(fin)
                add_br(p_fin)
                add_br(p_fin)
                
                let meilleur_equipe = new Equipe("temp", 6, 1000)
                all_equipe.forEach(function(equipe){
                    let fin1 = document.createTextNode("score de l'équipe de/d' " + equipe.nom + " : " + equipe.point)
                    p_fin.appendChild(fin1)
                    add_br(p_fin)
                    if(meilleur_equipe.point > equipe.point){
                        meilleur_equipe = equipe
                    }
                })
                let fin2 = document.createTextNode("L'équipe gagnante est : " + meilleur_equipe.nom)
                let fin3 = document.createTextNode("Merci d'avoir joué, si vous souhaitez rejouer actualisé la page.")
                add_br(p_fin)
                p_fin.appendChild(fin2)
                add_br(p_fin)
                add_br(p_fin)
                p_fin.appendChild(fin3)
                add_br(p_fin)
            }
            assigner = false
        }
        else{
            //si la rangée contient une rigole
            if(map[current_coureur.position.numero + action-1].includes("_")){
                assigner = false
                map[current_coureur.position.numero-1][current_coureur.position.position-1].isUse = false
                //si la case sur la même rangée n'est pas prise alors il peut y aller
                if(current_coureur.position.position==3 || current_coureur.position.position==2 && current_coureur.position.numero>50){
                    map[current_coureur.position.numero + action-1][current_coureur.position.position].isUse = true
                    current_coureur.position = map[current_coureur.position.numero + action-1][current_coureur.position.position]
                }
                else if(!map[current_coureur.position.numero + action-1][current_coureur.position.position -1].isUse){
                    map[current_coureur.position.numero + action-1][current_coureur.position.position -1].isUse = true
                    current_coureur.position = map[current_coureur.position.numero + action-1][current_coureur.position.position -1]
                }
                else{
                    chute_en_serie(map[current_coureur.position.numero + action -1], current_coureur, current_coureur.position.position-1)
                    current_coureur.position = map[current_coureur.position.numero + action-1][current_coureur.position.position -1]
                }
            }
            //si elle n'en contient pas alors normal
            else { 
                //si une case sur une ligne n'est pas utilisée alors on l'assigne
                if(!(map[current_coureur.position.numero + action-1][i].isUse)){
                    //si c'est une case chance
                    if(map[current_coureur.position.numero + action-1][i].chance){
                        //nombre aléatoire entre -3 et 3 
                        let rand = Math.floor(Math.random()*6) - 2
                        let assigner2 = true
                        let j = 0
                        while (assigner2){
                            if(j == map[current_coureur.position.numero + action-1 + rand].length){
                                if(current_coureur.position.numero!=0){ map[current_coureur.position.numero-1][current_coureur.position.position-1].isUse = false }
                                chute_en_serie(map[current_coureur.position.numero + action - 1 + rand],current_coureur, -1)
                                current_coureur.position = map[current_coureur.position.numero + action-1 + rand][0]
                                assigner2 = false
                            }
                            else{
                                if(!(map[current_coureur.position.numero + action-1 + rand][j].isUse)){
                                    if(current_coureur.position.numero!=0){ map[current_coureur.position.numero-1][current_coureur.position.position-1].isUse = false }
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
                    /*else if(map[current_coureur.position.numero + action].length > i){
                        if(map[current_coureur.position.numero + action][i].isUse){
                            //Vérifier qu'une case de la rangée est vide pour qu'il puisse s'y mettre
                            
                        }
                    }*/
                    //Si il n'y a aucune particularité
                    else{
                        if(current_coureur.position.numero!=0){ map[current_coureur.position.numero-1][current_coureur.position.position-1].isUse = false }
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
    //si un joueur passe la 1ere zone de sprint
    if((current_coureur.position.numero + action-1) > 21 && !sprint_1){
        all_equipe[current_equip].point -= 1
        sprint_1 = true
    }

    //si un joueur passe la 2e zone de sprint
    else if((current_coureur.position.numero + action-1) > 35 && !sprint_2){
        all_equipe[current_equip].point -= 3
        sprint_2 = true
    }

    //si un joueur passe la 3e zone de sprint
    else if((current_coureur.position.numero + action-1) > 75 && !sprint_3){
        all_equipe[current_equip].point -= 3
        sprint_3 = true
    }
    console.log(current_coureur)
}

function chute_en_serie(rangee, coureur, intervalle){
    console.log("aie chute en série")
    //si l'intervalle est a -1 c'est que c'est une chute en série dans une colonne sans _
    if(intervalle==-1){
        rangee.forEach(function(el){
            all_coureur_const.forEach(function(coureur){
                if(coureur.position == el){
                    coureur_fall.push(coureur)
                }
            })
        })
    }
    //sinon on doit mettre juste la case sur chute en série
    else if (intervalle==2){
        all_coureur_const.forEach(function(coureur){
            if(coureur.position == rangee[2]){
                coureur_fall.push(coureur)
            }
        })
    }
    else if (rangee[0].numero < 37){
        all_coureur_const.forEach(function(coureur){
            if(coureur.position == rangee[0] || coureur.position == rangee[1]){
                coureur_fall.push(coureur)
            }
        })
    }
    else{
        all_coureur_const.forEach(function(coureur){
            if(coureur.position == rangee[intervalle]){
                coureur_fall.push(coureur)
            }
        })
    }
    coureur_fall.push(coureur)

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
function PopUp(){
    document.getElementById('ac-wrapper').style.display="none"; 
}

function envoyer_A_prolog(){
    //On assigne toutes les cartes 
    all_card = [bel.cartes, it.cartes, hol.cartes,all.cartes]


    /** Mettre à jours les coordonnée des joueurs avant de les envoyer au prolog **/
    if(nbTour!=0 && finish_coureur.length!=12){
        let tmp_coureur = []
        all_coureur.forEach(function(cour){
            tmp_coureur.push(cour)
        })
        Pos_general = []
        coureur_pass = []
        for(let i=0; i<tmp_coureur.length; i++){
            let m_pos = 0
            let max_coureur
            tmp_coureur.forEach(function(cou){
                if (cou.position.numero>m_pos && !coureur_pass.includes(cou)){
                    m_pos = cou.position.numero
                    max_coureur = cou
                }
            })
            Pos_general.push([max_coureur.equipe, max_coureur.numero-1, max_coureur.position.numero])
            coureur_pass.push(max_coureur)
        }
    }

    Pos_general_const.forEach(function(all_Pos){
        all_coureur_const.forEach(function(al_cour){
            if(all_Pos[0]==al_cour.equipe && all_Pos[1] == al_cour.numero-1){
                all_Pos[2] = al_cour.position.numero
            }
        })
    })

    var obj = new Object()
    obj.pos_gen=Pos_general
    obj.pos_gen_const=Pos_general_const
    obj.all_cards=all_card
    obj.forwho="ia"

    var json_to_pl = JSON.stringify(obj);

    
    return json_to_pl;
}


function updateCoordinates(){
    document.getElementById("belgium_player_1").style.left = all_equipe[0].coureurs[0].position.coord_x + "px"; // belgian 1 coordinates
    document.getElementById("belgium_player_1").style.top = all_equipe[0].coureurs[0].position.coord_y + "px";
    document.getElementById("belplayer_1").style.left = all_equipe[0].coureurs[0].position.coord_x + "px"; // belgian 1 marker coordinates
    document.getElementById("belplayer_1").style.top = all_equipe[0].coureurs[0].position.coord_y + "px";
    if (all_equipe[0].coureurs[0].position.coord_x != 888 && all_equipe[0].coureurs[0].position.coord_y != 888){
        document.getElementById("belgium_player_1").style.visibility = "visible"; // set the player visible
        if(all_equipe[current_equip].nom == "Belgique"){
            document.getElementById("belplayer_1").style.visibility = "visible"; // set its marker visible
        } else {
            document.getElementById("belplayer_1").style.visibility = "hidden"; // set its marker hidden
        }
    }

    document.getElementById("belgium_player_2").style.left = all_equipe[0].coureurs[1].position.coord_x + "px"; // belgian 2 coordinates
    document.getElementById("belgium_player_2").style.top = all_equipe[0].coureurs[1].position.coord_y + "px";
    document.getElementById("belplayer_2").style.left = all_equipe[0].coureurs[1].position.coord_x + "px"; // belgian 2 marker coordinates
    document.getElementById("belplayer_2").style.top = all_equipe[0].coureurs[1].position.coord_y + "px";
    if (all_equipe[0].coureurs[1].position.coord_x != 888 && all_equipe[0].coureurs[1].position.coord_y != 888){
        document.getElementById("belgium_player_2").style.visibility = "visible"; // set the player visible
        if(all_equipe[current_equip].nom == "Belgique"){
            document.getElementById("belplayer_2").style.visibility = "visible"; // set its marker visible
        } else {
            document.getElementById("belplayer_2").style.visibility = "hidden"; // set its marker hidden
        }
    }

    document.getElementById("belgium_player_3").style.left = all_equipe[0].coureurs[2].position.coord_x + "px"; // belgian 3 coordinates
    document.getElementById("belgium_player_3").style.top = all_equipe[0].coureurs[2].position.coord_y + "px";
    document.getElementById("belplayer_3").style.left = all_equipe[0].coureurs[2].position.coord_x + "px"; // belgian 3 marker coordinates
    document.getElementById("belplayer_3").style.top = all_equipe[0].coureurs[2].position.coord_y + "px";
    if (all_equipe[0].coureurs[2].position.coord_x != 888 && all_equipe[0].coureurs[2].position.coord_y != 888){
        document.getElementById("belgium_player_3").style.visibility = "visible"; // set the player visible
        if(all_equipe[current_equip].nom == "Belgique"){
            document.getElementById("belplayer_3").style.visibility = "visible"; // set its marker visible
        } else {
            document.getElementById("belplayer_3").style.visibility = "hidden"; // set its marker hidden
        }
    }


    document.getElementById("germany_player_1").style.left = all_equipe[3].coureurs[0].position.coord_x + "px"; // german 1 coordinates
    document.getElementById("germany_player_1").style.top = all_equipe[3].coureurs[0].position.coord_y + "px";
    document.getElementById("gerplayer_1").style.left = all_equipe[3].coureurs[0].position.coord_x + "px"; // german 1 marker coordinates
    document.getElementById("gerplayer_1").style.top = all_equipe[3].coureurs[0].position.coord_y + "px";
    if (all_equipe[3].coureurs[0].position.coord_x != 888 && all_equipe[3].coureurs[0].position.coord_y !=888){
        document.getElementById("germany_player_1").style.visibility = "visible"; // set the player visible
        if(all_equipe[current_equip].nom == "Allemagne"){
            document.getElementById("gerplayer_1").style.visibility = "visible"; // set its marker visible
        } else {
            document.getElementById("gerplayer_1").style.visibility = "hidden"; // set its marker hidden
        }
    }

    document.getElementById("germany_player_2").style.left = all_equipe[3].coureurs[1].position.coord_x + "px"; // german 2 coordinates
    document.getElementById("germany_player_2").style.top = all_equipe[3].coureurs[1].position.coord_y + "px";
    document.getElementById("gerplayer_2").style.left = all_equipe[3].coureurs[1].position.coord_x + "px"; // german 2 marker coordinates
    document.getElementById("gerplayer_2").style.top = all_equipe[3].coureurs[1].position.coord_y + "px";
    if (all_equipe[3].coureurs[1].position.coord_x != 888 && all_equipe[3].coureurs[1].position.coord_y != 888){
        document.getElementById("germany_player_2").style.visibility = "visible"; // set the player visible
        if(all_equipe[current_equip].nom == "Allemagne"){
            document.getElementById("gerplayer_2").style.visibility = "visible"; // set its marker visible
        } else {
            document.getElementById("gerplayer_2").style.visibility = "hidden"; // set its marker hidden
        }
    }

    document.getElementById("germany_player_3").style.left = all_equipe[3].coureurs[2].position.coord_x + "px"; // german 3 coordinates
    document.getElementById("germany_player_3").style.top = all_equipe[3].coureurs[2].position.coord_y + "px";
    document.getElementById("gerplayer_3").style.left = all_equipe[3].coureurs[2].position.coord_x + "px"; // german 3 marker coordinates
    document.getElementById("gerplayer_3").style.top = all_equipe[3].coureurs[2].position.coord_y + "px";
    if (all_equipe[3].coureurs[2].position.coord_x != 888 && all_equipe[3].coureurs[2].position.coord_y != 888){
        document.getElementById("germany_player_3").style.visibility = "visible"; // set the player visible
        if(all_equipe[current_equip].nom == "Allemagne"){
            document.getElementById("gerplayer_3").style.visibility = "visible"; // set its marker visible
        } else {
            document.getElementById("gerplayer_3").style.visibility = "hidden"; // set its marker hidden
        }
    }


    document.getElementById("netherlands_player_1").style.left = all_equipe[2].coureurs[0].position.coord_x + "px"; // dutch 1 coordinates
    document.getElementById("netherlands_player_1").style.top = all_equipe[2].coureurs[0].position.coord_y + "px";
    document.getElementById("nedplayer_1").style.left = all_equipe[2].coureurs[0].position.coord_x + "px"; // dutch 1 marker coordinates
    document.getElementById("nedplayer_1").style.top = all_equipe[2].coureurs[0].position.coord_y + "px";
    if (all_equipe[2].coureurs[0].position.coord_x != 888 && all_equipe[2].coureurs[0].position.coord_y != 888){
        document.getElementById("netherlands_player_1").style.visibility = "visible"; // set the player visible
        if(all_equipe[current_equip].nom == "Hollande"){
            document.getElementById("nedplayer_1").style.visibility = "visible"; // set its marker visible
        } else {
            document.getElementById("nedplayer_1").style.visibility = "hidden"; // set its marker hidden
        }
    }
    
    document.getElementById("netherlands_player_2").style.left = all_equipe[2].coureurs[1].position.coord_x + "px"; // dutch 2 coordinates
    document.getElementById("netherlands_player_2").style.top = all_equipe[2].coureurs[1].position.coord_y + "px";
    document.getElementById("nedplayer_2").style.left = all_equipe[2].coureurs[1].position.coord_x + "px"; // dutch 2 marker coordinates
    document.getElementById("nedplayer_2").style.top = all_equipe[2].coureurs[1].position.coord_y + "px";
    if (all_equipe[2].coureurs[1].position.coord_x != 888 && all_equipe[2].coureurs[1].position.coord_y != 888){
        document.getElementById("netherlands_player_2").style.visibility = "visible"; // set the player visible
        if(all_equipe[current_equip].nom == "Hollande"){
            document.getElementById("nedplayer_2").style.visibility = "visible"; // set its marker visible
        } else{
            document.getElementById("nedplayer_2").style.visibility = "hidden"; // set its marker hidden
        }
    }
    
    document.getElementById("netherlands_player_3").style.left = all_equipe[2].coureurs[2].position.coord_x + "px"; // ducth 3 coordinates
    document.getElementById("netherlands_player_3").style.top = all_equipe[2].coureurs[2].position.coord_y + "px";
    document.getElementById("nedplayer_3").style.left = all_equipe[2].coureurs[2].position.coord_x + "px"; // dutch 3 marker coordinates
    document.getElementById("nedplayer_3").style.top = all_equipe[2].coureurs[2].position.coord_y + "px";
    if (all_equipe[2].coureurs[2].position.coord_x != 888 && all_equipe[2].coureurs[2].position.coord_y != 888){
        document.getElementById("netherlands_player_3").style.visibility = "visible"; // set the player visible
        if(all_equipe[current_equip].nom == "Hollande"){
            document.getElementById("nedplayer_3").style.visibility = "visible"; // set its marker visible
        } else{
            document.getElementById("nedplayer_3").style.visibility = "hidden"; // set its marker hidden
        }
    }


    document.getElementById("italy_player_1").style.left = all_equipe[1].coureurs[0].position.coord_x + "px"; // italian 1 coordinates
    document.getElementById("italy_player_1").style.top = all_equipe[1].coureurs[0].position.coord_y + "px";
    document.getElementById("itaplayer_1").style.left = all_equipe[1].coureurs[0].position.coord_x + "px"; // italian 1 marker coordinates
    document.getElementById("itaplayer_1").style.top = all_equipe[1].coureurs[0].position.coord_y + "px";
    if (all_equipe[1].coureurs[0].position.coord_x != 888 && all_equipe[1].coureurs[0].position.coord_y != 888){
        document.getElementById("italy_player_1").style.visibility = "visible"; // set the player visible
        if(all_equipe[current_equip].nom === "Italie"){
            document.getElementById("itaplayer_1").style.visibility = "visible"; // set its marker visible
        } else {
            document.getElementById("itaplayer_1").style.visibility = "hidden"; // set its marker hidden
        }
    }

    document.getElementById("italy_player_2").style.left = all_equipe[1].coureurs[1].position.coord_x + "px"; // italian 2 coordinates
    document.getElementById("italy_player_2").style.top = all_equipe[1].coureurs[1].position.coord_y + "px";
    document.getElementById("itaplayer_2").style.left = all_equipe[1].coureurs[1].position.coord_x + "px"; // italian 2 marker coordinates
    document.getElementById("itaplayer_2").style.top = all_equipe[1].coureurs[1].position.coord_y + "px";
    if (all_equipe[1].coureurs[1].position.coord_x != 888 && all_equipe[1].coureurs[1].position.coord_y != 888){
        document.getElementById("italy_player_2").style.visibility = "visible"; // set the player visible
        if(all_equipe[current_equip].nom == "Italie"){
            document.getElementById("itaplayer_2").style.visibility = "visible"; // set its marker visible
        } else {
            document.getElementById("itaplayer_2").style.visibility = "hidden"; // set its marker hidden
        }
    }

    document.getElementById("italy_player_3").style.left = all_equipe[1].coureurs[2].position.coord_x + "px"; // ttalian 3 coordinates
    document.getElementById("italy_player_3").style.top = all_equipe[1].coureurs[2].position.coord_y + "px";
    document.getElementById("itaplayer_3").style.left = all_equipe[1].coureurs[2].position.coord_x + "px"; // italian 3 marker coordinates
    document.getElementById("itaplayer_3").style.top = all_equipe[1].coureurs[2].position.coord_y + "px";
    if (all_equipe[1].coureurs[2].position.coord_x != 888 && all_equipe[1].coureurs[2].position.coord_y != 888){
        document.getElementById("italy_player_3").style.visibility = "visible"; // set the player visible
        if(all_equipe[current_equip].nom == "Italie"){
            document.getElementById("itaplayer_3").style.visibility = "visible"; // set its marker visible
        } else {
            document.getElementById("itaplayer_3").style.visibility = "hidden"; // set its marker hidden
        }
    }

}
