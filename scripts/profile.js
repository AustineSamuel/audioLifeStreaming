"use strike";
const acts={
  "home":true,
  "about":false,
  "music":false,
  "video":false,
  "gallery":false,
  "player":false
  }
  //edit content start

  $("#imageBody #name").html(artist.artistName);
  //edit content ends
  function loopAll(){
    loop(artist.songs,$("#boxS #music"),"musics");
    loop(artist.gallery,$("#boxS #images"),"images");
    loop(artist.aboutMe,$("#boxS #userText"),"about",200);
    }  
    const actions=(dur=300)=>{
      if(acts.home==true){
      $(".home,.about,.music,.video,.gallery").fadeIn(dur);
      }
      else{
       if(acts.about==true){
        $(".about").fadeIn(dur);
        }
        else{
        $(".about").fadeOut(dur);
        }
        if(acts.music==true){
          $(".music").fadeIn(dur);
          }
          else{
          $(".music").fadeOut(dur);
          }  
        if(acts.video==true){
          $(".video").fadeIn(dur);
          }
          else{
          $(".video").fadeOut(dur);
          }
      
          if(acts.gallery==true){
            $(".gallery").fadeIn(dur);
            }
            else{
            $(".gallery").fadeOut(dur);
            }
            
            if(acts.player==true){
          //    $("#myHome").fadeIn(dur);
          console.log("player not ready")
              }
              else{
             // $("#myHome").fadeOut(dur);
              }
            }
      }
