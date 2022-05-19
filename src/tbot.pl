% INSTRUCTIONS
% =swipl tbot.pl=
% =start_server.=
%
% Then navigate to http://localhost:3000 in your browser

:- module(echo_server,
  [ start_server/0,
    stop_server/0
  ]
).

:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_files)).
:- use_module(library(http/websocket)).

:- http_handler(root(.),
                http_reply_from_files('.', []),
                [prefix]).

:- http_handler(root(echo),
                http_upgrade_to_websocket(echo, []),
                [spawn([])]).

start_server :-
    default_port(Port),
    start_server(Port).
start_server(Port) :-
    http_server(http_dispatch, [port(Port)]).

stop_server() :-
    default_port(Port),
    stop_server(Port).
stop_server(Port) :-
    http_stop_server(Port, []).

default_port(3000).

echo(WebSocket) :-
    ws_receive(WebSocket, Message, [format(json)]),
    ( Message.opcode == close
    -> true
    ; get_response(Message.data, Response),
      write("Response: "), writeln(Response),
      ws_send(WebSocket, json(Response)),
      echo(WebSocket)
    ).

get_response(Message, Response) :-
  get_time(Time),

  string_codes(Message.message, String),
  clean_string(String,Cleanstring),
  extract_atomics(Cleanstring,ListOfAtomics),
  produire_reponse(ListOfAtomics,L_ligne_reponse),
  flatten(L_ligne_reponse,ListRep),
  atomic_list_concat(ListRep, StringRep),
  Response = _{message:StringRep, time: Time}.


:- use_module(library(lists)).
/* --------------------------------------------------------------------- */
/*                                                                       */
/*        PRODUIRE_REPONSE(L_Mots,L_Lignes_reponse) :                    */
/*                                                                       */
/*        Input : une liste de mots L_Mots representant la question      */
/*                de l'utilisateur                                       */
/*        Output : une liste de liste de mots correspondant a la         */
/*                 reponse fournie par le bot                            */
/*                                                                       */
/*        NB Pour l'instant le predicat retourne dans tous les cas       */
/*            [  [je, ne, sais, pas, '.'],                               */
/*               [les, etudiants, vont, m, '\'', aider, '.'],            */
/*               ['vous le verrez !']                                    */
/*            ]                                                          */
/*                                                                       */
/*        Je ne doute pas que ce sera le cas ! Et vous souhaite autant   */
/*        d'amusement a coder le predicat que j'ai eu a ecrire           */
/*        cet enonce et ce squelette de solution !                       */
/*                                                                       */
/*        J.-M. Jacquet, janvier 2022                                    */
/*                                                                       */
/* --------------------------------------------------------------------- */


/*                      !!!    A MODIFIER   !!!                          */

produire_reponse([fin],[L1]) :-
   L1 = [merci, de, m, '\'', avoir, consulte], !.    

produire_reponse(L,Rep) :-
   mclef(M,_), member(M,L),
   clause(regle_rep(M,_,Pattern,Rep),Body),
   match_pattern(Pattern,L),
   call(Body), !.

produire_reponse(_,[L1,L2, L3]) :-
   L1 = ['Je ne sais pas,'],
   L2 = ['Votre question semble hors de mes capacités.'],
   L3 = ['Pouvez-vous posez une question plus pertinante ?'].

match_pattern(Pattern,Lmots) :-
   sublist(Pattern,Lmots).

match_pattern(LPatterns,Lmots) :-
   match_pattern_dist([100|LPatterns],Lmots).

match_pattern_dist([],_).
match_pattern_dist([N,Pattern|Lpatterns],Lmots) :-
   within_dist(N,Pattern,Lmots,Lmots_rem),
   match_pattern_dist(Lpatterns,Lmots_rem).

within_dist(_,Pattern,Lmots,Lmots_rem) :-
   prefixrem(Pattern,Lmots,Lmots_rem).
within_dist(N,Pattern,[_|Lmots],Lmots_rem) :-
   N > 1, Naux is N-1,
  within_dist(Naux,Pattern,Lmots,Lmots_rem).


sublist(SL,L) :- 
   prefix(SL,L), !.
sublist(SL,[_|T]) :- sublist(SL,T).

sublistrem(SL,L,Lr) :- 
   prefixrem(SL,L,Lr), !.
