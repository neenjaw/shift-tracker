<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/category.php';
 
try {
    if (!isset($_POST['id'])) {
        throw new Exception("id not provided");
    }
    
    $submitted_id = trim($_POST['id']);

    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $category = new Category($db);
    
    // query products
    $stmt = $category->delete($submitted_id);
    $num = $stmt->rowCount();
 
    // products array
    $category_arr = (object) array();
    $category_arr->response = "OK";
    if ($num > 0) {
        $category_arr->message = "Category with id {$submitted_id} deleted.";
    } else {
        $category_arr->message = "Nothing deleted. Nothing with id {$submitted_id} exists.";
    }

    echo json_encode($role_arr);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}
?>