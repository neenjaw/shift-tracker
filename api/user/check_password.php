<?php
require_once '../config/auth.php';

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';

try {

    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $user = new User($db);
    
    $data = json_decode(file_get_contents('php://input'));

    if (isset($data->username)) {
        $user->username = trim($data->username);
    } else {
        throw new Exception("user username not provided");
    }

    if (isset($data->password)) {
        $user->password = trim($data->password);
    } else {
        throw new Exception("user password not provided");
    }
    
    // query products
    $stmt = $user->read_one_by_username();

    $num = $stmt->rowCount();
 
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $result = (object) array();
    $result->response = "OK";

    $authorized = password_verify($user->password, $row['password']);

    if ($authorized) {

        $result->authorized = true;
        $result->message = "Success. User Authenticated.";
        
        $result->user = (object) array();
        $result->user->name = $row['username'];
        $result->user->active = $row['active'];
        $result->user->admin = $row['admin'];
        $result->user->created = $row['date_created'];
        $result->user->updated = $row['date_updated'];
        $result->user->createdBy = $row['created_by'];
        $result->user->updatedBy = $row['updated_by'];
        
    } else {

        $result->authorized = false;
        $result->message = "User/Password combination not found.";
    
    }

    echo json_encode($result);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}

?>