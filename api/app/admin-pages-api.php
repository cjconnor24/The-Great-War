<?php
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: application/json");

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE"); 
header("Content-type: application/json");

include('includes/db-connect.php');
// print_r(json_decode($_POST));

// exit();
// echo json_encode($_GET);

// echo file_get_contents("php://input");
// exit();



if($_GET['mode']=="insert"){

    // $_POST[''];
    $title = $_POST['title'];
    $slug = $_POST['title'];
    $subtitle = $_POST['subtitle'];
    $content = $_POST['content'];
    $active = $_POST['active'];
    $img = $_POST['img'];

    $query = $conn->prepare("INSERT INTO pages (title,slug,subtitle,content,active,img) VALUE(?,?,?,?,?,?);");
    $query->bindParam(1,$title);
    $query->bindParam(2,$slug);
    $query->bindParam(3,$subtitle);
    $query->bindParam(4,$content);
    $query->bindParam(5,$active);
    $query->bindParam(6,$img);

    $query->execute();
    // echo json_encode($_SERVER);
    // exit();

} else if ($_GET['mode']=="delete" && $_GET['slug']){

    $slug = $_GET['slug'];
    // SHOULD DELETE PAGE
    $query = $conn->prepare("DELETE FROM pages WHERE slug = ?");
    $query->bindParam(1,$slug);

    $query->execute();

} else {

    $query = $conn->prepare("SELECT * FROM pages");
    $query->execute();
    $results = $query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results);
}


    
    


// $query->execute();





// echo json_encode($results);