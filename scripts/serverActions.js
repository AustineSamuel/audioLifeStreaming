var crntCommentTable="";
var commentViewed=false;
var crntSongComments=[];

function addVS(){
  $.post({
    url:"server/severActivity.php",
    data:{"action":"addVS","id":crntSong.id,"tableName":findArtist(crntArtist).songs,"views":parseInt(crntSong.viewer)+1},
    success:function(e){
     audio.paused ? message("song will start playing soon"):"";
      },
    error:function(){
      alert("error while updating song details ")
    }
 })
}
function sendMultipleNotifications(arr=[],callBack){
  if(arr.length>0){
  let loading=0;
  const song=artist.songs[artist.songs.length-1];
function send(){
if(loading<arr.length){
var notifcationTable=arr[loading];
 $.post({
  url:"../server/severActivity.php",
  data:{"action":"sendNotification",
  "tableName":notifcationTable.toString(),
  "message":`<b info="${artist.id+"#"+song.id}"></b> just upload new song <i>${song.title}</i> check now `,
  "image":artist.profileImage.toString(),
  "ownerName":artist.artistName.toString(),
  "ownerId":artist.id.toString(),
  "isArtist":"true"
},
success:function(e){
  loading++
  send();
},
error:function(){
alert("error: unable to send notification");
}
  
})

    }
    else{
      callBack();
    }
  }
  send();
 }
 else{
   callBack();
 }
}
function loadComments(callBack=null){
  if(!commentViewed && crntSong.comments!=undefined){
const table=crntSong.comments;
crntCommentTable=table
$.post({
url:"server/severActivity.php",
data:{"action":"loadComments","tableName":table},
success:function(e){
  crntSong.comments=JSON.parse(e);
  crntSongComments=crntSong.comments;
 // setTimeout(()=>{
  callBack!=null ? callBack():""
 //  },500);
},
error:function(){
  alert("error while loading comments");
}
})
commentViewed=true;
  }
  else{
    crntSong.comments=crntCommentTable;
  }
}
function addDownload(){
  $.post({

  })
}
function preDownload(title,link,myUrl="",callBack=null){
  message("preparing download",3000)
  $.post({
    url:"server/severActivity.php",
    data:{"action":"copyToDownloads","name":title,"file":link},
    success:function(e){
      console.log(e);
      if(e.search("<br/>")<0 && e.search("<b>")<0){
      download(myUrl+"downloads/"+e);
        warning(`
        (<i>${title}</i> ) is downloading..
        
        `,`<h4>if your download complate click <b>finished</b> button</h4>
        <b> Note </b>:clicking <b>finished</b> button when download hav'nt complete
         can result in errors like (uncompleted download or download error) 
        <br>so
          <br>Do not interupt this action
          <br>
          Make sure <b> ${title}</b>Song download is complete before you close this Message
          <a href="#">need help  ?</a>
                `,"Close","Finished",delNow);
                function delNow() {
                  deleteFile("../downloads/"+e,send,"server/severActivity.php");
                  function send(){
                    crntArtist!=null && crntArtist.notification!=undefined ?  sendNotification(crntArtist.notification,"Downloads your song (<i> "+title+"</i>) ",next) : next;
                 function next(e){
                   updateDownload(crntSong.id);
                 }
                  }
                }

      }
    },
    error:function(){
      alert("error:download fail please try again");
    }
  });
}
function updateDownload(id){
  if(crntArtist!=null){
    if(crntArtist.artistName!="fevorites" && crntArtist.artistName !="All Tracks"){
  const artist=findArtist(crntArtist);
const downloadsNow=parseInt(crntSong.download)+1;
  $.post({
    url:"server/severActivity.php",
    data:{"action":"updateDownload","tableName":artist.songs,"id":id,"downloads":downloadsNow},
    success:function(e){
      crntSong.downloads=downloadsNow;
    },
    error:function(){
      alert("error: unable to save your activities")
    }
  })
}
}
}
function showNewComments(scroll=true){
  //load all new Comments of the crntSonds and view
      page.aOpen=true;
        page.Close=false;
        page.bOpen=false;
        closePage();
      act.viewComment=true;
      editSongText();
      crntArtistServer.songs=songs;
      crntArtist.songs=songs;
    actions();
     viewComment(crntSongComments);
    scroll ? $("#viewer").animate({scrollTop:document.querySelector("#viewer").scrollHeight},"slow") : "";
       }
      var ownerNow="";
      var commentData="";
       function commentActions(owner=null){
         message("posting..")
$.post({
  url:"server/severActivity.php",
  data:{"action":"addComment",
  "tableName":crntCommentTable.toString(),"message":owner!=null ? "reply to<b> "+owner+" </b> "+$("#takeInput input").val():$("#takeInput input").val(),"name":user.name != undefined ? user.name:user.artistName,"image":user.profileImage,"ownerId":user.id,"isArtist":user.songs!=undefined ? "true":"false"
},
  success:function(e){
    console.log(e);
    const data={
    "message":owner!=null ? "reply to<b> "+owner+" </b> "+($("#takeInput input").val()!=undefined ? $("#takeInput input").val():commentData):$("#takeInput input").val()!=undefined ? $("#takeInput input").val():commentData,
    "name":user.name != undefined ? user.name:user.artistName,
    "image":user.profileImage,
    "likes":"0",
    "ownerId":user.id,
    "isArtist":user.songs!=undefined ? "true":"false",
    "id":crntSongComments.length-1
}
crntSongComments.push(data);
    showNewComments();
    message("posted <i class='fa fa-check'></i>",1000);
    if(crntArtist!=undefined && crntArtist!=null){
    if(crntArtist.artistName!="All Tracks" && crntArtist.artistName!="fevorites"){
    sendNotification(findArtist(crntArtist).notification,`<b info="${crntArtist.id}#${crntSong.id}"></b>commented on your song <i> (${crntSong.title}) </i>`,null,"server/severActivity.php")
    }
  }

  },
  error:function(){
    alert("fail to send")
  }
})
      }
