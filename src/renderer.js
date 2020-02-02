var { remote, nativeImage } = require('electron')
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



setUpBrowser(images)
changePanorama(0);


function changePanorama(index){
  viewer.setPanorama(path.join(__dirname, '../', dirPath, images[index]))
}

async function setUpBrowser(images) {
  var browser = document.getElementById('browser-elem')
  browser.removeEventListener('click', browserElemClick)
  browser.innerHTML = ''
  console.log('start')
  
  for(var i=0; i<images.length; i++){
    var element = document.createElement('li')
    element.setAttribute('title', images[i])
    element.setAttribute('index', i)
    var bg = document.createElement('div')
    bg.className = 'bg'
    var thumb = createThumb('./images/'+images[i])
    bg.setAttribute('style', "background-image: url('data:image/png;base64,"+thumb+"')")
    bg.setAttribute('index', i)
    element.appendChild(bg)
    browser.appendChild(element)
  }

  console.log('end')

  browser.addEventListener('click', browserElemClick)
}

function createThumb(filepath){
  var natImg = nativeImage.createFromPath(filepath)
  
  var size = natImg.getSize()
  var smallestSide = Math.min(size.height, size.width)
  var cropSquareSize = parseInt(smallestSide / 2)
  var x = size.width / 2 - cropSquareSize / 2
  var y = size.height / 2 - cropSquareSize / 2
  console.log(size, x, y, cropSquareSize)
  natImg = natImg.crop({x:parseInt(x), y:parseInt(y), width:cropSquareSize, height:cropSquareSize})

  natImg = natImg.resize({width: 100, height: 100, quality:'good'})
  var bufferImg = natImg.toJPEG(70)
  var img64 = bufferImg.toString('base64');
  return img64
}

function browserElemClick(e) {
  console.log(e)
  var index = e.target.getAttribute('index')
  if(index){
    changePanorama(index)
  }
}