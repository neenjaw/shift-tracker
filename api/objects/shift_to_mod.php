<?php

class ShiftToMod {
    //db connection and table name
    private $conn;
    private $table_name = "shift_to_mod";

    //object properties
    public $id;
    public $shift_id;
    public $mod_id;
    public $date_created;
    public $date_updated;

    //constructor
    public function __construct($db) {
        $this->conn = $db;
    }

    function create() {
        //query
        $sql = "INSERT INTO
                    {$this->table_name} (`shift_id`, `mod_id`)
                VALUES
                    (:shift_id, :mod_id)";

        // prepare query statement
        $stmt = $this->conn->prepare($sql);

        //make sure required properties defined
        if (!isset($this->shift_id)) throw new Exception('shift_id must be provided');
        if (!isset($this->mod_id))   throw new Exception('mod_id must be provided');
       
        if (filter_var($this->shift_id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('shift_id does not conform');
        }

        if (filter_var($this->mod_id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('mod_id does not conform');
        }

        $stmt->bindParam(':shift_id', $this->shift_id, PDO::PARAM_INT);
        $stmt->bindParam(':mod_id', $this->mod_id, PDO::PARAM_INT);
        
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function read() {
        // select all query
        $sql = "SELECT
                    s.id, s.shift_id, s.mod_id, s.date_created, s.date_updated
                FROM
                    {$this->table_name} s
                ORDER BY
                    s.id ASC";
    
        // prepare query statement
        $stmt = $this->conn->prepare($sql);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function update() {
        
        //to facilitate dynamic update query generation in safe bound parameter format
        $col_names = array('shift_id',     'mod_id');
        $dat_param = array(':si',          ':mi');
        $dat_types = array(PDO::PARAM_INT, PDO::PARAM_INT);
        $sub_check = array(false,          false);

        $any_sub = false;
        $update_str_arr = array();

        //make sure non-optional data is set
        if (!isset($this->id)) throw new Exception('id must be provided');

        for ($i = 0; $i < count($col_names); $i++) {
            if (isset($this->{$col_names[$i]})) {
                $any_sub = true;
                $sub_check[$i] = true;
                array_push($update_str_arr, "{$col_names[$i]}={$dat_param[$i]}");
            }
        }      

        $update_str = implode(', ', $update_str_arr);

        if (!$any_sub) throw new Exception('no data was submitted for shift to mod update.');
        
        $sql = "UPDATE 
                    {$this->table_name}
                SET
                    {$update_str}
                WHERE
                    id=:id";

        $stmt = $this->conn->prepare($sql);
                    
        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);

        //if the data was submitted, then bind the data to the parameter
        for ($i=0; $i < count($col_names); $i++) { 
            if ($sub_check[$i] === true) {
                $stmt->bindParam($dat_param[$i], $this->{$col_names[$i]}, $dat_types[$i]);
            }
        }
    
        // execute query
        $stmt->execute();
    
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
}

?>