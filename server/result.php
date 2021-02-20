<?

// регистрационная информация (пароль #2)
// registration info (password #2)
$mrh_pass2 = "jaZ0y7tHOHt1stLXSs89";

//установка текущего времени

$out_summ = $_REQUEST["OutSum"];
$inv_id = $_REQUEST["InvId"];
$crc = $_REQUEST["SignatureValue"];

$crc = strtoupper($crc);

$my_crc = strtoupper(md5("$out_summ:$inv_id:$mrh_pass2"));


$data = array(
	"payup"=>'payed',
	"id"=>1
);

// проверка корректности подписи
// check signature
if ($my_crc !=$crc)
{
  
  $data['payup'] = "fail";
}


$dbWorker->setPayment($data);

