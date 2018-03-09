<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/staff_member.php';
 
try {
    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $staff_member = new StaffMember($db);
    
    // query products
    $stmt = $staff_member->read();
    $num = $stmt->rowCount();
    
    // products array
    $staff_member_arr = (object) array();
    $staff_member_arr->records = array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $one_staff_member = array(
            "id" => $id,
            "first_name" => $first_name,
            "last_name" => $last_name,
            "category_id" => $category_id,
            "active" => $active,
            "date_created" => $date_created,
            "date_updated" => $date_updated,
            "created_by" => $created_by,
            "updated_by" => $updated_by,
        );
 
        array_push($staff_member_arr->records, $one_staff_member);
    }
 
    $staff_member_arr->response = "OK";

    echo json_encode($staff_member_arr);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}
?>