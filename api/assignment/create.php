<?php
require_once '../config/auth.php';

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  
// include database and object files
include_once '../config/database.php';
include_once '../objects/assignment.php';

// TODO: see below
// 1. move obj init to the top of try
// 2. add $data json decode
// 3. reformat data validation 

try {
    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $assignment = new Assignment($db);

    $data = json_decode(file_get_contents('php://input'));

    if (isset($data->name)) {
        $assignment->name = trim($data->name);
    } else {
        throw new Exception("assignment name not provided for create");
    }
    
    // query products
    $stmt = $assignment->create();

    $num = $stmt->rowCount();

    $result = (object) array();
    $result->response = "OK";

    if ($num > 0) {
        $result->message = "Assignment {$assignment->name} created.";
    } else {
        $result->message = "Assignment not created.";
    }

    echo json_encode($result);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}

?>