sublistrem(SL,[_|T],Lr) :- sublistrem(SL,T,Lr).

prefixrem([],L,L).
prefixrem([H|T],[H|L],Lr) :- prefixrem(T,L,Lr).


% ----------------------------------------------------------------%

nb_coureurs(3).
nb_equipes(4).

% ----------------------------------------------------------------%

mclef(Commence,10) :- synonyme(commence,L), member(Commence,L).
mclef(Equipe,5) :- synonyme(equipe,L), member(Equipe,L).
mclef(dynamique,9).
mclef(tour,4).
mclef(depasser,8).
mclef(vitesse,7).
mclef(montee,6).
mclef(descente,8).
mclef(chute,8).
mclef(beau,5).

% ----------------------------------------------------------------%

synonyme(commence, [commence, debute, commencer, debuter]).
synonyme(jeu, [jeu, jeux, partie, parties]).
synonyme(equipe, [equipe, equipes, pays]).
synonyme(coureur, [coureur, coureurs, cycliste, cyclistes]).

% ----------------------------------------------------------------%

regle_rep(Commence,4,
  [ [qui], 1, [Commence] , 2, [Jeu] ],
  [ [ "c'est au joueur ayant la plus haute carte secondes de commencer." ] ]) :- synonyme(jeu,L), member(Jeu,L).


regle_rep(Equipe,5,
  [ [ combien ], 4, [ Coureurs], 5, [ Equipe ] ],
  [ [ "Chaque equipe compte ", X, " coureurs." ] ]) :- synonyme(coureur, L), member(Coureurs, L), nb_coureurs(X).


regle_rep(dynamique,5,
        [  [qui ], 3 , [ Commencer ], 4 , [dynamique] ],
        [ [ "C'est au joueur de tete qui doit commencer la partie dynamique"] ]) :- synonyme(commence, L), member(Commencer,L).

regle_rep(tour,7,
         [ [a],1,[qui],3,[tour],2,[jouer]],
         [["C'est au tour du joueur",X]]):- nb_coureurs(X).  %Need javascript to get which player has to play%

