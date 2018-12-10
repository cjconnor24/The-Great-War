var menu = (function(){

    // var menuStructure = {};

    function buildMenu(){
        
        api.getMenu().then(function(menu){

            

            var x = menu.reduce((html,menuItem) => {

                if(typeof menuItem !== "object"){

                    return html + `<li>${menuItem}</li>`;

                }

                    

                
            });

            console.log(x);

        //     const dogs = this
        //     .dogs
        //     .reduce((html, dog) => html + shared.dogTemplate(dog), '')
      
        //   return `
        //     <ul class="dogs">
        //       <li>
        //         ${dogs}
        //       </li>
        //     </ul>
        //   `;

        var menu = `
            <ul>
                <li><a href="/app/index.php">HELLO THERE</a></li>
            </ul>
            `;
        document.getElementById('footer').insertAdjacentHTML('beforeend', menu);


            
            
        });

        

    }    

    // function getMenu(){

    //     // api.getMenu().then((menu)=>{
    //     //     // this.menuStructure = menu;
    //     //     console.log(menu);
    //     //     return menu;
    //     // });

    //     return api.getMenu();

    // }

    return {
        buildMenu: buildMenu,
    }

}());