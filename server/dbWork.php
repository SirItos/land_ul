<?php





class DbWorker  {

  const DB_NAME = 'kukut';
  const DB_USER = 'root';
  const DB_PASSWORD = 'root';
  

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
        $query = $this->connection->prepare("INSERT INTO Customers (nickname, phone) VALUES (:nickname, :phone)");
        $query->bindParam(':nickname',$data['nickname']);
        $query->bindParam(':phone',$data['phone']);
        $query->execute();
        return json_encode(['id'=>$this->connection->lastInsertId(),'status'=>true]);
      } catch (PDOException $e) {
          return json_encode(['message'=>'Не удалось создать запись: ' . $e->getMessage(),'status'=>false]);
      }
     

  } 

  public function setPayment(array $data) {
      try {
      $query = $this->connection->prepare("UPDATE Customers SET payup=:payup WHERE id=:id");
      $query->execute($data);
        return json_encode(['message' => 'Флаг оплаты установлен','status'=>true]);
      } catch (PDOException $e) {
          return json_encode(['message'=>'Не удалось обновить запись '. $data['id'] .': ' . $e->getMessage(),'status'=>false]);
      }
     
  }


}