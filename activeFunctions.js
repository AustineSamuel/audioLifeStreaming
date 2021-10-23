"use strike";
///var user=null;//user must be defined
$("button").attr("style","cursor:pointer")
$("a").attr("style","cursor:alias");
function setUser(x=null){
  if(x!=null && x!=undefined && x!=""){
  let user= localStorage.getItem(x);
  if(user!=null && user!=undefined){
    return JSON.parse(user);
  }
  else{
    return null;
  }
}
else{
return "fail";
}
}
//
  function sliceTextAnimation(parentText,arr=[" "],userDur=1000,restartDur=2000){
    dur=userDur;
 arr.shift(parentText.html())
    let textDur=0;
    let textArr=0;
    let text=arr[textArr];
    //dur
    const animateF=() => {


      if(arr[textArr].slice(0,textDur).lastIndexOf(".")==arr[textArr].length-1){

        clearInterval(animate);
        //clearInterval(check);
        setTimeout(() => {
          textDur=0;
          dur=100
         animate=setInterval(animateF,dur);
          //check=setInterval(checkF,100);
          if(textArr >= arr.length -1 ){
          textArr= -1;
          text=arr[textArr];
          }
          textArr++;
          text=arr[textArr];
        },restartDur);
      }
      else{
      dur=Math.floor(Math.random()*userDur)+1;
      }

       if(textDur>=text.length +1){
        if(arr.length>0 && arr != undefined){
          text=arr[textArr];
          textDur=0;
           }
        textDur=0;
      }
      parentText.html(text.slice(0,textDur));
      textDur++;
    }
  let animate=setInterval(animateF,dur);//end interval
      }
//rauter
const rout=(location=null)=>{
  if(location!=null&&location!=""){
    const currentLocation=window.location.href;
    if(location.search(currentLocation)>= 0){
      return true;
    }
    else{
      return false;
    }
  }
}
//messages show

const message=(text,dur=1000,fade=500)=>{
  $("body").append(`
  <div style=" width:100%; display:none; height:100px; display:flex; align-items:center; justify-content: center;position:fixed;bottom:0;"id="messageShow">
   <span style="padding:10px 15px; max-width:70%; color:white;background:rgba(32, 32, 32, 0.863);border-radius:30px; font-size:small;" id="messageText">
    ${text}</span>
</div>
  `);
  $("body #messageShow").fadeIn(fade);
  setTimeout(() => {
    $("body #messageShow").fadeOut(fade);
      setTimeout(() => {
      $("body #messageShow").remove();
        },fade+300);
  }, dur);

}//end function

//chat refresh
function chatRefresh(Mydata={},Myurl="load.php"){
$.get({
  url:Myurl,
  Mydata:Mydata,
  success:function(x){
    dataLoaded=x;
  },
  error:function(x){
    alert(x);
  }
})//end ajax get
}//end function

function getQr(el){
  return document.querySelector(el);
}
function getId(el){
  return document.getElementById(el);
}
function getExtn(file,test=false){
const  fileExtn=file.slice(file.lastIndexOf("."),file.length).toLowerCase();
if(test===false){
  return fileExtn;
}
else{
return test.includes(fileExtn);
}
}

function clickImageViewer(){
let count=false;
$("img").click(function(){
const src=$(this).attr("src").toString();
$("body").append(`<div id="v112" style='
  width:100%; height:100%; position:fixed; 
  background:rgba(0,0,0,0.4);display:flex; 
  align-items:center; justify-content:center;'><img src="${src}" style="width:90%; height:90%; border-radius:10px;">
  </div>
`);
$("#v112").click(function(){
  $(this).fadeOut(200);
setTimeout(() => {
  $("#v112").remove();
},500);
count=false;
  });

});
}
//clickImageViewer();
function download(link){
  let location=window.location.href.slice(0,window.location.href.lastIndexOf("/"));
  let path=location+"/"+link;
  let a=document.createElement("a");
  a.href=path;
  a.target="_blank";
  a.download=link;
  a.click();
  }
  function searchSong(song,arr){
    let exist=false;
    arr.forEach((e,i)=>{
      const check=song.image === e.image && song.link === e.link  && song.id === e.id && song.artist ===e.artist;
      if(check){
        exist=true
      }
    });
    return exist;
  }
  
function playAudio(audio,callBack=null){
  let count=0;
  const keepPlay=setInterval(()=>{
  if(audio.readState>0){
    clearInterval(keepPlay);
  audio.play();
  callBack != null ? callBack():"";
  }
  else{
    message("Song Not ready",3000)
  }
  count++;
  if(count>4){
    count=0;
    clearInterval(keepPlay);
    message("fail to play");
  }
  },1000)
  }
  
function warning(heading="Wrong Command", content="you click a wrong button",button1="Cancel",button2="Ok",callBack=null,back=null){
  $("body").append(` <div id="warning"
  style="overflow:auto;width:100%;height:100%;display:flex; position:fixed; justify-content:center; align-items:center; background:rgb(0,0,0,0.4);">
   <div style="height:auto; width:80%; padding:20px 20px; border-radius:10px;max-height:700px;background:rgb(20, 17, 31);margin:0 auto;box-shadow:1px 1px 10px 0px black;">
    <header style="text-align:center; color:rgb(255, 0,94); font-size:x-large;">${heading}</header>
    <div id="content" style="color:rgb(207, 202, 250); font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:small;">${content}</div>
  <div style="display:flex; justify-content:space-around;padding:9px;"><button id="b1" style="width:100px; padding:5px; background:rgb(255, 0, 85);">${button1}</button><button  id="b2" style="width:100px; padding:5px; background:rgb(71, 21, 252);color:white !important">${button2}</button></div>
  </div></div>`);
  
  $("#b1").click(function(){
   // $("#b1").off("click");
    $("#warning").fadeOut(300);
   setTimeout(() => {
  document.querySelector("#warning").remove();
  back != null ? back() : "" ;
  },500);
  });
  
  $("#b2").click(function(){
  //   $("#b2").off("click");
    $("#warning").fadeOut(300);
   setTimeout(() =>{ 
  document.querySelector("#warning").remove();
  if(callBack!=null){
  callBack();
  }
  },500);
  });
  }//end function

  function takeInput(insertTo=null,placeholder="type..", callback=null,arg=null,bg="rgb(0,0,0)",bgB="rgb(59, 38, 87)",colorT="lightgrey",colorB="rgb(255, 0, 157)"){
    $("body").append(`
    <div style="
  width:95%;
  padding:10px 10px;
  border-radius:5px;
  background:${bg};
  border-top:1px solid rgba(255, 0, 157,0.4);
  position:fixed;
  bottom:0;
  " id="takeInput">
    <div id="inputBody">
  <span class="fa fa-edit" style="
  padding:10px 10px;
   color:${colorB};
   background:${bgB};
  "></span><input placeholder="${placeholder}" style="color:${colorT};padding:10px 10px;width:70%"><button  style="color:${colorB}; background:rgb(41, 41, 63); float:right; padding:4px 4px;"class="fa fa-times"></button>
    </div>
  </div>
  `);
  let ready=false;
  $("body #takeInput input").on("keyup",function(){
  if($(this).val().length>0){
    $("body #takeInput button").attr("class","fa fa-send");
    ready=true;
   }
  else{
    $("body #takeInput button").attr("class","fa fa-times")
  }
  });
  $("body #takeInput button").click(function(){
  //$("body #takeInput button").off("click");
    if($("body #takeInput input").val().length>0){
      if(insertTo!=null){
        insertTo.val($("body #takeInput input").val());
          }
          else{
            console.log("unable to send");
          }
        }
        if(commentData!=undefined){
        commentData=$("#takeInput input").val();
        }
     $("body #takeInput").fadeOut(300);
     if($("body #takeInput input").val().length>0){
    if(callback!=null && ready){
      if(arg!=null){
      callback(arg);
      }
      else{
        callback();
      }
    }
  }
    setTimeout(()=>{
      $("body #takeInput").remove();
    },1000)
  });
  }//end input function
  
  function loadNormalUser(id="11",callBack=null){
//load wherer id
//onsucess
callBack != null ?  callBack():"";
}

  function href(link,target="_blank"){
    if(link.lastIndexOf(".") > -1){
    let a=document.createElement("a");
    a.href=link;
    a.target=target;
    a.click();
     message("loading...",3000,300)
    }
    else{
      message("link fail")
    }
    }
