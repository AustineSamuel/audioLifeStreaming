<?php
$con=new mysqli("localhost","root","","playerusers");
//$con=new mysqli("localhost","id16654496_austinesamuel914","Me**2001Smart","id16654496_playerusers");;

function connect(){
  global $con; 
if($con){
   return true;
}
else{
  return false;
}
}
function rndName($len){
  $Rname=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  $mainName="";
  for ($i=0; $i < $len; $i++) { 
    $mainName.=$Rname[rand(0,count($Rname)-1)];
  }
return $mainName;
}
function uploadImage($name=array(),$surportedExtn=["image/jpeg","image/jpg","image/png","image/jpg","image/gif"]){
  if($name["error"]==0){
  $tmp=$name["tmp_name"];
  $type=trim(mime_content_type($tmp));
  $fileName=$name["name"];
$extn=strtolower(substr($fileName,strrpos($fileName,"."),strlen($fileName)));
if(in_array($type,$surportedExtn)){
  $imageName=substr(trim(md5(rndName(30))),0,15);
 $save=!file_exists("../images/".$imageName."".$extn) ? move_uploaded_file($tmp,"../images/".$imageName."".$extn):false;
 if($save){
   return $imageName."".$extn;
 }
 else{
   return false;
 }
 }
 else{
  return "notSuported";
}
}
}
function uploadSong($name,$surportedExtn=["audio/mpeg","audio/m4a","audio/ogg","audio/wav"]){
 if($name["error"]==0){
  $tmp=$name["tmp_name"];
  $type=trim(mime_content_type($tmp));
  $fileName=$name["name"];
$extn=strtolower(substr($fileName,strrpos($fileName,"."),strlen($fileName)));
if(in_array($type,$surportedExtn)){
   $songName=substr(trim(md5(rndName(30))),0,15);
 $save=!file_exists("../songs/".$songName."".$extn) ? move_uploaded_file($tmp,"../songs/".$songName."".$extn):false;
 if($save){
   return $songName."".$extn;
 }
 else{
   return false;
 }
 }
 else{
  return "notSuported";
}  
 }
}