function addViews(callBack=null){
$.post({
url:'server/severActivity.php',
data:{"action":"addViewed","id":crntArtist.id,"view":parseInt(crntArtist.views)+1},
success:function(e){
callBack!=null ? callBack():"";
},
error:function(){
  alert("error: on veiw update");
}
})
}
function likeComment(owner){
let  newLiker={//from local storage
"name":"Austine Samuel",
"originalId":"notyet",
"image":"crntUserImage"
  }
//save user name and original id image to owner likes table e.g
owner.likes.push(newLiker);
//on success
showNewComments(false);//notification  need to be send here
}
function disLikeComment(owner,user){
    //remove row  user name and original id image to owner likes table e.g
    owner.likes.splice(Likes(user,owner.likes,true),1);
    //on success
showNewComments(false);   
message("you dislike this comment <b>"+owner.name+" </b>comment");
}

  function  commentReply(owner){
let data=$("#input").val();
if(data!=""){
  commentActions(ownerNow);
}
    }
   $("#commentLink #comment").click(function(){
  takeInput($("#input"),"write comment...",commentActions);
  });

  function createSongCommentTable(callBack){
$.post({
  url:"../server/severActivity.php",
  data:{"action":"createCommentTable"},
success:function(e){
  console.log(e);
  callBack(e);
},
error:function(){
alert("something went wrong on creating song comment table!");
}
})
  }
  //comment sections finished here
  function saveDownload(){
    //saveDownload
    crntArtist=crntArtistServer;
    tableName=crntArtist.songs[id].tableName;
    //save on success
  //update 
crntArtistServer.songs[id].downloads=parseInt( crntArtistServer.songs[id].downloads+1);
editSongText();//end
  }

  function saveView(){
    //saveDownload
    crntArtist=crntArtistServer;
 const   tableName=crntArtist.songs[id].tableNameN;
    //save on success
  //update 
crntArtistServer.songs[id].views=parseInt(crntArtistServer.songs[id].views+1);
editSongText();//end
  }
