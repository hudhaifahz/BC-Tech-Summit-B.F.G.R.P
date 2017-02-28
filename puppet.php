<?php

$remote = 'http://192.168.1.11:8080';
$url    = $remote.$_GET['param'];

$ctx = stream_context_create(array(
    'http' => array(
        'timeout' => 1
        )
    )
);

try {
  $response = file_get_contents($url, 0, $ctx);
  $headers  = $http_response_header;
  $message  = "200 Ok";

  if ($response === false) {
    $codeHeaders = $headers[0];
    $message     = substr($codeHeaders, strlen('HTTP/1.1 '));
  }

  $code = substr($message, 0, 3);
  header($_SERVER["SERVER_PROTOCOL"] . " " . $message);
  http_response_code((int)$code);
  echo $response;
}
catch (Exception $e) {
  header($_SERVER["SERVER_PROTOCOL"] . " 500 Server Error");
  http_response_code((int)'500');
}
