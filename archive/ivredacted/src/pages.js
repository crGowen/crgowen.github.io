//SECOND PAGE

// page for Grundstücksfläche input
var pGsf = `<div class="form-app-question">
   Wie groß ist die Fläche des Grundstückes?
</div>

<div class="form-app-selection-set">
   <div class="form-app-option-card" onclick="(function () {
      if (allowSlide){
      if (propType=='Grundstück'){
         currentPage = '#1100';
         window.location.hash = '1100';
         loadPageErs();
      }
      else {
         currentPage = '#3000';
         window.location.hash = '3000';
         loadPageWf();
      }
      gsSize = 'bis300';
      nextPageAnim();
   }}());">
      <img src="img/29.png">
      <h2>Bis 300m²</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      if (propType=='Grundstück'){
         currentPage = '#1100';
         window.location.hash = '1100';
         loadPageErs();
      }
      else {
         currentPage = '#3000';
         window.location.hash = '3000';
         loadPageWf();
      }
      gsSize = '301-1000';
      nextPageAnim();
   }}());">
      <img src="img/30.png">
      <h2>301m² - 1000m²</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
      if (allowSlide){
      if (propType=='Grundstück'){
         currentPage = '#1100';
         window.location.hash = '1100';
         loadPageErs();
      }
      else {
         currentPage = '#3000';
         window.location.hash = '3000';
         loadPageWf();
      }
      gsSize = 'ueber1000';
      nextPageAnim();
   }}());">
      <img src="img/31.png">
      <h2>Über 1000m²</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      if (propType=='Grundstück'){
         currentPage = '#1100';
         window.location.hash = '1100';
         loadPageErs();
      }
      else {
         currentPage = '#3000';
         window.location.hash = '3000';
         loadPageWf();
      }
      gsSize = 'unbekannt';
      nextPageAnim();
   }}());">
      <img src="img/32.png">
      <h2>Weiß nicht</h2>
   </div>
</div>

<div class="form-app-progress">
</div>`;

// page for Hauskategorie (house type) input
var pHk = `<div class="form-app-question">
   Um was für ein Haus handelt es sich?
</div>

<div class="form-app-selection-set">
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      loadPageGsf();
      houseType = 'Einfamilienhaus';
      nextPageAnim();
      currentPage = '#1000';
      window.location.hash = '1000';
   }}());">
      <img src="img/59.png">
      <h2>Einfamilienhaus</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      loadPageGsf();
      houseType = 'Mehrfamilienhaus';
      nextPageAnim();
      currentPage = '#1000';
      window.location.hash = '1000';
   }}());">
      <img src="img/48.png">
      <h2>Mehrfamilienhaus</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      loadPageGsf();
      houseType = 'Reihenhaus';
      nextPageAnim();
      currentPage = '#1000';
      window.location.hash = '1000';
   }}());">
      <img src="img/49.png">
      <h2>Reihenhaus</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      loadPageGsf();
      houseType = 'Doppelhaushälfte';
      nextPageAnim();
      currentPage = '#1000';
      window.location.hash = '1000';
   }}());">
      <img src="img/50.png">
      <h2>Doppelhaushälfte</h2>
   </div>
</div>

<div class="form-app-progress">
</div>`;