function showLoader(text="loading..",dur=2000){
$("#loader")!=undefined ? $("#loader").remove() : "";
  $("body").append(`
   
<div style="
width:100%;
height:100%;
position:fixed;
background:rgba(2, 8, 20, 0.438);
display:flex;
align-items:center;
justify-content:center;
" id="loader">
<div id="loaderBody" style="
width:200px;
height:200px;
display:flex;
align-items:center;
justify-content:center;
">

  <div style="
  width:100%;
  text-align:center;
  ">
${text}
<div id="durBody" style="
width:100%;
height:10px;
border:1px solid rgb(73, 73, 255);
margin-top:3px;
"><div style="
height:90%;
background:rgb(47, 47, 146);
width:0;
"></div></div>
  </div>
</div>
</div>
  `);
$("#durBody div").animate({width:"100%"},dur+100);
setTimeout(() => {
  $("#loader").fadeOut(500);
setTimeout(() => {
  $("#loader").remove();
}, 1000);
}, dur+200);
}
function deleteFile(name,callBack=null,actionUrl="../server/severActivity.php"){
  $.post({
  url:actionUrl,
  data:{"action":"deleteFile","name":name},
  success:function(e){
    e.toLowerCase()!="deleted" ? message(e):"";
    callBack!=null ? callBack(e):"";
  },
  error:function(){
    alert("fail to delete file");
  }
})
}
function uploadFile(fileFormName,url=null,callBack=null){
  url !=null ? fileFormName.attr("action",url) : "";
$("body").append(`
<div id="uploadBody" style=" width:100%;
height:100%;
position:absolute;
background:rgb(17, 15, 15);
overflow:auto;
display:flex;
align-items:center;
justify-content:center;
">
<div id="upload" style="width:90%;
max-width:400px;
text-align:center;
">
 <h3 style="color:rgb(48, 69, 255)">Uploading..</h3>
<span id="state" style="
color:rgb(202, 196, 250);
text-shadow:1px 1px 0px 10px;
">0%</span>

<div id="uploadDur" style=" width:90%;
height:10px;
border:1px solid blue;
margin:0 auto;
">
<div style=" width:0%;
height:10px;
background:blue;
"></div>
</div>
</div>
</div>
`)
//console.log("should start here")
fileFormName.ajaxSubmit({
  beforeSubmit:function(){
//console.log("form will be submited")
  },
  uploadProgress:function(r,x,y,z){
//console.log("progress"+z);
$("body #uploadBody #state").html(z+"%");
$("body #uploadDur div").css("width",z+"%");
  },
  success:function(x){
//console.log(x);
callBack != null ? callBack(x) : "" ;
  },
  complete:function(){
//console.log("complete");
const upload=$("body #uploadBody");
setTimeout(() => {
  upload.fadeOut(500);
  setTimeout(() => {
    upload.remove();
  }, 100);
}, 100);
  }
})
}

function uploadChatImage(form,callBack){
form.children("input").attr("name","imageFile");
form.ajaxSubmit({
success:function(e){
  console.log(e);
  callBack(e);
}
});
}
function uploadChatSong(form,callBack){
  form.children("input").attr("name","imageFile");
  form.ajaxSubmit({
  success:function(e){
    console.log(e);
    callBack(e);
  }
  });
  }

function imageReader(input,imageSrc,callBack=null,bg=false,extn=[".jpg",".jpeg",".png"]){
  var file=input.val();
  file=file.slice(file.lastIndexOf("."),file.length).toLowerCase();
  if(extn.includes(file)){
  reader=new FileReader();
  reader.onload=(function(e){
 bg ? imageSrc.attr("src",e.target.result) : imageSrc.css("background-image","url('"+e.target.result+"')");
callBack != null ? callBack() : "" ;  
});
  reader.readAsDataURL(input[0].files[0]);
  }//end if etn valid
  else{
    message("please use image with <b>.jpg .png .jpeg</b> extension",4000,300);
  }  
}

function songReader(input,songSrc,callBack=null,extn=[".mp3",".wav",".m4a",".ogg"]){
  var file=input.val();
  file=file.slice(file.lastIndexOf("."),file.length).toLowerCase();
  if(extn.includes(file)){
  reader=new FileReader();
  reader.onload=(function(e){
    callBack != null ? callBack() : "" ;
 songSrc.src=e.target.result;
 let count=0;
const play=setInterval(() => {
  count ++;
  if(songSrc.readyState>=1){
    songSrc.play()
    clearInterval(play);
  }
  else{
    message("unable to play audio");
  }
  if(count>5){
    clearInterval(play);
    count=0;
  }
},1000);
});
  reader.readAsDataURL(input[0].files[0]);
  }//end if etn valid
  else{
    message("please use image with <b>.mp3 .wav .m4a .ogg</b> extension",4000,300);
  }  
}

function replaceBrWithNL(text){
  let textArr=text.split("<br>");
    let newText="";
  textArr.forEach((e)=>{
    newText+=e+"\n";
  })
  return newText;
}
function removeSpace(text){
 let textArr=text.split(" ");
 let newText="";
 textArr.forEach((e)=>{
newText+=e;
 });
 return newText;
}

