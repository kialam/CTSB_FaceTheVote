var Ranking = function(data) {
    
    var videos = [
        {
            name: 'Office Thief',
            thumb: 'office-thumb.png',
            id: 'oMdwJ7fyp00',
            class: 'officeThumb',
            statsContainer: 'officeStats',
            data: new Array(),
            canvas: 'officeCanvas',
            contentId: '14400',
            width: 156,
            smileCount: 0
//            order: 0
        },
        {
            name: 'Ostrich Thief',
            thumb: 'ostrich-thumb.png',
            id: 'MoANeCLWOjI',
            class: 'ostrichThumb',
            statsContainer: 'ostrichStats',
            data: new Array(),
            canvas: 'ostrichCanvas',
            contentId: '14399',
            width: 166,
            smileCount: 0
//            order: 0
            
        },
        {
            name: 'Finger Cleaner',
            thumb: 'finger-thumb.png',
            id: 'ugo7Y2lRsxc',
            class: 'fingerThumb',
            statsContainer: 'fingerStats',
            data: new Array(),
            canvas: 'fingerCanvas',
            contentId: '14398',
            width: 164,
            smileCount: 0
//            order: 0
        },
        {
            name: 'Time Machine',
            thumb: 'time-thumb.png',
            id: 'Y-P0Hs0ADJY',
            class: 'timeThumb',
            statsContainer: 'timeStats',
            data: new Array(),
            canvas: 'timeCanvas',
            contentId: '14397',
            width: 163,
            smileCount: 0
//            order: 0
        },
        {
            name: 'Cowboy Kid',
            thumb: 'cowboy-thumb.png',
            id: 'FHY5pwgCY3w',
            class: 'cowboyThumb',
            statsContainer: 'cowboyStats',
            data: new Array(),
            canvas: 'cowboyCanvas',
            contentId: '14396',
            width: 164,
            smileCount: 0
//            order: 0
        }
    ];
    
    var faceGone = 0.22106179389933026;
    
    // loop the data and assign the data to the videos array above
    var count = 0;
    for(key in data) {
        for(var i = 0; i < videos.length; i++) {
            if(key.search(videos[i].id) !== -1) {
                // we found the correct key
                videos[i].data = data[key];
//                videos[i].order = count;
                count++;
            }
        }
    }
    
    this.track = function() {
        // start cataloging results here
    };
    
    this.getVideos = function() {
        return videos;
    };
    
    this.getVideosHTML = function() {
        var html = '';
        var order = VideoSwitcher.getOrder();
        
        if(order.length !== 5) {
            // dont replace any of the html and just return the default
            for(var d = 0; d < videos.length; d++) {
                html = html + generateVideoHTML(videos[d]);
            }
        } else {
            // output html
            for(var t = 0, l = order.length; t < l; t++) {
                for(var i = 0; i < l; i++) {
                    if(videos[i].id.search(order[t]) !== -1) {
                        html = html +  generateVideoHTML(videos[i]);
                    }
                }
            }
        }
        
        return html;
    };

    this.generateGraphs = function() {
        
        for(var i = 0; i < videos.length; i++) {
            var data = videos[i].data;
            var canvas = $('#' + videos[i].canvas)[0];
            
            graphData(data, canvas);
        } 
    }
    
    this.getSmileCounts = function() {
        for(var i = 0; i < videos.length; i++) {
            var peaks = findPeaks(videos[i].data);
            videos[i].smileCount = peaks.length;
            console.log(videos[i].name + ' ' + videos[i].statsContainer + ': ' + videos[i].smileCount);
            $('.' + videos[i].statsContainer).find('.smilenum').html(videos[i].smileCount);
        }
    };
    
//    this.setContentIds = function() {
//        for(var i = 0; i < videos.length; i++) {
//            var con = $('.' + videos[i].statsContainer);
//            con.find('.voteButton').data('cid', videos[i].contentId);
//        }
//    };
    
    function findPeaks(data) {
        var prev = null;
        var next = null;
        var index = 1;
        var peaks = new Array();
        while(index < (data.length - 1)) {
            prev = data[index - 1];
            next = data[index + 1];
            if((data[index] > prev) && (data[index] > next) && (data[index] > .5)) {
                // we have a peak
                peaks.push(data[index]);
            }
            index++;
        }
        return peaks;
    }
    
    function generateVideoHTML(video) {
        var html =  '<li class="'+video.class+'" data-vid="'+video.id+'" data-cid="'+video.contentId+'">' +
                        '<a href="#"><img src="images/'+video.thumb+'" /></a>' +
                    '</li>';
        return html;
    }
    
    function graphData(array, canvas){

        var width=297;
        var height=199;
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(0,height);
        ctx.strokeStyle = 'rgba(255, 0, 0, 0)';

        var smileData = array;
        for (var i = 0; i < smileData.length; i++) {
            
            if(smileData[i] === faceGone) {
                smileData[i] = 0;
            }
            
            var y=height-smileData[i]*height;
            ctx.lineTo(width*i/smileData.length,y);
        };
        ctx.lineTo(width,height);
        ctx.lineTo(0,height);
        var grd=ctx.createLinearGradient(0,0,0,170);
        grd.addColorStop(0,"#f80001");
        grd.addColorStop(1,"#b00606");

        ctx.fillStyle=grd;
        ctx.fill();

    }
    
};