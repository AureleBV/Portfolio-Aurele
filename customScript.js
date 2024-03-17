async function afficherArbre() {
    const reponse = await fetch("veille.json");
    var arbre = await reponse.json();
    arbre = JSON.stringify(arbre);
    loadData(JSON.parse(arbre));
}
document.addEventListener("DOMContentLoaded", function (){
    afficherArbre()
},false)
