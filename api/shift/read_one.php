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

    if (isset($_GET['id'])) {
        $shift->id = trim($_GET['id']);

        if (! isThisIntegerlike($shift->id)) {
            throw new Exception('id does not conform');
        }
    } else {
        throw new Exception('id not provided for read one shift');
    }
    
    // query products
    $stmt = $shift->read_one();
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
            "id"               => intval($id),
            "shift_date"       => $shift_date,
            "shift_d_or_n"     => $shift_d_or_n,
            "staff_id"         => intval($staff_id),
            "staff_first_name" => $staff_first_name,
            "staff_last_name"  => $staff_last_name,
            "role_id"          => intval($role_id),
            "role_name"        => $role_name,
            "assignment_id"    => intval($assignment_id),
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