<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/role.php';

try {
    if (!isset($_POST['rid'])) {
        throw new Exception('Role id not provided.');
    }

    if (!isset($_POST['name'])) {
        throw new Exception('Role name not provided.');
    }

    $update_rid = trim($_POST['rid']);
    $update_name = trim($_POST['name']);
    
    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $role = new Role($db);
    
    // query products
    $stmt = $role->update($update_rid, $update_name);

    $num = $stmt->rowCount();

    $result = (object) array();
    $result->response = "OK";

    if ($num > 0) {
        $result->message = "Role {$update_rid} updated.";
    } else {
        $result->message = "No role records updated.";
    }

    echo json_encode($result);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}

?>