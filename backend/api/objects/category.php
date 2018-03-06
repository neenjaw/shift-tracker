<?php

class Category {
    //db connection and table name
    private $conn;
    private $table_name = "categories";

    //object properties
    public $id;
    public $category;

    //constructor
    public function __construct($db) {
        $this->conn = $db;
    }
}

?>