<?php

class KudosPlease {
  protected $request;
  protected $output;
  protected $url;
  protected $link;
    
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
    $this->link = mysql_connect('localhost', '24963m27407_5', 'xfdLLYYm');
    if (!$this->link) {
      die(mysql_error());
    }

    mysql_select_db('24963m27407_5', $this->link);
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
    $result = mysql_query($query, $this->link);
    $row = mysql_fetch_object($result);

    // Create new row for the unkown url
    if (empty($row->kudos)) {
      $query = 'INSERT IGNORE INTO kudosplease (url, kudos) VALUES (\'' . $this->url . '\', 0)';
      mysql_query($query, $this->link);
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
    $query = 'UPDATE kudosplease SET kudos = kudos + 1 WHERE url = \'' . $this->url . '\'';
    mysql_query($query, $this->link);
    
    $this->get();
  }
}

?>