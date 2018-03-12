<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  
// include database and object files
include_once '../config/database.php';
include_once '../objects/shift.php';

try {
    $result = (object) array();
    $result->warnings = array();

    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $shift = new Shift($db);

    $data = json_decode(file_get_contents('php://input'));

    //set the shift date
    if (isset($data->shift_date)) {
        $shift->shift_date = trim($data->shift_date);

        if (preg_match('/^[12][0-9]{3}-[0-1][0-9]-[0-3][0-9]$/', $shift->shift_date) !== 1) {
            throw new Exception('shift date does not conform');
        }
    } else {
        throw new Exception('shift date not provided for create');
    }

    //set the shift_d_or_n
    if (isset($data->shift_d_or_n)) {
        $shift->shift_d_or_n = strtoupper(trim($data->shift_d_or_n));

        if (!($shift->shift_d_or_n === 'D' || $shift->shift_d_or_n === 'N')) {
            throw new Exception('d or n does not confrom');
        }
    } else {
        throw new Exception('d or n not provided for create');
    }

    //set the staff id
    if (isset($data->staff_id)) {
        $shift->staff_id = trim($data->staff_id);

        if (filter_var($shift->staff_id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('staff id does not conform');
        }
    } else {
        throw new Exception('staff id not provided for create');
    }

    //set the role id
    if (isset($data->role_id)) {
        $shift->role_id = trim($data->role_id);

        if (filter_var($shift->role_id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('role id does not conform');
        }
    } else {
        throw new Exception('role id not provided for create');
    }

    //set the assignment id
    if (isset($data->assignment_id)) {
        $shift->assignment_id = trim($data->assignment_id);

        if (filter_var($shift->assignment_id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('assignment id does not conform');
        }
    } else {
        throw new Exception('assignment id not provided for create');
    }

    //sets the mods array of mod id's
    if (isset($data->mods)) {
        $shift->mods = $data->mods;

        for ($i=0; $i < count($shift->mods); $i++) { 
            if (filter_var($shift->mods[$i], FILTER_VALIDATE_INT) === false) {
                array_push($result->warnings, "{$shift->mods[$i]} is not a does not conform to mod id standard, skipped.");
                array_splice($shift->mods, $i, 1); //remove current element
                $i--; //reset counter so that loops to current element
            }
        }
    }
    
    // query products
    $stmt = $shift->create();

    $num = $stmt->rowCount();

    $result->response = "OK";

    if ($num > 0) {
        $result->message = "Shift for {$shift->staff_id} on {$shift->shift_date} created.";
    } else {
        $result->message = "Shift not created.";
    }

    echo json_encode($result);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}

?>