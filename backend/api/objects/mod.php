<?php

class Mod {
    //db connection and table name
    private $conn;
    private $table_name = "mods";

    //object properties
    public $id;
    public $name;
    public $date_created;
    public $date_updated;

    //constructor
    public function __construct($db) {
        $this->conn = $db;
    }

    function create() {
        //query
        $sql = "INSERT INTO
                    {$this->table_name} (`name`)
                VALUES
                    (:name)";

        // prepare query statement
        $stmt = $this->conn->prepare($sql);

        //make sure required properties defined
        if (!isset($this->name)) throw new Exception('name must be provided');

        //sanitize
        $this->name = htmlspecialchars(strip_tags($this->name));

        //bind
        $stmt->bindParam(':name', $this->name, PDO::PARAM_STR);
        
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function read() {
        // select all query
        $sql = "SELECT
                    m.id, m.name, m.date_created, m.date_updated
                FROM
                    {$this->table_name} m
                ORDER BY
                    m.name ASC";
    
        // prepare query statement
        $stmt = $this->conn->prepare($sql);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function update() {
        
        $sql = "UPDATE 
                    {$this->table_name}
                SET
                    name=:name
                WHERE
                    id=:id";

        $stmt = $this->conn->prepare($sql);
       
        //make sure required properties defined
        if (!isset($this->id))   throw new Exception('id must be provided');
        if (!isset($this->name)) throw new Exception('name must be provided');

        //sanitize
        $this->id   = htmlspecialchars(strip_tags($this->id));
        $this->name = htmlspecialchars(strip_tags($this->name));

        //bind
        $stmt->bindParam(':id',   $this->id,   PDO::PARAM_INT);
        $stmt->bindParam(':name', $this->name, PDO::PARAM_STR);
    
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
        if (!isset($this->id)) throw new Exception('id must be provided');

        //sanitize
        $this->id = htmlspecialchars(strip_tags($this->id));

        //bind
        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);
    
        // execute query
        $stmt->execute();

        return $stmt;
    }
}

?>