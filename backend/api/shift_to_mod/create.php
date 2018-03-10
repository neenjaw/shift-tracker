<?php
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

    if (!isset($_POST['shift-id'])) {
        throw new Exception("shift id not provided");
    }

    if (!isset($_POST['mod-id'])) {
        throw new Exception("mod id not provided");
    }
  
    $submitted_shift_id = trim($_POST['shift-id']);
    $submitted_mod_id = trim($_POST['mod-id']);

    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $shift_to_mod = new ShiftToMod($db);
    
    // query products
    $stmt = $shift_to_mod->create($submitted_shift_id, $submitted_mod_id);

    $num = $stmt->rowCount();

    $result = (object) array();
    $result->response = "OK";

    if ($num > 0) {
        $result->message = "Shift to mod ({$submitted_shift_id} <-> {$submitted_mod_id}) created.";
    } else {
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