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
    return d + "/" + M + "/" + y + " " + h + ":" + m + ":" + s;
}

function twoDigits(n) {
    if(n < 10) {
        return "0" + n;
    }
    return n;
}

function goToHistorique(){
	//Marche seulement en mode test pour l'instant
	var idx = 0;
	getCustomNotesForHive(function(data) {
	    console.log("CustomNote récupérée");
	    customNotesSetByUser = data;
	    /* structure of one note : { id: 24, id_custom_note: 2, id_hive: 22, date_add: "07/05/2016 20:26:00" } */
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
            /* structure of one note :  { id: 10, id_default_note: 2, id_hive: 22, date_add: "07/05/2016 21:00:00", id_customer: 23 } */
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
            notes.sort(function(a, b) {
                if (a.date_add < b.date_add) return 1;
                if (a.date_add > b.date_add) return -1;
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
	dataRuches = {
	    "custom_notes" : customNotesCreatedByUser,
	    "default_notes" : defaultNotes
	};
	
  	var h = Mustache.render(template, dataRuches);
    document.getElementById("content-ajout-note").innerHTML = h;
    transition(_("pajoutnote"), "");
    $("form").on("submit", function(e) {
        e.preventDefault();
        if($(this).attr('type') == "default") {
            addDefaultNoteToHive($(this).attr('id'));
        }
        else {
            addCustomNoteToHive($(this).attr('id'));
        }
	});
	$("#add_custom_note").on("click", function(e) {
	    e.preventDefault();
	    $("form").off("submit");
	    goToAddCustomNote();
	});
}

function goToAddCustomNote() {
    transition(_("pajoutnotepersonnalisee"));
    $("#form-add-custom-note").submit(function(e) {
        e.preventDefault();
        var data = $(this).serialize();
        addCustomNote(data);
    });
}
