var user=setUser("user");
/*function openMenu(){
  $("#menuContent").fadeIn(100).children("#content").css("height","0px");
  setTimeout(() => {
    $("#menuContent").children("#content").animate({height:"300px"},200);
  }, 10);
  }

  function closeMenu(){
    $("#menuContent").children("#content").animate({height:"0px"},200);
   setTimeout(() => {
    $("#menuContent").fadeOut(100);
  }, 1010);
}
*/
//activities user actions
$("#openMenu img").attr("src","images/"+user.profileImage).click(function(){
  if(user.songs!=undefined){
    href("pages/mainProfile.html");
  }
})
 link="";
const actions=(dur=200)=>{
  if(act.viewPageA==true){
    $("#homePage").fadeIn(dur);
    $(".backToHome span").html("Music")
    //some artist loads 
  }
  else if(act.viewPageA==false){
$("#homePage").fadeOut(dur);
$(".backToHome span").html("Back");
  }

if(act.viewPageB==true){
  $("#songsPage").fadeIn(dur);
    //some artists names loads
}
else if(act.viewPageB==false){
  $("#songsPage").fadeOut(dur);
}


  if(act.viewArtistPage==true){
    $("#artistBody").fadeIn(dur);
    //load artist function
    //load all artist function
  }
  else if(act.viewArtistPage==false){
    $("#artistBody").fadeOut(dur);
  }

  if(act.viewFevoritesPage==true){
    $("#fevoritesBody").fadeIn(dur)
  }
  else if(act.viewFevoritesPage==false && act.viewTracksPage != true){
    $("#fevoritesBody").fadeOut(dur);
  }
  if(act.viewTracksPage==true){
    $("#fevoritesBody").fadeIn(dur);
     //load all tracks
  }
  else if(act.viewTracksPage==false && act.viewFevoritesPage!=true){
    $("#fevoritesBody").fadeOut(dur);
   }
  if(act.viewPlayerPage==true){
$("#playerPage").fadeIn(dur);
  }
else if(act.viewPlayerPage==false){
$("#playerPage").fadeOut(dur);
}

//end
if(act.viewSongList==true){
  $("#songList").fadeIn(dur);
    }
  else if(act.viewSongList==false){
  $("#songList").fadeOut(dur);
  }
//end
if(act.viewComment==true){
  $("#viewer").fadeIn(dur);
  viewComment(crntSongComments);
    }
  else if(act.viewComment==false && act.viewSharePage !=true && act.viewEditPage !=true){
  $("#viewer").fadeOut(dur);
  }
//end
if(act.viewBottomPlayer==true){
  $("#bottomPlayer").fadeIn(dur);
    }
  else if(act.viewBottomPlayer==false){
  $("#bottomPlayer").fadeOut(dur);
  }
  else{
  alert("invalid command");
  }
//end
if(act.viewSharePage==true){
  $("#viewer").fadeIn(dur);
  const shareHtml=`<h3 id="headingS">Share <i>${crntSong.title}</i></h3>
<div id="sharePage">
<a target="_blank"
href="https://www.facebook.com/dialog/feed?app_id=1112720722574358&amp;
link=${link}&amp;
picture=${crntSong.image}&amp;
description=new ${crntArtist.artistName} song &amp;
name=9MusicLife&amp;
redirect_uri=${link}">
  <div class="shareFacebook" id="box">
    <button class="fa fa-facebook"></button><br>
    <span>Facebook</span>
  </div></a>

  <a target="_blank" data-text="" href="whatsapp://send?text=hey check New 
  ${crntArtist.artistName} song very nice song ${link}">
  <div class="shareWhatsapp" id="box">
    <button class="fa fa-whatsapp"></button><br>
    <span>whatsApp</span>
  </div></a>
 
  <a target="_blank" href="https://twitter.com/share?url=check ${crntArtist.artistName} song ${link}">
  <div class="shareTwitter" id="box">
    <button class="fa fa-twitter"></button><br>
    <span>Twitter</span>
  </div></a>

  <div onclick="message('share unavailable please use Facebook or WhatsApp to share this song',2000,200)"class="shareEmail" id="box">
    <button class="fa fa-envelope-o"></button><br>
    <span>Email</span>
  </div>

  <div class="copy" id="box">
    <button class="fa fa-clone"></button><br>
    <span>Copy Link</span>
  </div>

</div>
`;

viewerContent.html(shareHtml);
$(".copy").click(function(){
  copy(link);
})
    }
  else if(act.viewSharePage==false && act.viewComment !=true && act.viewEditPage != true){
  $("#viewer").fadeOut(dur);
  }
//end
if(act.viewHomePage==true){
  $("#homePage").fadeIn(dur);
    }
  else if(act.viewHomePage==false){
  //$("#viewer").fadeOut(dur);
  }
//end
if(act.viewEditPage==true){
  $("#viewer").fadeIn(dur);
  viewerContent.html(editHtml);
    }
  else if(act.viewEditPage==false && act.viewSharePage !=true && act.viewComment!=true){
  $("#viewer").fadeOut(dur);
  }
//end
}
//ends activities handling