// page for Wohnfläche input
var pWf= `<div class="form-app-question">
   $Fl.Text$
</div>

<div class="form-app-selection-set">
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      if (propType=='Haus'){
         if (houseType=='Mehrfamilienhaus') {
            currentPage = '#2300';
            window.location.hash = '2300';
            loadPageGeb();
         } else {
            currentPage = '#2100';
            window.location.hash = '2100';
            loadPageEta();
         }
      }
      else if (propType=='Wohnung'){
         currentPage = '#2200';
         window.location.hash = '2200';
         loadPageZim();
      } else {
         currentPage = '#2300';
         window.location.hash = '2300';
         loadPageGeb();
      }
      livingArea = 'bis100';
      nextPageAnim();
   }}());">
      <img src="img/55.png">
      <h2>Bis 100 m²</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      if (propType=='Haus'){
         if (houseType=='Mehrfamilienhaus') {
            currentPage = '#2300';
            window.location.hash = '2300';
            loadPageGeb();
         } else {
            currentPage = '#2100';
            window.location.hash = '2100';
            loadPageEta();
         }
      }
      else if (propType=='Wohnung'){
         currentPage = '#2200';
         window.location.hash = '2200';
         loadPageZim();
      } else {
         currentPage = '#2300';
         window.location.hash = '2300';
         loadPageGeb();
      }
      livingArea = '101-200';
      nextPageAnim();
   }}());">
      <img src="img/56.png">
      <h2>101 - 200 m²</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      if (propType=='Haus'){
         if (houseType=='Mehrfamilienhaus') {
            currentPage = '#2300';
            window.location.hash = '2300';
            loadPageGeb();
         } else {
            currentPage = '#2100';
            window.location.hash = '2100';
            loadPageEta();
         }
      }
      else if (propType=='Wohnung'){
         currentPage = '#2200';
         window.location.hash = '2200';
         loadPageZim();
      } else {
         currentPage = '#2300';
         window.location.hash = '2300';
         loadPageGeb();
      }
      livingArea = 'mehr als 200';
      nextPageAnim();
   }}());">
      <img src="img/57.png">
      <h2>Über 200 m² </h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      if (propType=='Haus'){
         if (houseType=='Mehrfamilienhaus') {
            currentPage = '#2300';
            window.location.hash = '2300';
            loadPageGeb();
         } else {
            currentPage = '#2100';
            window.location.hash = '2100';
            loadPageEta();
         }
      }
      else if (propType=='Wohnung'){
         currentPage = '#2200';
         window.location.hash = '2200';
         loadPageZim();
      } else {
         currentPage = '#2300';
         window.location.hash = '2300';
         loadPageGeb();
      }
      livingArea = 'unbekannt';
      nextPageAnim();
   }}());">
      <img src="img/58.png">
      <h2>Weiß nicht</h2>
   </div>
</div>

<div class="form-app-progress">
</div>`;

// page for Gewerbekategorie (business type) input
var pGk = `<div class="form-app-question">
   Um was für eine Art Gebäude handelt es sich?
</div>

<div class="form-app-selection-set">
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      currentPage = '#1000';
      window.location.hash = '1000';
      loadPageGsf();
      businessType = 'Büro or Lager';
      nextPageAnim();
   }}());">
      <img src="img/1.png">
      <h2> Büro- oder Lagergebäude</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      currentPage = '#1000';
      window.location.hash = '1000';
      loadPageGsf();
      businessType = 'Wohnung or Geschäft';
      nextPageAnim();
   }}());">
      <img src="img/2.png">
      <h2>Wohn- und Geschäfts­gebäude</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      currentPage = '#1000';
      window.location.hash = '1000';
      loadPageGsf();
      businessType = 'Industrie';
      nextPageAnim();
   }}());">
      <img src="img/3.png">
      <h2> Industrie- oder Gewerbe­gebäude</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      currentPage = '#1000';
      window.location.hash = '1000';
      loadPageGsf();
      businessType = 'Sonstiges';
      nextPageAnim();
   }}());">
      <img src="img/4.png">
      <h2>Sonstiges / weiß nicht</h2>
   </div>
</div>

<div class="form-app-progress">
</div>`;

// page for Erschlossenheit
var pErs = `<div class="form-app-question">
   Ist das Grundstück erschlossen?
</div>

<div class="form-app-selection-set">
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      loadPageBau();
      utilities = 'Erschlossen';
      nextPageAnim();
      currentPage = '#1200';
      window.location.hash = '1200';
   }}());">
      <img src="img/44.png">
      <h2>Erschlossen</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      loadPageBau();
      utilities = 'Teilerschlossen';
      nextPageAnim();
      currentPage = '#1200';
      window.location.hash = '1200';
   }}());">
      <img src="img/45.png">
      <h2>Teilerschlossen</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      loadPageBau();
      utilities = 'Unerschlossen';
      nextPageAnim();
      currentPage = '#1200';
      window.location.hash = '1200';
   }}());">
      <img src="img/46.png">
      <h2>Unerschlossen</h2>
   </div>
</div>

<div class="form-app-progress">
</div>`;

