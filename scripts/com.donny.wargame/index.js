importJS('RBM-0.0.3');

// ============================idlerpg=============================== //

var config = {
  appName: 'com.donny.wargame',   //
  oriScreenWidth: 1080, // source
  oriScreenHeight: 2340,
  oriVirtualButtonHeight: 0,
  oriResizeFactor: 1, 
  eventDelay: 50,
  imageThreshold: 1,
  imageQuality: 100,
  resizeFactor: 1, // small -> quickly
  scriptDir: '/sdcard/Robotmon/scripts/com.donny.wargame/images',
  isRunning: false,
  PackangName: 'com.joycrit.wargame.tc',
  LaunchActivityName: 'org.cocos2dx.lua.WelcomeActivity',
  TiPackangName: 'com.keramidas.TitaniumBackup',
  TiLaunchActivityName: 'com.keramidas.TitaniumBackup.MainActivity',
};

// 應用:獵鷹行動
// 包名:com.joycrit.wargame.tc
// 啟動類:org.cocos2dx.lua.WelcomeActivity

var rbm = new RBM(config);
rbm.init();
 
function isSameColor(c1, c2, diff) {
	if (!config.isRunning) return false;
	if (diff == undefined) diff = 20;
	if (Math.abs(c1.r - c2.r) > diff) return false;
	if (Math.abs(c1.g - c2.g) > diff) return false;
	if (Math.abs(c1.b - c2.b) > diff) return false;
	if (Math.abs(c1.a - c2.a) > diff) return false;
	return true;
}

function isSameColorHex(c1, c2, diff) {
	if (!config.isRunning) return false;
	if (diff == undefined) diff = 20;

	var chkr = parseInt(c1.substr(0, 2), 16)*1 - parseInt(c2.substr(0, 2), 16)*1;
	var chkg = parseInt(c1.substr(2, 2), 16)*1 - parseInt(c2.substr(2, 2), 16)*1;
	var chkb = parseInt(c1.substr(4, 2), 16)*1 - parseInt(c2.substr(4, 2), 16)*1;

	// console.log(c1.substr(0, 2), c2.substr(0, 2));
	// console.log(c1.substr(2, 2), c2.substr(2, 2));
	// console.log(c1.substr(4, 2), c2.substr(4, 2));
	// console.log('chkr:', chkr, ', chkg:', chkg, ', chkb:', chkb);

	if (Math.abs(chkr) > diff) return false;
	if (Math.abs(chkg) > diff) return false;
	if (Math.abs(chkb) > diff) return false;
	return true;
}

function checkPointcolor0(intX, intY, diff, strRGB) {  //return 
	if (!config.isRunning) return false;

	checkr = parseInt(strRGB.substr(0, 2), 16) * 1;
	checkg = parseInt(strRGB.substr(2, 2), 16) * 1;
	checkb = parseInt(strRGB.substr(4, 2), 16) * 1;
	checka = 0;
	
	var img = getScreenshot();
    var getpoint = getImageColor(img, intX, intY);
	var check = isSameColor({b:checkb, g:checkg, r:checkr, a:checka}, getpoint, diff);
	releaseImage(img);
	
	return check;
}

function getPointcolor(intX, intY) {  //return 
	if (!config.isRunning) return false;
	
	var img = getScreenshotModify(intX, intY, 1, 1, 1, 1, 100);
    var getpoint = getImageColor(img, 0, 0);
	releaseImage(img);
	// console.log(getpoint.r, getpoint.g, getpoint.b);
	
	return getpoint;
}

function getPointcolorHex(intX, intY) {  //return 
	if (!config.isRunning) return false;
	
	var img = getScreenshotModify(intX, intY, 1, 1, 1, 1, 100);
    var getpoint = getImageColor(img, 0, 0);
	releaseImage(img);
	// console.log(getpoint.r, getpoint.g, getpoint.b);
	
	getkr = getpoint.r.toString(16);
	getkg = getpoint.g.toString(16);
	getkb = getpoint.b.toString(16);
	
	// console.log(getkr, getkb, getkg);
	
	if (getpoint.r <= 15) getkr = '0' + getkr;
	if (getpoint.g <= 15) getkg = '0' + getkg;
	if (getpoint.b <= 15) getkb = '0' + getkb;

	getcolorHEX = getkr + getkg + getkb;

	getcolorHEX = getcolorHEX.toUpperCase();

	// console.log(getkr, getkb, getkg, getcolorHEX);
	
	return getcolorHEX;
}

function getpointHex(imgN, x, y) {
	if (!config.isRunning) return false;

	var getpoint = getImageColor(imgN, x, y);

	getkr = getpoint.r.toString(16);
	getkg = getpoint.g.toString(16);
	getkb = getpoint.b.toString(16);
	
	if (getpoint.r <= 16) getkr = '0' + getkr;
	if (getpoint.g <= 16) getkg = '0' + getkg;
	if (getpoint.b <= 16) getkb = '0' + getkb;

	var colorRGB = getkr + getkg + getkb;
	return colorRGB.toUpperCase();
}

function checkPointcolor(intX, intY, diff, strRGB) {  //return 
	if (!config.isRunning) return false;

	checkr = parseInt(strRGB.substr(0, 2), 16) * 1;
	checkg = parseInt(strRGB.substr(2, 2), 16) * 1;
	checkb = parseInt(strRGB.substr(4, 2), 16) * 1;
	checka = 0;
	
	var img = getScreenshotModify(intX, intY, 1, 1, 1, 1, 100);
    var getpoint = getImageColor(img, 0, 0);
	var check = isSameColor({b:checkb, g:checkg, r:checkr, a:checka}, getpoint, diff);
	releaseImage(img);
	//rbm.log('getpoint:', getpoint);
	return check;
}

function checkPointcolor3(intX1, intY1, diff1, strRGB1, intX2, intY2, diff2, strRGB2, intX3, intY3, diff3, strRGB3 ) {  //return 
	if (!config.isRunning) return false;

	if (checkPointcolor(intX1, intY1, diff1, strRGB1) & checkPointcolor(intX2, intY2, diff2, strRGB2) & checkPointcolor(intX3, intY3, diff3, strRGB3)) {
		var check = true;
		//console.log('3p check true');
	}
	else {
		var check =  false;
		//console.log('3p check false');
	}
	
	return check;
}

function checkPointcolorTap(intX, intY, diff, strRGB, TapX, TapY, TapTimes, Delay1, Taptype) {  //type: 0:TapX, TapY, 1:intX, intY, 2:return 
	if (!config.isRunning) return false;
	
	check = checkPointcolor(intX, intY, diff, strRGB);
	if (Taptype == 2) {return check;}                       //console.log('check:', check);
	for (var i = 0; i < TapTimes; i++) {
		if (!config.isRunning) return false;
		
		if (check) {
			if (Taptype == 0) { tap(TapX, TapY, 60); }          //console.log('Tap TapX, TapY: ', TapX, TapY)
			else if (Taptype == 1) { tap(intX, intY, 60); } 	//console.log('Tap intX, intY: ', intX, intY)
			sleep(Delay1)
		}
	}
}

