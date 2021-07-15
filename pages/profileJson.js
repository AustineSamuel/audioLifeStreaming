const user=setUser("user");
var artist=[];
var artistInfo={
  "songsTable":"none",
  "followersTable":"none",
  "messagesTable":"none",
  "notificationsTable":"none",
  "fevoritesTable":"none",
 }
function loadProfile(callBack=null){
$.post({
  url:"../server/severActivity.php",
  data:{"action":"loadArtistOwner","id":user.id},
  success:function(e){
artist=JSON.parse(e);
artistInfo.songsTable=artist.songs;
artistInfo.followersTable=artist.followers;
artistInfo.fevoritesTable=artist.fovorites;
artistInfo.messagesTable=artist.messageList;
artistInfo.notificationsTable=artist.notifications;
callBack!=null ? callBack():"";
  },
  error:function(){
    alert("loading error");
  }
});
}
loadProfile(loadMessagesList);

function loadMessagesList(callBack=null){
  $.post({
    url:"../server/severActivity.php",
    data:{"action":"loadMessagesList","tableName":user.messageList},
    success:function(e){
  artist.messagesList=JSON.parse(e);
  loadNotifications();
  callBack!=null ? callBack():"";
    },
    error:function(){
      alert("loading error");
    }
});
}

function loadNotifications(){
  $.post({
    url:"../server/severActivity.php",
    data:{"action":"loadNotification","tableName":user.notification},
    success:function(e){
   artist.notifications=JSON.parse(e);
      setAllSongs();
    }
  })
}
function setAllSongs(callBack=null){
 songsTable=user.songs;
$.post({
url:"../server/severActivity.php",
data:{"action":"loadArtistSongs","tableName":songsTable},
success:function(e){
artist.songs=JSON.parse(e);
callBack!=null ? callBack():setArtistFollowers();
},
error:function(){
  alert("error");
}
});
}

function setArtistFollowers(){
//load artist followers
table=user.followers;
$.post({
url:"../server/severActivity.php",
data:{"action":"loadArtistFollowers","tableName":table},
success:function(e){
 // console.log("loaded"+loadingF+""+e);
artist.followers=JSON.parse(e);
console.log("finished");
},
error:function(){
  alert("errorF");
}
}).then(function(){
  setUpLink();
});
}

const fev=[]
const artistr= {
  "artistName":"Austine Samuel",
  "followers":22,
  "profileImage":"download-1.jpg",
  "messagesList":[],
  "notifications":[],
  "id":1,
  "views":11,
  "videos":[
    {
      "id":1,
      "link":"songs/song (4).mp3",
      "image":"images/download-1.jpg",
      "title":"Rainbow the girl i want",
      "views":313,
      "downloads":82,
      "stars":114,
      "date":"2nth feb 2020",
      "likes":10,
      "artist":"Austine Samuel",
      "comments":[
        {"name":"Samson Monday",
        "likes":"3",
        "image":"donwload-3.jpg",
          "message":"wow this is cool"},
        {"name":"Samson Monday",
        "likes":"3",
        "image":"donwload-3.jpg",
          "message":"i love your floor"},
        {"name":"Samson Monday",
        "likes":"3",
        "image":"donwload-3.jpg",
          "message":"can we make song together?"},
          {"name":"Samson Monday",
          "likes":"3",
          "image":"donwload-3.jpg",
            "message":"this is awesome"}
      ]//ends comments
    }
  ],
  "gallery":["emotional.jpg","download-4.jpg","download-7.jpg","download-9.jpg"],
  "songs":[
    {
      "id":1,
      "link":"songs/sample.m4a",
      "image":"images/download-1.jpg",
      "title":"Rainbow the girl i want",
      "viewer":313,
      "download":82,
      "stars":114,
      "date":"2nth feb 2020",
      "like":10,
      "artist":"Austine Samuel",
      "comments":[
        {"name":"Samson Monday",
        "likes":"3",
        "image":"donwload-3.jpg",
          "message":"wow this is cool"},
        {"name":"Samson Monday",
        "likes":"3",
        "image":"donwload-3.jpg",
          "message":"i love your floor"},
        {"name":"Samson Monday",
        "likes":"3",
        "image":"donwload-3.jpg",
          "message":"can we make song together?"},
          {"name":"Samson Monday",
          "likes":"3",
          "image":"donwload-3.jpg",
            "message":"this is awesome"}
      ]//ends comments
    }
  ],//ends songs
"aboutMe":`hello My Name is Austine Samuel i have being a singer for 12 yrs with many years 
of expriecs am ready to collaborate with any singer
You're not connected to online Help, which shows you our latest content. Check your Internet connection, and then try to connect to online Help again. If you still see this message, the online Help service might be temporarily unavailable. 
Windows Help and Support
Find an answer quickly
Enter a few words in the search box above.
Not sure where to start?
How to get started with your computer
Learn about Windows Basics
Browse Help topics
More on the Windows website
More on the Windows website
Check out the Windows website, which has more information, downloads
You're not connected to online Help, which shows you our latest content. Check your Internet connection, and then try to connect to online Help again. If you still see this message, the online Help service might be temporarily unavailable. 
Windows Help and Support
Find an answer quickly
Enter a few words in the search box above.
Not sure where to start?
How to get started with your computer
Learn about Windows Basics
Browse Help topics
More on the Windows website
More on the Windows website
Check out the Windows website, which has more information, downloads
`
 }//ends artist objeck

 