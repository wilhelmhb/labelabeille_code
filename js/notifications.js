/**
 * make phone vibrate
 * @integer duration : duration of vibration in ms
 */
function vibrateNotification(duration) {
    navigator.notification.vibrate(duration);
}
/**
 * make a sound 
 * @integer duration : duration of the sound in ms
 */
function beepNotification(duration) {
    navigator.notification.beep(duration);
}
/**
 * display results of prompt
 * @Object results : object containing results of prompt, and choosed button
 */
function onPrompt(results) {
    alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
}
/** 
 * display a prompt in a pop-up
 */
function promptNotification() {
	console.log(navigator);
	console.log(navigator.notification);
    navigator.notification.prompt(
        'Please enter your name',  // message
        onPrompt,                  // callback function
        'Registration',            // title
        ['Ok','Exit']              // buttons
    );
}
/**
 * dismiss the pop-up
 */
function alertDismissed() {
    console.log('fin de l\'alert');
}
/**
 * display a pop-up 
 */
function alertNotification() {
	navigator.notification.alert(
	    'You are the winner!',  // message
	    alertDismissed,         // callback
	    'Game Over',            // title
	    'Done'                  // button
	);
}

/**
 * what to do on confirm
 */
function onConfirm(buttonIndex) {
    alert('You selected button ' + buttonIndex);
}

/** 
 * display a confirmation pop-up
 */
function confirmNotification() {
    navigator.notification.confirm(
        'You are the winner! Confirm',  // message
        onConfirm,              // callback, takes the index of the pressed button as argument
        'Game Over',            // title
        'Restart,Exit'          // buttons
    );
}

/**
 * display notification on task bar
 */
function pushNotification() {
	console.log("push");
	cordova.plugins.notification.local.schedule({
	    id: 1,
	    title: "Titre",
	    text: "Le texte qui s'affiche en dessous du titre",
	    badge: 0,
	    sound: "res://platform_default",
	    data: { donnees: "à afficher au format JSON" },
	    //Android only
	    icon: "url de l'icône",
        led: "FF0000", //color of lightning
	});
	//for further details : https://github.com/katzer/cordova-plugin-local-notifications/
}
