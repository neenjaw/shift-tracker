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
                    users (`username`, `password`, `admin`, `active`, `created_by`)
                VALUES
                    (:un, :pw, :ac, :am, :cb)";

        // prepare query statement
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':un', $username);
        $stmt->bindParam(':pw', $password);
        $stmt->bindParam(':ac', $active);
        $stmt->bindParam(':am', $admin);
        $stmt->bindParam(':cb', $created_by);
        
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

        $stmt->bindParam(':username', $username);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    
}

?>