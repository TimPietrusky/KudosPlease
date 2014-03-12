<?php

class KudosPlease {
  protected $config;
  protected $request;
  protected $output;
  protected $url;
  protected $link;
  protected $mysqli;
    
  function __construct() {

    // Load the configuration
    $this->loadConfig();

    // Get the current request
    $this->request = $_SERVER['REQUEST_METHOD'];

    
    // Parameter "url" is set
    if (isset($_GET['url'])) {
      $this->url = urldecode($_GET['url']);

      // Connect to the database
      $this->connect();

      // Call methods in dependence on the request
      switch ($this->request) {
        case 'GET' : $this->get();
        break;
            
        case 'POST' : $this->post();
        break;
      }
    }
    
    // Generate the output
    $this->output();
  }

  /*
   * Loads the configuration.
   */
  protected function loadConfig() {
    $path = 'etc/config.php';

    if (file_exists($path)) {
      require_once($path);
      $this->config = $config;
    } else {
      die("Please copy the 'etc/config_sample.php' into 'etc/config.php' and change the configuration.");
    }
  }
  
  /*
   * Connect to the database.
   */
  protected function connect() {
    // Connect
    $this->mysqli = new mysqli($this->config->db->host, $this->config->db->user, $this->config->db->password, $this->config->db->database);

    // Handle error
    if (mysqli_connect_error()) {
      die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
    }

    // Escape input
    $this->url = $this->mysqli->real_escape_string($this->url);
  }
  
  /*
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
    $result = $this->mysqli->query('SELECT * FROM kudosplease where url = \'' . $this->url . '\'');
    $row = mysqli_fetch_object($result);

    // Create new row for the unkown url
    if (empty($row->kudos)) {
      $this->mysqli->query('INSERT IGNORE INTO kudosplease (url, kudos) VALUES (\'' . $this->url . '\', 0)');
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
    $this->mysqli->query('UPDATE kudosplease SET kudos = kudos + 1 WHERE url = \'' . $this->url . '\'');
    $this->get();
  }
}

?>