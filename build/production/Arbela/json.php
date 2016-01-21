<?php
echo 'steven';
   $json = $_POST['json'];
   $title = $_POST['title'];
 	echo $json;
  $dst = $_SERVER['DOCUMENT_ROOT']."/resources/data";
 	//$dst = "resources/data";//$_SERVER['DOCUMENT_ROOT'].
	//exec ("find ".$dst." -type d -exec chmod 777 {} +");
	//exec ("chmod 777 " + $dst +);
   if (json_decode($json) != null) { /* sanity check */
    $file = fopen( $_SERVER['DOCUMENT_ROOT']."/resources/data/".$title.".json",'w+');
    // $file = fopen("resources/data/".$title.".json",'w+');
var_dump($file);
     fwrite($file, $json);
     fclose($file);
   } else {
     // handle error 
   }
  
?>
