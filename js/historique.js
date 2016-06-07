//HISTORIQUE
function formatDate(date) {
    var formattedDate = new Date(date);
    var d = formattedDate.getDate();
    var M =  formattedDate.getMonth();
    M += 1;  // JavaScript months are 0-11
    M = twoDigits(M);
    d = twoDigits(d);
    var y = formattedDate.getFullYear();
    var h = twoDigits(formattedDate.getHours());
    var m = twoDigits(formattedDate.getMinutes());
    var s = twoDigits(formattedDate.getSeconds());
    var ms = twoDigits(formattedDate.getMilliseconds());
    return {'add' : d + "/" + M + "/" + y + " " + h + ":" + m + ":" + s , 'compare' : y + "/" + M + "/" + d + " " + h + ":" + m + ":" + s + "," + ms };
}

function twoDigits(n) {
    if(n < 10) {
        return "0" + n;
    }
    return n;
}

function goToHistorique(idHive){//Si idHive est passé en argument; on affiche que les notes associée à cette ruche
    idHive = typeof idHive !== 'undefined' ?  idHive : -1;
	var idx = 0;
	if(isTest) {
	    defaultNotes = testDefaultNotes;
	    defaultNotesUser = testDefaultNotesSetByUser;
	    customNotesCreatedByUser = testCustomNotesCreatedByUser;
	    customNotesSetByUser = testCustomNotesSetByUser;
	    afficherNotes(defaultNotesUser, idHive);
	}
	else {
        if(idHive>-1){
            getCustomNotesForHive(function() {
                console.log("Fin de getCustomNotesForHive : " + idHive);
                getDefaultNotesForHive(afficherNotes, idHive);
            }, idHive);
        }
        else{
            getCustomNotes(function() {
                getDefaultNotes(afficherNotes);
            });
        }
    }    
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
function afficherNotes(data, indexHive){
    console.log("CustomNote récupérée : " + indexHive);
    console.log("Etat de la mémoire : ");
    console.log(data);
    console.log(customNotesSetByUser);
    console.log(customNotesCreatedByUser);
    /* structure of one note : { id: 24, id_custom_note: 2, id_hive: 22, date_add: "07/05/2016 20:26:00" } */
    var notes = [];
    for(var i in data) {
        console.log(data[i]);
        var note = data[i];
        for(var j in defaultNotes) {
            if(defaultNotes[j].id == note.id_default_note) {
                note.data = defaultNotes[j];
            }
        }
        notes.push(note);
    };
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
    notes.sort(function(a, b) {
        if (a.date_compare < b.date_compare) return 1;
        if (a.date_compare > b.date_compare) return -1;
        if (a.id < b.id) return 1;
        if (a.id > b.id) return -1;
        return 0;
    });
    for (idx in notes) {
       notes[idx] = {'index': (parseInt(idx)+1), 'note': notes[idx]};
    }
    historique = {
       "notes" : notes
    };
    var template = $(templates).filter('#tpl-historique').html();
    /*console.log(listHives.ruches.length);
     console.log(JSON.stringify(listHives));
     console.log(listHives.ruches[0].name);*/
    console.log(historique);
    var h = Mustache.render(template, historique);
    document.getElementById("content-historique").innerHTML = h;
    //console.log('goToGeneralParameters : before transition');
    transition(_("phistorique"), "slide");
    idHive = indexHive;
    console.log(idHive);
    if(idHive!=-1)$("#sous_titre_histo").children("h1").html(donneesRuches.hivegroups[idHiveGroup].hives[idHive].name);
    else $("#sous_titre_histo").children("h1").html("Toutes les ruches");
    
    if(notes.length)details_histo(1);
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
	dataRuches = {
	    "custom_notes" : customNotesCreatedByUser,
	    "default_notes" : defaultNotes
	};
	
  	var h = Mustache.render(template, dataRuches);
    document.getElementById("content-ajout-note").innerHTML = h;
    transition(_("pajoutnote"), "");
    
    $("#sous_titre_ajoutnote").children("h1").html(donneesRuches.hivegroups[idHiveGroup].hives[idHive].name);
}

function goToAddCustomNote() {
    transition(_("pajoutnotepersonnalisee"));
    

    var f=function(e) {
        e.preventDefault();
        var data = $("#form-add-custom-note").serialize();
        console.log(data);
        addCustomNote(data);};
    
    
    $("#add_new_custom_note").on("click", f);
}

function supprimer_histo(id, isDefault) {
    if(isDefault) {
        deleteDefaultNoteForHive(id);
    }
    else {
        deleteCustomNoteForHive(id);
    }
}
