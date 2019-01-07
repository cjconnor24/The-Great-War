var ContentModule = (function () {

    // DOM ELEMENTS
    var container = document.querySelector('.site-container');

    var pages = [];



    /**
     * Initialise the content Module
     * @param {Object} routeData data passed through from routing module
     */
    function init(routeData) {

        // CHECK IF A PAGES ROUTE
        if (routeData.route.name == "pages") {

            getPage(routeData.params[1]);
        }

        // CHECK IF A GRID ROUTE
        if (routeData.route.name == "grid") {
            getGrid(routeData);
        }

        // OTHERWISE DISPLAY MODULE
        if (routeData.route.name == "module") {

                getModule(routeData);

        }

        /**
         * Get module markup and coding.
         * @param {Object} routeData Route data from routing module
         */
        async function getModule(routeData) {

            // TODO: CURRENTLY HARD CODED. UPDATE FOR DYNAMIC MODULES
            var filename = routeData.route.dataUrl.endpoint.replace(".html",'');
            var data = await fetch('/content/'+filename+'.html');
            var html = await data.text();

            
            var moduleName = camelize(filename.replace('-',' '));

            var scriptModule = document.createElement('script');
            scriptModule.src = "/js/lib/"+moduleName+"Module.js";
            scriptModule.onload = function(){

            }

            container.innerHTML = html;
            container.insertAdjacentElement('beforeend',scriptModule);


        }

    }

    function camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
          return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
      }

    /**
     * Get grid data and template
     * @param {Object} routeData from route module
     */
    async function getGrid(routeData) {

        var data = await api.getGrid();

        var template = await api.getText('templates/grid-template.mustache.html');
        var renderedTemplate = Mustache.render(template, { elements: data });

        container.innerHTML = renderedTemplate;

    }

    /**
     * Parse the page content into two column format
     * @param {Object} content page content
     */
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

        // SPLIT RETURNS
        newContent.content.split(delimiters.newline).forEach((row) => {

            // IF HEADING, ADD TAGS
            if (row.match(/^#/)) {

                newContent['body'] += row.replace(/^#(.*)/, "<h2>$1</h2>");

            } else {

                // ADD P TAGS
                newContent['body'] += `<p>${row}</p>`;
            }

        });

        // REPLACE THE IMG MARKDOWN WITH HTML
        newContent.body = newContent.body.replace(/%img=(.*?)%/gi, '<img src="img/$1" alt="$1"/>')

        // GET THE FIRST PARAGRAPH
        newContent['firstPara'] = newContent.body.split('</p>')[0] + '</p>';
        newContent['body'] = newContent['body'].replace(newContent['firstPara'], "");

        // IF LONGER THAN 1000 chars, create two columns
        if (newContent.body.length > 1000) {

            var halfway = newContent.body.indexOf('<p>', (newContent.body.length / 2));
            newContent.col1 = newContent.body.substring(0, halfway);
            newContent.col2 = newContent.body.substring(halfway);

        }

        // CACHE THE DATA FOR REUSE LATER
        pages[newContent.slug] = newContent;

        return newContent;

    }

    /**
     * Get page data
     * @param {string} url of page to retrieve
     */
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

            // PAGE WAS BLANK
            pageNotFound();

        }


    }

    /**
     * Page not found - update UI
     */
    function pageNotFound(){
        container.innerHTML = `<h1>Uh oh...Page not found</h1><p>Sorry, but this page could not be located</p>`;
    }


    return {

        init: init,
        pageNotFound: pageNotFound

    };

}());