/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Ranking = function() {
    
    var videos = [
        {
            name: 'Office Thief',
            thumb: 'office-thumb.png',
            id: 'oMdwJ7fyp00',
            class: 'office'
        },
        {
            name: 'Ostrich Thief',
            thumb: 'ostrich-thumb.png',
            id: 'MoANeCLWOjI',
            class: 'ostrich'
        },
        {
            name: 'Finger Cleaner',
            thumb: 'finger-thumb.png',
            id: 'ugo7Y2lRsxc',
            class: 'finger'
        },
        {
            name: 'Time Machine',
            thumb: 'time-thumb.png',
            id: 'Y-P0Hs0ADJY',
            class: 'time'
        },
        {
            name: 'Cowboy Kid',
            thumb: 'cowboy-thumb.png',
            id: 'FHY5pwgCY3w',
            class: 'cowboy'
        }
    ];
    
    var ranking = [
        'MoANeCLWOjI',
        'oMdwJ7fyp00',
        'ugo7Y2lRsxc',
        'Y-P0Hs0ADJY',
        'FHY5pwgCY3w'
    ];
    
    this.track = function() {
        // start cataloging results here
    };
    
    this.getRankingOrder = function() {
        return ranking;
    };
    
    this.getRankingOrderHTML = function() {
        var html = '';
        
        for(var i = 0; i < ranking.length; i++) {
            
            var video = findVideo(ranking[i]);
            
            html = html +   '<li class="'+video.class+'">' +
                                '<a href="#"><img src="images/'+video.thumb+'" /></a>' +
                            '</li>';
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