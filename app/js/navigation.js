let navigation = (function () {

    console.log("ASD HELLO FROM NAVIATION");


    // ADD LISTENERS TO LINKS
    function addListeners() {

        document.querySelectorAll('nav a').forEach((link) => {

            console.log(link);

            link.addEventListener('click', function (e) {

                e.preventDefault();


                var temp = {
                    name: link.innerHTML.toLowerCase(),
                    link: `/${link.innerHTML.toLowerCase()}`,
                    url: link.href.toLowerCase(),
                    id: link.getAttribute('data-page-id')
                };

                console.log(`Page ID is ${temp.id}`);

                // OBJ, TITLE, LINK
                window.history.pushState(temp, temp.name, temp.link);

                updateUI(temp.name);

            });

        });
    }

    function addHistoryTracker() {

        window.onpopstate = function (e) {

            if (e.state) {
                updateUI(e.state.name);
            }
        };

    }

    // TEMP FOR TESTING
    function updateUI(data) {
        document.querySelector('h1').innerHTML = data;
        document.getElementById("content").innerHTML = data;
        document.title = data;
    }

    function init() {
        console.log('INIT RAN');
        if(window.location.pathname !== "/"){
            console.log('THIS IS NOT THE ROOT OF THE APPLCATION');
        }
        addListeners();
        addHistoryTracker();
    }


    return {
        init: init
    };

}());