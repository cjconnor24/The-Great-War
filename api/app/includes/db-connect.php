<?php

// $host = "localhost";
// $user = "chrisco2_cswd";
// $pass = ")JDa&SrO;rq]";
// $dbname = "chrisco2_cswd";

// username: chrisco2_cswd
// password: )JDa&SrO;rq]

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
