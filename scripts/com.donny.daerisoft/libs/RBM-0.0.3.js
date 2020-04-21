var DEFAULT_CONFIG = {
  appName: 'testApp',
  oriScreenWidth: 1080,
  oriScreenHeight: 1920,
  oriVirtualButtonHeight: 0,
  oriResizeFactor: 0.4,
  eventDelay: 200,
  imageThreshold: 0.85,
  imageQuality: 80,
  resizeFactor: 0.4,
};

function RBM(config) {
  if (config == undefined) {
      config = DEFAULT_CONFIG;
  }
  this.appName = config.appName || DEFAULT_CONFIG.appName;
  this.oriScreenWidth = config.oriScreenWidth || DEFAULT_CONFIG.oriScreenWidth;
  this.oriScreenHeight = config.oriScreenHeight || DEFAULT_CONFIG.oriScreenHeight;
  this.oriVirtualButtonHeight = config.oriVirtualButtonHeight || DEFAULT_CONFIG.oriVirtualButtonHeight;
  this.oriAppWidth = this.oriScreenWidth;
  this.oriAppHeight = this.oriScreenHeight - this.oriVirtualButtonHeight;
  this.oriResizeFactor = config.oriResizeFactor || DEFAULT_CONFIG.oriResizeFactor;
  this.resizeFactor = config.resizeFactor || DEFAULT_CONFIG.resizeFactor;
  this.imageThreshold = config.imageThreshold || DEFAULT_CONFIG.imageThreshold;
  this.imageQuality = config.imageQuality || DEFAULT_CONFIG.imageQuality;
  this.screenWidth = 0;
  this.screenHeight = 0;
  this.resizeScreenWidth = 0;
  this.resizeScreenHeight = 0;
  this.appWidth = 0;
  this.appHeight = 0;
  this.appMinRatio = 1;
  this.appMaxRatio = 1;
  this.researchTimes = 5;
  this.virtualButtonHeight = 0;
  this.ip = '';
  this.during = config.eventDelay || DEFAULT_CONFIG.eventDelay;
  this.running = true;
  this.isPartial = false;
  this.partialOffsetXY = {x: 0, y: 0};
  
  this._screenshotImg = 0;
}

RBM.prototype.init = function() {
  var size = getScreenSize();
  this.screenWidth = size.width;
  this.screenHeight = size.height;
  this.virtualButtonHeight = getVirtualButtonHeight();
  this.appWidth = this.screenWidth;
  if (this.oriVirtualButtonHeight !== 0) {
    this.appHeight = this.screenHeight - this.virtualButtonHeight;
  } else {
    this.appHeight = this.screenHeight;
  }
  this.resizeAppWidth = this.appWidth * this.resizeFactor;
  this.resizeAppHeight = this.appHeight * this.resizeFactor;
  var appWidthRatio = this.appWidth / this.oriAppWidth;
  var appHeightRatio = this.appHeight / this.oriAppHeight;
  this.appMinRatio = Math.min(appWidthRatio, appHeightRatio);
  this.appMaxRatio = Math.max(appWidthRatio, appHeightRatio);
};

RBM.prototype.log = function() {
  sleep(10);
  for (var i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] == 'object') {
      arguments[i] = JSON.stringify(arguments[i]);
    }
  }
  console.log.apply(console, arguments);
};

RBM.prototype.mappingImageWHs = function(wh) {
  var nWHs = [];
  if (this.appMinRatio === this.appMaxRatio) {
    // width and height is same ratio
    nWHs.push({width: wh.width * this.appMinRatio, height: wh.height * this.appMinRatio});
  } else {
    // 100 200, 100 240,  1, 1.2
    var stepRatio = (this.appMaxRatio - this.appMinRatio) / this.researchTimes;
    for (var r = this.appMinRatio; r <= this.appMaxRatio; r += stepRatio) {
      nWHs.push({width: wh.width * r, height: wh.height * r});
    }
  }
  return nWHs;
};

RBM.prototype.mappingXY = function(xy) {
  var nx = Math.round(xy.x * this.appWidth / this.oriAppWidth);
  var ny = Math.round(xy.y * this.appHeight / this.oriAppHeight);
  return {x: nx, y: ny};
};

RBM.prototype.getImagePath = function() {
  return getStoragePath() + "/scripts/" + this.appName + "/images";
};

// app utils
RBM.prototype.startApp = function(packageName, activityName) {
  if (activityName === undefined) {
    execute('monkey -p ' + packageName + ' -c android.intent.category.LAUNCHER 1');
  } else {
    execute('am start -n ' + packageName + '/' + activityName);
  }
};

RBM.prototype.stopApp = function(packageName) {
  execute('am force-stop ' + packageName);
};