let isPlayPause=false;
let checkP=false;
const audio=document.querySelector("audio");
const editHtml=`
<div id="volume">
  <span>volume<i id="percentage">10%</i></span>
  
  <div id="volumeDur">
 <div id="addSection">
 <button id="rmv" class="fa fa-minus"></button>   <div id="dur"></div>
</div>
 <button id="add" class="fa fa-plus"></button>
  </div>
<br>
  <div id="boxs">
    <div id="box"><i class="fa fa-check"></i></div>
    <div id="box"></div>
    <div id="box"></div>
    <div id="box"></div>
    <div id="box"></div>
    <div id="box"></div>
  </div>

</div>
`;
const viewerContent=$("#viewer #contents");
//onload=()=>{
  let crntSong={
    "id":2,
    "link":"songs/song (4).mp3",
    "image":"images/donwload-7.jpg",
    "title":"you the one",
    "viewer":33,
    "download":12,
    "date":"12nth feb 2020",
    "like":10,
    "comments":["wow this is cool","i love your floor","can we make song together?","this is awesome"],
  };
let songs=null;
//test songs
function loadList(arr=songs){
  $("#songList #appendList").html("");
  let t=arr.length>1 ? "Tracks":"Track";
  $("#listTracksLen").html(arr.length+ ""+t);
  
arr.forEach(function(e,i){
  if(e.link!=undefined){
  $("#songList #appendList").append(`
  <div class="songsPlay" dl="${e.link}"  style="box-shadow:none !important; background:none; padding:5px 5px !important;" songId="${parseInt(i)}" id="newSong">
  <img src="images/${e.image}">
  <div  id="songName">
   <span id="title"> ${e.title!="none" ? e.title:"Music Hub Song"}</span><br>
   <span id="date">uploaded:${e.date}</span>
  </div>
  <button class="fa fa-ellipsis-v"></button>
</div>
  `);
  }
})
$("#newSong .fa").click(function(){
  download($(this).parent().attr("dl"));
});

if(searchFollow(crntArtist)){
$("#artist #addFollow").css("background","").html("following");
}
else{
  $("#artist #addFollow").css("background","blue").html("follow");
}
arr.length< 1 ? $("#songList #appendList").append(`
  <h4 style="text-align:center; width:100%; color:#aaaaaf">${crntArtist.artistName} songs <i>Nothing found!</a>  </h4>`):""
}
///loadList(songs);
//end test
//seach function 
function search(inputValue=$("#searchInput").val(),includeServer=false){
if(includeServer==false){
  if(act.viewPageB==true){
  const newSongList=songs.filter(function(e){
    return e.title.toUpperCase().search(inputValue.toUpperCase()) > -1;
   });
  loadList(newSongList);
}
if(act.viewPageA==true){
  if(act.viewFevoritesPage==false && act.viewTracksPage==false){
  const newSongList=allArtist.filter(function(e){
    return e.artistName.toUpperCase().search(inputValue.toUpperCase()) > -1;
});
loadTopArtist(newSongList);
loadArtistToFollow(newSongList);

const newSongListMine=topArtist.filter((e)=>{
  return e.artistName.toUpperCase().search(inputValue.toUpperCase()) > -1;
})
loadTopArtistArr(newSongListMine);
}
else{
  if(act.viewFevoritesPage==true){
  const fevSongsList=fev.songs.filter(function(e){
    return e.title.toUpperCase().search(inputValue.toUpperCase()) > -1 || e.artist.toUpperCase().search(inputValue.toUpperCase()) > -1;
});
loadTracks(fevSongsList)
  }
  if(act.viewTracksPage==true){
const tracksList=tracks.songs.filter(function(e){
  return e.title.toUpperCase().search(inputValue.toUpperCase()) > -1 || e.artist.toUpperCase().search(inputValue.toUpperCase()) > -1;
});
loadTracks(tracksList);
  }
}//end if and else 
}
clickSong();
}
}
$("#searchInput").on("keyup",function(){
  search();
})
//end search function
function playBack(type="playOnce", end=false){
isPlayPause=true;
  if(end==false){
    play=false;
    clearInterval(animate);
    stopLoadStyle();
  if(type=="playOnce"){
    audio.pause();
    audio.currentTime=0;
  }
  else if(type=="playNext"){
    increementSong();
    play=false;
  }
  else if(type=="playRepeat"){
    play=false;
  }
  else if(type=="playPrev"){
    decreementSong();
    play=false;
  }
  else{
    message("Wong Command",1000,100);
  }
 }
else{
  audio.pause();
  audio.currentTime=0;
}
audio.src="songs/"+crntSong.link;
loadComments(editSongText)
playNow(1000)
}



function increementSong(){
  if(act.songPlaying < songs.length -1){
    act.songPlaying=act.songPlaying+1;
  }
  else{
    act.songPlaying=0;
  }
  crntSong=songs[act.songPlaying];
  audio.src="songs/"+crntSong.link;
play=false;
}