// page for Bebauungsmöglichkeiten
var pBau = `<div class="form-app-question">
   Welche Optionen bietet der Bebauungsplan?
</div>

<div class="form-app-selection-set">
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      loadPageSch();
      buildability = 'kurzfristig';
      nextPageAnim();
      currentPage = '#1300';
      window.location.hash = '1300';
   }}());">
      <img src="img/33.png">
      <h2>Kurzfristig bebaubar</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      loadPageSch();
      buildability = 'eingeschränkt';
      nextPageAnim();
      currentPage = '#1300';
      window.location.hash = '1300';
   }}());">
      <img src="img/34.png">
      <h2>Eingeschränkt bebaubar</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      loadPageSch();
      buildability = 'nicht';
      nextPageAnim();
      currentPage = '#1300';
      window.location.hash = '1300';
   }}());">
      <img src="img/35.png">
      <h2>Nicht bebaubar</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      loadPageSch();
      buildability = 'unbekannt';
      nextPageAnim();
      currentPage = '#1300';
      window.location.hash = '1300';
   }}());">
      <img src="img/36.png">
      <h2>Weiß nicht</h2>
   </div>
</div>

<div class="form-app-progress">
</div>`;

// Grundstückszuschnitt
var pSch = `<div class="form-app-question">
   Wie ist das Grundstück geschnitten?
</div>

<div class="form-app-selection-set">
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      loadPageCal();
      propShape = 'ecke';
      nextPageAnim();
      currentPage = '#1400';
      window.location.hash = '1400';
   }}());">
      <img src="img/37.png">
      <h2>Eckgrundstück</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      loadPageCal();
      propShape = 'rechtecke';
      nextPageAnim();
      currentPage = '#1400';
      window.location.hash = '1400';
   }}());">
      <img src="img/38.png">
      <h2>Rechteckiger Zuschnitt</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      loadPageCal();
      propShape = 'sonstiges';
      nextPageAnim();
      currentPage = '#1400';
      window.location.hash = '1400';
   }}());">
      <img src="img/39.png">
      <h2>Sonstiges</h2>
   </div>
</div>

<div class="form-app-progress">
</div>`;

// Kalendar
var pCal = `<div class="form-app-question">
   $Kal.Text$
</div>

<div class="form-app-selection-set">
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      loadPageDetails1();
      sellTime = '1-3M';
      nextPageAnim();
      currentPage = '#5000';
      window.location.hash = '5000';
   }}());">
      <img src="img/21.png">
      <h2>1-3 Monate</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      loadPageDetails1();
      sellTime = '4-6M';
      nextPageAnim();
      currentPage = '#5000';
      window.location.hash = '5000';
   }}());">
      <img src="img/22.png">
      <h2>4-6 Monate</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      loadPageDetails1();
      sellTime = 'Mehr as 6M';
      nextPageAnim();
      currentPage = '#5000';
      window.location.hash = '5000';
   }}());">
      <img src="img/23.png">
      <h2>Mehr als 6 Monate</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      loadPageDetails1();
      sellTime = 'nicht';
      nextPageAnim();
      currentPage = '#5000';
      window.location.hash = '5000';
   }}());">
      <img src="img/24.png">
      <h2>Momentan nicht</h2>
   </div>
</div>

<div class="form-app-progress">
</div>`;

// Etagen
var pEta = `<div class="form-app-question">
   Wie viele Stockwerke/Etagen hat Ihr Haus?
</div>

<div class="form-app-selection-set">
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
         currentPage = '#2200';
         window.location.hash = '2200';
         loadPageZim();
      numFloors = 'eine';
      nextPageAnim();
   }}());">
      <img src="img/59.png">
      <h2>Eine</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
         currentPage = '#2200';
         window.location.hash = '2200';
         loadPageZim();
      numFloors = 'eineinhalb';
      nextPageAnim();
   }}());">
      <img src="img/60.png">
      <h2>Eineinhalb</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
         currentPage = '#2200';
         window.location.hash = '2200';
         loadPageZim();
      numFloors = 'zwei';
      nextPageAnim();
   }}());">
      <img src="img/61.png">
      <h2>Zwei</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
         currentPage = '#2200';
         window.location.hash = '2200';
         loadPageZim();
      numFloors = 'mehr als zwei';
      nextPageAnim();
   }}());">
      <img src="img/62.png">
      <h2>Mehr als zwei</h2>
   </div>
</div>

<div class="form-app-progress">
</div>`;

