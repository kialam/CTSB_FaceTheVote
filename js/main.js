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
            
            // replace default html with the real order of the videos
            var r = new Ranking(smileTracker.getData());
            var html = r.getVideosHTML();
            $('.resultsVideos ul').html(html);
            
            hidePage(watch);
            showPage(results);
            
            // TODO make this real
            $('.vote').on('click', function(evt) {
                // get content id
                var cid = $(this).data('cid');
                voteThisMoment(cid, function() {
                    // dispay a message that says thanks for the vote
                });
            });
        });
        
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

function voteThisMoment(cid, callback) {
    // check for presence of past voting cookie
    if(document.cookie.indexOf('hvdor=') !== -1) {
        alert('You\'ve already voted today. Please try again tomorrow.');
        return;
    }
    
    jQuery.support.cors = true;
    var url = 'https://www.doritos.com/v4/api/content/vote.json';
    
    // this doesn't work in IE 9; works in IE 10
    $.getJSON(url, {
        content_id: cid
    }, function(data) {
        if(data.status == 'OK') {
            setVotingCookie();
            callback();
        } else {
            console.log('no vote cast');
        }   
    })
    .error(function(jqXHR, textStatus, errorThrown) { alert(errorThrown); });
}

function setVotingCookie() {
    var date = new Date();
    var midnight = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
    document.cookie = 'hvdor=1; expires=' + midnight.toGMTString() + '; path=/';
}