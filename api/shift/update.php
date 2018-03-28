<?php
require_once '../config/auth.php';

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/shift.php';

try {

    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $shift = new Shift($db);
       
    //get the json body
    $data = json_decode(file_get_contents('php://input'));

    //get the shift id
    if (isset($data->id)) {
        $shift->id = trim($data->id);
    } else {
        throw new Exception("shift id not provided for update");
    }

    //get the shift updated by
    if (isset($data->updated_by)) {
        $shift->updated_by = trim($data->updated_by);
    } else {
        throw new Exception("shift updated_by not provided for update");
    }

    //set the shift date
    if (isset($data->shift_date)) {
        $shift->shift_date = trim($data->shift_date);

        if (preg_match('/^[12][0-9]{3}-[0-1][0-9]-[0-3][0-9]$/', $shift->shift_date) !== 1) {
            throw new Exception('shift date does not conform');
        }
    }
  
    //set the shift_d_or_n
    if (isset($data->shift_d_or_n)) {
        $shift->shift_d_or_n = strtoupper(trim($data->shift_d_or_n));

        if (!($shift->shift_d_or_n === 'D' || $shift->shift_d_or_n === 'N')) {
            throw new Exception('d or n does not confrom');
        }
    }

    //set the role id
    if (isset($data->role_id)) {
        $shift->role_id = trim($data->role_id);

        if (filter_var($shift->role_id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('role id does not conform');
        }
    }

    //set the assignment id
    if (isset($data->assignment_id)) {
        $shift->assignment_id = trim($data->assignment_id);

        if (filter_var($shift->assignment_id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('assignment id does not conform');
        }
    }
    
    // query products
    $stmt = $shift->update();

    $num = $stmt->rowCount();

    $result = (object) array();
    $result->response = "OK";

    if ($num > 0) {
        $result->updated = true;
        $result->message = "shift {$shift->id} updated.";
    } else {
        $result->updated = false;
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