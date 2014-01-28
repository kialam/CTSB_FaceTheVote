/**
 * TODO - handle no face
 * TODO - handle face lost
 * TODO figure out another way to handle face lost events since it still bogs - check to make sure the tracker is actually pausing
 * 
 */

var SmileTracker = function() {
    
    var ctrack = new clm.tracker({useWebGL : true});
    ctrack.init(pModel);
    
    var ec = new emotionClassifier();
    ec.init(emotionModel);
    var emotionData = ec.getBlank();
    
//    var count = 0;
    
    var paused = false;
    var drawing = false;
//    var throttling = false;
    
    var framesToSkip = 5,
        counter = 0;

    var data = new Object();
    
    var self = this;
    
    // no face detected when starting
//    $(document).on('clmtrackrNotFound', function(evt) {
//        // dont know if we really need this one yet
//    });
    
    // DEPRECATED - 1.27.14
    // face was lost
//    $(document).on('clmtrackrLost', function(evt) {
//        // we lost you, pause the script until the next video
//        self.pause();
//        smileTrackingLost = true;
//    });
    
    this.start = function() {
        // set paused = false
        paused = false;
        
        // start video
        vid.play();
            
        // start tracking
        ctrack.start(vid);
        
        // start loop to draw face
        drawLoop();
    };
    
    this.pause = function() {
        paused = true;
        
        vid.pause();
        
        ctrack.stop();
    };
    
    this.setDrawing = function(b) {
        drawing = b;
    };
    
    this.getData = function() {
        return data;
    };
    
    function drawLoop() {
        
//        // to throttle the counter
//        if (counter < framesToSkip && throttling) {
//            counter++;
//            requestAnimationFrame(drawLoop);
//            return;
//        }
        
        var p = paused;
        var d = drawing;
        
        if(!p) {
            counter = 0;
            requestAnimFrame(drawLoop);
        }
        
        if(d) {
            overlayCC.clearRect(0, 0, 400, 300);
            if (ctrack.getCurrentPosition()) {
                ctrack.draw(overlay);
            }
        }

        var cp = ctrack.getCurrentParameters();
        
        var er = ec.meanPredict(cp);
        if (er) {
//            smileValue = er[3].value;
            if(currentVideo in data) {
                data[currentVideo].push(er[3].value);
            } else {
                data[currentVideo] = new Array();
                data[currentVideo].push(er[3].value);
            }
//            console.log(er[3].value)
        }
        
    }
    
};
