<?php
class Database {

    private $host = '';
    private $db_name = '';
    private $username = '';
    private $password = '';
    public $conn = null;

    public function getConnection() {
        $db_config = parse_ini_file('~/../dbconfig.ini'); 

        $host = $db_config['host'];
        $db_name = $db_config['dbname'];
        $username = $db_config['username'];
        $password = $db_config['password'];

        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host{$this->host};dbname={$this->db_name}", $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch (PDOException $exception) {
            echo "Connection error: {$exception->getMessage()}";
        }

        return $this->conn;
    }
}
?>