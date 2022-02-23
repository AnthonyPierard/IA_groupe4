#Exo2.1
meuble(bois, m1).
portes(m1).
planches(m1).
vitres(m1).
vert(m1).

table(X) :- meuble_rigide(X), pieds(4, X), planche(longue, X).
fauteuil(X) :- meuble(normal, X), pieds(4, X), dossier(X).
armoire(X) :- meuble(rigide, X), portes(X), planches(X), vitres(X).
meuble_rigide(X) :- meuble(bois, X).
meuble_rigide(X) :- meuble(acier, X).


aime(jules, pomme).
aime(sarah, carotte).
aime(olivier, orange).
fruit(pomme).
legume(carotte).

bonneSante(Personne,Aliment) :- fruit(Aliment), aime(Personne,Aliment).

