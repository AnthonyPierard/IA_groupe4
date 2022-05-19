%--------------Base de connaissances----------------%
case(0,12).
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


% 'Min-Max permettant de générer les différents états possibles'
minMax([],[[],[],[],[]], [Joueur|_], Joueurs, Joueurs, Points, _) :- nth0(0,Joueur,Equipe),
                                                                      calculState(Equipe, Joueurs, Points).

minMax([], Cards, [Joueur|Rjoueurs], Joueurs, Joueurs2, Points, _) :- nth0(0,Joueur,Equipe),
                                                                      best(Cards, Rjoueurs, Joueurs, Joueurs2, _, _),
                                                                      calculState(Equipe, Joueurs2, Points).

minMax(_, Cards, [], [Joueur|Joueurs], [Joueur|Joueurs], Points, _) :- nth0(0,Joueur,Equipe),
                                                                        calculState(Equipe, [Joueur|Joueurs], Points).

minMax([Card], Cards, [Joueur|Rjoueurs], Joueurs,  Joueurs2, Points, Card) :-
                                                            nth0(0,Joueur,Equipe), nth0(1,Joueur,Numero), 
                                                            useCard(Equipe, Numero, Card, Joueurs, NewJoueurs),
                                                            delCard(Equipe,Card,Cards,Cards2),
                                                            best(Cards2, Rjoueurs, NewJoueurs, Joueurs2, Points, _).

minMax([Card|Rcards], Cards, [Joueur|Rjoueurs], Joueurs, Joueurs2, Points, Card) :- 
                                                            Rcards \== [], nth0(0,Joueur,Equipe), nth0(1,Joueur,Numero),
                                                            useCard(Equipe, Numero, Card, Joueurs, Newjoueurs),
                                                            delCard(Equipe,Card,Cards,Cards2),
                                                            best(Cards2, Rjoueurs, Newjoueurs, Joueurs2, _, _),
                                                            calculState(Equipe, Joueurs2, Points),
                                                            minMax(Rcards,Cards,[Joueur|Rjoueurs],Joueurs,JoueursTemp,_,_),
                                                            calculState(Equipe, JoueursTemp, PointsTemp),
                                                            Points < PointsTemp.

minMax([Card|Rcards], Cards, [Joueur|Rjoueurs], Joueurs, JoueursTemp, PointsTemp, CardTemp) :-
                                                            Rcards \== [], nth0(0,Joueur,Equipe), nth0(1,Joueur,Numero),
                                                            useCard(Equipe, Numero, Card, Joueurs, Newjoueurs),
                                                            delCard(Equipe,Card,Cards,Cards2),
                                                            best(Cards2, Rjoueurs, Newjoueurs, Joueurs2, _, _),
                                                            calculState(Equipe, Joueurs2, Points),
                                                            minMax(Rcards,Cards,[Joueur|Rjoueurs],Joueurs,JoueursTemp,_,CardTemp),
                                                            calculState(Equipe, JoueursTemp, PointsTemp),
                                                            Points >= PointsTemp.

% 'Permet d\'appeler minMax et renvoie la carte à utiliser pour le joueur actuel'
best(Cards, [Joueur|Rjoueurs], Joueurs, Joueurs2, Points, Card) :- nth0(0,Joueur,Equipe),
                                                                    indice(Equipe,Ind), nth0(Ind,Cards,Ecards),
                                                                    minMax(Ecards, Cards, [Joueur|Rjoueurs], Joueurs, Joueurs2, Points, Card).

best(Cards, [], Joueurs, Joueurs, Points, Card) :- minMax(_, Cards, [], Joueurs, Joueurs, Points, Card).


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

% 'Calcule le nombre de personnes sur une case'
joueursCase([], _, 0).
joueursCase([Joueur|Joueurs], Case, Nombre) :- nth0(2,Joueur,CaseJoueur), joueursCase(Joueurs,Case,NombreTemp), CaseJoueur == Case, Nombre is 1 + NombreTemp.
joueursCase([Joueur|Joueurs], Case, Nombre) :- nth0(2,Joueur,CaseJoueur), joueursCase(Joueurs,Case,NombreTemp), CaseJoueur \== Case, Nombre is 0 + NombreTemp.

% 'Calcule les points d\'un état en appelant différentes fonctions de points'
calculState(Equipe,Joueurs,Points) :- position(Equipe, Joueurs, Points1), bonus(Equipe,Joueurs,Points2), chute(Equipe,Joueurs,Joueurs,Points3), Points is Points1+Points2+Points3.

% 'Fonction de points par rapport aux numéros de case'
position(_,[],0).
position(Equipe,[Joueur|Joueurs],Points) :- nth0(0,Joueur,Ekip), Equipe == Ekip, position(Equipe,Joueurs,PointsTemp), nth0(2,Joueur,Case), Points is PointsTemp - Case.
position(Equipe,[Joueur|Joueurs],Points) :- nth0(0,Joueur,Ekip), Equipe \== Ekip, position(Equipe,Joueurs,PointsTemp), nth0(2,Joueur,Case), Points is PointsTemp + Case.

% 'Fonction de points par rapport aux bonus de sprint + cases finales'
bonus(_,[],0).
bonus(Equipe,[Joueur|Joueurs],Points) :- nth0(0,Joueur,Ekip), Equipe == Ekip, nth0(2,Joueur,Case), Case < 22, 
                                          bonus(Equipe,Joueurs,PointsTemp), Points is 0 + PointsTemp.
