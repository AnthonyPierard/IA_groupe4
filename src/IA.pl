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

joueur([belgique,Position,Case]).
joueur([italie,Position,Case]).
joueur([allemagne,Position,Case]).
joueur([hollande,Position,Case]).

% [[belgique,0,0],[belgique,1,0],[belgique,2,0],[Allemagne,0,0],[Allemagne,1,0],[Allemagne,2,0],
    [Italie,0,0],[Italie,1,0],[Italie,2,0],[Hollande,0,0],[Hollande,1,0],[Hollande,2,0]].

% [[12,9,9,5,1],[10,10,6,2,2],[12,8,8,7,5],[12,10,9,8,2]].

% joueur courant.

bigger(Joueur,Etat,Etat2) :-

best(Joueur,Etat,Etat2).

carte([S|Ss]).

defineMaxCarte([S1,S2|Ss]) :- ,defineMaxCarte(Ss).

use_card([Card|Deck], [Deck]).
%-----------------------------------%


















