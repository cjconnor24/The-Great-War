<?php
header("Access-Control-Allow-Origin: *");

include('includes/db-connect.php');

$conn->query("SET CHARACTER SET utf8;");


if($_GET['slug']){
    $query = $conn->prepare("SELECT * FROM pages WHERE slug = ?");
    $query->bindParam(1,$_GET['slug'],PDO::PARAM_STR,65);
} else {
    $query = $conn->prepare("SELECT slug, title FROM pages WHERE parentID IS NULL");
    

}

$query->execute();
$results = $query->fetchAll(PDO::FETCH_ASSOC);


header("Content-type: application/json");

echo json_encode($results);