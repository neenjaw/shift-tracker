<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/assignment.php';

try {
    if (!isset($_POST['aid'])) {
        throw new Exception('assignment id not provided.');
    }

    if (!isset($_POST['name'])) {
        throw new Exception('assignment name not provided.');
    }

    $update_aid = trim($_POST['aid']);
    $update_name = trim($_POST['name']);
    
    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $assignment = new Assignment($db);
    
    // query products
    $stmt = $category->update($update_aid, $update_name);

    $num = $stmt->rowCount();

    $result = (object) array();
    $result->response = "OK";

    if ($num > 0) {
        $result->message = "assignment {$update_aid} updated.";
    } else {
        $result->message = "No assignment records updated.";
    }

    echo json_encode($result);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}

?>