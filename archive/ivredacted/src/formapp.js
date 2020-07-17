var currentDispIsTick = true;
var timeoutHandle;
var loadingTime = 3500;

var allowSlide = true;

var currentPage = "";

var propType = "N/A";
var gsSize = "N/A";
var utilities = "N/A";
var buildability = "N/A";
var propShape = "N/A";
var sellTime = "N/A";

var houseType = "N/A";
var livingArea = "N/A";
var numFloors = "N/A";
var numRooms = "N/A";
var built = "N/A";
var parking = "N/A";

var condition = "N/A";
var renting = "N/A";
var kitchen = "N/A";
var aufzug = "N/A";

var businessType = "N/A";
var genderSelect = "N/A";

var consent = "n";

function insertVariablesQ(){
   var tgt;
   if(currentDispIsTick) {
      tgt = "tock";
   } else {
      tgt = "tick";
      }

      switch(propType){
         case "Grundstück":
            document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML = document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML.replace("$Nominativ.Immobilie$", "das Grundstück");
            document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML = document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML.replace("$Alt.Nominativ.Immobilie$", "das Grundstück");
            document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML = document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML.replace("$Dative.Immobilie$", "des Grundstückes");
            document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML = document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML.replace("$Fl.Text$", "Wie groß ist die Wohnfläche des Grundstückes?");
            document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML = document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML.replace("$Kal.Text$", "Zu welchem Zeitpunkt kann das Grundstück verkauft werden?");
            break;
         case "Haus":
            document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML = document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML.replace("$Nominativ.Immobilie$", "das Haus");
            document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML = document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML.replace("$Alt.Nominativ.Immobilie$", "das Haus");
            document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML = document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML.replace("$Dative.Immobilie$", " des Hauses");
            document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML = document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML.replace("$Fl.Text$", "Wie groß ist die Wohnfläche des Hauses?");
            document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML = document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML.replace("$Kal.Text$", "Ab welchem Zeitpunkt ist eine Veräusserung denkbar?");
            break;
         case "Wohnung":
            document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML = document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML.replace("$Nominativ.Immobilie$", "die Wohnung");
            document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML = document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML.replace("$Alt.Nominativ.Immobilie$", "die Wohnung");
            document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML = document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML.replace("$Dative.Immobilie$", " der Wohnung");
            document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML = document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML.replace("$Fl.Text$", "Wie groß ist die Wohnfläche der Wohnung?");
            document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML = document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML.replace("$Kal.Text$", "Ab welchem Zeitpunkt ist eine Veräusserung denkbar?");
            break;
         case "Gewerbe":
            document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML = document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML.replace("$Nominativ.Immobilie$", "die Gewerbe");
            document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML = document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML.replace("$Alt.Nominativ.Immobilie$", "das Objekt");
            document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML = document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML.replace("$Dative.Immobilie$", " der Gewerbe");
            document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML = document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML.replace("$Fl.Text$", "Wie viele fläche bietet die Gewerbeimmobilie?");
            document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML = document.getElementById(tgt).getElementsByClassName("form-app-question")[0].innerHTML.replace("$Kal.Text$", "Ab welchem Zeitpunkt ist eine Veräusserung denkbar?");
            break;
         }
}

function selectCheckBoxFemale(){
   if (document.getElementById("unselectedF")) {
   document.getElementById("unselectedF").id="selectedF";
   document.getElementById("selectedF").innerText = "✓";
   if (document.getElementById("selectedM")){
      document.getElementById("selectedM").id="unselectedM"
   };
   document.getElementById("unselectedM").innerText = "";
   genderSelect = "Frau";
} else {
   document.getElementById("selectedF").id="unselectedF";
   document.getElementById("unselectedF").innerText = "";
   genderSelect = "(Nicht angegeben)";
}
}

