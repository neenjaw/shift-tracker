<?php

session_start();

include_once('../assets/lib/flash.php');
$flash = new Flash(session_status());

if (!isset($_SESSION['user'])) {
  header("Location: /");
}

$__DEV = true;

function echoGetQueryWithDate() {
  if ($__DEV) {
    echo '?' . date('l jS \of F Y h:i:s A');
  }
}

?>

<!DOCTYPE html>
<html>