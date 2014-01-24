//Dynamic Content Replace Script
/* Transitions & Animations */

(function($) {
    $(window).load(function() {
        // smile tracker
        vid = document.getElementById('videoel');
        overlay = document.getElementById('overlay');
        overlayCC = overlay.getContext('2d');
        
        // pages
        intro = $('.intro');
        permission = $('.permission');
        watch = $('.watch');
        results = $('.results');
        how = $('.how');
        
        // intro button clicked
        intro.find('.startButton').on('click', function(evt) {
            evt.preventDefault();
            hidePage(intro);
            showPage(permission);
            Webcam.webcamClickHandler(evt);
        });
        
        // we got permission from the webcam
        $(window).on('webcam_permission_received', function(evt) {
            hidePage(permission);
            showPage(watch);
            VideoSwitcher.videosClickHandler(evt);
        });
        
        $(window).on('smile_update', function(evt) {
            // check the current video
            var currentVideo = VideoSwitcher.currentVideoId;
            
            // add the update to the analytics array at the current id
            if(currentVideo in analytics) {
                analytics[currentVideo].push(evt.update);
            } else {
                analytics[currentVideo] = new Array();
                analytics[currentVideo].push(evt.update);
            }
        });
        
    });
})(jQuery);

$(window).load(function() {
    if(window.location.hash) {
        if(window.location.hash.search('videos')) {
            hidePage(intro);
            hidePage(permission);
            hidePage(results);
            hidePage(how);
            showPage(watch);
            VideoSwitcher.videosClickHandler();
        }
    }
});

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