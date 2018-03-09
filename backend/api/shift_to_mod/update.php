<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/shift_to_mod.php';

try {
    if (!isset($_POST['id'])) {
        throw new Exception('User id not provided.');
    }

    $submit_shift_id = false;
    if (isset($_POST['shift-id'])) {
        $submit_shift_id = true;
    }

    $submit_mod_id = false;
    if (isset($_POST['mod-id'])) {
        $submit_mod_id = true;
    }
  
    $update_id = trim($_POST['id']);
    $update_data = (object) array();
    if ($submit_shift_id) $update_data->shift_id = trim($_POST['shift-id']);
    if ($submit_mod_id) $update_data->mod_id = trim($_POST['mod-id']);

    if (count(get_object_vars($update_data)) === 0) {
        throw new Exception('Nothing to update.');
    }
    
    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $shift_to_mod = new ShiftToMod($db);
    
    // query products
    $stmt = $shift_to_mod->update($update_id, $update_data);

    $num = $stmt->rowCount();

    $result = (object) array();
    $result->response = "OK";

    if ($num > 0) {
        $result->message = "Shift to mod record {$update_id} updated.";
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