<?php
  $config = array(
    'db' => array(
      'host' => 'localhost',
      'user' => '',
      'password' => '',
      'database' => '',
    )
  );

  function array_to_object($array) {
    $obj = new stdClass;
    foreach($array as $k => $v) {
       if(is_array($v)) {
          $obj->{$k} = array_to_object($v);
       } else {
          $obj->{$k} = $v;
       }
    }
    return $obj;
  }

  $config = array_to_object($config);
?>