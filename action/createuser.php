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
$telephone=$_POST["tel"];
$sex=$_POST["sex"];
$info=$_POST["info"];
$sql= "INSERT INTO ulist (username,telephone,password,sex,info) VALUES ('{$username}','{$telephone}','{$password}','{$sex}','{$info}')";
 $result=mysql_query($sql);
 if($result==1){
 	echo 1;
 }else{
 	echo 0;
 }
?>