<?php
class Database {

    private $host = '';
    private $db_name = '';
    private $username = '';
    private $password = '';
    public $conn = null;

    public function getConnection() {
        $db_config = parse_ini_file('dbconfig.ini'); 

        $this->host = $db_config['host'];
        $this->db_name = $db_config['dbname'];
        $this->username = $db_config['username'];
        $this->password = $db_config['password'];

        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host={$this->host};dbname={$this->db_name}", $this->username, $this->password);
            $this->conn->exec("set names utf8");

            // set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $exception) {
            echo "Connection error: {$exception->getMessage()}";
        }

        return $this->conn;
    }
}
?>