<?php
//连接数据库
$conn=mysql_connect("localhost","root",121212);
//选择数据库
mysql_select_db("ag",$conn);
//支持中文
mysql_query("SET NAMES UTF8");
//执行sql语句得到数据库中的数据
$sql= "SELECT * FROM ulist";
//结果
$result=mysql_query($sql);

$data = array();
 while($row = mysql_fetch_assoc($result)){
 	$data[] = $row;
 }
 echo json_encode($data);
?>