<?php
include "serverFunctions.php";
interface NormalUser{
public function notificationTable($name); //create table
public function messageListTable($name); //create messageList table herer
public function fevoritesSongsTable($name);//create fevorites list table table
}
interface ArtistUser{
  public function notificationTable($name); //create table
  public function messageListTable($name); //create messageList table herer
  public function fevoritesSongsTable($name);//create fevorites list table table
  public function songsTable($name);//create songartist table
}
class RegisterNormal implements NormalUser{
  private function __construct($info){
    $this->$info=$info;
  }
  public function notificationTable($name){
//create Table
  }
  public function messageListTable($name){
    ///create messageListTable
  }
  public function fevoritesSongsTable($name){
    //create fevorites
  }
}

class RegisterArtist implements ArtistUser{
  private function __construct($info){
    $this->$info=$info;
  }
  public function notificationTable($name){
//create Table
  }
  public function messageListTable($name){
    ///create messageListTable
  }
  public function fevoritesSongsTable($name){
    //create fevorites
  }
  public function songsTable($name){
    //create fevorites
  }
}