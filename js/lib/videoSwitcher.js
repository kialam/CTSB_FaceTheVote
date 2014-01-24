var VideoSwitcher = {
    currentVideoId: '',
    videosClickHandler: function(e) {
        
        var self = this;
        
        // prevent the default
        if(e) {
            e.preventDefault();
        }
        
        // make a playlist
        var player;
        
        player = new YT.Player($('.player')[0], {
            height: '500',
            width: '810',
            playerVars: {
                controls: 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
        
        function onPlayerReady(event) {
            event.target.loadPlaylist(['oMdwJ7fyp00', 'MoANeCLWOjI', 'ugo7Y2lRsxc', 'Y-P0Hs0ADJY', 'FHY5pwgCY3w']);
            event.target.setShuffle({
                shufflePlaylist: true
            });
            event.target.playVideoAt(0);
        }
        
        function onPlayerStateChange(event) {
            
            if (event.data == YT.PlayerState.PLAYING) {
                console.log('playing')
                // user is playing the video
                var data = event.target.getVideoData();
                var index = event.target.getPlaylistIndex();
                
                if(data.video_id !== self.currentVideoId) {
                    // we changed videos
                    self.currentVideoId = data.video_id;
                    console.log(self.currentVideoId);
                    
                    // start the smiletracker
                    
                }
                
            }
            
            if(event.data == YT.PlayerState.ENDED) {
                console.log('ended')
                // should only get this when all the commercials are done playing
                
                // show stats
                
            }
            
            if(event.data == YT.PlayerState.PAUSED) {
                console.log('paused')
                // the user can do this at any point
            }
            
            if(event.data == YT.PlayerState.BUFFERING) {
                console.log('buffering')
                // shouldnt need to deal with this
            }
            
            if(event.data == YT.PlayerState.CUED) {
                console.log('cued')
                //  shouldnt need to deal with this
            }
            
        }
        
        function stopVideo() {
            player.stopVideo();
        }
        
    },
    shuffle: function(o) {
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }
};

//var Player = function(id) {
//    
//    
//    
//    
//
//};
