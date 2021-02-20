<?php


    include_once('./dbWork.php');

    $dbWorker = new DbWorker();

//   $data= json_decode(file_get_contents('php://input'), true);

	
    $dbWorker->setPayment($data);