function songUploadEnv(){
//form data
$("head").append(`
<style id="style">
#uploadInputBody{
  width:100%;
  height:100%;
  position:absolute;
  background:rgb(6, 6, 15);
overflow:auto;
}  
#uploadS{
  width:100%;
  max-width:100%;
  max-width:400px;
  margin:0 auto;
}
#songFrame {
  margin-top:10px;
  text-align:center;
  margin:0 auto;
  box-shadow:2px 1px 10px 0px #221134;
  width:80%;
   border-radius:10px;
   background:black;
  padding-bottom:20px;
  }
#songFrame img{
  width: 130px;
  height:130px;
  border-radius:90px;
  border:1px solid rgb(108, 99, 243);
  margin:0;
  padding:0;
}
#songFrame h3,h4{
  width:90%;
  padding:5px;
  border-radius:10px;
  background:rgb(0, 0, 0);
  margin:0 auto;
  color:#ff1122;
font-family:Times;
  }
#songFrame button{
  color: rgb(255, 0, 34);
}
#userActionsUpload button{
  padding:5px;
  width:70%;
  max-width:250px;
  border-radius:10px;
  background:linear-gradient(10deg,#333333, #3311a1);
  margin-top:10px;
}
#userActionsUpload {
  text-align:center;
}
#userActionsUpload button:hover,#save:hover{
background:#331171;
 box-shadow:2px 1px 10px 0px black;
color:rgb(0, 0, 0);
}
#save:hover{
color:#ee99ff !important;
}
#userActionsUpload button:hover>label{
  color:FF22aa;
}
#backButton{
  color:rgb(255, 0, 64);
}
#save{
  color:white;
  padding:5px 10px;
  border-radius:10px;
  max-width:100px;
  background:linear-gradient(10deg,rgb(182, 88, 158), rgb(255, 0, 34));
}
#uploadDurS{
  width:90%;
  margin:0 auto;
  height:10px;
background:rgba(255, 0, 76, 0.322);
}
#uploadDurS div{
  width:10%;
  height: 90%;
  display:flex;
  align-items:center;
  justify-content:flex-end;
  background:rgb(255, 0, 76);
}
#uploadDurS div button{
width:12px;
height:12px;
border-radius:6px;
background:white;
}
#output{
  display:flex;
  flex-flow:row wrap;
  jusitify-content:space-around;
  
}
#output #lyricsBody{
  width:85%;
  border-radius:10px;
  background:black;
  margin:0 auto;
  height:130px;
  text-align:center;
  padding:10px;
  margin-top:10px;
}
#output #lyricsBody h4{
text-align:center;
}

@media screen and (min-width:450px){
  #output #lyricsBody,#output #songFrame{
    width:180px;
    height:250px;
  }  
  #save{
      margin-top:60%;
  }
  #output #lyricsBody{
    margin-top:0;
    }
  }
</style>
`)
$("body").append(`
<div id="uploadInputBody">
  <button id="backButton" class="fa fa-arrow-left"></button>
  <div id="uploadS">
  <div id="output">

  <div id="songFrame">
  <h3 id="heading" contenteditable>edit Song Title</h3>

<img><h4 style="color:white;text-align:center;padding:0; margin:0;" id="titleView">No song detected</h4>
<div id="controls"><br>
  <div id="uploadDurS">
    <div><button></button></div>
  </div>
<br>
<button class="fa fa-play"></button>
</div>
</div>

<div id="lyricsBody">
<h4>No lyrics</h4>
<textarea id="lyrics" placeholder="write lyrics"></textarea>
<button id="save">Start Upload</button>
  
</div>

  </div>
    <div id="userActionsUpload">
<form id="songData" action="../server/severActivity.php" enctype="multipart/form-data" method="POST">
  <input type="file" name="file" id="songUpload" hidden>
  <input name="action" id="action" value="uploadSong" hidden>

<button type="button" id="uploadSong">
  <label id="uploadSongBtn" for="songUpload">choose Song</label>
</button>
</form>

<form action="../server/severActivity.php" id="imageData" enctype="multipart/form-data" method="POST">
  
  <input type="file" name="file" id="imageUpload" hidden>
<input name="type" value="image" hidden>
<input name="action" id="action" value="uploadImage" hidden>
<button type="button" id="uploadImage">
  <label  id="songCoverBtn" for="imageUpload">Choose Song Cover</label>
</button>
</form>
    </div>
    <div>
  </div>
`);
  let imageReady=false;SongReady=false;lyricsReady=false;
  $("#imageUpload").on("change",function(){
    function valid(){
      imageReady=true;
      $("#songCoverBtn").html("Change Song Cover").parent().css("background","#221134");

    }
imageReader($(this),$("#songFrame img"),valid,true);
 });
let audio=null;
let titleReady=false;
$("#songUpload").on("change",function(){
  function valid(){
  SongReady=true;
  $("#uploadSongBtn").html("Change song").parent().css("background","#221134");
  }
audio=document.createElement("audio");
$("#titleView").html("edit Song Title");
document.body.appendChild(audio);
$("#songFrame h3").hover(function(){
  if($(this).html().length>2){
    titleReady=true;
    $("#titleView").html($(this).html());
  }
  else{
    titleReady=false;
  }
});
$("#songFrame .fa").attr("class","fa fa-pause");
 
songReader($(this),audio,valid);
audio.addEventListener("timeupdate",()=>{
  $("#uploadDurS div").css("width",audio.currentTime/audio.duration*100+"%")
})
});
let playF=false;

$("#songFrame button").click(function(){
if(!playF && audio != null){
  $(this).attr("class","fa fa-pause");
  playF=true;
audio.play();
}
else{
  if(audio != null){
  $(this).attr("class","fa fa-play");
playF=false;audio.pause();
  }
  else{
    message("please choose song from your device first",4000,300); 
}

}
});
$("#output #lyrics").on("keyup",function(){
if($(this).val().length>10){
  $("#output #lyricsBody h4").html($("#songFrame h3").html()+"lyrics");
  lyricsReady=true;
}
else{
  $("#output #lyricsBody h4").html("No lyrics");
  lyricsReady=false;
}
});
$("#uploadInputBody #save").click(function(){
  if(SongReady&&imageReady&&titleReady){
      let newImage=undefined;
    let newSong=undefined;
    let title=titleReady!==false ? $("#songFrame h3").html() : "No title " ;
    let lyrics="";
    if(lyricsReady!==false){
    const lry=$("#output #lyrics").val().split("\n");
   lry.forEach((e)=> {
    lyrics+=e
  });
    }
    let commentTable=false;
    function saveActivity(){
        console.log("valid data");
        object={
          "action":"saveNewSong",
          "tableName":artistInfo.songsTable,
          "link":newSong.toString(),
          "image":newImage.toString(),
          "title":title,
          "downloads":0,
          "lyrics":lyrics,
          "stars":0,
          "likes":0,
          "artist":artist.artistName,
          "viewer":0,
          "comment":commentTable!==false ? commentTable:"none"
        }
        function done(){
          audio.pause();
          let fans=[];
          artist.followers.forEach((e)=>{
            fans.push(e.notificationTable);
          });
          setAllSongs(sendNotifications);
          function sendNotifications(){
          message("notifying your fans ");
          sendMultipleNotifications(fans,close);
          function close(){
      $("#uploadInputBody").remove();
      $("#style").remove();   
      warning("song successfully upload ","every one will be able to play your songs download and share","ok","check",refresh,refresh)
        }
      }
        }
saveSongNormal(object,done);
    }
    function createSngCmtTable(e){
commentTable=e;
setTimeout(()=>{
  saveActivity();
},100)
    }
    function finishedImage(e){
      newImage=e;
     createSongCommentTable(createSngCmtTable);
       }
    function finishedSong(e){
      newSong=e;
      $("#imageData #action").val("uploadImage");
      uploadFile($("#imageData"),"../server/severActivity.php",finishedImage);
        }
    $("#songData #action").val("uploadSong");
uploadFile($("#songData"),"../server/severActivity.php",finishedSong);
  }
  else{
  warning("Can't upload: details  not valid","HELP :<br> make sure you use image of  (.png .jpg .jpeg) entension<br> and songs of (.mp3 .wav .m4a .ogg) entensions ,<br> <b>and</b> make sure you enter valid song title", "Cancel","Ok");
  }
});

$("#uploadInputBody #backButton").click(function(){
function remove(){
$("#uploadInputBody").fadeOut(500);
setTimeout(()=>{
  $("#uploadInputBody").remove();
  $("#style").remove();
});
}
warning("Are you sure you want to quite this uploads ?","if you click yes you will lost th current upload ","Stay","Quite",remove);
});
}
function refresh(){
  setTimeout(()=>{
  loop(artist.songs,$("#boxS #music"),"musics");
  loop(artist.gallery,$("#boxS #images"),"images");
},800);
}

function createConnection(object,callBack=null,myUrl="../server/severActivity.php"){
  message("creating connection");
  $.post({
url:myUrl,
data:object,
success:function(e){
message(e);
callBack!=null ? callBack(e):""
},
error:function(){
  alert("error : fail to connection")
}
 })
}
const artistDetails=[]
function loadAllArtist(dat,Myurl,callBack){
$.post({
url:Myurl,
data:dat,
success:function(e){
  console.log(e);
    allArtistInfo=JSON.parse(e);
callBack!=null ? callBack(e):"";
},
error:function(){
message("error while loading this page",3000,300);
}
})
}
function copy(text){
 var el=$("<textarea id='toCopy'></textarea>").val(text);
  $("body").append(el);
  el=getQr("#toCopy");
  el.focus()
  el.select()
  try{
    let check=document.execCommand("copy");
    message((check ? "copied":"fail to copy "),2000,500);
  }
  catch(err){
    alert("fial to copy : "+err);
  }
  setTimeout(()=>{el.remove()},500);
}

function findArtist(artist){
  found=false;
  allArtistInfo.forEach((e) => {
    if(e.id == artist.id && e.profileImage == artist.profileImage){
      found=e;
    }
  });
  return found;
}


