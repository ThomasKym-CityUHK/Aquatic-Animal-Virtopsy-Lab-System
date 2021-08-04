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
          $rslt["user"]=[];
          $rslt["user"]["authorization"] = [];
          $rslt["user"]["authorization"]["uid"] = $uid;
          $rslt["user"]["authorization"]["username"] = $uname;
          $rslt["user"]["authorization"]["authlevel"] = $ulv;
        }else if($lenOfData==0){
          $rslt["error"] = "Wrong user name or password!";
        }else{ $rslt["error"] = "System Failed:#login:01. Please Contact System Admin."; }
      }
      echo json_encode($rslt);
      break;
    case "getUserConfig":
      $uid = $data["uid"];
      $sql = "SELECT * FROM userconfig WHERE uid = '$uid'";
      $rs = $db->seleQuery($sql);
      $userconfig = "";
      if($rs["rslt"]){
        if(count($rs["data"])==1){
          $userconfig = $rs["data"][0]["config"];
          //$userconfig = str_replace(['\"',"\'"],['"',"'"],$userconfig);
        }
      }
      $rslt = $userconfig;
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
      break;
    case "updatecase":
      $sid = $data["sid"];
      $uid = $data["uid"];
      $data =  $data["data"];

      $insert_sql = "";$log_sql ="";
      $whereCause = " AND sid = '$sid'";
      foreach ($data as $table => $columns) {
        $temp_insert_sql = "UPDATE $table ";$sets = "`updated_at` = NOW()";
        foreach($columns as $column => $value){
          if($table == "strandingreport"&&$column == "sid"){ continue; }
          if($value!="null"){
            $sets.= ",`$column`='$value'";
          }
        }
        $insert_sql = "$temp_insert_sql SET $sets WHERE true $whereCause";
        $log_sql .= $insert_sql;
        $rs = $db->execQuery($insert_sql);
        $rslt = $rs;
        if($rslt["rslt"]==false){ $log->logging($log_sql,$uid);echo json_encode($rslt);return;}
      }
      $log->logging($log_sql,$uid);
      echo json_encode($rslt);
      break;
    case "insertcase":
      $rslt = "";$uid = $data["uid"];
      $data =  $data["data"];
      $sid = $data["strandingreport"]["sid"];
      $log_sql = "";

      $insert_sql = "";
      $temp_insert_sql = "INSERT INTO strandingreport ";$cols_sql = "`sid`,`created_at`,`updated_at`";$vals_sql = "'$sid',NOW(),NOW()";
      foreach ($data["strandingreport"] as  $column => $value) {
        if($column == "sid"){ continue; }
        if($value!="null"){
          $cols_sql.= ",`$column`";
          $vals_sql.=",'$value'";
        }
      }
      $insert_sql = $temp_insert_sql." (".$cols_sql.") VALUES (".$vals_sql.");";
      $rs = $db->execQuery($insert_sql);
      $rslt = $rs;
      $log_sql .= $insert_sql;
      if($rslt["rslt"]==false){ $log->logging($log_sql,$uid);echo json_encode($rslt);return; }

      $insert_sql = "";
      foreach ($data as $table => $columns) {
        if($table == "strandingreport"){ continue; }
        $temp_insert_sql = "INSERT INTO $table ";$cols_sql = "`sid`,`created_at`,`updated_at`";$vals_sql = "'$sid',NOW(),NOW()";
        foreach($columns as $column => $value){
          if($value!="null"){
            $cols_sql.= ",`$column`";
            $vals_sql.=",'$value'";
          }
        }
        $insert_sql = $temp_insert_sql." (".$cols_sql.") VALUES (".$vals_sql.");";
        $log_sql .= $insert_sql;
        $rs = $db->execQuery($insert_sql);
        $rslt = $rs;
        if($rslt["rslt"]==false){ $log->logging($log_sql,$uid);echo json_encode($rslt);return;}
      }
      $log->logging($log_sql,$uid);
      $rslt["rslt"] = true;
      echo json_encode($rslt);
      break;
    case "getMarineMammal":
      $rslt = "";
      $dataNeeds = $data["attributes"];
      $sid = $data["sid"];
      $columnsSQL = "";
      $tables  = "";
      $joins   = "";
      $whereCause = "WHERE strandingreport.sid = '$sid'";
      foreach($dataNeeds as $table =>$columns){
        if($table != "strandingreport"){
          $joins.= " LEFT JOIN $table ON $table.sid = strandingreport.sid";
        }else{
          $tables.= " ".$table." ";
        }
        foreach($columns as $column){
          if($columnsSQL != ""){ $columnsSQL.= ","; }
          $columnsSQL.= " $table.$column as '$table^$column'";
        }
      }
      $sql  = "SELECT $columnsSQL FROM $tables $joins $whereCause";
      $rs = $db->seleQuery($sql);
      if($rs["rslt"]){
        $lenOfData = count($rs["data"]);
        $rslt = $rs["data"];
      }else{ 
        $rslt["error"] = "System Error:#request#getMarineMammals";
      }
      echo json_encode($rslt);
      break;
    case "getMarineMammals":
      $rslt = "";
      $dataNeeds = $data["attributes"];
      //$range= $data["range"]; //[from, count] eg. [0,10] from id 0 get 10 record
      
      $columnsSQL = "";
      $tables  = "";
      $joins   = "";
      $whereCause = "";
      //$limit = "LIMIT ".$range[0].",".$range[1];
      $limit = "";
      foreach($dataNeeds as $table =>$columns){
        if($table != "strandingreport"){
          $joins.= " LEFT JOIN $table ON $table.sid = strandingreport.sid";
        }else{
          $tables.= " ".$table." ";
        }
        foreach($columns as $column){
          if($columnsSQL != ""){ $columnsSQL.= ","; }
          $columnsSQL.= " $table.$column as '$table^$column'";
        }
      }

      $sql  = "SELECT $columnsSQL FROM $tables $joins $whereCause $limit";
      $rs = $db->seleQuery($sql);
      if($rs["rslt"]){
        $lenOfData = count($rs["data"]);
        if($lenOfData>0){
          $rslt = $rs["data"];
        }else{
          $rslt["error"] = "No Data Selected:#request#getMarineMammals";
        }
      }else{ 
        $rslt["error"] = "System Error:#request#getMarineMammals";
      }
      echo json_encode($rslt);
      break;
    case "delMarineMammal":
      $uid = $data["uid"];$sid = $data["sid"];
      $attr= $data["attributes"];
      $rslt['rslt'] = true;
      $log_sql = "";
      $error = [];
      foreach($attr as $table=>$columns){
        if($table=="strandingreport"){ continue; }
        $sql = "DELETE FROM $table WHERE sid = '$sid'";
        $rs = $db->execQuery($sql);
        if($rs["rslt"]==false){ 
          $error[] = $table;
        }
        $log_sql.=$sql;
      }
      if(count($error)>0){
        $rslt['error'] = $error;
        $rslt['rslt'] = false;
      }else{
        $sql = "DELETE FROM strandingreport WHERE sid = '$sid'";
        $rs = $db->execQuery($sql);
      }
      $log->logging($log_sql,$uid);
      echo json_encode($rslt);
      break;
    case "getMapView":
      $rslt = [];
      
      /**********************************************************************************/
      $dataNeeds = $data["attributes"];
      $columnsSQL = "";
      $tables  = "";
      $joins   = "";
      $whereCause = "";
      $limit = "";
      foreach($dataNeeds as $table =>$columns){
        if($table != "strandingreport"){
          $joins.= " LEFT JOIN $table ON $table.sid = strandingreport.sid";
        }else{
          $tables.= " ".$table." ";
        }
        foreach($columns as $column){
          if($columnsSQL != ""){ $columnsSQL.= ","; }
          $columnsSQL.= " $table.$column as '$table^$column'";
        }
      }

      $sql  = "SELECT $columnsSQL FROM $tables $joins $whereCause $limit";
      $rs = $db->seleQuery($sql);
      //print_r($rs);
      if($rs["rslt"]){
        $lenOfData = count($rs["data"]);
        if($lenOfData>0){
          $rslt["MarineMammal"] = $rs["data"];
        }else{
          $rslt["error"] = "No Data Selected:#request#getMapView#MarineMammal";
        }
      }else{ 
        $rslt["error"] = "System Error:#request#getMapView#MarineMammal";
      }
      /**********************************************************************************/
      $sql  = "SELECT * FROM boatrecord GROUP BY `date`,`vessel`";
      $rs = $db->seleQuery($sql);
      //print_r($rs);
      if($rs["rslt"]){
        $lenOfData = count($rs["data"]);
        if($lenOfData>0){
          $rslt["BoatActivity"] = $rs["data"];
        }else{
          $rslt["error"] = "No Data Selected:#request#getMapView#BoatActivity";
        }
      }else{ 
        $rslt["error"] = "System Error:#request#getMapView#BoatActivity";
      }
      /**********************************************************************************/
      echo json_encode($rslt);
      break;
    case "getFiles":
      $rslt = [];
      $sql = "SELECT * FROM files";
      $rs = $db->seleQuery($sql);
      if($rs["rslt"]){
        $lenOfData = count($rs["data"]);
        if($lenOfData>0){
          $rslt["data"] = $rs["data"];
        }else{
          $rslt["error"] = "No Data Selected:#request#getMapView#MarineMammal";
        }
      }else{ 
        $rslt["error"] = "System Error:#request#getMapView#MarineMammal";
      }
      echo json_encode($rslt);
      break;
  }
?>


