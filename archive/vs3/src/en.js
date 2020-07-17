/*
$mic_btn = img/mic-btn.svg
$caution_icon = img/caution-icon.svg
$qr_code = img/qrcode.png
$play_icon = img/play-icon.svg
$proceed_icon = img/proceed-icon.svg
$revert_icon = img/revert-icon.svg

$iOSbtn = REQUIRED: DO NOT REMOVE
*/


var locTextWelcome = `<h2>Start recording your voice message by clicking on $mic_btn below</h2>
<p>Your browser may prompt you to activate your microphone</p>`;


var locTextPleaseAllow = "Please allow microphone access to continue";

var locTextErrPopupMobile = `$caution_icon<h2>WE CAN'T CONNECT<br>TO YOUR MICROPHONE</h2><p>Please check that recording permissions have been granted in your browser.</p>`;

var locTextErrPopupDesktop = `$caution_icon<h2>WE CAN'T CONNECT<br>TO YOUR MICROPHONE</h2><p>Please check whether you have a microphone plugged in, and that recording permissions have been granted in your browser.</p><p>If your desktop computer does not have a microphone, you can scan the QR code below to launch this page on your phone.</p>$qr_code`;

var locTextErrPopupChrIOS = `$caution_icon<h2>PLEASE OPEN THIS PAGE IN SAFARI</h2><p>On iOS, only Safari supports in-browser voice recording.</p><p>Tap and hold the button below, select "copy link URL" from the pop-up menu, and paste the link into Safari.</p><p>See you soon!</p>$iOSbtn`;
var iOSbtnText = "TAP AND HOLD TO COPY LINK";
var iOSbtnLink = "https://crgowen.github.io/vsv3";

var locTextReadyToRec = `All set to go!`;
var locTextPress = `click $mic_btn to begin recording`;

var locTextGetReady = "Get ready...";
var locTextRecBeginsIn = "";

var locTextYouNowRec = "You are now recording!";
var locTextMaxRecLength = "Max recording length:";
var locTextSeconds = "seconds"

var locTextToPlaybackYourMsg = `click $play_icon to playback<br>your message`;
var locTextPlaybackSub = `click $proceed_icon if you are happy with it<br>click $revert_icon to record again`;

var locTextPleaseLeaveDetails = "Please leave us a few details so we can reply to you";

var locTextFName = "First name (optional)";
var locTextEmail = "Email (optional)";
var locTextPhone = "Phone number (optional)";
var locTextSubmitBtn = "SEND MESSAGE";
var locTextMailing = "Add me to the mailing list";
var locTextPrivConsent = `By clicking on "`+locTextSubmitBtn+ `" you give us permission to<br>download, listen, and reply to your voice message`;

var locTextThanks1 = "Thank you";
var locTextThanks2 = "Message received!<br>We'll reply as soon as possible";
var locTextThanks3 = "";

var locTextYou = "You";
var locTextAfew  = "a few seconds ago";
var locTextFBtn = "Take me to tredact"

var locTextPoweredBytredact = `<p><a href="https://tredact.io" rel="noopener noreferrer" target="_blank" >powered by tredact<img src="img/tredact-logo.svg" ondragstart="return false"></a></p>`;
