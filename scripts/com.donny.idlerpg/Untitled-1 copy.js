////COMMAND START/STOP
runSwitch = 1;

////ROBOTMON DEFAULT SETTING
var config = {
    appName: 'com.qvoq.idlerpg',
    oriScreenWidth: 720, // source
    oriScreenHeight: 1280,
    oriVirtualButtonHeight: 0,
    oriResizeFactor: 1, 
    eventDelay: 50,
    imageThreshold: 1,
    imageQuality: 100,
    resizeFactor: 1, // small -> quickly
    scriptDir: 'scripts/com.qvoq.idlerpg/images',
    isRunning: false,
  };
  var rbm = new RBM(config);
  rbm.init();

////TOOL FUNCTION
function checkPointcolor(intX, intY, diff, strRGB) { //return
	if (!config.isRunning) return false;

    checkr = parseInt(strRGB.substr(0, 2), 16) * 1;
    checkg = parseInt(strRGB.substr(2, 2), 16) * 1;
    checkb = parseInt(strRGB.substr(4, 2), 16) * 1;
    checka = 0;

    var img = getScreenshotModify(intX, intY, 1, 1, 1, 1, 100);
    var getpoint = getImageColor(img, 0, 0);
    var check = isSameColor({b:checkb, g:checkg, r:checkr, a:checka}, getpoint, diff);
    releaseImage(img);
    // rbm.log('orgpoint:', {b:checkb, g:checkg, r:checkr})
    // rbm.log('getpoint:', getpoint);
    return check;
}

function checkPointcolorTap(intX, intY, diff, strRGB, TapX, TapY, TapTimes, Delay1, Taptype) { //type: 0:TapX, TapY, 1:intX, intY, 2:return
	if (!config.isRunning) return false;

    check = checkPointcolor(intX, intY, diff, strRGB);
    if (Taptype == 2) {return check;} //console.log('check:', check);
    for (var i = 0; i < TapTimes; i++) {
        if (check) {
            if (Taptype == 0) { tap(TapX, TapY, 60); } //console.log('Tap TapX, TapY: ', TapX, TapY)
            else if (Taptype == 1) { tap(intX, intY, 60); } //console.log('Tap intX, intY: ', intX, intY)
            sleep(Delay1)
        }
    }
}

function checkPointcolor3(intX1, intY1, diff1, strRGB1, intX2, intY2, diff2, strRGB2, intX3, intY3, diff3, strRGB3 ) { //return
	if (!config.isRunning) return false;

    if (checkPointcolor(intX1, intY1, diff1, strRGB1) & checkPointcolor(intX2, intY2, diff2, strRGB2) & checkPointcolor(intX3, intY3, diff3, strRGB3)) {
        var check = true;
        console.log('3p check true');
    } else {
        var check = false;
        console.log('3p check false');
    }

    return check;
}


////FLOW FUNCTION
function game01(){
	if (!config.isRunning) return false;
    console.log('in: game01()');

    if(checkPointcolor(536, 1123, 50, '4A90E2')){ //return
        tap(536, 1123, 50);//點中間位置
        sleep(2000);
    }


    if(checkPointcolor3(216, 1336, 50, '4A90E2', 244, 1393, 50, 'FFFFFF', 306, 1419, 50, '4A90E2' )){ //return
        tap(226, 1231, 50); //打勾
        sleep(2000);
        
        tap(216, 1336, 50);//Play a minigame
        sleep(2000);
    }
    sleep(1000);
}

function getbig(){
	if (!config.isRunning) return false;
    console.log('in: getbig()');

    checkPointcolorTap(405, 230, 50, 'E7A4A1',405, 230, 1,50,0);//點上面點數
    sleep(300)

    for(var i1 = 0; i1 < 8; ++i1){
	    if (!config.isRunning) return false;

        if (checkPointcolor(788, 1347, 50, '747474')) { //檢查那個5在不在
            tap(788, 1347, 50);
            sleep(300);

            for(var i2 = 0; i2 < 8; ++i2){
	            if (!config.isRunning) return false;

                if (checkPointcolor(626, 1592, 50, '40D293')) {//有OPEN再點上面的big
                    tap(788, 1347, 50);
                    sleep(300);
                    tap(626, 1592, 50);
                    sleep(300);
                    
                    var i5=0;
                    for(var i3 = 0; i3 < 15; ++i3){
	                    if (!config.isRunning) return false;

                        if (checkPointcolor(824, 774, 50, 'E6E4E4')) {//檢查big是否灰色
                            for(var i4 = 0; i4 < 3; ++i4){
                                if (!config.isRunning) return false;
                                tap(830, 800, 50);
                                sleep(200);
                                tap(830, 1000, 50);
                                sleep(200);
                                tap(830, 1200, 50);
                                sleep(200);
                            }
                        }

                        if (checkPointcolor(716, 1692, 50, '40D293')) {    //檢查是否刷新
                            tap(723, 1689, 50);    //點刷新
                        }
                        sleep(1000);
                    }
                    tap(903, 515, 50);
                    break;
                }
                sleep(300);
            }
        }

        if (checkPointcolor(777,1348, 50, '747474')) {    //檢查那個5不在就是錯誤去點X
            tap(788, 1347, 50);
            sleep(300);
            break;
        }

        sleep(300);
    }
}


////MAIN FLOW FUNCTION
function main(){       //主流程
	if (!config.isRunning) return false;
    //getbig();
    game01();
    sleep(1000);

}


////ROBOTMON START SETTING
function start(runF) {
	rbm.init();
	config.isRunning = runF;

	while(config.isRunning) { main(); }
}


start(runSwitch);