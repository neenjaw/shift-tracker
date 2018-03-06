<?php

class Category {
    //db connection and table name
    private $conn;
    private $table_name = "categories";

    //object properties
    public $id;
    public $category;
    public $date_created;
    public $date_updated;

    //constructor
    public function __construct($db) {
        $this->conn = $db;
    }
}

?>