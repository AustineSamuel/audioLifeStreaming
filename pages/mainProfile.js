 "user strick";
 if(owner===true){
   var messages=[];
   var notifications=[];
   function loadActivities(){
     $("#rank").html("");
     $("#boxS #images").html("");
    if(owner===true){
     $("#rank").append(` 
     <span id="fansclick" class="fa fa-users"><i>${artist.followers.length}</i><br> <small>fans</small></span>
   
     <span id="messages" class="fa fa-comment"><i>${artist.messagesList.length}</i> <br><a href="chat.html" style="text-decoration:none;" target="_blank"><small>Message</small></a></span></a>
     
     <span id="notifications" class="fa fa-bell"><i>${artist.notifications.length}</i><br><small>Notification</small></span>
   `).css("background","");
   $("#fansclick,#followers").click(function(){
    showFans();
  });
$("#rank #notifications").click(function(){
  notificationViewer(artist.notifications,"../");
})
   const imageArr=artist.gallery;
   for (let i = 0; i <imageArr.length; i++) {
    $("#boxS #images").append(`<div imageId="${i}" id="img">
    <img style="width:100%;height:70%;" src="../images/${imageArr[i]}">

   <div id="bottom" style="text-align:center;margin:0 auto;" > <button id="setProfile">Set as profile</button><button id="delete">Delete</button>
    <div>
    
    </div>`) ;
   }
   setTimeout(() => {
    if(imageArr.length<=0){
      $("#boxS #images").html(`<h2>No Data</h2>`)
    }
  }, 20);
   //clicks events here 
   $("#messages").click(function(){
     //open all messages
   })
   $("#images #setProfile").click(function(){
var src=$(this).parent().siblings("img").attr("src");
src=src.slice(src.lastIndexOf("/")+1,src.length);
if(src!=artist.profileImage){
$.post({
    url:"../server/severActivity.php",
data:{"action":"updateImage","id":artist.id,"name":src},
success:function(e){
message(e);
setTimeout(() => {
  $("#menuContent #connect img,#imageBody img").attr("src","../images/"+src);
  user.profileImage=src;
  localStorage.setItem("user",JSON.stringify(user));//seted
   
}, 500);
},
error:function(){
alert("update image error");
}
//console.log(src);
  })
}
else{
message("this picture is already set as your profile picture");
}
   });
   
   $("#images #delete").click(function(){
    warning("Are You Sure You Want To Delete This Image ?","if you click yes this Image will be permanantly deleted","No","Yes",deleteImage);
    const id=parseInt($(this).parent().parent().attr("imageId"));
     function deleteImage(){
        artist.gallery.splice(id,1);
     loadActivities();
      }
     });
      }
   }
    $("#detailsGab").click(function(){
      $("#save").show();$(".save").hide();
     var text=$(this).html();
     for (let i = 0; i < text.length; i++) {
      text=text.replace("<br>","\n");
     }
     $("#largeInput").fadeIn(300);
     $("#largeInput textarea").val(text);
    });
    let largeInputData=undefined;
    //large inputs buttons
    $("#largeInput #content #back").click(function(){
      $("#largeInput").fadeOut(300);
    });
    $("#largeInput #content #bottom #cancel").click(function(){
      $("#largeInput").fadeOut(300);
    });
   $("#largeInput #content #bottom #save").click(function(){
    $("#largeInput").fadeOut(300);
    largeInputData=$("#largeInput textarea").val();
    let i;
    for (i = 0; i <largeInputData.length; i++) {
      largeInputData=largeInputData.replace("\n","<br>");
    }
    $("#detailsGab").html("loading");
     //send ajax request to update 
    $.post({
      url:"../server/severActivity.php",
      data:{"action":"updateBio","data":largeInputData,"id":artist.id,"column":"Bio"},
      success:function(e){
message(e)
setTimeout(()=>{
$("#detailsGab").html(largeInputData);
},500)
      },
error:function(){
alert("update error");
}
    })
    //respond example with timeout
    });

    $(".about #add").click(function(){
    
      $("#myAbout").attr("class","active").siblings("button").attr("class","");
      for(let i in acts){
        acts[i]=false;
        }

        setTimeout(() => {
          acts.about=true;
          actions();  
          loop(artist.aboutMe,$("#boxS #userText"),"about");
          $("#largeInput").fadeIn(300)
        }, 0);

        $("#largeInput").children().children("#heading").html("Edit Your Music Story");
        $("#largeInput textarea").val(replaceBrWithNL($(".about #userText").html()));
console.log("clicked");
        $("#largeInput .save").click(function(){//save data via ajax request here
          $(".about #userText").html("loading");
          var data=$("#largeInput textarea").val();
          const dataArr=data.split("\n");

dataArr.forEach((e)=> {
  data=data.replace("\n","<br>");
});    
    
          $.post({
            url:"../server/severActivity.php",
            data:{"action":"updateAbout","id":artist.id,"data":data},
            success:function(e){
               message(e);
              $("#largeInput").fadeOut(300);
              artist.aboutMe=data;
              setTimeout(()=>{
                loop(artist.aboutMe,$("#boxS #userText"),"about");
              },100);
           },
            error:function(){ $("#about #aboutText").html(data); 
              alert("error");
            }
          })
           })//end save 
    })
  //large inputs buttons ends
  $(".music #add").click(function(){
    songUploadEnv();
  });
  //edit
  //edit ends actions started
    
    
$("#update").on("change",function(){
var that=$(this);
function action(){
uploadFile(that.parent("form"),"../server/severActivity.php",del);
function del(e){
  const src=e;
  artist.profileImage!= "" && !artist.gallery.includes(artist.profileImage) ? deleteFile("../images/"+artist.profileImage,done):done();
  function done(e){
$.post({
  url:"../server/severActivity.php",
  data:{"action":"updateImage","id":artist.id,"name":src},
  success:function(e){
  message(e+" "+"finished");
  setTimeout(() => {
    $("#menuContent #connect img,#imageBody img").attr("src","../images/"+src); 
 //set on localStorage
 
  }, 500);
  },
  error:function(){
    alert("Error");
  }
})
  
  }
}
}
warning("are y;ou sure you want make this action ?","you are about not to change your profile picture ..all your fans will be notify if you click yes ..","No","Yes",action);
  });
  function deleteSongF(){

    $(".music #box button").click(function(){
      const that=$(this).parent();
      const  id=parseInt($(this).parent().attr("songId"));
       warning("Are you sure you want to delete this song? ("+$(this).siblings("#start").children("div").children("#heading").html()+") ","if you click yes this song will be parmanantly deleted","NO","YES SURE",yesDel);
function yesDel() {
deleteSongDb(id);
  that.fadeOut(400);
//message("song successfully deleted")
}
    });


   }


 }
  else{
    window.location.href="artistProfile.html";
  }