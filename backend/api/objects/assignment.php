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
  
    function read() {
        // select all query
        $sql = "SELECT
                    a.id, a.name, a.date_created, a.date_updated
                FROM
                    {$this->table_name} a
                ORDER BY
                    a.name ASC";
    
        // prepare query statement
        $stmt = $this->conn->prepare($sql);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }
}

?>