function decreementSong(){
    if(act.songPlaying>0){
      act.songPlaying=act.songPlaying-1;
    }
    else{
      act.songPlaying=songs.length -1;
    }
    crntSong=songs[act.songPlaying];
    audio.src="songs/"+crntSong.link;
    play=false;
}
function playNow(durA=1000){
  playerAndLyrics(true);
  let checker=0;
 const checkSong=setInterval(() => {

if(audio.readyState<1){
    message("song is loading..");
   if( checker > 5){
      message("Song fail to load please try again",5000,500);
      clearInterval(checkSong);
      }
   checker++;
  }
  else{
     clearInterval(checkSong);
   if(play==false && audio.readyState>=1){
    loadComments(editSongText)
    $("#playerPage #playPause,#crntPlay #playPause").attr("class","fa fa-pause");
    audio.play();
     dur(); 
      startLoadStyle()
     play=true;
  }
  else{
    audio.pause();
    stopLoadStyle();
     clearInterval(animate);
  $("#playerPage #playPause,#crntPlay #playPause").attr("class","fa fa-play");
      play=false;
  }
}
 },durA);
}

$("#songsPage #artist img,#songsPage #artist #artistName").click(function(){
  warning("Do you really want to leave this page","viewing this user profile might take you to another page click yes if you want to leave !","No","Yes",done);
function done(){
  showArtist(crntArtist.id);

}

})
function editList(){
   $("#songsPage #artist #artistName").html(crntArtist.artistName);
  if(crntArtist!=null){///this code looks useless bcs it kust load music player image if user player isnt available
  $("#songsPage #artist img").attr("src","images/"+crntArtist.profileImage);
  }
else{$("#songsPage #artist img").attr("src","images/"+crntSong.image);}
}//end the code here
$("a,button a").click(function(){
  const link=$(this).attr("link");
function done(){
  href(link,"_self");
}
warning("Are you sure you want to leave this page?","if you click yes you might lost the current song you are playing and you will be redirected to another web page ","No","Yes Sure",done);
})
function editSongText(){
  edited=true;
  $("#playerPage #songPlayingName").html(crntSong.title.length<30 ? crntSong.title :crntSong.title.slice(0,30)+"...");
  $("#playerPage #songPlaying").html(crntSong.title.length<30 ? crntSong.title :crntSong.title.slice(0,30)+"...");
  $("#playerPage #img #rImage").css("background-image","url('images/"+crntSong.image+"')");
  $("#playerPage #songComment span").html(crntSongComments.length);
  $("#playerPage #songViews span").html(crntSong.viewer);
  $("#playerPage #songDownloads span").html(crntSong.download);
  $("#playerPage #songStars span").html(crntSong.likes);
  $("#crntPlay #info #songName").html(crntSong.title!="none" ? crntSong.title.length>15 ? crntSong.title.slice(0,12)+"...."+"<br><small>"+crntSong.artist+"</small>" : crntSong.title+"<br><small>"+crntSong.artist+"</small>":"music hub player");
$("#crntPlay #img,#playerPage #lyrics").css("background-image","url('images/"+crntSong.image+"')");
$("#playerPage #lyrics #lyricsContent").html(crntSong.lyrics != null && crntSong.lyrics !="none" ? crntSong.lyrics:" No Lyrics ");
$("#playerPage #lyrics #songName").html(crntSong.title!="none" ? crntSong.title+" <i style='font-size:x-small'>lyric</i>" :"Music Hub Lyrics");
  $(".songsPlay").each(function(e){
    if(parseInt(e+1) == crntSong.id){
      $(this).css("background-image","url('images/download-8.jpg')");
    }
    else{
    $(this).css("background-image","");
    }
  });  
  if(searchSong(crntSong,fev.songs)){
    $("#fevClick,#crntPlay #playArea #download").attr("class","fa fa-heart").css("color","red")
  }
  else{
    $("#fevClick,#crntPlay #playArea #download").attr("class","fa fa-heart-o").css("color","")
  }
  }
//bottom menu page
const page={
  aOpen:true,
  bOpen:false,
  Close:false,
  }
  function closePage(viewer=$("#viewer")){
    if(page.aOpen==true){
  viewer.css("height","60%").css("#background","rgba(0,0,0,0.6");
  $("#viewAll").attr("class","fa fa-angle-up");
    }
  if(page.bOpen==true){
    $("#viewAll").attr("class","fa fa-angle-down");
    viewer.css("height","97%").css("#background","rgba(0,0,0,0.10");
  }
  if(page.Close==true){
    $("#viewAll").attr("class","fa fa-angle-up");
    viewer.css("height","0%").css("#background","rgba(0,0,0,0.6");
    setTimeout(() => {
    viewer.fadeOut(100);
    }, 1000);
  }
  }
  function searchComment(id=null){
if(id!=null){
 const result=crntSong.comments[id];
 return result;
}
  }
  function fevorites(element){
    if(!searchSong(crntSong,fev.songs)){
      saveFevorite(findArtist(crntArtistServer).songs,done);
function done(){
      fev.songs.push(crntSong);
      element.attr("class","fa fa-heart").css("color","red");
      message("song :<b>"+(crntSong.title!="none" ? crntSong.title:"")+" </b>successfully added to fevorites list",3000,300)
}
    }
    else{
        message("song :(<b>"+(crntSong.title!="none" ? crntSong.title:"")+"</b> )is already in your fevorites list",3000,300)
     }
     }
    
  //bottom menu page
