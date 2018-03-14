<?php
if (session_status() !== PHP_SESSION_ACTIVE) {
  
  session_start();

  include_once('../../assets/lib/flash.php');
  $flash = new Flash(session_status());

  if (!isset($_SESSION['user'])) {
    header("Location: /api/reject.php");
  }

}