function vibrateNotification() {
    navigator.notification.vibrate(1000);
}
function beepNotification() {
    navigator.notification.beep(300);
}
//process the promp dialog results
function onPrompt(results) {
    alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
}
// Show a custom prompt dialog
function promptNotification() {
	console.log(navigator);
	console.log(navigator.notification);
    navigator.notification.prompt(
        'Please enter your name',  // message
        onPrompt,                  // callback to invoke
        'Registration',            // title
        ['Ok','Exit']              // buttonLabels
    );
}
function alertDismissed() {
    console.log('fin de l\'alert');
}
function alertNotification() {
	navigator.notification.alert(
	    'You are the winner!',  // message
	    alertDismissed,         // callback
	    'Game Over',            // title
	    'Done'                  // buttonName
	);
}
//process the confirmation dialog result
function onConfirm(buttonIndex) {
    alert('You selected button ' + buttonIndex);
}
// Show a custom confirmation dialog
function confirmNotification() {
    navigator.notification.confirm(
        'You are the winner! Confirm',  // message
        onConfirm,              // callback to invoke with index of button pressed
        'Game Over',            // title
        'Restart,Exit'          // buttonLabels
    );
}
function pushNotification() {
	console.log("push");
	cordova.plugins.notification.local.schedule({
	    id: 1,
	    title: "Production Jour fixe",
	    text: "Duration 1h"
	});
}
