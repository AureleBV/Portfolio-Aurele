var texte = document.getElementById("text")
var csv = "https://developer.mozilla.org/fr/docs/Learn;site;21\n" +
    "https://www.net-concept.fr/developpement-web/le-developpement-web-cest-quoi/;Développeur;22\n" +
    "https://www.ynov.com/definition/developpement-objet;Langage;5\n" +
    "https://www.ynov.com/definition/developpement-objet;Informatique;13\n" +
    "https://www.ynov.com/definition/developpement-objet;application;5\n" +
    "https://www.ynov.com/definition/developpement-objet;Logiciel;6\n" +
    "https://www.ionos.fr/digitalguide/hebergement/aspects-techniques/bases-de-donnees-orientees-objet/;classes;5\n" +
    "https://www.ionos.fr/digitalguide/hebergement/aspects-techniques/bases-de-donnees-orientees-objet/;Données;60\n" +
    "https://www.lebigdata.fr/programmation-orientee-objet#:~:text=Aussi%20appel%C3%A9e%20%C2%BB%20OOP%20%C2%BB%20(object,donn%C3%A9es%20ou%20des%20%C2%BB%20objets%20%C2%AB%20.;programmation orientée objet;16\n" +
    "https://www.oracle.com/fr/database/what-is-database/#:~:text=Une%20base%20de%20donn%C3%A9es%20est,base%20de%20donn%C3%A9es%20(DBMS).;NoSql;5\n" +
    "https://www.oracle.com/fr/database/what-is-database/#:~:text=Une%20base%20de%20donn%C3%A9es%20est,base%20de%20donn%C3%A9es%20(DBMS).;Cloud;19\n" +
    "https://www.oracle.com/fr/database/what-is-database/#:~:text=Une%20base%20de%20donn%C3%A9es%20est,base%20de%20donn%C3%A9es%20(DBMS).;pilotage automatique;6\n" +
    "https://www.oracle.com/fr/database/what-is-database/#:~:text=Une%20base%20de%20donn%C3%A9es%20est,base%20de%20donn%C3%A9es%20(DBMS).;DBMS;7"
function test(){
    var lignes = csv.split('\n');
    var i=0;
    var liens = {};
    while (i<lignes.length){
        var ligneactuelle = lignes[i].split(";");
        var lienactuelle = ligneactuelle[0]
        var vocactuelle = {
            "nom" : ligneactuelle[1],
            "occurence" : ligneactuelle[2]
        }
        if (liens[lienactuelle] === undefined){
            liens[lienactuelle] = []
        }
        liens[lienactuelle].push(vocactuelle)
        i++
    }
    generateJson(liens, i)
}
function generateJson (liens, nbvocabulaire){
    var json = {
        "displayName": "Veille technologique",
            "skills": [],
            "xOffset": 119.4179649207424,
            "yOffset": 46.45332473418142,
            "scale": 0.6302494097246091
    }
    var premiernoeud = {
        "icon": "",
        "id": 0,
        "name": "vocabulaire",
        "parents": [],
        "childs": [],
        "fillColor": "#007bff",
        "posX": 500,
        "posY": 0
    }
    var Xtotal = 200*nbvocabulaire;
    var Xactuelle = 500-Xtotal/2;

    var id = 0
    for (var lienactuelle in liens){
        var vocabulaires = liens[lienactuelle]
        var largeurLien = 200*vocabulaires.length
        var noeudlien = {
            "icon": "",
            "id": id+1,
            "name": lienactuelle,
            "parents": [{"id" : 0}],
            "childs": [],
            "fillColor": "#007bff",
            "posX": (Xactuelle+largeurLien/2 == 0)?1: Xactuelle+largeurLien/2,
            "posY": 300
        }
        var noeudLienId = {
            "id" : id+1
        }
        premiernoeud["childs"].push(noeudLienId)
        id = id+1
        for (var i = 0; i<vocabulaires.length; i++){
            var noeudnom = {
                "icon": "",
                "id": id+i*2+1,
                "name": vocabulaires[i]["nom"],
                "parents": [{"id" : id}],
                "childs": [
                {
                    "id": id+i*2+2
                }
                ],
                "fillColor": "#007bff",
                "posX": (Xactuelle+i*200 == 0)?1:Xactuelle+i*200,
                "posY": 600
            }
            var noeudoccurence = {
                "icon": "",
                "id": id+i*2+2,
                "name": vocabulaires[i]["occurence"],
                "parents": [{"id" : id+i*2+1}],
                "childs": [
                ],
                "fillColor": "#007bff",
                "posX": (Xactuelle+i*200 == 0)?1:Xactuelle+i*200,
                "posY": 800
            }
            json["skills"].push(noeudnom, noeudoccurence)
            var noeudNomId = {
                "id" : id+i*2+1
            }
            noeudlien["childs"].push(noeudNomId)
        }
        id = id+vocabulaires.length*2
        Xactuelle += largeurLien
        json["skills"].push(noeudlien)
    }
    json["skills"].push(premiernoeud)
    var jsonString = JSON.stringify(json)
    texte.innerHTML = jsonString
}
