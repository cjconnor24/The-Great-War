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

            if(routeData.route.name=="pages"){

                getPage(routeData.params[1]);
            }

            if(routeData.route.name=="grid"){
                getGrid(routeData);
            }

    }


    async function getGrid(routeData){

        var data = await api.getGrid();
        console.log(data);
        var template = await api.getText('templates/grid-template.mustache.html');
        var renderedTemplate = Mustache.render(template,{elements: data});
        console.log(renderedTemplate);
        container.innerHTML = renderedTemplate;

    }

    function parseContent(content){

        // var newContent = {
        //     id: content.id,
        //     slug: '',
        //     subtitle:content.subtitle,
        //     title:content.title,
        //     img:content.img,
        //     content: content.content,
        //     body:'',
        //     firstPara:'',
        //     col1:'',
        //     col2:''
        // };

        var newContent = content;

        // 
        var returnSplit = "%return%";
        var delimiters = {
            newline: "%return%",
            img: "%img=(.*?)%",
            h1: "^#(.*?)"
        };

        // REPLACE HEADINGS
        
        // SPLIT RETURNS
        content.content.split(delimiters.newline).forEach((row) => {


            if(row.match(/^#/)){

                newContent['body'] += row.replace(/^#(.*)/,"<h2>$1</h2>");

            } else {
                
                newContent['body'] += `<p>${row}</p>`;
            }

        });

        newContent.body = newContent.body.replace(/%img=(.*?)%/gi,'<img src="img/$1" alt="$1"/>')

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

 

    function updateContent(routerData) {
        console.log('CONTENT MODULE: ', routeData.route.dataUrl + routeData.params);
    }

    async function getPage(url) {

        var data = await api.getPage(url);
        var parseData = parseContent(data[0]);
        
        // GET TEMPLATE AND RENDER THE DATA TO THE DOM
        var template = await api.getText('templates/page-template.mustache.html');
        var renderedTemplate = Mustache.render(template,parseData);
        container.innerHTML = renderedTemplate;

    }


    return {

        init: init

    };

}());