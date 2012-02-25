<?php

ini_set('log_errors', 0);
ini_set('display_errors', 1);
error_reporting(E_ALL | E_STRICT);


# run the code
if (empty($_POST['data'])) exit;

$code = urldecode($_POST['data']);

if (get_magic_quotes_gpc())
{
   $code = stripslashes($code);
}

eval($code);
##################################################


########## These functions can be called from code editor ##########
function pr(array $array)
{
	echo '<pre>';
	print_r($array);
	echo '</pre>';
}

?>