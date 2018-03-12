<?php

include_once 'shift_to_mod.php';

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

    function create() {
        //query
        $sql = "INSERT INTO
                    {$this->table_name} (`shift_date`, `shift_d_or_n`, `staff_id`, `role_id`, `assignment_id`)
                VALUES
                    (:sd, :so, :si, :ri, :ai)";

        $stmt = $this->conn->prepare($sql);

        // verify params are set
        if (!isset($this->shift_date))    throw new Exception('shift_id must be provided');
        if (!isset($this->shift_d_or_n))  throw new Exception('shift_d_or_n must be provided');
        if (!isset($this->staff_id))      throw new Exception('staff_id must be provided');
        if (!isset($this->role_id))       throw new Exception('role_id must be provided');
        if (!isset($this->assignment_id)) throw new Exception('assignment_id must be provided');

        // sanitize / validate
        if (preg_match('/^[12][0-9]{3}-[0-1][0-9]-[0-3][0-9]$/', $this->shift_date) !== 1) {
            throw new Exception('shift date does not conform');
        }

        $this->shift_d_or_n = strtoupper($this->shift_d_or_n);
        if (!($this->shift_d_or_n === 'D' || $this->shift_d_or_n === 'N')) {
            throw new Exception('d or n does not confrom');
        }

        if (filter_var($this->staff_id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('staff id does not conform');
        }

        if (filter_var($this->role_id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('role id does not conform');
        }

        if (filter_var($this->assignment_id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('assignment id does not conform');
        }

        // bind
        $stmt->bindParam(':sd', $this->shift_date, PDO::PARAM_STR);
        $stmt->bindParam(':so', $this->shift_d_or_n, PDO::PARAM_STR);
        $stmt->bindParam(':si', $this->staff_id, PDO::PARAM_INT);
        $stmt->bindParam(':ri', $this->role_id, PDO::PARAM_INT);
        $stmt->bindParam(':ai', $this->assignment_id, PDO::PARAM_INT);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
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