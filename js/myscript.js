//Dynamic Content Replace Script
/* Transitions & Animations */
$(document).ready(function(){
    
//        var tag = document.createElement('script');
//        tag.src = "https://www.youtube.com/iframe_api";
//        var firstScriptTag = document.getElementsByTagName('script')[0];
//        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	
	$("#webcam").on('click',  function(event) {
            Webcam.webcamClickHandler(event);
        });
        
	$(".container").on('click', '#smile', function(event){
		event.preventDefault();
		$('.container').fadeOut('slow', function(){
                    $('.container').html(snippets.smile);
                    $('.container').fadeIn('slow');
		});
	});
        
	$(".container").on('click', '#nosmile', function(event){
		event.preventDefault();
		$('.container').fadeOut('slow', function(){
			$('.container').html(snippets.nosmile);
			$('.container').fadeIn('slow');
		});
	});
        
	$(".container").on('click', '#videos', function(event){
		VideoSwitcher.videosClickHandler(event);
	});
});
