<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/assignment.php';

try {
    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $assignment = new Assignment($db);

    $data = json_decode(file_get_contents('php://input'));

    if (isset($data->id)) {
        $assignment->id = trim($data->id);
    } else {
        throw new Exception("assignment id not provided for update");
    }

    if (isset($data->name)) {
        $assignment->name = trim($data->name);
    } else {
        throw new Exception("assignment name not provided for update");
    }
    
    // query products
    $stmt = $assignment->update();

    $num = $stmt->rowCount();

    $result = (object) array();
    $result->response = "OK";

    if ($num > 0) {
        $result->message = "assignment {$assignment->id} updated.";
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