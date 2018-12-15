var MediaModule = (function(){

    console.log('MEDIA MODULE LOADED');
    // DOM ELEMENTS
    var container = document.querySelector('#media-module');

    // EVENT LISTENER
    container.addEventListener('click',function(){
        alert('The Media Module was clicked. This runs from media module');
    });

    console.log('CAN THE MEDIA MODULE ACCESS API AFTER THE FACT?',api);

}());