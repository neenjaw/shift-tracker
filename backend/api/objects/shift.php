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
                    {$this->table_name} (`shift_date`, `shift_d_or_n`, `staff_id`, `role_id`, `assignment_id`, `created_by`)
                VALUES
                    (:sd, :so, :si, :ri, :ai, :cb)";

        $stmt = $this->conn->prepare($sql);

        // verify params are set
        if (!isset($this->shift_date))    throw new Exception('shift_id must be provided');
        if (!isset($this->shift_d_or_n))  throw new Exception('shift_d_or_n must be provided');
        if (!isset($this->staff_id))      throw new Exception('staff_id must be provided');
        if (!isset($this->role_id))       throw new Exception('role_id must be provided');
        if (!isset($this->assignment_id)) throw new Exception('assignment_id must be provided');
        if (!isset($this->created_by))    throw new Exception('created_by must be provided');

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

        $this->created_by = htmlspecialchars(strip_tags($this->created_by));        

        // bind
        $stmt->bindParam(':sd', $this->shift_date,    PDO::PARAM_STR);
        $stmt->bindParam(':so', $this->shift_d_or_n,  PDO::PARAM_STR);
        $stmt->bindParam(':si', $this->staff_id,      PDO::PARAM_INT);
        $stmt->bindParam(':ri', $this->role_id,       PDO::PARAM_INT);
        $stmt->bindParam(':ai', $this->assignment_id, PDO::PARAM_INT);
        $stmt->bindParam(':cb', $this->created_by,    PDO::PARAM_STR);
    
        // execute query
        $stmt->execute();
    
        $this->id = $this->conn->lastInsertId();

        if (isset($this->mods)) {
            $this->createMods();        
        }

        return $stmt;
    }

    function createMods() {
        $shift_to_mod = new ShiftToMod($this->conn);
    
        if ($this->id === NULL || $this->mods === NULL || !is_array($this->mods)) {
            throw new Exception('shift object does not have the proper data initialized to make the mods');
        }

        $shift_to_mod->shift_id = $this->id;

        for ($i=0; $i < count($this->mods); $i++) { 
            $shift_to_mod->mod_id = $this->mods[$i];
            $shift_to_mod->create();
        }
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

    function read_one() {
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
                WHERE
                    s.id=:id
                ORDER BY
                    s.shift_date DESC";
    
        // prepare query statement
        $stmt = $this->conn->prepare($sql);
    
        //make sure required properties defined
        if (!isset($this->id))  throw new Exception('id must be provided');
        
        //validate format
        if (filter_var($this->id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('id does not conform');
        }

        //bind
        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);
    
        // execute query
        $stmt->execute();

        return $stmt;
    }

    function read_date_range($date_from, $date_to = NULL) {

        if (preg_match('/^[12][0-9]{3}-[0-1][0-9]-[0-3][0-9]$/', $shift->date_from) !== 1) {
            throw new Exception('date from does not conform');
        }

        if ($date_to !== NULL) {
            if (preg_match('/^[12][0-9]{3}-[0-1][0-9]-[0-3][0-9]$/', $shift->date_to) !== 1) {
                throw new Exception('date to does not conform');
            }

            $date_condition = "BETWEEN {$date_from} AND {$date_to}";
        } else {
            $date_condition = ">= {$date_from}";
        }

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
                WHERE
                    s.shift_date {$date_condition}
                ORDER BY
                    s.shift_date ASC";
    
        // prepare query statement
        $stmt = $this->conn->prepare($sql);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function update() {

        //to facilitate dynamic update query generation in safe bound parameter format
        $col_names = array('shift_date',   'shift_d_or_n', 'staff_id',     'role_id',      'assignment_id');
        $dat_param = array(':sd',          ':so',          ':si',          ':ri',          ':ai');
        $sani_type = array('date',         'char',         'int',          'int',          'int');
        $dat_types = array(PDO::PARAM_STR, PDO::PARAM_STR, PDO::PARAM_INT, PDO::PARAM_INT, PDO::PARAM_INT);
        $sub_check = array(false,          false,          false,          false,          false);

        $any_sub = false;

        $update_str = 'updated_by=:ub';

        // verify required params are set
        if (!isset($this->id))         throw new Exception('id must be provided');
        if (!isset($this->updated_by)) throw new Exception('updated_by must be provided');

        $this->created_by = htmlspecialchars(strip_tags($this->created_by)); 

        for ($i = 0; $i < count($col_names); $i++) {
            if (isset($this->{$col_names[$i]})) {
                $any_sub = true;
                $sub_check[$i] = true;

                $update_str .= "{$col_names[$i]}={$dat_param[$i]}";

                if ($sani_type[$i] === 'date') {

                    if (preg_match('/^[12][0-9]{3}-[0-1][0-9]-[0-3][0-9]$/', $this->{$col_names[$i]}) !== 1) {
                        throw new Exception('date does not conform');
                    }

                } elseif ($sani_type[$i] === 'char') {

                    $this->{$col_names[$i]} = strtoupper($this->{$col_names[$i]});
                    if (!($this->{$col_names[$i]} === 'D' || $this->{$col_names[$i]} === 'N')) {
                        throw new Exception('char does not confrom');
                    }

                } elseif ($sani_type[$i] === 'int') {

                    if (filter_var($this->{$col_names[$i]}, FILTER_VALIDATE_INT) === false) {
                        throw new Exception('int does not conform');
                    }

                }
            }
        }      

        //query
        $sql = "UPDATE
                    {$this->table_name} 
                SET 
                    {$update_str}
                WHERE
                    id=:id";

        $stmt = $this->conn->prepare($sql);  

        // bind
        $stmt->bindParam(':id', $this->id,    PDO::PARAM_INT);
        $stmt->bindParam(':ub', $this->updated_by,  PDO::PARAM_STR);
    
        // execute query
        $stmt->execute();
    
        //if the data was submitted, then bind the data to the parameter
        for ($i=0; $i < count($col_names); $i++) { 
            if ($sub_check[$i] === true) {
                $stmt->bindParam($dat_param[$i], $this->{$col_names[$i]}, $dat_types[$i]);
            }
        }

        return $stmt;
    }

    function delete() {
        $sql = "DELETE FROM
                    {$this->table_name}
                WHERE
                    id=:id";

        $stmt = $this->conn->prepare($sql);

        //make sure required properties defined
        if (!isset($this->id))  throw new Exception('id must be provided');
        
        //validate format
        if (filter_var($this->id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('id does not conform');
        }

        //bind
        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);
    
        // execute query
        $stmt->execute();

        return $stmt;
    }

    // function search($keywords) {}
}

?>