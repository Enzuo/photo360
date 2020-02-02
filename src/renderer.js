var remote = require('electron').remote
var PhotoSphereViewer = require('photo-sphere-viewer')
var fs = require('fs')
const path = require('path')


var viewer = new PhotoSphereViewer({
  container: 'viewer',
  // panorama: '../images/strad_salon3v2.jpg'
})


var dirPath = './images'
var images = fs.readdirSync(dirPath)
var index = 0;
console.log(images)


function changePanorama(index){
  viewer.setPanorama(path.join(__dirname, '../', dirPath, images[index]))
}

setUpBrowser(images)
changePanorama(0);

function setUpBrowser(images) {
  var browser = document.getElementById('browser-elem')
  browser.removeEventListener('click', browserElemClick)
  browser.innerHTML = ''
  
  for(var i=0; i<images.length; i++){
    var element = document.createElement('li')
    element.innerHTML = images[i]
    element.setAttribute('index', i)
    browser.appendChild(element)
  }

  browser.addEventListener('click', browserElemClick)
}
function browserElemClick(e) {
  console.log(e)
  var index = e.target.getAttribute('index')
  if(index){
    changePanorama(index)
  }
}

console.log('hello')