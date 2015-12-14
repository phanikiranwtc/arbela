<?php
   $json = $_POST['json'];
   $title = $_POST['title'];
 	echo $json;
   if (json_decode($json) != null) { /* sanity check */
     $file = fopen("./resources/data/".$title.".json",'w+');
     fwrite($file, $json);
     fclose($file);
   } else {
     // handle error 
   }
  
?>