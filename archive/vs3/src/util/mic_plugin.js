!function(e,t){
   "object"==typeof exports&&"object"==typeof module?module.exports=t():
   "function"==typeof define&&define.amd?define("microphone",[],t):
   "object"==typeof exports?exports.microphone=t():
   (e.WaveSurfer=e.WaveSurfer||{},e.WaveSurfer.microphone=t())
}

(window,function(){
   return function(e){
      var t={};
      function r(i){
         if(t[i])return t[i].exports;
         var n=t[i]={
            i:i,l:!1,exports:{}
         };
         return e[i].call(n.exports,n,n.exports,r),n.l=!0,n.exports}
         return r.m=e,r.c=t,r.d=function(e,t,i){
            r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})
         },r.r=function(e){
            "undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})
         },r.t=function(e,t){
            if(1&t&&(e=r(e)),8&t)return e;
            if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;
            var i=Object.create(null);
            if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(i,n,function(t){return e[t]}.bind(null,n));
            return i
         },r.n=function(e){
            var t=e&&e.__esModule?function(){
               return e.default
            }:function(){
               return e
            };return r.d(t,"a",t),t
         },r.o=function(e,t){
            return Object.prototype.hasOwnProperty.call(e,t)},r.p="localhost:8080/dist/plugin/",r(r.s=3)}({3:function(e,t,r){
               "use strict";function i(e,t){
                  for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)
               }
            }function n(e,t,r){
               return t&&i(e.prototype,t),r&&i(e,r),e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){function e(t,r){
                  var i=this;
                  !function(e,t){
                     if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")
                  }(this,e),this.params=t,this.wavesurfer=r,this.active=!1,this.paused=!1,this.browser=this.detectBrowser(),this.reloadBufferFunction=function(e){
                     return i.reloadBuffer(e)};void 0===navigator.mediaDevices&&(navigator.mediaDevices={}),void 0===navigator.mediaDevices.getUserMedia&&(navigator.mediaDevices.getUserMedia=function(e,t,r){
                        var i=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;return i?new Promise(function(t,r){i.call(navigator,e,t,r)}):Promise.reject(new Error("getUserMedia is not implemented in this browser"))}),this.constraints=this.params.constraints||{video:!1,audio:!0},this.bufferSize=this.params.bufferSize||4096,this.numberOfInputChannels=this.params.numberOfInputChannels||1,this.numberOfOutputChannels=this.params.numberOfOutputChannels||1,this._onBackendCreated=function(){i.micContext=i.wavesurfer.backend.getAudioContext()}}return n(e,null,[{key:"create",value:function(t){return{name:"microphone",deferInit:!(!t||!t.deferInit)&&t.deferInit,params:t,instance:e}}}]),n(e,[{key:"init",value:function(){this.wavesurfer.on("backend-created",this._onBackendCreated),this.wavesurfer.backend&&this._onBackendCreated()}},{key:"destroy",value:function(){this.paused=!0,this.wavesurfer.un("backend-created",this._onBackendCreated),this.stop()}},{key:"start",value:function(){var e=this;navigator.mediaDevices.getUserMedia(this.constraints).then(function(t){return e.gotStream(t)}).catch(function(t){return e.deviceError(t)})}},{key:"togglePlay",value:function(){this.active?(this.paused=!this.paused,this.paused?this.pause():this.play()):this.start()}},{key:"play",value:function(){this.paused=!1,this.connect()}},{key:"pause",value:function(){this.paused=!0,this.disconnect()}},{key:"stop",value:function(){this.active&&(this.stopDevice(),this.wavesurfer.empty())}},{key:"stopDevice",value:function(){if(this.active=!1,this.disconnect(),this.stream){if(("chrome"===this.browser.browser&&this.browser.version>=45||"firefox"===this.browser.browser&&this.browser.version>=44||"edge"===this.browser.browser||"safari"===this.browser.browser)&&this.stream.getTracks)return void this.stream.getTracks().forEach(function(e){return e.stop()});this.stream.stop()}}},{key:"connect",value:function(){void 0!==this.stream&&("edge"===this.browser.browser&&(this.localAudioBuffer=this.micContext.createBuffer(this.numberOfInputChannels,this.bufferSize,this.micContext.sampleRate)),this.mediaStreamSource=this.micContext.createMediaStreamSource(this.stream),this.levelChecker=this.micContext.createScriptProcessor(this.bufferSize,this.numberOfInputChannels,this.numberOfOutputChannels),this.mediaStreamSource.connect(this.levelChecker),this.levelChecker.connect(this.micContext.destination),this.levelChecker.onaudioprocess=this.reloadBufferFunction)}},{key:"disconnect",value:function(){void 0!==this.mediaStreamSource&&this.mediaStreamSource.disconnect(),void 0!==this.levelChecker&&(this.levelChecker.disconnect(),this.levelChecker.onaudioprocess=void 0),void 0!==this.localAudioBuffer&&(this.localAudioBuffer=void 0)}},{key:"reloadBuffer",value:function(e){if(!this.paused)if(this.wavesurfer.empty(),"edge"===this.browser.browser){var t,r;for(t=0,r=Math.min(this.localAudioBuffer.numberOfChannels,e.inputBuffer.numberOfChannels);t<r;t++)this.localAudioBuffer.getChannelData(t).set(e.inputBuffer.getChannelData(t));this.wavesurfer.loadDecodedBuffer(this.localAudioBuffer)}else this.wavesurfer.loadDecodedBuffer(e.inputBuffer)}},{key:"gotStream",value:function(e){this.stream=e,this.active=!0,this.play(),this.fireEvent("deviceReady",e)}},{key:"deviceError",value:function(e){this.fireEvent("deviceError",e)}},{key:"extractVersion",value:function(e,t,r){var i=e.match(t);return i&&i.length>=r&&parseInt(i[r],10)}},{key:"detectBrowser",value:function(){var e={browser:null,version:null,minVersion:null};return"undefined"!=typeof window&&window.navigator?navigator.mozGetUserMedia?(e.browser="firefox",e.version=this.extractVersion(navigator.userAgent,/Firefox\/(\d+)\./,1),e.minVersion=31,e):navigator.webkitGetUserMedia?(e.browser="chrome",e.version=this.extractVersion(navigator.userAgent,/Chrom(e|ium)\/(\d+)\./,2),e.minVersion=38,e):navigator.mediaDevices&&navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)?(e.browser="edge",e.version=this.extractVersion(navigator.userAgent,/Edge\/(\d+).(\d+)$/,2),e.minVersion=10547,e):window.RTCPeerConnection&&navigator.userAgent.match(/AppleWebKit\/(\d+)\./)?(e.browser="safari",e.minVersion=11,e.version=this.extractVersion(navigator.userAgent,/AppleWebKit\/(\d+)\./,1),e):(e.browser="Not a supported browser.",e):(e.browser="Not a supported browser.",e)}}]),e}();t.default=o,e.exports=t.default}})});
//# sourceMappingURL=wavesurfer.microphone.min.js.map
