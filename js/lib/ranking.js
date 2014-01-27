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
            class: 'office',
            data: new Array(),
            contentId: '14400',
            order: 0
        },
        {
            name: 'Ostrich Thief',
            thumb: 'ostrich-thumb.png',
            id: 'MoANeCLWOjI',
            class: 'ostrich',
            data: new Array(),
            contentId: '14399',
            order: 0
            
        },
        {
            name: 'Finger Cleaner',
            thumb: 'finger-thumb.png',
            id: 'ugo7Y2lRsxc',
            class: 'finger',
            data: new Array(),
            contentId: '14398',
            order: 0
        },
        {
            name: 'Time Machine',
            thumb: 'time-thumb.png',
            id: 'Y-P0Hs0ADJY',
            class: 'time',
            data: new Array(),
            contentId: '14397',
            order: 0
        },
        {
            name: 'Cowboy Kid',
            thumb: 'cowboy-thumb.png',
            id: 'FHY5pwgCY3w',
            class: 'cowboy',
            data: new Array(),
            contentId: '14396',
            order: 0
        }
    ];
    
    // loop the data and assign the data to the videos array above
    var count = 0;
    for(key in data) {
        for(var i = 0; i < videos.length; i++) {
            if(key.search(videos[i].id) !== -1) {
                // we found the correct key
                videos[i].data = data[key];
                videos[i].order = count;
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
        
        // output html
        for(var t = 0, l = order.length; t < l; t++) {
            
            for(var i = 0; i < l; i++) {
                if(videos[i].id.search(order[t]) !== -1) {
                    // we found the matching videos
                    var video = findVideo(videos[i].id);
                    
                    html = html +   '<li class="'+video.class+'" data-vid="'+video.id+'" data-cid="'+video.contentId+'">' +
                                        '<a href="#"><img src="images/'+video.thumb+'" /></a>' +
                                    '</li>';
                }
            }
            
        }
        return html;
    };
    
    function findVideo(videoId) {
        for(var i = 0; i < videos.length; i++) {
            if(videos[i].id.search(videoId) !== -1) {
                // return that video index
                return videos[i];
            }
        }
        return false;
    }
    
};