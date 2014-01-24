//Dynamic Content Replace Script
/* Transitions & Animations */

(function($) {
    $(window).load(function() {
        // analytics
        analytics = new Object();
        lastValue = 0;
        
        // smile tracker
        vid = document.getElementById('videoel');
        overlay = document.getElementById('overlay');
        overlayCC = overlay.getContext('2d');
        smileTracker = new SmileTracker();
        
        // ranking
        ranking = new Ranking();
        
        // pages
        intro = $('.intro');
        permission = $('.permission');
        watch = $('.watch');
        results = $('.results');
        how = $('.how');
        destinationPage = 'intro';
        
        // intro button clicked
        intro.find('.startButton').on('click', function(evt) {
            evt.preventDefault();
            destinationPage = 'permission';
            hidePage(intro);
            showPage(permission);
            Webcam.startWebcam(evt);
        });
        
        // we got permission from the webcam
        $(window).on('webcam_permission_received', function(evt) {
            // we can get webcam permission for the how page too
            // so we need some way to determine which page the user wants
            if(destinationPage.search('permission') !== -1) {
                hidePage(permission);
                showPage(watch);
                VideoSwitcher.init(evt);
            }
        });
        
        $(window).on('videos_playing', function(evt) {
            smileTracker.start();
        });
        
        $(window).on('videos_paused', function(evt) {
            smileTracker.pause();
        });
        
        $(window).on('videos_ended', function(evt) {
            smileTracker.pause();
            hidePage(watch);
            showPage(results);
        });
        
//        $(window).on('smile_update', function(evt) {
//            // check the current video
//            addReadingToAnalytics(VideoSwitcher.currentVideoId, evt.smileValue);
//        });
        
//        setInterval(function() {
//            var val = smileTracker.getCurrentSmileValue();
//            if(val !== lastValue) {
//                lastValue = val;
//                addReadingToAnalytics(VideoSwitcher.currentVideoId, val);
//            }
//        }, 1000);

        // how button clicked
        results.find('.howButton').on('click', function(evt) {
            evt.preventDefault();
            destinationPage = 'how';
            hidePage(results);
            showPage(how);
            
            // start the smile tracker and draw this time
            smileTracker.setDrawing(true);
            smileTracker.start();
        });
        
        // no face!
//        $(document).on('clmtrackrNotFound', function(evt) {
//            console.log('no face')
//            VideoSwitcher.pause();
//        });
//        // ???
//        $(document).on('clmtrackrLost', function(evt) {
//            console.log('no face')
//            VideoSwitcher.pause();
//        });
//        
//        // TODO - find out how to play the video once we find the face
        
        
        // fragments
        if(window.location.hash) {

            if(window.location.hash.search('watch') !== -1) {
                hidePage(intro);
                hidePage(permission);
                hidePage(results);
                hidePage(how);
                showPage(watch);
                VideoSwitcher.init();

            }

            if(window.location.hash.search('permission') !== -1) {
                hidePage(intro);
                hidePage(watch);
                hidePage(results);
                hidePage(how);
                showPage(permission);
                VideoSwitcher.init();
            }

            if(window.location.hash.search('results') !== -1) {
                hidePage(intro);
                hidePage(watch);
                hidePage(permission);
                hidePage(how);
                showPage(results);

                var thumbs = ranking.getRankingOrderHTML();
                results.find('.resultsVideos ul').html(thumbs);
            }

            if(window.location.hash.search('how') !== -1) {
                hidePage(intro);
                hidePage(permission);
                hidePage(results);
                hidePage(watch);
                showPage(how);

                Webcam.startWebcam();
                smileTracker.setDrawing(true);
                smileTracker.start();
            }

        }
        
    });
})(jQuery);

function addReadingToAnalytics(id, value) {
    // add the update to the analytics array at the current id
    if(id in analytics) {
        analytics[id].push(value);
    } else {
        analytics[id] = new Array();
        analytics[id].push(value);
    }
}

function showPage(elem) {
    elem.removeClass('hidden').css({
        opacity: 1
    });
}

function hidePage(elem) {
    elem.css({
        opacity: 0
    });

    setTimeout(function() {
        elem.addClass('hidden');
    }, 1000);
}