<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/shift_to_mod.php';
    
try {
    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $shift_to_mod = new ShiftToMod($db);
    
    // query products
    $stmt = $shift_to_mod->read();
    $num = $stmt->rowCount();
 
    // products array
    $shift_to_mod_arr = (object) array();
    $shift_to_mod_arr->records = array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $one_shift_to_mod = array(
            "id" => $id,
            "shift_id" => $shift_id,
            "mod_id" => $mod_id,
            "date_created" => $date_created,
            "date_updated" => $date_updated
        );
 
        array_push($shift_to_mod_arr->records, $one_shift_to_mod);
    }
 
    $shift_to_mod_arr->response = "OK";

    echo json_encode($shift_to_mod_arr);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}
?>