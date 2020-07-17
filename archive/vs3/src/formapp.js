var recorder, wavesurfer, micAlreadyAllowed, timeoutController, duration;

var url, bOut, addMailing;

//DEFINE
var beUrl = "REDACTED";

console.log("This application utilises wavesurfer.");
console.warn("A lot of this code has been redacted to remove company identifiers and as such will likely now throw errors and warnings!");

// $new, $id
var $new = (a) => {return document.createElement(a)};
var $id = (a) => {return document.getElementById(a)};

var recordingTimeLimit = 10000; // divide by 1000 for seconds

var waveformHeight;
if(window.innerHeight > window.innerWidth){
    waveformHeight = 380; //mobile
} else {
   waveformHeight = 120; //desktop
}


var linGrad = $new('canvas').getContext('2d').createLinearGradient(0, 0, 0, 200 + waveformHeight);
linGrad.addColorStop(0.4, '#ccf');
linGrad.addColorStop(0.7, '#55b');

window.AudioContext = window.AudioContext || window.webkitAudioContext;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
window.URL = window.URL || window.webkitURL;

var context, silentClip;

function changePlaybackVis(set){
   if (set){
      $id("waveform").style.visibility = "visible";
   } else {
      $id("waveform").style.visibility = "hidden";
   }
}

function checkMic(){
   silentClip = $id("silent-play");
   silentClip.play();
   $id("vredact-app-page").innerHTML = recordingPage;
   micAlreadyAllowed = true;
   changePlaybackVis(false);
    wavesurfer = WaveSurfer.create({
    container: '#waveform',
    barWidth: 4,
    barHeight: 1, // the height of the wave
    barGap: 0, // the optional spacing between bars of the wave, if not provided will be calculated in legacy format
    waveColor: linGrad,
    interact: false,
    plugins: [
      WaveSurfer.microphone.create()
      ]
   });

   wavesurfer.setHeight(waveformHeight);

   wavesurfer.microphone.on('deviceReady', (stream) => {
      var input = wavesurfer.microphone.mediaStreamSource;
      //implement variation of this for MS Edge
      clearTimeout(timeoutController);
       recorder = new Recorder(input);

       if (micAlreadyAllowed){
          beginRecording();
       } else {
          $id("button-line").innerHTML = unlockAnim;
          setTimeout(()=>{
             $id("button-line").innerHTML = recordBtn;
             $id("record-page-text").innerHTML = locTextReadyToRec;
             $id("sub-title").innerHTML = locTextPress;
             var dArrow = $new("img");
             dArrow.src = "img/down-arrow.svg";
             dArrow.id = "down-arrow";
             dArrow.ondragstart = "false";
             $id("vredact-app-page").appendChild(dArrow);
          }, 800);
       }
   });

   wavesurfer.microphone.on('deviceError', (code) => {
       console.error('Device error: ' + code);
       initPopup();
       $id("vredact-app-popup").style.visibility = "visible";
   });

   timeoutController = setTimeout(()=>{
      micAlreadyAllowed = false;
      $id("button-line").innerHTML = lockAnim;
      $id("record-page-text").innerHTML = locTextPleaseAllow;
   }, 150);


   wavesurfer.microphone.start();
}

function recordingCountdown(){
   var tCountdown = $new("h2");
  tCountdown.id = "countdown-text";
  tCountdown.innerHTML = "";
  $id("waveform").parentNode.insertBefore(tCountdown, $id("waveform"));
   $id("record-page-text").innerHTML = locTextGetReady;
   $id("sub-title").innerHTML = locTextRecBeginsIn;
   $id("countdown-text").innerHTML = "3";
   setTimeout(()=>{
      $id("countdown-text").innerHTML = "2";
      setTimeout(()=>{
         $id("countdown-text").innerHTML = "1";
      },950);
   },950);
   $id("button-line").innerHTML = ``;
}

function iterateProgressBar(interval){
   var prog = $id("progress-fill");
   var current = prog.style.width.substring(0, prog.style.width.length-1) / 100;
   current = current*recordingTimeLimit;
   var newV = current + interval;
   newV = (newV/recordingTimeLimit)*100;
   if (newV>=100)
   {
      newV = 100;
      stopRecording();
   }
   //now colour stuff
   var green = 0;
   var red = 0;
   if (newV>50){
      red = 255;
      green = parseInt(((100-newV)/50)*255);
   } else {
      green = 255;
      red = parseInt((newV/50.0)*255);
   }
   prog.style.backgroundColor = "#" + red.toString(16) + green.toString(16) + "00";
   prog.style.width = newV + "%";
}

function beginRecording(){
   if (!micAlreadyAllowed){
      $id("vredact-app-page").removeChild($id("down-arrow"));
      $id("sub-title").innerHTML = "";
   }

   setTimeout(()=>{
      //$id("vredact-app-page").removeChild($id("countdown-text"));
      timeoutController = setInterval(function() {iterateProgressBar(100);}, 100);
      $id("progress-bar").style.visibility = "visible";
      $id("max-recording-length").style.visibility = "visible";
      changePlaybackVis(true);
      $id("record-page-text").innerHTML = locTextYouNowRec;
      $id("sub-title").innerHTML = "";
      $id("max-recording-length").innerHTML = locTextMaxRecLength + " <strong>" + Math.floor(recordingTimeLimit/1000) + " " + locTextSeconds +"</strong>";
      recorder.record();
      $id("button-line").innerHTML = stopBtn;
   }, 50);
}

