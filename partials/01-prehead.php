<?php

session_start();

include_once('../assets/lib/flash.php');
include_once(dirname(__FILE__).'/../assets/lib/util.php');

$flash = new Flash(session_status());

if (!isset($_SESSION['user'])) {
  header("Location: /");
}

?>

<!DOCTYPE html>
<html>