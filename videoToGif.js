function togif(uri, opts, callback) {

  /*!
   * gif
   */
  
  // create gif instance
  var gif = new GIF({
    workers: 2,
    quality: opts.quality,
    width: opts.width,
    height: opts.height
  });

  // callback after gif rendering
  gif.on('finished', function(blob) {
    callback(URL.createObjectURL(blob));
  });

  // follow gif rendering progress
  gif.on('progress', function(p) {
    console.log(p);
  });

  /*! 
   * jpeg reading to frame adding
   */
  
  // globals
  var fileCount = 0;
  var snaps = [];
  var putInGif = function(i) {
    if(snaps[i] !== undefined) {
      window.resolveLocalFileSystemURL('file://' + snaps[i], gotFile, fail);
    } else {
      gif.render();
    }
  };

  // classic fail error handler
  function fail(e) {
    console.log("FileSystem Error");
    console.dir(e);
  }

  // we have the jpeg
  function gotFile(fileEntry) {
    fileEntry.file(function(file) {
      var reader = new FileReader();
      reader.onloadend = function(e) {
        var img = document.createElement('img');
        img.src = e.target.result;

        // add the frame to the gif
        gif.addFrame(img);

        // read the next jpeg
        fileCount++;
        putInGif(fileCount);
      }

      // read it
      reader.readAsDataURL(file);
    });
  }

  /*!
   * movie download part
   */

  // initialize FileTransfer
  var fileTransfer = new FileTransfer();

  // download file
  fileTransfer.download(encodeURI(uri), 'cdvfile://localhost/persistent/movie.mp4', function(entry) {

    // set snap conf
    var snapConf = {
        source: entry.toURL().replace('file://', '').replace(/%20/g, ' '),
        count: opts.frames,
        timeStamp: opts.timestamp,
        offset: opts.offset,
        width: opts.width,
        height: opts.height
    }

    // take snap
    sebible.videosnapshot.snapshot(function(result) {
      if (result && result.result) {
        snaps = result.snapshots;
        putInGif(0);
      }
    }, fail, snapConf);
  }, function(error) {
      console.log("download error source " + error.source);
      console.log("download error target " + error.target);
      console.log("upload error code" + error.code);
  }, false); 
}