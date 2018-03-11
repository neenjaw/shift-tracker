<?php
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
        throw new Exception("mod id not provided for delete");
    }
    
    // query products
    $stmt = $mod->delete();
    $num = $stmt->rowCount();
 
    // products array
    $result = (object) array();
    $result->response = "OK";
    if ($num > 0) {
        $result->message = "Mod with id {$mod->id} deleted.";
    } else {
        $result->message = "Nothing deleted.";
    }

    echo json_encode($result);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}
?>