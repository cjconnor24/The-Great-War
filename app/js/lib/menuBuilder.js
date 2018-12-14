var menu = (function(){

    console.log("Menu Module Has Launched");

    function buildMenu(where){
        
        api.getMenu().then(function(menu){

            

            var x = menu.reduce((html,menuItem) => {

                if(typeof menuItem !== "object"){

                    return html + `<li>${menuItem}</li>`;

                }

                    

                
            });

            console.log(x);

        var menu = `
            <ul>
                <li><a href="/app/index.php">HELLO THERE</a></li>
            </ul>
            `;
        document.getElementById('footer').insertAdjacentHTML('beforeend', menu);


            
            
        });

        

    }

    return {
        buildMenu: buildMenu,
    }

}());