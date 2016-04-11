$(function() {
		console.log("test");
        function onDeviceReady() {
        	console.log("Device ready");
        	$("#prompt").on(evtclick,function() {console.log('ok');promptNotification()});
        	$("#alert").on(evtclick,alertNotification);
        	$("#confirm").on(evtclick,confirmNotification);
        	$("#push").on(evtclick,pushNotification);
        	$("#beep").on(evtclick,beepNotification);
        	$("#vibrate").on(evtclick,vibrateNotification);
        	//$("prompt").on(evtclick,promptNotification);
        }
        document.addEventListener("deviceready", onDeviceReady, false);
});