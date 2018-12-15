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


// function Router(app, defaultRoute) {
//     this.app = app;
//     this.defaultRoute = defaultRoute;
//     this.routes = [];

//     var doHashChange = () => {
//         this.hashChange();
//     };

//     window.addEventListener('hashchange', doHashChange);
//     document.addEventListener('DOMContentLoaded', doHashChange);
// }

// Router.prototype.addRoute = function (url, name, dataUrl) {
//     this.routes.push({
//         url, name, dataUrl
//     });
// }
// Router.prototype.hashChange = function () {
//     var url = window.location.hash.substring(1);
//     // IF NO URL, SET DEFAULT
//     if (!url) {
//         url = this.defaultRoute;
//         window.location.hash = '#' + url;
//     }
//     var routes = this.routes.filter(function (route) {
//         return url.match(new RegExp(route.url, 'gi'));
//     });

//     if (routes.length > 0) {

//         var route = routes[0];
//         this.params = new RegExp(route.url, 'gi').exec(url).slice(1);
//         console.log(route.name, this.params);

//     } else {
//         console.log('LOAD DEFAULT?');
//     }

// }



