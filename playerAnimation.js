const loadStyle=$("#playerPage #img #playerLoadStyle");
let isPlayingAnimation=undefined;
function startLoadStyle(){
  $("#playerPage #img #rImage").css("transition-duration","10ms");
  loadStyle.html("").children("div").css("height","0").css("transition-duration","300ms");
 /* for (let i = 0; i <20; i++) {
  loadStyle.append("<div class='actionPlayAnimation'></div>");
  }*/
  let dur=0;
  let addHeight=Math.floor(audio.currentTime) > 10 ? 100 : 5 ;

  $("#playerPage #img #drwLen #rotate").css("transform","rotate(20deg)");
 $("#playerPage #img #drwLen #rotate #line4").css("box-shadow","0px 0px 10px 2px rgb(219, 213, 255)");
  
audio.addEventListener("timeupdate",()=>{
  addHeight=addHeight>=100 ? addHeight : addHeight+1;
    dur+=1.5;
      /*var rndColorR=Math.ceil(Math.random()*255);
   var rndColorG=Math.ceil(Math.random()*255)
 var rndColorB=Math.ceil(Math.random()*255)
 var rndColorA=Math.floor(Math.random()*255)
 var randHeight=Math.floor(Math.random()*addHeight);
    $(this).css("background",`rgba(${rndColorR},${rndColorG},${rndColorB},${rndColorA})`);
    $(this).css("height",randHeight+"%");*/
    rotateImages(dur);
 
  })

}
function stopLoadStyle(){
    rotateImages(0,1000);
   loadStyle.children("div").css("height","2px").css("transition-duration","2s");
   $("#playerPage #img #drwLen #rotate").css("transform","rotate(-18deg)");
 $("#playerPage #img #drwLen #rotate #line4").css("box-shadow","none");
}
function rotateImages(dur){
  $("#playerPage #img #rImage").css("transform","rotate("+dur+"deg)");
  $("#crntPlay #img").css("transform","rotate("+dur+"deg)");
}

$("#playerPage #img #rImage").attr("style","transition-duration:1000ms; transition:0.6 ease;");
  