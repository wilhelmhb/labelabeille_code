//HISTORIQUE
function goToHistorique(){
	//Marche seulement en mode test pour l'instant
	
	var historique = {"notes" : [
		{"id":1, "important":"", "titre" : "Titre de la note","date":"05/03/16","sous_titre":"Sous titre","infos":["Ligne d'information 1","Ligne d'information 2","Ligne d'information 3"]},
		{"id":2, "important":"", "titre" : "Titre de la note","date":"05/03/16","sous_titre":"Sous titre","infos":["Ligne d'information 1","Ligne d'information 2","Ligne d'information 3"]},
		{"id":3, "important":"", "titre" : "Titre de la note","date":"05/03/16","sous_titre":"Sous titre","infos":["Ligne d'information 1","Ligne d'information 2","Ligne d'information 3"]},
		{"id":4, "important":"histo_important", "titre" : "Titre de la note","date":"05/03/16","sous_titre":"Sous titre","infos":["Ligne d'information 1","Ligne d'information 2","Ligne d'information 3"]},
		{"id":5, "important":"", "titre" : "Titre de la note","date":"05/03/16","sous_titre":"Sous titre","infos":["Ligne d'information 1","Ligne d'information 2","Ligne d'information 3"]},
		{"id":6, "important":"", "titre" : "Titre de la note","date":"05/03/16","sous_titre":"Sous titre","infos":["Ligne d'information 1","Ligne d'information 2","Ligne d'information 3"]},
		{"id":7, "important":"", "titre" : "Titre de la note","date":"05/03/16","sous_titre":"Sous titre","infos":["Ligne d'information 1","Ligne d'information 2","Ligne d'information 3"]},
		{"id":8, "important":"", "titre" : "Titre de la note","date":"05/03/16","sous_titre":"Sous titre","infos":["Ligne d'information 1","Ligne d'information 2","Ligne d'information 3"]},
		{"id":9, "important":"", "titre" : "Titre de la note","date":"05/03/16","sous_titre":"Sous titre","infos":["Ligne d'information 1","Ligne d'information 2","Ligne d'information 3"]},
		{"id":10, "important":"", "titre" : "Titre de la note","date":"05/03/16","sous_titre":"Sous titre","infos":["Ligne d'information 1","Ligne d'information 2","Ligne d'information 3"]},
		{"id":11, "important":"", "titre" : "Titre de la note","date":"05/03/16","sous_titre":"Sous titre","infos":["Ligne d'information 1","Ligne d'information 2","Ligne d'information 3"]},
		{"id":12, "important":"", "titre" : "Titre de la note","date":"05/03/16","sous_titre":"Sous titre","infos":["Ligne d'information 1","Ligne d'information 2","Ligne d'information 3"]},
		{"id":13, "important":"", "titre" : "Titre de la note","date":"05/03/16","sous_titre":"Sous titre","infos":["Ligne d'information 1","Ligne d'information 2","Ligne d'information 3"]}
	]};
	//
	var template = $(templates).filter('#tpl-historique').html();
	/*console.log(listHives.ruches.length);
	console.log(JSON.stringify(listHives)); 
	console.log(listHives.ruches[0].name);*/
    var h = Mustache.render(template, historique);
    document.getElementById("content-historique").innerHTML = h;
    //console.log('goToGeneralParameters : before transition');
    transition(_("phistorique"), "slide");
	details_histo(1);
}
var selectHisto=1;
function details_histo(nouveau){
    _('details_histo_'+selectHisto).style.display='none';
    $(_('fleche_'+selectHisto)).attr('src','img/histo_fleche_droite.png');
    selectHisto=nouveau;
    _('details_histo_'+selectHisto).style.display='block';
    $(_('fleche_'+selectHisto)).attr('src','img/histo_fleche_bas.png');
}
function supprimer_histo(id){
	//
}