let animate=null;
let width=0;
   let startMins=0;
  let startSecs=0;
$("#userTimer").on("change",function(){
  startMins=0;
audio.currentTime=$(this).val();
startSecs=0;
let i;
for(i=0; i < Math.floor($(this).val()); i++){
  if(startSecs >= 60){
startSecs=0;
startMins+=1;
  }
  startSecs+=1;
}
});
function dur(audioLen="nothing"){
   $("#durTimer #startCount").html(startMins+":"+startSecs);
   //let countDur=0;
   $("#userTimer").attr("max",audio.duration);
    animate=setInterval(()=>{
      let lenDur=audio.duration-5;
      let currentTime=audio.currentTime;
      if(startSecs >= 60){
        startSecs=0;
        startMins+=1;
      }
         
    $("#userTimer").val(currentTime);
    $("#playerPage #durCount #dur,#bottomPlayer #durCount #dur").css("width",width+"%");
    $("#durTimer #startCount").html(Math.ceil(startMins)+":"+Math.ceil(startSecs));
if(audio.paused||audio.ended){
  edited=false;
  clearInterval(animate);
  stopLoadStyle();
  width=0;
  startMins=0;
  startSecs=0;
$("#playerPage #playPause,#crntPlay #playPause").attr("class","fa fa-play");
$("#durCount #dur").css("transition-duration","0ms").css("width","0%");
audio.currentTime=0;
//here repeat function should be called
if(isPlayPause){
  if(checkP){
playBack("playNext");
  }
  else if(!checkP){
    playBack("playRepeat");
  }
  else{
    message("out of callback range",1000,400)
  }
 }
else{
  playNow(500);
}
}
   startSecs+=1;
   width=currentTime/lenDur*100;
   !edited ? editSongText():"";
  },1000);
}
function searchLikes(object,name=crntSong.comments.likes,findId=false){
  let result=false;
  let id=undefined;
name.forEach((e,i)=>{
if(e.name==object.name && e.id==object.id && e.image==object.image){
  result=true;
  id=i
}
});
if(findId){
return id;
}
else if(!findId){
  return result;
}
else{
  console.log("findid="+findId);
  return null;
}
}
let edited=false;
function viewComment(arrName){
 const  arr=arrName;
  $("#viewer #contents").html("").append(`
<span id="viewName"><span id="currentSong">${crntSong.title}</span> Comments</span><br>
<br>`);
  arr.forEach((e,i)=>{
    $("#viewer #contents").append(`
  <div commentId="${i}" id="commentBody">

<div id="img"><img style="width:40px; height:40px;border-radius:20px;" src="images/${e.image}"></div>

<div id="message">
  <b title="profile" isArtist="${e.isArtist}" ownerId="${e.ownerId}" id="name">${e.name}</b><br>
  <p id="messsageBody">${e.message}
  </p>

  <button id="likeComment" class="fa fa-heart" style=""><small style="text-shadow:none !important;">${Number(e.likes.length) > 0 ? e.likes.length:""}</small></button>
  <button id="replyComment">reply..</button>
</div>
<!--end commentBody-->
</div><br>
`);
});
//end loop
$("#contents #message #likeComment").click(function(){
 // var id=parseInt($(this).parent().parent().attr("commentId"));
  //var owner=searchComment(id);
  //if(!searchLikes(user,owner.likes)){
 // likeComment(owner);
 // }
//  else{
//   disLikeComment(owner,user);
//    }
});

$("#contents #message #replyComment").click(function(){
  var id=parseInt($(this).parent().parent().attr("commentId"));
   ownerNow=$(this).siblings("#name").html();
  takeInput($("#input"),"replaying to "+ownerNow,commentReply);
});

$("#commentBody #message #name").click(function(){
const id=$(this).attr("ownerId");
const isArtist=$(this).attr("isArtist")=="true" ? true : false;
if(isArtist){
  showArtist(id);
}
else{
  showUser(id,"");
}
});
}
  
//click events
function clickSong(){
$("#songList #newSong").click(function(){
  act.viewPlayerPage=true;
act.viewBottomPlayer=false;
act.viewSongList=false;
id=parseInt($(this).attr("songId"));//global song id 
if(crntSong.id != parseInt($(this).attr("songId")+1) ){
crntSong=crntArtist.songs[id];
songLink={"link":$(this).attr("dl"),"title":crntSong.title}

act.songPlaying=parseInt($(this).attr("songId"))
audio.src="songs/"+crntSong.link;
$(".songsPlay").each(function(){
  $(this).css("background-image","");
 }); 
//some player edits
$(this).css("background-image","url('images/download-8.jpg')");
//end edits here
play=false;
playNow(1300);
}
loadComments(editSongText)
actions(500);

allArtist.forEach((e)=>{//search  who own the current song playing 
  if(searchSong(crntSong,e.songs)){
  crntArtistServer=e;
  }
    });//end search ---> only important when user play on fevorites list or allTracksList
    addVS();
});
}
//functions
function playerAndLyrics(player=false){
if(player) {
$("#playerPage #lyrics").hide(400);;
setTimeout(() => {
  $("#playerPage #img").fadeIn("slow")
},500);
}
else{
  $("#playerPage #img").hide(400);
  setTimeout(() => {
    $("#playerPage #lyrics").fadeIn("slow");
  },500);  
}
}

