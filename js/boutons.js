function activerBoutons(){
    switch(slider.currentPageName){
        case "pajoutnote":
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
            break;
            
            
            
            
            
        case "phistorique":
            $("#ajouter_note_historique").click(function(){
                                                ajouterNote();
                                                });
            break;
            
            

            
            
        default: break;
    }
}