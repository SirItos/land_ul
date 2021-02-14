<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');


    include_once('./dbWork.php');

    $dbWorker = new DbWorker();
    
    $data= json_decode(file_get_contents('php://input'), true);


    echo $dbWorker->addCustomer($data);