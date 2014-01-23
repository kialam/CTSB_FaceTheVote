var VideoSwitcher = {
    videosClickHandler: function(event) {
        // prevent the default
        if(event) {
            event.preventDefault();
        }
        
        // make a playlist
        var player;
        var playerElem = $('.player')[0];
        
        var player;
        
        player = new YT.Player(playerElem, {
            height: '456',
            width: '810',
//            loadPlaylist: {
//                listType:'playlist',
//                list:['oMdwJ7fyp00', 'MoANeCLWOjI', 'ugo7Y2lRsxc', 'Y-P0Hs0ADJY', 'FHY5pwgCY3w'],
//                index:parseInt(0),
//                suggestedQuality:'medium'
//            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
        
        function onPlayerReady(event) {
//            event.target.cuePlaylist('oMdwJ7fyp00,MoANeCLWOjI,ugo7Y2lRsxc,Y-P0Hs0ADJY,FHY5pwgCY3w');
            event.target.loadPlaylist(['oMdwJ7fyp00', 'MoANeCLWOjI', 'ugo7Y2lRsxc', 'Y-P0Hs0ADJY', 'FHY5pwgCY3w']);
            event.target.setShuffle({
                shufflePlaylist: true
            });
            event.target.playVideoAt(0);
        }
        
        var done = false;
        function onPlayerStateChange(event) {
            
            if (event.data == YT.PlayerState.PLAYING) {
                console.log('playing')
            }
            
            if(event.data == YT.PlayerState.ENDED) {
                console.log('ended')
            }
            
            if(event.data == YT.PlayerState.PAUSED) {
                console.log('paused')
            }
            
            if(event.data == YT.PlayerState.BUFFERING) {
                console.log('buffering')
            }
            
            if(event.data == YT.PlayerState.CUED) {
                console.log('cued')
            }
            
        }
        
        function stopVideo() {
            player.stopVideo();
        }
        
        // start the smiletracker
        
        
        // set a video complete function
        
        
    },
    shuffle: function(o) {
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }
};

var Player = function(id) {
    
    
    
    

};
