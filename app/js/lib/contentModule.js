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

    async function getData(url) {

        // var data = await api.getJson('http://10.0.0.45:8080/pages-api.php?slug='+url);
        // var template = await api.getText('templates/page-template.mustache.html');
        // var renderedTemplate = Mustache.render(template,data[0]);

        var data = await api.getJson('http://10.0.0.45:8080/pages-api.php');
        var template = await api.getText('templates/grid-template.mustache.html');
        console.log(data[0]);
        var renderedTemplate = Mustache.render(template,{elements: data});

        container.innerHTML = renderedTemplate;

    }


    return {

        init: init

    };

}());