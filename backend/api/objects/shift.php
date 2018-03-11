<?php

class Shift {
    //db connection and table name
    private $conn;
    private $table_name = "shifts";

    //object properties
    public $id;
    
    public $shift_date;
    public $shift_d_or_n;    
    public $staff_id;
    public $role_id;
    public $assignment_id;

    public $mods;
    
    public $date_created;
    public $date_updated;
    public $created_by;
    public $updated_by;

    //constructor
    public function __construct($db) {
        $this->conn = $db;
    }

    function read() {
        // select all query
        $sql = "SELECT
                    s.id, s.shift_date, s.shift_d_or_n, 
                    s.staff_id, f.first_name as staff_first_name, f.last_name as staff_last_name,
                    s.role_id, r.name as role_name,
                    s.assignment_id, a.name as assignment_name,

                    s.date_created, s.date_updated, s.created_by, s.updated_by
                FROM
                    {$this->table_name} s
                LEFT JOIN
                    staff f
                ON 
                    s.staff_id = f.id
                LEFT JOIN
                    roles r
                ON
                    s.role_id = r.id
                LEFT JOIN
                    assignment a
                ON
                    s.assignment_id = a.id 
                ORDER BY
                    s.shift_date DESC";
    
        // prepare query statement
        $stmt = $this->conn->prepare($sql);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }
}

?>