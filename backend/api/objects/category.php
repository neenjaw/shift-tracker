<?php

class Category {
    //db connection and table name
    private $conn;
    private $table_name = "categories";

    //object properties
    public $id;
    public $name;
    public $date_created;
    public $date_updated;

    //constructor
    public function __construct($db) {
        $this->conn = $db;
    }

    function read() {
        // select all query
        $sql = "SELECT
                    c.id, c.name, c.date_created, c.date_updated
                FROM
                    {$this->table_name} c
                ORDER BY
                    c.name ASC";
    
        // prepare query statement
        $stmt = $this->conn->prepare($sql);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }
}

?>