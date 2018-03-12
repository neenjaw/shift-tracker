<?php
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

    $data = json_decode(file_get_contents('php://input'));
    
    if (isset($data->id)) {
        $shift->id = trim($data->id);

        if (filter_var($shift->id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('id does not conform');
        }
    } else {
        throw new Exception('id not provided for delete');
    }
    
    // query products
    $stmt = $shift->delete();
    $num = $stmt->rowCount();
 
    // result
    $result = (object) array();
    $result->response = "OK";
    if ($num > 0) {
        $result->message = "Shift to mod with id {$shift->id} deleted.";
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