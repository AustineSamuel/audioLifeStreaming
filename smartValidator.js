class Validate{
  text(input){
    const rgx=/^[a-zA-Z0-9]/;
    if(rgx.test(input)){
      return true;
    }
    else{
      return false;
    }
  }
  email(input){
     const rgx=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if(rgx.test(input)){
      return true;
    }
    else{
      return false;
    }
    }
  phoneNumber(input){
    const rgx=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i;
    if(rgx.test(input)){
      return true;
    }
    else{
      return false;
    }
  }
  code(input){
    const rgx=/[0-9]{6}/;
    if(rgx.test(input)){
      return true;
    }
    else{
      return false;
    }
  }
  number(input){
    const rgx=/[0-9]{1}/;
    if(rgx.test(input)){
      return true;
    }
    else{
      return false;
    }
  }
  password(input,length=6){
    //const rgx=/[1-9a-zA-Z]/;
    if(input.length>=length){
      return true;
    }
    else{
      return false;
    }
  }
  passwordVarify(input1,input2){
    if(input1.toString()==input2.toString()&&input1!=""){
      return true;
    }
    else{
      return false;
    }
  }
  image(inputName,elemt=null){
    let extn=inputName.slice(inputName.lastIndexOf("."),inputName.length);
    extn=extn.toLowerCase();
    if(extn==".jpg"||extn==".jpeg"||extn==".png"||extn==".gif"){
     if(elemt!=null){
       let respond=null;
      const file=new FileReader();
       file.onload=(evnt)=>{
        respond=evnt.target.result;
        if(imageData !==undefined && checkOnload !==undefined){
        imageData=respond;
        checkOnload=true;
        //return respond is undefined here
      }
      else{
        console.log(imageData);
        console.log(checkOnload);
alert("message from smartValidator.js : you  must declear imageData=null variable and checkOnload=false varible to use this validator");
      }
    }//end file reader
      file.readAsDataURL(elemt[0].files[0]);
      //return respond : is null here
      return true ///no option
    }
    else{
      return true;
    }
    }
    else{
      return false;
    }
  }
}
