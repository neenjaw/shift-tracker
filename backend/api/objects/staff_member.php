<?php

class StaffMember {
    //db connection and table name
    private $conn;
    private $table_name = "staff";

    //object properties
    public $id;
    
    public $first_name;
    public $last_name;
    public $category_id;

    public $active;

    public $date_created;
    public $date_updated;
    public $created_by;
    public $updated_by;

    //constructor
    public function __construct($db) {
        $this->conn = $db;
    }

    // read staff
    function read() {
        // select all query
        $sql = "SELECT
                    c.name as category_name, s.id, s.first_name, s.last_name, s.category_id, 
                    s.active, s.date_created, s.date_updated, s.created_by, s.updated_by
                FROM
                    {$this->table_name} s
                LEFT JOIN
                    categories c
                ON 
                    s.category_id = c.id
                ORDER BY
                    s.last_name ASC, s.first_name ASC";
    
        // prepare query statement
        $stmt = $this->conn->prepare($sql);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }
}

?>