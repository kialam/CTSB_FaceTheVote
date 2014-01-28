var VideoSwitcher = {
    player: new Object(),
    currentVideoId: '',
    init: function(e) {
        
        // prevent the default
        if(e) {
            e.preventDefault();
        }
        
        // make a playlist
        var self = this;
        this.player = new YT.Player($('.player')[0], {
            height: '500',
            width: '810',
            playerVars: {
                controls: 0
            },
            events: {
                'onReady': self.onPlayerReady,
                'onStateChange': self.onPlayerStateChange
            }
        });
        
    },
    onPlayerStateChange: function (event) {
            
        if (event.data == YT.PlayerState.PLAYING) {
            console.log('playing')
            // user is playing the video
            var data = event.target.getVideoData();
            var index = event.target.getPlaylistIndex();

            if(data.video_id !== self.currentVideoId) {
                // we changed videos
                currentVideo = data.video_id;
                console.log(self.currentVideoId);
                self.currentVideoId = data.video_id;
                
                // trigger an even that smileTracker can subscribe to
                $(window).trigger({
                    type: 'video_changed',
                    from: self.currentVideoId,
                    to: data.video_id
                });
            }

            // start the smiletracker
            $(window).trigger({
                type: 'videos_playing',
                evt: event
            });

        }

        if(event.data == YT.PlayerState.ENDED) {
            console.log('ended')

            // show stats
            $(window).trigger({
                type: 'videos_ended'
            });

        }

        if(event.data == YT.PlayerState.PAUSED) {
            console.log('paused')
            // the user can do this at any point
            $(window).trigger({
                type: 'videos_paused'
            });
        }

        if(event.data == YT.PlayerState.BUFFERING) {
            console.log('buffering')
            // shouldnt need to deal with this
        }

        if(event.data == YT.PlayerState.CUED) {
            console.log('cued')
            //  shouldnt need to deal with this
        }
            
    },
    onPlayerReady: function (event) {
        event.target.loadPlaylist(['oMdwJ7fyp00', 'MoANeCLWOjI', 'ugo7Y2lRsxc', 'Y-P0Hs0ADJY', 'FHY5pwgCY3w']);
        event.target.setShuffle({
            shufflePlaylist: true
        });
        event.target.playVideoAt(0);
//        playlistOrder = event.target.getPlaylist();
    },
    
    shuffle: function(o) {
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    },
    pause: function() {
        this.player.pauseVideo();
    },
    play: function() {
        this.player.playVideo();
    },
    getOrder: function() {
        return this.player.getPlaylist();
    }
};

//var Player = function(id) {
//    
//    
//    
//    
//
//};
