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
            console.log(routeData.params);
            getData(routeData.params[1]);

    }

    function parseContent(content){

        var newContent = '';
        var returnSplit = "%return%";

        // REPLACE HEADINGS
        // console.log(newContent);
        // newContent = content.replace(/\#(.*?)(%return%)/gi,"<h1>$1</h1>$2");
        
        // SPLIT RETURNS
        content.split(returnSplit).forEach((row) => {

            if(row.match(/^#/)){

                newContent += row.replace(/^#(.*)/,"<h1>$1</h1>");

            } else {
                newContent += `<p>${row}</p>`;
            }

        });

        console.log(newContent);

        return newContent;



        // CONVERT HEADINGS



    }

    function displaySpinner(){
        var spinnerTemplate = `<div class="spinner">
        <img src="img/poppy.png" class="poppy" alt="POPPY">
        <h1>Loading...</h1>
    </div>`;

    container.innerHTML = '';

    }

    function getTemplate(template) {

    }

    function updateContent(routerData) {
        console.log('CONTENT MODULE: ', routeData.route.dataUrl + routeData.params);
    }

    async function getData(url) {

        console.log('URL IS',url);
        var data = await api.getJson('http://10.0.0.45:8080/pages-api.php?slug='+url);

        console.log(data);
        
        data[0].content = parseContent(data[0].content);
        
        var template = await api.getText('templates/page-template.mustache.html');
        var renderedTemplate = Mustache.render(template,data[0]);

        // var data = await api.getJson('http://10.0.0.45:8080/pages-api.php');
        // var template = await api.getText('templates/grid-template.mustache.html');
        // console.log(data[0]);
        // var renderedTemplate = Mustache.render(template,{elements: data});

        container.innerHTML = renderedTemplate;

    }


    return {

        init: init

    };

}());