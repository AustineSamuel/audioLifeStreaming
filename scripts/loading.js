//user must be set here
const allUsers=
loadAllArtist({"action":"loadAllArtist"},"server/severActivity.php",setAllArtist);
var allArtistInfo=[];
function setAllArtist(e){
  allArtist=JSON.parse(e);
  setAllSongs();
}
var loadingProgress=0;
function setAllSongs(){
  if(loadingProgress < allArtist.length ){
//load artist songs one by one
songsTable=allArtist[loadingProgress].songs;
$.post({
url:"server/severActivity.php",
data:{"action":"loadArtistSongs","tableName":songsTable},
success:function(e){
  allArtist[loadingProgress].songs=JSON.parse(e);
loadingProgress++;
setAllSongs();
},
error:function(){
  alert("error");
}
});
}
else{
  console.log("finished loading songs");
  setArtistFollowers()
}
}


var loadingF=0;
function setArtistFollowers(){
  if(loadingF < allArtist.length ){
//load artist followers
table=allArtist[loadingF].followers;
$.post({
url:"server/severActivity.php",
data:{"action":"loadArtistFollowers","tableName":table},
success:function(e){
  if(e.search("<br>")<0 && e.search("<b>")<0){
allArtist[loadingF].followers=JSON.parse(e);
 }
 loadingF++;
setArtistFollowers();
 
},
error:function(){
  alert("error");
}
});
}
else{
  console.log("finished loading followers");
  loadFollowing();
}
}
function loadFollowing(){
  $.post({
    url:"server/severActivity.php",
    data:{"action":"loadFollowing","tableName":user.following},
    success:function(e){
      if(e.search("<br>")<0 && e.search("<b>")<0 && e!="unrecognised request"){
      whomIFollow=JSON.parse(e);
      }
      else{
        console.log("invalid json data");
      }
      loadFev();
    },
    error:function(e){
      alert("error while loading : fwn");
    }
  })
}
var fevDetails=[];
function loadFev(){
  $.post({
    url:"server/severActivity.php",
    data:{"action":"loadFevorites","tableName":user.fevorites},
    success:function(e){
      if(e.search("<br>")<0 && e.search("<b>")<0 && e!="unrecognised request"){
      fevDetails=JSON.parse(e);
     }
      else{
        console.log("invalid data");
      }
      loadFevAll();
    }
  })
}

var allFevoritesProgress=0;
function loadFevAll(arr=fevDetails){
if(allFevoritesProgress<arr.length){
  const el=fevDetails[allFevoritesProgress];
  $.post({
    url:"server/severActivity.php",
    data:{"action":"loadJustSong","tableName":el.tableName,"id":el.songId},
    success:function(e){
      if(e.search("<br>")<0 && e.search("<b>")<0 && e!="unrecognised request"){
     fev.songs.push(JSON.parse(e));
     fev.songs[allFevoritesProgress].originalId=el.id;
         }
         allFevoritesProgress++;
     loadFevAll()
  
    }
  })
}
else{
  console.log("finished loading fevorites");
  loadNotification()
}
}

let notifications=[];
function loadNotification(callBack=null){
  $.post({
    url:"server/severActivity.php",
    data:{"action":"loadNotification","tableName":user.notification},
    success:function(e){
      if(e.search("<br>")<0 && e.search("<b>")<0 && e!="unrecognised request"){
      notifications=JSON.parse(e);
$("#hd #userAccount i").html(notifications.length);
      callBack!=null ? callBack():"";
        }
      else{
        console.log("invalid data");
      }
      loadPrev();
    },
    error:function(){
      alert("error while loading your notification");
    },
    
  })
}


var messages=[];
function loadPrev(MyUrl="server/severActivity.php"){
  $.post({
    url:MyUrl,
    data:{"action":"loadMessagesList","tableName":user.messageList},
    success:function(e){
      console.log(e);
       if(e.search("]") > -1 ){
  messages=JSON.parse(e);
$("#user #userMessages i").html(messages.length);
      }
    },
    error:function(){
  alert("error while loading messages list");
    }
  }).then(function(){
    //page start here
    pageStart();
  })
  }
  
