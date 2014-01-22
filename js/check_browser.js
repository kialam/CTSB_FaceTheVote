// Checks Browswer for Webcam Support
function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

if (hasGetUserMedia()) {
  // Good to go!
  alert('you have a webcam!');
} else {
  alert('getUserMedia() is not supported in your browser');
}
// if (Modernizr.getusermedia){
//   var gUM = Modernizr.prefixed('getUserMedia', navigator);
//   gUM({video: true}, function(videoStream){
//   	// 'success' callback
//   	alert('you have a webcam!!!!');
//   	// insert code to use camera
//   },
//   function() {
//   	// 'no permission' callback
//   	console.log('user did not give access to camera');
//   }
// }

