<?php
  function findKey($table1,$table2){
    if($table1=="users"){
      if($table2=="strandingreport"){
        return [
          [["users","uid"],["strandingreport","uid"]]
        ];
      }else if($table2=="recourse"){
        return [
          [["users","uid"],["recourse","uid"]]
        ];
      }else if($table2=="md5"){
        return [
          [["users","uid"],["strandingreport","uid"]],
          [["strandingreport","sid"],["files","sid"]],
          [["files","md5"],["md5","md5"]]
        ];
      }else{
        return [
          [["users","uid"],["strandingreport","uid"]],
          [["strandingreport","sid"],["$table2","sid"]]
        ];
      }
    }else if($table1=="recourse"){
      if($table2=="strandingreport"){
        return [
          [["recourse","uid"],["user","uid"]],
          [["user","uid"],["strandingreport","uid"]]
        ];
      }else if($table2=="users"){
        return [
          [["recourse","uid"],["users","uid"]]
        ];
      }else if($table2=="md5"){
        return [
          [["recourse","uid"],["user","uid"]],
          [["user","uid"],["strandingreport","uid"]],
          [["strandingreport","sid"],["files","sid"]],
          [["files","md5"],["md5","md5"]]
        ];
      }else{
        return [
          [["recourse","uid"],["user","uid"]],
          [["user","uid"],["strandingreport","uid"]],
          [["strandingreport","sid"],["$table2","sid"]]
        ];
      }
    }else if($table1=="md5"){
      if($table2=="strandingreport"){
        return [
          [["md5","md5"],["files","md5"]],
          [["files","sid"],["strandingreport","sid"]]
        ];
      }else if($table2=="recourse"){
        return [
          [["md5","md5"],["files","md5"]],
          [["files","sid"],["strandingreport","sid"]],
          [["strandingreport","uid"],["users","uid"]],
          [["users","uid"],["recourse","uid"]]
        ];
      }else if($table2=="users"){
        return [
          [["md5","md5"],["files","md5"]],
          [["files","sid"],["strandingreport","sid"]],
          [["strandingreport","uid"],["users","uid"]]
        ];
      }else{
        return [
          [["md5","md5"],["files","md5"]],
          [["files","sid"],["strandingreport","sid"]],
          [["strandingreport","sid"],["$table2","sid"]]
        ];
      }
    }else{
      if($table2=="md5"){
        return [
          [["$table1","sid"],["strandingreport","sid"]],
          [["strandingreport","sid"],["files","sid"]],
          [["files","md5"],["md5","md5"]]
        ];
      }else if($table2=="recourse"){
        return [
          [["$table1","sid"],["strandingreport","sid"]],
          [["strandingreport","uid"],["users","uid"]],
          [["users","uid"],["recourse","sid"]]
        ];
      }else if($table2=="users"){
        return [
          [["$table1","sid"],["strandingreport","sid"]],
          [["strandingreport","uid"],["users","uid"]]
        ];
      }else{
        return [[["$table1","sid"],["$table2","sid"]]];
      }
    }
  }
  
  function getColumnDTL($data){
    $table = $data["table"];
    $column= $data["column"];
    $db = new Database();
    $sql = "SELECT $column FROM $table GROUP BY $column";
    $rs = $db->seleQuery($sql);
    $result["val"] = $rs['data'];
    $result["cnt"] = count($rs['data']);

    return $result;
  }
  function getAttrGroups($data){
    if($data==[]){ return []; }
    if(count($data["dataset"])>0&&$data["dataset"]!=""&&$data["dataset"][0]!=""){
      $labels = $data["dataset"];
    }else{
      $param["table"]=$data["table"];$param["column"]=$data["column"];
      $rs=getColumnDTL($param);$labels = [];
      foreach($rs["val"] as $row){
        $labels[] = $row[$data["column"]];
      }
    }
    return $labels;
  }
  function getGroups($dt){
    $attr = explode("^", $dt);
    $param["table"]=$attr[0];$param["column"]=$attr[1];
    $rs=getColumnDTL($param);$labels = [];
    foreach($rs["val"] as $row){
      $labels[] = $row[$param["column"]];
    }
    
    return $labels;
  }
  function getWhereClause($data){
    $table = $data["table"];
    $column = $data["column"];
    $operator = $data["operator"];
    $values = $data["params"];
    $sql = " AND $table.$column $operator ";
    switch($operator){
      case "IN":case "NOT IN":
        $sql .= "(";
        for($i=0;$i<count($values);$i++){
          if($i>0){ $sql .= ","; }
          $sql .= "'".$values[$i]."'";
        }
        $sql .= ")";
        break;
      case "BETWEEN":case "NOT BETWEEN":
        $sql .= "'".$values[0]."' AND '".$values[1]."'";
        break;
      default:
        $sql .= "'".$values[0]."'";
        break;
    }
    return $sql;
  }
  
  function getJoinCase($table1,$table2){
    $join = findKey($table1,$table2);
    $sql = " LEFT JOIN $table1 ON ";
    for($i=0;$i<count($join);$i++){
      if($i>0){ 
        $sql.=" AND "; 
      }
      $sql.= $join[$i][0]." = ".$join[$i][1];
    }
    return $sql;
  }


  function mvFile($orgPath,$tarPath){
    return move_uploaded_file($orgPath,$tarPath);
  }
  function mkFolder($name,$targetdir){
    return mkdir($targetdir.$name,0777,TRUE);
  }
?>
