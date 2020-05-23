//https://arjunjmistry.github.io/Light/
const result = document.getElementById ('result')
const launchBtn = document.getElementById ('launchBtn')
const startBtn = document.getElementById ('startBtn')
const detectBtn = document.getElementById ('detectBtn')
const speedBtn = document.getElementById ('speedBtn')
const doneBtn = document.getElementById ('doneBtn')
const downloadBtn = document.getElementById ('downloadBtn')
const text = document.getElementById ('text')
const video = document.getElementById('video')

//Clear session storage so that previous existing data is deleted
sessionStorage.clear()



//range of numbers 1 - 6
var array = [];i=1;while(array.push(i++)<6);
//Shuffle function
function shuffle(array) {
  let count = array.length;
  while(count) {
    array.push(array.splice(Math.floor(Math.random() * count), 1)[0]);
    count -= 1;
  }
}
// shuffle array
shuffle(array)

downloadBtn.disabled = true

// Load (next) video
launchBtn.onclick = function () {
  if (i < 6) {i++} else if (i = 6) {i = 0}
video.src = array[i] + '.mp4'
video.pause()

var videoNumber = sessionStorage.getItem('videoNumber')
  videoNumber = videoNumber? JSON.parse(videoNumber) : []
  videoNumber.push(array[i])
  sessionStorage.setItem('videoNumber',JSON.stringify(videoNumber))

  console.log(array[i])

}

// Start button click -> play video -> checks for existing data -> appends new time data -> sends back to storage
startBtn.addEventListener ('click', function() {
  video.play()

})


// Start button click -> checks for existing data -> appends new time data -> sends back to storage -> disables button
// Later on you can remove innerhtml lines and store straight to storage
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


// Start button click -> checks for existing data -> appends new time data -> sends back to storage -> disables button
// Later on you can remove innerhtml lines and store straight to storage
detectBtn.onclick = function(detect2Time, detectTime) {
  var detect2Time = Date.now()
  var detectExisting = sessionStorage.getItem('detectTime')
  detectExisting = detectExisting? JSON.parse(detectExisting) : []
  detectExisting.push(detect2Time)
  sessionStorage.setItem('detectTime',JSON.stringify(detectExisting))

  result.innerHTML = detect2Time
  console.log(detect2Time)
  detectBtn.disabled = true
}

// Start button click -> checks for existing data -> appends new time data -> sends back to storage -> disables button
// Later on you can remove innerhtml lines and store straight to storage
speedBtn.onclick = function(speed2Time, speedTime) {
  var speed2Time = Date.now()
  var speedExisting = sessionStorage.getItem('speedTime')
  speedExisting = speedExisting? JSON.parse(speedExisting) : []
  speedExisting.push(speed2Time)
  sessionStorage.setItem('speedTime',JSON.stringify(speedExisting))

  result.innerHTML = speed2Time
  console.log(speed2Time)
  speedBtn.disabled = true
  
}

// Enables all buttons // this will load next video
doneBtn.onclick = function() {
  startBtn.disabled = false
  detectBtn.disabled = false
  speedBtn.disabled = false
  if (i < 5) {downloadBtn.disabled = true} else if (i = 5) {downloadBtn.disabled = false}
}



// Gathers times recorded on local storage, turns them into csv files. downloads csv file to computer
downloadBtn.onclick = function downloadCSV() {

  var data = [
    ['video number', JSON.parse(sessionStorage.getItem('videoNumber'))],
    ['start time', JSON.parse(sessionStorage.getItem('startTime'))],
    ['detect time', JSON.parse(sessionStorage.getItem('detectTime'))],
    ['speed time', JSON.parse(sessionStorage.getItem('speedTime'))]
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
  hiddenElement.download = 'people.csv'
  hiddenElement.click()
}

