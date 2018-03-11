<?php

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
        throw new Exception("staff member id not provided for update");
    }

    if (isset($data->updated_by)) {
        $staff_member->updated_by = trim($data->updated_by);
    } else {
        throw new Exception("staff member updated_by not provided for update");
    }

    if (isset($data->first_name)) {
        $staff_member->first_name = trim($data->first_name);
    }
  
    if (isset($data->last_name)) {
        $staff_member->last_name = trim($data->last_name);
    }

    if (isset($data->category_id)) {
        $data->category_id = trim($data->category_id);

        if (filter_var($data->category_id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('category_id does not conform');
        }

        $staff_member->category_id = $data->category_id;
    }

    //check for active flag
    if (isset($data->active)) {
        if ($data->active === 'true') {
            $staff_member->active = 1;
        } elseif ($data->active === 'false') {
            $staff_member->active = 0;
        } else {
            throw new Exception("active flag value does not conform");            
        }
    } 
    
    // query products
    $stmt = $staff_member->update();

    $num = $stmt->rowCount();

    $result = (object) array();
    $result->response = "OK";

    if ($num > 0) {
        $result->message = "staff_member {$staff_member->id} updated.";
    } else {
        $result->message = "No staff member records updated.";
    }

    echo json_encode($result);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}

?>