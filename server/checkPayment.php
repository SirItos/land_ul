<?php


    include_once('./dbWork.php');
     $data= json_decode(file_get_contents('php://input'), true);
    $dbWorker = new DbWorker();
   

    return $dbWorker->checkPayment($data);