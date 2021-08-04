<?php
  include_once("config.php");
  //header('Content-Type: application/json');
  $db = new Database();
  $log= new Log();

  /*******************For String and line bar chart*********************/
  $returnResult = [];
  $data = isset($_REQUEST['data'])?$_REQUEST['data']:"";
  if($data==[]||$data==""){ echo $data;return; }
  //SampleData.data
  $returnResult["mainlabel"] = [];
  //value array length (only for main data) 
  //eg. vLen=0 1. [25,3,4,6], |=> vLen=4 2.[0,0,0,0,5,9,6], |=> vLen=7 3.[0,0,0,0,0,0,0,7,8,9]
  $_vLen = 0;
  for($idx_data=0;$idx_data<count($data);$idx_data++){
    //ini varibles
    $main = $data[$idx_data]["main"];
    $sub  = isset($data[$idx_data]["sub"])?$data[$idx_data]["sub"]:[];
    //get curremt main data sets
    $sets = getAttrGroups($main);

    //construct return data set
    $main_pType = $main["ptype"];
    $main_gType = $main["gtype"];
    $mainIsGrouped  = isset($main["isGrouped"])?$main["isGrouped"]:false;
    if($mainIsGrouped=="false"||$mainIsGrouped=="FALSE"||$mainIsGrouped=="False"||$mainIsGrouped==false){
      $mainIsGrouped=false; }else{ $mainIsGrouped=true; }
    $main_table = $main["table"];
    $main_column= $main["column"];
    $sql = "";
    
    if($mainIsGrouped){
      $returnResult["mainlabel"] = array_merge($returnResult["mainlabel"],[$main_column]);
    }else{
      $returnResult["mainlabel"] = array_merge($returnResult["mainlabel"],$sets);
    }
    

    $whereSQL = "";$where = [];
    $joinSQL  = "";$join  = [];

    $rules = isset($main["rules"])?$main["rules"]:[];
    
    //for rules where calues sql and join list
    for($idx_rules=0;$idx_rules<count($rules);$idx_rules++){
      $where[$rules[$idx_rules]["table"]] = 1;
      if($idx_rules>0){ $whereSQL.= " AND "; }
      $whereSQL.= getWhereClause($rules[$idx_rules]);

      $joinlist = findKey($rules[$idx_rules]["table"],$main_table);
      for($y=0;$y<count($joinlist);$y++){
        $join[$joinlist[$y][0][0]][$joinlist[$y][1][0]] = $joinlist[$y][1][1];
      }
    }
    
    //for subset join list
    for($idx_sub=0;$idx_sub<count($sub);$idx_sub++){
      $where[$sub[$idx_sub]["table"]] = 1;
      $joinlist = findKey($sub[$idx_sub]["table"],$main_table);
      for($y=0;$y<count($joinlist);$y++){
        $join[$joinlist[$y][0][0]][$joinlist[$y][1][0]] = $joinlist[$y][1][1];
      }
    }

    //for join sql
    foreach($join as $joinTable => $value){
      if($joinTable==$main_table){ continue; }
      $index_join = 0;
      $joinSQL .= " LEFT JOIN $joinTable ON ";
      foreach($join[$joinTable] as $key =>$value_in){
        if($index_join>0){ $joinSQL .= " AND "; }
        $joinColumn = $join[$joinTable][$key];
        $joinSQL .= "$joinTable.$joinColumn = $key.$joinColumn";
      }
    }

    //construct Select SQL and return data 
    if(count($sub)>0){
      for($idx_sub=0;$idx_sub<count($sub);$idx_sub++){

        $subPType = $sub[$idx_sub]["ptype"];
        
        $subIsGrouped  = isset($sub[$idx_sub]["isGrouped"])?$sub[$idx_sub]["isGrouped"]:false;
        if($subIsGrouped=="false"||$subIsGrouped=="FALSE"||$subIsGrouped=="False"||$subIsGrouped==false){
          $subIsGrouped=false; }else{ $subIsGrouped=true; }
          
        $subTable = $sub[$idx_sub]["table"];
        $subColumn= $sub[$idx_sub]["column"];
        //get current sub data sets
        $subsets = [];
        $subsets = getAttrGroups($sub[$idx_sub]);

        for($idx_subsets=0;$idx_subsets<count($subsets);$idx_subsets++){
          $subSetValue = $subsets[$idx_subsets];
          $v = array_fill(0,$_vLen,0);
          for($idx_mainset=0;$idx_mainset<count($sets);$idx_mainset++){
            $setValue = $sets[$idx_mainset];
            $sql = "SELECT $subPType($subTable.$subColumn) as $subPType FROM $main_table";
            $sql.= " ".$joinSQL." ";

            $main_sql_whereclause = "";
            if($mainIsGrouped ==false){ 
              $main_sql_whereclause =  "$main_table.$main_column = '$setValue'";
            }
            $sub_sql_whereclause = "";
            if($subIsGrouped==false){
              if($mainIsGrouped){ $sub_sql_whereclause =" "; }else{ $sub_sql_whereclause =" AND "; }
              $sub_sql_whereclause .="  $subTable.$subColumn = '$subSetValue' ";
            }

            if($main_sql_whereclause=="" && $sub_sql_whereclause==""){ $main_sql_whereclause == " TRUE "; }
            $sql.= " WHERE $main_sql_whereclause $sub_sql_whereclause $whereSQL";
            $rs = $db->seleQuery($sql);
            if($rs['rslt']&&count($rs['data'])>0){
              $v[] = floatval($rs['data'][0][$subPType]);
            }
            if($mainIsGrouped==true){ break; }
          }
          
          $subGType = $sub[$idx_sub]["gtype"];
          $returnResult['label'][] = ($subIsGrouped)?$subColumn:$subSetValue;
          $returnResult['type'][] = $subGType;
          $returnResult['data'][]  = $v;
          if($subIsGrouped){ break;}
        }
        
      }
      if($mainIsGrouped){ $_vLen++; }else{ $_vLen += count($sets); }

    }else{
      for($idx_mainset=0;$idx_mainset<count($sets);$idx_mainset++){
        $v = array_fill(0,$_vLen,0);
        $setValue = $sets[$idx_mainset];
        $sql = "SELECT $main_pType($main_table.$main_column) as $main_pType FROM $main_table";
        $sql.= " ".$joinSQL." ";
        
        $main_sql_whereclause = " TRUE ";
        if(!$mainIsGrouped){ 
          $main_sql_whereclause =  "$main_table.$main_column = '$setValue'";
        }
        $sql.= " WHERE $main_sql_whereclause ".$whereSQL;
        $rs = $db->seleQuery($sql);
        if($rs['rslt']&&count($rs['data'])>0){
          $v[] = floatval($rs['data'][0][$main_pType]);
        }
        $_vLen++;
        $returnResult['data'][]  = $v;
        $returnResult['label'][]  = $main_pType;
        $returnResult['type'][] = $main_gType;
        
        if($mainIsGrouped){ break;}
      }
      //$returnResult['label'][] = $setValue." ".$main_pType;
    }
  }
  echo json_encode($returnResult);  
?>
