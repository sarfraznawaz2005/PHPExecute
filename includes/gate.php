<?php

ini_set('log_errors', 0);
ini_set('display_errors', 1);
error_reporting(E_ALL | E_STRICT);

#### These will be available in editor ####
require_once 'functions.php';

# include any needed classes
require_once 'classes/timer.php';
$timer = new timer();

###########################################

# run the code
if (empty($_POST['data'])) exit;

$code = urldecode($_POST['data']);

if (get_magic_quotes_gpc())
{
   $code = stripslashes($code);
}

eval($code);
##################################################

?>