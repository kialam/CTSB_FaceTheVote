//Dynamic Content Replace Script

/* Variables */

var start = 	'<div class="center">' +
					'<h1 class="align">' +
						'<img src="images/title.png">' +
					"</h1>" +
						"<p>" +
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu fringilla sapien, in porta metus. Aliquam rutrum enim ut massa ultrices malesuada." +
						"</p>" +
						'<a href="webcam.html">' +
							'<img class="align" src="images/watch.png">' +
						"</a>" +			
				"</div>"; // end center

var webcam = 	'<div class="center">' +
					'<h1 class="align">' +
						'<img src="images/letwebcam.png">' +
					"</h1>" +
						'<img class="align" src="images/webcam.png">' +
						"<p>" +
							"Legal Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
						"</p>" +
						'<a id="smile" href="smile.html">Smile</a>' +
					"</div>"; // end center

var nosmile =	'<img class="align" src="images/nosmile.png">' +
				'<a id="videos" href="videos.html">Videos</a>'; // end

var smile =		'<img class="align" src="images/smile.png">' +
				'<a id="nosmile" href="nosmile.html">No Smile</a>'; // end

var videos =	[
    {
        code: '<iframe width="810" height="456" src="' + 
            "//www.youtube.com/embed/oMdwJ7fyp00?rel=0" +
            'frameborder="0" allowfullscreen></iframe>' +
            '<a id="start" href="index.html">Start</a>', // end
        title: 'stuff',
    },
    {
        code: '<iframe width="810" height="456" src="' + 
            "//www.youtube.com/embed/oMdwJ7fyp00?rel=0" +
            'frameborder="0" allowfullscreen></iframe>' +
            '<a id="start" href="index.html">Start</a>', // end
        title: 'stuff',
    },
    {
        code: '<iframe width="810" height="456" src="' + 
            "//www.youtube.com/embed/oMdwJ7fyp00?rel=0" +
            'frameborder="0" allowfullscreen></iframe>' +
            '<a id="start" href="index.html">Start</a>', // end
        title: 'stuff',
    },
    {
        code: '<iframe width="810" height="456" src="' + 
            "//www.youtube.com/embed/oMdwJ7fyp00?rel=0" +
            'frameborder="0" allowfullscreen></iframe>' +
            '<a id="start" href="index.html">Start</a>', // end
        title: 'stuff',
    },
    {
        code: '<iframe width="810" height="456" src="' + 
            "//www.youtube.com/embed/oMdwJ7fyp00?rel=0" +
            'frameborder="0" allowfullscreen></iframe>' +
            '<a id="start" href="index.html">Start</a>', // end
        title: 'stuff',
    }
];

navigator.getMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

/* Transitions & Animations */
$(document).ready(function(){
	
	$("#webcam").on('click', function(event){
		event.preventDefault();
		$('.container').fadeOut('slow', function(){
			$('.container').html(webcam);
			$('.container').fadeIn('slow', function(){
				//activate webcam
				navigator.getMedia({
					video: true,
					audio: false,
				},
				function(videoStream){
					alert('we have your webcam');
				},
				function(err){
					console.log("The following error occurred: ")
					console.log(err);
					// console.log("you didn't allow for webcam access");
				});
			});
		});
	});

	$(".container").on('click', '#smile', function(event){
		event.preventDefault();
		$('.container').fadeOut('slow', function(){
			$('.container').html(smile);
			$('.container').fadeIn('slow');
		});
	})
	$(".container").on('click', '#smile', function(event){
		event.preventDefault();
		$('.container').fadeOut('slow', function(){
			$('.container').html(smile);
			$('.container').fadeIn('slow');
		});
	})
	$(".container").on('click', '#nosmile', function(event){
		event.preventDefault();
		$('.container').fadeOut('slow', function(){
			$('.container').html(nosmile);
			$('.container').fadeIn('slow');
		});
	})
	$(".container").on('click', '#videos', function(event){
		event.preventDefault();
		$('.container').fadeOut('slow', function(){
			$('.container').html(videos);
			$('.container').fadeIn('slow');
		});
	})
});