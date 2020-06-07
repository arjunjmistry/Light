//https://arjunjmistry.github.io/Light/
const result = document.getElementById ('result')
const launchBtn = document.getElementById ('launchBtn')
const startBtn = document.getElementById ('startBtn')
const detectBtn = document.getElementById ('detectBtn')
const speedBtn = document.getElementById ('speedBtn')
const nobikeBtn = document.getElementById ('nobikeBtn')
const doneBtn = document.getElementById ('doneBtn')
const downloadBtn = document.getElementById ('downloadBtn')
const text = document.getElementById ('text')
const video = document.getElementById('video')

//Clear session storage so that previous existing data is deleted
sessionStorage.clear()

//Initial setup
startBtn.disabled = true
detectBtn.disabled = true
speedBtn.disabled = true
nobikeBtn.disabled = true
doneBtn.disabled = true
downloadBtn.disabled = true
document.getElementById('questionDone').classList.add('disabledButton')

// Welcome page -> click button -> records screen dims -> hides welcome screen
const welcomeButton = document.getElementById('welcomeButton')
const welcomeMode = document.getElementById('welcomeMode')
const instructionMode = document.getElementById('instructionMode')
welcomeButton.onclick = function() {
var screenDimension = window.innerWidth  + "x" + window.innerHeight
sessionStorage.setItem('screenDimension', JSON.stringify(screenDimension) )
console.log(window.innerWidth  + "x" + window.innerHeight)

welcomeMode.classList.add('hide')
instructionMode.classList.remove('hide')
}

//Tutorial page
const startGame = document.getElementById('startGame')
const gameMode = document.getElementById('gameMode')
const videoMode = document.getElementById('videoMode')
startGame.disabled = true

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1, startGame.disabled = false}
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none"
  }
  x[slideIndex-1].style.display = "block";

  startGame.onclick = function() {
    instructionMode.classList.add('hide')
    gameMode.classList.remove('hide')
    videoMode.classList.remove('hide')
  }
}


// range of numbers 1 - 70
var array = [];i=1;while(array.push(i++)<70);
//Shuffle function
function shuffle(array) {
  let count = array.length;
  while(count) {
    array.push(array.splice(Math.floor(Math.random() * count), 1)[0]);
    count -= 1;
  }
}
// shuffle array -> add 2 example videos to start
shuffle(array)
array.unshift('E1','E2')

// Load (next) video
launchBtn.onclick = function () {
  if (i < 70) {i++} else if (i = 70) {i = 0}
video.src = array[i] + '.mp4'
video.pause()
document.getElementById('video').style.display = 'block'
var videoNumber = sessionStorage.getItem('videoNumber')
  videoNumber = videoNumber? JSON.parse(videoNumber) : []
  videoNumber.push(array[i])
  sessionStorage.setItem('videoNumber',JSON.stringify(videoNumber))

  console.log(array[i])
  launchBtn.disabled = true
  startBtn.disabled = false
  detectBtn.disabled = false
  speedBtn.disabled = false
  nobikeBtn.disabled = false
  doneBtn.disabled = false

}

// Start button click -> play video -> checks for existing data -> appends new time data -> sends back to storage
startBtn.addEventListener ('click', function() {
  video.play()
})


// Start button click -> checks for existing data -> appends new time data -> sends back to storage -> disables button
startBtn.onclick = function startTime(start2Time,startTime,video) {
  
  var start2Time = Date.now()
  var startExisting = sessionStorage.getItem('startTime')
  startExisting = startExisting? JSON.parse(startExisting) : []
  startExisting.push(start2Time)
  sessionStorage.setItem('startTime',JSON.stringify(startExisting))

  result.innerHTML = start2Time
  console.log(start2Time)
  startBtn.disabled = true
}


// Detect button click -> checks for existing data -> appends new time data -> sends back to storage -> disables button
detectBtn.onclick = function(detect2Time, detectTime) {
  var start2Time = sessionStorage.getItem('startTime')
  var detect2Time = Date.now()
  var detectExisting = sessionStorage.getItem('detectTime')
  detectExisting = detectExisting? JSON.parse(detectExisting) : []
  detectExisting.push(detect2Time)
  sessionStorage.setItem('detectTime',JSON.stringify(detectExisting))

  result.innerHTML = detect2Time
  console.log(detect2Time)
  detectBtn.disabled = true
  nobikeBtn.disabled = true
}