function createNotificationTable(){
if(connect()){
  global $con;
$name=substr("table".md5(rndName(30)),0,15)."N";
$save=$con->query("
CREATE TABLE $name(
id int(30) unsigned auto_increment primary key,
type varchar(30) not null,
text varchar(255) not null,
ownerImage varchar(30) not null,
ownerName varchar(30) not null,
ownerId int(20) not null,
isArtist varchar(4) not null,
seen varchar(5) not null
)
");
if($save){
  return $name;
}
else{
  echo "fail to create table notification".$con->error;
  return false;
}
}
}
//createNotificationTable();
function createMessageListTable(){
  if(connect()){
global $con;
$name=substr("table".md5(rndName(30)),0,15)."M";
$save=$con->query("
CREATE TABLE $name(
  id int(10) unsigned auto_increment primary key,
  creator varchar(30) not null,
  creatorImage varchar(40) not null,
  creatorOriginalId varchar(10) not null,
  oponantImage varchar(40) not null,
  oponantOriginalid varchar(30) not null,
  oponantName varchar(50) not null,
  isArtist varchar(30) not null,
  tableNames varchar(30) not null
  )
");
if($save){ return $name;}
else {return false;}
 
  }
}
function createSongCommentTable(){
  if(connect()){
    global $con;
    $name=substr("table".md5(rndName(30)),0,15)."cmt";
    $save=$con->query("
    CREATE TABLE $name(
      id int(10) unsigned auto_increment primary key,
      name varchar(30) not null,
      likes varchar(255) not null,
      image varchar(30) not null,
      ownerId int(50) not null,
      isArtist varchar(50) not null,
      message varchar(255) not null
)");
if($save){
  return $name;
}
else{
  echo $con->error;
  return false;
}
    }    
}

function songsTable(){
  if(connect()){
    global $con;
    $name=substr("table".md5(rndName(30)),0,15)."S";
    $save=$con->query("
    CREATE TABLE $name(
      id int(10) unsigned auto_increment primary key,
      link varchar(20) not null,
      image varchar(30) not null,
      title varchar(50) not null,
      download int(50) not null,
      lyrics varchar(800) not null,
      stars int(30) not null,
      likes int(30) not null,
      artist varchar(30) not null,
      viewer int(30) not null,
      comments varchar(20) not null,
      date varchar(50) not null
 )");
 if($save){
     return $name;
  }
 else{
   echo  $con->error;
  return false;
 }
    }    
}
function createFollowingTable(){
global $con;
if(connect()){
  $tableName=substr("table".md5(rndName(30)),0,15)."Fwn";
$create=$con->query("CREATE TABLE $tableName(
  id int(30) unsigned auto_increment primary key,
  name varchar(50) not null,
  ownerId varchar(50) not null,
  image varchar(50) not null
)");
if($create){
  return $tableName;
}
else{
  return false;
}
}
}

function createFevoritesTable(){
  if(connect()){
global $con;
$name=substr("table".md5(rndName(30)),0,15)."F";
$save=$con->query("
CREATE TABLE $name(
id int(20) unsigned auto_increment primary key,
tableName varchar(30) not null,
songId int(30) not null
);
");
if($save) return $name;
else return false;
  }
}
function saveNewSong($tableName){
  global $con;
        $link=$_POST["link"];
        $image=$_POST["image"];
        $title=filter_var($_POST["title"],FILTER_SANITIZE_STRING);
        $download=$_POST["downloads"];
        $lyrics=htmlspecialchars($_POST["lyrics"]);
        $stars=$_POST["stars"];
        $likes=$_POST["likes"];
        $artist=$_POST["artist"];
        $viewer=$_POST["viewer"];
        $comment=$_POST["comment"];
        $date=Date("d-m-y");
          $save=$con->query("
        INSERT INTO $tableName(link,image,title,download,lyrics,stars,likes,artist,viewer,comments,date)
        VALUES('$link','$image','$title','$download','$lyrics',$stars,$likes,'$artist',$viewer,'$comment','$date');
        ");
        if($save){
          return true;
        }
        else{
          echo $con->error;
          return false;
        }
}
function updateImage($id,$image){
  global $con;
$save=$con->query("UPDATE `artistusers` set profileImage='$image' where id=$id");
if($save){
return "saved";
}
else{
  return "fail";
}
}
function deleteFile($name){
  if(file_exists($name)){
    unlink($name);
    return "deleted";
  }
  else{
    return "not exist";
  }
}
function update($id,$data,$column='aboutMe',$tableName='artistusers'){
  global $con;
  $save=$con->query("UPDATE `$tableName` set $column='$data' where id=$id");
  if($save){
return "updated";
  }
  else{
    return "fail";
  }
}
function loadArtistSongs($tableName){
  global $con;
  $json=[];
if(connect()){
$fetch=$con->query("SELECT * FROM `$tableName`");
if($fetch->num_rows>0){
while($rows=$fetch->fetch_assoc()){
array_push($json,array(
  "id"=>$rows["id"],
  "link"=>$rows["link"],
  "image"=>$rows["image"],
  "title"=>$rows["title"],
  "download"=>$rows["download"],
  "lyrics"=>htmlspecialchars_decode($rows["lyrics"]),
  "stars"=>$rows["stars"],
  "likes"=>$rows["likes"],
  "viewer"=>$rows["viewer"],
  "comments"=>$rows["comments"],
"artist"=>$rows["artist"],
  "date"=>$rows["date"]
));
}
}
return json_encode($json);
}
}
function createNormalUserAccount(){
        global $con;
  if(connect()){
    if($_SERVER["REQUEST_METHOD"]=="POST"){
    $userNAme=trim($_POST["name"]);
    $email=trim($_POST["email"]);
   $email=trim($_POST["email"]);
    $email=filter_var($email,FILTER_VALIDATE_EMAIL);
      $email=filter_var($email,FILTER_SANITIZE_EMAIL);
      if(!userExist($email)){
     $password=substr(md5(trim($_POST["password"])),0,10);
      $userName=trim($_POST["name"]);
      $userName=filter_var($userName,FILTER_SANITIZE_STRING);
     $imageName="";
    if(isset($_FILES["image"])){
      $file=$_FILES["image"];
      $imageName=uploadImage($file);
     }
    $notification=createNotificationTable() or die("fail to create notification table<br>");
    $messageList=createMessageListTable() or die("fail to create message table <br>");
    $fevorites=createFevoritesTable() or die("fail to create fevorites table <br>");
    $following=createFollowingTable();
    $checker=$following!==false && $notification!==false && $messageList!==false && $fevorites!==false;
    if($checker){
      $save=$con->query("
      INSERT INTO normalusers(
name,email,profileImage,notification,messagesList,fevorites,password,following
      )
VALUES('$userName','$email','$imageName','$notification','$messageList','$fevorites','$password','$following');
      ");
      if($save){
        return true;
      }
      else {
         echo "fail to save<br>".$con->error;
      }
    }
    else{
      return false;
      }
    }
    else{
    return false;}
    }
  }
}
function createArtistFollowersTable(){
  if(connect()){
    global $con;
    $name=substr("table".md5(rndName(30)),0,15)."Fls";
    $save=$con->query("
    CREATE TABLE $name(
id int(10) unsigned auto_increment primary key,
names varchar(30) not null,
image varchar(50) not null,
originalId int(20) not null,
email varchar(100) not null,
notificationTable varchar(100) not null,
isArtist int(5) not null
    );
    ");
    if($save){
      return $name;
    }
    else{
      echo $con->error;
      return false;
    }
  }
}
function userExist($email){
  global $con;
  if(connect()){
    $search=$con->query("SELECT * FROM `normalusers` WHERE email='$email'");
    if($search->num_rows>0){
      return true;
    }
  else{
    sleep(0.3);
    $search=$con->query("SELECT * FROM `artistusers` WHERE email='$email'");
    if($search->num_rows>0){
      return true;
    }
    else{
      return false;
    }
  }
}
}
function createArtistUserAccount(){
  global $con;
  if(connect()){
    if($_SERVER["REQUEST_METHOD"]=="POST"){
       $email=trim($_POST["email"]);
      $email=filter_var($email,FILTER_VALIDATE_EMAIL);
      $email=filter_var($email,FILTER_SANITIZE_EMAIL);
      if(!userExist($email)){
      $password=substr(md5(trim($_POST["password"])),0,10);
      $userName=trim($_POST["name"]);
      $userName=filter_var($userName,FILTER_SANITIZE_STRING);
      $imageName="";
    if(isset($_FILES["image"])){
      $file=$_FILES["image"];
      $imageName=uploadImage($file);
      }
      $notification=createNotificationTable();
      $messageList=createMessageListTable();
      $fevorites=createFevoritesTable();
      $songTable=songsTable();
      $followersList=createArtistFollowersTable();
      $following=createFollowingTable();
        $checker=$following!=false && $followersList!=false && $songTable!=false && $notification!=false && $messageList!=false && $fevorites!==false;
    if($checker){
        $save=$con->query("
INSERT INTO artistusers(
artistName,followers,views,email,profileImage,songs,notification,messagesList,fevorites,password,following,aboutMe,BIO
)
VALUES('$userName','$followersList',0,'$email','$imageName','$songTable','$notification','$messageList','$fevorites','$password','$following','','');
");
      
      if($save){
        return true;
      }
      else{
        echo $con->error;
         return false;
      }
    }
    else{
      return null;
    }
  }
  else{
    echo "exist";
    return false;
    }
}
}
}

function varifyUser(){
   if(connect()){
    global $con;
    if($_SERVER["REQUEST_METHOD"]=="POST" || false==false ){
    $email=filter_var($_POST["email"],FILTER_VALIDATE_EMAIL);
    $email=filter_var($email,FILTER_SANITIZE_EMAIL);
     $password=substr(md5(trim($_POST["password"])),0,10);
    if($email!=""){
          $search=$con->query("
    SELECT * FROM `normalusers` WHERE email='$email' AND password='$password'
    ");
   // if($search){
    if($search->num_rows > 0 ){
$data=$search->fetch_assoc();
$newData=array(
  "id"=>$data["id"],
  "name"=>$data["name"],
  "email"=>$data["email"],
  "profileImage"=>$data["profileImage"],
  "notification"=>$data["notification"],
  "messageList"=>$data["messagesList"],
  "following"=>$data["following"],
  "fevorites"=>$data["fevorites"]
    );
    return json_encode($newData);
    }
    else{
      $search=$con->query("
      SELECT * FROM `artistusers` WHERE email='$email' AND password='$password'
      ");
    //  if($search){
      if($search->num_rows > 0){
        $data=$search->fetch_assoc();
$newData=array(
  "id"=>$data["id"],
  "artistName"=>$data["artistName"],
  "email"=>$data["email"],
  "followers"=>$data["followers"],
  "following"=>$data["following"],
  "views"=>$data["views"],
  "songs"=>$data["songs"],
  "profileImage"=>$data["profileImage"],
  "notification"=>$data["notification"],
  "messageList"=>$data["messagesList"],
  "fevorites"=>$data["fevorites"]
    );
    return trim(json_encode($newData));
            }
            else{
              echo "none";
              return false;
            }
          //  }
         // }
        }
      }
    }
  }
}
function removeFev(){
global $con;
if(connect()){
  $tableName=trim($_POST["tableName"]);
  $id=trim($_POST["id"]);
    $save=$con->query("DELETE FROM `$tableName` where id=$id");
    if($save){
      return true;
    }
    else{
      echo $con->error;
      return false;
    }
}
}
function saveFev($table,$tableName,$id){
  global $con;
  if(connect()){
    $save=$con->query("INSERT INTO $table(tableName,songId)
    VALUES('$tableName',$id)
    ");
    if($save){
      return true;
    }
    else{
      return false;
    }
  }
}

function loadFev($table){
global $con;
if(connect()){
  $json=[];
  $exe=$con->query("SELECT * FROM `$table`");
  if($exe->num_rows>0){
  while($row=$exe->fetch_assoc()){
    array_push($json,  array(
    "id"=>$row["id"],
    "tableName"=>$row["tableName"],
    "songId"=>$row["songId"]
    ));
  }
}
return json_encode($json);
}
}

function enc($name){
  return base64_encode($name);
}

function addLike(){
  global $con;
  if(connect()){
  $table=trim($_POST["tableName"]);
  $id=trim($_POST["id"]);
  $like=trim($_POST["likeNow"]);
  $save=$con->query("UPDATE `$table` set
  likes=$like WHERE id=$id");
  if($save){
    return true;
  }
  else{
    echo $con->error;
  return false;
  }
  }
}

function copyToDownload(){
  $fileName=$_POST["file"];
  $name=$_POST["name"];
 $file= "../songs/".$fileName;
 $extn=strtolower(substr($file,strrpos($file,"."),strlen($file)));
if(file_exists($file)){
  if(file_exists("../downloads/".$name."_domainNAme.com".$extn)){
    unlink("../downloads/".$name."_domainNAme.com".$extn);
  if(copy($file,"../downloads/".$name."_domainNAme.com".$extn)){
    echo $name."_domainNAme.com".$extn;
  }
}
else{
  if(copy($file,"../downloads/".$name."_domainNAme.com".$extn)){
    echo $name."_domainNAme.com".$extn;
  }
}
}
}

function updateDownload(){
  global $con;
  if(connect()){
    $tableName=$_POST["tableName"];
    $downloads=$_POST["downloads"];
    $save=$con->query("UPDATE `$tableName` SET download=$downloads");
    if($save){
      echo "updated";
    }
    else{
      echo $con->error;
      echo "fail";
    }
  }
}

function loadJustSong($table,$id){
  global $con;
  if(connect()){
    $save=$con->query("SELECT * FROM `$table` where id=$id");
    if($save->num_rows>0){
      $rows=$save->fetch_assoc();
      return json_encode(array(
        "id"=>$rows["id"],
        "link"=>$rows["link"],
        "image"=>$rows["image"],
        "title"=>$rows["title"],
        "download"=>$rows["download"],
        "lyrics"=>htmlspecialchars_decode($rows["lyrics"]),
        "likes"=>$rows["likes"],
        "stars"=>$rows["stars"],
        "viewer"=>$rows["viewer"],
        "comments"=>$rows["comments"],
      "artist"=>$rows["artist"],
        "date"=>$rows["date"]
      ));
    }
    else{
      return json_encode([]);
    }
  }
}

function loadFollowing($table){
  global $con;
  if(connect()){
    $json=[];
    $save=$con->query("SELECT * FROM `$table`");
if($save->num_rows > 0){
  while($row=$save->fetch_assoc()){
   array_push($json,array(
      "id"=>$row["id"],
      "ownerId"=>$row["ownerId"],
      "profileImage"=>$row["image"],
      "name"=>$row["name"]
    ));
  }
 }
 return json_encode($json);
  }
  
}
function loadArtistOwner($id){
global $con;
$data=[];
if(connect()){
$select=$con->query("SELECT * FROM `artistusers` WHERE id=$id");
if($select->num_rows >= 1){
$row=$select->fetch_assoc();
$data=array(
"id"=>$row["id"],
"artistName"=>$row["artistName"],
"followers"=>$row["followers"],
"views"=>$row["views"],
"profileImage"=>$row["profileImage"],
"notifications"=>$row["notification"],
"messagesList"=>$row["messagesList"],
"following"=>$row["following"],
"email"=>$row["email"],
"fevorites"=>$row["fevorites"],
"songs"=>$row["songs"],
"bio"=>htmlspecialchars_decode($row["BIO"]),
"aboutMe"=>htmlspecialchars_decode($row["aboutMe"])
);
}
return json_encode($data);
}
}
function sendNotification($table){
global $con;
$type="";
$text=htmlspecialchars($_POST["message"]);
$ownerImage=$_POST["image"];
$ownerName=$_POST["ownerName"];
$ownerId=$_POST["ownerId"];
$seen="";
$isArtist=trim($_POST["isArtist"]);
if(connect()){
$save=$con->query("INSERT INTO $table(
type,text,ownerImage,ownerName,ownerId,isArtist,seen)
VALUES(
'$type','$text','$ownerImage','$ownerName',$ownerId,'$isArtist','$seen'
)");
if($save){
  return true;
}
else{
  echo $con->error;
  return false;
}
}
}
function loadAllArtist(){
  global $con;
  $json=[];
  $select=$con->query("SELECT * FROM `artistusers`");
  if($select->num_rows >= 1){
  while($row=$select->fetch_assoc()){
  $data=array(
  "id"=>$row["id"],
  "artistName"=>$row["artistName"],
  "followers"=>$row["followers"],
  "views"=>$row["views"],
  "profileImage"=>$row["profileImage"],
 "notification"=>$row["notification"],
 "messagesList"=>$row["messagesList"],
  "email"=>$row["email"],
  //"fevorites"=>$row["fevorites"],
  "songs"=>$row["songs"]
  );
  array_push($json,$data);
  }
  return json_encode($json);
  }
  }
//comment manupulations
function getSongComments($commentTable){
  global $con;
$json=[];
  $search=$con->query("SELECT * from `$commentTable`");
  if($search->num_rows>0){
while($rows=$search->fetch_assoc()){
array_push($json,array(
"id"=>$rows["id"],
"name"=>$rows["name"],
"likes"=>$rows["likes"],
"image"=>$rows["message"]
));
  }
}
  return json_encode($json);
  }
function loadArtistFollowers($tableName){
global $con;
$json=[];
if(connect()){
$fetch=$con->query("SELECT * FROM `$tableName`");
if($fetch->num_rows>0){
  while($rows=$fetch->fetch_assoc()){
array_push($json,array(
"id"=>$rows["id"],
"image"=>$rows["image"],
"name"=>$rows["names"],
"originalId"=>$rows["originalId"],
"email"=>$rows["email"],
"notificationTable"=>$rows["notificationTable"],
"isArtist"=>$rows["isArtist"]
));
  }
}
echo $con->error;
return json_encode($json);
}
}

function unfollow(){
//{"action":"unfollow","id":id,"profileImage":image,"tableName":user.table}
global $con;
if(connect()){
  $tableName=$_POST["tableName"];
  $id=$_POST["id"];
  $profileImage=$_POST["profileImage"];
  $save=$con->query("DELETE FROM `$tableName` where ownerId=$id and image='$profileImage'");
  if($save){
    return "successfully";
  }
  else {
    echo $con->error;
    return "fail";
  }
}
}

function loadMessagesList($tableName){
  global $con;
  $json=[];
  if(connect()){
    $f=$con->query("SELECT *  from `$tableName`");
    if($f->num_rows>0){
     while($row=$f->fetch_assoc()){;
  array_push($json,   array(
          "id"=>$row["id"],
        "creator"=>$row["creator"],
        "tableNames"=>$row["tableNames"],
        "creatorImage"=>$row["creatorImage"],
        "creatorOriginalId"=>$row["creatorOriginalId"],
        "oponantOriginalId"=>$row["oponantOriginalid"],
        "oponantImage"=>$row["oponantImage"],
        "oponantName"=>$row["oponantName"],
        "isArtist"=>$row["isArtist"]
      ));
     }
    }
  }
  return json_encode($json);
}

function loadNotifications($tableName){
  global $con;
  $json=[];
  if(connect()){
    $f=$con->query("SELECT *  from `$tableName`");
    if($f->num_rows>0){
     while($row=$f->fetch_assoc()){;
  array_push($json,   array(
  "id"=>$row["id"],  
  "type"=>$row["type"],
  "text"=>htmlspecialchars_decode($row["text"]),
  "ownerImage"=>$row["ownerImage"],
 "ownerId"=>$row["ownerId"], 
 "ownerName"=>$row["ownerName"],
 "isArtist"=>$row["isArtist"],
 "seen"=>$row["seen"]
  ));
     }
    }
  }
  return trim(json_encode($json));
}

function deleteSongDb($tableName,$id,$comment){
  global $con;
  if(connect()){ 
    $action=$con->query("DELETE from `$tableName` where id=$id");
    if($action){
      $action2=$con->query("DROP TABLE `$comment`");
      if($action2){
        return "finished";
      }
      else{
        return "incomplete2<br>".$con->error;
      }
    }
    else {
      return "incomplete1".$con->error;
    }
  }
}
/* const add={
      "name":artistObject.artistName,
      "id":artistObject.id,
      "profileImage":artistObject.profileImage
  }
  addDb={..add,"action":"follow",myTable":user.following,"artistTable":artistObject.followers,
  "myName":user.name!=undefined ? user.name:user.artistName,
  "myImage":user.profileImage,
  "myId":user.id,
  "isArtist":user.name !=undefined ? "false":"true"
  }
  */
function follow(){
  global $con;
  if(connect()){
    $name=trim($_POST["name"]);
    $id=trim($_POST["ownerId"]);
    $image=trim($_POST["profileImage"]);
    $myTable=trim($_POST["myTable"]);
    $save1=$con->query("INSERT INTO $myTable(name,image,ownerId)
   VALUES('$name','$image',$id)
   ");
    if($save1){
      $artistTable=trim($_POST["artistTable"]);
      $names=trim($_POST["myName"]);
      $originalId=trim($_POST["myId"]);
      $images=trim($_POST["myImage"]);
      $isArtist=trim($_POST["isArtist"]);
      $email=trim($_POST["myEmail"]);
      $notification=trim($_POST["notificationTable"]);
      $save2=$con->query("INSERT INTO $artistTable(
        names,image,email,originalId,notificationTable,isArtist)
        Values('$names','$images','$email',$originalId,'$notification',$isArtist)");
    if($save2){
      return true;
    }
    else{
      echo $con->error;
      return false;
    }
  }
  else{
    echo $con->error;
  }
  }
}

function prepareDownload(){
  $name=$_POST["name"];
  if(isset($_POST["file"])){
  //not ready
  echo "not ready";
  }
}

function addViewed(){
global $con;
if(connect()){
$id=$_POST["id"];
$view=$_POST["view"];
$save=$con->query("UPDATE `artistUsers` set views=$view WHere id=$id");
if($save){
  return true;
}
else{
  return false;
}
}
}
function loadComments(){
  global $con;
  if(connect()){
    $json=[];
$table=trim($_POST["tableName"]);
$save=$con->query("SELECT * FROM `$table`");
if($save->num_rows>0){
  while($rows=$save->fetch_assoc()){
 array_push($json,array(
      "id"=>$rows["id"],
      "name"=>$rows["name"],
      "likes"=>$rows["likes"],
      "image"=>$rows["image"],
      "isArtist"=>$rows["isArtist"],
      "ownerId"=>$rows["ownerId"],
      "message"=>htmlspecialchars_decode($rows["message"])
    ));
  }
}
return json_encode($json);
  }
}

function addComment(){
  global $con;
  if(connect()){
$table=trim($_POST["tableName"]);
$message=htmlspecialchars(trim($_POST["message"]));
$image=trim($_POST["image"]);
$name=trim($_POST["name"]);
$ownerId=$_POST["ownerId"];
$isArtist=$_POST["isArtist"];
$save=$con->query("INSERT INTO $table(name,likes,image,ownerId,isArtist,message)
values('$name',0,'$image',$ownerId,$isArtist,'$message')
");
if($save){
  return true;
}
else{
  echo $con->error;
  return false;
}
  }
}

function loadUsers(){
  global $con;
  $json=[];
  if(connect()){
    $data=$con->query("SELECT * FROM `normalUsers`");
    if($data->num_rows>0){
      while($rows=$data->fetch_assoc()){
      array_push($json,array(
          "id"=>$rows["id"],
          "name"=>$rows["name"],
          "profileImage"=>$rows["profileImage"],
          "messagesList"=>$rows["messagesList"],
          "following"=>$rows["following"],
          "fevorites"=>$rows["fevorites"],
        ));
      }
    }
return json_encode($json);
  }
}
function loadJustUser($id){
global $con;
if(connect()){
  $loads=$con->query("SELECT * FROM `normalusers` where id=$id");
  if($loads->num_rows>0){
    $rows=$loads->fetch_assoc();
    return json_encode(array(
      "id"=>$rows["id"],
      "name"=>$rows["name"],
      "profileImage"=>$rows["profileImage"],
      "messagesList"=>$rows["messagesList"],
      "following"=>$rows["following"],
      "fevorites"=>$rows["fevorites"],
    ));
  }
  else{
    return "not found";
  }
}
}

function addVS(){
  global $con;
  if(connect()){
  $view=trim($_POST["views"]);
  $id=trim($_POST["id"]);
  $table=trim($_POST["tableName"]);
  $save=$con->query("UPDATE `$table` set viewer=$view where id=$id");
  if($save){
    return true;
  }
  else{
    return false;
  }
  }
}

/*
on 
    the 
        bottom
                  chat applcation
                                        will start
                                                    width
                                                          new
                                                          connection 
  *****CHAT APP*******                                 and
                                                     new database
                                                  take 
                                                note
                                            yeah
                                          chat
                                functions
                        will 
                starts
          here
wish my self luck
                              



STARTS>>>>!
                     V

 */
$con2=new mysqli("localhost","root","","playerchatapp");
//$con2=new mysqli("localhost","id16654496_austinesamuel9142","Me**2001Smart","id16654496_playerchatapp");;

function chatConnect(){
  global $con2;
if($con2){
  return true;
}
else{
  return false;
}
}

function createChatTable(){
  if(chatConnect()){
global $con2;
  $name=substr("table".md5(rndName(30)),0,15)."Cht";
  $save=$con2->query("
  CREATE TABLE $name(
    id int(10) unsigned auto_increment primary key,
 ownerId int(10) not null,
 seen varchar(20) not null,
 message varchar(670000) not null,
 date varchar(30) not null
  )");
if($save){
  sleep(0.1);
return saveAsPrevMessages($name) ? $name:"fail";
 }
else{
  echo $con2->error;
  return false;
}
  }
}

function saveAsPrevMessages($tableName){
global $con;///=new mysqli("localhost","root","","playerusers");

$userTable=trim($_POST["userTable"]);
$otherTable=trim($_POST["otherTable"]);
$userName=trim($_POST["userName"]);
$userImage=trim($_POST["userImage"]);
$userOriginalId=trim($_POST["userOriginalId"]);
$oponantImage=trim($_POST["oponantImage"]);
$oponantOriginalId=trim($_POST["oponantOriginalId"]);
$oponantName=trim($_POST["oponantName"]);
//
$isArtist=trim($_POST["isArtist"]);
$save=$con->query("INSERT INTO $userTable(creator,creatorImage,creatorOriginalId,oponantImage,oponantOriginalid,oponantName,tableNames,isArtist )
VALUES('$userName','$userImage','$userOriginalId','$oponantImage','$oponantOriginalId','$oponantName','$tableName','$isArtist');
");
$save2=$con->query("INSERT INTO $otherTable(creator,creatorImage,creatorOriginalId,oponantImage,oponantOriginalid,oponantName,tableNames,isArtist )
VALUES('$userName','$userImage','$userOriginalId','$oponantImage','$oponantOriginalId','$oponantName','$tableName','$isArtist')"
);
if($save&&$save2){
  return true;
}
else{
  echo $con->error;
return false;
}
}

function loadChatContent($tableName){
  global $con2;
  if(chatConnect()){
    $json=[];
    $data=$con2->query("SELECT * FROM $tableName");
  if($data->num_rows>0){
 while($row=$data->fetch_assoc()){
   array_push($json,
    array(
      "id"=>$row["id"],
      "ownerId"=>$row["ownerId"],
      "seen"=>$row["seen"],
      "message"=>htmlspecialchars_decode($row["message"]),
      "date"=>$row["date"]
     ));
 }
  }
  }
  return json_encode($json);
}

function savePchat($tableName){
  global $con2;
  if(chatConnect()){
    $ownerId=trim($_POST["ownerId"]);
    $seen=trim($_POST["seen"]);
    $message=htmlspecialchars(trim($_POST["message"]));
    $date=Date("d-m-y");
    $save=$con2->query("INSERT INTO $tableName(ownerId,seen,message,date)
    VALUES('$ownerId','$seen','$message','$date');
    ");
    if($save){
      return true;
    }
    else{
      return false;
    }
  }
}