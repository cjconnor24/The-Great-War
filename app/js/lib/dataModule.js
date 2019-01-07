var api = (function () {

    // API URL CONST
    var CONST_API_URL = 'http://10.0.0.45:8080/';
    var cache = {};

    /**
     * Get menu items from API
     */
    function getMenuItems(){

        return fetchJSON(CONST_API_URL + 'menu.php');

    }

    /**
     * Get grid items from API
     */
    function getGrid(){

        return fetchJSON(CONST_API_URL + 'pages-api.php');

    }
    
    /**
     * Get model template from local
     * @param {String} localPath of resource to retrieve
     */
    function getModule(localPath){
        return fetchTEXT(localPath);
    }

    /**
     * Retrieve page from API using slug
     * @param {String} slug of page to be retrieved
     */
    function getPage(slug){
        return fetchJSON(CONST_API_URL + 'pages-api.php?slug=' + slug);
    }

    /**
     * Perform fetch and return to json
     * @param {String} url URL to get
     * @param {Object} options Options for Fetch Request
     */
    function fetchJSON(url, options = {}) {

        // CHECK TO SEE IF ALREADY CACHED
        if (cache[url]) {

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

    /**
     * Get text response
     * @param {String} url of text to be fetched
     * @param {Object} options fetch request params
     */
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