var templates = {

    /**
     * Build Grid Item Template
     * @param {Object} item data to build grid item
     */
    gridItem: function (item) {

        return `<div class="element">
        <div class="content">
            <h2>${item.title}</h2>
            <p>${item.subtitle}</p>
        </div>
        <div class="img-placeholder">
            <img src="${item.url}" alt="${item.title}">
        </div>
    </div>`;

    },
    /**
     * Build navigation menu
     */
    navMenu: function(){
        return ``;
    }

};