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

    function render(){

        heros.forEach((hero) => {

            list.insertAdjacentHTML('beforeend',template(hero));

        });

    }


    async function loadHeros(){

        var data = await api.getJson('/content/war-heroes.json');
        heros = data;
        
        render();

    }

    loadHeros();

    return {
        
    }


}());