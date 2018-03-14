<?php

class Flash {

    private $types;

    //constructor
    public function __construct($session_status) {
        if ($session_status !== PHP_SESSION_ACTIVE) {
            throw new Exception('Session must be active');
        }

        if (!isset($_SESSION['flash'])) {
            $_SESSION['flash'] = (object) array();
        }

        $this->types = array('primary' , 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark');
    }

    public function is_init() {
        return (isset($_SESSION['flash']));
    }

    public function print() {
        if (!$this->is_init()) {
            throw new Exception('Session must be active');
        }

        $output = '';

        for ($i=0; $i < count($this->types); $i++) { 
            $type = $this->types[$i];

            if (isset($_SESSION['flash']->{$type})) {
                $messages = $_SESSION['flash']->{$type};

                while ($message = array_pop($messages)) {
                    $n = count($_SESSION['flash']->{$type});
                    $m = count($messages);
                    echo "<!-- session {$type} length {$n} message length {$m} -->";

                    $output .= "<div class=\"alert alert-{$type} closable not-closed\" role=\"alert\">{$message}</div>\n";
                }

                unset($_SESSION['flash']->{$type});
            }
        }

        return $output;
    }

    public function add_message($message, $type = 'primary') {
        if (!$this->is_init()) throw new Exception('Session must be active');

        if (!in_array($type, $this->types)) $type = 'primary';

        if (!isset($_SESSION['flash']->{$type})) $_SESSION['flash']->{$type} = array();
        
        array_push($_SESSION['flash']->{$type}, $message);
    }
}