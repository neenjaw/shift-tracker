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
    
    // query products
    $stmt = $user->read();
    $num = $stmt->rowCount();
 
    // products array
    $user_arr = (object) array();
    $user_arr->records = array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $one_user = array(
            "id" => $id,
            "username" => $username,
            "active" => $active,
            "admin" => $admin,
            "date_created" => $date_created,
            "date_updated" => $date_updated,
            "created_by" => $created_by,
            "updated_by" => $updated_by,
        );
 
        array_push($user_arr->records, $one_user);
    }
 
    $user_arr->response = "OK";

    echo json_encode($user_arr);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}
?>