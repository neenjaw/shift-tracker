<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/role.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$role = new Role($db);
 
// query products
$stmt = $role->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>=0){
 
    // products array
    $role_arr = (object) array();
    $role_arr->records = array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $one_role = array(
            "id" => $id,
            "name" => $name,
            "date_created" => $date_created,
            "date_updated" => $date_updated
        );
 
        array_push($role_arr->records, $one_role);
    }
 
    $role_arr->response = "OK";

    echo json_encode($role_arr);

} else {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = "There was a problem retrieving the role records";
    
    echo json_encode($result);

}
?>