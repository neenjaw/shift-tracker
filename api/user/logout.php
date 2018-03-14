<?php
include_once('../../assets/lib/flash.php');

session_start();

unset($_SESSION['authenticated']);
unset($_SESSION['user']);

if(session_destroy()) {
    session_start();

    $flash = new Flash(session_status());
    $flash->add_message('Successful logout.', 'secondary');

    header("Location: /index.php");
}