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

    function create($new_shift_id, $new_mod_id) {
        //query
        $sql = "INSERT INTO
                    {$this->table_name} (`shift_id`, `mod_id`)
                VALUES
                    (:shiftId, :modId)";

        // prepare query statement
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':shiftId', $new_shift_id, PDO::PARAM_INT);
        $stmt->bindParam(':modId', $new_mod_id, PDO::PARAM_INT);
        
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

    function update($id, $updates) {
        
        //to facilitate dynamic update query generation in safe bound parameter format
        $col_names = array('shift_id',     'mod_id');
        $dat_param = array(':si',          ':mi');
        $dat_types = array(PDO::PARAM_INT, PDO::PARAM_INT);
        $sub_check = array(false,          false);

        $update_str_arr = array();

        for ($i = 0; $i < count($col_names); $i++) {
            if (property_exists($updates, $col_names[$i])) {
                $sub_check[$i] = true;
                array_push($update_str_arr, "{$col_names[$i]}={$dat_param[$i]}");
            }
        }      

        $update_str = implode(', ', $update_str_arr);
        
        $sql = "UPDATE 
                    {$this->table_name}
                SET
                    {$update_str}
                WHERE
                    id=:id";

        $stmt = $this->conn->prepare($sql);
                    
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        //if the data was submitted, then bind the data to the parameter
        for ($i=0; $i < count($col_names); $i++) { 
            if ($sub_check[$i] === true) {
                $stmt->bindParam($dat_param[$i], $updates->{$col_names[$i]}, $dat_types[$i]);
            }
        }
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function delete($id) {
        $sql = "DELETE FROM
                    {$this->table_name}
                WHERE
                    id=:id";

        $stmt = $this->conn->prepare($sql);
                    
        $stmt->bindParam(':id', $id);
    
        // execute query
        $stmt->execute();

        return $stmt;
    }
}

?>