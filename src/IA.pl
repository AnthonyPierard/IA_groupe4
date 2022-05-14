%--------------Base de connaissances----------------%
case(1,3).
case(2,3).
case(3,3).
case(4,3).
case(5,3).
case(6,3).
case(7,3).
case(8,3).
case(9,3).
case(10,3).
case(11,2).
case(12,2).
case(13,2).
case(14,2).
case(15,2).
case(16,2).
case(17,2).
case(18,2).
case(19,3).
case(20,3).
case(21,3).
case(22,2).
case(23,2).
case(24,2).
case(25,2).
case(26,2).
case(27,2).
case(28,2).
case(29,2).
case(30,2).
case(31,2).
case(32,2).
case(33,2).
case(34,2).
case(35,2).
case(36,2).
case(37,2).
case(38,2).
case(39,2).
case(40,2).
case(41,2).
case(42,2).
case(43,2).
case(44,2).
case(45,2).
case(46,2).
case(47,2).
case(48,2).
case(49,2).
case(50,2).
case(51,2).
case(52,2).
case(53,2).
case(54,2).
case(55,2).
case(56,2).
case(57,2).
case(58,2).
case(59,2).
case(60,2).
case(61,2).
case(62,3).
case(63,3).
case(64,2).
case(65,2).
case(66,2).
case(67,2).
case(68,2).
case(69,2).
case(70,2).
case(71,2).
case(72,1).
case(73,1).
case(74,1).
case(75,2).
case(76,2).
case(77,2).
case(78,2).
case(79,2).
case(80,2).
case(81,2).
case(82,2).
case(83,1).
case(84,1).
case(85,1).
case(86,1).
case(87,1).
case(88,1).
case(89,1).
case(90,1).
case(91,1).
case(92,1).
case(93,1).
case(94,3).
case(95,3).
case(96,3).
case(97,3).
case(98,3).
case(99,3).
case(100,3).
case(101,3).
case(102,3).
case(103,3).
case(104,3).
case(105,3).

indice(belgique,0).
indice(italie,1).
indice(hollande,2).
indice(allemagne,3).

% 'Exemple de liste "Joueurs"'
% [[belgique,0,0],[belgique,1,0],[belgique,2,0],[allemagne,0,0],[allemagne,1,0],[allemagne,2,0],
%  [italie,0,0],[italie,1,0],[italie,2,0],[hollande,0,0],[hollande,1,0],[hollande,2,0]].

% 'Un joueur se défini donc comme [Equipe,Numero,Position]'

% 'Exemple de liste "Cards"'
% [[12,9,9,5,1],[10,10,6,2,2],[12,8,8,7,5],[12,10,9,8,2]].


% 'Min-Max encore a modifier(Points dans le cas récursif)'
minMax(Cards, [[],[],[],[]], [Joueur|Joueurs], Joueurs2, Card) :- nth0(0,Joueur,Equipe), nth0(1,Joueur,Numero), 
                                                                    indice(Equipe,Ind), nth0(Ind,Cards, Ecards), Ecards = [Card],
                                                                    useCard(Equipe, Numero, Card, [Joueur|Joueurs], Joueurs2),
                                                                    delCard(Equipe,Card,Cards,[[],[],[],[]]).
                                                
minMax(Cards, Cards2, Joueurs, Joueurs2, Choix) :- Joueurs = [Joueur|Jreste], nth0(0,Joueur, Equipe), nth0(1,Joueur,Numero),
                                                    indice(Equipe, Ind), nth0(Ind,Cards,Ecards), Ecards = [Card|Rcard],

                                                    minMax(Rcard,Cardstemp,Jreste,Joueurstemp,_),

% 'Choisis le meilleur choix de carte'
% 'La liste de cartes correspond à aux cartes de l\'équipe et pas l\'ensemble de toutes les cartes'
best(Equipe,Numero,[Card],Joueurs,Card, Points) :- useCard(Equipe,Numero,Card,Joueurs,Joueurs2), calculState(Equipe,Joueurs2,Points).
best(Equipe, Numero, [Card|Rcard], Joueurs, Card,Points) :- best(Equipe, Numero, Rcard, Joueurs, _, Temppoints), 
                                                        useCard(Equipe, Numero, Card, Joueurs, Newjoueurs), 
                                                        calculState(Equipe,Newjoueurs,Points), 
                                                        Temppoints >= Points.
