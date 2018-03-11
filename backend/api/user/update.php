<?php

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

    if (isset($data->id)) {
        $user->id = trim($data->id);
    } else {
        throw new Exception("user id not provided for update");
    }

    if (isset($data->updated_by)) {
        $user->updated_by = trim($data->updated_by);
    } else {
        throw new Exception("user updated_by not provided for update");
    }

    if (isset($data->username)) {
        $user->username = trim($data->username);
    }

    if (isset($data->password)) {
        $data->password = trim($data->password);

        if (preg_match('/[a-zA-Z0-9]{8,16}/', $data->password) !== 1) {
            throw new Exception('Password does not conform.');
        } else {
            $user->password = password_hash($data->password, PASSWORD_DEFAULT);
        }

        if (!isset($data->repeatpw)) {
            throw new Exception('if password to be updated, must submit repeatpw');            
        } else {
            $data->repeatpw = trim($data->repeatpw);

            if ($data->repeatpw !== $data->password) {
                throw new Exception('password and repeatpw do not match.');            
            }
        }
    }

    //check for admin flag
    if (isset($data->admin)) {
        if ($data->admin === 'true') {
            $user->admin = 1;
        } elseif ($data->admin === 'false') {
            $user->admin = 0;
        } else {
            throw new Exception("admin flag value does not conform");            
        }
    } 

    //check for active flag
    if (isset($data->active)) {
        if ($data->active === 'true') {
            $user->active = 1;
        } elseif ($data->active === 'false') {
            $user->active = 0;
        } else {
            throw new Exception("active flag value does not conform");            
        }
    } 
    
    // query products
    $stmt = $user->update();

    $num = $stmt->rowCount();

    $result = (object) array();
    $result->response = "OK";

    if ($num > 0) {
        $result->message = "User {$user->id} updated.";
    } else {
        $result->message = "No user records updated.";
    }

    echo json_encode($result);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}

?>