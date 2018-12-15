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

        var newContent = {
            title:content.title,
            subtitle:content.subtitle,
            img:content.img,
            body:'',
            firstPara:'',
            col1:'',
            col2:''
        };

        var returnSplit = "%return%";

        // REPLACE HEADINGS
        // console.log(newContent);
        // newContent = content.replace(/\#(.*?)(%return%)/gi,"<h1>$1</h1>$2");
        
        // SPLIT RETURNS
        content.content.split(returnSplit).forEach((row) => {

            if(row.match(/^#/)){

                newContent['body'] += row.replace(/^#(.*)/,"<h2>$1</h2>");

            } else {
                
                newContent['body'] += `<p>${row}</p>`;
            }

        });

        newContent['firstPara'] = newContent.body.split('</p>')[0];
        newContent['body'] = newContent['body'].replace(newContent['firstPara'],"");

        if(newContent.body.length > 1000){

            var halfway = newContent.body.indexOf('<p>',(newContent.body.length / 2));
            newContent.col1 = newContent.body.substring(0,halfway);
            newContent.col2 = newContent.body.substring(halfway);

        }

        
        

        // return newContent;
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
        
        var parseData = parseContent(data[0]);
        console.log(parseData);
        
        var template = await api.getText('templates/page-template.mustache.html');
        var renderedTemplate = Mustache.render(template,parseData);

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