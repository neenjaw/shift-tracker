<?php
require_once '../config/auth.php';

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/shift_to_mod.php';

try {
    
    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $shift_to_mod = new ShiftToMod($db);

    $data = json_decode(file_get_contents('php://input'));
    
    //set id
    if (isset($data->id)) {
        $shift_to_mod->id = trim($data->id);

        if (filter_var($shift_to_mod->id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('id does not conform');
        }
    } else {
        throw new Exception('id not provided for update');
    }

    //set shift_id
    if (isset($data->shift_id)) {
        $shift_to_mod->shift_id = trim($data->shift_id);

        if (filter_var($shift_to_mod->shift_id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('shift id does not conform');
        }
    }

    //set mod_id
    if (isset($data->mod_id)) {
        $shift_to_mod->mod_id = trim($data->mod_id);

        if (filter_var($shift_to_mod->mod_id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('mod id does not conform');
        }
    }
    
    // query products
    $stmt = $shift_to_mod->update();

    $num = $stmt->rowCount();

    $result = (object) array();
    $result->response = "OK";

    if ($num > 0) {
        $result->message = "Shift to mod record {$shift_to_mod->id} updated.";
    } else {
        $result->message = "No shift to mod records updated.";
    }

    echo json_encode($result);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}

?>