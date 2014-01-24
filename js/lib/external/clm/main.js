AudioSFX = function( _sound, _autoplay ) {
    var self = this;

 	this.file = _sound;
 	this.autoplay = _autoplay;

    this.sound;
 
    this.context = new webkitAudioContext();
 
    this.play = function() {
        var source = self.context.createBufferSource();
        source.buffer = self.sound;
        source.connect( self.context.destination );
        source.noteOn( 0 );
    }
 
    this.load = function() {
        var request = new XMLHttpRequest();
        request.addEventListener( 'load', function(e) {
            self.context.decodeAudioData( request.response, function(decoded_data) {
                self.sound = decoded_data;
                if( self.autoplay ) {
                    self.play(0);
                }
            }, function(e){
                console.log("error");
            });
        }, false);
        request.open( 'GET', self.file , true );
        request.responseType = "arraybuffer";
        request.send();
    }
 
    self.load();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var sfx;
$(document).ready(function() {
});