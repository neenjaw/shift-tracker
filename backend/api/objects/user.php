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

    function create() {
        //query
        $sql = "INSERT INTO
                    {$this->table_name} (`username`, `password`, `admin`, `active`, `created_by`)
                VALUES
                    (:un, :pw, :am, :ac, :cb)";

        // prepare query statement
        $stmt = $this->conn->prepare($sql);

        //make sure required properties defined
        if (!isset($this->username))   throw new Exception('username must be provided');
        if (!isset($this->password))   throw new Exception('password must be provided');
        if (!isset($this->admin))      throw new Exception('admin must be provided');
        if (!isset($this->active))     throw new Exception('active must be provided');
        if (!isset($this->created_by)) throw new Exception('created_by must be provided');

        //check flags
        if (!($this->admin === 0 || $this->admin === 1)) throw new Exception('active must be either 0 or 1');
        if (!($this->active === 0 || $this->active === 1)) throw new Exception('active must be either 0 or 1');

        //sanitize strings
        //password is not sanitized since it should already be hashed.
        $this->username   = htmlspecialchars(strip_tags($this->username));
        $this->created_by = htmlspecialchars(strip_tags($this->created_by));

        //bind
        $stmt->bindParam(':un', $this->username, PDO::PARAM_STR);
        $stmt->bindParam(':pw', $this->password, PDO::PARAM_STR);
        $stmt->bindParam(':am', $this->admin, PDO::PARAM_INT);
        $stmt->bindParam(':ac', $this->active, PDO::PARAM_INT);
        $stmt->bindParam(':cb', $this->created_by, PDO::PARAM_STR);
        
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
    function read_one_by_username() {
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

        //make sure required properties defined
        if (!isset($this->username)) throw new Exception('username must be provided');

        //sanitize
        $this->username = htmlspecialchars(strip_tags($this->username));

        //bind
        $stmt->bindParam(':username', $this->username, PDO::PARAM_STR);
        
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function update() {

        //to facilitate dynamic update query generation in safe bound parameter format
        $col_names = array('username',     'password',     'active',       'admin');
        $dat_param = array(':un',          ':pw',          ':ac',          ':am');
        $sani_type = array('str',          'none',         'flag',         'flag');
        $sub_check = array(false,          false,          false,          false);
        $dat_types = array(PDO::PARAM_STR, PDO::PARAM_STR, PDO::PARAM_INT, PDO::PARAM_INT);

        $any_sub = false;

        //make sure non-optional data is set
        if (!isset($this->id))         throw new Exception('id must be provided');
        if (!isset($this->updated_by)) throw new Exception('updated_by must be provided');        

        $update_string = "updated_by=:ub";
    
        //check if updateable data exists, sanitize it, build up the update string:
        //a) loop through the updateable parameters
        for ($i = 0; $i < count($col_names); $i++) {

            //b) if it is set, attempt to sanitize/check it for update
            if (isset($this->{$col_names[$i]})) {
                $any_sub = true;
                $sub_check[$i] = true;
                $update_string .= ", {$col_names[$i]}={$dat_param[$i]}";

                //c) sanitize/check by type
                if ($sani_type[$i] === 'str') {
                    $this->{$col_names[$i]} = htmlspecialchars(strip_tags($this->{$col_names[$i]}));

                } elseif ($sani_type[$i] === 'flag') {
                    if ( !($this->{$col_names[$i]} === 0 || $this->{$col_names[$i]} === 1) ) {
                        throw new Exception("{$col_names[$i]} must be either 0 or 1");
                    }
                }
            }
        }      

        if (!$any_sub) throw new Exception('no data was submitted for user update.');
        
        $sql = "UPDATE 
                    {$this->table_name}
                SET
                    {$update_string}
                WHERE
                    id=:id";

        $stmt = $this->conn->prepare($sql);
                    
        //bind the non-optional data to the query
        $stmt->bindParam(':id', $this->id,         PDO::PARAM_INT);
        $stmt->bindParam(':ub', $this->updated_by, PDO::PARAM_STR);

        //if the data was found and sanitized, then bind the data to the parameter
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