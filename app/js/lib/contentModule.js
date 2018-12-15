var ContentModule = (function () {

    // DOM ELEMENTS
    var container = document.querySelector('.site-container');

    // CURRENT STATE
    var currentPage;

    // EVENT LISTENERS

    function _render() {



    }

    function init(routeData) {


        console.log('CONTENT MODULE: ', routeData);
        getData(routeData.params[0]);


    }

    function getTemplate(template) {

    }

    function updateContent(routerData) {
        console.log('CONTENT MODULE: ', routeData.route.dataUrl + routeData.params);
    }

    function getData(url) {

        api.getJson('http://localhost:8080/pages-api.php?slug='+url)
            .then((module) => {


                console.log('THIS IS THE MODULE', module);

                module = module[0];

                var template = `
                <h1>${module.title}</h1>
                <h2>${module.subtitle}</h2>

                <p>${module.content}</p>
                `;

                container.innerHTML = template;


                // MODULE JS LOADER
                // var moduleJS = document.createElement("script");
                // moduleJS.src = "js/lib/mediaModule.js";
                // container.insertAdjacentElement('afterend', moduleJS);

            });

    }


    return {

        init: init

    };

}());