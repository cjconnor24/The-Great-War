<?php

// $host = "localhost";
// $user = "chrisco2_ssd";
// $pass = "HOE1n3opU*-5";
// $dbname = "chrisco2_ssd";

$host = "127.0.0.1";
$user = "root";
$pass = "";
$dbname = "gwig";
try {

    $conn = new PDO("mysql:host=$host;dbname=$dbname",$user,$pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch(PDOException $e){

    echo "Connection failed.";
    // .$e->getMessage();;
    // .$e->getMessage();

}
