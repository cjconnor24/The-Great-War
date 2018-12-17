var ContentModule = (function () {

    // DOM ELEMENTS
    var container = document.querySelector('.site-container');

    // CURRENT STATE
    var currentPage;

    var pages = [];

    // EVENT LISTENERS

    function _render() {



    }

    function init(routeData) {

        

        if (routeData.route.name == "pages") {

            getPage(routeData.params[1]);
        }

        if (routeData.route.name == "grid") {
            getGrid(routeData);
        }

        if (routeData.route.name == "module") {

                getModule(routeData);

        }

        async function getModule(routeData) {


            var data = await fetch('/content/media.html');
            var html = await data.text();

            var scriptModule = document.createElement('script');
            scriptModule.src = "/js/lib/mediaModule.js";
            scriptModule.onload = function(){

            }

            container.innerHTML = html;
            container.insertAdjacentElement('beforeend',scriptModule);


        }

    }


    async function getGrid(routeData) {

        var data = await api.getGrid();

        var template = await api.getText('templates/grid-template.mustache.html');
        var renderedTemplate = Mustache.render(template, { elements: data });

        container.innerHTML = renderedTemplate;

    }

    function parseContent(content) {




        var newContent = content;
        newContent.body = '';
        newContent.col1 = '';
        newContent.col2 = '';

        var delimiters = {
            newline: "%return%",
            img: "%img=(.*?)%",
            h1: "^#(.*?)"
        };

        // REPLACE HEADINGS

        // SPLIT RETURNS
        newContent.content.split(delimiters.newline).forEach((row) => {


            if (row.match(/^#/)) {

                newContent['body'] += row.replace(/^#(.*)/, "<h2>$1</h2>");

            } else {

                newContent['body'] += `<p>${row}</p>`;
            }

        });

        newContent.body = newContent.body.replace(/%img=(.*?)%/gi, '<img src="img/$1" alt="$1"/>')

        newContent['firstPara'] = newContent.body.split('</p>')[0] + '</p>';
        newContent['body'] = newContent['body'].replace(newContent['firstPara'], "");

        if (newContent.body.length > 1000) {

            var halfway = newContent.body.indexOf('<p>', (newContent.body.length / 2));
            newContent.col1 = newContent.body.substring(0, halfway);
            newContent.col2 = newContent.body.substring(halfway);

        }

        // CACHE THE DATA FOR REUSE LATER
        pages[newContent.slug] = newContent;

        return newContent;

    }



    function updateContent(routerData) {

    }

    async function getPage(url) {

        var data = await api.getPage(url);
        var parseData;

        if(data.length > 0){
            // CHECK IF ALREADY IN THE CACHE
            if (pages[data[0].slug]) {
                parseData = pages[data[0].slug];
            } else {
    
                // PARSE THE DATA
                parseData = parseContent(data[0]);
    
            }
    
            // GET TEMPLATE AND RENDER THE DATA TO THE DOM
            var template = await api.getText('templates/page-template.mustache.html');
            parseData.heroimg = parseData.img.replace(/^(.*?)\.jpg/,'hero/$1-hero.jpg');
            var renderedTemplate = Mustache.render(template, parseData);
            container.innerHTML = renderedTemplate;
        } else {

            pageNotFound();
        }


    }

    function pageNotFound(){
        container.innerHTML = `<h1>Uh oh...Page not found</h1><p>Sorry, but this page could not be located</p>`;
    }


    return {

        init: init,
        pageNotFound: pageNotFound

    };

}());