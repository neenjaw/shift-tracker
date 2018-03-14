<?php
require_once '../config/auth.php';

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/mod.php';

try {
    
    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $mod = new Mod($db);

    $data = json_decode(file_get_contents('php://input'));

    if (isset($data->id)) {
        $mod->id = trim($data->id);
    } else {
        throw new Exception("mod id not provided for update");
    }

    if (isset($data->name)) {
        $mod->name = trim($data->name);
    } else {
        throw new Exception("mod name not provided for update");
    }
    
    // query products
    $stmt = $mod->update();

    $num = $stmt->rowCount();

    $result = (object) array();
    $result->response = "OK";

    if ($num > 0) {
        $result->message = "Mod {$mod->id} updated.";
    } else {
        $result->message = "No mod records updated.";
    }

    echo json_encode($result);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}

?>