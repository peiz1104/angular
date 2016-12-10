<?php
//连接数据库
$conn=mysql_connect('localhost','root',121212);
//选择数据库
mysql_select_db('ag',$conn);
//支持中文
mysql_query('SET NAMES UTF8');
//进行获取的到的数据
$title=$_POST['title'];
$writer=$_POST['writer'];
$content=$_POST['content'];
$date=$_POST['date'];
$sql="INSERT INTO nlist (title,writer,date,content) VALUES ('{$title}','{$writer}','{$date}','{$content}')";
$result=mysql_query($sql);
if($result==1){
	echo 1;
}else{
	echo 0;
}
?>