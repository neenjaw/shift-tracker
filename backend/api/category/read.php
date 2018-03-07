<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/category.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$category = new Category($db);
 
// query products
$stmt = $category->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>=0){
 
    // products array
    $category_arr = (object) array();
    $category_arr->records = array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $one_category = array(
            "id" => $id,
            "name" => $name,
            "date_created" => $date_created,
            "date_updated" => $date_updated
        );
 
        array_push($category_arr->records, $one_category);
    }
 
    $category_arr->response = "OK";

    echo json_encode($category_arr);

} else {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = "There was a problem retrieving the category records";
    
    echo json_encode($result);

}
?>