// Zimmer
var pZim = `<div class="form-app-question">
   Wie viele Räume hat $Nominativ.Immobilie$? (ohne Bad und Küche)
</div>

<div class="form-app-selection-set">
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
         currentPage = '#2300';
         window.location.hash = '2300';
         loadPageGeb();
      numRooms = '2-4';
      nextPageAnim();
   }}());">
      <img src="img/63.png">
      <h2>2-4 Zimmer</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
         currentPage = '#2300';
         window.location.hash = '2300';
         loadPageGeb();
      numRooms = '5-8';
      nextPageAnim();
   }}());">
      <img src="img/64.png">
      <h2>5-8 Zimmer</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
         currentPage = '#2300';
         window.location.hash = '2300';
         loadPageGeb();
      numRooms = '9-10';
      nextPageAnim();
   }}());">
      <img src="img/65.png">
      <h2>9-10 Zimmer</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
         currentPage = '#2300';
         window.location.hash = '2300';
         loadPageGeb();
      numRooms = 'mehr als zehn';
      nextPageAnim();
   }}());">
      <img src="img/66.png">
      <h2>Mehr als 10 Zimmer</h2>
   </div>
</div>

<div class="form-app-progress">
</div>`;

// Gebaut
var pGeb = `<div class="form-app-question">
   In welchem Jahr wurde $Alt.Nominativ.Immobilie$ erstellt?
</div>

<div class="form-app-selection-set">
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      if (houseType=='Mehrfamilienhaus') {
         currentPage = '#2500';
         window.location.hash = '2500';
         loadPageZus();
      } else {
         currentPage = '#2400';
         window.location.hash = '2400';
         loadPagePar();
      }
      built = 'vor1950';
      nextPageAnim();
   }}());">
      <img src="img/13.png">
      <h2>Vor 1950</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      if (houseType=='Mehrfamilienhaus') {
         currentPage = '#2500';
         window.location.hash = '2500';
         loadPageZus();
      } else {
         currentPage = '#2400';
         window.location.hash = '2400';
         loadPagePar();
      }
      built = '1950-1990';
      nextPageAnim();
   }}());">
      <img src="img/14.png">
      <h2>1950-1990</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      if (houseType=='Mehrfamilienhaus') {
         currentPage = '#2500';
         window.location.hash = '2500';
         loadPageZus();
      } else {
         currentPage = '#2400';
         window.location.hash = '2400';
         loadPagePar();
      }
      built = '1991-2009';
      nextPageAnim();
   }}());">
      <img src="img/15.png">
      <h2>1991-2009</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      if (houseType=='Mehrfamilienhaus') {
         currentPage = '#2500';
         window.location.hash = '2500';
         loadPageZus();
      } else {
         currentPage = '#2400';
         window.location.hash = '2400';
         loadPagePar();
      }
      built = '2010-heute';
      nextPageAnim();
   }}());">
      <img src="img/16.png">
      <h2>2010-heute</h2>
   </div>
</div>

<div class="form-app-progress">
</div>`;

// Parking
var pPar = `<div class="form-app-question">
   Welche Art Stellplätze sind verfügbar?
</div>

<div class="form-app-selection-set">
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      if (propType=='Wohnung') {
         currentPage = '#3100';
         window.location.hash = '3100';
         loadPageKue();
      } else {
         currentPage = '#1400';
         window.location.hash = '1400';
         loadPageCal();
      }
      parking = 'garage';
      nextPageAnim();
   }}());">
      <img src="img/71.png">
      <h2>Garage</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      if (propType=='Wohnung') {
         currentPage = '#3100';
         window.location.hash = '3100';
         loadPageKue();
      } else {
         currentPage = '#1400';
         window.location.hash = '1400';
         loadPageCal();
      }
      parking = 'carport';
      nextPageAnim();
   }}());">
      <img src="img/72.png">
      <h2>Carport</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      if (propType=='Wohnung') {
         currentPage = '#3100';
         window.location.hash = '3100';
         loadPageKue();
      } else {
         currentPage = '#1400';
         window.location.hash = '1400';
         loadPageCal();
      }
      parking = 'stellplatz';
      nextPageAnim();
   }}());">
      <img src="img/73.png">
      <h2>Stellplatz im Freien</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      if (propType=='Wohnung') {
         currentPage = '#3100';
         window.location.hash = '3100';
         loadPageKue();
      } else {
         currentPage = '#1400';
         window.location.hash = '1400';
         loadPageCal();
      }
      parking = 'keine';
      nextPageAnim();
   }}());">
      <img src="img/74.png">
      <h2>Keine Parkmöglichkeit</h2>
   </div>
</div>

<div class="form-app-progress">
</div>`;

