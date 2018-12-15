var menuModule = (function () {


    // DOM ELEMENTS
    var container = document.querySelector('nav');
    var list = document.querySelector('nav ul');
    var hamburger = document.querySelector('.hamburger');

    // STATE
    var menuItems = [];

    // EVENT LISTENERS
    hamburger.addEventListener('click',toggleUI);
    list.addEventListener('click',function(event){

        if(event.target.tagName.toLowerCase() == 'a'){
            toggleUI();
        }

    });


    /**
     * Toggle the Menu Visibility
     */
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

    }

    
    /**
     * GET MENU ITEMS FROM API
     */
    function _getMenuItems() {
        
        //TODO: GET DATA FROM API
        api.getMenuItems().then((items) => {
            console.log(items);
            
            // var d = JSON.parse(items);
            // console.log(d);
            
            menuItems.push(...items);
            _render();
        });
        
    }

    // TODO: BUILD ROUTER ROUTES FROM MENU?

    // CALL INIT
    _init();
    
}());