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
include_once '../objects/shift_to_mod.php';

try {

    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $shift_to_mod = new ShiftToMod($db);
    
    $data = json_decode(file_get_contents('php://input'));

    if (isset($data->shift_id)) {
        $shift_to_mod->shift_id = trim($data->shift_id);

        if (filter_var($shift_to_mod->shift_id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('shift id does not conform');
        }
    } else {
        throw new Exception('shift id not provided for create');
    }

    if (isset($data->mod_id)) {
        $shift_to_mod->mod_id = trim($data->mod_id);

        if (filter_var($shift_to_mod->mod_id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('mod id does not conform');
        }
    } else {
        throw new Exception('mod id not provided for create');
    }

    // query products
    $stmt = $shift_to_mod->create();

    $num = $stmt->rowCount();

    $result = (object) array();
    $result->response = "OK";

    if ($num > 0) {
        $result->created = true;
        $result->created_shiftmod_id = $db->lastInsertId();
        $result->message = "Shift to mod ({$shift_to_mod->shift_id} <-> {$shift_to_mod->mod_id}) created.";
    } else {
        $result->created = false;
        $result->message = "Shift to mod not created.";
    }

    echo json_encode($result);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}

?>