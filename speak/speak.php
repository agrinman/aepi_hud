<html>
<body>

<?php

$text = $_POST["text"];
$pass = $_POST["pass"];

if ($pass.equals("hudcomm")) {
	$output = shell_exec('./devl/jarvis-pi/lib/text2speech.sh '.'"'.$text.'"');
	echo "<h1>".$output."</h1>"
} else {
	echo "<h1> YOU SO BAD. WRONG! </h1>"
}

?>

</body>
</html>