function viewSongNormal(id,startLink=false,artistA=null){
  $("head").append(`
<style id="songCss">
  #songViewer{
    width:100%;
  height:100%;
  position:fixed;
  display:flex;
  justify-content:center;
  align-items:center;
  background:rgba(0, 0, 0, 0.349);
  }
  #songViewer #song{
    width:90%;
    max-width:450px;
    background:rgb(6, 6, 15);
  border-radius:5px;
  height:50px;
  display:flex;
  align-items:center;
  justify-content:space-around;
  box-shadow:1px 1px 10px 0px black;
  border:1px solid rgb(42, 41, 77);
  margin:0 auto;
  }
  #songViewer #song #name{
  width:60%;
  color:rgb(92, 65, 245);
  }
  #songViewer #song #durN{
    width:70%;
    height:10px;
  background:rgb(68, 15, 28);
  border-radius:10px;
  }
  #songViewer #song #durN #durP{
  height:90%;
  display:flex;
  justify-content:flex-end;
  background:#ff0745;
  border-radius:inherit;
  width:10%;
  }
  #songViewer #song #durN #durP button{
    width:6px;
    height:10px;
    border-radius:5px;
  background:rgb(231, 229, 253);
  }
  #songViewer #songEnv{
  background:rgba(0, 0, 0, 0.842);
  width:100%;
  max-width:650px;
  border:none;
  border-radius:5px;
  padding:10px;
  box-shadow:1px 1px 30px 0px rgb(16, 7, 65);
  margin:0 auto;
  }
  #songViewer #close,#songViewer #viewInPlayer{
    padding:5px 20px;
  border-radius:5px;
  background:rgb(89, 0, 255);
  box-shadow:1px 1px 10px 0px black;
  width:40%;
  }
  #songViewer #close:hover,#songViewer #viewInPlayer:hover{
    background:rgb(255, 10, 92);
  }
  #songActions button:hover{
  color:rgb(255, 0, 55);
  }
  #songActions{
    width:90%;
    padding:4px;
    max-width:450px;
    margin:0 auto;
  }
  #songViewer #song img{
  width:40px;
  height:40px;
  border-radius:20px;
  }
  #songViewer #song button{
    color:rgb(255, 0, 85);
  } </style>`)
  artistA=artistA==null ? artist : artistA;
$("body").append(`
<div id="songViewer">
<div id="songEnv">
<div id="song">
<img src="../images/${artistA.songs[id].image}">

<div id="durN">
  <div id="durP"><button></button>
</div>
</div>

<button id="playN" class="fa fa-play"></button>
</div>
<div id="songActions">
<button id="like" class="fa fa-heart-o"></button>
<button id="download" class="fa fa-arrow-down"></button>
</div><br>
<br>
<div style="width:100%; text-align:center;">
<button id="close">Close</button>
<button style="background:#bb2266;" id="viewInPlayer">Open in player</button>
    </div>
      </div>
    </div>  
`);


const link=startLink===false ? artistA.songs[id].link:startLink+artistA.songs[id].link
const audio=document.createElement("audio");
audio.src=link;
const crntSong=artistA.songs[id];
var playN=false;
audio.addEventListener("timeupdate",()=>{
$("#durN #durP").css("width",audio.currentTime/audio.duration*100+"%");
});
$("#songActions #download").click(function(){
message("server not parmited")
});
if(!searchSong(crntSong,fev)){
  message("server not parmited")
}  

$("#songActions #like").click(function(){
if(!searchSong(crntSong,fev)){
message("song sucessfully added to your fevorites list",2000);
$(this).attr("class","fa fa-heart").css("color","red");
fev.unshift(crntSong);
}
else{
  message("this song is already in your fevorite list" ,2000);
  $(this).attr("class","fa fa-heart").css("color","red");    
}
});
//
$("#playN").click(function(){
if(!playN){
$(this).attr("class","fa fa-pause");
playN=true;
audio.readyState > 0 ? audio.play() : message("Song data not ready",2000);
}
else{
$(this).attr("class","fa fa-play");
audio.pause();
playN=false;
}
});
$("#songViewer #viewInPlayer").click(function(){
  $.post({
    url:"../server/severActivity.php",
    data:{"action":"shareSong","name":artist.id+"dir"+artistA.songs[id].id},
    success:function(e){
      warning("Do you really want to leave this page?","this Action might take you to another page ","No","Yes",go)
      function go(){
      href("../pages/link.php?normalId="+e,"_self");
      }
    },
    error:function(){
      alert("Unable to get this song link");
    }
});
});

$("#songViewer #close").click(function(){
$("#songViewer").fadeOut(400);
setTimeout(()=>{
$("#songViewer").remove();
$("#songCss").remove();
audio.pause();
},500);
});
}
/*function onChatPogressaSaveSong(formName,callBack){
formName.ajaxSubmit({

})
}*/
function onChatProgressSaveMsg(message,tableName,element,callBack=null,serverUrl="../server/severActivity.php"){
  var user=setUser("user");
  if(message!=""){
  const messageData={
    "action":"savePChat",
    "tableName":tableName,
    "message":message,
    "ownerId":user.songs != undefined ? user.id:user.id+"a",
    "seen":"0",
    "date":"none yet"
  }
  $.post({
    url:serverUrl,
    data:messageData,
    success:function(e){
      console.log(e);
      element.append("<i id='check'>"+e+"</i>");
     $("#messageEnv #scroll").animate({scrollTop:document.querySelector("#messageEnv #scroll").scrollHeight},"slow");
        callBack != null ? callBack():"";  
    },
    error:function(){
      alert("error :message not sent");
    }
  })
  
  
  /* 
  setTimeout(() => {//example of on sucess
     }, 1000);//*/
}
}

function loadPrevChat(arr){
  var user=setUser("user");
  $("#chatBody").html(" ");
  if(arr.length>0){
arr.forEach(e=>{
  $("#chatBody").append(e.message);
 /*
if(e.owner!="me"){
  if(e.message.type=="text"){
$("#chatBody").append(`
<br>
<div id="messageCtn">
  <span class="message">${e.message.content}</span>
</div>
`)
  }
  else if(e.message.type=="audio"){
$("#chatBody").append(`
<br>
    <div class="user" id="messageCtn">
  <span class="message" style="box-shadow:none;background:none !important">
<div id="audioCtn">
<cite url="../songs/${e.message.content}" id="play" class="fa fa-play"></cite>
<div id="durLenCt"><div id="dur"><button></button></div></div>
<img src="../images/download-7.jpg"alt="loading">
    </span><a href="../songs/${e.message.content}" target="_blank" download><button class="fa fa-download"></button></a>
  </div>
`)
  }
  else if(e.message.type=="image"){
$("#chatBody").append(`
<br>
    <div class="user" id="messageCtn">
      <img alt="image" src="../images/${e.content}">
  </div>
`)
  }
  else{
  $("#chatBody").append(`
  <br>
  <p style='text-align:center; with:100%;'>unknown message type</p>
   `);
  }
}
else{
  if(e.message.type=="text"){
    $("#chatBody").append(`
    <br>
    <div id="messageCtn">
      <span class="message">${e.message.content}</span>
    </div>
    `)
      }
      else if(e.message.type=="audio"){
    $("#chatBody").append(`
    <br>
        <div class="user" id="messageCtn">
      <span class="message" style="box-shadow:none;background:none !important">
    <div id="audioCtn">
    <cite url="../songs/${e.message.content}" id="play" class="fa fa-play"></cite>
    <div id="durLenCt"><div id="dur"><button></button></div></div>
    <img src="../images/download-7.jpg"alt="loading">
        </span><a href="../songs/${e.message.content}" target="_blank" download><button class="fa fa-download"></button></a>
      </div>
    `)
      }
      else if(e.message.type=="image"){
    $("#chatBody").append(`
    <br>
        <div class="user" id="messageCtn">
          <img alt="image" src="../images/${e.content}">
      </div>
    `)
      }
    else{
      $("#chatBody").append(`
      <br>
      <p style='text-align:center; with:100%;'>unknown message type</p>
       `);
    }
}*/
});
const set=document.querySelectorAll("#messageCtn");
//const likes=document.querySelectorAll("#messageCtn"
for (let i = 0; i < set.length; i++) {
  el=set[i];
  if(el.getAttribute("ownerId")==(user.songs != undefined ? user.id:user.id+"a")){
    el.setAttribute("class","user");
  }
  else{
    el.setAttribute("class","other");
  }
  
}
  }
else{
  $("#chatBody").append("<p style='text-align:center; with:100%;'>start conversation</p>");
}
setTimeout(() => {
  audioActions();
  $("#inputCt textarea").val() != "" ? $("#messageEnv #scroll").animate({scrollTop:document.querySelector("#messageEnv #scroll").scrollHeight},"slow"):"";
}, 400);
}

