<?php

class Role {
    //db connection and table name
    private $conn;
    private $table_name = "roles";

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
                    r.id, r.name, r.date_created, r.date_updated
                FROM
                    {$this->table_name} r
                ORDER BY
                    r.name ASC";
    
        // prepare query statement
        $stmt = $this->conn->prepare($sql);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }
}

?>