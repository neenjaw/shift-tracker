<?php
require_once '../config/auth.php'; // must be logged in

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

    if (isset($data->updated_by)) {
        $user->updated_by = trim($data->updated_by);
    } else {
        throw new Exception("user updated_by not provided for update");
    }

    // get the new password
    if (isset($data->new_password)) {
        $data->new_password = trim($data->new_password);

        if (preg_match('/[a-zA-Z0-9]{8,16}/', $data->new_password) !== 1) {
            throw new Exception('Password does not conform.');
        } else {
            $data->hashed_password = password_hash($data->new_password, PASSWORD_DEFAULT);
        }

        if (!isset($data->repeat_password)) {
            throw new Exception('if password to be updated, must submit repeat_password');            
        } else {
            $data->repeat_password = trim($data->repeat_password);

            if ($data->repeat_password !== $data->new_password) {
                throw new Exception('password and repeat password do not match.');            
            }
        }
    } else {
        throw new Exception("new password not provided");
    }
    
    // query products
    $stmt = $user->read_one_by_username();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $result = (object) array();
    $result->response = "OK";

    $result->authorized = password_verify($user->password, $row['password']);
    $result->password_changed = false;

    if ($result->authorized) {
        $user->password = $data->hashed_password;

        $user->id = $row['id'];
        $stmt = $user->update();
        $num = $stmt->rowCount();

        if ($num > 0) {
            $result->password_changed = true;
            $result->message = "Password updated.";
        } else {
            $result->message = "Password not updated.";
        }
    } else {
        $result->message = "Not authorized to change Password"; 
    }

    echo json_encode($result);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}

?>