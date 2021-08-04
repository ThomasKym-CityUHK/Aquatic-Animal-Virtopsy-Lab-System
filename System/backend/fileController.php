<?php
  include_once("config.php");
  header('Content-Type: application/json');
  $db = new Database();
  $log= new Log();
  
  ////////////////////////////////////////////////////////////////////////////////////////////////
  $ds          = "/";
  $_ds          = "\\";
  $dn          = dirname( __FILE__ );
  $upload_root = "Uploaded";
  $temp_root = $dn.$_ds.$upload_root.$_ds."Temp";
  $user_root = $dn.$_ds.$upload_root.$_ds."User";
  $case_root = $dn.$_ds.$upload_root.$_ds."Case";
  
  $sever_root= "AquaticAnimalVirtopsyLabSystem";//
  $backend_root= "backend";
  $temp_root_path = $backend_root.$ds.$upload_root.$ds."Temp";
  $user_root_path = $backend_root.$ds.$upload_root.$ds."User";
  $case_root_path = $backend_root.$ds.$upload_root.$ds."Case";

  $type=$_REQUEST["request"];
  //$data=$_REQUEST["data"];
  switch($type){
    case "uploadTemp":
      $rslt =false;
      if(!empty($_FILES)){
        $tmpFile = $_FILES['file']['tmp_name'];
        $targetFile =  $temp_root.$_ds.$_FILES['file']['name'];
        if(mvFile($tmpFile,$targetFile)){  $rslt["rslt"] = true; }
        else{ $rslt["rslt"] = false; };
        
        //print_r($_REQUEST);


        if($rslt["rslt"]==true){
          $sid = isset($_REQUEST["sid"])?(($_REQUEST["sid"]=="null")?"NULL":$_REQUEST["sid"]):"NULL";
          $uid = isset($_REQUEST["uid"])?$_REQUEST["uid"]:"NULL";
          $name= $_FILES['file']['name'];
          $path= ($sid=="NULL")?$targetFile:$case_root.$_ds.$sid.$_ds.$name;
          $class= isset($_REQUEST["imageclass"])?$_REQUEST["imageclass"]:"NULL";
          $category= isset($_REQUEST["category"])?$_REQUEST["category"]:"NULL";
          $description= isset($_REQUEST["description"])?$_REQUEST["description"]:"NULL";
          $fileType= isset($_REQUEST["type"])?$_REQUEST["type"]: $_FILES['file']['type'];
          $fileSize= isset($_REQUEST["size"])?$_REQUEST["size"]: $_FILES['file']['size'];

          $db_path = $temp_root_path.$ds.$name;
          if($path !=$targetFile){ 
            if (!file_exists($case_root.$_ds.$sid)) { 
              mkdir($case_root.$_ds.$sid);
            }
            rename($targetFile,$path); 
            $db_path = $case_root_path.$ds.$sid.$ds.$name;
          }

          $sql = "INSERT INTO `files` (`sid`,`uid`,`name`,`path`,`class`,`category`,`description`,`type`,`size`,`created_at`,`updated_at`) ";
          $sql.= "VALUES ('$sid','$uid','$name','$db_path','$class','$category','$description','$fileType','$fileSize',NOW(),NOW())";

          $rs = $db->execQuery($sql);
          $log->logging($sql,$uid);
        }else{
          $rslt["rslt"] = "no do insert database";
        }
      }
      echo json_encode($rslt);
      return;
    case "updateCase":
      $data=$_REQUEST["data"];
      return;
  }
  
?>


