<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';

try {

    if (!isset($_POST['username'])) {
        throw new Exception("Username not provided");
    }

    if (!isset($_POST['password'])) {
        throw new Exception("Password not provided");
    }

    if (!isset($_POST['repeatpw'])) {
        throw new Exception("Repeat password not provided");
    }

    if (!isset($_POST['creator'])) {
        throw new Exception("Creator not provided");
    }
  
    $submitted_user = trim($_POST['username']);
    $submitted_password = trim($_POST['password']);
    $submitted_repeatpw = trim($_POST['repeatpw']);
    $submitted_creator = trim($_POST['creator']);

    $submitted_admin = 0;
    
    if (isset($_POST['admin'])) {
        if ($_POST['admin'] === 'true') $submitted_admin = 1;
    }

    $submitted_active = 1;
    
    if (isset($_POST['active'])) {
        if ($_POST['active'] === 'false') $submitted_active = 0;
    }

    if ($submitted_password !== $submitted_repeatpw) {
        throw new Exception('Submitted passwords do not match');
    }

    if (preg_match('/[a-zA-Z0-9]{8,16}/', $submitted_password) !== 1) {
        throw new Exception('Password does not conform.');
    }

    $hashed_password = password_hash($submitted_password, PASSWORD_DEFAULT);

    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $user = new User($db);
    
    // query products
    $stmt = $user->create($submitted_user, $hashed_password, $submitted_active, $submitted_admin, $submitted_creator);

    $num = $stmt->rowCount();

    $result = (object) array();
    $result->response = "OK";
    $result->message = "User {$submitted_user} created.";

    echo json_encode($result);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}

?>