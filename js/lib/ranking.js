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
            id: 'oMdwJ7fyp00'
        },
        {
            name: 'Ostrich Thief',
            thumb: 'ostrich-thumb.png',
            id: 'MoANeCLWOjI'
        },
        {
            name: 'Finger Cleaner',
            thumb: 'finger-thumb.png',
            id: 'ugo7Y2lRsxc'
        },
        {
            name: 'Time Machine',
            thumb: 'time-thumb.png',
            id: 'Y-P0Hs0ADJY'
        },
        {
            name: 'Cowboy Kid',
            thumb: 'cowboy-thumb.png',
            id: 'FHY5pwgCY3w'
        }
    ];
    
    var ranking = [
        'oMdwJ7fyp00',
        'MoANeCLWOjI',
        'ugo7Y2lRsxc',
        'Y-P0Hs0ADJY',
        'FHY5pwgCY3w'
    ];
    
    this.track = function() {
        // start cataloging results here
    };
    
    this.getRanking = function() {
        return ranking;
    }
    
};