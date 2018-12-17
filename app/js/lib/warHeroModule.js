var WarHero = (function () {

    // DOM STRINGS
    var list = document.querySelector('.hero-list');

    var heros = [];


    var template = function(hero){
        return `<div class="memorial">
        <div class="plaque">
            <p>${hero.name}</p>
            <p>${hero.dates}</p>
            <p>${hero.history}</p>
        </div>
    </div>`;
    }


    /**
     * Render the hero list
     */
    function render(){

        list.innerHTML = heros.reduce(function(html,hero){
            return html + template(hero);
        },'');

    }


    /**
     * Load the Hero list from JSON
     */
    async function loadHeros(){

        var data = await api.getJson('/content/war-heroes.json');
        heros = data;
        
        render();

    }

    // LOAD THE HEROS STRAIGHT AWAY
    loadHeros();

    return {
        
    }


}());