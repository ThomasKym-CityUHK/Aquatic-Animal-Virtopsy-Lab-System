<?php
  include_once("config.php");
  header('Content-Type: application/json');
  $db = new Database();
  $log= new Log();
  /*
  $jsarray[0] = ["A","B","C","D"];
  $jsarray[1] = ["A","B","C","D"];
  $newArray   = array_merge($jsarray[0],$jsarray[1]);
  print_r($newArray);
  */
  $data["table"]="strandingreport";
  $data["columns"]="sex";
  print_r($db->getColumnDTL($data));

?>


