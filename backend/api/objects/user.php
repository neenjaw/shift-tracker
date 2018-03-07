<?php

class User {
    //db connection and table name
    private $conn;
    private $table_name = "users";

    //object properties
    public $id;

    public $username;
    public $password;

    public $active;
    public $admin;
    
    public $date_created;
    public $date_updated;
    public $created_by;
    public $updated_by;

    //constructor
    public function __construct($db) {
        $this->conn = $db;
    }
}

?>