function filterNumber(text="",characters=["\n"," "]){
let filtered="";
let i;
for(i=0;i<text.length;i++){
  let e=text[i];
  if(!characters.includes(e)){
    filtered+=""+e;
    }
  }
  return filtered;
}
function showUser(id,myUrl="../"){
  $("head").append(`
  <style id="showUserCss">
  #normalUserView{
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.6);
    display:flex;
    align-items:center;
    justify-content:center;
    position:fixed;
  }
  *{
    color:white;
  }
#normalUserView #env{
  width:90%;
  max-width:450px;
  height:90%;
  max-height:500px;
  overflow-y:auto;
  overflow-x:hidden;
  background:rgb(6,6,15);
  border-radius:10px;
  padding:10px 10px;
}
#normalUserView #env #img img{
  width:150px;
  height:150px;
  border-radius:75px;
}
#normalUserView #env #img{
  display:flex;
  align-items:center;
  justify-content:space-around;
  padding:10px;
  margin-top:10px;
}
#normalUserView #env #img .fa{
  color:rgb(255, 0, 64);
  font-size:x-large;
}
#normalUserView #env #info{
  text-align:center;
}
#normalUserView #env #btm{
  background:rgb(6,6,27);
  box-shadow:1px 1px 10px 0px black;
  width:95%;
  margin:0 auto;
  padding:10px;
  border-radius:10px;
}
#normalUserView #env #info span{
  font-size:large;
  color:rgb(222, 213, 253);
}
#normalUserView #env #following{
  display:flex;
  align-items:center;
   width:100%;
  margin:0 auto;
  flex-flow:row nowrap;
  background:rgb(6,6,20);
  padding-top:5px;
  overflow-y:hidden;
  overflow-x:auto;
  padding-bottom:5px;
}
#normalUserView #env #following #artistF{
width:100px;
height:130px;
text-align:center;
}
#normalUserView #env h3{
  color:rgb(255, 0, 64);
  padding:0px 10px;
}
.fa:hover{
  color:rgb(129, 120, 255) !important;
}
#normalUserView #env #following #artistF span{
  font-size:small;
}
#normalUserView #env #following #artistF img{
  width:98px;
  height:80%;
  border-radius:5px;
}
#normalUserView #back{
  color:rgb(255, 0, 85); 
}
  </style>
  `)
  $("body").append(`
  <div id="normalUserView">
<div id="env">
  <button id="back" class="fa fa-arrow-left"></button>

<div id="img">
 
<span id="message" class="fa fa-comment-o"></span>
<img src="../images/download-4.jpg">
<span id="instagramLink" class="fa fa-instagram"></span>
</div>

<div id="btm">
<div id="info">
<span>loading.....</span>
</div>

<h3>following</h3>
<div id="following">

<div id="artistF">
loading...
</div>

</div>
              
</div> 

</div>
</div>
  `);
  var owner={
  }//loadNormal User loadNormalUser(id);
  
$("#normalUserView #back").click(function(){
  $("#normalUserView").fadeOut(400);
  setTimeout(()=>{
    $("#normalUserView").remove();
    $("#showUserCss").remove();
  },800);
});

  $.post({
    url:myUrl+"server/severActivity.php",
    data:{"action":"loadJustUser","id":id},
    success:function(e){
if(e.search("<br\>")<0 && e.search("<b>")<0 && e!="unrecognised request"){
owner=JSON.parse(e);
}
    },
    error:function(){
      alert("error:unable to get user inforamtion ");
    }
  }).done(function(){
  $("#normalUserView #info span").html(owner.name);
  $("#img img").attr("src",myUrl+"images/"+owner.profileImage);
  $("#normalUserView #img #instagramLink").click(function(){
    function go(){
    href(owner.socialLinks.instgram);
    }
    warning("Are you sure you want to leave this page"," ","Stay","leave",go);
  });

  $("#normalUserView #img #message").attr("messageId",owner.tableName).click(function(){
console.log($(this).attr("messageId"));//chatPage();
  });

$.post({
  url:myUrl+"server/severActivity.php",
  data:{"action":"loadFollowing","tableName":owner.following},
  success:function(e){
    $("#normalUserView #following").html("");
if(e.search("<br/>")<0 && e.search("<b>")<0){
  owner.following=JSON.parse(e);
  setTimeout(() => {
  owner.following.forEach((e)=>{
    $("#normalUserView #following").append(`
        <div ownerId="${e.ownerId}" id="artistF">
          <img src="${myUrl+"images/"+e.profileImage}">
          <span>${e.name.length > 15 ?  e.name.slice(0,15)+'..' : e.name}</span>
          </div>
          `); 
    });
$("#normalUserView #following #artistF").click(function(){
  const id=parseInt($(this).attr("ownerId"));
 showArtist(id,myUrl+"pages/artistProfile.html");
})
  }, 300);
}
else{
  console.log("invalid json");
}
  },
  error:function(){
    console.log("error");
    alert("error: loading infomation error")
  }
})
});
}//user view ends

function getChatTable(name=null,callBack,serverUrl){//name must be in user chatList if not found create
  //onsucess
  //callBack(e)
}

function textToNameFormat(text){
const name=text.split(" ");
var newName="";
name.forEach((e)=>{
  newName+=" "+e.charAt(0).toUpperCase()+e.slice(1,e.length).toLowerCase();
})
return newName;
}

function showLoader2(){
  $("head").append(`<style  id="loaderCss">
    #loader2{
      width:100%;
      height:100%;
      position:fixed;
      display:flex;
      align-items:center;
      justify-content: center;
      background:rgb(6,6,17);
      cursor:progress;
    }

.loader {
  width: 250px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: helvetica, arial, sans-serif;
  text-transform: uppercase;
  font-weight: 900;
  color: #eaebf7;
  letter-spacing: 0.2em;
}
.loader::before, .loader::after {
  content: "";
  display: block;
  width: 15px;
  height: 15px;
  background: #5d42f3;
  position: absolute;
  -webkit-animation: load 0.7s infinite alternate ease-in-out;
          animation: load 0.7s infinite alternate ease-in-out;
}
.loader::before {
  top: 0;
}
.loader::after {
  bottom: 0;
}

@-webkit-keyframes load {
  0% {
    left: 0;
    height: 30px;
    width: 15px;
  }
  50% {
    height: 8px;
    width: 40px;
  }
  100% {
    left: 235px;
    height: 30px;
    width: 15px;
  }
}

@keyframes load {
  0% {
    left: 0;
    height: 30px;
    width: 15px;
  }
  50% {
    height: 8px;
    width: 40px;
  }
  100% {
    left: 235px;
    height: 30px;
    width: 15px;
  }
}
  </style>`);

  $("body").append(`<div id="loader2">
    <div class="loader">Loading...</div>
    </div>
    `);
}
function closeLoader(bg,interVal=300){
 bg=bg<=3 ? bg:3;
const tt=setInterval(()=>{
$("#loader2").css("background","rgba(15,15,17,"+bg+")");
if(bg < 0){
$("#loader2,loaderCss").remove();
clearInterval(tt);
}
bg-=0.1
},interVal);
}

var tableNames="";
var dontLoad=false;
 var oponant={};