// Speed button click -> checks for existing data -> appends new time data -> sends back to storage -> disables button
speedBtn.onclick = function(speed2Time, speedTime) {
  var speed2Time = Date.now()
  var speedExisting = sessionStorage.getItem('speedTime')
  speedExisting = speedExisting? JSON.parse(speedExisting) : []
  speedExisting.push(speed2Time)
  sessionStorage.setItem('speedTime',JSON.stringify(speedExisting))

  result.innerHTML = speed2Time
  console.log(speed2Time)
  speedBtn.disabled = true
  nobikeBtn.disabled = true
  
}

// NoBike button click -> checks for existing data -> appends new time data -> sends back to storage -> disables button
nobikeBtn.onclick = function() {
  var detectExisting = sessionStorage.getItem('detectTime')
  detectExisting = detectExisting? JSON.parse(detectExisting) : []
  detectExisting.push('NB')
  sessionStorage.setItem('detectTime',JSON.stringify(detectExisting))

  var speedExisting = sessionStorage.getItem('speedTime')
  speedExisting = speedExisting? JSON.parse(speedExisting) : []
  speedExisting.push('NB')
  sessionStorage.setItem('speedTime',JSON.stringify(speedExisting))

  result.innerHTML = 'no bike'
  console.log('no bike')
  detectBtn.disabled = true
  speedBtn.disabled = true
  nobikeBtn.disabled = true
}

// Enables all buttons -> Hide video
doneBtn.onclick = function() {
  startBtn.disabled = false
  detectBtn.disabled = false
  speedBtn.disabled = false
  nobikeBtn.disabled = false
  launchBtn.disabled = false
  document.getElementById('video').style.display = 'none'

  document.getElementById('gameMode').classList.add('hide')
  document.getElementById('questionDone').classList.add('disabledButton')

 

  if (i < 69) {downloadBtn.disabled = true} else if (i = 69) {downloadBtn.disabled = false}
  if (i < 69) {
    launchBtn.disabled = false 
    startBtn.disabled = false 
    detectBtn.disabled = false 
    speedBtn.disabled = false 
    nobikeBtn.disabled = false 
    doneBtn.disabled = false} 
  else if (i = 69) {
    launchBtn.disabled = true 
    startBtn.disabled = true 
    detectBtn.disabled = true 
    speedBtn.disabled = true
    nobikeBtn.disabled = true 
    doneBtn.disabled = true} 
  if (i < 69) {document.getElementById('questionMode').classList.remove('hide')} else if (i = 69) {document.getElementById('questionMode').classList.remove('hide')}
}




// QUESTION 1: Listen for click -> Store value in session storage -> Disable buttons
const q1a1 = document.getElementById('q1a1')
const q1a2 = document.getElementById('q1a2')
q1a1.onclick = function() {
  var q1a1_Inner = q1a1.innerHTML
    var btn1Existing = sessionStorage.getItem('question1')
    btn1Existing = btn1Existing? JSON.parse(btn1Existing) : []
    btn1Existing.push(q1a1_Inner)
    sessionStorage.setItem('question1',JSON.stringify(btn1Existing))
  
    document.getElementById('Q1A').classList.add('disabledButton')

    console.log(btn1Existing)
}
q1a2.onclick = function() {
    //store Q1 value
    var q1a1_Inner = q1a2.innerHTML
    var btn1Existing = sessionStorage.getItem('question1')
    btn1Existing = btn1Existing? JSON.parse(btn1Existing) : []
    btn1Existing.push(q1a1_Inner)
    sessionStorage.setItem('question1',JSON.stringify(btn1Existing))

    //store Q2 value
    var btn2Existing = sessionStorage.getItem('question2')
    btn2Existing = btn2Existing? JSON.parse(btn2Existing) : []
    btn2Existing.push('X')
    sessionStorage.setItem('question2',JSON.stringify(btn2Existing))

    //store Q3 value
    var btn3Existing = sessionStorage.getItem('question3')
    btn3Existing = btn3Existing? JSON.parse(btn3Existing) : []
    btn3Existing.push('X')
    sessionStorage.setItem('question3',JSON.stringify(btn3Existing))

    //store Q4 value
    var btn4Existing = sessionStorage.getItem('question4')
    btn4Existing = btn4Existing? JSON.parse(btn4Existing) : []
    btn4Existing.push('X')
    sessionStorage.setItem('question4',JSON.stringify(btn4Existing))

    //disable Q1
    document.getElementById('Q1A').classList.add('disabledButton')
    //disable Q2
    document.getElementById('Q2A').classList.add('disabledButton')
    //disable Q3
    document.getElementById('Q3A').classList.add('disabledButton')
    //disable Q4
    document.getElementById('Q4A').classList.add('disabledButton')

    document.getElementById('questionDone').classList.remove('disabledButton')

    console.log(btn1Existing)
}

