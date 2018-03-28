<?php
require_once '../config/auth.php';

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/auxiliary.php';
include_once '../config/database.php';
include_once '../objects/staff_member.php';
 
try {
    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $staff_member = new StaffMember($db);

    if (isset($_GET['id'])) {
        $staff_member->id = trim($_GET['id']);

        if (! isThisIntegerlike($staff_member->id)) {
            throw new Exception('id does not conform');
        }
    } else {
        throw new Exception('id not provided for read one staff member');
    }
    
    // query products
    $stmt = $staff_member->read_one();
    
    // products array
    $result = (object) array();
    $result->records = array();
    $result->count = $stmt->rowCount();
 
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
            "category_name" => $category_name,
            "category_id" => $category_id,
            "active" => $active,
            "date_created" => $date_created,
            "date_updated" => $date_updated,
            "created_by" => $created_by,
            "updated_by" => $updated_by,
        );
 
        array_push($result->records, $one_staff_member);
    }
 
    $result->response = "OK";

    echo json_encode($result);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}
?>