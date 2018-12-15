var ContentModule = (function () {

    // DOM ELEMENTS
    var container = document.getElementById('content-area');

    // CURRENT STATE
    var currentPage;

    // EVENT LISTENERS

    function _render() {



    }

    function init(routeData) {


        console.log('CONTENT MODULE: ', routeData.route.dataUrl + routeData.params);
        getData();


    }

    function getTemplate(template){

    }

    function updateContent(routerData){
        console.log('CONTENT MODULE: ', routeData.route.dataUrl + routeData.params);
    }

    function getData() {

        api.getModule('content/media.html')
            .then((module) => {

                console.log('THIS IS THE MODULE', module);
                container.innerHTML = module;

                var moduleJS = document.createElement("script");
                // set the type attribute
                // moduleJS.type = "application/javascript";
                // make the script element load file
                moduleJS.src = "js/lib/mediaModule.js";
                // finally insert the element to the body element in order to load the script
                container.insertAdjacentElement('afterend', moduleJS);

            });

    }


    return {

        init: init

    };

}());