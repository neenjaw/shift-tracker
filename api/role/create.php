<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  
// include database and object files
include_once '../config/database.php';
include_once '../objects/role.php';

try {

    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $role = new Role($db);

    $data = json_decode(file_get_contents('php://input'));

    if (isset($data->name)) {
        $role->name = trim($data->name);
    } else {
        throw new Exception("role name not provided for create");
    }
    
    // query products
    $stmt = $role->create();

    $num = $stmt->rowCount();

    $result = (object) array();
    $result->response = "OK";

    if ($num > 0) {
        $result->message = "Role {$role->name} created.";
    } else {
        $result->message = "Role not created.";
    }

    echo json_encode($result);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}

?>