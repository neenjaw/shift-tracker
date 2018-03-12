<?php

include_once(__DIR__ . '/backend/api/config/database.php');
include_once(__DIR__ . '/backend/api/objects/user.php');

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$mod = new Mod($db);