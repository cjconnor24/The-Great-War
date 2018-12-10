var api = (function () {

    var _URL = 'http://localhost:8080/';
    var _dataCache = {};

    /**
     * GET LIST OF PAGES
     */
    function getPages(){

        return fetchJSON(_URL + 'index.php');

    }

    /**
     * Get Specific Page
     * @param {Integer} id of page to retrieve
     */
    function getPage(id){

        return fetchJSON(_URL + 'page/' + id );

    }

    async function getMenu(){
        return  await fetchJSON(_URL + 'menu.php' );
    }

    /**
     * Fetch JSON from URL whilst caching retrieval
     * @param {String} url of data to fetch
     */
    async function fetchJSON(url) {

        // if (_dataCache[url]) {
        //     return Promise.resolve(_dataCache[url]);
        // }

        const res = await fetch(url);
        const json = await res.json();
        _dataCache[url] = json;
        return json;

    }

    return {
        getPages: getPages,
        getMenu: getMenu
    }

}());