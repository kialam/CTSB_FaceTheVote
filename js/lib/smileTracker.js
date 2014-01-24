/**
 * TODO - figure out how to check once every XXms 
 */

var SmileTracker = function() {
    
    var ctrack = new clm.tracker({useWebGL : true});
    ctrack.init(pModel);
    
    var ec = new emotionClassifier();
    ec.init(emotionModel);
    var emotionData = ec.getBlank();
    
    var count = 0;
    
    var lastSmiles = new Array();
    var averages = new Array();
    
    var heldSmileCount = 0;
    
    this.startVideo = function() {
        // start video
        vid.play();
        // start tracking
        ctrack.start(vid);
        // start loop to draw face
        drawLoop();
    }

    function drawLoop() {
        
        requestAnimFrame(drawLoop);
        overlayCC.clearRect(0, 0, 400, 300);
        if (ctrack.getCurrentPosition()) {
            ctrack.draw(overlay);
        }
        var cp = ctrack.getCurrentParameters();

        var er = ec.meanPredict(cp);
        if (er) {
            
            // skip every other frame
            if(count % 2 == 0) {
                
                var len = lastSmiles.length;
                var avgLen = averages.length;
                
                // if the array is getting too large, trim it
                if(len >= 10 ) {
                    var ls = lastSmiles.slice(-10, -1);
                    lastSmiles = ls;
                }
                
                // push the last reading to the array
                lastSmiles.unshift(er[3].value);
                
                // test array for average
                var sum = lastSmiles.reduce(function(a, b) {
                    return a + b;
                });
                var avg = sum / (len + 1);
                
                // store the averages
                if(avgLen >= 10 ) {
                    var a = averages.slice(-10, -1);
                    averages = a;
                }
                
                averages.push(avg);
                
                // come up with a super average to give us a simple number
                var superSum = averages.reduce(function(a, b) {
                    return a + b;
                });
                var superAvg = Math.floor((superSum / (avgLen + 1)) * 100);
                
                // finally ask the user to hold on smile for 3 seconds
                // need 7+ for 3 seconds before the user can move on to the next section
                if(superAvg > 7) {
                    heldSmileCount++;
                } else {
                    heldSmileCount = 0;
                }
                
                if(heldSmileCount > 15) {
                    console.log('ready!');
                }
                
                // debugging only
//                if(count <= 500) {
//                    console.log(superAvg)
//                }
                console.log(superAvg)
            }
            
            count++;
            
        }
    }
};
