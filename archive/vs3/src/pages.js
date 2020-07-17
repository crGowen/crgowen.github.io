/*
$mic_btn = <img src="img/record-icon.svg" ondragstart="return false">
$caution_icon = <img src="img/caution-icon.svg" ondragstart="return false">
$qr_code = <img src="img/qrcode.png" id="QR" ondragstart="return false">
$play_icon = <img src="img/play-icon.svg" ondragstart="return false">
$proceed_icon = <img src="img/proceed-icon.svg" ondragstart="return false">
$revert_icon = <img src="img/revert-icon.svg" ondragstart="return false">

$iOSbtn = <a href=iOSbtnLink><button id="iOS-btn">iOSbtnText</button></a>
*/

function fillVars(str) {
   str = str.replace("$mic_btn", `<img src="./img/record-icon.svg" ondragstart="return false">`);
   str = str.replace("$caution_icon", `<img src="./img/caution-icon.svg" ondragstart="return false">`);
   str = str.replace("$play_icon", `<img src="./img/play-icon.svg" ondragstart="return false">`);
   str = str.replace("$proceed_icon", `<img src="./img/proceed-icon.svg" ondragstart="return false">`);
   str = str.replace("$revert_icon", `<img src="./img/revert-icon.svg" ondragstart="return false">`);

   return str;
}

locTextWelcome = fillVars(locTextWelcome);
locTextPleaseAllow = fillVars(locTextPleaseAllow);
locTextErrPopupMobile = fillVars(locTextErrPopupMobile);
locTextErrPopupDesktop = fillVars(locTextErrPopupDesktop);
locTextErrPopupChrIOS = fillVars(locTextErrPopupChrIOS);
locTextReadyToRec = fillVars(locTextReadyToRec);
locTextPress = fillVars(locTextPress);
locTextGetReady = fillVars(locTextGetReady);
locTextRecBeginsIn = fillVars(locTextRecBeginsIn);
locTextYouNowRec = fillVars(locTextYouNowRec);
locTextMaxRecLength = fillVars(locTextMaxRecLength);
locTextSeconds = fillVars(locTextSeconds);
locTextToPlaybackYourMsg = fillVars(locTextToPlaybackYourMsg);
locTextPlaybackSub = fillVars(locTextPlaybackSub);
locTextPleaseLeaveDetails = fillVars(locTextPleaseLeaveDetails);
locTextFName = fillVars(locTextFName);
locTextEmail = fillVars(locTextEmail);
locTextPhone = fillVars(locTextPhone);
locTextSubmitBtn = fillVars(locTextSubmitBtn);
locTextMailing = fillVars(locTextMailing);
locTextPrivConsent = fillVars(locTextPrivConsent);
locTextThanks1 = fillVars(locTextThanks1);
locTextThanks2 = fillVars(locTextThanks2);
locTextThanks3 = fillVars(locTextThanks3);
locTextYou = fillVars(locTextYou);
locTextAfew = fillVars(locTextAfew);
locTextFBtn = fillVars(locTextFBtn);

var recordingPage = `<h2 id="record-page-text"></h2>
<p id="sub-title"></p>
<div id="waveform">
</div>
<div id="progress-bar"><div id="progress-fill"></div></div><div id="max-recording-length"></div>
<div id="button-line"></div>`;

var lockAnim = `<img src="img/lock-anim.svg" ondragstart="return false" class="no-pointer">`;

var unlockAnim = `<img src="img/unlock-anim.svg" ondragstart="return false" class="no-pointer">`;

var recordBtn = `<img src="img/record-icon.svg" ondragstart="return false" onclick="beginRecording()">`;

var stopBtn = `<img src="img/stop-icon.svg" ondragstart="return false" onclick="stopRecording()">`;

var playbackBtns = `<img src="img/revert-icon.svg" ondragstart="return false" onclick="revert()">
<img id="mediaBtn" src="img/play-icon.svg" ondragstart="return false" onclick="playClip()">
<img src="img/proceed-icon.svg" ondragstart="return false" onclick="proceed()">`;

var contactDetPage = `<h2>` + locTextPleaseLeaveDetails + `</h2>
<input class="app-input-field" id="name-input" type="text" name="fName" maxlength="25" placeholder="`+ locTextFName +`">
<input class="app-input-field" id="email-input" type="text" name="email" maxlength="40" placeholder="`+ locTextEmail +`">
<input class="app-input-field" id="phone-input" type="text" name="phonenumber" maxlength="14" placeholder="`+ locTextPhone +`">

<div id="checkbox-container">
   <div class="form-app-radio" id="unselectedC" onclick="selectCheckBoxConsent()"></div>` + locTextMailing + `</div>
<button id="submit-btn" onclick="thanks()">`+ locTextSubmitBtn +`</button>
<p class="v-smallprint"> `+ locTextPrivConsent +`</p>`;

var endPage = `<img id="final-tick" src="img/tick-anim.svg" ondragstart="return false" class="no-pointer"> <h2 class="center kill-wspace">`+ locTextThanks1 +`</h2>
<p class="center">`+ locTextThanks2 +`</p>

<div id="final-msgbar"><div id="msgbar-text"><strong>`+locTextYou+`</strong> | `+locTextAfew+`</div>
</div>
<audio controls id="def-player">
</audio>
<button id="final-btn" onclick="(function(){window.location.href='https://tredact.io/home';})()">`+locTextFBtn+`</button>`;