function selectCheckBoxMale(){
   if (document.getElementById("unselectedM")) {
   document.getElementById("unselectedM").id="selectedM";
   document.getElementById("selectedM").innerText = "✓";
   if (document.getElementById("selectedF")){
      document.getElementById("selectedF").id="unselectedF"
   };
   document.getElementById("unselectedF").innerText = "";
   genderSelect = "Herr";
} else {
   document.getElementById("selectedM").id="unselectedM";
   document.getElementById("unselectedM").innerText = "";
   genderSelect = "(Nicht angegeben)";
}
}

function selectCheckBoxConsent(){
   if(document.getElementById("unselectedC")){
      document.getElementById("unselectedC").id = "selectedC";
      document.getElementById("selectedC").innerText = "✓";
      consent = "j";
   } else {
      document.getElementById("selectedC").id = "unselectedC";
      document.getElementById("unselectedC").innerText = "";
      consent = "n";
   }
}

function backBtnOverride(){
   if (currentPage!=location.hash) {
      switch(location.hash) {
         case "":
            returnToP1();
            break;
         case "#1000":
            loadPageGsf();
            previousPageAnim();
            break;
         case "#1100":
            loadPageErs();
            previousPageAnim();
            break;
         case "#1200":
            loadPageBau();
            previousPageAnim();
            break;
         case "#1300":
            loadPageSch();
            previousPageAnim();
            break;
         case "#1400":
            loadPageCal();
            previousPageAnim();
            break;
         case "#2000":
            loadPageHk();
            previousPageAnim();
            break;
         case "#2100":
            loadPageEta();
            previousPageAnim();
            break;
         case "#2200":
            loadPageZim();
            previousPageAnim();
            break;
         case "#2300":
            loadPageGeb();
            previousPageAnim();
            break;
         case "#2400":
            loadPagePar();
            previousPageAnim();
            break;
         case "#2500":
            loadPageZus();
            previousPageAnim();
            break;
         case "#2600":
            loadPageMiet();
            previousPageAnim();
            break;
         case "#3000":
            loadPageWf();
            previousPageAnim();
            break;
         case "#3100":
               loadPageKue();
               previousPageAnim();
               break;
         case "#4000":
            loadPageGk();
            previousPageAnim();
            break;
      }
   }

   if (location.hash!=""){
      switch(propType){
         case "Grundstück":
         switch(location.hash){
            case "#1000":
               var progBars = document.getElementsByClassName("form-app-progress");
               for (let element of progBars){
                  element.innerHTML = `<div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="current-page"></div>
                  <hr class="grey-bar"/>
                  <div class="uncompleted-page"></div>
                  <hr class="grey-bar"/>
                  <div class="uncompleted-page"></div>
                  <hr class="grey-bar"/>
                  <div class="uncompleted-page"></div>`
               };
            break;
            case "#1100":
            var progBars = document.getElementsByClassName("form-app-progress");
            for (let element of progBars){
               element.innerHTML = `<div class="completed-page"></div>
               <hr class="orange-bar"/>
               <div class="completed-page"></div>
               <hr class="orange-bar"/>
               <div class="current-page"></div>
               <hr class="grey-bar"/>
               <div class="uncompleted-page"></div>
               <hr class="grey-bar"/>
               <div class="uncompleted-page"></div>`
            };
            break;
            case "#1200":
            var progBars = document.getElementsByClassName("form-app-progress");
            for (let element of progBars){
               element.innerHTML = `<div class="completed-page"></div>
               <hr class="orange-bar"/>
               <div class="completed-page"></div>
               <hr class="orange-bar"/>
               <div class="completed-page"></div>
               <hr class="orange-bar"/>
               <div class="current-page"></div>
               <hr class="grey-bar"/>
               <div class="uncompleted-page"></div>`
            };
            break;
            case "#1300":
            var progBars = document.getElementsByClassName("form-app-progress");
            for (let element of progBars){
               element.innerHTML = `<div class="completed-page"></div>
               <hr class="orange-bar"/>
               <div class="completed-page"></div>
               <hr class="orange-bar"/>
               <div class="completed-page"></div>
               <hr class="orange-bar"/>
               <div class="completed-page"></div>
               <hr class="orange-bar"/>
               <div class="current-page"></div>`
            };
            break;
            case "#1400":
            var progBars = document.getElementsByClassName("form-app-progress");
            for (let element of progBars){
               element.innerHTML = `<div class="completed-page"></div>
               <hr class="orange-bar"/>
               <div class="completed-page"></div>
               <hr class="orange-bar"/>
               <div class="completed-page"></div>
               <hr class="orange-bar"/>
               <div class="completed-page"></div>
               <hr class="orange-bar"/>
               <div class="completed-page"></div>`
            };
            break;
         }
         break;
         case "Haus":
         switch(location.hash){
            case "#2000":
               var progBars = document.getElementsByClassName("form-app-progress");
               for (let element of progBars){
                  element.innerHTML = `<div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="current-page"></div>
                  <hr class="grey-bar"/>
                  <div class="uncompleted-page"></div>
                  <hr class="grey-bar"/>
                  <div class="uncompleted-page"></div>
                  <hr class="grey-bar"/>
                  <div class="uncompleted-page"></div>`
               };
            break;
            case "#1000":
            case "#3000":
            case "#2100":
               var progBars = document.getElementsByClassName("form-app-progress");
               for (let element of progBars){
                  element.innerHTML = `<div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="current-page"></div>
                  <hr class="grey-bar"/>
                  <div class="uncompleted-page"></div>
                  <hr class="grey-bar"/>
                  <div class="uncompleted-page"></div>`
               };
            break;
            case "#2200":
            case "#2300":
            case "#2500":
               var progBars = document.getElementsByClassName("form-app-progress");
               for (let element of progBars){
                  element.innerHTML = `<div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="current-page"></div>
                  <hr class="grey-bar"/>
                  <div class="uncompleted-page"></div>`
               };
            break;
            case "#2600":
            case "#2400":
               var progBars = document.getElementsByClassName("form-app-progress");
               for (let element of progBars){
                  element.innerHTML = `<div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="current-page"></div>`
               };
            break;
            case "#1400":
               var progBars = document.getElementsByClassName("form-app-progress");
               for (let element of progBars){
                  element.innerHTML = `<div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>`
               };
            break;
         }
         break;
         case "Wohnung":
         switch(location.hash){
            case "#3000":
               var progBars = document.getElementsByClassName("form-app-progress");
               for (let element of progBars){
                  element.innerHTML = `<div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="current-page"></div>
                  <hr class="grey-bar"/>
                  <div class="uncompleted-page"></div>
                  <hr class="grey-bar"/>
                  <div class="uncompleted-page"></div>
                  <hr class="grey-bar"/>
                  <div class="uncompleted-page"></div>`
               };
            break;
            case "#2200":
            case "#2100":
               var progBars = document.getElementsByClassName("form-app-progress");
               for (let element of progBars){
                  element.innerHTML = `<div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="current-page"></div>
                  <hr class="grey-bar"/>
                  <div class="uncompleted-page"></div>
                  <hr class="grey-bar"/>
                  <div class="uncompleted-page"></div>`
               };
            break;
            case "#2200":
            case "#2300":
            case "#2500":
            case "#2400":
               var progBars = document.getElementsByClassName("form-app-progress");
               for (let element of progBars){
                  element.innerHTML = `<div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="current-page"></div>
                  <hr class="grey-bar"/>
                  <div class="uncompleted-page"></div>`
               };
            break;
            case "#3100":
            case "#3200":
               var progBars = document.getElementsByClassName("form-app-progress");
               for (let element of progBars){
                  element.innerHTML = `<div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="current-page"></div>`
               };
            break;
            case "#1400":
               var progBars = document.getElementsByClassName("form-app-progress");
               for (let element of progBars){
                  element.innerHTML = `<div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>`
               };
            break;
         }
         break;
         case "Gewerbe":
         switch(location.hash){
            case "#4000":
               var progBars = document.getElementsByClassName("form-app-progress");
               for (let element of progBars){
                  element.innerHTML = `<div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="current-page"></div>
                  <hr class="grey-bar"/>
                  <div class="uncompleted-page"></div>
                  <hr class="grey-bar"/>
                  <div class="uncompleted-page"></div>
                  <hr class="grey-bar"/>
                  <div class="uncompleted-page"></div>`
               };
            break;
            case "#1000":
            case "#3000":
               var progBars = document.getElementsByClassName("form-app-progress");
               for (let element of progBars){
                  element.innerHTML = `<div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="current-page"></div>
                  <hr class="grey-bar"/>
                  <div class="uncompleted-page"></div>
                  <hr class="grey-bar"/>
                  <div class="uncompleted-page"></div>`
               };
            break;
            case "#2200":
            case "#2300":
               var progBars = document.getElementsByClassName("form-app-progress");
               for (let element of progBars){
                  element.innerHTML = `<div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="current-page"></div>
                  <hr class="grey-bar"/>
                  <div class="uncompleted-page"></div>`
               };
            break;
            case "#2400":
               var progBars = document.getElementsByClassName("form-app-progress");
               for (let element of progBars){
                  element.innerHTML = `<div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="current-page"></div>`
               };
            break;
            case "#1400":
               var progBars = document.getElementsByClassName("form-app-progress");
               for (let element of progBars){
                  element.innerHTML = `<div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>
                  <hr class="orange-bar"/>
                  <div class="completed-page"></div>`
               };
            break;
         }
         break;
      }
   }
}

