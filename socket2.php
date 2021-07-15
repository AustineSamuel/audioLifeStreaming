<?php
$port=100;//earch chat must have it own port
$host="localhost";
set_time_limit(0);
$socket=socket_create(AF_INET, SOCK_STREAM, 0);
socket_set_option($socket, SOL_SOCKET,SO_REUSEADDR, 1);
$result=socket_bind($socket, $host , $port);
socket_listen($socket, 3);
echo "listening......\n\n";
function readline(){
  return rtrim(fgets(STDIN));
}
//   php -f C:\\xampp\htdocs\play\socket2.php
do{
  $accept=socket_accept($socket);
  $header=socket_read($accept, 1024);
function handshake($received_header,$client_socket_resource, $host_name, $port){
  $headers = array();
  $lines = preg_split("/\r\n/", $received_header);
  foreach($lines as $line)
  {
$line = chop($line);
if(preg_match('/\A(\S+): (.*)\z/', $line, $matches))
{
$headers[$matches[1]] = $matches[2];
}
  }

  $secKey = $headers['Sec-WebSocket-Key'];
  $secAccept = base64_encode(pack('H*', sha1($secKey . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')));
  $buffer  = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" .
  "Upgrade: websocket\r\n" .
  "Connection: Upgrade\r\n" .
  "WebSocket-Origin: $host_name\r\n" .
  "WebSocket-Location: ws://$host_name:$port/demo/shout.php\r\n".
  "Sec-WebSocket-Accept:$secAccept\r\n\r\n";
  socket_write($client_socket_resource,$buffer,strlen($buffer));
}
 //socket_write($accept,"hi client",strlen("hi client"));
}
while(true);
socket_last_error();
socket_strerror();
socket_close($accept);
socket_close($socket);