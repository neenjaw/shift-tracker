<?php

class Category {
    //db connection and table name
    private $conn;
    private $table_name = "categories";

    //object properties
    public $id;
    public $name;
    public $date_created;
    public $date_updated;

    //constructor
    public function __construct($db) {
        $this->conn = $db;
    }

    function create($name) {
        //query
        $sql = "INSERT INTO
                    {$this->table_name} (`name`)
                VALUES
                    (:name)";

        // prepare query statement
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function read() {
        // select all query
        $sql = "SELECT
                    c.id, c.name, c.date_created, c.date_updated
                FROM
                    {$this->table_name} c
                ORDER BY
                    c.name ASC";
    
        // prepare query statement
        $stmt = $this->conn->prepare($sql);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function update($id, $update_name) {
        
        $sql = "UPDATE 
                    {$this->table_name}
                SET
                    name=:name
                WHERE
                    id=:id";

        $stmt = $this->conn->prepare($sql);
                    
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':name', $update_name, PDO::PARAM_STR);
    
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