var MediaModule = (function () {

    console.log('MEDIA MODULE LOADED');

    // DOM ELEMENTS
    var container = document.querySelector('#media-module');
    var mediaTable = document.querySelector('.list table');
    var video = document.querySelector('.player video');
    var nowPlaying = document.querySelector('.now-playing span');
    var controls = {
        container: document.querySelector('.media-container .controls'),
        prev: document.querySelector('.media-container .controls li:nth-child(1)'),
        play: document.querySelector('.media-container .controls li:nth-child(2)'),
        next: document.querySelector('.media-container .controls li:nth-child(3)')
    }

    // CONTROL EVENT LISTENERS
    controls.play.addEventListener('click', toggleVideoState);
    controls.next.addEventListener('click', next);
    controls.prev.addEventListener('click', previous);

    // TABLE CLICK EVENT LISTENERS
    mediaTable.addEventListener('click', function (e) {

        var row = e.target.closest('tr');
        var mediaIndex = parseInt(row.attributes.getNamedItem('data-media-index').value);

        if (currentVideo == mediaIndex) {
            toggleVideoState();
        } else {

            currentVideo = mediaIndex;
            tableUIUpdate();
            changeSource(mediaIndex);

        }

    });

    // VIDEO EVENT LISTENERS
    video.onmouseover = toggleControlsUI;
    video.onplaying = function () {
        console.log("Video Playing");
        controls.play.classList.remove('play');
        controls.play.classList.add('pause');
    }
    video.onpause = function () {
        console.log("Video paused");
        controls.play.classList.remove('pause');
        controls.play.classList.add('play');
    }
    video.onmouseout = function () {
        console.log("MOUSE OUT")
        setTimeout(toggleControlsUI, 3000);
        // toggleControlsUI();
    }

    // KEYBOARD EVENT LISTENERS
    window.addEventListener('keyup', function (e) {

        switch (e.keyCode) {
            // SPACE BAR
            case 32:
                toggleVideoState()
                break;
            // LEFT ARROW
            case 38:
                previous()
                break;
            // RIGHT ARROW
            case 40:
                next()
                break;
            default:
                break;
        }

    });
    // EASTER-EGG CONSOLE LOG :)
    console.log('%c You can use your keys here :) <- (space) -> ', 'background: #E9CC8A; color: #000');

    // TEMPLATE STRINGS
    var template = (file, index) => {
        return `<tr data-media-index="${index}">
                    <td><strong>${index + 1}.</strong> ${file.title} <span>${file.length}</span> <a href="${file.original}" target="_blank" title="${file.title} Original Link"> <i class="fas fa-link"></i></a> </td>
                </tr>`
    };

    // STATE
    var media = [];
    var currentVideo = 0;


    // METHODS ----------------

    function toggleVideoState() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }

    }

    function tableUIUpdate() {

        var row = currentVideo + 1;

        if (document.querySelector('.playing')) {
            document.querySelector('.playing').classList.remove('playing');
        }
        document.querySelector(`tr:nth-child(${row})`).classList.add('playing');


    }

    function toggleControlsUI() {
        controls.container.classList.toggle('hidden');
    }

    function changeSource(index) {
        video.src = media[index].files[0];
        updateNowPlaying();
    }

    function updateNowPlaying() {
        console.log('now playing');
        nowPlaying.innerHTML = media[currentVideo].description;
    }

    function next() {

        if (hasNext()) {
            currentVideo++;
            changeSource(currentVideo);
            tableUIUpdate();
        }

    }

    function hasNext() {
        console.log('Current is', currentVideo, 'Current max length is', media.length);
        return (currentVideo < media.length - 1);
    }

    function previous() {

        if (hasPrevious()) {

            currentVideo--;
            changeSource(currentVideo);
            tableUIUpdate();

        }

    }

    function hasPrevious() {
        return (currentVideo > 0);
    }


    function init() {

        // LOAD MEDIA

        // UPDATE 

    }

    function _buildTable() {

        var templateString = media.reduce((html, file, index) => {
            return html + template(file, index);
        }, '');

        console.log(templateString);
        mediaTable.innerHTML = templateString;

    }

    async function _loadMedia() {

        var data = await fetch('/content/media.json');
        var json = await data.json();

        json.forEach((file) => {
            media.push(file);
        });

        _buildTable();
        tableUIUpdate();

    }

    _loadMedia();

    function currentState() {
        return {
            currentVideo: currentVideo,
            media: media
        }
    }

    return {
        currentState: currentState
    }


}());