RBM.prototype.currentApp = function() {
  var result = execute('dumpsys activity activities').split('mFocusedActivity')[1].split(" ")[3].split("/");
  var packageName = result[0];
  var activityName = result[1];
  return {packageName: packageName, activityName: activityName};
};

// touch utils
RBM.prototype.click = function(xy) {
  xy = this.mappingXY(xy);
  tap(xy.x, xy.y, this.during);
};
RBM.prototype.tapDown = function(xy) {
  xy = this.mappingXY(xy);
  tapDown(xy.x, xy.y, this.during);
};
RBM.prototype.moveTo = function(xy) {
  xy = this.mappingXY(xy);
  moveTo(xy.x, xy.y, this.during);
};
RBM.prototype.tapUp = function(xy) {
  xy = this.mappingXY(xy);
  tapUp(xy.x, xy.y, this.during);
};

RBM.prototype.swipe = function(fromXY, toXY, step) {
  if (step === undefined) {
    step = 5;
  }
  fromXY = this.mappingXY(fromXY);
  toXY = this.mappingXY(toXY);
  var during = this.during / (step + 2) ;
  var diffX = (toXY.x - fromXY.x) / step;
  var diffY = (toXY.y - fromXY.y) / step;

  tapDown(fromXY.x, fromXY.y, during);
  for (var i = 0; i <= step; i++) {
    moveTo(fromXY.x + i * diffX, fromXY.y + i * diffY, during);
  }
  tapUp(toXY.x, toXY.y, during);
};

// image utils
RBM.prototype.screenshot = function(filename) {
  var filePath = this.getImagePath() + '/' + filename;
  var rbmImg = getScreenshotModify(0, 0, this.appWidth, this.appHeight, this.resizeAppWidth, this.resizeAppHeight, this.imageQuality);
  saveImage(rbmImg, filePath);
  releaseImage(rbmImg);
};

RBM.prototype.oriScreencrop = function(filename, x, y, x2, y2) {
  var filePath = this.getImagePath() + '/' + filename;
  var w = Math.abs(x2 - x);
  var h = Math.abs(y2 - y);
  var rbmImg = getScreenshotModify(Math.min(x, x2), Math.min(y, y2), w, h, w * this.oriResizeFactor, h * this.oriResizeFactor, this.imageQuality);
  saveImage(rbmImg, filePath);
  releaseImage(rbmImg);
};

RBM.prototype.screencrop = function(filename, fx, fy, tx, ty) {
  var filePath = this.getImagePath() + '/' + filename;
  var fxy = this.mappingXY({x: fx, y: fy});
  var txy = this.mappingXY({x: tx, y: ty});
  var w = Math.abs(txy.x - fxy.x);
  var h = Math.abs(txy.y - fxy.y);
  var rbmImg = getScreenshotModify(Math.min(fxy.x, txy.x), Math.min(fxy.y, txy.y), w, h, w * this.resizeFactor, h * this.resizeFactor, this.imageQuality);
  saveImage(rbmImg, filePath);
  releaseImage(rbmImg);
};

RBM.prototype.findImage = function(filename, threshold) {
  if (threshold === undefined) {
    threshold = this.imageThreshold;
  }
  var sourceImg = 0; 
  if (this._screenshotImg != 0) {
    sourceImg = this._screenshotImg;
  } else {
    sourceImg = getScreenshotModify(0, 0, this.appWidth, this.appHeight, this.resizeAppWidth, this.resizeAppHeight, this.imageQuality);
  }
  var filePath = this.getImagePath() + '/' + filename;
  var targetImg = openImage(filePath);
  if (targetImg === 0) {
    this.log("Image is not found: ", filePath);
    if (sourceImg != this._screenshotImg) {
      releaseImage(sourceImg);
    }
    return undefined;
  }
  var imageSize = getImageSize(targetImg);
  imageSize.width *= this.resizeFactor / this.oriResizeFactor;
  imageSize.height *= this.resizeFactor / this.oriResizeFactor;
  var nWHs = this.mappingImageWHs(imageSize);
  var result = undefined;
  for (var i = 0; i < nWHs.length; i++) {
    var nWH = nWHs[i];
    var rImg = resizeImage(targetImg, nWH.width, nWH.height);
    result = findImage(sourceImg, rImg);
    result.width = nWH.width;
    result.height = nWH.height;
    releaseImage(rImg);
    if (result.score >= threshold) {
      break;
    } else {
      result = undefined;
    }
  }
  releaseImage(targetImg);
  if (sourceImg != this._screenshotImg) {
    releaseImage(sourceImg);
  }
  
  if (result !== undefined) {
    result.x = this.partialOffsetXY.x + result.x * (this.appWidth / this.resizeAppWidth);
    result.y = this.partialOffsetXY.y + result.y * (this.appHeight / this.resizeAppHeight);
    result.width *= this.appWidth / this.resizeAppWidth;
    result.height *= this.appWidth / this.resizeAppWidth;
  }
  return result;
}