// Zustand
var pZus = `<div class="form-app-question">
   Wie ist der Zustand des Hauses?
</div>

<div class="form-app-selection-set">
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
         currentPage = '#2600';
         window.location.hash = '2600';
         loadPageMiet();
      condition = 'saniert';
      nextPageAnim();
   }}());">
      <img src="img/82.png">
      <h2>Saniert</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
         currentPage = '#2600';
         window.location.hash = '2600';
         loadPageMiet();
      condition = 'teilsaniert';
      nextPageAnim();
   }}());">
      <img src="img/83.png">
      <h2>Teilsaniert</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
         currentPage = '#2600';
         window.location.hash = '2600';
         loadPageMiet();
      condition = 'unsaniert';
      nextPageAnim();
   }}());">
      <img src="img/84.png">
      <h2>Unsaniert</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
         currentPage = '#2600';
         window.location.hash = '2600';
         loadPageMiet();
      condition = 'unbekannt';
      nextPageAnim();
   }}());">
      <img src="img/85.png">
      <h2>Weiß nicht</h2>
   </div>
</div>

<div class="form-app-progress">
</div>`;

// Vermieter
var pMiet = `<div class="form-app-question">
   Ist $Nominativ.Immobilie$ vermietet?
</div>

<div class="form-app-selection-set">
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
         currentPage = '#1400';
         window.location.hash = '1400';
         loadPageCal();
      renting = 'voll vermietet';
      nextPageAnim();
   }}());">
      <img src="img/86.png">
      <h2>Voll vermietet</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      currentPage = '#1400';
      window.location.hash = '1400';
      loadPageCal();
      renting = 'teil vermietet';
      nextPageAnim();
   }}());">
      <img src="img/87.png">
      <h2>Teil vermietet</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      currentPage = '#1400';
      window.location.hash = '1400';
      loadPageCal();
      renting = 'Leerstand';
      nextPageAnim();
   }}());">
      <img src="img/84.png">
      <h2>Leerstand</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      currentPage = '#1400';
      window.location.hash = '1400';
      loadPageCal();;
      renting = 'unbekannt';
      nextPageAnim();
   }}());">
      <img src="img/85.png">
      <h2>Weiß nicht</h2>
   </div>
</div>

<div class="form-app-progress">
</div>`;

// Kuechen (WG)
var pKue = `<div class="form-app-question">
   Verfügt die Wohnung über eine Einbauküche?
</div>

<div class="form-app-selection-set">
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
         currentPage = '#3200';
         window.location.hash = '3200';
         loadPageAfz();
      kitchen = 'neuwertig';
      nextPageAnim();
   }}());">
      <img src="img/110.png">
      <h2>Ja - neuwertig</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      currentPage = '#3200';
      window.location.hash = '3200';
      loadPageAfz();
      kitchen = 'längere Nutzungszeit';
      nextPageAnim();
   }}());">
      <img src="img/111.png">
      <h2>Ja - längere Nutzungszeit</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      currentPage = '#3200';
      window.location.hash = '3200';
      loadPageAfz();
      kitchen = 'keine';
      nextPageAnim();
   }}());">
      <img src="img/112.png">
      <h2>Keine Einbauküche vorhanden</h2>
   </div>
</div>

<div class="form-app-progress">
</div>`;

