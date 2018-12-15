<?php
header("Content-type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");

$menu = [
    [
    'title' => 'Chrismas Truce',
    'url' => '/christmas-truce'
    ],
    [
        'title' => 'Another One',
        'url' => '/another-one'
        ],
        [
            'title' => 'Menu Two',
            'url' => '/module-two/'
        ],
        [
            'title' => 'Menu Three',
            'url' => '/module-two/testing-this'
            ]
        ];


sleep(3);
echo json_encode($menu);