// QUESTION 2: Create 10 buttons -> Listen for Click -> Store value in session storage -> Disable buttons
let btn2 = document.getElementById('btn2')
for (i=1; i<=10; i++) {
  let button = document.createElement('button')
  button.innerHTML = +i
  btn2.appendChild(button)

  button.addEventListener('click', function() {
    console.log(this.innerHTML)

  var btn2Existing = sessionStorage.getItem('question2')
  btn2Existing = btn2Existing? JSON.parse(btn2Existing) : []
  btn2Existing.push(this.innerHTML)
  sessionStorage.setItem('question2',JSON.stringify(btn2Existing))
  
  document.getElementById('Q2A').classList.add('disabledButton')
  })
}

// QUESTION 3: Create 10 buttons -> Listen for Click -> Store value in session storage -> Disable buttons
let btn3 = document.getElementById("btn3");
for (i=1; i<=10; i++) {
  let button = document.createElement('button')
  button.innerHTML = +i
  
  btn3.appendChild(button)
  button.addEventListener('click', function() {
    console.log(this.innerHTML)

  var btn3Existing = sessionStorage.getItem('question3')
  btn3Existing = btn3Existing? JSON.parse(btn3Existing) : []
  btn3Existing.push(this.innerHTML)
  sessionStorage.setItem('question3',JSON.stringify(btn3Existing))
  
  document.getElementById('Q3A').classList.add('disabledButton')
  })
}

// QUESTION 4: Listen for click -> Store value in session storage -> Disable buttons
const q4a1 = document.getElementById('q4a1')
const q4a2 = document.getElementById('q4a2')
q4a1.onclick = function() {
    var q4a1_Inner = q4a1.innerHTML
    var btn4Existing = sessionStorage.getItem('question4')
    btn4Existing = btn4Existing? JSON.parse(btn4Existing) : []
    btn4Existing.push(q4a1_Inner)
    sessionStorage.setItem('question4',JSON.stringify(btn4Existing))
  
    document.getElementById('Q4A').classList.add('disabledButton')
    document.getElementById('questionDone').classList.remove('disabledButton')
    console.log(btn4Existing)
}
q4a2.onclick = function() {
  var q4a1_Inner = q4a2.innerHTML
    var btn4Existing = sessionStorage.getItem('question4')
    btn4Existing = btn4Existing? JSON.parse(btn4Existing) : []
    btn4Existing.push(q4a1_Inner)
    sessionStorage.setItem('question4',JSON.stringify(btn4Existing))
  
    document.getElementById('Q4A').classList.add('disabledButton')
    document.getElementById('questionDone').classList.remove('disabledButton')
    console.log(btn4Existing)
}

// END QUESTIONNAIRE:
const questionDone = document.getElementById('questionDone')
questionDone.onclick = function () {
document.getElementById('Q1A').classList.remove('disabledButton')
document.getElementById('Q2A').classList.remove('disabledButton')
document.getElementById('Q3A').classList.remove('disabledButton')
document.getElementById('Q4A').classList.remove('disabledButton')

document.getElementById('questionMode').classList.add('hide')
document.getElementById('gameMode').classList.remove('hide')

startBtn.disabled = true
detectBtn.disabled = true
speedBtn.disabled = true
nobikeBtn.disabled = true
doneBtn.disabled = true
}


// Gathers times recorded on local storage, turns them into csv files. downloads csv file to computer
downloadBtn.onclick = function downloadCSV() {

  var data = [ 
    ['screen Dimension', JSON.parse(sessionStorage.getItem('screenDimension'))],
    ['video number', JSON.parse(sessionStorage.getItem('videoNumber'))],
    ['start time', JSON.parse(sessionStorage.getItem('startTime'))],
    ['detect time', JSON.parse(sessionStorage.getItem('detectTime'))],
    ['speed time', JSON.parse(sessionStorage.getItem('speedTime'))],
    ['question 1', JSON.parse(sessionStorage.getItem('question1'))],
    ['question 2', JSON.parse(sessionStorage.getItem('question2'))],
    ['question 3', JSON.parse(sessionStorage.getItem('question3'))],
    ['question 4', JSON.parse(sessionStorage.getItem('question4'))]
  ]

  var csv = 'the results are in,\n';
  data.forEach(function(row) {
          csv += row.join(',');
          csv += "\n";
  })

  //program for downloading whatevers in encodeURI into a csv file
  var hiddenElement = document.createElement('a')
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)
  hiddenElement.target = '_blank'
  hiddenElement.download = 'the results are in.csv'
  hiddenElement.click()
}