function beginPlayback(){
   wavesurfer = WaveSurfer.create({
   container: '#waveform',
   barWidth: 4,
   barHeight: 1, // the height of the wave
   barGap: 0,
   waveColor: '#ddd',
   progressColor: linGrad,
   plugins: [
     WaveSurfer.cursor.create({
        showTime: true,
            opacity: 0.6,
            customShowTimeStyle: {
                'background-color': '#000',
                color: '#fff',
                padding: '2px',
                'font-size': '10px'
             }
     })
     ]
  });

  wavesurfer.setHeight(waveformHeight);

  wavesurfer.loadBlob(bOut);
  //wavesurfer.load(url);

   $id("button-line").innerHTML = playbackBtns;
   $id("sub-title").style.visibility = "visible";

   $id("record-page-text").innerHTML = locTextToPlaybackYourMsg;
   $id("sub-title").innerHTML = locTextPlaybackSub;

   wavesurfer.on('pause', ()=>{
    $id("mediaBtn").src="./img/play-icon.svg";
});
}

function stopRecording(){
   clearInterval(timeoutController);
   recorder.stop();
   recorder.exportWAV(function(blob) {
      url = URL.createObjectURL(blob);
      bOut = blob;
      wavesurfer.destroy();
      wavesurfer = "";
      beginPlayback();
      $id("max-recording-length").style.visibility = "hidden";
      $id("progress-bar").style.visibility = "hidden";
   });
}

function playClip(){
   if(wavesurfer.isPlaying()){
      $id("mediaBtn").src="./img/play-icon.svg";
   } else {
      $id("mediaBtn").src="./img/pause-icon.svg";
   }
   wavesurfer.playPause();
}

function revert(){
   wavesurfer.destroy();
   wavesurfer = "";
   $id("vredact-app-page").innerHTML = recordingPage;

   changePlaybackVis(false);
    wavesurfer = WaveSurfer.create({
    container: '#waveform',
    barWidth: 4,
    barHeight: 1, // the height of the wave
    barGap: 0, // the optional spacing between bars of the wave, if not provided will be calculated in legacy format
    waveColor: linGrad,
    interact: false,
    cursorWidth: 0,
    plugins: [
      WaveSurfer.microphone.create()
      ]
   });

   micAlreadyAllowed = false;

   wavesurfer.setHeight(waveformHeight);

   wavesurfer.microphone.on('deviceReady', (stream) => {
      var input = wavesurfer.microphone.mediaStreamSource;
      //implement variation of this for MS Edge
       recorder = new Recorder(input);
          $id("button-line").innerHTML = unlockAnim;
             $id("button-line").innerHTML = recordBtn;
             $id("record-page-text").innerHTML = locTextReadyToRec;
             $id("sub-title").innerHTML = locTextPress;
             var dArrow = $new("img");
             dArrow.src = "img/down-arrow.svg";
             dArrow.id = "down-arrow";
             dArrow.ondragstart = "false";
             $id("vredact-app-page").appendChild(dArrow);
   });

   wavesurfer.microphone.start();
}

function proceed(){
   $id("vredact-app-page").innerHTML = contactDetPage;
   duration = wavesurfer.getDuration();
   wavesurfer.destroy();
   wavesurfer = "";

   addMailing = "no";
}

function thanks(){
   var fd = new FormData();
   fd.append("voiceMsg", bOut, "voice_msg.wav");
   fd.append("firstName", $id("name-input").value);
   fd.append("emailAddress", $id("email-input").value);
   fd.append("phoneNumber", $id("phone-input").value);
   fd.append("addToMailingList", addMailing);

   /*
   for (var ent of fd.entries()){
      console.log(ent);
   }
   */

   var xhr = new XMLHttpRequest();
   xhr.open('PUT', beUrl, true);
   xhr.setRequestHeader('Content-Type', 'multipart/form-data');
   xhr.send(JSON.stringify(fd));

   var seconds = duration.toFixed(0);
   var minutes = 0;

   if (seconds >= 60) {
      minutes = Math.floor(seconds/60);
      seconds -= minutes*60;
      seconds = seconds.toFixed(0);
   }
   $id("vredact-app-page").innerHTML = endPage;
   $id("def-player").src = url;
}

function initVS(){
   var script = $new('script');
   if (location.hash == "" || location.hash == "#") {
      script.src = "src/en.js";
   } else {
      script.src = "src/" + location.hash.substring(1) + ".js";
   }

   script.onload = function () {
      var script2 = $new('script');
      script2.src = "src/pages.js";
      script2.onload = function () {
         $id("vredact-app-page").innerHTML = locTextWelcome + `<div id="button-line">
           <img src="./img/record-icon.svg" ondragstart="return false" onclick="checkMic()">
         </div>`;

         $id("vredact-app-footer").innerHTML = locTextPoweredBytredact;

         if (isMobile.CriOS()){
            $id("vredact-app-popup").innerHTML = locTextErrPopupChrIOS;
            $id("vredact-app-popup").style.visibility = "visible";
         }
      };
      document.head.appendChild(script2);
   };
   document.head.appendChild(script);
}

function initPopup(){
   if (!!isMobile.any()){
      $id("vredact-app-popup").innerHTML = locTextErrPopupMobile;
   }
   else {
      $id("vredact-app-popup").innerHTML = locTextErrPopupDesktop;
   }
}

function selectCheckBoxConsent(){
   if($id("unselectedC")){
      $id("unselectedC").id = "selectedC";
      $id("selectedC").innerText = "✓";
      addMailing = "yes";
   } else {
      $id("selectedC").id = "unselectedC";
      $id("unselectedC").innerText = "";
      addMailing = "no";
   }
}


window.alert("This web application is part of an archived version of an old larger project. It has had all branding, symbols, images, and other identifiers removed. Additionally, much of the functionality has been stripped out. It may not work properly on your device, and there will be display symbols missing!");
