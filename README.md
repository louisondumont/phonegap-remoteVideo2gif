phonegap-remoteVideo2gif
========================

Script to Download a video, and convert it to gif, with Phonegap

It goes over Access-Control-Allow-Origin headers by using Phonegap's FileTransfer plugin and an other plugin to convert the downloaded video to jpeg files, gif.js is then used to generate the gif in HTML5.

Setup
=====
Install plugins
```
cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file.git
cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file-transfer.git
cordova plugin add https://github.com/louisondumont/cordova-videosnapshot
```

Put gif.js script in your project
```
<script type="text/javascript" src="http://jnordberg.github.io/gif.js/gif.js?v=3"></script>
```

Put videoToGif.js
```
<script type="text/javascript" src="videoToGif.js"></script>
```

Usage
=====
```
var opts = {
  quality: 80,
  width: 200,
  height: 100,
  frames: 10,
  timestamp: true, // add timestamping to frames
  offset: -20 // start converting 20 seconds from the end
}

togif('http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', opts, function(blob) {
    // do sth with blob
});
```
