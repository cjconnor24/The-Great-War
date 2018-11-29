<?php
header("Content-type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");

require_once("../vendor/autoload.php");

$faker = Faker\Factory::create();

$data = array();

// generate data by accessing properties
// echo $faker->name;

for($i = 1; $i <= ($_GET['count'] ? $_GET['count'] : 5); $i++){

    $data[] = [
        'id' => $i,
        'title' => $faker->sentence($nbWords = 6, $variableNbWords = true),
        'slug' => $faker->slug(),
        'content' => $faker->realText($maxNbChars = 200, $indexSize = 2),
    ];

}

echo json_encode(['pages'=>$data]);