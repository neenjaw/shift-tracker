<?php

class StaffMember {
    //db connection and table name
    private $conn;
    private $table_name = "staff";

    //object properties
    public $id;
    
    public $first_name;
    public $last_name;
    public $category_id;

    public $active;

    public $date_created;
    public $date_updated;
    public $created_by;
    public $updated_by;

    //constructor
    public function __construct($db) {
        $this->conn = $db;
    }

    // create staff
    function create() {
        // insert query
        $sql = "INSERT INTO
                    {$this->table_name} (`first_name`, `last_name`, `category_id`, `active`, `created_by`)
                VALUES
                    (:fn, :ln, :ci, :ac, :cb)";

        
        // prepare query statement
        $stmt = $this->conn->prepare($sql);

        //make sure required properties defined
        if (!isset($this->first_name))  throw new Exception('first_name must be provided');
        if (!isset($this->last_name))   throw new Exception('last_name must be provided');
        if (!isset($this->category_id)) throw new Exception('category_id must be provided');
        if (!isset($this->created_by))  throw new Exception('created_by must be provided');

        if (filter_var($this->category_id, FILTER_VALIDATE_INT) === false) {
            throw new Exception('category_id does not conform');
        }

        if (isset($this->active)) {
            if(!($this->active === 0 || $this->active === 1)) throw new Exception('active must be either 0 or 1');
        } else {
            $this->active = 1;
        }

        //sanitize
        $this->first_name = htmlspecialchars(strip_tags($this->first_name));
        $this->last_name  = htmlspecialchars(strip_tags($this->last_name));
        $this->created_by = htmlspecialchars(strip_tags($this->created_by));

        //bind
        $stmt->bindParam(':fn', $this->first_name,  PDO::PARAM_STR);
        $stmt->bindParam(':ln', $this->last_name,   PDO::PARAM_STR);
        $stmt->bindParam(':ci', $this->category_id, PDO::PARAM_INT);
        $stmt->bindParam(':ac', $this->active,      PDO::PARAM_INT);
        $stmt->bindParam(':cb', $this->creadted_by, PDO::PARAM_STR);
        
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // read staff
    function read() {
        // select all query
        $sql = "SELECT
                    c.name as category_name, s.id, s.first_name, s.last_name, s.category_id, 
                    s.active, s.date_created, s.date_updated, s.created_by, s.updated_by
                FROM
                    {$this->table_name} s
                LEFT JOIN
                    categories c
                ON 
                    s.category_id = c.id
                ORDER BY
                    s.last_name ASC, s.first_name ASC";
    
        // prepare query statement
        $stmt = $this->conn->prepare($sql);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function update() {


        //to facilitate dynamic update query generation in safe bound parameter format
        $col_names = array('first_name',   'last_name',    'category_id',  'active');
        $dat_param = array(':fn',          ':ln',          ':ci',          ':ac');
        $sani_type = array('str',          'str',          'int',          'flag');
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
                } elseif ($sani_type[$i] === 'int') {
                    if (filter_var($this->{$col_names[$i]}, FILTER_VALIDATE_INT) === false) {
                        throw new Exception('category_id does not conform');
                    }
                }
            }
        }      

        if (!$any_sub) throw new Exception('no data was submitted for staff member update.');
        
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