
        var AudioModule = ((function () {

            // DOM
            var container = document.querySelector('.audio-player');
            var audioPlayer = document.querySelector('.audio-player audio');
            var play = document.querySelector('.audio-player li:nth-child(1)');
            var mute = document.querySelector('.audio-player li:nth-child(2)');

            // EVENT LISTENERS
            play.addEventListener('click', togglePLAYState);
            mute.addEventListener('click', toggleMUTEState)


            function togglePLAYState() {



                if (audioPlayer.paused) {
                    audioPlayer.play();
                } else {
                    audioPlayer.pause();
                }

                updatePLAYUI();
            }


            function toggleMUTEState() {



                if (audioPlayer.volume == 0) {
                    audioPlayer.volume = 1;
                } else {
                    audioPlayer.volume = 0;
                }

                updateMUTEUI();

            }


            function updatePLAYUI() {
                play.classList.toggle('playing');
                play.classList.toggle('paused');
            }
            function updateMUTEUI() {
                mute.classList.toggle('muted');
                mute.classList.toggle('loud');
            }


        })());