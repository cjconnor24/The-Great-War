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

            console.log("THIS IS A MODULE MODULE:", routeData);
            var data = await fetch('/content/media.html');
            var html = await data.text();

            var scriptModule = document.createElement('script');
            scriptModule.src = "/js/lib/mediaModule.js";
            scriptModule.onload = function(){
                console.log('THIS SHOULD BE LOADED IN');
            }

            container.innerHTML = html;
            container.insertAdjacentElement('beforeend',scriptModule);


        }

    }


    async function getGrid(routeData) {

        var data = await api.getGrid();
        //console.log(data);
        var template = await api.getText('templates/grid-template.mustache.html');
        var renderedTemplate = Mustache.render(template, { elements: data });
        //console.log(renderedTemplate);
        container.innerHTML = renderedTemplate;

    }

    function parseContent(content) {

        console.log('content', content);


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
        //console.log('CONTENT MODULE: ', routeData.route.dataUrl + routeData.params);
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
            console.log("THE PAGE DOESNT EXISTS");
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