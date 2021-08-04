<?php
  include_once("config.php");
  header('Content-Type: application/json');
  $db = new Database();
  $log= new Log();
  
  ////////////////////////////////////////////////////////////////////////////////////////////////
  /*
    $result['rslt'] = true;
    $result['data'] = "";
    $result['error'] = "Error: no data selected";
  */
  $type=$_REQUEST["request"];
  $data=$_REQUEST["data"];
  switch($type){
    case "columnContent":
      $rslt=[];
      $column = $data["column"];
      $table  = $data["table"];
      $sql    = "SELECT $column FROM $table GROUP BY $column";
      $rs = $db->seleQuery($sql);
      if($rs["rslt"]){
        $rslt = $rs["data"];
      }else{
        $rslt = "";
      }
      echo json_encode($rslt);
      break;
    case "reportData":
      //To Do
      break;
    case "login":
      $rslt = [];
      $login_username = $data["username"];
      $login_password = $data["password"];
      $sql     = "SELECT * FROM users WHERE (uid='$login_username' OR name='$login_username' OR email='$login_username') && password='$login_password'";
      $rs = $db->seleQuery($sql);
      if($rs["rslt"]){
        $lenOfData = count($rs["data"]);
        if($lenOfData==1){
          $uid = $rs["data"][0]["uid"];
          $uname = $rs["data"][0]["name"];
          $ulv = $rs["data"][0]["userlevel"];
          $sql = "SELECT * FROM userconfig WHERE uid = '$uid'";
          $rs = $db->seleQuery($sql);
          $userconfig = [];
          if($rs["rslt"]){
            if(count($rs["data"])==1){
              $userconfig = $rs["data"][0]["config"];
              //$userconfig = str_replace(['\"',"\'"],['"',"'"],$userconfig);
            }
          }
          $rslt["user"]=[];
          $rslt["user"]["authorization"] = [];
          $rslt["user"]["config"] = [];
          $rslt["user"]["authorization"]["id"] = $uid;
          $rslt["user"]["authorization"]["username"] = $uname;
          $rslt["user"]["authorization"]["authlevel"] = $ulv;
          $rslt["user"]["config"] = $userconfig;
        }else if($lenOfData==0){
          $rslt["error"] = "Wrong user name or password!";
        }else{ $rslt["error"] = "System Failed:#login:01. Please Contact System Admin."; }
      }
      echo json_encode($rslt);
      break;
    case "userconfigUpd":
      $uid = $data["uid"];
      $config = $data["config"];//str_replace(['"',"'"],['\"',"\'"],$data["config"]);
      $sql = "SELECT * FROM userconfig WHERE uid='$uid'";
      $rs = $db->seleQuery($sql);
      if($rs["rslt"]){
        $lenOfData = count($rs["data"]);
        if($lenOfData>0){
          $sql = "UPDATE userconfig SET config = '$config',lastEditTime = now()  WHERE uid='$uid'";
        }else{
          $sql = "INSERT INTO userconfig (uid, config, createTime,lastEditTime) VALUE ('$uid','$config',now(),now())";
        }
      }else{ 
        return $rslt["error"] = "System Error:#request#userconfigUpd";
      }
      $rs = $db->execQuery($sql);
      $rslt = $rs;
      $log->logging($sql,$uid);
      echo json_encode($rslt);
  }
  
?>


