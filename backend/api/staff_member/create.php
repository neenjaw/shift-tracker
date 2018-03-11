<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  
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

    //set the first_name
    if (isset($data->first_name)) {
        $staff_member->first_name = trim($data->first_name);
    } else {
        throw new Exception('first name not provided for create');
    }

    //set the last_name
    if (isset($data->last_name)) {
        $staff_member->last_name = trim($data->last_name);
    } else {
        throw new Exception('last name not provided for create');
    }

    if (isset($data->category_id)) {
        $data->category_id = trim($data->category_id);

        if (filter_var($data->category_id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('category id does not conform');
        }

        $staff_member->category_id = $data->category_id;
    } else {
        throw new Exception('category id not provided for create');
    }

    //check for the creator
    if (isset($data->created_by)) {
        $staff_member->created_by = trim($data->created_by);
    } else {
        throw new Exception('created_by not provided for create');
    }

    //check for active flag
    if (isset($data->active)) {
        if ($data->active === 'false') {
            $staff_member->active = 0;
        }
    } else {
        $staff_member->active = 1;
    }

    // query products
    $stmt = $staff_member->create();

    $num = $stmt->rowCount();

    $result = (object) array();
    $result->response = "OK";
    
    if ($num > 0) {
        $result->message = "User {$staff_member->first_name} {$staff_member->last_name} created.";
    } else {
        $result->message = 'User not created.';
    }

    echo json_encode($result);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = 'ERROR';
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}

?>