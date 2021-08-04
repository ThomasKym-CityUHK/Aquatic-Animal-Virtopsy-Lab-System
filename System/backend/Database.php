<?php
  include_once("config.php");

class Database{
  private $servName = "localhost";
  private $userName = "root";
  private $passWord = "password";
  private $dataBase = "fyp_0";//"finalyearproject";
  public $conn;
  function __construct(){
    $this->conn = mysqli_connect($this->servName, $this->userName, $this->passWord, $this->dataBase);
    // Check connection
    if ($this->conn->connect_error) {
      die("Connection failed: " . $this->conn->connect_error);
    }
    return $this->conn;
  }

  function seleQuery($sql){
    $rs = $this->conn->query($sql);
    
    if ($rs->num_rows > 0) {
      $result['rslt'] = true;
      $i=0;
      while($row = $rs->fetch_assoc()){
        $result['data'][$i] = $row;
        $i++;
      }
    }else if($rs->num_rows == 0){
      $result['rslt'] = true;
      $result['data'] = [];
      $result['error'] = "Error: no data  ";
    }else{
      $result['rslt'] = false;
      $result['error'] = "Error: " . $sql . "<br>" . $this->conn->error;
    }
    return $result;
  }

  function execQuery($sql){
    $result = [];
    if ($this->conn->query($sql) === TRUE) {
      $result['rslt'] = true;
    } else {
      $result['rslt'] = false;
      $result['error'] = "Error: " . $sql . "<br>" . $this->conn->error;
    }
    return $result;
  }

}
?>