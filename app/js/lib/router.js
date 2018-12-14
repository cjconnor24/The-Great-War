function Router(app, defaultRoute) {
    this.app = app;
    this.defaultRoute = defaultRoute;
    this.routes = [];

    var doHashChange = () => {
        this.hashChange();
    };

    window.addEventListener('hashchange', doHashChange);
    document.addEventListener('DOMContentLoaded', doHashChange);
}

Router.prototype.addRoute = function (url, name) {
    this.routes.push({
        url, name
    });
}
Router.prototype.hashChange = function () {
    var url = window.location.hash.substring(1);
    // IF NO URL, SET DEFAULT
    if (!url) {
        url = this.defaultRoute;
        window.location.hash = '#' + url;
    }
    var routes = this.routes.filter(function (route) {
        return url.match(new RegExp(route.url, 'gi'));
    });
    if (routes.length > 0) {
        var route = routes[0];
        this.params = new RegExp(route.url, 'gi').exec(url).slice(1);
        console.log('LOAD THE THING FOR', route.name, this.params);
    }
    else {
        console.log('LOAD DEFAULT?');
    }
}



