function activerBoutons(){
    switch(slider.currentPageName){
        case "pajoutnote":
            $("form").on("submit", function(e) {$(this).off("submit");
                         
                         e.preventDefault();
                         if($(this).attr('type') == "default") {
                         addDefaultNoteToHive($(this).attr('id'));
                         }
                         else {
                         addCustomNoteToHive($(this).attr('id'));
                         }
                         });
            $("#add_custom_note").on("click", function(e) {$(this).off("click");
                                     e.preventDefault();
                                     $("form").off("submit");
                                     goToAddCustomNote();
                                     });
            break;
            
            
            
            
            
        case "phistorique":
            $("#ajouter_note_historique").click(function(){
                                                ajouterNote();
                                                });
            break;
            
            
        case "pdetails":
            $("#parametresDetails").off("click");
            $("#parametresDetails").click(goToHiveParameters);
            $("#historiqueDetails").off("click");
            $("#historiqueDetails").click(function(){goToHistorique(dataHive.id_hive);});
            $("#courbesDetails").off("click");
            $("#courbesDetails").click(function(){goToGraphs(dataHive.id_hive,dataHive.name);});
            $("#ajouter_note_details").off("click");
            $("#ajouter_note_details").click(ajouterNote);
            break;
            
        case "pparametres-ruche":
            $("#form-params-hive").find(".bouton").click(submitParamsHive);
            
            $("#goToSeuils").on("submit",function(e) {
                                e.preventDefault();goToHiveSeuils();});
            break;
        
            
        default: break;
            
        
    }
}