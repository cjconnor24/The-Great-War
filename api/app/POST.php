<?php
header("Content-type: application/json");
header("Access-Control-Allow-Origin: *");


echo json_encode($_POST);