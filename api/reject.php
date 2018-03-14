<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$result = (object) array();
$result->response = "AUTH_ERR";
$result->message = "Not Authorized";

echo json_encode($result);