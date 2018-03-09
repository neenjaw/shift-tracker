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

    function create($username, $password, $active, $admin, $created_by) {
        //query
        $sql = "INSERT INTO
                    {$this->table_name} (`username`, `password`, `admin`, `active`, `created_by`)
                VALUES
                    (:un, :pw, :ac, :am, :cb)";

        // prepare query statement
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':un', $username, PDO::PARAM_STR);
        $stmt->bindParam(':pw', $password, PDO::PARAM_STR);
        $stmt->bindParam(':ac', $active, PDO::PARAM_INT);
        $stmt->bindParam(':am', $admin, PDO::PARAM_INT);
        $stmt->bindParam(':cb', $created_by, PDO::PARAM_STR);
        
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // read staff
    function read() {
        // select all query
        $sql = "SELECT
                    u.id, u.username, u.active, u.admin, 
                    u.date_created, u.date_updated, u.created_by, u.updated_by
                FROM
                    {$this->table_name} u
                ORDER BY
                    u.username";
    
        // prepare query statement
        $stmt = $this->conn->prepare($sql);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // read one staff
    function read_one_by_username($username) {
        // select all query
        $sql = "SELECT
                    u.id, u.username, u.password, u.active, u.admin, 
                    u.date_created, u.date_updated, u.created_by, u.updated_by
                FROM
                    {$this->table_name} u
                WHERE
                    u.username=:username";

        // prepare query statement
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function update($id, $updates, $updated_by) {

        //to facilitate dynamic update query generation in safe bound parameter format
        $col_names = array('username',     'password',     'active',       'admin');
        $dat_param = array(':un',          ':pw',          ':ac',          ':am');
        $dat_types = array(PDO::PARAM_STR, PDO::PARAM_STR, PDO::PARAM_INT, PDO::PARAM_INT);
        $sub_check = array(false,          false,          false,          false);

        $update_string = "updated_by=:ub";

        for ($i = 0; $i < count($col_names); $i++) {
            if (property_exists($updates, $col_names[$i])) {
                $sub_check[$i] = true;
                $update_string .= ", {$col_names[$i]}={$dat_param[$i]}";
            }
        }      
        
        $sql = "UPDATE 
                    {$this->table_name}
                SET
                    {$update_string}
                WHERE
                    id=:uid";

        $stmt = $this->conn->prepare($sql);
                    
        $stmt->bindParam(':uid', $id, PDO::PARAM_INT);
        $stmt->bindParam(':ub', $updated_by, PDO::PARAM_STR);

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