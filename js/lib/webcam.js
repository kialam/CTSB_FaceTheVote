var Webcam = {
    startWebcam: function(event) {
        // define scope
        var self = this;
        
        if(event) {
            event.preventDefault();
        }
        
        // check for camerasupport
        if (navigator.getUserMedia) {
            // set up stream
            // 640x360
            var videoSelector = {
                video : {
                    mandatory: {
                        maxWidth: 640,
                        maxHeight: 360
                    }
                }
            };

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
//                    webcam.addClass('hidden');
//                    smile.removeClass('hidden');

                    if (vid.mozCaptureStream) {
                        vid.mozSrcObject = stream;
                    } else {
                        vid.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
                    }

                    // only play one of these video elements
//                    vid.play();
                    
                    // trigger the next phase
                    $(window).trigger({
                        type: 'webcam_permission_received',
                        evt: event
                    });

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
//            var st = new SmileTracker();
//            st.startVideo();
        }, false);
    },
    showAccessDenied: function() {
        alert('you denied us access to your webcam');
    },
    showNoWebcam: function() {
        alert('you dont have a webcam');
    }
};