<?php
require_once '../config/auth.php';

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  
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

    //set the username
    if (isset($data->username)) {
        $user->username = trim($data->username);
    } else {
        throw new Exception("username not provided for create");
    }

    //set the password
    if (isset($data->password)) {
        $data->password = trim($data->password);

        if (preg_match('/[a-zA-Z0-9]{8,16}/', $data->password) !== 1) {
            throw new Exception('Password does not conform.');
        }

        $user->password = password_hash($data->password, PASSWORD_DEFAULT);
    } else {
        throw new Exception("password not provided for create");
    }

    //check the repeated pw
    if (isset($data->repeatpw)) {
        $data->repeatpw = trim($data->repeatpw);

        if ($data->repeatpw !== $data->password) {
            throw new Exception('Submitted passwords do not match');
        }        
    } else {
        throw new Exception("repeatpw not provided for create");
    }

    //check for the creator
    if (isset($data->created_by)) {
        $user->created_by = trim($data->created_by);
    } else {
        throw new Exception("created_by not provided for create");
    }

    //check for admin flag
    if (isset($data->admin)) {
        $user->admin = 0;
        
        if ($data->admin === 'true') {
            $user->admin = 1;
        }
    } else {
        $user->admin = 0;
    }

    //check for active flag
    if (isset($data->active)) {
        $user->active = 1;

        if ($data->active === 'false') {
            $user->active = 0;
        }
    } else {
        $user->active = 1;
    }


    // query products
    $stmt = $user->create();

    $num = $stmt->rowCount();

    $result = (object) array();
    $result->response = "OK";
    
    if ($num > 0) {
        $result->created = true;
        $result->message = "User {$user->username} created.";
    } else {
        $result->created = false;
        $result->message = "User not created.";
    }

    echo json_encode($result);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}

?>