function addToFollowArtist(artistObject){
  message("please Wait",2000,500);
  artistObject=findArtist(artistObject);
  const add={
      "name":artistObject.artistName,
      "ownerId":parseInt(artistObject.id),
      "profileImage":artistObject.profileImage
  }

  addDb={...add,
  "action":"follow",
  "myTable":user.following,
  "artistTable":artistObject.followers,
  "myName":user.name!=undefined ? user.name:user.artistName,
  "myImage":user.profileImage,
  "myEmail":user.email,
  "myId":parseInt(user.id),
  "notificationTable":user.notification,
  "isArtist":user.name !=undefined ? 0:1
  }
 follow(addDb,done);
  function done(){
  whomIFollow.unshift(add);
  loadArtistToFollow(allArtist);
setTimeout(() => {
  clickAlbum();
}, 10);
  sendNotification(artistObject.notification,"start following you");
  showMyArtist();
  }
  }

function searchFollow(name=null,arr=whomIFollow){
  let exist=false;
  if(name!=null){
arr.forEach((e)=>{
if(name.id==e.ownerId){
exist=true
}
});
}
return exist;
}
clickSong();

$("#heading #back").click(function(){
  act.viewPlayerPage=false;
  act.viewBottomPlayer=true;
  act.viewSongList=true;
  act.viewComment=false;
  act.viewSharePage=false;
  act.viewBottomPlayer=true;
  crntSongArtist=crntArtist;
  actions(200);//*/
  commentViewed=false;
});
$("#playerPage #playPause,#crntPlay #playPause").click(function(){
  playNow(100);
  if(isPlayPause && ! audio.paused){
    check=setInterval(() => {//force audio to stop;;;;;;;;
      play=true;
      isPlayPause=false;
playNow(10);
if(audio.paused){
  clearInterval(check);
}
    },500);//end forcing  audio
  }
  });

  //prev and nex t clicks
  $("#next,#playArea #next").click(function(){
    commentViewed=false;
    playBack("playNext");
   });
  $("#prev").click(function(){
    commentViewed=false;
    playBack("playPrev");
  });
  $("#crntPlay #download").click(function(){
      fevorites($(this));
  })
  $("#playerPage #img #openLyrics").click(function(){
    playerAndLyrics(false);
  })
  $("#playerPage #lyrics #backToPlayer").click(function(){
playerAndLyrics(true);
  });
var crntSongArtist=null;
  $("#crntPlay #img,#crntPlay #info").click(function(){
act.viewPageA=false;
act.viewPageB=true;
act.viewSongList=false;
act.viewPlayerPage=true;
act.viewBottomPlayer=false;
crntArtist=crntSongArtist;
crntArtistSever=crntSongArtist;
actions(300);
editList();
  });
  //edit
$("#playerPage #edit").click(function(){
act.viewEditPage=true;
page.aOpen=true;
page.Close=false;
page.bOpen=false;
actions(300);
closePage();
        $("#viewer #contents #boxs #box").click(function(){
          $(this).html("<i class='fa fa-check'></i>").siblings("#box").html("");
        });
let width=10;
$("#volume #addSection #rmv").click(function(){
  if(play){
if(width > 11){
width-=10;
  $(this).siblings("div").css("width",width+"%");
 }
width=width < 101 ? width:100;
$("#volume #percentage").html(Math.ceil(width)+"%");
  audio.volume.mediaClib+=0.2;
  }else{
    message("Play a Song first",3000,200)
  }
});

$("#volume #add").click(function(){
  if(play){
   if(width < 101){
    width+=10;
    audio.volume.mediaClib+=0.2;
    $("#addSection #dur").css("width",width+"%");
  }
 width=width < 101 ? width:100;
  $("#volume #percentage").html(Math.ceil(width)+"%");
}
else{
    message("Play a Song first",3000,200)
  }
});
//edit ends here
});
//pageviewer

$("#viewAll").click(function(){
  closePage($("#viewer"));
 if(page.aOpen==true){
page.aOpen=false;
page.bOpen=true;
return;
 };
if(page.bOpen==true){
  page.bOpen=false;
page.Close=true;
return
}
if(page.Close==true){
  page.Close=false;
  page.aOpen=true;
  page.bOpen=false;
  act.viewEditPage=false;
  act.viewComment=false;
  act.viewSharePage=false
  actions(300)
return
}
})
//end page viewer

