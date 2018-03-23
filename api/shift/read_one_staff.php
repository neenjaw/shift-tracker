<?php
require_once '../config/auth.php';

// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/auxiliary.php';
include_once '../config/database.php';
include_once '../objects/shift.php';
    
try {
    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $shift = new Shift($db);

    if (isset($_GET['staff_id'])) {
        $shift->staff_id = trim($_GET['staff_id']);

        if (! isThisIntegerlike($shift->staff_id)) {
            throw new Exception('staff_id does not conform');
        }
    } else {
        throw new Exception('staff_id not provided for read one staff');
    }
    
    //set the shift date from
    if (isset($_GET['limit'])) {
        $limit = trim($_GET['limit']);

        if (! isThisIntegerlike($limit)) {
            throw new Exception('limit does not conform');
        }
    } else {
        $limit = NULL;
    }
    
    //set the shift date to
    if (isset($_GET['offset'])) {
        $offset = trim($data->$_GET['offset']);

        if (! isThisIntegerlike($offset)) {
            throw new Exception('offset does not conform');
        }
    } else {
        $offset = NULL;
    }
    
    // query products
    $stmt = $shift->read_one_staff($limit, $offset);
    $num = $stmt->rowCount();
 
    // products array
    $result = (object) array();
    $result->count = $num;
    $result->records = array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $one_shift = array(
            "id"               => $id,
            "shift_date"       => $shift_date,
            "shift_d_or_n"     => $shift_d_or_n,
            "staff_id"         => $staff_id,
            "staff_first_name" => $staff_first_name,
            "staff_last_name"  => $staff_last_name,
            "role_id"          => $role_id,
            "role_name"        => $role_name,
            "category_id"      => $staff_category_id,
            "category_name"    => $staff_category_name,
            "assignment_id"    => $assignment_id,
            "assignment_name"  => $assignment_name,
            "shift_mods"       => json_decode($shift_mods),
            "date_created"     => $date_created,
            "date_updated"     => $date_updated,
            "created_by"       => $created_by,
            "updated_by"       => $updated_by
        );
 
        array_push($result->records, $one_shift);
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