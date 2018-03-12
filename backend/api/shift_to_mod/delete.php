<?php
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
    
    if (isset($data->id)) {
        $shift_to_mod->id = trim($data->id);

        if (filter_var($shift_to_mod->id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('id does not conform');
        }
    } else {
        throw new Exception('id not provided for delete');
    }
    
    // query products
    $stmt = $shift_to_mod->delete();
    $num = $stmt->rowCount();
 
    // products array
    $shift_to_mod_arr = (object) array();
    $shift_to_mod_arr->response = "OK";
    if ($num > 0) {
        $shift_to_mod_arr->message = "Shift to mod with id {$submitted_id} deleted.";
    } else {
        $shift_to_mod_arr->message = "Nothing deleted. Nothing with id {$submitted_id} exists.";
    }

    echo json_encode($role_arr);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}
?>