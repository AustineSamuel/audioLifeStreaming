/*notifcation handler
this must be step by step directing the user to a specific notification message
********luck is loading 56%******
                          Wish my self luck^^^^^^^^^Amen
*/
//code starts here
function notificationHandler(){
      function go(){
        editSongText();
        act.viewComment=true 
        actions(500);
       }
       function goN(){
        editSongText();
      }
function editSong(){
  if(showComment){
    loadComments(go);
       }
       else{
        loadComments(goN)
       }
      }
let showComment=false;
function showSong(artistId=0,songId=1){
  act={
    "viewSongList":true,
    "viewPlayerPage":false,
    "viewComment":false,
    "viewSharePage":false,
    "viewHomePage":false,
    "viewBottomPlayer":false,
    "viewEditPage":false,
    "viewArtistPage":true,
    "viewFevoritesPage":false,
    "viewTracksPage":false,
    "viewPageA":true,
    "viewPageB":false,
    "songPlaying":0,
    "playingType":"once"
    }
  actions();//back to like home first normal load

setTimeout(() => {
  let arr=allArtist;
  let idA=artistId;
  arr.forEach((e)=>{
    if(e.id==idA){
    crntArtist=e;
    crntArtistServer=e;
    idA=e.id;
    }
  })

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



setTimeout(() => {//play song
  act.viewPlayerPage=true;
  act.viewBottomPlayer=false;
  act.viewSongList=false;
const id=songId//global song id 
crntArtist.songs.forEach((e)=>{
    if(e.id==id){
      crntSong=e;
    }
  });

  songLink={"link":crntSong.link,"title":crntSong.title}
  
  act.songPlaying=id;
  audio.src="songs/"+crntSong.link;
  $(".songsPlay").each(function(){
    $(this).css("background-image","");
   }); 
  //some player edits
  //$(this).css("background-image","url('images/download-8.jpg')");
  //end edits here
  play=false;
 // playNow(1300);
  actions(500);
  
  allArtist.forEach((e)=>{//search  who own the current song playing 
    if(searchSong(crntSong,e.songs)){
    crntArtistServer=e;
    crntArtist=e;
    }
      });//end search ---> only important when user play on fevorites list or allTracksList

      editSong();
  
     
},1000);

},1000);

}

let ntfs=localStorage.getItem("notification111Music");
if(ntfs!=null && ntfs!=undefined){
  ntfs=JSON.parse(ntfs);
 var artistId=ntfs[0];
 var songId=ntfs[1];
 showComment=ntfs[2]!=undefined && ntfs[2]!=null;
 setTimeout(()=>{
showSong(artistId,songId);
  localStorage.removeItem("notification111Music");
},500);

}
}