function nextPageAnim(){
   allowSlide = false;
      var tick = document.getElementById("tick");
      var tock = document.getElementById("tock");

      insertVariablesQ();
      if(currentDispIsTick){
         tock.style.transition = "0.3s";
         tock.style.visibility = "visible";
         tock.style.left = "0rem";

         tick.style.left = "-70rem";
         tick.style.visibility = "hidden";
         currentDispIsTick = false;

         setTimeout(function() {
            tick.style.transition = "0s";
            tick.style.left = "70rem";
            allowSlide = true;
         }, 200);

      } else {
         tick.style.transition = "0.3s";
         tick.style.visibility = "visible";
         tick.style.left = "0rem";

         tock.style.left = "-70rem";
         tock.style.visibility = "hidden";
         currentDispIsTick = true;

         setTimeout(function () {
            tock.style.transition = "0s";
            tock.style.left = "70rem";
            allowSlide = true;
         }, 200);
      }
}

function previousPageAnim(){
   allowSlide = false;
   var tick = document.getElementById("tick");
   var tock = document.getElementById("tock");

   insertVariablesQ();
   if(currentDispIsTick){

      tock.style.left = "-70rem";

      setTimeout(function(){
         tock.style.transition = "0.3s";

         tock.style.visibility = "visible";
         tock.style.left = "0rem";
         tick.style.left = "70rem";
         tick.style.visibility = "hidden";
         currentDispIsTick = false;
      }, 100);

      setTimeout(function() {
         tick.style.transition = "0s";
         tick.style.left = "70rem";
         allowSlide = true;
      }, 200);

   } else {
      tick.style.left = "-70rem";

      setTimeout(function(){
         tick.style.transition = "0.3s";

         tick.style.visibility = "visible";
         tick.style.left = "0rem";
         tock.style.left = "70rem";
         tock.style.visibility = "hidden";
         currentDispIsTick = true;
      }, 100);

      setTimeout(function() {
         tock.style.transition = "0s";
         tock.style.left = "70rem";
         allowSlide = true;
      }, 200);
   }
}

