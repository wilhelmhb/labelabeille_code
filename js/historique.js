//HISTORIQUE
function formatDate(date) {
    var formattedDate = new Date(date);
    var d = formattedDate.getDate();
    var m =  formattedDate.getMonth();
    m += 1;  // JavaScript months are 0-11
    m = twoDigits(m);
    d = twoDigits(d);
    var y = formattedDate.getFullYear();
    return d + "/" + m + "/" + y;
}

function twoDigits(n) {
    if(n < 10) {
        return "0" + n;
    }
    return n;
}

function goToHistorique(){
	//Marche seulement en mode test pour l'instant
	getCustomNotesForHive(function(data) {
	    console.log("CustomNote récupérée");
	    customNotesSetByUser = data;
        var notes = [];
        for(var i in customNotesSetByUser) {
            console.log(customNotesSetByUser[i]);
            var note = customNotesSetByUser[i];
            for(var j in customNotesCreatedByUser) {
                if(customNotesCreatedByUser[j].id == note.id_custom_note) {
                    note.data = customNotesCreatedByUser[j];
                }
            }
            notes.push(note);
        };
        getDefaultNotesForHive(function(data) {
            var defaultNotesSetByUser = data;
            for(var i in defaultNotesSetByUser) {
                console.log(defaultNotesSetByUser[i]);
                var note = defaultNotesSetByUser[i];
                for(var j in defaultNotes) {
                    if(defaultNotes[j].id == note.id_default_note) {
                        note.data = defaultNotes[j];
                    }
                }
                notes.push(note);
            };
            historique = {"notes" : notes};
            var template = $(templates).filter('#tpl-historique').html();
            /*console.log(listHives.ruches.length);
            console.log(JSON.stringify(listHives)); 
            console.log(listHives.ruches[0].name);*/
            console.log(historique);
            var h = Mustache.render(template, historique);
            document.getElementById("content-historique").innerHTML = h;
            //console.log('goToGeneralParameters : before transition');
            transition(_("phistorique"), "slide");
            $("#ajouter_note_historique").click(
	            function(){
		            ajouterNote();
	            }
            );
            details_histo(1);
        });
	});
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
function ajouterNote() {
	var template = $(templates).filter('#tpl-ajoutnote').html();
	/* choose hivegroup and hive
	for(var i = 0; i< test.hives.length; i++) {
		test.hives[i].selected="";
	    if(i == idHive) {
			test.hives[i].selected="selected";
	    }
	}
	for(var i = 0; i< test.hivegroups.length; i++) {
		test.hivegroups[i].selected="";
	    if(i == idHiveGroup) {
			test.hivegroups[i].selected="selected";
	    }
	}
	var dataRuches={
		"ruchers":test.hivegroups,
		"ruches":test.hives
	}
	console.log(dataRuches);*/
	dataRuches = {"notes" : customNotesCreatedByUser};
	
  	var h = Mustache.render(template, dataRuches);
    document.getElementById("content-ajout-note").innerHTML = h;
    transition(_("pajoutnote"), "");
    $("form").on("submit", function(e){
        e.preventDefault();
        console.log($(this));
        console.log($(this).attr('id'));
        addCustomNoteToHive($(this).attr('id'));
	});
}
