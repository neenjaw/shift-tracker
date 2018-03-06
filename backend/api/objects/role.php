<?php

class Role {
    //db connection and table name
    private $conn;
    private $table_name = "roles";

    //object properties
    public $id;
    public $role;

    //constructor
    public function __construct($db) {
        $this->conn = $db;
    }
}

?>