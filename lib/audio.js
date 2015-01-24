// (function() {
//   if (typeof Asteroids === "undefined") {
//     window.Asteroids = {};
//   }
//
//   var context = new webkitAudioContext();
//
//   var kickDrum = new audioApiKey("kickDrum","kick.mp3",true, 1);
//
//   function audioApiKey(domNode,fileDirectory,loopOnOff,playBackRate) {
//     this.domNode = domNode;
//     this.fileDirectory = fileDirectory;
//     this.loopOnOff = loopOnOff;
//     var bufferFunctionName = bufferFunctionName;
//     var incomingBuffer;
//     var savedBuffer;
//     var xhr;
//     bufferFunctionName = function () {
//       var source = context.createBufferSource();
//       source.buffer = savedBuffer;
//       source.loop = loopOnOff;
//       source.connect(context.destination);
//       source.playbackRate.value = playBackRate;
//       source.noteOn(0); // Play sound immediately
//     };
//     var xhr = new XMLHttpRequest();
//     xhr.open('get',fileDirectory, true);
//     xhr.responseType = 'arraybuffer';
//     xhr.onload = function () {
//       context.decodeAudioData(xhr.response,
//         function(incomingBuffer) {
//           savedBuffer = incomingBuffer;
//           var note = document.getElementById(domNode);
//           note.addEventListener("click", bufferFunctionName , false);
//         }
//       );
//     };
//     xhr.send();
//   };
//
//
// })();