regle_rep(depasser,9,
          [[puis],2,[depasser],3,[au-dessus],3,[groupe],3,[coureurs]],
          ["Oui il est permis de depasser par le bas cote de la route pour autant que le coureur arrive sur une cases non occupee, sinon tous les joueurs apres lui chutent ainsi que les
          joueurs sur la meme case"]).

regle_rep(vitesse,5,
        [[quand],4,[prendre],4,[vitesse]],
        ["Tu peux prendre de la vitesse lorsque tu es au sein du peloton ou lorsqu'un joueur est derriere toi"]).

regle_rep(vitesse,5,
          [[comment],4,[prendre],4,[vitesse]],
          ["La prise de vitesse fonctionne comme suit, tu avances d\'une seconde supplementaire selon la carte seconde jouee"]).

regle_rep(chute,7,
           [[comment],2,[provoquer],3,[chute],3,[serie]],
           ["Pour provoquer une chute en serie, tu dois etre en contact avec un autre coureur si plusieurs joueurs se trouvent sur la meme case"]).


regle_rep(chute,7,
           [[comment],2,[provoquer],3,[chute],3,[serie]],
           ["Pour provoquer une chute en serie, tu dois etre en contact avec un autre coureur si plusieurs joueurs se trouvent sur la meme case"]).

regle_rep(beau,4,
           [ [qui],1,[est],4,[beau]],
           ["Il s'agit de toute evidence de Monsieur Jacquet!"]).

%-----------------------------------------------------------------%

/* --------------------------------------------------------------------- */
/*                                                                       */
/*          CONVERSION D'UNE QUESTION DE L'UTILISATEUR EN                */
/*                        LISTE DE MOTS                                  */
/*                                                                       */
/* --------------------------------------------------------------------- */

% lire_question(L_Mots) 

lire_question(LMots) :- read_atomics(LMots).



/*****************************************************************************/
% my_char_type(+Char,?Type)
%    Char is an ASCII code.
%    Type is whitespace, punctuation, numeric, alphabetic, or special.

my_char_type(46,period) :- !.
my_char_type(X,alphanumeric) :- X >= 65, X =< 90, !.
my_char_type(X,alphanumeric) :- X >= 97, X =< 123, !.
my_char_type(X,alphanumeric) :- X >= 48, X =< 57, !.
my_char_type(X,whitespace) :- X =< 32, !.
my_char_type(X,punctuation) :- X >= 33, X =< 47, !.
my_char_type(X,punctuation) :- X >= 58, X =< 64, !.
my_char_type(X,punctuation) :- X >= 91, X =< 96, !.
my_char_type(X,punctuation) :- X >= 123, X =< 126, !.
my_char_type(_,special).


/*****************************************************************************/
% lower_case(+C,?L)
%   If ASCII code C is an upper-case letter, then L is the
%   corresponding lower-case letter. Otherwise L=C.

lower_case(X,Y) :-
	X >= 65,
	X =< 90,
	Y is X + 32, !.

lower_case(X,X).


/*****************************************************************************/
% read_lc_string(-String)
%  Reads a line of input into String as a list of ASCII codes,
%  with all capital letters changed to lower case.

read_lc_string(String) :-
	get0(FirstChar),
	lower_case(FirstChar,LChar),
	read_lc_string_aux(LChar,String).

read_lc_string_aux(10,[]) :- !.  % end of line

read_lc_string_aux(-1,[]) :- !.  % end of file

read_lc_string_aux(LChar,[LChar|Rest]) :- read_lc_string(Rest).


/*****************************************************************************/
% extract_word(+String,-Rest,-Word) (final version)
%  Extracts the first Word from String; Rest is rest of String.
%  A word is a series of contiguous letters, or a series
%  of contiguous digits, or a single special character.
%  Assumes String does not begin with whitespace.

extract_word([C|Chars],Rest,[C|RestOfWord]) :-
	my_char_type(C,Type),
	extract_word_aux(Type,Chars,Rest,RestOfWord).

extract_word_aux(special,Rest,Rest,[]) :- !.
   % if Char is special, don't read more chars.

extract_word_aux(Type,[C|Chars],Rest,[C|RestOfWord]) :-
	my_char_type(C,Type), !,
	extract_word_aux(Type,Chars,Rest,RestOfWord).

extract_word_aux(_,Rest,Rest,[]).   % if previous clause did not succeed.


/*****************************************************************************/
% remove_initial_blanks(+X,?Y)
%   Removes whitespace characters from the
%   beginning of string X, giving string Y.

remove_initial_blanks([C|Chars],Result) :-
	my_char_type(C,whitespace), !,
	remove_initial_blanks(Chars,Result).

remove_initial_blanks(X,X).   % if previous clause did not succeed.


/*****************************************************************************/
% digit_value(?D,?V)
%  Where D is the ASCII code of a digit,
%  V is the corresponding number.

digit_value(48,0).
digit_value(49,1).
digit_value(50,2).
digit_value(51,3).
digit_value(52,4).
digit_value(53,5).
digit_value(54,6).
digit_value(55,7).
digit_value(56,8).
digit_value(57,9).


/*****************************************************************************/
% string_to_number(+S,-N)
%  Converts string S to the number that it
%  represents, e.g., "234" to 234.
%  Fails if S does not represent a nonnegative integer.

string_to_number(S,N) :-
	string_to_number_aux(S,0,N).

string_to_number_aux([D|Digits],ValueSoFar,Result) :-
	digit_value(D,V),
	NewValueSoFar is 10*ValueSoFar + V,
	string_to_number_aux(Digits,NewValueSoFar,Result).

string_to_number_aux([],Result,Result).


/*****************************************************************************/
% string_to_atomic(+String,-Atomic)
%  Converts String into the atom or number of
%  which it is the written representation.

string_to_atomic([C|Chars],Number) :-
	string_to_number([C|Chars],Number), !.

string_to_atomic(String,Atom) :- name(Atom,String).
  % assuming previous clause failed.


/*****************************************************************************/
% extract_atomics(+String,-ListOfAtomics) (second version)
%  Breaks String up into ListOfAtomics
%  e.g., " abc def  123 " into [abc,def,123].

extract_atomics(String,ListOfAtomics) :-
	remove_initial_blanks(String,NewString),
	extract_atomics_aux(NewString,ListOfAtomics).

extract_atomics_aux([C|Chars],[A|Atomics]) :-
	extract_word([C|Chars],Rest,Word),
	string_to_atomic(Word,A),       % <- this is the only change
	extract_atomics(Rest,Atomics).

extract_atomics_aux([],[]).


/*****************************************************************************/
% clean_string(+String,-Cleanstring)
%  removes all punctuation characters from String and return Cleanstring

clean_string([C|Chars],L) :-
	my_char_type(C,punctuation),
	clean_string(Chars,L), !.
clean_string([C|Chars],[C|L]) :-
	clean_string(Chars,L), !.
clean_string([C|[]],[]) :-
	my_char_type(C,punctuation), !.
clean_string([C|[]],[C]).


/*****************************************************************************/
% read_atomics(-ListOfAtomics)
%  Reads a line of input, removes all punctuation characters, and converts
%  it into a list of atomic terms, e.g., [this,is,an,example].

read_atomics(ListOfAtomics) :-
	read_lc_string(String),
	clean_string(String,Cleanstring),
	extract_atomics(Cleanstring,ListOfAtomics).



/* --------------------------------------------------------------------- */
/*                                                                       */
/*        ECRIRE_REPONSE : ecrit une suite de lignes de texte            */
/*                                                                       */
/* --------------------------------------------------------------------- */

ecrire_reponse(L) :-
   nl, write('TBot :'),
   ecrire_li_reponse(L,1,1).

% ecrire_li_reponse(Ll,M,E)
% input : Ll, liste de listes de mots (tout en minuscules)
%         M, indique si le premier caractere du premier mot de 
%            la premiere ligne doit etre mis en majuscule (1 si oui, 0 si non)
%         E, indique le nombre d'espaces avant ce premier mot 

ecrire_li_reponse([],_,_) :- 
    nl.

ecrire_li_reponse([Li|Lls],Mi,Ei) :- 
   ecrire_ligne(Li,Mi,Ei,Mf),
   ecrire_li_reponse(Lls,Mf,2).

% ecrire_ligne(Li,Mi,Ei,Mf)
% input : Li, liste de mots a ecrire
%         Mi, Ei booleens tels que decrits ci-dessus
% output : Mf, booleen tel que decrit ci-dessus a appliquer 
%          a la ligne suivante, si elle existe

ecrire_ligne([],M,_,M) :- 
   nl.

ecrire_ligne([M|L],Mi,Ei,Mf) :-
   ecrire_mot(M,Mi,Maux,Ei,Eaux),
   ecrire_ligne(L,Maux,Eaux,Mf).

% ecrire_mot(M,B1,B2,E1,E2)
% input : M, le mot a ecrire
%         B1, indique s'il faut une majuscule (1 si oui, 0 si non)
%         E1, indique s'il faut un espace avant le mot (1 si oui, 0 si non)
% output : B2, indique si le mot suivant prend une majuscule
%          E2, indique si le mot suivant doit etre precede d'un espace

ecrire_mot('.',_,1,_,1) :-
   write('. '), !.
ecrire_mot('\'',X,X,_,0) :-
   write('\''), !.
ecrire_mot(',',X,X,E,1) :-
   espace(E), write(','), !.
ecrire_mot(M,0,0,E,1) :-
   espace(E), write(M).
ecrire_mot(M,1,0,E,1) :-
   name(M,[C|L]),
   D is C - 32,
   name(N,[D|L]),
   espace(E), write(N).

espace(0).
espace(N) :- N>0, Nn is N-1, write(' '), espace(Nn).


/* --------------------------------------------------------------------- */
/*                                                                       */
/*                            TEST DE FIN                                */
/*                                                                       */
/* --------------------------------------------------------------------- */

fin(L) :- member(fin,L).


/* --------------------------------------------------------------------- */
/*                                                                       */
/*                         BOUCLE PRINCIPALE                             */
/*                                                                       */
/* --------------------------------------------------------------------- */

tourdefrance :- 

   nl, nl, nl,
   write('Bonjour, je suis TBot, le bot explicateur du Tour de France.'), nl,
   write('En quoi puis-je vous aider ?'), 
   nl, nl, 

   repeat,
      write('Vous : '), ttyflush,
      lire_question(L_Mots),
      produire_reponse(L_Mots,L_ligne_reponse),
      ecrire_reponse(L_ligne_reponse),
   fin(L_Mots), !.
   

/* --------------------------------------------------------------------- */
/*                                                                       */
/*             ACTIVATION DU PROGRAMME APRES COMPILATION                 */
/*                                                                       */
/* --------------------------------------------------------------------- */

%:- tourdefrance.
