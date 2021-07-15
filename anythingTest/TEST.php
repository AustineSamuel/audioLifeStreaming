<?php
$email="aus@gmail.com";
echo $email."before<br> ";
$email=filter_var($email,FILTER_VALIDATE_EMAIL);
echo $email."after<br>";

      $email=filter_var($email,FILTER_SANITIZE_EMAIL);
      echo $email."finished<br>";

    