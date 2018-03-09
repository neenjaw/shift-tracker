<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/mod.php';

try {
    if (!isset($_POST['mid'])) {
        throw new Exception('Mod id not provided.');
    }

    if (!isset($_POST['name'])) {
        throw new Exception('Mod name not provided.');
    }

    $update_mid = trim($_POST['mid']);
    $update_name = trim($_POST['name']);
    
    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $mod = new Mod($db);
    
    // query products
    $stmt = $mod->update($update_mid, $update_name);

    $num = $stmt->rowCount();

    $result = (object) array();
    $result->response = "OK";

    if ($num > 0) {
        $result->message = "Mod {$update_mid} updated.";
    } else {
        $result->message = "No mod records updated.";
    }

    echo json_encode($result);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}

?>