//player bottom links clicks 
$("#userActions #fevClick").click(function(){
fevorites($(this))
});

$("#userActions #downloadBtn,#links #songDownloads").click(function(){
  const test=$(this).html();
preDownload(songLink.title,songLink.link)
});

$("#links #songComment").click(function(){
act.viewComment=true;
page.aOpen=true;
page.bOpen=false;
page.Close=false;
actions();
closePage();
});
$("#links #songStars").click(function(){
fevorites($("#userActions #fevClick"));
});
//player bottom links clicks  ends
actions(100);
//homapage codes starts here.......


//follow scroll events
$("#hd #back").click(function(){
  $("#homePage #followArea").parent("#scroll").css("height","");
  $("#homePage #boxsB").css("height","").fadeIn("slow");
  $("#hd #name").text("Todays Uploads/").siblings("button").fadeOut(200)
});

$("#homePage #followArea").parent("#scroll").on("scroll",function(){
  scroll=$(this).scrollTop();
   if(scroll>20){
  $(this).siblings("#boxsB").fadeOut(300);
  $(this).siblings("#boxsB").css("height",scroll+"px").css("transition-duration","800ms");
$("#hd #name").text("Find Freinds/").siblings("button").fadeIn(200)
}
 });

 function clickAlbum(arr=allArtist){
  $("#boxsB td,#topL #boxB").click(function(){
    const id=parseInt($(this).attr("artistId"));
let index=null;
    arr.forEach((e,i)=>{
      if(e.id==id){
      crntArtist=e;
      crntArtistServer=e;
      index=i;
      }
    })
  setTimeout(()=>{
    songs=crntArtist.songs;
    act.viewPageB=true;
    act.viewPageA=false;
    act.viewSongList=true;
    act.viewPlayerPage=false;
   /// act.viewBottomPlayer=true;
  actions();
  loadList(songs);
  clickSong();
  editList();
  playerAndLyrics(true);
addViews(addNowV)
function addNowV(id){
allArtist[index].views=parseInt(allArtist[index].views)+1;
}
  },10)
  })
  }
  
function loadTopArtistArr(arr=[]){
  $("#homePage #topL").html("");
  arr.forEach(function(e,i){
    $("#homePage #topL").append(`
    <div  artistId="${e.id}" id="boxB">
    <img src="images/${e.profileImage}"><div id="cardSet"></div>
    <div id="info">
<div style="display:flex; justify-content:space-between;width:100%">
<div style="width:82%">
    <span id="artistName">${e.artistName}</span>
</div>
<div style="width:18%">
    <button style="margin-left:-5px; font-size:x-large; color:#4422ff" class="fa fa-play-circle">
    </button>
    </div>
</div>
    <div id="songs"> 
<span style="color:#99bbff; margin-top:-12px;"  id="tracks">
${e.songs.length} ${parseInt(e.songs.length)>1 ? "tracks":"track"}
<br>
${e.followers.length} ${parseInt(e.followers.length)>1 ? "followers":"follower"}
</span>

      <span style="color:#99bbff;margin-top:3px;"  id="viewers">${e.views} views</span></div>
    </div>
        </div>
    `);//loop top
});
arr.length < 1 ? $("#homePage #topL").append(`
  <div style="display:flex; align-items:center; justify-content:center max-width:500px; color:#6677ff">The Artists you followed will appear here !</div>`):""
//clickAlbum(arr);
}

 function loadTopArtist(arr=allArtist){
  $("#homePage #boxsB tr").html("");
  arr.forEach(function(e,i){
  $("#homePage #boxsB tr").append(`
  <td artistId='${e.id}'>
  <div id="boxB">
<img src="images/${e.profileImage}"><div id="cardSet">
</div>
<div id="info">

<div style="display:flex; justify-content:space-between;width:100%">
<div style="width:82%">
    <span id="artistName">${e.artistName}</span>
</div>
<div style="width:18%">
    <button style=" margin-left:-5px; font-size:x-large;color:#4422ff" class="fa fa-play-circle">
    </button>
    </div>
</div>

<div id="songs">

<span style="color:#99bbff; margin-top:-12px;"  id="tracks">
${e.songs.length} ${parseInt(e.songs.length)>1 ? "tracks":"track"}
<br>
${e.followers.length} ${parseInt(e.followers.length)>1 ? "followers":"follower"}
</span>

  <span style="color:#99bbff; margin-top:-3px;"  id="viewers">${e.views} views</span>
  </div>
</div>
    </div>
    <td>
  `);
});
/*
function loopVideo(arr=[]){
  console.log("arr not ready");
  $("#videos table tr").html("");
for (let i = 0; i < 10; i++) {
$("#videos table tr").append(`
<td>
          <div id="box">
            <div id="image"><button class="fa fa-play"></button></div>
            <div id="info">
              <span> <i class="fa fa-heart"></i>53</span>
              <span> <i class="fa fa-arrow-down"></i>53</span>
               <span> <i class="fa fa-comment"></i>53</span>
              <span> <i class="fa fa-eye"></i>33</span>
            </div>
          </div>
        </td>
`)  
}
}
//loopVideo()*/
setTimeout(() => {
  clickAlbum(arr);
}, 100);

}
$("nav .backToHome #back").click(function(){
  act.viewPageB=false;
  act.viewPageA=true;
  if(!audio.paused){
    act.viewBottomPlayer=true;
   }
  else{
    act.viewBottomPlayer=false;
  }

  act.viewPlayerPage=false;
 actions();
 setTimeout(()=>{
loadTopArtistArr(topArtist);
loadTopArtist(allArtist);
},1000);
});

