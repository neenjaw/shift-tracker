<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/category.php';

try {
    if (!isset($_POST['id'])) {
        throw new Exception('Category id not provided.');
    }

    if (!isset($_POST['name'])) {
        throw new Exception('Category name not provided.');
    }

    $update_id = trim($_POST['id']);
    $update_name = trim($_POST['name']);
    
    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $category = new Category($db);
    
    // query products
    $stmt = $category->update($update_id, $update_name);

    $num = $stmt->rowCount();

    $result = (object) array();
    $result->response = "OK";

    if ($num > 0) {
        $result->message = "Category {$update_id} updated.";
    } else {
        $result->message = "No category records updated.";
    }

    echo json_encode($result);

} catch (Exception $e) {

    $result = (object) array();
    $result->response = "ERROR";
    $result->message = $e->getMessage();
    
    echo json_encode($result);

}

?>