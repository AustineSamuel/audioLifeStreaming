<?php
$action="";
if(isset($_GET["normalId"])){
$name=base64_decode($_GET["normalId"]);
$artistId=substr($name,0,strpos($name,"dir"));
$songId=substr($name,strpos($name,"dir")+3,strlen($name));
$action="songSharing";
}
else if(isset($_GET["name"])){
//reidire to artist profile
$artistName=$_GET["name"];
$artistId=base64_decode(substr($artistName,strpos($artistName,"@")+1,strlen($artistName)));
$action="artistSharing";
}
else{
  $action="none";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <script src="../jquery3.js"></script>
  <script src="../jquery.form.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>auto redirecting you</title>
  <style> body{
    padding:0;
    margin:0;
    box-sizing:border-box;
  }
  *{
    transition:0.6 ease;
    transition-duration:800ms;
  }

  button,input,textarea{
    border:none;
    outline:none;
    background:none;
    outline:none;
  }
*{
   transition:0.6 ease;
  transition-duration:800ms;
  color:white;
}

 </style>
</head>
<body>
  <p class="action" hidden><?=$action?></p>
  <p></p>
  <p class="dataArtist" hidden>
  <?=$artistId?>
</p>
<p class="dataSong" hidden>
  <?=$songId?>
</p>
</body>
  <script src="../activeFunctions.js"></script>
<script>
  showLoader2();
 onload=()=>{
const action=filterNumber($(".action").html());
const artistId=filterNumber($(".dataArtist").html());

if(action=="songSharing"){
const songId=filterNumber($(".dataSong").html());
localStorage.setItem("notification111Music",JSON.stringify([artistId,songId]));
setTimeout(() => {
 href("../player.html","_self");
}, 500);
  }
else if(action=="artistSharing"){
  localStorage.setItem("1200ArtistId",artistId);
  setTimeout(() => {
href("../pages/artistProfile.html","_self");
}, 500);
}
 }
 //document.body.style.display="none";
   </script>
</html>