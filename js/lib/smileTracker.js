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
    
    var margin = {top : 20, right : 20, bottom : 10, left : 40},
                width = 400 - margin.left - margin.right,
                height = 100 - margin.top - margin.bottom;

    var barWidth = 30;

    var formatPercent = d3.format(".0%");

    var x = d3.scale.linear().domain([0, ec.getEmotions().length]).range([margin.left, width+margin.left]);
    var y = d3.scale.linear().domain([0,1]).range([0, height]);

    var svg;
    
    
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
            // log the smiles
            if(currentVideo in data) {
                data[currentVideo].push(er[3].value);
            } else {
                data[currentVideo] = new Array();
                data[currentVideo].push(er[3].value);
            }
            
            // update the bar chart over the video
            updateBarChart([
                {
                    emotion: 'happy',
                    value: er[3].value
                }
            ]);
        }
        
    }
    
    this.createBarChart = function(elem) {
        
        var d = [
            {
                emotion: 'happy',
                value: 0
            }
        ];
        
        svg = d3.select("#" + elem).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        
        svg.selectAll("rect").
            data(d).
            enter().
            append("svg:rect").
            attr("x", function(datum, index) { return x(index); }).
            attr("y", function(datum) { return height - y(datum.value); }).
            attr("height", function(datum) { return y(datum.value); }).
            attr("width", barWidth).
            attr("fill", "#ed0101");

        svg.selectAll("text.labels").
            data(d).
            enter().
            append("svg:text").
            attr("x", function(datum, index) { return x(index) + barWidth; }).
            attr("y", function(datum) { return height - y(datum.value); }).
            attr("dx", -barWidth/2).
            attr("dy", "1.2em").
            attr("text-anchor", "middle").
            text(function(datum) { return datum.value;}).
            attr("fill", "white").
            attr("class", "labels");
//
        svg.selectAll("text.yAxis").
            data(d).
            enter().append("svg:text").
            attr("x", function(datum, index) { return x(index) + barWidth; }).
            attr("y", height).
            attr("dx", -barWidth/2).
            attr("text-anchor", "middle").
            attr("style", "font-size: 12").
            text(function(datum) { return datum.emotion;}).
            attr("transform", "translate(0, 18)").
            attr("fill", "white").
            attr("class", "yAxis");
    }
    
    function updateBarChart(data) {
        
        // update
        var rects = svg.selectAll("rect")
                .data(data)
                .attr("y", function(datum) { return height - y(datum.value); })
                .attr("height", function(datum) { return y(datum.value); });
        var texts = svg.selectAll("text.labels")
                .data(data)
                .attr("y", function(datum) { return height - y(datum.value); })
                .text(function(datum) { return datum.value.toFixed(1);});

        // enter 
        rects.enter().append("svg:rect");
        texts.enter().append("svg:text");

        // exit
        rects.exit().remove();
        texts.exit().remove();
    }
    
};
