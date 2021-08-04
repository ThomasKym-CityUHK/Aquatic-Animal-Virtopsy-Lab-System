<?php
session_start();

function __autoload($classname) {
  $filename = $classname .".php";
  include_once($filename);
}

include_once('Funcs.php');
?>