function findRegionPoint(intX, intY, finX, finY, diff, strRGB, mode) {    //尋找模式 mode:  1:左上右下, 2:右上左下, 3:左下右上, 4:右下左上,
	if (!config.isRunning) return false;
	//console.log('區域找點-測試function');	
	
	origX = 0; 
	origY = 0;
	distX = finX - intX;
	distY = finY - intY;

	var Char = { 
	    'Attr':[
	        {'x1':    0, 'y1':    0, 'x2':    0, 'y2':    0, 'pX': 0, 'pY': 0 },    //
	        {'x1':origX, 'y1':origY, 'x2':distX, 'y2':distY, 'pX':+1, 'pY':+1 },    // 1:左上 -> 右下
	        {'x1':distX, 'y1':origY, 'x2':origX, 'y2':distY, 'pX':-1, 'pY':+1 },    // 2:右上 -> 左下
	        {'x1':origX, 'y1':distY, 'x2':distX, 'y2':origY, 'pX':+1, 'pY':-1 },    // 3:左下 -> 右上
	        {'x1':distX, 'y1':distY, 'x2':origX, 'y2':origY, 'pX':-1, 'pY':-1 },    // 4:右下 -> 左上
	    ], 
	}; 	

	checkr = parseInt(strRGB.substr(0, 2), 16) * 1;
	checkg = parseInt(strRGB.substr(2, 2), 16) * 1;
	checkb = parseInt(strRGB.substr(4, 2), 16) * 1;
	checka = 0;	
	
	//console.log(checkr, checkg, checkb)	
	//rbm.log(Char.Attr[mode].y1, Char.Attr[mode].y2, Char.Attr[mode].x1, Char.Attr[mode].x2, Char.Attr[mode].pY, Char.Attr[mode].pX)
	
	var img = getScreenshot();
	var cropImg = cropImage(img, intX, intY, distX + 1, distY + 1);
	
	switch(mode) {
		case 1 :
			for (var findY = Char.Attr[mode].y1; findY <= Char.Attr[mode].y2; findY = findY + Char.Attr[mode].pY){
			for (var findX = Char.Attr[mode].x1; findX <= Char.Attr[mode].x2; findX = findX + Char.Attr[mode].pX){
				if (!config.isRunning) return false;
				
				var getpoint = getImageColor(cropImg, findX, findY);
				var check = isSameColor({b:checkb, g:checkg, r:checkr, a:checka}, getpoint, diff);

				if (check) { 
					releaseImage(img); 
					releaseImage(cropImg);
					return { x:findX + intX, y:findY + intY };
				}
			}
			}
			
		case 2 :
			for (var findY = Char.Attr[mode].y1; findY <= Char.Attr[mode].y2; findY = findY + Char.Attr[mode].pY){
			for (var findX = Char.Attr[mode].x1; findX >= Char.Attr[mode].x2; findX = findX + Char.Attr[mode].pX){
				if (!config.isRunning) return false;
				
				var getpoint = getImageColor(cropImg, findX, findY);
				var check = isSameColor({b:checkb, g:checkg, r:checkr, a:checka}, getpoint, diff);

				if (check) { 
					releaseImage(img); 
					releaseImage(cropImg); 
					return { x:findX + intX, y:findY + intY };
				}
			}
			}
			
		case 3 :
			for (var findY = Char.Attr[mode].y1; findY >= Char.Attr[mode].y2; findY = findY + Char.Attr[mode].pY){
			for (var findX = Char.Attr[mode].x1; findX <= Char.Attr[mode].x2; findX = findX + Char.Attr[mode].pX){
				if (!config.isRunning) return false;
				
				var getpoint = getImageColor(cropImg, findX, findY);
				var check = isSameColor({b:checkb, g:checkg, r:checkr, a:checka}, getpoint, diff);

				if (check) { 
					releaseImage(img); 
					releaseImage(cropImg); 
					return { x:findX + intX, y:findY + intY };
				}
			}
			}
		case 4 :
			for (var findY = Char.Attr[mode].y1; findY >= Char.Attr[mode].y2; findY = findY + Char.Attr[mode].pY){
			for (var findX = Char.Attr[mode].x1; findX >= Char.Attr[mode].x2; findX = findX + Char.Attr[mode].pX){
				if (!config.isRunning) return false;
				
				var getpoint = getImageColor(cropImg, findX, findY);
				var check = isSameColor({b:checkb, g:checkg, r:checkr, a:checka}, getpoint, diff);

				if (check) { 
					releaseImage(img); 
					releaseImage(cropImg); 
					return { x:findX + intX, y:findY + intY };
				}
			}
			}	
	}
	releaseImage(img);
	releaseImage(cropImg); 
	
	return check;
}

function CheckImageTap(intX, intY, finX, finY, Siml, ImageName, TapX, TapY, TapTimes, Delay1, Taptype, mesg) {  //Taptype:  0:Tap X,Y, 1:tapImage, 2:return 
	if (!config.isRunning) return false;
	rbm.keepScreenshotPartial(intX, intY, finX, finY); // x1, y1, x2, y2
	var targetImag = rbm.imageExists(ImageName, Siml);
	var targetImg1 = rbm.findImage(ImageName, Siml);

	if (mesg == undefined) { mesg = 0; }
	if (mesg == 1) { rbm.log(ImageName + ':', targetImg1)}
	if (Taptype == 2) {	rbm.releaseScreenshot(); return targetImag; }
	
	if (!targetImag) return false;
	
	for (var i = 0; i < TapTimes; i++) {
		if (!config.isRunning) return false;
		if (targetImag) {
			if (Taptype == 0) {
				tap(TapX, TapY, 50)
				//console.log('Tap-' + TapX + ',' + TapY)
			}
			else if (Taptype == 1) {
				rbm.imageClick(ImageName, Siml)
				//console.log('Click-' + ImageName)
			}
			sleep(Delay1)
		}
	}
	rbm.releaseScreenshot();
}

function CheckImageTap2(intX, intY, finX, finY, Siml, ImageName1, ImageName2, TapX, TapY, TapTimes, Delay1, Taptype, mesg) {
	if (!config.isRunning) return false;
	
	var strFilenames = new Array('', ImageName1, ImageName2);
	
	if (mesg == undefined) { mesg = 0; }
	// if (mesg == 1) { rbm.log(ImageName + ':', targetImg1)}
	
	rbm.keepScreenshotPartial( intX, intY, finX, finY);  //x2 + x3 倍速選單圖示
	for (var i = 1; i <= 2; i++) {
		var targetImg1 = rbm.findImage(strFilenames[i], Siml);
		if (targetImg1 != undefined && mesg == 0) break;
		if (mesg == 1) rbm.log(strFilenames[i] + ':', targetImg1);
	}
	rbm.releaseScreenshot();
	
	if (Taptype == 2) {
		if (targetImg1 != undefined) return true;
		if (targetImg1 == undefined) return false;
	}	
	
	if (targetImg1 == undefined) return false;
	for (var i = 0; i < TapTimes; i++) {
		if (!config.isRunning) return false;
		if (targetImg1 != undefined && targetImg1.score >= Siml) {
			if (Taptype == 0) {tap(TapX, TapY, 50)}
			if (Taptype == 1) {tap(targetImg1.x, targetImg1.y, 60);}
			sleep(Delay1)
		}
	}	
}

function CkImgSwip(intX, intY, finX, finY, Siml, ImageName, TapX, TapY, TapTimes, Delay1, Taptype, mesg) {  //Taptype:  0:Tap X,Y, 1:tapImage, 2:return 
	if (!config.isRunning) return false;
	rbm.keepScreenshotPartial(intX, intY, finX, finY); // x1, y1, x2, y2
	var Img2 = rbm.findImage(ImageName, Siml);
	rbm.releaseScreenshot();

	if (mesg == undefined) { mesg = 0; }
	if (mesg == 1) { rbm.log(ImageName + ':', Img2)}
	if (Taptype == 2) {return targetImag; }
	
	if (Img2 == undefined) return false;
	
	for (var i = 0; i < TapTimes; i++) {
		if (!config.isRunning) return false;
		if (Img2 != undefined) {
			if (Taptype == 0) {swipFor(TapX, TapY, 1, 60, 100);}
			else if (Taptype == 1) {swipFor(Img2.x, Img2.y, 1, 60, 100);}
			sleep(Delay1)
		}
	}
}

function DIY_swipe(intx, inty, finax, finay, moveD, sleeptime) {
	if (!config.isRunning) return false;
	var movedistance = (finay - inty) / moveD
	
	var MoveXD = (finax - intx) / moveD
	var MoveYD = (finay - inty) / moveD
	
	tapDown(intx, inty, 50);
	for (var i = 0; i < moveD; i++) {
		if (!config.isRunning) { tapUp(intx, i, 200);  break; }
		intx = intx + MoveXD
		inty = inty + MoveYD
		moveTo(intx, inty, 8);
	}
	moveTo(finax, finay, 10)	
	tapUp(finax, finay, 10)
	if (sleeptime != undefined) sleep(sleeptime);
}

function DIY_swipe_du(intX0, intY0, intx, inty, finax, finay, moveD, sleeptime) {
	if (!config.isRunning) return false;
	var movedistance = (finay - inty) / moveD
	
	var MoveXD = (finax - intx) / moveD
	var MoveYD = (finay - inty) / moveD
	
	tapDown(intx, inty, 50, 2);
	for (var i = 0; i < moveD; i++) {
		if (!config.isRunning) { tapUp(intx, i, 200, 2);  break; }
		intx = intx + MoveXD;
		inty = inty + MoveYD;
		moveTo(intx, inty, 8, 2);
		if (i%3 == 0){tap(intX0, intY0, 10, 1);}
	}
	moveTo(finax, finay, 10, 2);	
	tapUp(finax, finay, 10, 2);
	if (sleeptime != undefined) sleep(sleeptime);
}

function DIY_Fstswipe(intx, inty, finax, finay, moveCy, sleeptime) {
	if (!config.isRunning) return false;
	
	var pmX = 0;
	var pmY = 0;
	if (finax > intx){pmX = 1} else if (finax < intx) {pmX = -1}
	if (finay > inty){pmY = 1} else if (finay < inty) {pmY = -1}
	var MoveXD = 0;
	var MoveYD = 0;

	var intMX = intx;
	var intMY = inty;

	var mvDc = 2;
	var mvFc = 1.15;
	
	tapDown(intx, inty, 80);
	for (var i = 0; i < moveCy; i++) {
		if (!config.isRunning) { tapUp(intx, i, 200);  break; }
		MoveXD = (MoveXD + mvDc) * mvFc;
		MoveYD = (MoveYD + mvDc) * mvFc;
		var intMX = intMX + MoveXD * pmX;
		var intMY = intMY + MoveYD * pmY;

		// if (finax >= intx && intMX >= finax) {intMX = finax;} 
		// else if (finax < intx && intMX < finax) {intMX = finax;} 

		// if (finay >= inty && intMY >= finay) {intMY = finay;} 
		// else if (finay < inty && intMY < finay) {intMY = finay;} 

		// console.log('intMX:', intMX, ', intMY:', intMY);
		moveTo(intMX, intMY, 10);
	}
	moveTo(finax, finay, 10)	
	tapUp(finax, finay, 10)
	if (sleeptime != undefined) sleep(sleeptime);
}