// if the user clicks a completed_page icon in the progress icons below the options
// to return to a previous page
function returnToP1(){
   var p = `<div class="form-app-question">
     Was für eine Immobilie möchten Sie eventuell verkaufen?
   </div>

   <div class="form-app-selection-set">
     <div class="form-app-option-card" onclick="(function () {
        loadPageGsf();
        propType = 'Grundstück';
        nextPageAnim();
        currentPage = '#1000';
        window.location.hash = '1000';
     }());">
        <img src="img/25.png">
        <h2>Grundstück</h2>
     </div>
     <div class="form-app-option-card" onclick="(function () {
        loadPageHk();
        propType = 'Haus';
        nextPageAnim();
        currentPage = '#2000';
        window.location.hash = '2000';
     }());">
        <img src="img/26.png">
        <h2>Haus</h2>
     </div>
     <div class="form-app-option-card" onclick="(function () {
        loadPageGsf();
        propType = 'Wohnung';
        nextPageAnim();
        currentPage = '#3000';
        window.location.hash = '3000';
     }());">
        <img src="img/27.png">
        <h2>Wohnung</h2>
     </div>
     <div class="form-app-option-card" onclick="(function () {
        loadPageGk();
        propType = 'Gewerbe';
        nextPageAnim();
        currentPage = '#4000';
        window.location.hash = '4000';
     }());">
        <img src="img/28.png">
        <h2>Gewerbe</h2>
     </div>
   </div>

   <div class="form-app-progress">
     <div class="current-page"></div>
     <hr class="grey-bar"/>
     <div class="uncompleted-page"></div>
     <hr class="grey-bar"/>
     <div class="uncompleted-page"></div>
     <hr class="grey-bar"/>
     <div class="uncompleted-page"></div>
     <hr class="grey-bar"/>
     <div class="uncompleted-page"></div>
   </div>`;

if (currentDispIsTick) {
   document.getElementById("tock").innerHTML = p;
} else {
   document.getElementById("tick").innerHTML = p;
}

propType = "N/A";
gsSize = "N/A";
utilities = "N/A";
buildability = "N/A";
propShape = "N/A";
sellTime = "N/A";

houseType = "N/A";
livingArea = "N/A";
numFloors = "N/A";
numRooms = "N/A";
built = "N/A";
parking = "N/A";

condition = "N/A";
renting = "N/A";
kitchen = "N/A";
aufzug = "N/A";

previousPageAnim();
currentPage = "";
}

