let navigation = (function () {

    console.log("ASD HELLO FROM NAVIATION");

    let currentPage = null;


    // ADD LISTENERS TO LINKS
    function addListeners() {

        document.querySelectorAll('nav a').forEach((link) => {

            // console.log(link);

            link.addEventListener('click', function (e) {

                e.preventDefault();


                var temp = {
                    name: link.innerHTML.toLowerCase(),
                    link: `/${link.innerHTML.toLowerCase()}`,
                    url: link.href.toLowerCase(),
                    id: link.getAttribute('data-page-id')
                };

                currentPage = temp;

                console.log(`Page ID is ${temp.id}`);

                // OBJ, TITLE, LINK
                window.history.pushState(temp, temp.name + ' IGWG', temp.link);

                updateUI(temp.name);

            });

        });
    }

    function addHistoryTracker() {

        window.onpopstate = function (e) {

            console.log(`Went back to:`);
            console.log(e.state);

            if (e.state) {
                updateUI(e.state.name);
            }
        };

    }

    /**
     * TESTING
     */
    function checkCurrentPage(){
        console.log(`The current page is ${window.location.pathname}`);
    }

    /**
     * 
     * @param {Data to OUTPUT on Screen} data 
     */
    function updateUI(data) {
        document.querySelector('h1').innerHTML = data;
        document.getElementById("content").innerHTML = data;
        document.title = data;
    }

    function init() {
        console.log('INIT RAN');
        checkCurrentPage();
        addListeners();
        addHistoryTracker();
    }


    return {
        init: init
    };

}());