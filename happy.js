var currentSongNumber = 1;
var willLoop = 0;
var willShuffle=0;
var songNumber = 1;

function toggleSong()  
    {    
        var song = document.querySelector('audio'); //document m se audio select krenge
        if(song.paused == true) //agr song paused h toh use play krdenge
            {
                console.log('Playing');
                $('.play-icon').removeClass('fa-play').addClass('fa-pause');//change icon to play and pause
                song.play();
            }
        else  //agr song play h toh use pause krdenge
            {
                console.log('Pausing');
                $('.play-icon').removeClass('fa-pause').addClass('fa-play');
                song.pause();
            }
        } 

$('.play-icon').on('click', function() //jb hm icon pr click krenge toh hmara song play ya pause ho jayega
        {
            toggleSong();
        });


$('body').on('keypress', function(event) //yhn pr hmne ek event lga diya ki agr hm spacebar key press krenge toh hmara song play ya pause hojega
    {   
        var target=event.target;
        if (event.keyCode == 32 && target.tagName !='INPUT')  //or ek condition lga di ki agr hm spacebar press krte h or wo input nhi h toh hmara song play ya pause hoga
            {
                toggleSong();
            }
    });

function fancyTimeFormat(time)//time ko set krne k liye hmne yeh function lgaya h jo hmare time ko min or sec format m set krega
    {   
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = time % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }


function updateCurrentTime() //ek function lgaya jo time ko update krega
    {
        var song = document.querySelector('audio');
        var currentTime = Math.floor(song.currentTime);     //Math.floor jo h wo decimal value ko store krega or hme integer value provide krega
        currentTime = fancyTimeFormat(currentTime);  //fancytime function called to alter time value
        var duration = Math.floor(song.duration);
        duration = fancyTimeFormat(duration);
        $('.time-elapsed').text(currentTime);      //find where to display them and display times
        $('.song-duration').text(duration);
    }

//ek songs ka array bnaya jismai song ki sbhi details hongi
  var songs = [{
        'name': 'Suit Suit',
        'artist': 'Guru Randhawa, Arjun',
        'album': 'Suit',
        'duration': '03:21',
       'fileName': 'happy1.mp3',
        'image': 'happy1.jpg' ,   
       },
      {
        'name': 'Gallan Goodiyan',
        'artist': 'Priyanka Chopra',
        'album': 'Dil Dhadakne Do',
        'duration': '04:54',
        'fileName': 'happy2.mp3',
          'image': 'happy2.jpg',
       },
    {
        'name': 'Saturday Saturday',
        'artist': 'Shreya Ghoshal,Badshah',
        'album': 'Humpty Sharma Ki Dulhania',
        'duration': '03:31',
        'fileName': 'happy3.mp3',
        'image': 'happy3.jpg',
    },
    {
        'name': 'Itti si hassi',
        'artist': 'Shreya Ghoshal',
        'album': 'Barfi',
        'duration': '03:56',
        'fileName': 'happy4.mp3',
     'image': 'happy4.jpg',   
    }]

//window.onload lga diya yeh hmari windi ko puri trh load krayega or uske bd use execute krayega

window.onload = function()
{ 
    changeCurrentSongDetails(songs[0]);
    for(var i =0; i < songs.length;i++) //for loop to update the object values
        {      
            var obj = songs[i];     //Save the song object in variable 'obj'
            var name = '#happy' + (i+1);  //name=song1/2/3/4
            var song = $(name);
            song.find('.song-name').text(obj.name);  
            song.find('.song-artist').text(obj.artist);
            song.find('.song-album').text(obj.album);
            song.find('.song-length').text(obj.duration);
            addSongNameClickEvent(obj,i+1);     //Add a click event on each song
        }   
    updateCurrentTime(); //function call to update current time on window.onload
    setInterval(function() //wait for specific interval, i.e. 1000ms in this case and perform function
        {
            updateCurrentTime(); //again update current time after 1000ms
        },1000);
};

//Initialize Datatables

$(document).ready(function()
{ 
    $('#songs').DataTable(
    {
         paging: false
    });
});
 
//song k name pr jaise hi click krenge toh yeh function chlega or song play ho jayega
function addSongNameClickEvent(songObj,position) 
{   
    var songName = songObj.fileName; // New Variable                      
    var id = '#happy' + position;    
    $(id).click(function() 
        {
            var audio = document.querySelector('audio');
            var currentSong = audio.src;
            if(currentSong.search(songName) != -1) //if current song is found on desired src,perform desired func
                {
                    toggleSong();
                }
            else 
                {
                    audio.src = songName;
                    toggleSong();
                    changeCurrentSongDetails(songObj);  // Function Call
                }
        });
}

//jb hm song change krenge toh uske details b change ho jayengi

function changeCurrentSongDetails(songObj) { //show song details when playing it
    $('.current-song-image').attr('src','img/' + songObj.image); 
    $('.current-song-name').text(songObj.name) ;                     
    $('.current-song-album').text(songObj.album) ;               //The src is made of two strings added together: folder name + fileName 
}