function loadPageGsf(){
      if (currentDispIsTick) {
         document.getElementById("tock").innerHTML = pGsf;
      } else {
         document.getElementById("tick").innerHTML = pGsf;
      }
}

function loadPageHk(){
      if (currentDispIsTick) {
         document.getElementById("tock").innerHTML = pHk;
      } else {
         document.getElementById("tick").innerHTML = pHk;
      }
}

function loadPageWf(){
      if (currentDispIsTick) {
         document.getElementById("tock").innerHTML = pWf;
      } else {
         document.getElementById("tick").innerHTML = pWf;
      }
}

function loadPageGk(){
      if (currentDispIsTick) {
         document.getElementById("tock").innerHTML = pGk;
      } else {
         document.getElementById("tick").innerHTML = pGk;
      }
}

function loadPageErs(){
   if (currentDispIsTick) {
      document.getElementById("tock").innerHTML = pErs;
   } else {
      document.getElementById("tick").innerHTML = pErs;
   }
}

function loadPageBau(){
   if (currentDispIsTick) {
      document.getElementById("tock").innerHTML = pBau;
   } else {
      document.getElementById("tick").innerHTML = pBau;
   }
}

function loadPageSch(){
   if (currentDispIsTick) {
      document.getElementById("tock").innerHTML = pSch;
   } else {
      document.getElementById("tick").innerHTML = pSch;
   }
}

function loadPageCal(){
   if (currentDispIsTick) {
      document.getElementById("tock").innerHTML = pCal;
   } else {
      document.getElementById("tick").innerHTML = pCal;
   }
}

