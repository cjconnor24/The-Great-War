<?php
header("Access-Control-Allow-Origin: *");

include('includes/db-connect.php');

if($_GET['slug']){
    $query = $conn->prepare("SELECT * FROM pages WHERE slug = ?");
    $query->bindParam(1,$_GET['slug'],PDO::PARAM_STR,65);
} else {
    $query = $conn->prepare("SELECT slug, title, subtitle, img FROM pages WHERE parentID IS NULL");
    

}

$query->execute();

$results = $query->fetchAll(PDO::FETCH_ASSOC);


header("Content-type: application/json");
header("Content-type: application/json");
echo json_encode($results);