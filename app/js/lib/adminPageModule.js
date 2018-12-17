
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

    /**
     * Render List to DOM
     */
    function _render() {

        list.innerHTML = pages.reduce((html, page, index) => {
            return html + template(page, index);
        }, '');

    }

    /**
     * Inialise the module
     */
    function init() {
        loadPages();
    }

    /**
     * Clear the form
     */
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


    /**
     * Add new page
     * @param {Object} event click event on form
     */
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

        // SAVE IN DB
        savePage(pageObject);

        // ADD TO LOCAL STATE
        pages.push(pageObject);

        clearform();
        _render();

    }

    /**
     * Manage button clicks through bubbling
     * @param {Object} event click event
     */
    function manageButtons(event) {

        if (event.target.innerText.trim().toLowerCase() == "delete") {

            deletePage(event);

        } else if (event.target.innerText.trim().toLowerCase() === "edit") {

            editPage(event);

        }


    }

    /**
     * Encode the string to markdown for storage
     * @param {String} content body content to be encoded
     */
    function encodeContent(content) {

        // TRIM RETURNS
        var newContent = content.replace(/\n+/gi, '%return%');
        return newContent;

    }

    /**
     * Decode the markdown from DB
     * @param {String} content content to be decoded
     */
    function decodeContent(content) {
        var newContent = content.replace(/%return%/gi, '\n\n');
        return newContent;
    }

    /**
     * Delete page 
     * @param {Object} event click event
     */
    function deletePage(event) {

        var checker = confirm('Are you sure you want to delete this page...?');

        if (checker) {

            var el = event.target.closest('tr')
            var listIndex = el.getAttribute('data-page-index');

            var removedPage = pages.splice(listIndex, 1);

            // REMOVE FROM THE DATABASE
            removeDB(removedPage[0].slug);
            _render();

        }

    }

    /**
     * Remove page from DB
     * @param {String} slug slug of the DB entry to be removed
     */
    async function removeDB(slug) {

        var result = await api.getText(CONST_API_URL + "admin-pages-api.php?mode=delete&slug=" + slug);

    }

    /**
     * Title to be converted
     * @param {String} title converted to slug
     */
    function _getSlug(title) {

        return title.replace(/[\"\@\-\'\.\!\s\?\//]+/gi, '-').toLowerCase();

    }

    // TODO: VERY BUGGY
    /**
     * Edit page
     * @param {Object} event Click event
     */
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

    /**
     * Load pages from DB
     */
    async function loadPages() {


        var data = await api.getJson(CONST_API_URL + 'admin-pages-api.php');

        pages = data;
        _render();

    }


    /**
     * Save page to DB 
     * @param {Object} page page to be saved
     */
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