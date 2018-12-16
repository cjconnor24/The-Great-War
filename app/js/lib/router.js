var RouterModule = (function () {

    var app = 'PROBABLY MODULE HERE';
    var defaultRoute = "/";
    var params;
    var siteName = "The Great War Interactive Guide";

    // EVENT LISTENERS
    window.addEventListener('hashchange', hashChange);
    document.addEventListener('DOMContentLoaded', hashChange);

    var routes = [];

    function addRoute(url, name, dataUrl) {
        routes.push({
            url, name, dataUrl
        });

    }

    function hashChange() {

        // MAKE SURE WINDOW GOES BACK TO TOP
        window.scrollTo(0, 0);

        // GET URL AFTER HASH
        var url = window.location.hash.substring(1);

        // IF NO URL, SET DEFAULT
        if (!url) {
            url = defaultRoute;
            window.location.hash = '#' + url;
        }

        // GET BACK REGEX MATCHES
        var r = routes.filter(function (route) {
            return url.match(new RegExp(route.url, 'gi'));
        });

        console.log('ROUTER:',r);

        if (r.length > 0) {

            var route = r[0];
            // params = new RegExp(route.url, 'gi').exec(url).slice(1);
            params = new RegExp(route.url, 'gi').exec(url);
            // console.log("ROUTE MODULE:", route.name, route.url, route.dataUrl, params);

            // document.title = `${route.name} - ${siteName}`;


            // CONTENT MODULE
            ContentModule.init(
                {
                    route: route,
                    params: params
                }
            );

        } else {

            // TO DO - SHOW 404
            console.log('Page doesnt exists?');

        }

    };

    return {
        addRoute: addRoute
    }


}());