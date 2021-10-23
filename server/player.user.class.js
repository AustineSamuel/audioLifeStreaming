"user strike";
//this script should start running after 2 minutes
class NormalUser{
checkLogin(){
  const checkUser=setUser("user");
  if(checkUser===null){
const interval=()=>{
      function go(){
        localStorage.setItem("webAction","newUser")
        setTimeout(() => {
          href("login/index.html","_self")
        }, 500);
      }
      function back(){
        setTimeout(() => {
          interval()
        },120000);
        }
warning("Create free account with musicHub", `Create free account with musicHub get all the feature of this site ,
<br> you will be able to<ol>
<li>upload your songs</li>
<li>Life chat with other artist and fans</li>
<li>listen to your feverites songs offline </li>
<li>have full control of music player etc</li>
</ol> `,"Not Now","Create Now",go,back
)
    }
      interval();
  }
}


}//end class

//test