$("nav .backToHome #logOut").click(function(){
  warning("are you sure you want to log out as <i>"+(user.name!=undefined ? user.name : user.artistName)+"","","NO","YES",go)
function go(){ 
   localStorage.removeItem("user");
  warning("you are not login ","please login to use full functionals of this page","OK","Confirm",go);
  function go(){
  window.location.replace("login/index.html")
  }
}
});
$("nav .backToHome #viewProfile").click(function(){
  if(user.songs!=undefined){
    href("pages/mainProfile.html","_target");
  }
  else{
    showUser(user.id,"");
  }
});
function loadTracks(arr){
  $("#fevSongs").html("");
  let t=arr.length>1 ? "Tracks":"Track";
  $("#tracksLen").html(arr.length+""+t);
  arr.forEach((e,i)=>{
    if(e.link!=undefined){
$("#fevSongs").append(`
<div class="trackPlaying" style="box-shadow:none;width:95%;" trackId="${i}" id="newSongF">
<div id="image">
<img src="images/${e.image}">
<div id="name">
<span style="font-size:larger !important;border:none !important;" id="title">${e.title !="none" ? e.title:"Music Hub"}</span><br>
<span  id="artistName"><i class="name">artist:</i>${e.artist}</span>
</div></div>
<div id="option">
<cite  class="fa fa-ellipsis-v"></cite>
<div><aside id="arrow"></aside>

<button id="play">Play <i class="fa fa-play"></i></button>
<button dl="${e.link}" title="${e.title}" id="download">Download<i class="fa fa-download"></i></button>
<button id="remove">Remove<i class="fa fa-trash"></i></button>
</div>
</div>
</div>
`);
    }
    else{
      $("#fevSongs").append(`
      <div class="trackPlaying"  style="box-shadow:none;margin:0 auto;text-align:center;width:90%;" trackId="${i}" id="newSongF">
<div id="image">
<div style="texte=align:center;  margin:0 auto;"> <i class="fa fa-frown-o"> this song was deleted by it owner</i> </div>
</div>

<div id="option">
<cite  class="fa fa-ellipsis-v"></cite>
<div><aside id="arrow"></aside>

<button none="play">can't Play <i class="fa fa-play"></i></button>
<button none="${e.link}" id="download">can't Download<i class="fa fa-download"></i></button>
<button id="remove">Remove<i class="fa fa-trash"></i></button>
</div>
</div>
</div>
`);
//<div style="texte=align:center"><i class="fa fa-frown-o"> this song was deleted by it owner</i></div>

    }
});
    arr.length < 1 ? $("#fevSongs").append(`<h4 style="text-align:center; color:#aaaaff">${crntArtist.artistName} songs / <i>nothing found</i></h4>`):""
$("#newSongF #play,#newSongF #image").click(function(){
  act.viewPageB=true;
  act.viewPageA=false;
  act.viewSongList=true;
  act.viewPlayerPage=false;
  songs=act.viewFevoritesPage ? fev.songs: tracks.songs;
  loadList(songs);
  clickSong();
  crntArtist !=null ?  crntArtist.artistName =="fevorites" ||  crntArtist.artistName == "All Tracks" ? $("#artist #addFollow").hide():$("#artist #addFollow").show():"";
  actions(200)
});
$("#newSongF #download").click(function(){
  preDownload($(this).attr("title"),$(this).attr("dl"));
});
//share 
$("#userActions #share").click(function(){

$.post({
  url:"server/severActivity.php",
  data:{"action":"shareSong","name":crntArtist.id+"dir"+crntSong.id},
  success:function(e){
    link=location.origin+"/play/pages/link.php?normalId="+e;
    page.aOpen=true;
    page.Close=false;
    page.bOpen=false;
    act.viewSharePage=true;
    actions();
    closePage();
  },
  error:function(){
alert("can't provide share link please try again");
  }
})

//clicks events here
//$("#shareLink").attr("href","whatsapp://send? text=check "+crntSong.artist+"new Song Nice www.google.com")
//a.click();

});
//share
document.querySelector("#userActions #playBack").onclick=function(){
  isPlayPause=true;
if(checkP){
  $(this).attr("class","fa fa-refresh").children("small").html("repeat once");//next()
checkP=false;
message("repeat once successfully activated");
}
else if(!checkP){
  $(this).attr("class","fa fa-random").children("small").html("repeat all");//repeat() checkP=false;
 checkP=true;
 message("repeat all sucessfully activated");
}
else{
  message("Playback Error");
}
}//);
$("#newSongF #remove").click(function(){
const id=parseInt($(this).parent().parent().parent().attr("trackId"));
var arr=[]
var removeF=false;
if(act.viewFevoritesPage){
   arr=fev.songs;
   removeF=true;
   }
   else{
     arr= tracks.songs;
   }
   const that=$(this);

function remove(){
  that.parent().parent().parent().fadeOut(300);
fev.songs.splice(id,1);
removeF!==false ? removeFev(user.fevorites,(act.viewFevoritesPage ? fevDetails[id].id:arr[id].originalId)):"";
message("Song successfully removed",2000,300);
}
warning("Are you sure you want to remove this song","If you click <b>Yes</b> this song will be removed from your list ","No","Yes",remove);
});
}
let loaded=false;
function loadArtistToFollow(arr=allArtist){
  $("#homePage #followArea").html("")
  tracks.songs.splice(0,tracks.songs.length);//load new track
arr.forEach((e,i)=>{
const el=e;
let followed=false;
  e.songs.forEach((e)=>{//reload tracks
  tracks.songs.push(e);
  });
  whomIFollow.forEach((e) => {
    if(e.ownerId == el.id){
     followed=true;//check follow and unfollowed
    }
  });
  $("#homePage #followArea").append(`
  <div artistId="${i}" style="box-shadow:none !important;" id="artist">
  <div id="info">
  <img src="images/${e.profileImage}">
  <div>
<h3 artistId="${e.id}" style="word-break:break-all">${e.artistName}</h3>
<span id="track">${e.songs.length} ${parseInt(e.songs.length)>1 ? "tracks":"track"}</span><br>
<span id="followers">${e.followers.length} ${parseInt(e.followers.length)>1 ? "followers":"follower"} </span>
</div>
</div>
<div id="follow">
<button id="${followed ? "followed":"followBtn"}">${followed ? "following":"follow"}</button>
<button id="messageBtn">${followed ? "Message":"remove"}</button>
  </div>
</div><br>`);
});
$("#homePage #followArea").css("height",$("#homePage #followArea").height()+100+"px");
loadTracks(tracks.songs);
$("#followBtn,#followed").click(function(){
  if($(this).html()!="following"){
   // $("#followBtn,#followed").click(function(){});
      $(this).html("loading..");
  const id=parseInt($(this).parent().parent().attr("artistId"));
addToFollowArtist(allArtist[id]);
}
else{
  message("already followed");
}
});
$("#homePage #followArea h3").click(function(){
  const id=$(this).attr("artistId");
  warning("Do you really want to leave this page","viewing this user profile might take you to another page click yes if you want to leave !","No","Yes",done);
  function done(){
    showArtist(id);
  }
});
$("#follow #messageBtn").click(function(){
if($(this).html()!="remove"){
  function go(){
    href("pages/chat.html");
  }
  warning("are you sure you want to leave this page ?","sending message to this user might take you to another webpage","NO","Yes",go)
 }
else{
  $(this).parent().parent().hide(100);
  console.log("this artist is temporary removed from your list");
}
});
 
}
$("#artist #addFollow").one("click",function(){
  if(crntArtist!=null){
if(!searchFollow(crntArtist)){
addToFollowArtist(crntArtist);
$(this).off("click")
$(this).html("following").css("background","");
}
else{
message("You are following <b style='font-style:italic'>" +crntArtist.artistName+ "</b>Already");
}
}
else{
  message("Wrong command please refresh your browser ");
}
});
//let firstLoad=false;
onload=()=>{
  
}