function startChat(tableName=null,oponants=null,serverUrl="../server/severActivity.php"){
  var user=setUser("user");
  function getUrl(){
  return serverUrl;
}
function getTable(){
  return tableName;
}
oponant=oponants;
tableNames=tableName;
  $("head").append(`
<style id="chatTableCss">
#messageEnv{
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.6);
  position:fixed;
  display:flex;
  align-items: center;
  justify-content:space-around;
  }
  #env{
    width:100%;
    background:rgb(6,6,17);
    height:100%;
    max-width:700px !important;
    overflow:hidden;
  }
  #env nav{
    padding:4px 4px;
    background:none;
    border-bottom:1px solid rgba(158, 0, 255, 0.488);
    box-shadow:2px -2px 10px 0px black;
  }
  #env nav button{
    float:right;
  color:rgb(255, 0, 55);
  padding:10px 10px;
  }
  #env nav button span{
    padding:3px 10px;
    box-shadow:1px 1px 10px 1px rgb(0, 0, 0);
    border:1px solid rgb(6, 6, 68);
  position:absolute;
  transform:translateX(-44px) translateY(1.3em) translateZ(30px);
  display:none;
  }
  #env nav button span:hover{
  background:rgba(44, 43, 63, 0.733);
  box-shadow:1px 1px 10px 0px rgb(40, 37, 63);
  }
  #env nav button:hover>span{
    display:inline;
  }
  #env nav img{
    width:40px;
    height:40px;
  border-radius:20px;
  border:1px solid black;
  }
  #env #scroll{
    overflow-y:auto;
    width:100%;
    height:80%;
    padding-left:20px;
  }
  #env #chatBody{
    width:90%;
    max-width:600px;
    margin:0 auto;
    padding-bottom:30px;
  }
  #env #chatBody #messageCtn{
    max-width:98%;
  display:flex;
  justify-content:flex-start;
  margin:0 auto;
}
  #env #chatBody .user{
  justify-content:flex-end !important;
  padding-right:23px !important;
  
  }
  #env #chatBody .user span{
    background:rgb(8, 8, 100) !important;
    border:none;
    box-shadow: none !important;

  }
  #env #chatBody #messageCtn span{
  box-shadow:0px 0px 1px 0px #ffffff;
  padding:10px 10px;
  border-radius:15px;
  max-width:60%;
  word-break:break-word;
  background:black;
  }
  @media screen and (min-width:450px){
    #env{
      width:90%;
      height:90%;
    }
  }
  #messageInputBody{
  width:100%;
  padding:10px 10px;
  background:rgb(0,0,0,0.9);
  border-top:1px solid rgb(255, 0, 76);
  display:flex;
  align-items:center;
  justify-content:flex-end;
  position:fixed;
  bottom:0;
  }
  #messageInputBody #inputCt{
  padding:5px 10px;
  }
  #messageInputBody #inputCt textarea{
  background:rgba(3,16,3,0.3);
  border:1px solid rgb(43, 33, 87);
  padding:5px 10px;
  border-radius:20px;
  height:20px;
  }
  #messageInputBody #inputCt button:hover{
  color:rgb(255, 0, 106);
  }
  #messageInputBody #inputActions button:hover{
    color:rgb(17, 0, 255);
  }
  #env #chatBody #messageCtn i{
    color:rgb(253, 131, 178);
  font-size:x-small !important;
  transform:translateX(0px) translateY(1em) translateZ(30px);
  display:inline-block;
  }
  #env #chatBody #messageCtn #audioCtn{
  width:200px;
  height:30px;
  background:rgb(50, 0, 57);
  display:flex;
  justify-content:space-around;
  border-radius:10px;
  padding:10px 10px;
  align-items:center;
  }
  #env #chatBody #messageCtn #audioCtn #durLenCt{
  background:rgb(100, 96, 161);
  height:10px;
  width:50%;
  display:flex;
  align-items:center;
  justify-content:flex-start;
  padding:0px 4px;
  }
  #env #chatBody #messageCtn #audioCtn img{
  width:30px;
  height:30px;
  border-radius:15px;
  }
  #env #chatBody #messageCtn #audioCtn #durLenCt #dur{
    width:0;
    height:40%;
    overflow:visible;
    display:flex;
    justify-content:flex-end;
    align-items:center;
    background:black;
    padding-left:10px;
  }
  #env #chatBody #messageCtn #audioCtn #durLenCt #dur button{
    width:0px;
    height:7px;
    border-radius:3.5px;
    background:white;
  }
  #env #chatBody #messageCtn #audioCtn .fa{
    color:rgb(214, 218, 255);
    font-size:large;
  }
  #env #chatBody #messageCtn #audioCtn .fa:hover{
    color:rgb(9, 9, 199);
  }
  #messageCtn img{
    max-width:60%;
    max-height:140px;
    border-radius:10px;
  }
  </style>
`)
$("body").append(`
<div id="messageEnv">
<div id="env">
<nav>
  <div>
<img src="../images/download-1.jpg"><span id="name">Austine Samuel</span>
<button id="back" class="fa fa-ellipsis-v"><span>Back</span></button>
  
</div>
 </nav>
<div id="scroll">
<div id="chatBody">

  <div style="width:100%;;display:flex;align-items:center;justify-content:center"><div><span class="fa fa-spiner" style="font-size:xx-large"></span<br>Loading...</div></div>

    </div>
    
</div></div>

</div>
  </div>

  
<div id="messageInputBody">
  <div id="inputActions">
    <button id="sendVoice" class="fa fa-microphone"></button>
    <button id="sendFile"><label for="chatFile" class="fa fa-file"></label></button>
    <button id="sendLike" class="fa fa-thumbs-up"></button>

    <form action="${serverUrl}" enctype="multipart/form-data" method="post">
      <input type="file" onchange="checkChange()" id="chatFile" name="file" hidden>
      <input type="text" name="action" value="uploadSong" id="actions" hidden>
      </form>
      
  </div>
  
  <div id="inputCt">
     <textarea type="text" placeholder="type message" id="data"></textarea>
     <button id="sendNow" class="fa fa-send">send</button>
    </div>
  </div>
  <audio/>
`);
/*var prevChat=[
  {"owner":"nameANdId",
  "seen":"1",
  "message":{"type":"text","content":"hello"},
  "date":"date"
  },
  {"owner":"nameANdId",
  "seen":"1",
  "message":{"type":"audio","content":"sample.m4a"},
  "date":"date"
  },
  {"owner":"me",
  "seen":"1",
  "message":{"type":"text","content":"can you help me solve one bug on my code bro"},
  "date":"date"
  },
  {"owner":"name+ID",
  "seen":"1",
  "message":{"type":"image","content":"download-3.jpg"},
  "date":"date"
  }
  ]//after load*/
  dontLoad=false;
   function loadAll(){
    $.post({
url:serverUrl,
data:{"action":"loadChatContent","tableName":tableName},
success:function(e){
  if($("#inputCt textarea").val()=="" && dontLoad == false){
  loadPrevChat(JSON.parse(e));
  }
  $("nav img").attr("src","../images/"+(oponant!=null ? oponant.image:""));
  $("nav #name").html(oponant!=null ? oponant.name:"private name");
  $("nav img,nav #name").click(function(){
   oponant.isArtist!=undefined ? oponant.isArtist !="false" ? "":showUser(oponant.id):message("can't load this user informations");
  })
},
error:function(){
  alert("error:connection fail")
}
  });
  if(!dontLoad){
  keepChecking=setTimeout(() => {
   loadAll();
  }, 10000);
}
}

loadAll();

    const messageElement=$("#messageEnv #chatBody .user").last().children("span");
    clickImageViewer();
    $("#inputCt textarea").on("keyup",function(e){
      var data=$(this).val().length;
     if(data==23||e.keyCode==13){
        $(this).css("height",$(this).height()<100 ? $(this).height()+20:100);
     }
   else if(data<23 && $(this).val().search("\n")<0){
      $(this).css("height","20px");
   }
   
     else if(data==65){
      $(this).css("height",$(this).height()<100 ? $(this).height()+20:100);
     }
    })

    $("#inputCt #sendNow").click(function(){
      if($("#inputCt textarea").val().length>0){
      const data=`<br>
      <div class="user" ownerId="${user.songs != undefined ? user.id:user.id+"a"}" id="messageCtn">
      <span class="message">${$("#inputCt textarea").val()}
      </span>
      </div>`;
      if(data.length>0 && data!=" "){
    $("#messageEnv #chatBody").append(data);
  $("#inputCt textarea").val("").css("height","20px");
  const messageElement=$("#chatBody .user").last().children("span");
  onChatProgressSaveMsg(data,tableName,messageElement,null)
  }
}
else{
  message("type message");
  $("#inputCt textarea").val("").focus();
}
    });
  
  
    $("#inputActions #sendLike").click(function(){
      const data=`
      <br>
      <div ownerId="${user.songs != undefined ? user.id:user.id+"a"}" class="user" id="messageCtn">
      <span class="message" style="background:none !important">
  <cite class="fa fa-thumbs-up" style="font-size:xx-large"></cite>
        </span>
      </div>
      `;
      $("#chatBody").append(data);
      $("#inputCt input").val("");
      onChatProgressSaveMsg(data,tableName,messageElement,null);
    });
    
 $("#messageEnv #back").click(function(){
    //  $("#messageEnv").fadeOut(400);
      dontLoad=true;
      clearTimeout(keepChecking)
      setTimeout(() => {
        window.location.replace(window.location);
       // $("#messageEnv,#messageInputBody").remove();
      //  $("#chatTableCss").remove();
      }, 700);
    })
 }
 var keepChecking=undefined;