RBM.prototype.findImages = function(filename, threshold, countLimit, allowOverlap, deep) {
  if (threshold === undefined) {
    threshold = this.imageThreshold;
  }
  var sourceImg = 0; 
  if (this._screenshotImg != 0) {
    sourceImg = this._screenshotImg;
  } else {
    sourceImg = getScreenshotModify(0, 0, this.appWidth, this.appHeight, this.resizeAppWidth, this.resizeAppHeight, this.imageQuality);
  }
  var filePath = this.getImagePath() + '/' + filename;
  var targetImg = openImage(filePath);
  if (targetImg === 0) {
    this.log("Image is not found: ", filePath);
    if (sourceImg != this._screenshotImg) {
      releaseImage(sourceImg);
    }
    return [];
  }
  var imageSize = getImageSize(targetImg);
  imageSize.width *= this.resizeFactor / this.oriResizeFactor;
  imageSize.height *= this.resizeFactor / this.oriResizeFactor;
  var nWHs = this.mappingImageWHs(imageSize);
  var results = [];
  for (var i = 0; i < nWHs.length; i++) {
    var nWH = nWHs[i];
    var rImg = resizeImage(targetImg, nWH.width, nWH.height);
    var tmpResults = findImages(sourceImg, rImg, threshold, countLimit, !allowOverlap);
    releaseImage(rImg);
    for (var k in tmpResults) {
      results.push({
        x: tmpResults[k].x,
        y: tmpResults[k].y,
        width: nWH.width,
        height: nWH.height,
        score: tmpResults[k].score,
      });
    }
    if (results.length >= countLimit) {
      break;
    }
    if (!deep && results.length > 0) {
      break;
    }
  }
  releaseImage(targetImg);
  if (sourceImg != this._screenshotImg) {
    releaseImage(sourceImg);
  }
  for (var i in results) {
    results[i].x = this.partialOffsetXY.x + results[i].x * (this.appWidth / this.resizeAppWidth);
    results[i].y = this.partialOffsetXY.y + results[i].y * (this.appHeight / this.resizeAppHeight);
    results[i].width *= this.appWidth / this.resizeAppWidth;
    results[i].height *= this.appWidth / this.resizeAppWidth;
  }
  return results;
}

RBM.prototype.imageExists = function(filename, threshold) {
  var result = this.findImage(filename, threshold);
  if (result === undefined) {
    return false;
  }
  return true;
};

RBM.prototype.imageClick = function(filename, threshold) {
  var result = this.findImage(filename, threshold);
  if (result === undefined) {
    return false;
  }
  var x = result.x + (result.width / 2);
  var y = result.y + (result.height / 2);
  tap(x, y, this.during);
  return true;
};

RBM.prototype.imageWaitClick = function(filename, timeout, threshold) {
  if (timeout === undefined) {
    timeout = 10000;
  }
  var startTime = Date.now();
  while(this.running) {
    var result = this.findImage(filename, threshold);
    if (result !== undefined) {
      var x = result.x + (result.width / 2);
      var y = result.y + (result.height / 2);
      tap(x, y, this.during);
      return true;
    }
    sleep(this.during * 3);
    if (Date.now() - startTime > timeout) {
      return false;
    }
  }
};

RBM.prototype.imageWaitShow = function(filename, timeout, threshold) {
  if (timeout === undefined) {
    timeout = 10000;
  }
  var startTime = Date.now();
  while(this.running) {
    var result = this.findImage(filename, threshold);
    if (result !== undefined) {
      break;
    }
    sleep(this.during * 3);
    if (Date.now() - startTime > timeout) {
      break;
    }
  }
};

RBM.prototype.imageWaitGone = function(filename, timeout, threshold) {
  if (timeout === undefined) {
    timeout = 10000;
  }
  var startTime = Date.now();
  while(this.running) {
    var result = this.findImage(filename, threshold);
    if (result === undefined) {
      break;
    }
    sleep(this.during * 3);
    if (Date.now() - startTime > timeout) {
      break;
    }
  }
};

RBM.prototype.keepScreenshot = function() {
  if (this._screenshotImg != 0) {
    releaseImage(this._screenshotImg);
    this._screenshotImg = 0;
  }
  this._screenshotImg = getScreenshotModify(0, 0, this.appWidth, this.appHeight, this.resizeAppWidth, this.resizeAppHeight, this.imageQuality);
};

