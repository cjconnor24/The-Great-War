var api = (function () {

    var CONST_API_URL = 'http://10.0.0.45:8080/';
    var cache = {};

    function getMenuItems(){

        return fetchJSON(CONST_API_URL + 'menu.php');

    }

    function getGrid(){

        return fetchJSON(CONST_API_URL + 'pages-api.php');

    }
    
    function getPages(){

    }

    function getModule(localPath){
        return fetchTEXT(localPath);
    }

    function getPage(slug){
        return fetchJSON(CONST_API_URL + 'pages-api.php?slug=' + slug);
    }

    /**
     * Perform fetch and return to json
     * @param {String} url URL to get
     * @param {Object} options Options for Fetch Request
     */
    function fetchJSON(url, options = {}) {

        //
        if (cache[url]) {
            console.log('data was cached');
            return Promise.resolve(cache[url]);
        }

        return fetch(url)
            .then(res => res.json())
            .then(json => {

                // CACHE RETURN
                cache[url] = json;
                return json;
            });
    }

    function fetchTEXT(url, options = {}) {

        // IF ITS IN THE CACHE, JUST RETURN IT
        if (cache[url]) {
            return Promise.resolve(cache[url]);
        }

        return fetch(url)
            .then(res => res.text())
            .then(txt => {

                // CACHE RETURN
                cache[url] = txt;
                return txt;
            });
    }

    return {
        get: fetchJSON,
        getJson: fetchJSON,
        getText: fetchTEXT,
        getMenuItems: getMenuItems,
        getModule: getModule,
        getGrid: getGrid,
        getPage: getPage
    }

}());