function loadPageEta(){
   if (currentDispIsTick) {
      document.getElementById("tock").innerHTML = pEta;
   } else {
      document.getElementById("tick").innerHTML = pEta;
   }
}

function loadPageZim(){
   if (currentDispIsTick) {
      document.getElementById("tock").innerHTML = pZim;
   } else {
      document.getElementById("tick").innerHTML = pZim;
   }
}

function loadPageGeb(){
   if (currentDispIsTick) {
      document.getElementById("tock").innerHTML = pGeb;
   } else {
      document.getElementById("tick").innerHTML = pGeb;
   }
}

function loadPagePar(){
   if (currentDispIsTick) {
      document.getElementById("tock").innerHTML = pPar;
   } else {
      document.getElementById("tick").innerHTML = pPar;
   }
}

function loadPageZus(){
   if (currentDispIsTick) {
      document.getElementById("tock").innerHTML = pZus;
   } else {
      document.getElementById("tick").innerHTML = pZus;
   }
}

function loadPageMiet(){
   if (currentDispIsTick) {
      document.getElementById("tock").innerHTML = pMiet;
   } else {
      document.getElementById("tick").innerHTML = pMiet;
   }
}

function loadPageKue(){
   if (currentDispIsTick) {
      document.getElementById("tock").innerHTML = pKue;
   } else {
      document.getElementById("tick").innerHTML = pKue;
   }
}

function loadPageAfz(){
   if (currentDispIsTick) {
      document.getElementById("tock").innerHTML = pAfz;
   } else {
      document.getElementById("tick").innerHTML = pAfz;
   }
}

function loadPageDetails1(){
   if (currentDispIsTick) {
      document.getElementById("tock").innerHTML = pDetails1;
   } else {
      document.getElementById("tick").innerHTML = pDetails1;
   }
}

function loadPageProgressBar(){
   if (currentDispIsTick) {
      document.getElementById("tock").innerHTML = pProgressBar;
   } else {
      document.getElementById("tick").innerHTML = pProgressBar;
   }
}

function loadPageDetails2(){
   document.getElementsByClassName("form-app-header")[0].getElementsByTagName("h1")[0].style.color = "#44bb44";
   document.getElementsByClassName("form-app-header")[0].getElementsByTagName("h1")[0].innerText = "Fast geschafft!";
   document.getElementsByClassName("form-app-header")[0].getElementsByTagName("p")[0].innerText = "";
   if (currentDispIsTick) {
      document.getElementById("tock").innerHTML = pDetails2;
   } else {
      document.getElementById("tick").innerHTML = pDetails2;
   }
}

function loadPageDanke(){
   document.getElementsByClassName("form-app-header")[0].getElementsByTagName("h1")[0].innerText = "Fertig!";
   if (currentDispIsTick) {
      document.getElementById("tock").innerHTML = pDanke;
   } else {
      document.getElementById("tick").innerHTML = pDanke;
   }
}

function progressBar(interval){
   var prog = document.getElementById("prog");
   var current = prog.style.width.substring(0, prog.style.width.length-1) / 100;
   current = current*loadingTime;
   var newV = current + Math.floor(Math.random() * interval*5);
   newV = (newV/loadingTime)*100;
   prog.style.width = newV + "%";
   if (newV>=100)
   {
      newV = 100;
      //GOTO NEXT PAGE AND STOP INTERVAL!
      clearInterval(timeoutHandle);
      loadPageDetails2();
      nextPageAnim();
   }
}

function submitStub(){
   window.alert("SUBMISSION STUB. (back end work required to parse input form)... form will now return to the beginning BUT may not behave normally, because the form is designed to finish after submit, therefore the page should be entirely refereshed after submit.");
}

window.onhashchange = backBtnOverride;

window.alert("This web application is part of an archived version of an old larger project. It has had all branding, symbols, images, and other identifiers removed. Additionally, much of the functionality has been stripped out. It may not work properly on your device, and there will be display symbols missing!");