RBM.prototype.keepScreenshotPartial = function(fx, fy, tx, ty) {
  if (this._screenshotImg != 0) {
    releaseImage(this._screenshotImg);
    this._screenshotImg = 0;
  }
  var fxy = this.mappingXY({x: fx, y: fy});
  var txy = this.mappingXY({x: tx, y: ty});
  var w = Math.abs(txy.x - fxy.x);
  var h = Math.abs(txy.y - fxy.y);
  this._screenshotImg = getScreenshotModify(Math.min(fxy.x, txy.x), Math.min(fxy.y, txy.y), w, h, w * this.resizeFactor, h * this.resizeFactor, this.imageQuality);
  this.isPartial = true;
  this.partialOffsetXY = {x: Math.min(fxy.x, txy.x), y: Math.min(fxy.y, txy.y)};
}

RBM.prototype.releaseScreenshot = function() {
  if (this._screenshotImg != 0) {
    releaseImage(this._screenshotImg);
    this._screenshotImg = 0;
  }
  this.isPartial = false;
  this.partialOffsetXY = {x: 0, y: 0};
};

// others
RBM.prototype.typing = function(label) {
  typing(label, this.during);
};

RBM.prototype.keycode = function(label) {
  keycode(label, this.during);
};

RBM.prototype.sleep = function() {
  sleep(this.during);
};

// ============== RBM Test ==============

/*
var config = {
  appName: 'com.rbm.test',
  oriScreenWidth: 1440,
  oriScreenHeight: 2560,
  oriVirtualButtonHeight: 0,
  oriResizeFactor: 1,
  eventDelay: 200,
  imageThreshold: 0.85,
  imageQuality: 80,
  resizeFactor: 0.5,
};

function testMappingImageWHs() {
  // 1
  var rbm = new RBM(config);
  rbm.init();
  var results = rbm.mappingImageWHs({height: 150, width: 120});
  if (results[0].height != 150 || results[0].width != 120) {
    rbm.log("Error result.height != 150 || result.width != 120", results);
  }
  
  // 2
  rbm = new RBM(config);
  rbm.oriAppWidth = 1440;
  rbm.oriAppHeight = 3072;
  rbm.init();
  var results = rbm.mappingImageWHs({height: 150, width: 120});
  if (results[0].height != 125 || results[5].height != 150) {
    rbm.log("Error results[0].height != 125 || results[5].height != 150", results);
  }
  
  // 3
  rbm = new RBM(config);
  rbm.oriAppWidth = 720;
  rbm.oriAppHeight = 1536;
  rbm.init();
  var results = rbm.mappingImageWHs({height: 150, width: 120});
  if (results[0].height != 250 || results[5].height != 300) {
    rbm.log("Error results[0].height != 250 || results[5].height != 300", results);
  }
}

function testFindImage() {
  var rbm = new RBM(config);
  rbm.init();
  //rbm.oriScreencrop('test1.png', 50, 120, 450, 320); // h 200, w 400
  
  // 1
  var result = rbm.findImage('test1.png');
  if (result.height != 200 || result.width != 400 || result.x != 50 || result.y != 120) {
    rbm.log("Error result.height != 200 || result.width != 400 || result.x != 50 || result.y != 120", result);
  }
  
  // 2
  rbm.keepScreenshotPartial(0, 20, 500, 420);
  var result = rbm.findImage('test1.png');
  if (result.height != 200 || result.width != 400 || result.x != 50 || result.y != 120) {
    rbm.log("Error result.height != 200 || result.width != 400 || result.x != 50 || result.y != 120", result);
  }
  rbm.releaseScreenshot();
}

function testFindImageRetry() {
  var rbm = new RBM(config);
  rbm.oriAppWidth = 1440;
  rbm.oriAppHeight = 3072;
  rbm.init();
  
  // 1
  var result = rbm.findImage('test1.png', 0.95);
  rbm.log(result);
  if (result.height != 200 || result.width != 400 || result.x != 50 || result.y != 120) {
    rbm.log("Error result.height != 200 || result.width != 400 || result.x != 50 || result.y != 120", result);
  }
  
  // 2
  rbm.keepScreenshotPartial(0, 20, 500, 420);
  var result = rbm.findImage('test1.png', 0.95);
  if (result.height != 200 || result.width != 400 || result.x != 50 || result.y != 120) {
    rbm.log("Error result.height != 200 || result.width != 400 || result.x != 50 || result.y != 120", result);
  }
  rbm.releaseScreenshot();
}

function testFindImages() {
  var rbm = new RBM(config);
  rbm.init();
  //rbm.oriScreencrop('test1.png', 50, 120, 450, 320); // h 200, w 400
  
  // 1
  var results = rbm.findImages('test1.png', 0.95, 3, false);
  rbm.log(results);
  if (results[0].height != 200 || results[0].width != 400 || results[0].x != 50 || results[0].y != 120) {
    rbm.log("Error result.height != 200 || result.width != 400 || result.x != 50 || result.y != 120", result);
  }
}

testMappingImageWHs();
testFindImage();
testFindImageRetry();
testFindImages();
*/
