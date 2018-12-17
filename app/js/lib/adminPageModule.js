
        // VERY CRUDE AND DAFT LOGIN...MORE FOR DEMO PURPOSES.
        // IF THIS WAS IMPLEMENTS FOR REAL, WOULD LEVERAGE JSON TOKENS
        // var username, password, count = 0;

        // do {

        //     username = prompt("Please enter your name", "chrisconnor");
        //     password = prompt("Please enter your password", "password");

        //     if(username !== "chrisconnor" && password !== "password"){
        //         alert('those credentials were wrong...'+(count==1 ? 'careful, last chance...' : ''));
        //         count++;
        //     }

        //     if(count===3){
        //         alert('You have made three incorrect attempts. Goodbye.');
        //         window.location = "/";
        //         break;
        //     }

        // } while(username !== "chrisconnor" && password !== "password");


var PageModule = (function () {


    // DOM CONTAINERS
    var container = document.querySelector('#page-module');
    var list = document.querySelector('#page-module table');
    var button = document.querySelector('#page-module button[type=submit]')
    var form = document.querySelector('#page-module form');
    var allowedFields = ['text', 'email', 'radio', 'textarea'];
    var template = function (page, index) {
        return `<tr data-page-index="${index}">
                <td><i class="far fa-file"></i> <span>${page.title}</span></td>
                <td><button><i class="fas fa-trash"></i> Delete</button> <button><i class="fas fa-edit"></i> Edit</button></td>
                </tr>`;
    }

    // EVENT LISTENERS
    button.addEventListener('click', addPage);
    list.addEventListener('click', manageButtons);

    // STATE
    var pages = [];
    var CONST_API_URL = 'http://10.0.0.45:8080/';


    // UI METHODS
    function _render() {

        

        list.innerHTML = pages.reduce((html, page, index) => {
            return html + template(page, index);
        }, '');

    }

    function init() {
        loadPages();
    }

    function clearform() {
        for (var i = 0; i < form.elements.length; i++) {

            var field = form.elements[i];
            if (field.type == 'text' || field.type == 'textarea') {
                field.value = '';
            }

        }

        form.elements[0].focus();

    }


    // FUNCTIONAL METHODS
    function addPage(event) {

        event.preventDefault();
        var pageObject = {};

        for (var i = 0; i < form.elements.length; i++) {

            var field = form.elements[i];

            if (allowedFields.indexOf(field.type) !== -1) {

                // CHECK THE RADIO BUTTON
                if (field.type == 'radio') {

                    (field.checked ? pageObject[field.name] = field.value : '');

                } else {



                    pageObject[field.name] = (field.name == 'content' ? encodeContent(field.value) : field.value);

                }



            }
        }

        // CONVERT THE SLUG
        pageObject.slug = _getSlug(pageObject.title);



        savePage(pageObject);

        pages.push(pageObject);
        clearform();
        _render();

    }

    function manageButtons(event) {




        if (event.target.innerText.trim().toLowerCase() == "delete") {

            deletePage(event);

        } else if (event.target.innerText.trim().toLowerCase() === "edit") {

            editPage(event);

        }


    }


    function encodeContent(content) {

        // TRIM RETURNS
        var newContent = content.replace(/\n+/gi, '%return%');
        return newContent;

    }

    function decodeContent(content) {
        var newContent = content.replace(/%return%/gi, '\n\n');
        return newContent;
    }

    function deletePage(event) {

        var checker = confirm('Are you sure you want to delete this page...?');


        if (checker) {

            var el = event.target.closest('tr')
            var listIndex = el.getAttribute('data-page-index');



            var removedPage = pages.splice(listIndex, 1);
            removeDB(removedPage[0].slug);
            _render();

        }


    }

    async function removeDB(slug) {

        var result = await api.getText(CONST_API_URL + "admin-pages-api.php?mode=delete&slug=" + slug);

    }

    function _getSlug(title) {

        return title.replace(/[\"\@\-\'\.\!\s\?\//]+/gi, '-').toLowerCase();

    }

    function editPage(event) {


        var listIndex = event.target.closest('tr').getAttribute('data-page-index');

        var page = pages[listIndex];

        for (var i = 0; i < form.elements.length; i++) {

            var field = form.elements[i];

            if (allowedFields.indexOf(field.type) !== -1) {



                field.value = (field.name == 'content' ? decodeContent(page[field.name]) : page[field.name]);

            }


        }

        alert('WARNING: EDIT IS MEGA BUGGY. DO NOT USE.');

    }

    async function loadPages() {


        var data = await api.getJson(CONST_API_URL + 'admin-pages-api.php');

        pages = data;
        _render();

    }

    function savePage(page) {

        // USING JQUERY HERE AS THERE WERE SOME ISSUES POSTING WITH FETCH
        $.post(CONST_API_URL + "admin-pages-api.php?mode=insert", page, function () {
            alert("success");
        })
            .done(function () {
                alert("second success");
            });


    }

    return {
        init: init
    }



}());