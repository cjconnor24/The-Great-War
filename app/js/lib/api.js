var api = (function () {

    var CONST_API_URL = 'http://localhost:8080/';
    var cache = {};

    function getMenuItems(){

        return fetchJSON(CONST_API_URL + 'menu.php');

    }

    function getModule(localPath){
        return fetchTEXT(localPath);
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
                cache[url] = json;
                return json;
            });
    }

    function fetchTEXT(url, options = {}) {

        //
        if (cache[url]) {
            console.log('data was cached');
            return Promise.resolve(cache[url]);
        }

        return fetch(url)
            .then(res => res.text())
            .then(txt => {
                cache[url] = txt;
                return txt;
            });
    }    

    return {
        get: fetchJSON,
        getJson: fetchJSON,
        getText: fetchTEXT,
        getMenuItems: getMenuItems,
        getModule: getModule
    }

}());