<?php
//连接数据库
$conn=mysql_connect("localhost","root",121212);
//选择数据库
mysql_select_db("ag",$conn);
//支持中文
mysql_query("SET NAMES UTF8");
//执行sql语句
$username=$_POST["username"];
$password=$_POST["password"];
$sql="SELECT * FROM ulist WHERE username='{$username}' OR password='{$password}'";
$result=mysql_query($sql);
$data = array();
 while($row = mysql_fetch_assoc($result)){
 	$data[] = $row;
 }
 echo json_encode($data);
?>
