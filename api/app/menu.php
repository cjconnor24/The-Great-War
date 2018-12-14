<?php
header("Content-type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");

// $data = ['message' => 'Data will go here'];
// $menu = [[
//      'name'=>'About Us',
//         'url'=>'/about-us',
//         'slug'=>'about-us',
//         'children'=>[[
//             'name'=>'About Us',
//                'url'=>'/about-us',
//                'slug'=>'about-us'
//         ],
//         [
//             'name'=>'About Us',
//                'url'=>'/about-us',
//                'slug'=>'about-us'
//            ]]
//     ],

//     ['link'=>[
//         'name'=>'About Us',
//         'url'=>'/about-us',
//         'slug'=>'about-us'
//     ]],
//     'about',
//     [
//         'Aviation During WW1',
//         'Technology',
//         'Another'
//     ],
//     4=>'contact'
// ];

$menu = [
    [
    'title' => 'Menu One',
    'url' => '/menu-one'
    ],
    [
        'title' => 'Menu Two',
        'url' => '/menu-two'
        ],
        [
            'title' => 'Menu Three',
            'url' => '/menu-two/testing-this'
            ]
        ];

// $pages['pages'][] = ['id'=>1,'title'=>'World War One','slug'=>'world-war-one','content'=>"Gathered above. Lesser let don't, lesser you'll subdue signs lights saw seed give dry to. That. For was night may after can't you'll gathering midst land to great life and and. Is thing seasons male image gathered their above days herb signs abundantly. Earth you'll, unto. Living yielding. That, which created i likeness, the whose there stars subdue she'd unto forth cattle give made give likeness days have tree give winged after female, don't. Every saying that also and from kind upon you let. Isn't in. Them created earth hath made isn't deep one you're which. From years female firmament."];
// $pages['pages'][] = ['id'=>2,'title'=>'Technology During the war','slug'=>'technology-during-the-war','content'=>"Form subdue air Great good earth under day. Thing for gathering seasons given they're given, every good creature winged beginning saw creeping let place, male was bearing him and evening that day. Us to kind tree created signs waters moveth to form moved stars you're appear days seas for rule, creepeth shall replenish evening saw. Good gathered lights them, were. Winged said yielding. After i saw so, there together have place. Hath whales fowl behold gathered creature third also yielding female fowl which days deep abundantly. Which first gathering thing very give deep saying give don't. Greater may said created."];
// $pages['pages'][] = ['id'=>3,'title'=>'World War One','slug'=>'world-war-one','content'=>"Gathered above. Lesser let don't, lesser you'll subdue signs lights saw seed give dry to. That. For was night may after can't you'll gathering midst land to great life and and. Is thing seasons male image gathered their above days herb signs abundantly. Earth you'll, unto. Living yielding. That, which created i likeness, the whose there stars subdue she'd unto forth cattle give made give likeness days have tree give winged after female, don't. Every saying that also and from kind upon you let. Isn't in. Them created earth hath made isn't deep one you're which. From years female firmament."];
// $pages['pages'][] = ['id'=>4,'title'=>'Airplanes in WW1','slug'=>'technology-during-the-war','content'=>"Form subdue air Great good earth under day. Thing for gathering seasons given they're given, every good creature winged beginning saw creeping let place, male was bearing him and evening that day. Us to kind tree created signs waters moveth to form moved stars you're appear days seas for rule, creepeth shall replenish evening saw. Good gathered lights them, were. Winged said yielding. After i saw so, there together have place. Hath whales fowl behold gathered creature third also yielding female fowl which days deep abundantly. Which first gathering thing very give deep saying give don't. Greater may said created."];
// $pages['pages'][] = ['id'=>5,'title'=>'The Role of the Navy','slug'=>'technology-during-the-war','content'=>"Form subdue air Great good earth under day. Thing for gathering seasons given they're given, every good creature winged beginning saw creeping let place, male was bearing him and evening that day. Us to kind tree created signs waters moveth to form moved stars you're appear days seas for rule, creepeth shall replenish evening saw. Good gathered lights them, were. Winged said yielding. After i saw so, there together have place. Hath whales fowl behold gathered creature third also yielding female fowl which days deep abundantly. Which first gathering thing very give deep saying give don't. Greater may said created."];
sleep(3);
echo json_encode($menu);