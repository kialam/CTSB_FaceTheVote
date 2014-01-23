/* Variables */
                        
var snippets = {
    start: '<div class="center">' +
					'<h1 class="align">' +
						'<img src="images/title.png">' +
					"</h1>" +
						"<p>" +
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu fringilla sapien, in porta metus. Aliquam rutrum enim ut massa ultrices malesuada." +
						"</p>" +
						'<a href="webcam.html">' +
							'<img class="align" src="images/watch.png">' +
						"</a>" +			
				"</div>",
    webcam: '<div class="center">' +
					'<h1 class="align">' +
						'<img src="images/letwebcam.png">' +
					"</h1>" +
						'<img class="align" src="images/webcam.png">' +
						"<p>" +
							"Legal Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
						"</p>" +
						'<a id="smile" href="smile.html">Smile</a>' +
					"</div>",
    nosmile: '<img class="align" src="images/nosmile.png">' +
				'<a id="videos" href="videos.html">Videos</a>',
    smile: '<img class="align" src="images/smile.png">' +
				'<a id="nosmile" href="nosmile.html">No Smile</a>',
    videos: ['oMdwJ7fyp00', 'MoANeCLWOjI', 'ugo7Y2lRsxc', 'Y-P0Hs0ADJY', 'FHY5pwgCY3w'],
    videoHTML: '<div class="player"></div>'
};

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;
               
var start,
    webcam,
    smile,
    nosmile,
    videos,
    vid,
    overlay,
    overlayCC;
    