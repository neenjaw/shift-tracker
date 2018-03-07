<?php

class Assignment {
    //db connection and table name
    private $conn;
    private $table_name = "assignments";

    //object properties
    public $id;
    public $name;
    public $date_created;
    public $date_updated;

    //constructor
    public function __construct($db) {
        $this->conn = $db;
    }
}

?>