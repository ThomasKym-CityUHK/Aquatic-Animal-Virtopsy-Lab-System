<?php
  include_once("config.php");
  class Log{
    function __construct(){}
    function logging($sql,$user){
      $db = new Database();
      $sql = str_replace("'","\'",$sql);
      $loggingSQL = "INSERT INTO logs (uid,content,createTime) VALUES ('$user','$sql',now())";
      $rs=$db->execQuery($loggingSQL);
    }
  }
?>