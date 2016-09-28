//HISTORIQUE
function formatDate(date) {
    date=date.substr(0,date.length-4)+"02:00";
    console.log("date "+toTimestamp(convertISO8601toDate(date)));
    var formattedDate = new Date( (toTimestamp(convertISO8601toDate(date))-7200)*1000);
    console.log(formattedDate);
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
var nNotes;
function goToHistorique(id){//Si id est passé en argument; on affiche que les notes associée à cette ruche
    id = typeof id !== 'undefined' ?  id : -1;
	var idx = 0;
	if(isTest) {
	    defaultNotes = testDefaultNotes;
	    defaultNotesUser = testDefaultNotesSetByUser;
	    customNotesCreatedByUser = testCustomNotesCreatedByUser;
	    customNotesSetByUser = testCustomNotesSetByUser;
	    afficherNotes(defaultNotesUser, idHive);
	}
	else {
        charge();
        if(id>-1){
            getCustomNotesForHive(function(a) {
                getDefaultNotesForHive(afficherNotes, a);
            }, id);
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
    if(nouveau==0){
        while($("#details_histo_"+nouveau).length==0)nouveau++;
        
    }
    
    _('details_histo_'+selectHisto).style.display='none';
    $(_('fleche_'+selectHisto)).attr('src','img/histo_fleche_droite.png');
    selectHisto=nouveau;
    _('details_histo_'+selectHisto).style.display='block';
    $(_('fleche_'+selectHisto)).attr('src','img/histo_fleche_bas.png');
}
var notes;
function afficherNotes(data, indexHive){
    finCharge();
    nNotes=0;
    notes=[];
    /* structure of one note : { id: 24, id_custom_note: 2, id_hive: 22, date_add: "07/05/2016 20:26:00" } */
    
    for(var i in data) {
        console.log(data[i]);
        var note = data[i];
        for(var j in defaultNotes) {
            if(defaultNotes[j].id == note.id_default_note) {

                note.data = defaultNotes[j];
            }
        }
        if(note.date_add.indexOf("NaN")!=-1)note.date_add="Date inconnue";
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
        if(note.date_add.indexOf("NaN")!=-1)note.date_add="Date inconnue";
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
    console.log(notes);
    nNotes=notes.length;
    historique = {
       "notes" : notes
    };
    var template = $(templates).filter('#tpl-historique').html();

    console.log(historique);
    console.log(template);
    var h = Mustache.render(template, historique);
    console.log(h);
    document.getElementById("content-historique").innerHTML = h;

    transition(_("phistorique"), "slide");
    if(indexHive != null) {
        idHive = indexHive;
    }
    console.log(idHive);
    console.log(donneesRuches.hivegroups[idHiveGroup].hives[idHive].name);
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
    console.log(customNotesCreatedByUser);
  	var h = Mustache.render(template, dataRuches);
    document.getElementById("content-ajout-note").innerHTML = h;

    transition(_("pajoutnote"), "");
    
    $(".dlcnote").click(function(e){
                      
                      idCn=this.id.substr(4);
                      deleteCustomNote(idCn);
                      });
    
    $("#sous_titre_ajoutnote").children("h1").html(donneesRuches.hivegroups[idHiveGroup].hives[idHive].name);
}

function goToAddCustomNote() {
    transition(_("pajoutnotepersonnalisee"));
    

    var f=function(e) {
        $("#add_new_custom_note").off("click");
        e.preventDefault();
        var data = $("#form-add-custom-note").serialize();
        console.log(data);
        addCustomNote(data);};
    
    
    $("#add_new_custom_note").on("click", f);
}
function supprimerNote(index){
    nNotes--;
    if(index==selectHisto){if(nNotes>0){details_histo(0);}}
    $("#details_histo_"+index).remove();
    $("#histo_"+index).remove();
}
function supprimer_histo(id,isDefault,index) {
    if(isDefault) {
        deleteDefaultNoteForHive(id,index);
    }
    else {
        deleteCustomNoteForHive(id,index);
    }
}

//FIX SAFARI DATES
function convertISO8601toDate(dtstr) {
    
    // replace anything but numbers by spaces
    dtstr = dtstr.replace(/\D/g," ");
    
    // trim any hanging white space
    dtstr = dtstr.replace(/\s+$/,"");
    
    // split on space
    var dtcomps = dtstr.split(" ");
    
    // not all ISO 8601 dates can convert, as is
    // unless month and date specified, invalid
    if (dtcomps.length < 3) return "invalid date";
    // if time not provided, set to zero
    if (dtcomps.length < 4) {
        dtcomps[3] = 0;
        dtcomps[4] = 0;
        dtcomps[5] = 0;
    }
    
    // modify month between 1 based ISO 8601 and zero based Date
    dtcomps[1]--;
    
    var convdt = new
    Date(Date.UTC(dtcomps[0],dtcomps[1],dtcomps[2],dtcomps[3],dtcomps[4],dtcomps[5]));
    
    return convdt.toUTCString();
}
function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
}
