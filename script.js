var title = document.getElementById("job-title");

var titles = [
"CODER",
"CREATIVE THINKER",
 "PROGRAMMER",
 "VISIONARY",
 "PROBLEM SOLVER",

 "DEVELOPER",
 "LEADER",
 "STORYTELLER",
 "MAKER",
 "CRITICAL THINKER",

 // "NON-TRADITIONALIST",
 "LEARNER",
 "PLANNER",
 "CREATOR",
 "INNOVATOR",

 "DESIGNER",
]

var colors = [
  '#E17D7D',
  '#FBE365',
  '#6159A1',
  '#64C9E3',
  '#60CFAD'
]

var intervalID = window.setInterval(changeTitle, 1500);

var i = 0;
var j = 0;
function changeTitle() {
  title.innerHTML = titles[i];
  title.style.color = colors[j];
  i++;
  j++;
  if(i==15  ) {
    i = 0;
  }
  if(j==5) {
    j = 0;
  }
}


var count = 0;
var slideSource = document.getElementById('slideSource');

function switchMode() {
  count++;
  console.log(count);
  if(count % 2 == 0) {
    // darkMode = false;
    // element.classList.toggle("light-mode");
    // document.body.onclick = function () {
    //   slideSource.classList.toggle('fade');
    // }
    // $("#slideSource").fadeOut(200);
    setTimeout(function() {
      document.body.style.backgroundColor = "#151324";
      document.body.style.color = "white";
      // document.getElementById("menu").style.color = "white";
      // document.getElementById("blobs").src = "images/blobs-dark.svg";
      document.getElementById("toggleMode").innerHTML = "☀️";
    }, 500);
    // $("#slideSource").fadeIn(200);
    console.log("dark mode");
  } else {
    // element.classList.toggle("dark-mode");
    // document.body.onclick = function () {
    //   slideSource.classList.toggle('fade');
    // }
    // $("#slideSource").fadeOut(1000);
    setTimeout(function() {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      // document.getElementById("blobs").src = "images/blobs-light.svg";
      // document.getElementById("menu").style.color = "black";
      // document.getElementsByClassName("links").style.color ="black";
      document.getElementById("toggleMode").innerHTML = "🌙";
    }, 500);
    // $("#slideSource").fadeIn(1000);

    console.log("light mode");
    // darkMode = true;
  }
}
