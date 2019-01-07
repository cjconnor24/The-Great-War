/**
 * AUDIO MODULE - MANAGES AUDIO PLAYING IN BACKGROUND
 */
var AudioModule = ((function () {

    // DOM ELEMENTS
    var container = document.querySelector('.audio-player');
    var audioPlayer = document.querySelector('.audio-player audio');
    var play = document.querySelector('.audio-player li:nth-child(1)');
    var mute = document.querySelector('.audio-player li:nth-child(2)');

    // EVENT LISTENERS
    play.addEventListener('click', togglePLAYState);
    mute.addEventListener('click', toggleMUTEState)


    /**
     * Toggle the state of the audio
     */
    function togglePLAYState() {

        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }

        // UPDATE THE BUTTON ICON
        updatePLAYUI();
    }


    /**
     * Toggle the state of the volume
     */
    function toggleMUTEState() {

        if (audioPlayer.volume == 0) {
            audioPlayer.volume = 1;
        } else {
            audioPlayer.volume = 0;
        }

        updateMUTEUI();

    }

    /**
     * Update the Play Button Icon
     */
    function updatePLAYUI() {
        play.classList.toggle('playing');
        play.classList.toggle('paused');
    }

    /**
     * Update the mute button icon
     */
    function updateMUTEUI() {
        mute.classList.toggle('muted');
        mute.classList.toggle('loud');
    }


})());