function sendNotification(notifcationTable,message,callBack=null,myUrl="server/severActivity.php"){
  $.post({
    url:myUrl,
    data:{"action":"sendNotification","tableName":notifcationTable,"message":message,"image":user.profileImage,
    "ownerName":user.artistName!=undefined ? user.artistName:user.name,
    "ownerId":user.id,
    "isArtist":user.songs!=undefined ? "true":"false"},
success:function(e){
callBack!=null ? callBack(e):"";
},
error:function(){
  alert("error: unable to send notification");
}
    
  })
}
$("#hd #userAccount").click(function(){
  loadNotification(done)
  function done(){
        notificationViewer(notifications);
  }
       });

  function saveFevorite(tableName,callBack=null,myUrl="server/severActivity.php"){
    const table=user.fevorites;
    const songId=crntSong.id;
    $.post({
      url:myUrl,
      data:{"action":"saveFevorite","table":table,"tableName":tableName,"id":crntSong.id},
      success:function(e){
        console.log(e);
        sendNotification(crntArtistServer.notification,
         `<b info="${crntArtist.id}#${songId}"></b> Added your song : (<i>${crntSong.title}</i>)  to fevorites list`,
        sendLike);
      },
      error:function(){
        alert("error while saving fvrt");
      }
    });
function sendLike(){
 const artist=findArtist(crntArtistServer);
$.post({
url:"server/severActivity.php",
data:{"action":"addLike","tableName":artist.songs,"id":crntSong.id,"likeNow":parseInt(crntArtistServer.songs[id].likes)+1},
success:function(e){
  console.log(e);
  message(e);
    crntArtistServer.songs[id].likes=Number(crntArtistServer.songs[id].likes)+1;
    callBack!=null ? callBack():"";
},
error:function(){
  alert("error:cant update song")
}
})

 }
 }
function removeFev(table,id,callBack=null){
  $.post({
url:"server/severActivity.php",
data:{"action":"removeFev","tableName":table,"id":id},
success:function(e){
  console.log(e);
  message(e);
  callBack!=null ? callback(e):""
},
error:function(){
  alert("error:unable to remove song from your fevorites list")
}
  })
}

 function follow(obj,callBack=null,myurl="server/severActivity.php"){
 $.post({
url:myurl,
data:obj,
success:function(e){
  message(e);
  console.log(e)
  callBack!=null ? callBack():"";
},
error:function(){
  alert("error:unable to follow artist");
  console.log("error ");
}
});
  }
 function reloadAllArtist(){
   setTimeout(()=>{
  allUsers=loadAllArtist({"action":"loadAllArtist"},"server/severActivity.php",setAllArtist);  
  },1000*30)
}
//mesage activities
function createNewMessageTable(name,callback=null,arg=null){
//ajax create new table
//on success return table name in md5 hash
}
function addToMessageList(tableName,name,callback=null,arg=null){
  //save to both messages list
}

function unfollow(artist,callBack=null,Myurl="../server/severActivity.php"){
const id=artist.id;
const image=artist.profileImage;
$.post({
  url:Myurl,
  data:{"action":"unfollow","id":id,"profileImage":image,"tableName":followingTable},
  success:function(e){
    console.log(e);
    callBack!=null ? callBack(e):"";
    sendNotification(artist.notification," unfollowed you ",null,Myurl);
  },
  error:function(){
  "error:fail to unfollow this user"
  }
})
}

 function messageArtist(){
 const  tableName=crntArtistServer.tableNameM;
 const tablePresent=tableName.search(user.messages)
 if(tablePresent < 0){
 const object={
  "originalId":user.originalId,
  "chatTableName":tableName,
  "message":"can we sing"
}
//saveMessage()
 }
else{
  const object={
    "originalId":user.originalId,
    "chatTableName":tableName,
    "message":"can we sing"
  }
 var table=creatNewMessageTable();
addMessageToList(crntArtistServer.tableNameM,table)
}

//send chat Info
//on success nothing
 }
function loadAllUsers(callBack=null,urlM="../server/severActivity.php"){
  var arr=[];
$.post({
  url:urlM,
data:{"action":"loadAllArtist"},
success:function(e){
  const ar=JSON.parse(e);
  ar.forEach((e) => {
  arr.push(e);
  });
$.post({
url:urlM,
data:{"action":"loadUsers"},
success:function(e){
const ar=JSON.parse(e);
ar.forEach((e) => {
 arr.push(e);
 });
 callBack!=null ? callBack(arr):""
}
})
}
});
}

 function saveSongNormal(object,callBack=null){
   $.post({
     "url":"../server/severActivity.php",
     data:object,
     success:function(e){
       console.log(e);
callBack!==null ? callBack(e):"";
message("finished");
     },
     error:function(e){
       alert("loading fail");
     }
   })
 }
