<?php





class DbWorker  {

  const DB_NAME = 'u1297503_default';
  const DB_USER = 'u1297503_default';
  const DB_PASSWORD = 'wx_FT3wZ';
  

  private $connection;

  function __construct() {
    try {
      $this->connection =  new PDO('mysql:host=localhost;dbname='.self::DB_NAME, self::DB_USER, self::DB_PASSWORD);
      
    } catch (PDOException $e) {
          echo json_encode(['message'=>'Подключение не удалось: ' . $e->getMessage(),'status'=>false]);
      }
  }
	


  public function addCustomer(array $data) {
      try {
        $query = $this->connection->prepare("INSERT INTO `Customers` (email,nickname, tariff) VALUES (:email,:nickname,:tariff)");
        $query->bindParam(':nickname',$data['nickname']);
        $query->bindParam(':email',$data['email']);
        $query->bindParam(':tariff',$data['tariff']);
        $query->execute($data);
	
        return json_encode(['id'=>$this->connection->lastInsertId(),'status'=>true]);
      } catch (PDOException $e) {
          return json_encode(['message'=>'Не удалось создать запись: ' . $e->getMessage(),'status'=>false]);
      }
     

  } 

  public function setPayment(array $data) {
      try {
      $query = $this->connection->prepare("UPDATE Customers SET tariff=:payup WHERE id=:id");
      $query->execute($data);
        return json_encode(['message' => 'Флаг оплаты установлен','status'=>true]);
      } catch (PDOException $e) {
          return json_encode(['message'=>'Не удалось обновить запись '. $data['id'] .': ' . $e->getMessage(),'status'=>false]);
      }
     
  }

  public function checkPayment(array $data) {
	
    try {
      $query = $this->connection->prepare("SELECT `payup` FROM `Customers` WHERE  id=:id");
      $query->bindParam(':id',$data['id']);
      $query->execute($data);
      $res = $query->fetch();
      return json_encode($res['payup']);      
    } catch (PDOException $e) {
        return json_encode(['message'=>'Не удалось обновить запись '. $data['id'] .': ' . $e->getMessage(),'status'=>false]);
    }
  }

}