function DIY_Fstswipe_du(intX0, intY0, intx, inty, finax, finay, moveCy, sleeptime) {
	if (!config.isRunning) return false;
	
	var pmX = 0;
	var pmY = 0;
	if (finax > intx){pmX = 1} else if (finax < intx) {pmX = -1}
	if (finay > inty){pmY = 1} else if (finay < inty) {pmY = -1}
	var MoveXD = 0;
	var MoveYD = 0;

	var intMX = intx;
	var intMY = inty;

	var mvDc = 2;
	var mvFc = 1.15;
	
	tapDown(intx, inty, 80, 2);
	for (var i = 0; i < moveCy; i++) {
		if (!config.isRunning) { tapUp(intx, i, 200, 2);  break; }
		MoveXD = (MoveXD + mvDc) * mvFc;
		MoveYD = (MoveYD + mvDc) * mvFc;
		var intMX = intMX + MoveXD * pmX;
		var intMY = intMY + MoveYD * pmY;

		moveTo(intMX, intMY, 10, 2);
		tap(intX0, intY0, 10, 1);
	}
	moveTo(finax, finay, 10, 2);	
	tapUp(finax, finay, 10, 2);
	if (sleeptime != undefined) sleep(sleeptime);
}

function xy_swipe(intx, inty, finax, finay, moveD) {  //坐標位移
	var movedistance = (finay - inty) / moveD
	
	tapDown(intx, inty, 200);
	
	if (finay > inty) {
		for (var i = inty; i < finay; i = i + moveD) {
			moveTo(intx, i, 10);
			if (!config.isRunning) tapUp(intx, i, 200);	break;
		}
	}
	else if (finay < inty) {
		for (var i = inty; i > finay; i = i - moveD) {
			moveTo(intx, i, 10);
			if (!config.isRunning) tapUp(intx, i, 200); break;
		}
	}
	
	moveTo(finax, finay, 250)	
	tapUp(finax, finay, 200)
	sleep(200)
}

function ScreenShottoPath(filename) {    //全畫面截圖存檔
	if (!config.isRunning) return false;

	var DateName = Math.floor(Date.now()/1000);
	var ShotFilename = filename + DateName.toString() + '.png';
	var PicSharePath = '/storage/emulated/legacy/Pictures/bladecrafter2';
	var Savefile = PicSharePath + '/' + ShotFilename;	
	var Shot = getScreenshot();
	saveImage(Shot, Savefile);
	releaseImage(Shot);
}