topArtist=[];
function showMyArtist(){
  topArtist=[];
allArtist.forEach((el)=> {
whomIFollow.forEach((e)=>{
if(e.ownerId == el.id){
  topArtist.unshift(el);
 }
})
});
topArtist.sort((a,b)=>{ return b.views - a.views});
loadTopArtistArr(topArtist);
}

const pageStart=() => {
 closeLoader(3,50);
//   firstLoad=true;
///reloadAllArtist();
loadTopArtist();
loadArtistToFollow();
showMyArtist();
//handling events
$("#heading .home").click(function(){
$(this).attr("id","active").siblings("button").attr("id","");
act.viewArtistPage=true;
act.viewFevoritesPage=false;
act.viewTracksPage=false;
actions();
});
$("#heading .fev").click(function(){
$(this).attr("id","active").siblings("button").attr("id","");
act.viewArtistPage=false;
act.viewFevoritesPage=true;
act.viewTracksPage=false;
songs=fev.songs;
crntArtist=fev;
crntArtistServer=fev;
actions();
loadTracks(fev.songs);
editList();
});
$("#heading .tracks").click(function(){
  $(this).attr("id","active").siblings("button").attr("id","");
  act.viewArtistPage=false;
  act.viewFevoritesPage=false;
  act.viewTracksPage=true;
  crntArtist=tracks;
  crntArtistServer=tracks;
  actions();
  loadTracks(tracks.songs);
  editList();
  });
//heading events ends    

console.log("data received");
notificationHandler()
}