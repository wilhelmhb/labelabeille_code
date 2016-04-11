var xhr = null;
function creer_element_xhr() {
	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} 
			catch(e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} 
		else {
			xhr = new XMLHttpRequest();
		}
	}
	else {
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	};
	return xhr;
};
function envoi_donnees(pagetraitement,donnees,callback) {
	xhr=annule_requete_precedente(xhr);
	xhr=null;
	xhr=creer_element_xhr();
	xhr.onreadystatechange=function() {
		if ((xhr.readyState==4)&&((xhr.status==0)||(xhr.status==200))) {
			callback(xhr.responseText);
		}
	};
	xhr.open("POST",pagetraitement, true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send(donnees);
};
function annule_requete_precedente() {
	if ((xhr!=null)&&(xhr.readyState!=0)) {
		try {
			xhr.abort();
		}
		catch(err) {
			alert(err.message);
		};
	}
	return xhr;
};
function recuperer_donnees_ruches(utilisateur) {
	/* envoi_donnees est une fonction d'AJAX 
	 * qui envoie une requete à page_traitement 
	 * avec les données donnees
	 */
	envoi_donnees(page_traitement, donnees, function(response) {
		return response;
	});
};
/* vérifie qu'une entrée de formulaire ne contient que des caractères autorisés, et entre 3 et 50 caractères */
function entree_valide_js(entree) {
	return entree.match('^[a-zA-Z0-9_]{3,50}$');
};
function traitement_connexion(login, mdp) {
	if (!entree_valide_js(login)) {
		/* afficher le message d'erreur */
		return false;
	}
	else {
		if (!entree_valide_js(mdp)) {
			/* afficher le message d'erreur */
			return false;
		}
		else {
			return true;
		}
	};
};
function traitement_modification_nom(nom) {
	if (!entree_valide_js(login)) {
		/* afficher le message d'erreur */
		return false;
	}
	else {
		return true;
	}
};
