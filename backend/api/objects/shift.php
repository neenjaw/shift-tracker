<?php

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

    public $mod;
    
    public $date_created;
    public $date_updated;
    public $created_by;
    public $updated_by;

    //constructor
    public function __construct($db) {
        $this->conn = $db;

        $this->mod = (object) array(
            'burn'   => null,
            'evd'    => null,
            'sick'   => null,
            'vent'   => null,
            'code'   => null,
            'crrt'   => null,
            'double' => null,
            'admit'  => null
        );
    }
}

?>