<?php
require_once '../config/auth.php';

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';
 
try {
    //only let admin users use this these
    if (!$_SESSION['user']->admin)
    {
        throw new Exception("You lack administrator privledges.");
    }

    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $user = new User($db);
       
    $data = json_decode(file_get_contents('php://input'));

    if (isset($data->id)) {
        $user->id = trim($data->id);
    } else {
        throw new Exception("user id not provided for delete");
    }
    
    // query products
    $stmt = $user->delete();
    $num = $stmt->rowCount();
 
    // products array
    $result = (object) array();
    $result->response = "OK";
    if ($num > 0) {
        $result->message = "User with id {$user->id} deleted.";
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