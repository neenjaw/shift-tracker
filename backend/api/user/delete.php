<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';
 
try {
    if (!isset($_POST['uid'])) {
        throw new Exception("Uid not provided");
    }
    
    $submitted_uid = trim($_POST['uid']);

    if (preg_match('/^[0-9]+$/', $submitted_uid) !== 1) {
        throw new Exception('Uid does not conform.');
    }

    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $user = new User($db);
    
    // query products
    $stmt = $user->delete($submitted_uid);
    $num = $stmt->rowCount();
 
    // products array
    $user_arr = (object) array();
    $user_arr->response = "OK";
    $user_arr->message = "User with id {$submitted_uid} deleted.";

    echo json_encode($user_arr);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}
?>