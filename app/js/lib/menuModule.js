var menuModule = (function () {


    // DOM ELEMENTS
    var container = document.querySelector('nav');
    var list = document.querySelector('nav ul');
    var hamburger = document.querySelector('.hamburger');

    // EVEN LISTENERS
    hamburger.addEventListener('click',toggleUI);

    // STATE
    var menuItems = [];

    function toggleUI(){
        hamburger.classList.toggle('open');
        container.classList.toggle('open');
    }

    /**
     * Build menu template string
     * @param {Object} items to build up template string
     */
    var template = function(items){
        return items.reduce((html, item, index) => {
            return html + `<li><a href="#${item.url}">${item.title}</a></li>`;
        },'' )
    };

    /**
     * Render template to DOM
     */
    function _render() {
        list.innerHTML = template(menuItems);
    }

    /**
     * INITIALISE MENU
     */
    function _init() {

        // GET MENU
        _getMenuItems();
        _render();

        // RENDER MENU

    }

    // CALL INIT
    _init();

    /**
     * GET MENU ITEMS FROM API
     */
    function _getMenuItems() {

        //TODO: GET DATA FROM API

        var items = [
            {
                title: "Menu Item One",
                url: "/menu"
            },
            {
                title: "Menu Item Two",
                url: "/another"
            },
        ];

        
        menuItems.push(...items);

    }

}());