function num_Recognition(x1, y1, x2, y2, siml, numstr) {    //數字辨識-測試function
	if (!config.isRunning) return false;
	
	// console.log('數字辨識-測試function');

	var xD = x2 - x1;
	var yD = y2 - y1;

	var scriptDir = config.scriptDir;
	var scriptPath = getStoragePath() + '/' + scriptDir;
	// console.log('scriptPath:', scriptPath)

	for(var n = 0; n <= 6; n++) {
	
		var Character = { 
			'Attributes':[
				{'No':0, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':1, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':2, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':3, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':4, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':5, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':6, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':7, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':8, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':9, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':10, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':11, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':12, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':13, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':14, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':15, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':16, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':17, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':18, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':19, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':20, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':21, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':22, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':23, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':24, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':25, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':26, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':27, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':28, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':29, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':30, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''},
				{'No':31, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':32, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':33, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':34, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':35, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':36, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':37, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':38, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':39, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':40, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':41, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':42, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':43, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':44, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':45, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':46, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':47, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':48, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
				{'No':49, 'value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
			], 
		}; 	
		
		//抓圖辨識數字及x位置
		// rbm.keepScreenshotPartial(x1, y1, x2, y2);
		var image = getScreenshotModify(x1, y1, xD, yD, xD, yD, 100);
		var arrynum = 0
		for (var i = 0; i <= 9; i++) {
			if (!config.isRunning) return false;

			var filename = scriptPath + '/' + numstr + i + '.png';
			// console.log('filename:', filename);				
			var tImg = openImage(filename);
			
			// console.log('1 reNum:', 'findImages', numstr + i + '.png', siml);
			// var results = rbm.findImages(numstr + i + '.png', siml, 5, false, false);
			var results = findImages(image, tImg, siml, 3, true);
			if (results != ''){
				for (var index in results){
					if (!config.isRunning) return false;
					
					var result = results[index];
					// rbm.log('4 reNum:', i, numstr + i + '.png', result.x, result.y, result.score)
					
					Character.Attributes[arrynum].Value = i;
					Character.Attributes[arrynum].x = result.x;
					Character.Attributes[arrynum].y = result.y;
					Character.Attributes[arrynum].score = result.score.toFixed(5);
					
					arrynum = arrynum + 1
				}
			}
		}
		// rbm.releaseScreenshot();
		
		if (Character.Attributes[0].score == '') return -1;
		
		// console.log('reNum:', 'sort a.x < b.x');
		Character.Attributes = Character.Attributes.sort(function (a, b) {
			return a.x < b.x ? 1 : -1;
		});	
		
		// for (var i = 0; i <= 49; i++ ) {
		// 	if (Character.Attributes[i].score == '') break;
		// 	rbm.log('5 reNum:', i, Character.Attributes[i])
		// }
		
		// console.log('clear errorX');
		for (var j = 0; j < 49; j++ ) {
			var errckX1 = Character.Attributes[j].x;
			var errcksc1 = Character.Attributes[j].score;
			var errckval1 = Character.Attributes[j].value;
			// console.log('clear errorX:', i, j)

			// if (errcksc1 == '') break
			

			if (errcksc1 != '') {
				var inK = j + 1;
				for (var k = inK; k <= 48; k++) {
					var errckX2 = Character.Attributes[k].x;
					var errcksc2 = Character.Attributes[k].score;
					var errckval2 = Character.Attributes[k].value;
					
					var errckDv = Math.abs(errckX2 - errckX1);
					// console.log('j:', j, 'k:', k, 'errckDv:', errckDv, 'errckX1:', errckX1, 'errckX2:', errckX2, 'errcksc1:', errcksc1, 'errcksc2:', errcksc2)
					
					if (errckDv > 3 || errcksc2 == '') break
					
					if (errckDv <= 3) {
						if (errcksc1 > errcksc2) {var clear = k;}
						else if (errcksc1 < errcksc2) {var clear = j;}
						else if (errcksc1 == errcksc2) {
							if (errckval1 == errckval2) {
								var errfile = scriptPath + '/' + numstr + i + 'err.png';
								saveImage(image, errfile)
								var clear = k;
							}
							// console.log('clear 0:', clear, errckval1, errckval2)
						}
						// console.log('clear 1:', clear, j, k, errcksc1, errcksc2, errckval1, errckval2);
						
						Character.Attributes[clear].Value = 0;
						Character.Attributes[clear].x = 0;
						Character.Attributes[clear].y = '';
						Character.Attributes[clear].score = '';
					}
					if (Character.Attributes[j].score == '') break;				
				}
			}
			// console.log('clear 2:', clear, j, k, errcksc1, errcksc2);
			
			// if (clear == -1) {
			// 	// console.log('clear 3:', clear, errcksc1, errcksc2,', break for')
			// 	// break;
			// }
		}
		sleep(50);
	
		Character.Attributes = Character.Attributes.sort(function (a, b) {
			return a.x < b.x ? 1 : -1;
		});
		
		for (var i = 0; i <= 49; i++ ) {
			if (Character.Attributes[i].score == '') break;
			// rbm.log('6 reNum:', i, Character.Attributes[i])
		}
		
		var Resultvalue = 0;
		
		for (var l = 0; l <= 49; l++) {
			if (Character.Attributes[l].score == '') break;
			Resultvalue = Resultvalue + Character.Attributes[l].Value * Math.pow(10,l);
		}
		
		releaseImage(tImg);
		releaseImage(image);

		return Resultvalue
	}
}

function tessOCRtest(intX, intY, finX, finY) {
	
	distX = finX - intX;
	distY = finY - intY;
	
	var img = getScreenshot();
	var cropImg = cropImage(img, intX, intY, distX + 1, distY + 1);

	Text = getTextFromImage(cropImg);
	
	releaseImage(img);
	releaseImage(cropImg); 
	
	return Text;
}

function tapFor(intX, intY, taptimes, pushtime, sleeptime, delaytime){  //單點，多次連續點擊, taptimes:點擊次數, pushtime:按住時間, sleeptime:點擊間隔
	if (taptimes == 0) {return false;}
	for (var i = 0; i < taptimes; i++){
		if (!config.isRunning) return false;
		
		tap(intX, intY, pushtime);
		sleep(sleeptime);
	}
	if (delaytime != undefined) { sleep(delaytime); }
}

function tapFor_du(intX0, intY0, intX1, intY1, taptimes, pushtime, sleeptime, delaytime){  //單點，多次連續點擊, taptimes:點擊次數, pushtime:按住時間, sleeptime:點擊間隔
	if (taptimes == 0) {return false;}
	for (var i = 0; i < taptimes; i++){
		if (!config.isRunning) return false;
		tap(intX0, intY0, 10);
		tap(intX1, intY1, pushtime);
		sleep(sleeptime);
	}
	if (delaytime != undefined) { sleep(delaytime); }
}

function swipFor(intX, intY, taptimes, pushtime, sleeptime, delaytime){  //單點，多次連續點擊, taptimes:點擊次數, pushtime:按住時間, sleeptime:點擊間隔
	for (var i = 0; i < taptimes; i++){
		if (!config.isRunning) return false;
		
		var intX2 = intX + 5;
		var intY2 = intY + 5;
		DIY_swipe(intX, intY, intX2, intY2, 8, pushtime);
		// tap(intX, intY, pushtime);
		sleep(sleeptime);
	}
	if (delaytime != undefined) { sleep(delaytime); }
}

function ScreenStopTimes(intX, intY, finX, finY, siml, str, Timer) {  //Return stop times
	if (!config.isRunning ) return false;
	if (checkScreenTimer != undefined && Date.now() < checkScreenTimer) return false;

	rbm.keepScreenshotPartial(intX, intY, finX, finY);  //關卡圖，比對是否卡關
	var targetImg = rbm.findImage( str, 0.70)
	rbm.releaseScreenshot();
	// rbm.log('targetImg: ', str, siml, targetImg)
	// if (targetImg != undefined) rbm.log('targetImg: ', str, targetImg.score.toFixed(5), '/', siml)
	
	if (targetImg == undefined || targetImg.score < siml) {
		rbm.screencrop( str, intX, intY, finX, finY)
		ScreenErrorTime1 = Date.now()
		ScreenErrorTime2 = 0;
		// console.log('畫面不同，重新抓圖, ScreenErrorTime2 = 0');
	}
	else if (targetImg.score >= siml) {
		ScreenErrorTime2 = Date.now() - ScreenErrorTime1
		// console.log('畫面相似', targetImg.score.toFixed(5), '/', siml, ', ', ScreenErrorTime2/1000, 'sec');
	}
	checkScreenTimer = Date.now() + Timer * 1000
	
	return ScreenErrorTime2 / 1000
}

function getRandom(min, max) {     //取亂數值
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function usingTimeString(startTime) {
  return '循環時間：' + (Date.now() - startTime) + 'ms';
}

function getImageHistCode(intX, intY, finX, finY, rate) {
	if (!config.isRunning) return false;
	
	var width = finX - intX;
	var high = finY - intY;
	var img = getScreenshotModify(intX, intY, width, high, width * rate, high * rate, 100);
	var imgCode = getImageHist(img);
	releaseImage(img);

	console.log('imgCode:', imgCode);
}

//==============================功能性function=====================================//

function useReturn(choiceF){          //各項回授點檢查 
	if (!config.isRunning) return false;
	
	switch (choiceF) {
		case  1: 
			rbm.keepScreenshotPartial(0, 2200, 260, 2300);  //判斷左下 world 與 base圖片
			var img1 = rbm.findImage('main_world.png', 0.90);
			var img2 = rbm.findImage('main_base.png', 0.90);
			rbm.releaseScreenshot();
			if (img1 != undefined) {return 1;}
			else if (img2 != undefined) {return 2;}
			else {return 0;}

		case  2: 
			var pagename = ['基地', '世界', '快速建造', '查找附近'];
			rbm.keepScreenshotPartial(0, 0, 1080, 2340);  //判斷左上各頁面位置
			for (var i = 2; i <= 3; i++) {
				var namstr = i;
				if (i <= 9) {namstr = '0' + i;}
				var filename = 'page_' + namstr + '.png';
				var img1 = rbm.findImage(filename, 0.95);
				// if (img1 != undefined) {rbm.log(filename, img1);}
				if (img1 != undefined) {
					rbm.releaseScreenshot();
					console.log('This Page:', pagename[i]);
					return i;
				}
			}
			rbm.releaseScreenshot();
			
			console.log('This Page:', '無法判斷');
			return -1;
		
		case  3: 
			rbm.keepScreenshotPartial(290, 1000, 780, 1240);  //判斷exit game對話
			var img1 = rbm.findImage('exitgamestr.png', 0.90);
			rbm.releaseScreenshot();
			if (img1 != undefined) {return true;}
			else {return false;}
			
			
		case  4: return chknewbubble(605, 805);   //new泡泡有沒有，寵物

		case  5:
			var pointColor = getPointcolorHex(560, 840);     //寶物能不能開對色
			var chkColor = isSameColorHex(pointColor, 'EF6D34', 20);
			if (chkColor) {return true;} 
			return false;

		case  6: return chknewbubble( 58, 295);   //檢查是否有new紅泡泡(world boss)
		case  7: return chknewbubble(194,  25);   //檢查是否有new紅泡泡(每日獎勵)
	
	}
}

function recoNum(choiceF) {        //各項數字辨識_
	if (!config.isRunning) return false;
	//console.log('各項數字辨識', choiceF);
	
	switch (choiceF) {
		case  1: return	num_Recognition(320, 16, 395, 50, 0.90, 'num_Reco/idle_stage_num/idle_stage_num2_'); break;  //關卡數
	}
}

//==============================遊戲function=====================================//

function checkScreenStop(Time1, Time2, Timer) {
	//console.log('Check Screen Stop');

	stage = recoNum(1) * 1
	if (stage == -1) {
		stage0Error = stage0Error + Timer;
		//console.log('stage == 0  stage0Error = stage0Error + Timer');
	}
	else {
		stage0Error = 0;
		//console.log('stage == 0  else');
	}
	
	stoptime[1] = ScreenStopTimes( 80, 355, 660, 450, 0.99, 'debugSCstop.png', Timer)
	if (stoptime[1] != 0) {
		// console.log('Stoptime to Resetapp = ', stoptime[1], '/', resetappTm, ', Stage 0 :', stage0Error, '/', resetappTm);
		console.log('畫面靜止:', stoptime[1], '/', resetappTm, ', 不在遊戲:', stage0Error, '/', resetappTm);
	}
	
	if ( stoptime[1] >= Time2 || stage0Error >= Time2) {
		if (stoptime[1] >= Time2) {console.log('畫面靜止', stoptime[1], '/', resetappTm, ', 重啟app');}
		if (stage0Error >= Time2) {console.log('不在遊戲中', stage0Error, '/', resetappTm, ', 重啟app');}
		startApp(120)
	}
	else if ( stoptime[1] >= Time1  || stage0Error >= Time1) {
		console.log('畫面靜止30以上，按BACK');
		//setFirstTimer();
		choiceMenu(0);
		keycode('BACK', 200);
		sleep(1000);

		CheckImageTap(280, 490, 420, 540, 0.90, 'exitgame.png', 240, 830, 1, 200, 0);    //取消退出遊戲
	}

	ScreenStoptimer = Date.now() + Timer * 1000
}

function RestartApp(Timer) {  
	if (!config.isRunning) return false;
	console.log('RestartApp')
	
	keycode('HOME', 500);
	sleep(1000)
	rbm.stopApp(config.PackangName); sleep(500)
	rbm.stopApp(config.PackangName); sleep(1000)
	rbm.startApp(config.PackangName,config.LaunchActivityName);
	
	var a = 0;
	for (var i = 1; i < Timer; i++) {
		if (!config.isRunning) return false;

		debug(6);
		
		if (useReturn(1)) {
			a = a + 1;
			if (a >= 3) {setFirstTimer(); break;}
		}
		
		sleep(2000);
		console.log('RestartApp:', i * 2, 'sec');
	}	
}

// ===========================================================

function ADgetany() {
	if (!config.isRunning) return false;
	if (useReturn(1)) return false;
	console.log('檢查廣告');

	tapFor(tapX, tapY, 1, 30, 100, 100);
	waitAD2(65);

}

function waitAD2(timer) {
	if (!config.isRunning) return false;
	console.log('等待廣告');
	
	var a = 0; var b = 0;
	for (var i = 1; i <= timer; i++){
		if (!config.isRunning) return false;
		
		var sizeObj = getScreenSize();

		if (sizeObj.width == 720) {
			if (i == 200){
				keycode('HOME', 200); sleep(1000);
				rbm.startApp(config.PackangName,config.LaunchActivityName);
				sleep(200);
			}
			if (i >= 3) {
				var mainpage = useReturn(1); //主畫面書本圖示
				if (mainpage) {
					a = a + 1;
					if (i < 10 && a >= 10) {console.log('選單鈕，出現10秒，異常'); return false;}
					else if (i > 5 && a >=  2) {console.log('選單鈕，出現 5秒，回到遊戲'); return false;}
				} else {
					a = 0;
					var stoptime1 = ScreenStopTimes( 180, 270, 590, 860, 0.999, 'checkADstop.png', 1)
					// console.log('stoptime1:', stoptime1)
					if (stoptime1 >= 2.5 || i >= 35) {
						console.log('廣告結束，畫面停3秒，回遊戲');
						keycode('BACK', 200);

						for (var j = 0; j <= 2; j++){
							if (useReturn(1)) {return false;}
							keycode('BACK', 200); sleep(800);
						}
						stoptime1 = 0;
					}

					rbm.keepScreenshotPartial(320, 460, 400, 560);  //
					for (var p = 1; p <= 4; p++) {
						var Img1 = rbm.findImage('AD_get_0' + p +'.png', 0.90);
						if (Img1 != undefined) {
							console.log('get something(AD)!!')
							tapFor(320, 470, 1, 30, 100, 500);
							break;
						}
					}
					rbm.releaseScreenshot();

					rbm.keepScreenshotPartial(290, 610, 360, 660);  //
					var Img1 = rbm.findImage('exitgame.png', 0.90) //pic 306, 620,  40*22
					rbm.releaseScreenshot();
					if (Img1 != undefined) {
						console.log('exit game!!')
						swipFor(290, 730, 1, 30, 100, 500);
					}
					
					// rbm.keepScreenshotPartial(320, 460, 400, 560);  //
					// var Img1 = rbm.findImage('AD_get_01.png', 0.90) //pic 325,475,  70*70
					// var Img2 = rbm.findImage('AD_get_02.png', 0.90) //pic 325,475,  70*70
					// var Img3 = rbm.findImage('AD_get_03.png', 0.90) //pic 325,475,  70*70
					// rbm.releaseScreenshot();

					// if (Img1 != undefined || Img2 != undefined || Img3 != undefined) {
					// 	console.log('get something!!')
					// 	tapFor(320, 470, 1, 30, 100, 100);
					// }

					// if (useReturn(5)) {swipFor(200, 750, 1, 50, 100, 100);}	 //離開遊戲按取消
					// if (useReturn(4)) {swipFor(150, 970, 1, 50, 100, 100);}  //按看廣告1
					// if (useReturn(11)) {swipFor(540, 560, 1, 50, 100, 100);}  //按看廣告1

					// CkImgSwip(300,  570, 430,  700, 0.98, '/AD_img/playAD.png',    1, 1, 1, 300, 1, 0);      //點擊播放廣告
					// CkImgSwip(500, 1050, 720, 1280, 0.98, '/AD_img/skipAD01.png',  1, 1, 1, 300, 1, 0);      //點擊右下略過廣告(中字)
					// CkImgSwip(440,  660, 610,  750, 0.98, '/AD_img/KPwatchAD.png', 1, 1, 1, 3000, 1, 0);     //點擊繼續看廣告
					// CkImgSwip(440,  660, 610,  750, 0.98, '/AD_img/KPwatchAD2.png', 1, 1, 1, 3000, 1, 0);     //點擊繼續看廣告2
					// CkImgSwip(579,   12, 704,   44, 0.99, '/AD_img/AD_rightup_01.png', 1,  1, 1, 300, 0, 0);   //右上叉叉01
					// CkImgSwip(  0,    0, 110,   80, 0.98, '/AD_img/AD_XX_03.png', 1,  1, 1, 3000, 1, 0);     //廣告結束，左上叉叉
					// CkImgSwip(  0,    0, 110,   80, 0.98, '/AD_img/AD_XX_04.png',   1,  1, 1, 3000, 1, 0);     //廣告結束，左上叉叉
				}
			}
			
			if (i >= 52) {
				console.log('畫面轉向，計時 = ' + i, '回桌面，再回遊戲，切廣告')
				swipFor(685, 25, 1, 50, 100, 100);
				// keycode('HOME', 300); sleep(5000);
				// rbm.startApp(config.PackangName,config.LaunchActivityName);
				// sleep(3000);
			} else if (i >= 40) {
				console.log('畫面轉向，計時 = ' + i, '按 BACK，切廣告')
				keycode('BACK', 200); sleep(500);
			}
		}

		sleep(900);
		console.log('Wait Time: ', i, '/', timer, ', stoptime1:', stoptime1);
	}
}

// ===========================================================

function changepage(p) {  //頁面切換：  0:base  1:world  2:快速建造 3:搜索清單
	if (!config.isRunning) return false;
	
	for (var i = 1; i <= 10; i++) {
		if (!config.isRunning) return false;

		switch (p) {
			case 0: backmainpage(1); return false;
			case 1: backmainpage(2); return false;
			case 2: 
				if(useReturn(2) == p) {return false;}
				else {backmainpage(1); tapFor(60, 530, 1, 30, 100, 2000);}
			case 3:
				if(useReturn(2) == p) {return false;}
				else {backmainpage(2); tapFor(190, 100, 1, 30, 100, 1000);}


		}
		sleep(200);
	}
}

function backmainpage(mpg) {  //world(1) 與 base(0) 判斷
	if (!config.isRunning) return false;

	for (var i = 0; i <= 10; i++) {
		var nowmainpage = useReturn(1);
		console.log('nowmainpage:', nowmainpage, mpg);
		if(useReturn(3)) {{keycode('BACK', 200); sleep(1000);}}
		else if (nowmainpage == 0) {keycode('BACK', 200); sleep(1000);}
		else if (nowmainpage == mpg) {break;}
		else if (nowmainpage != mpg) {tapFor(30, 2230, 1, 30, 100, 1000);}
		console.log('back main page:', i);
		sleep(200);
	}
}

function buildlvup(Timer, swipupt) {  //自動建造
	if (!config.isRunning) return false;
	if (!buildswitch) return false;
	// if (!useReturn(1)) return false;
	if (Date.now() < buildlvupTime) {
		var waittime = Math.round((buildlvupTime - Date.now()) / 1000);
		console.log('Build Lvup Wait:', waittime, 'sec,(' + Timer + ')');
		return false;
	}
	console.log('build lv up');

	changepage(2); //2:快速建造

	var buildname = ['', '指揮中心', '石油廠', '導彈工廠', '坦克工廠', '發電廠', '鐵礦廠', '直升機場', '軍團', '研究所', '特種兵營', '一號倉庫', '二號倉庫', '改裝工廠', '矽礦提煉廠', '晶礦加工廠', '軍官學院'];
	var buildsw = ['', bsw01, bsw02, bsw03, bsw04, bsw05, bsw06, bsw07, bsw08, bsw09, bsw10, bsw11, bsw12, bsw13, bsw14, bsw15, bsw16];

	var swipeupfastF = 2;
	var swipeudownF = swipupt;
	var imgMIN = 1;
	var imgMAX = buildname.length - 1;
	// console.log(swipeupfastF, swipeudownF, imgMAX);

	swip_fast_up_down(2, swipeupfastF);

	rbm.keepScreenshotPartial(890, 400, 1040, 1180);  //
	var Img1s = rbm.findImages('free4min.png', 0.95, 4, false, false);
	var Img2s = rbm.findImages('needhelp.png', 0.95, 4, false, false);
	var Img12s =  Img1s.concat(Img2s);
	rbm.releaseScreenshot();
	// rbm.log('Img1s:', Img1s);
	// rbm.log('Img2s:', Img2s);
	// rbm.log('Img12s:', Img12s);

	if (Img12s != ''){
		Img12s = Img12s.sort(function (a, b) {return a.y < b.y ? 1 : -1;});	
		// rbm.log('Img12s', Img12s);
		console.log('tap freetime quest!!')
		for (var index in Img12s){
			if (!config.isRunning) return false;
			var Img12 = Img12s[index];
			tapFor(Img12.x + 10, Img12.y + 10, 1, 30, 100, 500);
		}
		sleep(2000);
	}

	var chkstocksf = checkstockfull();
	if (chkstocksf) {
		buildlvupTime = Date.now() + Timer * 1000;
		console.log('佇列已滿!!');
		helpothers();
		return false;
	}

	var chkbuild01 = chkcenterbuild();
	if (!chkbuild01) {console.log('建設沒有 "指揮中心" !!'); imgMAX = 1;}
	else {console.log('建設有 "指揮中心" !!'); imgMIN = 2;}

	if(swipmode) {console.log('由上至下檢查"LV低優先"');}
	else {console.log('由下至上檢查"LV高優先"');}

	if(swipmode) {swip_fast_up_down(2, swipeupfastF);}
	else {swip_fast_up_down(1, swipeupfastF);}

	for (var k = 1; k <= swipeudownF; k++) {
		for (var j = imgMIN; j <= imgMAX; j++) {
			var chkstocksf = checkstockfull();
			if (chkstocksf) {console.log('佇列已滿!!'); break;}
			if (buildsw[j]) {

				rbm.keepScreenshotPartial(220, 335, 450, 2330);  //
				var namstr = j;
				if (j <= 9) {namstr = '0' + j;}
				var filename = 'build_' + namstr + '.png';
				var Img3s = rbm.findImages(filename, 0.90, 4, false, false);
				rbm.releaseScreenshot();
				if (Img3s != ''){
					Img3s = Img3s.sort(function (a, b) {
						return a.y < b.y ? 1 : -1;
					});	
					rbm.log(buildname[j], 'Img3s', Img3s);
					console.log('build lvup tap!!')
					for (var index in Img3s){
						if (!config.isRunning) return false;
						var Img3 = Img3s[index];

						var newgeX = ['', 880,  1010];
						var newgeY = Img3.y + 25
						var nowgeC = ['', 'E84E4D', '31BDD7'];
				
						var img = getScreenshotModify(0, newgeY, 1080, 1, 1080, 1, 100);
						var getColor1 = getpointHex(img, newgeX[1], 0);
						var getColor2 = getpointHex(img, newgeX[2], 0);
						var colorN1 = isSameColorHex(getColor1, nowgeC[1], 20);
						var colorN2 = isSameColorHex(getColor2, nowgeC[2], 20);
						releaseImage(img);
						// console.log(newgeX[1], newgeX[2], newgeY, getColor1, getColor2, colorN1, colorN2);
						if (!colorN1 && colorN2) {
							console.log('找到', buildname[j], '可升級!!')
							tapFor(1015, Img3.y + 35, 1, 30, 100, 1000);
						}

						chkstocksf = checkstockfull();
						if (chkstocksf) {console.log('佇列已滿!!'); break;}
					}
				}
				
			} else {console.log(buildname[j], 'Switch is off!!');}
		}
		if (chkstocksf) {break;}
		
		if(swipmode) {swip_fast_up_down(3, 1);}
		else {swip_fast_up_down(4, 1);}
	}
	sleep(500);

	buildlvupTime = Date.now() + Timer * 1000;
}

function checkstockfull() {   //判斷佇列是否滿(快速建造)
	if (!config.isRunning) return false;

	rbm.keepScreenshotPartial(170, 290, 320, 350);  //
	var Img1 = rbm.findImage('stock_bi.png', 0.90);
	rbm.releaseScreenshot();

	if (Img1 != undefined) {
		// console.log('找到 ', 'stock_bi.png', Img1.x, Img1.y);

		rbm.screencrop( 'stockmax.png', Img1.x + 20, Img1.y, Img1.x + 55, Img1.y + 29);

		rbm.keepScreenshotPartial(Img1.x - 50, Img1.y - 5, Img1.x, Img1.y + 40);  //
		var Img2 = rbm.findImage('stockmax.png', 0.90);
		rbm.releaseScreenshot();
		if (Img2 != undefined) {return true;}
		else {return false;}
	}
}

function swip_fast_up_down(mode, times) {  //滑動，上下，快速等速
	if (!config.isRunning) return false;

	var modename = ['', '快速上滑', '快速下滑', '等速上滑', '等速下滑'];
	for (var i = 1; i <= times; i++) {
		if(mode == 1) {DIY_Fstswipe(540, 1400, 540,  800, 5, 1000);}
		if(mode == 2) {DIY_Fstswipe(540,  800, 540, 1400, 5, 1000);}
		if(mode == 3) {DIY_swipe(540, 1200, 540,  600, 60, 300);}
		if(mode == 4) {DIY_swipe(540,  600, 540, 1500, 60, 300);}
		console.log(modename[mode], i);
	}
}

function chkcenterbuild() {  //確認有無指揮中心
	if (!config.isRunning) return false;
	if (!bsw01) return true;

	rbm.keepScreenshotPartial(220, 335, 450, 1180);  //
	var Img = rbm.findImage('build_01.png', 0.90);
	rbm.releaseScreenshot();
	if (Img != undefined) {
		// console.log('找到 ', filename, Img1.x, Img1.y, buildname[j]);
		var chkpoint = checkPointcolor(880, Img.y + 25, 20, 'EA5251');
		if (chkpoint) {return true;}
		else {return false;}
	} else {return false;}
}

function helpothers() {   //幫助他人減時間
	if (!config.isRunning) return false;

	changepage(0); //0:基地畫面
	rbm.keepScreenshotPartial(680, 1880, 1080, 2000);  //
	var Img = rbm.findImage('helpotherbtn.png', 0.90);
	rbm.releaseScreenshot();
	if (Img != undefined) {
		tapFor(Img.x, Img.y, 1, 30, 100, 500);
	}
}

function collmaterial(Timer) {  //自動採礦
	if (!config.isRunning) return false;
	if (!collswitch) return false;
	if (Date.now() < collmaterialTime) {
		var waittime = Math.round((collmaterialTime - Date.now()) / 1000);
		console.log('Material Wait:', waittime, 'sec,(' + Timer + ')');
		return false;
	}
	console.log('Collection Material');

	changepage(1); //1:world
	rbm.keepScreenshotPartial(10, 280, 100, 340);  //任務展開三角形鈕
	var Img = rbm.findImage('materiallistbtn.png', 0.95);
	rbm.releaseScreenshot();
	if (Img != undefined) {tapFor(Img.x, Img.y, 1, 30, 100, 500);}

	rbm.keepScreenshotPartial(0, 330, 290, 940);  //收集完成點擊
	var imgs = rbm.findImages('collectioncomplete.png', 0.88, 5, false, false);
	rbm.releaseScreenshot();
	rbm.log('collectioncomplete, imgs:', imgs);
	if (imgs != ''){
		imgs = imgs.sort(function (a, b) {return a.y < b.y ? 1 : -1;});	
		console.log('tap collection complete quest!!')
		for (var index in imgs){
			if (!config.isRunning) return false;
			var img = imgs[index];
			tapFor(img.x + 10, img.y + 10, 1, 30, 100, 1000);
		}
	}

	choicefind();

	collmaterialTime = Date.now() + Timer * 1000;
}

function choicefind() {    //採礦選擇及出戰
	if (!config.isRunning) return false;

	var materialname = ['', '電', '油', '鐵', '矽', '晶'];
	var materialsw = ['', msw01, msw02, msw03, msw04, msw05];

	for (var j = 0; j <= 5; j++) {
		var collquest = collquests();
		console.log('collquest:', collquest, '/', collmaxstocks);
		if (collquest >= collmaxstocks) {return false;}

		tapFor(200, 100, 1, 30, 100, 2000); //world 頁面，點擊搜索鈕
	
		rbm.keepScreenshotPartial(0, 110, 290, 1360);  //
		for (var i = 1; i <= 5; i++) {
			if (!config.isRunning) return false;

			if (materialsw[i]) {
				var img = rbm.findImage('findlist_materialicon_0' + i + '.png', 0.95);
				rbm.log('j:', j, 'i:', i, 'img:', img);
				if (img != undefined) {
					tapFor(img.x + 230, img.y + 50, 1, 30, 100, 2000);
					tapFor(540, 1180, 1, 30, 100, 2000);
					tapFor(540, 1380, 1, 30, 100, 2000);
					fightset(fmodsw, sto1sw, sto2sw, sto3sw, sto4sw, sto5sw, sto6sw)
					
					break;
				}
			}
	
	
		}
		rbm.releaseScreenshot();

	}
}

function collquests() { //world畫面，左上任務數量判斷
	if (!config.isRunning) return false;
	var imgalls = [];
	rbm.keepScreenshotPartial(0, 330, 290, 940);  //
	for (var i = 1; i <= 2; i++) {
		var imgs = rbm.findImages('collstateicon_0' + i + '.png', 0.90, 5, false, false);
		imgalls = imgs.concat(imgalls);
		// rbm.log('i:', i, 'imgs:', imgs);
		// rbm.log('i:', i, 'imgalls:', imgalls);
		console.log('i:', i, 'lenght:', imgs.length);
	}
	rbm.releaseScreenshot();
	return imgalls.length;
}

function fightset(fmod, sto1, sto2, sto3, sto4, sto5, sto6) {  //戰鬥配置出戰
	if (!config.isRunning) return false;

	var fightmod = ['', '最大戰力', '最大載重'];
	
	var stockX = ['',  360,  520,  680,  160,  320,  470];
	var stockY = ['', 1050, 1150, 1250, 1150, 1250, 1330];
	var stockS = ['', sto1, sto2, sto3, sto4, sto5, sto6];

	rbm.keepScreenshotPartial(530, 2080, 800, 2220);  //
	var img1 = rbm.findImage('fight_mode_01.png', 0.95);
	var img2 = rbm.findImage('fight_mode_02.png', 0.95);
	rbm.releaseScreenshot();
	if (img1 != undefined || img2 != undefined) {tapFor(img1.x, img1.y, 1, 30, 100, 500);}
	if (fmod == 1 && img2 != undefined) {tapFor(img2.x, img2.y, 1, 30, 100, 500);}
	else if (fmod == 2 && img1 != undefined) {tapFor(img1.x, img1.y, 1, 30, 100, 500);}

	if (img1 != undefined || img2 != undefined) {
		for (var i = 1; i <= 6; i++) {
			if (!stockS[i]) {tapFor(stockX[i], stockY[i], 1, 30, 100, 1000);}
		}
	}

	for (var j = 1; j <= 10; j++) {
		rbm.keepScreenshotPartial(0, 2120, 1060, 2270);  //
		var img3 = rbm.findImage('fightingbtn.png', 0.95);
		var img4 = rbm.findImage('totalattack.png', 0.95);
		var img5 = rbm.findImage('totalattack_allchk.png', 0.95);
		var img6 = rbm.findImage('totalattack_pickoccupied.png', 0.95);
		var img7 = rbm.findImage('totalattack_allchk_OK.png', 0.95);
		var img8 = rbm.findImage('totalattack_pickoccupied_OK.png', 0.95);
		rbm.releaseScreenshot();
		if (img3 != undefined) {tapFor(img3.x, img3.y, 1, 30, 100, 500);}
		if (img5 != undefined) {tapFor(img5.x + 50, img5.y + 50, 1, 30, 100, 200);}
		if (img6 != undefined) {tapFor(img6.x + 50, img6.y + 50, 1, 30, 100, 200);}
		if (img7 != undefined && img8 != undefined && img4 != undefined) {tapFor(img4.x, img4.y, 1, 30, 100, 500);}

		sleep(500);
	}
}

function answerABCD(t) {
	if (!config.isRunning) return false;

	var ABCD = ['', '29', '30', '31', '32'];
	var s1 = 200
	console.log('start ABCD!!')
	for (var j = 1; j <= t; j++){
		for (var i = 1; i <= 4; i++) {
			tapFor(180, 2150, 2, 50, 50, 100);
			keycode(ABCD[i], 100); sleep(100)
			keycode('66', 100); sleep(200)
			tapFor(1000, 2150, 1, 50, 50, 100);
			tapFor(1010, 2150, 1, 50, 50, 100);
		}
	}
	console.log('end ABCD!!')
}





function buffer_check() {
	if (!config.isRunning) return false;
	if (!useReturn(1)) return false;
	console.log('buffer_check');

	rbm.keepScreenshotPartial(630, 550, 690, 595);  //
	var Img1 = rbm.findImage('menuopentrink.png', 0.90)
	rbm.releaseScreenshot();
	if (Img1 != undefined) {
		swipFor(Img1.x, Img1.y, 1, 30, 100, 100);
	}

	rbm.keepScreenshotPartial(100, 100, 180, 140);  //
	var Img1 = rbm.findImage('view_type.png', 0.90)
	var Img2 = rbm.findImage('new_buffer.png', 0.90)
	rbm.releaseScreenshot();

	if (Img1 != undefined) {swipFor(Img1.x, Img1.y, 1, 30, 100, 1000);}
	if (Img2 != undefined) {
		swipFor(Img2.x, Img2.y, 1, 30, 100, 2000);
		waitAD2(65);
	}

	weapon_skill();
	partner_lvup(90);

}

function weapon_skill() {
	var colorX = [347, 451, 555];
	var colorY = 1090
	var colorH = '777777'

	var img = getScreenshotModify(0, 1090, 600, 1, 600, 1, 100);
	for (var i = 0; i <= 2; i++) {
		var getpoint = getpointHex(img, colorX[i], 0);
		var chkpoint = isSameColorHex(colorH, getpoint, 10);
		if (!chkpoint) {swipFor(colorX[i], colorY + 5, 1, 30, 100, 1800);}
		else {swipFor(360, 260, 5, 20, 200, 500)}
	}
	releaseImage(img);
}

function partner_lvup(Timer) {
	if (!config.isRunning) return false;
	if (Date.now() < partner_lvupTimer ) return false;
	console.log('partner_lvup');

	swipFor(70, 1130, 1, 30, 100, 600);

	rbm.keepScreenshotPartial(250, 990, 320, 1030);  //
	var Img1 = rbm.findImage('partnerlvup.png', 0.90) //pic 34,943,  20*20
	rbm.releaseScreenshot();
	if (Img1 != undefined) {
		console.log('partner lv up!!')
		swipFor(Img1.x, Img1.y, 1, 30, 100, 200);
	}

	partner_lvupTimer = Date.now() + Timer * 1000;
}

function debug(Timer) {
	if (!config.isRunning) return false;
	if (Date.now() < debugTimer ) return false;
	console.log('Debug');

	if (!useReturn(1)) {
		console.log('沒看到主畫面書本，按退回鍵!')
		keycode('BACK', 200); sleep(500);
	}

	rbm.keepScreenshotPartial(320, 460, 400, 560);  //
	for (var p = 1; p <= 4; p++) {
		var Img1 = rbm.findImage('AD_get_0' + p +'.png', 0.90);
		if (Img1 != undefined) {
			console.log('get something(debug)!!')
			swipFor(320, 470, 1, 30, 100, 500);
			break;
		}
	}
	rbm.releaseScreenshot();


	rbm.keepScreenshotPartial(30, 930, 65, 980);  //
	var Img1 = rbm.findImage('quest_gold_get.png', 0.90) //pic 34,943,  20*20
	rbm.releaseScreenshot();
	if (Img1 != undefined) {
		console.log('get quest gold!!')
		swipFor(Img1.x, Img1.y, 1, 30, 100, 2000);
	}


	for (var k = 1; k <= 20; k++) {
		rbm.keepScreenshotPartial(240, 1120, 330, 1200);  //
		var Img1 = rbm.findImage('nowloading.png', 0.90)  //pic 253,1150,  60*27
		rbm.releaseScreenshot();
		if (Img1 != undefined) {
			console.log('nowloading!!', k, "sec")
		} else {break;}

		sleep(950);
	}

	rbm.keepScreenshotPartial(520, 740, 580, 800);  //
	var Img1 = rbm.findImage('get_all_quest_gold.png', 0.90) //pic 532, 752,  30*30
	rbm.releaseScreenshot();
	if (Img1 != undefined) {
		console.log('get all quest gold!!')
		swipFor(Img1.x, Img1.y, 1, 30, 100, 600);
		swipFor(680, 220, 1, 30, 100, 600);
	}


	rbm.keepScreenshotPartial(165, 540, 275, 650);  //
	var Img1 = rbm.findImage('littleicon_home.png', 0.90) //pic 185, 560,  70*70
	rbm.releaseScreenshot();
	if (Img1 != undefined) {
		console.log('little icon home!!')
		swipFor(Img1.x, Img1.y, 4, 30, 50, 3000);
	}

	
	rbm.keepScreenshotPartial(290, 610, 360, 660);  //
	var Img1 = rbm.findImage('exitgame.png', 0.90) //pic 306, 620,  40*22
	rbm.releaseScreenshot();
	if (Img1 != undefined) {
		console.log('exit game!!')
		swipFor(290, 730, 1, 30, 100, 500);
	}

	debugTimer = Date.now() + Timer * 1000;
}

// =========TiBackup Used===================================
function TireductGame(Tilst, sec, item, itemLv, cycle){ // 3:刷裝  4:刷寵  5:刷寶  7:簽到獎勵  8:背動技
	if (!config.isRunning) return false;
	if (Features < 3 || Features > 8 ) return false;
	if (Features == 6) return false;
	// if (bsnewBB || mgnewBB) return false;
	console.log('TireductGame');

	Tireducbkup(1, 1);  //列表  還原/備份
	chkGameOK(sec);

	sleep(200);
	if(bsnewbubble() || mgnewbubble()) {
		playMiniGame();
		chkGameOK(sec);
		// return false;
	}

	menutap2(item);
	openNewItem(item, 50);

	if (chkGetItem(item, itemLv, cycle)) {  
		// sleep(200);
		// ScreenShottoPath('bladecrafter2_' + itemName[item]);

		switch(item) {

			case 3 : 
				if (!abandonGear(abGrSw)) {
					ScreenShottoPath('bladecrafter2_' + itemName[item]);
					config.isRunning = false;
				} break;

			case 4 : 
				ScreenShottoPath('bladecrafter2_' + itemName[item]);
				// Tibackup(Tilst);
				Tireducbkup(1, 2);  //列表  還原/備份
				chkGameOK(sec);
				break;

			case 5 : 
				if (!abandonTreasures(abGrSw, item5Lv)) {
					ScreenShottoPath('bladecrafter2_' + itemName[item]);
					config.isRunning = false;
				} break;

			case 6 : 
				ScreenShottoPath('bladecrafter2_' + itemName[item]);
				config.isRunning = false; break;
				
			case 7 : 
				if (chkDalyGearLv(item7Lv, item7Pc)) {
					ScreenShottoPath('bladecrafter2_' + itemName[item]);
					config.isRunning = false;
				} break;

			case 8 : 
				if (!abandonbackSkill(abGrSw)) {
					ScreenShottoPath('bladecrafter2_' + itemName[item]);
					Tireducbkup(1, 2);  //列表  還原/備份
					chkGameOK(sec);
					config.isRunning = false;
				} break;

		}
		sleep(1000); 
	}
	
}

// =========TiBackup Function===================================
function Tireduction(lst) {
	if (!config.isRunning) return false;
	console.log('TiBackup to Reduction');

	rbm.stopApp(config.PackangName); sleep(300);
	rbm.stopApp(config.PackangName); sleep(800);
	rbm.startApp(config.TiPackangName,config.TiLaunchActivityName); sleep(1500);

	var lsX = 260 + (lst - 1) * 100;
	tapFor( 40, lsX, 1, 50, 50, 200);   //選第1個程式，列表間隔 100px
	tapFor(470, 130, 1, 50, 50, 200);   //點選-備份還原功能
	tapFor( 40, lsX, 1, 50, 50, 200);   //選第1個程式，列表間隔 100px
	tapFor(470, 130, 1, 50, 50, 200);   //點選-備份還原功能

	tapFor(120, 350, 1, 50, 50, 2000);  //選第一個備份資料-還原 Y:350:還原  Y:210:備份
	tapFor(420, 730, 1, 50, 50, 3000);  //點選-資料 //Tibackup 8.xx pro  420 730 / free 140 730
	
	// console.log('Start Game.....')
	rbm.startApp(config.PackangName,config.LaunchActivityName); sleep(5000);
}

function Tibackup(lst) {
	if (!config.isRunning) return false;
	console.log('TiBackup to Backup');

	rbm.stopApp(config.PackangName); sleep(300);
	rbm.stopApp(config.PackangName); sleep(800);
	rbm.startApp(config.TiPackangName,config.TiLaunchActivityName); sleep(2000);

	var lsX = 260 + (lst - 1) * 100;
	tapFor( 40, lsX, 1, 50, 50, 200);   //選第1個程式，列表間隔 100px
	tapFor(470, 130, 1, 50, 50, 200);   //點選-備份還原功能
	tapFor( 40, lsX, 1, 50, 50, 200);   //選第1個程式，列表間隔 100px
	tapFor(470, 130, 1, 50, 50, 200);   //點選-備份還原功能

	tapFor(120, 210, 1, 50, 50, 2000);  //選第一個備份資料-還原 Y:350:還原  Y:210:備份
	tapFor(510, 760, 1, 50, 50, 10000);  //點選-資料  X:510;Y:760;程式開啟確認��份
	
	// console.log('Start Game.....')
	rbm.startApp(config.PackangName,config.LaunchActivityName); sleep(5000);
}

function Tireducbkup(lst, mod) {  //lst:點選列表第幾個  mod: 1:還原 2:備份
	if (!config.isRunning) return false;
	console.log('TiBackup to Reduction or Backup');

	rbm.stopApp(config.PackangName); sleep(300);
	rbm.stopApp(config.PackangName); sleep(300);
	rbm.startApp(config.TiPackangName,config.TiLaunchActivityName); sleep(100);

	var tibackC = ['', '888888', '00FF00', '33B5E5', '006600', '14485C'];  //X:380 Y:147
	var tibackS = ['', '主頁面', '備份還原', '項目選單', '還原選單', 'GG選單'];
	var lsY = 260 + (lst - 1) * 100;
	var tapX = ['', 380,  90,  90,   90, 130];
	var tapY = ['', 150, lsY, 360,  760, 880];
	var deyT = ['', 500, 500, 500, 2000, 500];

	Tab_BK2:
	for (var i = 0; i < 30; i++) {
		var pointColor = getPointcolorHex(380, 147);
		
		for (var j = 1; j <= 5; j++) {
			var chkColor = isSameColorHex(pointColor, tibackC[j], 15);
			// console.log('TiBackup to R/B:', pointColor, tibackC[j], chkColor, i, j);
			
			if (chkColor) {
				if (j == 3 && mod == 2) {
					tapFor(tapX[j], 210, 1, 30, 100, 4000);         //j=3:mod=2:點選備份
					break Tab_BK2;
				} else {
					tapFor(tapX[j], tapY[j], 1, 30, 100, deyT[j]);  //j=3:mod=1:點選還原
					if (j == 5) {tapFor(tapX[j], tapY[j] - 50, 1, 30, 100, deyT[j])}
					if (j == 4) {break Tab_BK2;}
				}
			}
		}

		sleep(300)
	}
	
	console.log('Start Game.....')
	rbm.startApp(config.PackangName,config.LaunchActivityName); sleep(5000);

}

// =========TiBackup Function===================================
function TibackupMH() {
	if (!config.isRunning) return false;

	console.log('TiBackup to Backup');

	rbm.startApp(config.TiPackangName,config.TiLaunchActivityName); sleep(2000);
	tapFor( 40, 360, 1, 50, 50, 500);  //選第二個程式(merge hero)
	tapFor(470, 130, 1, 50, 50, 500);  //點選-備份還原功能
	tapFor( 40, 360, 1, 50, 50, 500);  //選第二個程式(merge hero)
	tapFor(470, 130, 1, 50, 50, 500);  //點選-備份還原功能
	tapFor(160, 190, 1, 50, 50, 3000);  //點選-備份
	tapFor(120, 350, 1, 50, 50, 1500);  //選

	// console.log('Back to Game')
	rbm.startApp(config.PackangName,config.LaunchActivityName); sleep(5000);
	tapFor(360, 860, 2, 50, 50, 3000);  //點選-確定

	
	for (var j = 0; j <= 10; j++) {
		if (!config.isRunning) return false;
		// console.log('j:', j);

		var colorGetOK = checkPointcolor(260, 400, 15, 'F53A65'); //確認得到遺物
		if (colorGetOK) {
			// console.log(RelicLvChk());
			break;
		} else {
			tapFor(320, 820, 2, 50, 200, 2000);  //龍心or愛心遺物使用1回購買
		}
		sleep(1000);
	}
}

function RelicLvChk() {
	if (!config.isRunning) return false;

	var colorGetOK = checkPointcolor(260, 400, 15, 'F53A65'); //確認得到遺物
	if (!colorGetOK) {console.log('Relic Get LV: N/A , return: -1'); return -1;}

	sleep(1000);
	var img = getScreenshotModify(RelicLvColor[7][1], RelicLvColor[7][2], 25, 1, 25, 1, 100);
	for (var i = 0; i <= 5; i++) {
		var winOK = true;
		for (var j = 1; j <= 3; j++) {
			RelicLvColor[8][j] = getpointHex(img, RelicLvColor[6][j], 0);

			var colorOK = isSameColorHex(RelicLvColor[i][j], RelicLvColor[8][j], 20);
			if (!colorOK) {winOK = false; break;}
		}

		// rbm.log('RelicLvColor[8]:', RelicLvColor[8]);
		// rbm.log('RelicLvColor['+i+']:', RelicLvColor[i]);
		// console.log('');

		if (winOK) {
			releaseImage(img);
			
			console.log('Relic Get LV:', RelicLvColor[i][0], ', return:', i);
			// return RelicLvColor[i][0];
			return i;
		}
	}
	releaseImage(img);
	console.log('Relic Get LV: false');
	return -2;
}

// ===========================================================

function main(){       //主流程
	if (!config.isRunning) return false;
	buildlvup(bscantime,swipupt);
	collmaterial(mscantime);
	// buffer_check();
	// debug(15);
	sleep(1000);
}

// ===========================================================

function setFirstTimer() {   //預設值設定
	buildlvupTime = Date.now() + 3 * 1000;  //建築升級
	collmaterialTime = Date.now() + 3 * 1000; //採礦


	newwpTimer    = Date.now() +  30 * 1000;  //新武器出現時間差
	skilluseTimer =  Date.now() + 120 * 1000;  //大技使用控制時間(武器未更換時間)
	taptreasuresTimer =  Date.now() + 300 * 1000;  //點寶物/太古石板
	
	checkScreenTimer  = Date.now() +   5 * 1000;  //畫面停止檢查用，不可刪
	ScreenErrorTime1 = Date.now();
	rbm.screencrop('checkADstop.png', 180, 270, 590, 860);

	debugTimer = Date.now();   //debug initial
}

function setFirstsetting() {
	buildswitch = 1; //建築升級開關
	swipmode = 1; //升級方式 0:下至上  1:上至下
	bscantime = 15; //建築檢查升級時間(s)
	swipupt = 9 //'建築選單上滑次數'
	bsw01 = 1;  //'指揮中心',
	bsw02 = 1;  //'石油廠',
	bsw03 = 0;  //'導彈工廠',
	bsw04 = 0;  //'坦克工廠', 
	bsw05 = 1;  //'發電廠',
	bsw06 = 1;  //'鐵礦廠',
	bsw07 = 0;  //'直升機場',
	bsw08 = 0;  //'軍團',
	bsw09 = 0;  //'研究所',
	bsw10 = 0;  //'特種兵營'
	bsw11 = 0;  //'一號倉庫'
	bsw12 = 0;  //'二號倉庫'
	bsw13 = 0;  //'改裝工廠'
	bsw14 = 0;  //'矽礦提煉廠'
	bsw15 = 0;  //'晶礦加工廠'
	bsw16 = 0;  //'軍官學院'

	collswitch = 1; //採集開關
	collmaxstocks = 3;  //採集最大佇列數
	mscantime = 60; //採礦檢查升級時間(s)
	msw01 = 1;  //'電',
	msw02 = 1;  //'油',
	msw03 = 1;  //'鐵',
	msw04 = 0;  //'矽', 
	msw05 = 0;  //'晶',

	fmodsw = 1;  //戰力配置  1:最大戰力  2:最大載重
	sto1sw = 1;  //設置部隊1格，開關
	sto2sw = 0;  //設置部隊2格，開關
	sto3sw = 1;  //設置部隊3格，開關
	sto4sw = 0;  //設置部隊4格，開關
	sto5sw = 1;  //設置部隊5格，開關
	sto6sw = 0;  //設置部隊6格，開關
}

function test(cycle, DT){
	rbm.init();
	config.isRunning = true;               //腳本測試用function
	for(var n = 0; n <= cycle; n++) {
		if (!config.isRunning) return false;
		
		if (n == 0) { 
			setFirstsetting();   //設定初值設定值
			setFirstTimer();     //設定初始時間值
		} else if (n >= 1) {
			console.log('n = ', n, '/', cycle, ', CRA 腳本開始');

			while(config.isRunning) {main();} 

			// console.log('n = ', n, ', CRA 腳本結束');
			console.log('=======================');
			sleep(DT);
		}
	}
}

function stop() {
	config.isRunning=false;
}

var global = this;
function start(settingString) {
	rbm.init();
	config.isRunning = true;
	
	var settings = JSON.parse(settingString);
	for(var key in settings) {global[key] = settings[key] * 1;};

	// commandsetting();    //設定值列表
	// setFirstsetting();   //設定初值設定值
	setFirstTimer();     //設定初始時間值
	console.log('腳本開始');	
	while(config.isRunning) { main(); }
} 

// gg script path = '/storage/emulated/0/Robotmon/scripts/com.donny.bladecrafter2/ggscript/com.studiodrill.bladecrafter2.lua'
// ./bin/adb -s emulator-5558 shell ps | grep app_
// ./bin/adb shell kill -9 2552
// ./bin/adb shell
// ps | grep app_