bonus(Equipe,[Joueur|Joueurs],Points) :- nth0(0,Joueur,Ekip), Equipe == Ekip, nth0(2,Joueur,Case), Case >= 22, Case < 36, 
                                          bonus(Equipe,Joueurs,PointsTemp), Points is -2 + PointsTemp.
bonus(Equipe,[Joueur|Joueurs],Points) :- nth0(0,Joueur,Ekip), Equipe == Ekip, nth0(2,Joueur,Case), Case >= 36, Case < 76, 
                                          bonus(Equipe,Joueurs,PointsTemp), Points is -4 + PointsTemp.
bonus(Equipe,[Joueur|Joueurs],Points) :- nth0(0,Joueur,Ekip), Equipe == Ekip, nth0(2,Joueur,Case), Case >= 76, Case < 96, 
                                          bonus(Equipe,Joueurs,PointsTemp), Points is -6 + PointsTemp.
bonus(Equipe,[Joueur|Joueurs],Points) :- nth0(0,Joueur,Ekip), Equipe == Ekip, nth0(2,Joueur,Case), Case == 96, 
                                          bonus(Equipe,Joueurs,PointsTemp), Points is -10 + PointsTemp.
bonus(Equipe,[Joueur|Joueurs],Points) :- nth0(0,Joueur,Ekip), Equipe == Ekip, nth0(2,Joueur,Case), Case == 97, 
                                          bonus(Equipe,Joueurs,PointsTemp), Points is -11 + PointsTemp.
bonus(Equipe,[Joueur|Joueurs],Points) :- nth0(0,Joueur,Ekip), Equipe == Ekip, nth0(2,Joueur,Case), Case == 98, 
                                          bonus(Equipe,Joueurs,PointsTemp), Points is -12 + PointsTemp.
bonus(Equipe,[Joueur|Joueurs],Points) :- nth0(0,Joueur,Ekip), Equipe == Ekip, nth0(2,Joueur,Case), Case == 99, 
                                          bonus(Equipe,Joueurs,PointsTemp), Points is -13 + PointsTemp.
bonus(Equipe,[Joueur|Joueurs],Points) :- nth0(0,Joueur,Ekip), Equipe == Ekip, nth0(2,Joueur,Case), Case == 100, 
                                          bonus(Equipe,Joueurs,PointsTemp), Points is -14 + PointsTemp.
bonus(Equipe,[Joueur|Joueurs],Points) :- nth0(0,Joueur,Ekip), Equipe == Ekip, nth0(2,Joueur,Case), Case == 101, 
                                          bonus(Equipe,Joueurs,PointsTemp), Points is -15 + PointsTemp.
bonus(Equipe,[Joueur|Joueurs],Points) :- nth0(0,Joueur,Ekip), Equipe == Ekip, nth0(2,Joueur,Case), Case == 102, 
                                          bonus(Equipe,Joueurs,PointsTemp), Points is -16 + PointsTemp.
bonus(Equipe,[Joueur|Joueurs],Points) :- nth0(0,Joueur,Ekip), Equipe == Ekip, nth0(2,Joueur,Case), Case == 103, 
                                          bonus(Equipe,Joueurs,PointsTemp), Points is -17 + PointsTemp.
bonus(Equipe,[Joueur|Joueurs],Points) :- nth0(0,Joueur,Ekip), Equipe == Ekip, nth0(2,Joueur,Case), Case == 104, 
                                          bonus(Equipe,Joueurs,PointsTemp), Points is -18 + PointsTemp.
bonus(Equipe,[Joueur|Joueurs],Points) :- nth0(0,Joueur,Ekip), Equipe == Ekip, nth0(2,Joueur,Case), Case == 105, 
                                          bonus(Equipe,Joueurs,PointsTemp), Points is -19 + PointsTemp.
bonus(Equipe,[Joueur|Joueurs],Points) :- nth0(0,Joueur,Ekip), Equipe \== Ekip, bonus(Equipe,Joueurs,Points).

% 'Fonction de points par rapport aux chutes en série'
chute(_,[],_,0).
chute(Equipe,[Joueur|Rjoueurs],Joueurs,Points) :- nth0(0,Joueur,Ekip), Equipe == Ekip, nth0(2,Joueur,Case),
                                                          joueursCase(Joueurs,Case,Nombrejoueurs),
                                                          case(Case,Nombreplaces), Nombreplaces < Nombrejoueurs,
                                                          chute(Equipe, Rjoueurs, Joueurs,PointsTemp), 
                                                          Points is 10 + PointsTemp. 
chute(Equipe,[Joueur|Rjoueurs],Joueurs,Points) :- nth0(0,Joueur,Ekip), Equipe == Ekip, nth0(2,Joueur,Case),
                                                          joueursCase(Joueurs,Case,Nombrejoueurs),
                                                          case(Case,Nombreplaces), Nombreplaces >= Nombrejoueurs,
                                                          chute(Equipe, Rjoueurs, Joueurs,Points). 
chute(Equipe,[Joueur|Rjoueurs],Joueurs,Points) :- nth0(0,Joueur,Ekip), Equipe \== Ekip, chute(Equipe, Rjoueurs, Joueurs,Points).


%-----------------------------------%