$('.fa-repeat').on('click',function() //for on and off of loop button
{         
    $('.fa-repeat').toggleClass('disabled');
    willLoop = 1 - willLoop;    
});
$('.fa-random').on('click',function() //for on and off of shuffle button
{         
    $('.fa-random').toggleClass('disabled');
    willShuffle = 1 - willShuffle;//changes the value of will shuffle to 0(off) and 1(on)
});


function timeJump() 
{ 
    var song = document.querySelector('audio');
    song.currentTime = song.duration - 2;
}


$('.fa-repeat').on('click',function()
{
    $('audio').on('ended',function()   
    {  
        var audio = document.querySelector('audio');
        if(currentSongNumber < 4) 
            {
                var nextSongObj = songs[currentSongNumber];
                audio.src = nextSongObj.fileName;
                toggleSong();
                changeCurrentSongDetails(nextSongObj);
                currentSongNumber = currentSongNumber + 1;
            }
        else if(willLoop == 1) 
        {
            var nextSongObj = songs[0];
            audio.src = nextSongObj.fileName;
            toggleSong();
            changeCurrentSongDetails(nextSongObj);
            currentSongNumber =  1;
        }
        else 
        {
            $('.play-icon').removeClass('fa-pause').addClass('fa-play');
            audio.currentTime = 0;
        }
    });
});

//song ko shuffle krne k liye ek function lga diya
function randomExcluded(min, max, excluded) 
{
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
}
$('.fa-random').on('click',function()
{
    $('audio').on('ended',function() 
        {
            var audio = document.querySelector('audio');
            if (willShuffle == 1) 
                {
                    var nextSongNumber = randomExcluded(1,4,currentSongNumber); // Calling our function from Stackoverflow
                    var nextSongObj = songs[nextSongNumber-1];
                    audio.src = nextSongObj.fileName;
                    toggleSong();
                    changeCurrentSongDetails(nextSongObj);
                    currentSongNumber = nextSongNumber;
                }
            else if(currentSongNumber < 4) 
                {
                    var nextSongObj = songs[currentSongNumber];
                    audio.src = nextSongObj.fileName;
                    toggleSong();
                    changeCurrentSongDetails(nextSongObj);
                    currentSongNumber = currentSongNumber + 1;
                }
        else if(willLoop == 1) 
            {
                var nextSongObj = songs[0];
                audio.src = nextSongObj.fileName;
                toggleSong();
                changeCurrentSongDetails(nextSongObj);
                currentSongNumber =  1;
            }
        else 
            {
                $('.play-icon').removeClass('fa-pause').addClass('fa-play');
                audio.currentTime = 0;
            }
    });
});

//next song automatically play ho jayega
$('audio').on('ended',function()     
    {  
        var audio = document.querySelector('audio');
        if(currentSongNumber < 4) 
            {
                var nextSongObj = songs[currentSongNumber];
                audio.src = nextSongObj.fileName;
                toggleSong();
                changeCurrentSongDetails(nextSongObj);
                currentSongNumber = currentSongNumber + 1;
            }
        else if(willLoop == 1) 
        {
            var nextSongObj = songs[0];
            audio.src = nextSongObj.fileName;
            toggleSong();
            changeCurrentSongDetails(nextSongObj);
            currentSongNumber =  1;
        }
        else 
        {
            $('.play-icon').removeClass('fa-pause').addClass('fa-play');
            audio.currentTime = 0;
        }
    });
//jaise hi button pr click krein next song chl jayega
$('.fa-step-forward').on('click', function() {
  var audio = document.querySelector('audio');
  if(currentSongNumber < songs.length) {
    currentSongNumber++;
    var nextSongObj = songs[currentSongNumber - 1];
    audio.src = nextSongObj.fileName;
    toggleSong();
    changeCurrentSongDetails(nextSongObj);
  }
  else {
    currentSongNumber = 1;
    audio.src = songs[0].fileName;
    toggleSong();
    changeCurrentSongDetails(songs[0]);
  }
});

//for previous song on click of buttuon
$('.fa-step-backward').on('click', function() {
  var audio = document.querySelector('audio');
  if(currentSongNumber >= 1) {
    currentSongNumber--;
    var prevSongObj = songs[currentSongNumber - 1];
    audio.src = prevSongObj.fileName;
    toggleSong();
    changeCurrentSongDetails(prevSongObj);
  }
  else {
    currentSongNumber = songs.length;
    audio.src = songs[currentSongNumber - 1].fileName;
    toggleSong();
    changeCurrentSongDetails(songs[currentSongNumber - 1]);
  }
});

//for progress bar
$('audio').on('timeupdate', function() {
  var audio = document.querySelector('audio');
  $('.progress-filled').stop().animate({'width': (audio.currentTime) / audio.duration * 100 + '%'}, 250, 'linear');
});

// The 'scrub' function: it updates the current time whenever the user clicks
// anywhere on the progress bar.
$('.player-progress').on('click', function(event) {
  var audio = document.querySelector('audio');
  var progress = document.querySelector('.player-progress');

  var scrubTime = (event.offsetX / progress.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;
});
 $('.dataTables_filter input').attr("placeholder", "Search Song");//apni particular playlist se song search krne ke liye
