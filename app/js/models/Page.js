

function Page(id,title,content) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.slug = this.getSlug();

    // PAGE HAS MEDIA?
    this.media = [];

    // HAS A TEMPLATE? FILENAME STRING MAYBE?
    // this.template = template;

}

Page.prototype.getSlug = function () {
    return this.title.replace(/[\s]+/g, '-').replace(/[\'\.!\#\?]+/g, '').toLowerCase();
}

Page.prototype.addMedia = function(m){
    this.media.push(m);
}


