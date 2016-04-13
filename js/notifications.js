/* fonction pour faire vibrer le téléphone */
function vibrateNotification() {
    navigator.notification.vibrate(1000); // durée de la vibration en ms
}
/* fonction pour faire un bip */
function beepNotification() {
    navigator.notification.beep(300); // durée du bip en ms
}
/* fonction pour afficher une pop-up */
function onPrompt(results) {
    alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
}
/* fonction pour afficher une pop-up te permettant d'écrire des trucs */
function promptNotification() {
	console.log(navigator);
	console.log(navigator.notification);
    navigator.notification.prompt(
        'Please enter your name',  // message
        onPrompt,                  // fonction de callback
        'Registration',            // titre
        ['Ok','Exit']              // boutons
    );
}
function alertDismissed() {
    console.log('fin de l\'alert');
}
/* fonction pour afficher une pop-up */
function alertNotification() {
	navigator.notification.alert(
	    'You are the winner!',  // message
	    alertDismissed,         // callback
	    'Game Over',            // titre
	    'Done'                  // bouton
	);
}


function onConfirm(buttonIndex) {
    alert('You selected button ' + buttonIndex);
}

/* fonction pour afficher une pop-up de confirmation */
function confirmNotification() {
    navigator.notification.confirm(
        'You are the winner! Confirm',  // message
        onConfirm,              // fonction de callback qui prend l'indice du bouton pressé en argument
        'Game Over',            // titre
        'Restart,Exit'          // boutons
    );
}

/* fonction pour afficher une notification dans la barre de tâches */
function pushNotification() {
	console.log("push");
	cordova.plugins.notification.local.schedule({
	    id: 1,
	    title: "Titre",
	    text: "Le texte qui s'affiche en dessous du titre",
	    badge: 0,
	    sound: "res://platform_default",
	    data: { donnees: "à afficher au format JSON" },
	    //Android uniquement
	    icon: "url de l'icône",
        led: "FF0000",// couleur de clignotement de la lumière
	});
	// pour plus de détails : https://github.com/katzer/cordova-plugin-local-notifications/
}
