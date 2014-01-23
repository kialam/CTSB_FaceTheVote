//Dynamic Content Replace Script
/* Transitions & Animations */
$(document).ready(function(){
    
    start = $('.start');
    webcam = $('.webcam');
    smile = $('.smile');
    nosmile = $('.nosmile');
    videos = $('.videos');
	
    $("#webcam").on('click',  function(event) {
        event.preventDefault();

        start.addClass('hidden');
        webcam.removeClass('hidden');

        Webcam.webcamClickHandler(event);
    });

    $("#smile").on('click', '', function(event){
        event.preventDefault();

        webcam.addClass('hidden');
        smile.removeClass('hidden');
    });

    $("#nosmile").on('click', function(event){
        event.preventDefault();

        smile.addClass('hidden');
        nosmile.removeClass('hidden');

    });

    $("#videos").on('click', function(event){
        event.preventDefault();

        nosmile.addClass('hidden');
        videos.removeClass('hidden');

        VideoSwitcher.videosClickHandler(event);
    });
});

$(window).load(function() {
    if(window.location.hash) {
        if(window.location.hash.search('videos')) {
            nosmile.addClass('hidden');
            videos.removeClass('hidden');
            VideoSwitcher.videosClickHandler(event);
        }
    }
});
