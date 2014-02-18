<html>
<title> AEPi HUD STATUS </title>
<head>
  <link rel="stylesheet" href="style.css">
</head>


<body>
<h3> IS THE HUD OPERATIONAL? </h3>
<?php
 $r = mt_rand() / mt_getrandmax();
 if ($r > 0.3) {
	 echo "<h1 id='yes'> YES </h>";
 } else {
	 echo "<h1 id='no'> NO </h>";
 }

 echo "<h6>".$r."</h6>";

?> 

</body>
</html>