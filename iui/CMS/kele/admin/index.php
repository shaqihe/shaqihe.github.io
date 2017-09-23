<?php include("header.php");
$v='index';
if (isset($_GET['v'])) {$v=$_GET['v'];};
echo  file_get_contents('template/'. $v .'.html');
include("footer.php");
?>