$("#fans,#followers").click(function(){
  showFans();
});
$("#tracks").click(function(){
  $("#scroll").animate({scrollTop:getQr(".music").offsetTop-50},"slow");
})
//clickImageViewer()
function openMenu(){
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

const loop=(arr=[],html=$("#images"),whatToDoLoop="images",len=null)=>{
  len=len==null ? arr.length:len;
  html.html("");
  whatToDoLoop=whatToDoLoop.toUpperCase();
    switch(whatToDoLoop){
    case "VIDEOS":
      for (let i = 0; i < len; i++) {
      html.append(`
      <div videoId="${i}" id="box">
      <span id="date">${arr[i].date}</span>
      <div style="background-image:url(../${arr[i].image});" id="image"><i class="fa fa-play"></i></div>
      <div id="videoInfo">
        <button id="songComments" class="fa fa-comment"><small>${arr[i].comments.length}</small></button>
        <button id="songViews" class="fa fa-eye"><small>${arr[i].views}</small></button>
        <button id="songDownloads" class="fa fa-arrow-down"><small>${arr[i].downloads}</small></button>
        <button id="songStars" class="fa fa-heart"><small>${arr[i].likes}</small></button>
      </div>
    </div>
      `);
      }
    break;
    case "MUSICS":
      if(arr.length>0){
      for (let i = 0; i < len; i++) {
      html.append(`
      <div songId="${i}" id="box">
      <div id="start">
        <img src="../images/${arr[i].image}">
        <div>
        <span id="heading">${arr[i].title}</span><br>
      <span id="date">uploaded :<small style="font-size:x-small"> ${arr[i].date}</small></span>
      </div></div>
    <button class="${owner ? "fa fa-trash":"fa fa-ellipsis-v"}"> </button>
    </div>
      `)
      }
    }
    else{
      html.html("<h2>NO SONG YET</h2>")
    }
      $(".music #box #start").click(function(){
        const id=parseInt($(this).parent().attr("songId"));
         viewSongNormal(id,"../songs/");
       });     
       owner === true ? deleteSongF():"";
      break;
      case "IMAGES":
        if(owner!=true){

        for (let i = 0; i < len; i++) {
          html.append(`<img src="../images/${arr[i]}"/>`);
              }
      }
        else{
          loadActivities();
       
       
        }
        setTimeout(() => {
          if(arr.length<=0){
            html.html(`<h2>No Data</h2>`)
          }
        }, 20);
        break;
      case "ABOUT":
        if(arr.length<=0){
html.html(`
<h2>NO Story Yet</h2>
<button id="add">Add Your Story</button>
`)
        }
        const about=arr.slice(0,len);
        html.html(about);
  }
  }


let profileLink="";



function setUpLink(){
  $.post({
    url:"../server/severActivity.php",
    data:{"action":"shareSong","name":artist.id},
    success:function(e){
      const link=location.origin+"/play/pages/link.php?name="+textToNameFormat(removeSpace(artist.artistName))+"@"+e;
      profileLink=link;
    },
    error:function(){
  alert("can't provide share link please try again");
    }
  }).then(function(){
    
    //share buttons
    const faceBookLink=`https://www.facebook.com/dialog/feed?app_id=1112720722574358&amp;
link=${profileLink}&amp;
picture=${location.origin+"play/images/"+artist.profileImage}&amp;
description=play and download free music online with ${artist.artistName}&amp;
name=9MusicLife&amp;
redirect_uri=${profileLink}`
    $("#homepage").append(`
    
  <div id="profileShare">

  <span><i>  Share <b> ${artist.artistName}</b> profile </i></span>

   <div>

   <a target="_blank" href="https://www.facebook.com/dialog/feed?app_id=1112720722574358&amp;
   link=${profileLink}&amp;
picture=${location.origin+"play/images/"+artist.profileImage}&amp;
description=play and download free music online with ${artist.artistName}&amp;
name=9MusicLife&amp;
redirect_uri=${profileLink}">
    <button id="shareToFaceBook" class="fa fa-facebook"><br><small>Facebook</small></button>
    </a>
    
    
    <button id="shareToWhatsapp" class="fa fa-whatsapp"><br><small>WhatsApp</small></button>
    <button id="shareToTwitter" class="fa fa-twitter"><br><small>Twitter</small></button>
    <button id="copyLink" class="fa fa-clone"><br><small>Copy Link</small></button>
    
    </div>

  </div>
    `);

    $("#shareToWhatsAppA").attr("href",'https://web.whatsapp.com/send?text='+artist.artistName+"Music profile "+profileLink).attr("data-action",'data-action="share/whatsapp/share"')
    $("#shareToTwitterA").attr("href",'https://twitter.com/share?url='+artist.artistName+" Music profile "+profileLink);
    $("#shareToFaceBookA").attr("href",faceBookLink);

    $("#shareToWhatsapp").click(function(){
href(`
  href="https://web.whatsapp.com/send?text=${artist.artistName+" Music profile "+profileLink}" 
  data-action="share/whatsapp/share
`,"_blank");
    })
    $("#shareToTwitter").click(function(){
      href("https://twitter.com/share?url="+artist.artistName+" Music profile "+profileLink,"_blank");
    });
    $("#copyLink,#links #copyLink").click(function(){
copy(profileLink);
    });//share ends

  })
}
onload=()=>{

  $(document).ajaxStop(function(){
  Object.assign(artist,{"gallery":[]})
  setTimeout(()=>{
artist.songs.forEach((e)=>{
  artist.gallery.push(e.image);
});
},20)
setTimeout(()=>{
  loopAll();
  closeLoader(10,50);
},400);
  $("#startBody").css("margin-top",$("#scrollBody").css("height"));
  $("#scroll").css("height",screen.height-$("#scrollBody").height()+"px");

  $("#scroll").on("scroll",function(){
    //test
    const image=$("#imageBody #image .profileImage");
    const scroll=$(this).scrollTop();
    
  if(scroll < 70){
      $("#userActionBtn2").fadeOut(30);
      $("#image").css("flex-wrap","wrap")
  image.css("width",100-scroll+"px")
  .css("height",100-scroll+"px")
  .css("border-radius",100-scroll/2+"px");
  $("#rank").css("translate","-"+scroll/7+"px"," 0px")
  $("#rank span,#rank span small").css("font-size","");
  $(this).css("overflow-y","auto");
$("#scrollB").css("overflow-y","none");
$("nav").attr("id","none");
 $("#rank span small").fadeIn(300);
 $("#updateProfile").fadeIn(300);
  }
   else{
    $("#userActionBtn2").fadeIn(300);
  $("#image").css("flex-wrap","nowrap")
    $("#updateProfile").fadeOut(300);
     $("nav").attr("id","navA");
     image.css("width","40px")
  .css("height","40px")
  .css("border-radius",40/2+"px");
  $("#rank").css("translate","-20px"," 0px")
  $("#rank span,#rank span small").css("font-size","x-small");
  innerWidth < 450 ? $("#rank span small").fadeOut(100):"";
   }
    $("#startBody").css("margin-top",$("#scrollBody").css("height"));
  })
  $("#scrollB").on("scroll",function(){
    const scroll=$(this).scrollTop();
    if(scroll<1){
    $(this).css("overflow-y","none");
    $("#scroll").css("overflow-y","auto");    
    }
  //  $(this).attr("style","height:"+screen.height+"px");
  }).attr("style","height:"+screen.height+"px");
  //heading finished
$("#searcher").hover(function(){
document.querySelector("nav").scrollTo(100,0);
});
const el=owner ? $("#images #img"):$("#images img");
$("#sizing #sizeImage").on("change",function(){
const val=$(this).val();
const el=owner ? $("#images #img"):$("#images img");
el.css("width",val+"%");
const heigh=el.width()/2;
el.css("height",height+"px");
$(this).siblings("#result").html("size : "+val+"%");
});
const height=el.width()/2;
el.css("height",height+"px");
//nav clicks events
$("nav #myAbout").click(function(){
$(this).attr("class","active").siblings("button").attr("class","");
for(let i in acts){
acts[i]=false;
}
acts.about=true;
actions();
loop(artist.aboutMe,$("#boxS #userText"),"about");
});

$("nav #myMusic").click(function(){
  $(this).attr("class","active").siblings("button").attr("class","");
  for(let i in acts){
    acts[i]=false;
    }
    acts.music=true;
    actions();    
    loop(artist.songs,$("boxS #music"),"musics")
  });

$("nav #myVideo").click(function(){
  $(this).attr("class","active").siblings("button").attr("class","");
  for(let i in acts){
    acts[i]=false;
    }
    acts.video=true;
    actions();   
    loop(artist.videos,$("#boxS #videos"),"videos"); 
});

$("nav #myGallery").click(function(){
  $(this).attr("class","active").siblings("button").attr("class","");
  for(let i in acts){
    acts[i]=false;
    }
    acts.gallery=true;
    actions();   
    loop(artist.gallery,$("#boxS #images"),"images"); 
  });
$("#myHome").click(function(){
  $(this).attr("class","active").siblings("button").attr("class","");
  for(let i in acts){
    acts[i]=false;
    }
    acts.home=true;
    actions();    
    loopAll();
});
$("#imageBody #name,#profileUserName").html(artist.artistName);
$("#heading span").html(artist.artistName);
$("#menuContent #connect img,#imageBody img,#myProfileImage").attr("src","../images/"+artist.profileImage);
// $("#imageBody #myProfileImage")
    if(owner===true){
//$("body").append(`<script src="mainProfile.js"></script>`);
loadActivities()
   }
    $("#about #aboutText").html(artist.aboutMe);
    getQr("#detailsGab").innerHTML=artist.bio!="" ? artist.bio:"<br><br>No Bio<br>";
    //this is main for user who visit artist
    $("#list li small").html(artist.artistName);
$("#linkText img").attr("src","../images/"+artist.profileImage);
$("#linkText small").html(artist.artistName);
document.querySelector("title").innerHTML=owner ? artist.artistName+" / your profile": artist.artistName+"/ profile";
    if(!owner){
    $("#rank #followers").html(artist.followers.length+"<br> <small>Followers</small>");
$("#rank #tracks").html(artist.songs.length+"<br> <small> Tracks</small>");
 }

});
}
