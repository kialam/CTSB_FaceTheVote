/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Ranking = function(data) {
    
    var videos = [
        {
            name: 'Office Thief',
            thumb: 'office-thumb.png',
            id: 'oMdwJ7fyp00',
            class: 'officeThumb',
            data: new Array(),
            contentId: '14400',
//            order: 0
        },
        {
            name: 'Ostrich Thief',
            thumb: 'ostrich-thumb.png',
            id: 'MoANeCLWOjI',
            class: 'ostrichThumb',
            data: new Array(),
            contentId: '14399',
//            order: 0
            
        },
        {
            name: 'Finger Cleaner',
            thumb: 'finger-thumb.png',
            id: 'ugo7Y2lRsxc',
            class: 'fingerThumb',
            data: new Array(),
            contentId: '14398',
//            order: 0
        },
        {
            name: 'Time Machine',
            thumb: 'time-thumb.png',
            id: 'Y-P0Hs0ADJY',
            class: 'timeThumb',
            data: new Array(),
            contentId: '14397',
//            order: 0
        },
        {
            name: 'Cowboy Kid',
            thumb: 'cowboy-thumb.png',
            id: 'FHY5pwgCY3w',
            class: 'cowboyThumb',
            data: new Array(),
            contentId: '14396',
//            order: 0
        }
    ];
    
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
    
    function generateVideoHTML(video) {
        var html =  '<li class="'+video.class+'" data-vid="'+video.id+'" data-cid="'+video.contentId+'">' +
                        '<a href="#"><img src="images/'+video.thumb+'" /></a>' +
                    '</li>';
        return html;
    }
    
    // DEPRECATED 1.26.14
//    function findVideo(videoId) {
//        for(var i = 0; i < videos.length; i++) {
//            if(videos[i].id.search(videoId) !== -1) {
//                // return that video index
//                return videos[i];
//            }
//        }
//        return false;
//    }
    
};