best(Equipe, Numero, [Card|Rcard], Joueurs, Best, Points) :- best(Equipe, Numero, Rcard, Joueurs, Best, Points), 
                                                        useCard(Equipe, Numero, Card, Joueurs, Newjoueurs), 
                                                        calculState(Equipe,Newjoueurs,Temppoints), 
                                                        Temppoints > Points.

% 'Renvoie l\'etat après avoir utilisé une carte'
useCard(_,_,_,[],[]).
useCard(Equipe, Numero, Card, [Joueur|Joueurs], Newjoueurs) :- nth0(0,Joueur,Ekip), Equipe == Ekip, nth0(1,Joueur,Num), Numero == Num, useCard(Equipe, Numero, Card, Joueurs, NewjoueursTemp), nth0(2,Joueur,Case), NewCase is Case+Card, addJoueur(Ekip,Num, NewCase, NewjoueursTemp, Newjoueurs).
useCard(Equipe, Numero, Card, [Joueur|Joueurs], Newjoueurs) :- nth0(0,Joueur,Ekip), Equipe \== Ekip, nth0(1,Joueur,Num), Numero \== Num, useCard(Equipe, Numero, Card, Joueurs, NewjoueursTemp), nth0(2,Joueur,Case), addJoueur(Ekip,Num,Case,NewjoueursTemp, Newjoueurs).
useCard(Equipe, Numero, Card, [Joueur|Joueurs], Newjoueurs) :- nth0(0,Joueur,Ekip), Equipe \== Ekip, nth0(1,Joueur,Num), Numero == Num, useCard(Equipe, Numero, Card, Joueurs, NewjoueursTemp), nth0(2,Joueur,Case), addJoueur(Ekip,Num,Case,NewjoueursTemp, Newjoueurs).
useCard(Equipe, Numero, Card, [Joueur|Joueurs], Newjoueurs) :- nth0(0,Joueur,Ekip), Equipe == Ekip, nth0(1,Joueur,Num), Numero \== Num, useCard(Equipe, Numero, Card, Joueurs, NewjoueursTemp), nth0(2,Joueur,Case), addJoueur(Ekip,Num,Case,NewjoueursTemp, Newjoueurs).

% 'Supprime une carte de la liste des cartes'
delCard(Equipe, Card, Cards, Cards2) :- indice(Equipe, Ind), nth0(Ind, Cards, Ecards), once(select(Card, Ecards,Ncards)), replace(Ind,Cards,Ncards,Cards2).

% 'Remplace un élément d\'une liste à un indice donné'
replace(Index, List, Element, Result) :-
  nth0(Index, List, _, Transfer),
  nth0(Index, Result, Element, Transfer).

% 'Ajoute un joueur dans une liste de joueur et le positionne de manière décroissante par rapport à sa position sur le plateau'
addJoueur(Equipe,Numero,Case,[],[[Equipe,Numero,Case]]).
addJoueur(Equipe,Numero,Case,[Joueur|Joueurs], [[Equipe,Numero,Case],Joueur|Joueurs]) :- nth0(2,Joueur,Case2), Case >= Case2.
addJoueur(Equipe,Numero,Case,[Joueur|Joueurs], Joueurs2) :- nth0(2,Joueur,Case2), Case < Case2, addJoueur(Equipe,Numero,Case,Joueurs,JoueursTemp), append([Joueur],JoueursTemp,Joueurs2).

% 'Calcule les points d\'un état en appelant différentes fonctions de points'
calculState(Equipe,Joueurs,Points) :- position(Equipe, Joueurs, Points).

% 'Fonction de points par rapport aux numéros de case'
position(_,[],0).
position(Equipe,[Joueur|Joueurs],Points) :- nth0(0,Joueur,Ekip), Equipe == Ekip, position(Equipe,Joueurs,Points2), nth0(2,Joueur,Case), Points is Points2 - Case.
position(Equipe,[Joueur|Joueurs],Points) :- nth0(0,Joueur,Ekip), Equipe \== Ekip, position(Equipe,Joueurs,Points2), nth0(2,Joueur,Case), Points is Points2 + Case.


%-----------------------------------%