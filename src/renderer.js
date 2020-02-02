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
viewer.setPanorama(path.join(__dirname, '../', dirPath, images[index]))


console.log('hello')