function audioActions(){
  const audio=document.querySelector("body audio");
var playBtn=false;
$("#messageCtn #audioCtn #play").click(function(){
  audio.src="../songs/"+$(this).attr("url").toString();
  const that=$(this);
let count=0;
if(!playBtn){
const playB=setInterval(()=>{
  count++;
  if(audio.readyState>=1){
    audio.play();
that.attr("class","fa fa-pause");
playBtn=true;
dontLoad=true;
audio.addEventListener("timeupdate",()=>{
  that.siblings("#messageEnv #durLenCt").children("#messageEnv #dur").css("width",audio.currentTime/audio.duration*100+"%");
  if(audio.paused){
    that.attr("class","fa fa-play");
    playBtn=false;
    dontLoad=false;
  }
},true);
clearInterval(playB);
  }
  else{
    message("audio is loading");
  }
  if(count>5){
    clearInterval(playB);
    message("play  fail please try again ");
  }
 
},1000);
}
else{
    that.attr("class","fa fa-play");
playBtn=false;
audio.pause();
dontLoad=false;
}
});
}
function checkChange(){
  var user=setUser("user");
  var tableName=tableNames;
  const extnSong=[".wav",".mp3",".m4a",".ogg"];
  const extnImg=[".png",".jpeg",".jpg"];
  const file=$("#inputActions form #chatFile").val().toLowerCase();
  const fileExtn=getExtn(file);
  if(extnSong.includes(fileExtn)){
    getQr("#inputActions form #actions").value="uploadSong";
  function yesSend(){
  uploadFile($("#inputActions form"),"../server/severActivity.php",done)
  function done(url){
 data=`
  <br>
    <div class="user" ownerId="${user.songs != undefined ? user.id:user.id+"a"}" id="messageCtn">
  <span class="message" style="box-shadow:none;background:none !important">
<div id="audioCtn">
<cite url="${url}" id="play" class="fa fa-play"></cite>
<div id="durLenCt"><div id="dur"><button></button></div></div>
<img src="../images/${user.profileImage}"alt="loading">
    </span><a href="../songs/${url}" target="_blank" download><button class="fa fa-download"></button></a>
  </div>`;
const messageElement=$("#messageEnv #chatBody .user").last().children("span");
  onChatProgressSaveMsg(data,tableName,messageElement,audioActions);
$("#chatBody").append(data);
}
}
warning("You are sending song to <b>"+oponant.name+"</b> ?"," ","cancel","Yes",yesSend)
  }
  if(extnImg.includes(fileExtn)){
    $("#inputActions form #actions").val("uploadImage");
    function SendImage(){
     uploadFile($("#inputActions form"),"../server/severActivity.php",done);
    function done(url){
    data=`
    <br>
    <div class="user" ownerId="${user.songs != undefined ? user.id:user.id+"a"}" id="messageCtn">
      <img alt="image" src="../images/${url}">
  </div>
  `
$("#messageEnv #chatBody").append(data);
     const messageElement=$("#messageEnv #chatBody .user").last().children("span");
     onChatProgressSaveMsg(data,tableName,messageElement);
    }
}
  warning("you are sending image to <b> "+oponant.name+" </b>? "," ","Cancel","Ok",SendImage);
  }
 if(!extnImg.includes(fileExtn) && !extnSong.includes(fileExtn)){
message("can't upload such file please  choose image with (.jpeg .png .jpg) extensions and song with (.wav .mp3 .ogg .m4a ) extensions",5000,300);
  }
}




 function notificationViewer(notifications,myUrl="",callBack=null){
   $("head").append(`
<style id="notificationCss">   
  #notificationPage{
    width:100%;
    height:100%;
  position:fixed;
  align-items:cente;
  justify-content:center;
  display:flex;
  background:rgb(0,0,0,0.7);
  }
  #notificationPage #mainBody{
  width:100%;
  height:100%;
  max-width:600px;
  max-height:700px;
  background:rgb(15,15,17);
  border-radius:5px;
  }
  
  #notificationPage header{
    display:flex;
    width:90%;
    margin:0 auto;
    align-items:Center;
    justify-content:space-between;
  padding:20px 10px;
  background:black;
  }
  #notificationPage header span{
    color:rgb(22, 22, 250);
  }
  #notificationPage header .fa{
    color:rgb(255, 0, 64);
  }
  #notificationPage header button:hover{
    color:rgb(185, 148, 233);
  }
  #notificationPage #notificationBody{
    width:100%;
    padding-top:20px;
   }
   #notificationPage #scrollBodyN{
    overflow-y:auto;
    height:87%;
    width:100%;
   }
  #notificationPage #notificationBody #notification{
    width:90%;
  margin:0 auto;
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:10px 10px;
  box-shadow:1px 1px 5px 0px black;
  background:rgb(8, 6, 27);
  margin-top:3px;
  }
  #notificationPage #notificationBody #notification:hover{
  box-shadow:none;
  border-radius:10px;
  background:rgb(2, 1, 10);
  
  }
  #notificationPage #notificationBody #notification #imgN{
    width:20%;
    height:50px;
  max-width:60px;
    border-radius:5px;
  }
  #notificationPage #notificationBody #notification #infoN{
  width:80%;
  padding:10px;
  cursor:pointer;
  }
  #notificationPage #notificationBody #notification #nameN:hover{
    color:#bbaaff !important;
  }
  #notificationPage #notificationBody #notification .fa{
    color:rgb(81, 51, 253);
    padding:0px 10px;
  }
  #notificationPage #notificationBody #notification #del{
    color:rgb(255, 0, 64);
  }
  #notificationPage #notificationBody #notification #del:hover>span{
    display:inline;
  }
  #notificationPage #notificationBody #notification #del span{
    padding:3px 20px;
    background:rgb(55, 50, 100);
    text-align:center;
    border-radius:5px;
    display:none;
  }
  #notificationPage #notificationBody #notification #del span:hover{
  background:rgb(255, 0, 85);
  }
  #notificationPage #notificationBody #notification #infoN #nameN{
  font-weight:10px;
  font-family:Arial, Helvetica, sans-serif;
  color:rgb(255,255,255);
  }
  #notificationPage #notificationBody #notification #infoN #textN{
    color:rgb(214, 193, 253);
  }
  </style>
   `);
   $("body").append(`
   <div id="notificationPage">
<div id="mainBody">

<header>
<span>Notifications </span>
<button id="back" class="fa fa-ellipsis">Back</button>
</header>

<div id="scrollBodyN">
<div id="notificationBody">
</div>
</div>

  </div>
</div>
   `)
  notifications.reverse().forEach((e)=>{
  $("#notificationPage #notificationBody").append(`
  <div notificationId="${id}" ownerId="${e.ownerId}" isArtist="${e.isArtist}" pageInfo="tableName" id="notification">
    <img id="imgN" src="${myUrl}images/${e.ownerImage}">
  <div  notificationId="${id}" ownerId="${e.ownerId}" isArtist="${e.isArtist}"  img="${e.ownerImage}" id="infoN">
  <span  notificationId="${id}" ownerId="${e.ownerId}" isArtist="${e.isArtist}"  img="${e.ownerImage}" id="nameN">${e.ownerName}<i class="fa fa-caret-right"></i></span><br>
  <span id="textN">${e.text} </span>
  </div>
  <button class="fa fa-ellipsis-v"><br><br>
  </button>
  </div>
  `)
  });
  $("#notificationPage #notificationBody #textN").click(function(){
    if(!$(this).html().includes("following")){
  var dataInfo=$(this).children("b").attr("info").toString();
  var artistId=dataInfo.slice(0,dataInfo.indexOf("#"));
  var songId=dataInfo.slice(dataInfo.indexOf("#")+1,dataInfo.langth);
  var isComment=$(this).html().includes("commented");
  var passArr=isComment ? [artistId,songId,""]:[artistId,songId];
localStorage.setItem("notification111Music",JSON.stringify(passArr));
setTimeout(()=>{
  href(window.location.toString(),"_self");  
},10);
    }
    else{
      message("click on the name to view this user");
    }
})
  $("#notificationPage #notificationBody #notification #del").click(function(){
  function go(){
  console.log("delete function should be called here")
  }
  warning("Are you sure you want to delete this record?","<b>Note</b> thid record will be parmanantl deleted","No","Yes",go);
  });
  
  $("#notificationPage #back").click(function(){
    $("body #notificationPage").fadeOut(400);
    setTimeout(()=>{
      $("body #notificationPage").remove();
    },600);
  });
  $("body #notificationPage #nameN").click(function(){
    const isArtist=$(this).attr("isArtist");
    const id=parseInt($(this).attr("ownerId"));
   // if((userIsArtist && isArtist=="true" || !userIsArtist && isArtist !="true" ?  user.id!=id:true)){
    if(isArtist=="true"){
function go(){
  showArtist(id)
}
 warning("do you really want to leave this page?","viewing this user might take to another webpage ","NO","YES SURE",go);
}
else{
showUser(id,"");
}
  // / }
    //else{
//     message("is your self Notification !");
 //   }
  })
 }
 
