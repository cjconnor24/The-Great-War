

function Slide(img, caption) {
    this.img = img;
    this.caption = caption;
}



function Slider() {

// slideCollection, where, position
        // var slides = {};
        // var options = {};
        // var currentPosition = 0;
        // var maxElements = 0;

        /**
         * DOM Strings to Centralise
         */
        var DOMStrings = {
            nextButton: '.next',
            prevButton: '.prev',
            container: '.slideshow-container',
            slide: '.mySlides',
            dot: '.dot'
        }

        /**
         * TEMPLATES FOR UI
         */
        var templates = {

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

        var addEventListeners = function () {

            console.log('adding event listeners');

            document.querySelector(DOMStrings.nextButton).addEventListener('click', next);
            document.querySelector(DOMStrings.prevButton).addEventListener('click', previous);
            document.querySelectorAll(DOMStrings.dot).forEach(function (el) {
                el.addEventListener('click', function (e) {

                    currentPosition = e.target.getAttribute('data-slide');
                    updateUI();

                });
            });

        }

        var buildSlider = function () {

            // console.log(this.slides);

            var listOfSlides = slides.reduce((x, y, index) => {
                return x + templates.slide(y, index);
            }, '');
            return templates.container(listOfSlides, templates.controls(), templates.dots());

        }



        var updateUI = function () {
            hideAll();
            showSlides();
        };

        /**
         * CLEAR THE UI FROM IMAGES AND DOTS
         */
        var hideAll = function () {
            document.querySelectorAll(DOMStrings.slide).forEach((slide) => {
                slide.style.display = "none";
            });
            document.querySelectorAll(DOMStrings.dot).forEach((dot) => {
                dot.classList.remove('active');
            });
        }


        var showSlides = function() {

            document.querySelectorAll(DOMStrings.slide)[currentPosition].style.display = "block";
            document.querySelectorAll(DOMStrings.dot)[currentPosition].classList.add('active');

        }


        // ITERATOR FUNCTIONS

        var next = function () {

            if (currentPosition < maxElements) {
                currentPosition++;
            } else {
                rewind();
            }
            updateUI();
            console.log('NEXT', currentPosition);
        };

        var previous = function () {

            if (currentPosition > 0) {
                currentPosition--;
            } else {
                currentPosition = maxElements;
            }
            console.log('PREVIOUS', currentPosition);
            updateUI();
        };

        var current = function () {
            return slides[currentPosition];
        };

        var rewind = function () {
            currentPosition = 0;
        };

        var init = function (s,options) {

            var self = this;

        
            options = options;      
            
            // document.querySelector(options.where).insertAdjacentHTML(options.position, buildSlider());
            // document.querySelector(DOMStrings.slide).style.display = 'block';
            // document.querySelector(DOMStrings.dot).classList.add('active');
            // addEventListeners();

        }

        var getSlides = function(){
            return this.slides;
        }

        var config = function(where, position){
            console.log(this);
            this.where = where;
            this.position = position;
            console.log(this);
        }

        var doSomething = function(){

            console.log('THIS WILL DO SOMETHING');
        }

        

        return {
            // next: next,
            // previous: previous,
            // rewind: rewind,
            // buildSlider: buildSlider,
            init: init,
            doSomething: doSomething,
            config: config,
            getSlides: getSlides
            // hideAll: hideAll,
            // showSlides: showSlides,
            // config: config
        }

}
// ([
//     new Slide('img/tank.jpg', 'This is a tank'),
//     new Slide('img/gas-mask-horse.jpg', 'This is a Gas Mask Horse'),
//     new Slide('img/us-military.jpg', 'This the US soldiers'),
//     new Slide('img/logo.svg', 'This thethe logos')
// ], '.test-div', 'beforeend'));