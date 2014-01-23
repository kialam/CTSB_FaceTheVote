var Webcam = {
    webcamClickHandler: function(event) {
        // define scope
        var self = this;
        
        event.preventDefault();
        
        //activate webcam
        navigator.getMedia(
            {
                video: true,
                audio: false,
            },

            function(videoStream) {
                console.log('we have your webcam');
                webcam.addClass('hidden');
                smile.removeClass('hidden');
            },

            function(err){

                if( err.name === 'PermissionDeniedError' ) {
                    self.showAccessDenied();
                }

                if( err.name === 'ConstraintNotSatisfiedError' ) {
                    self.showNoWebcam();
                }
            }
        );
    },
    showAccessDenied: function() {
        alert('you denied us access to your webcam');
    },
    showNoWebcam: function() {
        alert('you dont have a webcam');
    }
};