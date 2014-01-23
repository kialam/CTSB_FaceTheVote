var Webcam = {
    webcamClickHandler: function(event) {
        // define scope
        var self = this;
        
        event.preventDefault();
        
        // check for camerasupport
        if (navigator.getUserMedia) {
            // set up stream
            var videoSelector = {video : true};

            // check for chrome version
            if (window.navigator.appVersion.match(/Chrome\/(.*?) /)) {
                    var chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
                    if (chromeVersion < 20) {
                            videoSelector = "video";
                    }
            };

            //call get user media
            navigator.getUserMedia(videoSelector, 

                // if we got a video
                function( stream ) {
                    webcam.addClass('hidden');
                    smile.removeClass('hidden');

                    if (vid.mozCaptureStream) {
                        vid.mozSrcObject = stream;
                    } else {
                        vid.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
                    }

                    vid.play();

                // if we didnt get a video
                }, function() {
                    if( err.name === 'PermissionDeniedError' ) {
                        self.showAccessDenied();
                    }

                    if( err.name === 'ConstraintNotSatisfiedError' ) {
                        self.showNoWebcam();
                    }
                }
            );
                
        } else {
            // no browser support
            self.showNoWebcam();
        }

        // start the smile training because our webcam is enabled
        vid.addEventListener('canplay', function() {
            // start the smile tracker
            var st = new SmileTracker();
            st.startVideo();
        }, false);
    },
    showAccessDenied: function() {
        alert('you denied us access to your webcam');
    },
    showNoWebcam: function() {
        alert('you dont have a webcam');
    }
};