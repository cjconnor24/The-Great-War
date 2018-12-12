<?php
header("Content-type: application/json");
header("Access-Control-Allow-Origin: *");

$data = ['message' => 'Data will go here'];
$dogs = [];


// const shared = {
//     dogTemplate: (dog) => `
//       <section class="dog-listing">
//         <a href="#/dogs/${dog.id}">
//           <h3 class="name">${dog.name}</h3>
//           <section>
//             <figure>
//               <img src="${dog.imageUrl}" alt="${dog.name}" />
//               <figcaption>${dog.imageCaption}</figcaption>
//             </figure>
//             <p>${dog.description}</p>
//           </section>
//         </a>
//       </section>
//     `
//   }

sleep(1);

$dogs['dogs'][] = [
    'id'=>'1',
    'name'=>'Coco',
    'imageUrl'=>'https://www.pets4homes.co.uk/images/classifieds/2013/05/22/311316/large/f1-cockapoo-puppies-519cb5796ad21.JPG',
    'imageCaption'=>'Me and my face',
    'description'=>'Im coco and very cute'];

$dogs['dogs'][] = [
    'id'=>'2',
    'name'=>'Huey',
    'imageUrl'=>'http://orig04.deviantart.net/4bed/f/2012/170/4/8/bernese_mountain_dog_by_ankaszklanka-d540x0i.jpg',
    'imageCaption'=>'Tilting m\'head',
    'description'=>'Hey, I\'m Huey :)' 
];

if($_GET['id']){
    echo json_encode($dogs['dogs'][$_GET['id']-1]);
} else {

    echo json_encode($dogs);
}
