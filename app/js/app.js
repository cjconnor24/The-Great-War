let m = new Media('Title','Another','What');
let m2 = new Media('What','About thisone?','Sounds good to me');

let np = new Page(1,"The world war",'Dummy content will go here');
np.addMedia(m);
np.addMedia(m2);

console.log('will this get the slug?');
console.log(np.slug);
console.log(`This is the slug: ${np.getSlug()}`);
console.log(`There are media files: ${np.media.length}`);

np.media.forEach((m) => {

    console.log(`The media title is ${m.title}`);

});