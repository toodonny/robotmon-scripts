// var src = images.read("/sdcard/1.png"); 
// var clip = images.clip(src, 100, 100, 400, 400); 
// images.save(clip, "/sdcard/clip.png");

// 请求横屏截图
// requestScreenCapture(true);
// 截图
// var img = captureScreen();



function reimageGet(x1, y1, x2, y2, filename) {

    var img_W = x2 - x1 + 1;
    var img_H = y2 - y1 + 1;

    var img = captureScreen();
    sleep(100);
    //var src = images.read("/sdcard/1.png"); 

    var clip = images.clip(img, x1, y1, img_W, img_H); 
    images.save(clip, filename+".png");
    
}

