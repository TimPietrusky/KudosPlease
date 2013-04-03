<?php

class KudosPlease {
  protected $request;
  protected $output;
  protected $url;
    
  function __construct() {
    $this->request = $_SERVER['REQUEST_METHOD'];
    
    if (isset($_GET['url'])) {
      $this->url = urldecode($_GET['url']);
      
        $this->connect();
        
        switch ($this->request) {
          case 'GET' : $this->get();
          break;
            
          case 'POST' : $this->post();
          break;
        }
    }
    
    $this->output();
  }
  
  /**
   * Connect to the database.
   */
  protected function connect() {
    // Connect to db
    $link = mysql_connect('host', 'user', 'password');
    if (!$link) {
      die(mysql_error());
    }
    mysql_select_db('database', $link);
  }
  
  /**
   * Generate the output with header.
   */
  protected function output() {
    header('Content-type: text/plain');
    echo($this->output);
    exit(0);
  }
  
  /*
   * Returns the current Kudos amount.
   */
  public function get() {
    $query = 'SELECT * FROM kudosplease where url = \'' . $this->url . '\'';
    $result = mysql_query($query);
    $row = mysql_fetch_object($result);
    
    // Create new row for the unkown url
    if (empty($row->kudos)) {
      $query = 'INSERT IGNORE INTO kudosplease (url, kudos) VALUES (\'' . $this->url . '\', 0)';
      mysql_query($query);
      
      $this->output = 0;
    // Show the amount
    } else {
      $this->output = $row->kudos;
    }
  }
  
  /*
   * Increase the Kudos amount and return the new amount. 
   */
  public function post() {
    $query = 'UPDATE kudosplease SET kudos = kudos + 1';
    mysql_query($query);
    
    $this->get();
  }
}

?>