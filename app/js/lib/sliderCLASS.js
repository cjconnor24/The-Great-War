

function Slide(img, caption) {
    this.img = img;
    this.caption = caption;
}

function Slider(){
    this.slides = {};
    this.currentPosition = 0;
    this.elements = 0;
    this.DOMStrings = {
        nextButton: '.next',
        prevButton: '.prev',
        container: '.slideshow-container',
        slide: '.mySlides',
        dot: '.dot'
    };
    this.templates = {

        container: function (slides, controls, dots) {
            return `<div class="${DOMStrings.container.replace('.', '')}">
        ${slides}
        ${controls}
        ${dots}
        </div>`;
        },

        slide: function (slide, n) {
            return `<div class="${DOMStrings.slide.replace('.', '')} fade">
        <div class="numbertext">${n + 1} / ${maxElements + 1}</div>
        <img src="${slide.img}" style="width:100%">
        <div class="text">${slide.caption}</div>
    </div>`;
        },

        controls: function () {
            return `<a class="${DOMStrings.prevButton.replace('.', '')}" >&#10094;</a>
        <a class="${DOMStrings.nextButton.replace('.', '')}" >&#10095;</a>`;
        },

        dots: function () {

            var templateString = '';
            for (var i = 0; i <= maxElements; i++) {
                templateString += `<span class="dot" data-slide="${i}"></span>`;
            }

            return `<div class="dots" style="text-align:center">
            ${templateString}
    </div>`;
        },

    };
}



var slider = (function (slideCollection, where, position) {


        addEventListeners = function () {

            document.querySelector(DOMStrings.nextButton).addEventListener('click', next);
            document.querySelector(DOMStrings.prevButton).addEventListener('click', previous);
            document.querySelectorAll(DOMStrings.dot).forEach(function (el) {
                el.addEventListener('click', function (e) {

                    currentPosition = e.target.getAttribute('data-slide');
                    updateUI();

                });
            });

        }

        buildSlider = function () {

            var listOfSlides = slides.reduce((x, y, index) => {
                return x + templates.slide(y, index);
            }, '');
            return templates.container(listOfSlides, templates.controls(), templates.dots());

        }



        updateUI = function () {
            hideAll();
            showSlides();
        };

        /**
         * CLEAR THE UI FROM IMAGES AND DOTS
         */
        hideAll = function () {
            document.querySelectorAll(DOMStrings.slide).forEach((slide) => {
                slide.style.display = "none";
            });
            document.querySelectorAll(DOMStrings.dot).forEach((dot) => {
                dot.classList.remove('active');
            });
        }


        function showSlides() {

            document.querySelectorAll(DOMStrings.slide)[currentPosition].style.display = "block";
            document.querySelectorAll(DOMStrings.dot)[currentPosition].classList.add('active');

        }


        // ITERATOR FUNCTIONS

        next = function () {

            if (currentPosition < maxElements) {
                currentPosition++;
            } else {
                rewind();
            }
            updateUI();
            console.log('NEXT', currentPosition);
        };

        previous = function () {

            if (currentPosition > 0) {
                currentPosition--;
            } else {
                currentPosition = maxElements;
            }
            console.log('PREVIOUS', currentPosition);
            updateUI();
        };

        current = function () {
            return slides[currentPosition];
        };

        rewind = function () {
            currentPosition = 0;
        };

        init = function () {

            console.log("TIRGGER");
            console.log(this);

            // HIGHLIGHT THE FIRST SLIDE
            document.querySelector(where).insertAdjacentHTML(position, buildSlider());
            document.querySelector(DOMStrings.slide).style.display = 'block';
            document.querySelector(DOMStrings.dot).classList.add('active');
            addEventListeners();


        }

        config = function(where, position){
            console.log(this);
            this.where = where;
            this.position = position;
            console.log(this);
        }

        

        return {
            next: next,
            previous: previous,
            rewind: rewind,
            // buildSlider: buildSlider,
            init: init,
            hideAll: hideAll,
            showSlides: showSlides,
            config: config
        }

}([
    new Slide('img/tank.jpg', 'This is a tank'),
    new Slide('img/gas-mask-horse.jpg', 'This is a Gas Mask Horse'),
    new Slide('img/us-military.jpg', 'This the US soldiers'),
    new Slide('img/logo.svg', 'This thethe logos')
], '.test-div', 'beforeend'));