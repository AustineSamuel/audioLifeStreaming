<?php
require "serverFunctions.php";

//activity
if($_SERVER["REQUEST_METHOD"]=="POST"){
  $action=trim($_POST["action"]);
  if($action=="createNormalAccount"){
echo createNormalUserAccount() ? varifyUser():"fail";
  }
  else if($action=="createArtistAccount"){
echo createArtistUserAccount() ? varifyUser():"fail";
  }
  else if($action=="login"){
   echo varifyUser();
  }
  else if($action=="uploadSong"){
  if(isset($_FILES["file"])){
   echo uploadSong($_FILES["file"]);
  }
  }
  else if($action=="uploadImage"){
    if(isset($_FILES["file"])){
    echo  uploadImage($_FILES["file"]);
    }
  }
  else if($action=="createCommentTable"){
    echo createSongCommentTable();
  }
  else if($action=="saveNewSong"){
   echo saveNewSong(trim($_POST["tableName"])) ? "sent" : "fail";
  }
  else if($action=="getSongComments"){
   echo getSongComments(trim($_POST["tableName"],trim($_POST["id"])));
  }
  else if($action=="loadArtistOwner"){
    echo loadArtistOwner($_POST["id"]);
  }
  else if($action=="deleteFile") {
    echo deleteFile($_POST["name"]);
  }
  else if($action=="loadAllArtist") {
    echo loadAllArtist();
  }
else if($action=="loadArtistSongs") {
  echo loadArtistSongs(trim($_POST["tableName"]));
}
else if($action=="loadArtistFollowers"){
echo  loadArtistFollowers(trim($_POST["tableName"]));
}
else if($action=="removeFev"){
 echo removeFev() ? "removed":"fail";
}
else if($action=="loadMessagesList"){
 echo loadMessagesList(trim($_POST["tableName"]));
}
else if($action=="loadNotification"){
echo loadNotifications(trim($_POST["tableName"]));
}
else if($action=="updateImage"){
echo updateImage($_POST["id"],$_POST["name"]);
}
else if($action=="updateAbout"){
  echo update($_POST["id"],htmlspecialchars($_POST["data"]));
}
else if($action=="updateBio"){
  echo update(trim($_POST["id"]),htmlspecialchars(trim($_POST["data"])),trim($_POST["column"]));
}
else if($action=="deleteSongDb"){
  echo deleteSongDb(trim($_POST["tableName"]),trim($_POST["id"]),trim($_POST["comment"]));
}
else if($action=="loadUsers"){
echo loadUsers();
}
else if($action=="createChatTable"){
  echo createChatTable();
}
else if($action=="loadChatContent"){
echo loadChatContent(trim($_POST["tableName"]));
}
else if($action=="savePChat"){
  echo savePchat(trim($_POST["tableName"])) ? "saved":"fail";
}
else if($action=="loadFollowing"){
  echo loadFollowing(trim($_POST["tableName"]));
}
else if($action=="loadJustSong"){
  echo loadJustSong(trim($_POST["tableName"]),trim($_POST["id"]));
}
else if($action=="saveFevorite"){
  echo saveFev(trim($_POST["table"]),trim($_POST["tableName"]),trim($_POST["id"])) ? "saved":"fail";
}
else if($action=="loadFevorites"){
echo loadFev(trim($_POST["tableName"]));
}
else if($action=="sendNotification"){
  echo sendNotification(trim($_POST["tableName"])) ? "saved":"fail";
}
else if($action=="addLike"){
  echo addLike() ? "added":"fail";
}
else if($action=="loadComments"){
  echo loadComments();
}
else if($action=="addComment"){
echo addComment() ? "added":"fails";
}
else if($action=="addViewed"){
  echo  addViewed() ? "aded":"fail";
}
else if($action=="follow"){
echo follow() ? "successfully followed":"Error: fail to follow";
}
else if($action=="addVS"){
  echo addVS() ? "added":"fail";
}
else if($action=="loadJustUser"){
echo loadJustUser($_POST["id"]);
}
else if($action=="copyToDownloads"){
  copyToDownload();
}
else if($action=="updateDownload"){
  updateDownload();
}
else if($action=="unfollow"){
 echo unfollow() ? "successfully":"fail";
}
else if($action="shareSong"){
echo enc(trim($_POST["name"]));
}
  ///user actions
  else{
    echo "unrecognised request";
  }
}
else{
  echo "no request<br>";
}