// Aufzug
var pAfz = `<div class="form-app-question">
   Verfügt das Gebäude über einen Lift?
</div>

<div class="form-app-selection-set">
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
         currentPage = '#1400';
         window.location.hash = '1400';
         loadPageCal();
      aufzug = 'ja';
      nextPageAnim();
   }}());">
      <img src="img/113.png">
      <h2>Ja</h2>
   </div>
   <div class="form-app-option-card" onclick="(function () {
         if (allowSlide){
      currentPage = '#1400';
      window.location.hash = '1400';
      loadPageCal();
      aufzug = 'nein';
      nextPageAnim();
   }}());">
      <img src="img/114.png">
      <h2>Nein</h2>
   </div>
</div>

<div class="form-app-progress">
</div>`;

// Details1
var pDetails1 = `<div class="form-app-question">
   Bitte geben Sie Ihre Postleitzahl ein:
</div>
   <input type="text" name="Postleitzahl" placeholder="Postleitzahl der Immobilie" class="form-app-input-field" id="PLZ">
   <button class="submit-btn" onclick="(function () {
         if (allowSlide){
      //DO SOMETHING to get contents of inputBox to variable
         currentPage = '#5100';
         window.location.hash = '5100';
         timeoutHandle = setInterval(function() {progressBar(150);}, 150);
         loadPageProgressBar();
         nextPageAnim();
   }}());">Weiter</button>`

// ProgressBar
var pProgressBar = `<div class="form-app-question">
   Wir bitten Sie um wenig Geduld...
</div>
<h2>Unser System sucht jetzt den passenden Immobilienmakler für Sie heraus.</h2>

<div class="loadingBar">
<div class="loadingBar" id="prog"></div>`;

// Details2
var pDetails2 = `
<div class="form-app-question">
   Wie können wir Sie am besten erreichen?
</div>
<div id="form-app-details-page">

   <div id="gender-select">
   <span class="form-app-label">Herr</span> <div class="form-app-radio" id="unselectedM" onclick="selectCheckBoxMale()"></div>
   <span class="form-app-label">Frau</span> <div class="form-app-radio" id="unselectedF" onclick="selectCheckBoxFemale()"></div>
   <span id="pflichtfeld">*Pflichtfeld</span>
   </div>

   <input type="text" name="Vorname" placeholder="Vorname*" class="form-app-input-field details-2 half-w" id="vornameField">
   <input type="text" name="Nachname" placeholder="Nachname*" class="form-app-input-field details-2 half-w" id="nachnameField">
   <input type="text" name="Telefon" placeholder="Telefonnummer*" class="form-app-input-field details-2" id="telefonField">
   <input type="text" name="Email" placeholder="E-Mail*" class="form-app-input-field details-2" id="emailField">
   <div id="checkbox-container">
      <div class="form-app-radio" id="unselectedC" onclick="selectCheckBoxConsent()"></div> Ja, ich stimme der <a href="">Datenschutzerklärung</a> und den <a href="">AGB</a> zu. (Widerruf jederzeit möglich)
   </div>
   <!-- ALL USER SELECTIONS ARE STORED IN VARIABLES, ADD AUTO INPUT IN HIDDEN FIELDS HERE BEFORE SUBMIT -->
   <button class="submit-btn" id="final-btn" onclick="(function() {
      loadPageDanke();
      nextPageAnim();
   }());">Jetzt kostenlose Verkaufsempfehlung erhalten!</button>
</div>`;

// Danke
var pDanke = `
<div class="form-app-question">
   Herzlichen Dank für Ihre Kontaktaufnahme!
</div>

<p>Zeitnah erhalten Sie von uns einen Anruf, damit wir Ihre Angaben gemeinsam validieren können. Kurz darauf werden Sie von mindestens ein Angebot, von einem unserer Premium Partner erhalten. So ist eine professionelle Unterstützung, für Sie persönlich garantiert.</p>

<h2>Verifizierungsvorgang beschleunigen:</h2>
<p>Kostenfrei anrufen:</p>
<h1>REDACTED</h1>

<p>Eventuell werden wir Ihnen Informationen über eigene Produkte und Dienstleistungen, welche den von Ihnen gerade angeforderten ähneln, zusenden. Sie dürfen dem jederzeit widersprechen (z.B. per E-Mail an datenschutz@lqredacted.ch).
Es werden Ihnen dabei keine anderen Kosten entstehen, als die durch die Nutzung Ihres Internetzugangs.</p>`;
