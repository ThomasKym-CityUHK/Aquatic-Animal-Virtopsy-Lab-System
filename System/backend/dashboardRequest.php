<?php
include_once("config.php");
header('Content-Type: application/json');
$db = new Database();
$log= new Log();

////////////////////////////////////////////////////////////////////////////////////////////////

$type=$_REQUEST["request"];
$data=$_REQUEST["data"];
switch($type){
  case "stat":
    $main = $data[0]["main"];
    $rulelist = isset($data[0]["rule"])?$data[0]["rule"]:[];
    $maindt = $main["maindt"];
    $attr = explode("^", $maindt);
    $table = $attr[0];$column = $attr[1];
    $sql = "";
    $whereSQL = "true";
    $joinSQL  = "";$join  = [];$dispOpts = "COUNT";
    $datatype = isset($main["max"])?"number":(isset($main["end"])?"date":"string");
    switch($datatype){
      case "number":
        $max = ($main["max"]=="undefined")?9999999:(int)$main["max"];$min = ($main["min"]=="undefined")?0:(int)$main["min"];
        $dispOpts = ($main["dispOpts"]=="undefined"||$main["dispOpts"]=="cnt")?"COUNT":$main["dispOpts"];
        $whereSQL .= " AND $table.$column <= $max AND $table.$column >= $min";
        break;
      case "date":

      case "string":
    }
    
    for($idx = 0;$idx<count($rulelist);$idx++){
      $attribute = explode("^", $rulelist[$idx]["data"]);
      $_table = $attribute[0];$_column = $attribute[1];
      if($_table!=$table){ $join[$_table] = ""; }
      $whereSQL .= " AND $_table.$_column ".$rulelist[$idx]["operator"]." (";
      for($_idx = 0;$_idx < count($rulelist[$idx]["params"]);$_idx++){
        if($_idx>0){ $whereSQL .= ","; }
        $whereSQL .= "'".$rulelist[$idx]["params"][$_idx]."'";
      }
      $whereSQL.=")";
    }

    foreach ($join as $key => $value){
      $joinSQL .= " LEFT JOIN $key ON $key.sid = $table.sid ";
    }

    $sql.= "SELECT $dispOpts($table.$column) as 'rslt' FROM $table $joinSQL WHERE $whereSQL";
    //echo $sql;
    $rs = $db->seleQuery($sql);
    if($rs["rslt"]){
      $lenOfData = count($rs["data"]);
      $rslt = $rs["data"];
    }else{ 
      $rslt["error"] = "System Error:#Dashboard Request#stat";
    }
    echo json_encode($rslt);
    break;
  case "lb":case "pd":
    $datasetlist = $data;$rslt = [];
    $multiMain = (count($datasetlist)>1);
    $lables = [];
    for($i=0;$i<count($datasetlist);$i++){
      $dataset = $datasetlist[$i];
      $main = $dataset["main"];
      $subs = isset($dataset["subs"])?$dataset["subs"]:[];

      $label= getGroups($main["maindt"]);
      $labels[$i]["main"] = $label;
      $labels[$i]["subs"] = [];
      for($j=0;$j<count($subs);$j++){
        $sublabel = getGroups($subs[$j]["subdt"]);
        $labels[$i]["subs"][$j] = $sublabel;
      }
    }
    $rslt = $labels;
    echo json_encode($rslt);
    break;
  case "sc":
    break;
  case "tl":
    $showlist = $data["showData"];
    $rulelist = isset($data["rule"])?$data["rule"]:[];
    $selectedSQL = " strandingreport.sid as 'strandingreport^sid'";
    $whereSQL = "true ";
    $joinSQL  = "";$join  = [];
    for($idx = 0;$idx<count($showlist);$idx++){
      if($showlist[$idx]=="strandingreport^sid"){ continue; }
      $attribute = explode("^", $showlist[$idx]);
      $table = $attribute[0];$column = $attribute[1];
      $selectedSQL.= ",$table.$column as '$table^$column'";
      if($table!="strandingreport"){ $join[$table] = ""; }
    }
    
    for($idx = 0;$idx<count($rulelist);$idx++){
      $attribute = explode("^", $rulelist[$idx]["data"]);
      $table = $attribute[0];$column = $attribute[1];
      if($table!="strandingreport"){ $join[$table] = ""; }
      $whereSQL .= " AND $table.$column ".$rulelist[$idx]["operator"]." (";
      for($_idx = 0;$_idx < count($rulelist[$idx]["params"]);$_idx++){
        if($_idx>0){ $whereSQL .= ","; }
        $whereSQL .= "'".$rulelist[$idx]["params"][$_idx]."'";
      }
      $whereSQL.=")";
    }

    foreach ($join as $key => $value){
      $joinSQL .= " LEFT JOIN $key ON $key.sid = strandingreport.sid ";
    }
    $sql = "SELECT $selectedSQL FROM strandingreport $joinSQL WHERE $whereSQL";
    //echo $sql;
    $rs = $db->seleQuery($sql);
    if($rs["rslt"]){
      $lenOfData = count($rs["data"]);
      $rslt = $rs["data"];
    }else{ 
      $rslt["error"] = "System Error:#Dashboard Request#tl";
    }
    echo json_encode($rslt);
    break;
}
  
?>


