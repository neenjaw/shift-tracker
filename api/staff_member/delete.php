<?php
require_once '../config/auth.php';

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/staff_member.php';
 
try {

    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $staff_member = new StaffMember($db);
       
    $data = json_decode(file_get_contents('php://input'));

    if (isset($data->id)) {
        $staff_member->id = trim($data->id);
    } else {
        throw new Exception("staff_member id not provided for delete");
    }
    
    // query products
    $stmt = $staff_member->delete();
    $num = $stmt->rowCount();
 
    // products array
    $result = (object) array();
    $result->response = "OK";
    $result->deleted = false;

    if ($num > 0) {
        $result->deleted = true;
        $result->message = "staff member with id {$staff_member->id} deleted.";
    } else {
        $result->message = "Nothing deleted.";
    }

    echo json_encode($result);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}
?>