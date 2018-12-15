<?php
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: application/json");

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE"); 

include('includes/db-connect.php');
// echo json_encode($_POST);
// echo json_encode($_GET);

echo file_get_contents("php://input");
exit();



if($_GET['mode']=="insert"){

    // $query = $conn->prepare("INSERT INTO pages (title,slug,subtitle,content,active,img) VALUE(?,?,?,?,?,?);");
    echo json_encode($_SERVER);
    exit();

} else if ($_GET['mode']=="delete" && $_GET['slug']){

    // SHOULD DELETE PAGE
    $query = $conn->prepare("SELECT * FROM pages");

} else {

    $query = $conn->prepare("SELECT * FROM pages");

}


    
    


$query->execute();

$results = $query->fetchAll(PDO::FETCH_ASSOC);


header("Content-type: application/json");
header("Content-type: application/json");
echo json_encode($results);