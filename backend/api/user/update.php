<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';

try {
    if (!isset($_POST['uid'])) {
        throw new Exception('User id not provided.');
    }

    $submit_username = false;
    if (isset($_POST['username'])) {
        $submit_username = true;
    }

    $submit_password = false;
    if (isset($_POST['password'])) {
        $submit_password = true;

        if (preg_match('/[a-zA-Z0-9]{8,16}/', $_POST['password']) !== 1) {
            throw new Exception('Password does not conform.');
        }
    }

    $submit_repeatpw = false;
    if (isset($_POST['repeatpw'])) {
        $submit_repeatpw = true;
    }

    if ($submit_password && !$submit_repeatpw) {
        throw new Exception('If supplying a password, must provide repeat pw.');
    }

    if ($submit_password && $submit_repeatpw) {
        if ($_POST['password'] !== $_POST['repeatpw']) {
            throw new Exception('Submitted passwords do not match');
        }
    }

    if (!isset($_POST['update-by'])) {
        throw new Exception("User not provided to record who updated by");
    }
  
    $update_uid = trim($_POST['uid']);
    $update_data = (object) array();
    if ($submit_username) $update_data->username = trim($_POST['username']);
    if ($submit_password) $update_data->password = trim(password_hash($_POST['password'], PASSWORD_DEFAULT));
    $update_by = trim($_POST['update-by']);
    
    if (isset($_POST['admin'])) {
        if ($_POST['admin'] === 'true') { 
            $update_data->admin = 1;
        } elseif ($_POST['admin'] === 'false') {
            $update_data->admin = 0;
        } else {
            throw new Exception("Admin flag value does not conform");            
        }
    }

    if (isset($_POST['active'])) {
        if ($_POST['active'] === 'true') { 
            $update_data->active = 1;
        } elseif ($_POST['active'] === 'false') {
            $update_data->active = 0;
        } else {
            throw new Exception("Active flag value does not conform");            
        }
    }

    if (count(get_object_vars($update_data)) === 0) {
        throw new Exception('Nothing to update.');
    }

    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $user = new User($db);
    
    // query products
    $stmt = $user->update($update_uid, $update_data, $update_by);

    $num = $stmt->rowCount();

    $result = (object) array();
    $result->response = "OK";

    if ($num > 0) {
        $result->message = "User {$update_uid} updated.";
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