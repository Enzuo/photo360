var remote = require('electron').remote
var PhotoSphereViewer = require('photo-sphere-viewer')

var viewer = new PhotoSphereViewer({
  container: 'viewer',
  panorama: '../images/strad_salon3v2.jpg'
})