function showArtist(id,myUrl="pages/artistProfile.html"){
  localStorage.setItem("1200ArtistId",id);
  setTimeout(() => {
    href(myUrl,"_self");
  }, 1000);
}


function deleteSongDb(id){
const song=artist.songs[id];
artist.songs.splice(id,1);
if(song!=undefined){
  $.post({
    url:"../server/severActivity.php",
    data:{"action":"deleteSongDb","tableName":artistInfo.songsTable,"id":song.id,"comment":song.comments},
    success:function(e){
      message(e);
      deleteFile("../images/"+song.image,done);
      function done(){
        deleteFile("../songs/"+song.link);
      }
    },
    error:function(){
      alert("error : fail to remove song");
    }
  });
}
}
 function webAction(){
let Src=localStorage.getItem("webAction");
if(Src!=null && Src!=undefined){
  return Src;
}
else{
return false;
}
 }
function checkIfChatExist(opoNantList,userTableName,callBack,myUrl="../server/severActivity.php") {
  $.post({
url:myUrl,
data:{"action":"loadMessagesList","tableName":opoNantList},
success:function(e){
//console.log(e);
if(e.search("]") > -1){
opoNantList=JSON.parse(e);
var found=false;
opoNantList.forEach((e)=> {
  userTableName.forEach(element=> {
      if(element.tableNames==e.tableNames){
           found=e;
         }
  });
});
callBack(found);
}
}
  })
}

  
function showFans(startUrl="../"){
  $("head").append(`
  <style id="fansStyle" >
    #fans{
      width:100%;
      height:100%;
      position:fixed;
      background:rgba(0, 1, 49, 0.404);
      display:flex;
      align-items:center;
      justify-content:center;
    }
  
    #envFans{
      width:100%;
      max-width:700px;
      height:100%;
      margin:0 auto;
      background:rgb(6,6,20);
      border-radius:10px;
      overflow:hidden;
    }
    #fansNav{
      width:95%;
      display:flex;
      align-items:center;
      justify-content:space-between;
      margin:0 auto;
    }
    button,input,textarea{
      border:none;
      background:none;
      outline:none;
    }
    #fansNav img{
      width:40px;
      height:40px;
      border-radius:20px;
    }
    #fansCtn{
      width:98%;
     height:400px;
      margin:0 auto;
      overflow-y:auto;
      padding-right:30px;
      margin-left:15px;
    }
     #fansCtn #append{
       padding-bottom:30px;
              }
              #fansCtn #personF{
                width:90%;
                border-bottom:1px solid rgb(64, 0, 124);
                padding:10px;
                display:flex;
                justify-content:space-between;
                margin:0 auto;
                transition:all;
                transition-duration:500ms;
              }
              #fansCtn #personF:hover{
        background:rgb(58, 39, 75);
              }
    #fansCtn #personF .fa{
      color:rgb(135, 83, 255);
    }
    #fansCtn #personF img{
      width:40px;
      height:40px;
      border-radius:20px;
    
    }
    .fa{
      color:rgb(247, 8, 88);
    }
    #name{
      cursor:pointer;
      padding:10px;
    }
     #name:hover{
       color:rgb(255, 105, 155);
     }
  
  </style>
  `)
  
  $("body").append(`
  <div id="fans">
    <div id="envFans">
  <nav id="fansNav">
  
  <div id="imgF"><img src="${startUrl}images/${artist.profileImage}"><span>${artist.artistName} </span> <i class="fa fa-caret-right"></i> Fans</div>
  
  <button id="backFans">back</button>
  </nav>
  <hr style="border:none; border-top:1px solid #c1c1e2">
  
  <div id="fansCtn">
  <div id="append">
  
  <div id="personF">
  <div>
  <img src="images/1f03972b7d72b1f.jpg"><span id="name">Austine samuel</span>
  </div>
  <button class="fa fa-ellipsis-v"></button>
  </div>
  
  </div>
  </div>
  
    </div>
  </div>
  `);
  let fansObject=artist.followers;

  function loadUsers(){
    $("#fansCtn #append").html(" ");
  fansObject.forEach((e)=>{
  $("#fansCtn #append").append(`
  <div id="personF" isArtist="${e.isArtist}" originalId="${e.originalId}" email="${e.email}">
  <div>
  <img src="${startUrl+"images/"+e.image}"><span id="name">${e.name}</span>
  </div>
  <button class="fa fa-ellipsis-v"></button>
  </div>
  `);
  $("#fansCtn #append #personF").click(function(){
  const id=$(this).attr("originalId");
  const isArtist=$(this).attr("isArtist")!="1" ? false:true;
  $(this).click(function(){});
  if(isArtist){
  //warning("are you sure you want to leave this page ?","this action might take you to another page","No","Yes",go);
  //function go(){
  showArtist(id,window.location.toString());
  //}
  }
  else{
  showUser(id);
  }
  })
  });
  $("#fans #backFans").click(function(){
  $("#fans").hide(200);
  setTimeout(()=>{
   $("#fans").remove();
  },300);
  })
  }
  const user=setUser("user")
  loadUsers();
  }
  