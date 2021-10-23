let signIn=true; let signUp=false; let isArtist=false;let secondName="";
onload=()=>{
  const validate=new Validate();
  let a=false;b=false;c=false;d=false;
  function loged(e){
    if(e!="none" && e!="exist" && e!="existfail" && e!="fail"){
    
      if(e.search("<b>")<0 && e!=""){
      localStorage.setItem("user",e);
      if(localStorage.getItem("everVisited11") !=null && localStorage.getItem("everVisited11") != undefined){
isArtist ? href("../pages/mainProfile.html"):href("../player.html","_self");
}else{
href("../player.html","_self");
localStorage.setItem("everVisited11","1");
}
      }
      else{
        $("#loginGame").fadeOut(300);
        signUp ? $("#submit").html("Sign Up"):$("#submit").html("Sign In")
        signUp ? message("details incorrect:fail to create account",3000,100) : message("login details incorrect",3000,100);
       }  
    }
    else{
      $("#loginGame").fadeOut(300);
      signUp ? $("#submit").html("Sign Up"):$("#submit").html("Sign In")
      signUp ? message("details incorrect:fail to create account",3000,100) : message("login details incorrect",3000,100);
    
    }
      console.log(e);
      switch (e) {
        case "existfail":
          warning("User Exist","somone is using this email address on "+location.origin+"try login","");
          break;
          case "exist":
            warning("User Exist","somone is using this email address on "+location.host+" <br>try login","");
            break;

          case "none":
          warning("user not found","")
            break;
                   case "fail":
                warning("fail to create account","error comes while creating your account please try again","");
                break;
                     case "":
                warning("Not Found","Login details provided are incorrect");
                $("input").focus();
                break;
       }
    
    }
    function submitForm(callBack=null){ 
  $("form").ajaxSubmit({
  success:function(e){
    callBack!=null ? callBack(e) : "";
  },
  error:function(e){
    console.log(e);
  }
  });
}
submit=false;
function test(callBack){
let i=0;
//isArtist ? warning(text[i],"","No","Yes Agreed",next,cancel):"";
 //submit=true;
 warning(texts[i],"","No","Yes Agreed",next,cancel)
 function next(){
   if(i < texts.length -1){
   setTimeout(() => {
     i++;
     warning(texts[i],"","No","Yes Agreed",next,cancel);
   }, 500);
 }else{
   submit=true;
   callBack();
 }
 }
 function cancel(){
submit=false;
isArtist=false;
$(this).attr("class","fa fa-check-square").siblings("button").attr("class","fa fa-square-o");
isArtist=false;
animateEnd();
warning("artist account test fail , created users account ?","","try again","Yes",go);
function go(){
callBack();
}
 }
}
  


      function login(){
        getQr("#formAction").value="login"; 
        setTimeout(()=>{
      $("#submit").html("Please wait")
          submitForm(loged);
          },100);
      }
function signUpF(){
  $("#action #signUp").attr("class","active").siblings().attr("class","")
  $(".none").fadeIn(200);
$("#password1").attr("Placeholder","Create Password");
$("#image label").fadeIn(200);
signUp=true;
signIn=false;
checkAll();
isArtist ? $("#action").val("createNormalAccount"):$("#action").val("createArtistAccount");
}
if(webAction()==="newUser"){
  signUpF();
}
 $("#action #signUp").click(function(){
   signUpF();
 });
 $("#action #signIn").click(function(){
  $(this).attr("class","active").siblings().attr("class","");
  $(".none").fadeOut(200);
  $("#password1").attr("Placeholder","Enter Password");
  $("#cover #image label").fadeOut(200);
  signUp=false;
  signIn=true;  
  checkAll();
  getQr("#formAction").value="login"; 
});
let showP=false;
$("#newInput div i").click(function(){

if(showP==false){
  $(this).attr("class","fa fa-eye").siblings("input").attr("type","text");
showP=true
}
else{
  $(this).attr("class","fa fa-eye-slash").siblings("input").attr("type","password");
showP=false
}
});
$("#newInput div i").siblings("input").css("padding-left","0").css("padding-right","0");
function check(input,type){
  if(signUp===true){
  if(type){
input.parent("div").siblings("cite").css("display","block");
$("#submit").html("Sign Up")
return true;
  }
  else{
    input.parent("div").siblings("cite").css("display","none");
return false;
  }
}//end if
else{
  $("#newInput cite").each(function(){
    $(this).css("display","none");
    $("#submit").html("Sign In")
  });
}
}//end check functio
function checkAll(){
  const name=$("#name").val();
  if(name.indexOf(" ") > 0){
    secondName=name.slice(name.indexOf(" ")+1,name.length);
    }

  a=check($("#name"),validate.text($("#name").val()) && $("#name").val().length>3 && secondName!="");
  b=check($("#email"),validate.email($("#email").val()));
   pass();
 

   if($("#file").val()!="" && signUp){
    imageReader($("#file"),$("#image"),null,false,[".jpg",".png",".jpeg"]);
  fileReady=true;
   }
   
}

$("#name").on("keyup",function(){
const  name=$(this).val();
if(name.indexOf(" ") > 0){
secondName=name.slice(name.indexOf(" ")+1,name.length);
}
a=check($(this),validate.text(name) && $(this).val().length>3  && secondName!="")
});
$("#email").on("keyup",function(){
b=check($(this),validate.email($(this).val()));
});
$("#submit").click(function(){
if(signUp===true){
let name=a ? "":"<b>Name</b> not valid please try again ";
let email=b ? "":"<b>Email</b> not valid please try again";
let image=fileReady ? "":"<b>Profile Image</b> is required!";
let password=c  ? "":"<b>Password</b> not secure please try again";
let password2=d ? "":"password not comfirm please retype your password";
if(a&&b&&c&&d&&fileReady){

      submit=true
      go();
    
function go(){
  if(submit){
//  showLoader("creating account...",50000);
localStorage.clear("webAction");
!isArtist ? getQr("#formAction").value="createNormalAccount" : getQr("#formAction").value="createArtistAccount";
$("form").attr("action","../server/severActivity.php");
//message("form will be submited after five seconds",3000,500);
$("#loginGame").fadeIn(300);
  setTimeout(()=>{
    submitForm(loged);
    $("#submit").html("please wait..")
    },100);
  }
}
}
  else{
    message(email+" <br>"+password+"<br> "+name+"<br>"+image+"<br>"+password2,5000,400);
    }
  }
else{
  getQr("#formAction").value="login"; 
  $("#submit").html("please wait..")
  login();
}
});
    

function pass(){
  
  d=check($("#password2"),$("#password2").val()==$("#password1").val());

  const code=/^(?=.*\D)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[1-9a-zA-Z]{6}/;
  const password=$("#password1").val();
  if(code.test(password)){
    $("#load #dur").css("width","100%");
    $("#states").html(" password ready :")
    $("#text").html("you choosed a very strong password");
  c=check($("#password1"),true);
  }
  else{
    c=check($("#password1"),false);
    var Acode=/[a-z]/.test(password)||/[A-Z]/.test(password)||/[0-9]/.test(password);
     if(Acode && password.length==1){
      $("#load #dur").css("width","10%");
      $("#states").html("poor password :")
      $("#text").html("password not secure use upper case and lowercase and any number from 0 to 9");
    }
    else if(password.length>3){
      $("#load #dur").css("width","60%");
      $("#states").html("Meduim password :")
      $("#text").html("password is not strong enought please use upper case and lowercase and any number from 0 to 9");
    }
  }
  }


$("#password1").on("keyup",function(){
pass()
})

$("#password2").on("keyup",function(){
d=check($(this),$(this).val()==$("#password1").val());
});
//handling file
if($("#file").val()!="" && signUp){
  imageReader($("#file"),$("#image"),null,false,[".jpg",".png",".jpeg"]);
fileReady=true;
}

$("#file").on("change",function(){
imageReader($(this),$("#image"),null,false,[".jpg",".png",".jpeg"]);
fileReady=true;
});
}
let fileReady=false;

$("#asArtist #Yes").click(function(){
  $(this).attr("class","fa fa-check-square").siblings("button").attr("class","fa fa-square-o"); 
    isArtist=true;
 ///   animateStart();
  });
   
  $("#asArtist #No").click(function(){
    $(this).attr("class","fa fa-check-square").siblings("button").attr("class","fa fa-square-o");
    isArtist=false;
  //  animateEnd();
})

const texts=[
  "you will get free music portfolio from siteName",
  "you must upload atleast one song that is fully yours",
"you will be part of this site owners with full controll over your songs",
"you must invite your friends to listen to your songs  at least you songs should have morethan ten or more listeners in a  week",
"if we latter found out that your songs do not belongs to you, your account will be automatically deleted",
];
let i=0;animate=false;read=0;
$("#asArtist #artistAccountInfo #texts").html(texts[i]);