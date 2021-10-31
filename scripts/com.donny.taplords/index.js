importJS('RBM-0.0.3');

// ============================idlerpg=============================== //

var config = {
  appName: 'com.donny.taplords',   //最
  oriScreenWidth: 1280, // source
  oriScreenHeight: 720,
  oriVirtualButtonHeight: 0,
  oriResizeFactor: 1, 
  eventDelay: 50,
  imageThreshold: 1,
  imageQuality: 100,
  resizeFactor: 1, // small -> quickly
  scriptDir: 'scripts/com.donny.taplords/images',
  isRunning: false,
  PackangName: 'tap.lords.royale',
  LaunchActivityName: 'com.unity3d.player.UnityPlayerActivity',
  TiPackangName: 'com.keramidas.TitaniumBackup',
  TiLaunchActivityName: 'com.keramidas.TitaniumBackup.MainActivity',
};

// 應用:Taptic Heroes
// 包名:tap.lords.royale
// 啟動類:com.unity3d.player.UnityPlayerActivity

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
	
	tapDown(intx, inty, 30);
	for (var i = 0; i < moveD; i++) {
		if (!config.isRunning) { tapUp(intx, i, 200);  break; }
		intx = intx + MoveXD
		inty = inty + MoveYD
		moveTo(intx, inty, 6);
	}
	moveTo(finax, finay, 6)	
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
					// rbm.log('4 reNum:', i, numstr + i + '.png', result.x, result.y, result.score);
					
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
		DIY_swipe(intX, intY, intX2, intY2, 10, pushtime);
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
	//console.log('各項升級限制條件');
	
	switch (choiceF) {
		case  1: 
			rbm.keepScreenshotPartial( 955,  40, 1280, 120);  //
			for (var i = 1; i <= 2; i++) {
				var filename = 'mainpage_icon_0' + i + '.png';
				var Img1 = rbm.findImage(filename, 0.95);
				rbm.log(filename + ':', Img1);

				if (Img1 == undefined) {
					rbm.releaseScreenshot();
					return false;
				}
			}
			rbm.releaseScreenshot();
			return true			

		case  2:
			rbm.keepScreenshotPartial(480, 290, 800, 350);  //
			for (var i = 2; i <= 3; i++) {
				var filename = 'AD_gift_0' + i + '.png';
				var Img1 = rbm.findImage(filename, 0.96);
				// rbm.log(filename + ':', Img1);

				if (Img1 == undefined) {
					rbm.releaseScreenshot();
					return false;
				}
			}
			rbm.releaseScreenshot();
			return true			

		case  3:
			rbm.keepScreenshotPartial(120, 140, 250, 360);  //
			for (var i = 1; i <= 1; i++) {
				var filename = 'masterSTR_0' + i + '.png';
				var Img1 = rbm.findImage(filename, 0.96);
				rbm.log(filename + ':', Img1);

				if (Img1 == undefined) {
					rbm.releaseScreenshot();
					return 0;
				}
			}
			rbm.releaseScreenshot();
			if (Img1.y < 260){return 1}
			if (Img1.y > 260){return 2}

		case  4: return 
		case  5: return 
		case  6: return
		case  7: return
	
	}
}

function recoNum(choiceF) {        //各項數字辨識
	if (!config.isRunning) return false;
	//console.log('各項數字辨識', choiceF);
	
	switch (choiceF) {
		case  1: return	num_Recognition(720, 55, 880, 75, 0.85, 'Num/Gate/gate_num_'); break;  //關卡數
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
	
	var colorOK = checkPointcolor(310, 930, 20, '59678A');   //點灰色按鈕
	if(colorOK) {tapFor(300, 940, 2, 50, 300, 100);}

	for (var i = 8; i >= 4; i--){
		var chkPoint = useReturn(i);
		if (chkPoint.r) {
			tapFor(chkPoint.x, chkPoint.y + 3, 1, 50, 100, 1000);

			if (i != 8) {waitAD2(65);}
			else sleep(1000);
		} 
	}
	
	for (var j = 0; j <= 30; j++){
		if (useReturn(1)) {return false;}
		keycode('BACK', 200); sleep(400);
		sleep(500);
	}

	return chkPoint;
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
				var mainpage = useReturn(1); //主畫面圖示
				if (mainpage) {
					a = a + 1;
					if (i < 10 && a >= 10) {console.log('選單鈕，出現10秒，異常'); return false;}
					else if (i > 5 && a >=  2) {console.log('選單鈕，出現 5秒，回到遊戲'); return false;}
				} else {
					a = 0;
					var stoptime1 = ScreenStopTimes( 0, 0, 720, 80, 0.999, 'checkADstop.png', 1)
					console.log('stoptime1:', stoptime1)
					if (stoptime1 >= 5.5 || i >= 35) {
						console.log('廣告結束，畫面停3秒，回遊戲');

						keycode('HOME', 300); sleep(2000);
						rbm.startApp(config.PackangName,config.LaunchActivityName);
						sleep(1500);

						// keycode('BACK', 200);

						for (var j = 0; j <= 5; j++){
							if (useReturn(1)) {return false;}
							// keycode('BACK', 200); sleep(1400);
							// sleep(500);
						}
						stoptime1 = 0;
					}
	
					var spd2_02 = CheckImageTap(240, 730, 460, 850, 0.90, 'AD_Speedx2_02.png', 0, 0, 1, 100, 2, 1);
					if (spd2_02){
						tapFor(600, 900, 4, 20, 100, 200);
						break;
					}
				}
			}
			
			if (i >= 52) {
				console.log('畫面轉向，計時 = ' + i, '回桌面，再回遊戲，切廣告')
				// swipFor(685, 25, 1, 50, 100, 100);
				keycode('HOME', 300); sleep(2000);
				rbm.startApp(config.PackangName,config.LaunchActivityName);
				sleep(1500);
			} else if (i >= 40) {
				console.log('畫面轉向，計時 = ' + i, '按 BACK，切廣告')
				// keycode('BACK', 200); sleep(1500);
			}
		}

		sleep(900);
		console.log('Wait Time: ', i, '/', timer, ', stoptime1:', stoptime1);
	}
}

// ==================BATTLE HEROES=========================================

function btheroer(){
	if (!config.isRunning) return false;

	var ckPointX = [154];
	var ckPointY = [615];

	var PointInd = 1
	for (var j = 1; j <= 2; j++) {
		for (var i = 1; i <= 4; i++) {
			ckPointX[PointInd] = ckPointX[0] + (i-1) * 171;
			ckPointY[PointInd] = ckPointY[0] + (j-1) * 171;

			PointInd = PointInd + 1;
		}
	}

	rbm.log('ckPointX:', ckPointX);
	rbm.log('ckPointY:', ckPointY);

	var upTik = 0
	for (var k = 1; k <= 8; k++) {
		var chkP = checkPointcolorTap(ckPointX[k], ckPointY[k], 30, 'FF0033', 0, 0, 1, 300, 2);
		console.log('k:', k, ', chkP:', chkP);
		if (chkP) {
			tapFor(ckPointX[k], ckPointY[k], 1, 15, 30, 100);

			upTik = upTik + 1
		}
		if (upTik >= 3) {
			sleep(500);
			// waittime('Upgrade Selected:', 1);

			tapFor(270, 1220, 1, 15, 100, 100);
			waittime('Upgrade Start:', 2);

			tapFor(270, 1070, 1, 15, 100, 300);
			// waittime('Upgrade OK:', 1);

			break;
		}
	}
	// checkPointcolorTap(intX, intY, diff, strRGB, TapX, TapY, TapTimes, Delay1, Taptype)

}


// ===========================================================

function suddenAD(mod) {
	if (!config.isRunning) return false;
	if (useReturn(1) && mod == 1) return false;
	console.log('suddenAD!!');

	keycode('HOME', 1600);
	rbm.startApp(config.PackangName,config.LaunchActivityName); 
	sleep(2000);
}

function getADgift(){
	if (!config.isRunning) return false;
	if (!useReturn(2)) return false;
	console.log('getADgift choice OK!!');

	tapFor(500, 330, 1, 50, 50, 200);   //選第1個， ruby, 3%DPS, coine
	tapFor(640, 460, 1, 50, 50, 1500);   //點選-OK
}

function tapMonster(){
	if (!config.isRunning) return false;
	// tapFor(800, 300, 100, 20, 10, 10);

	DIY_swipe(150, 170, 150, 1200, 15, 100);
	DIY_swipe(150, 170, 150, 1200, 15, 100);

	for (var k = 1; k <= 6; k++) {
		if (!config.isRunning) return false;

		if (k % 2 == 0) {
			CheckImageTap(380, 630, 400, 650, 0.92, 'Skill_01.png', 390, 670, 2, 100, 0, 1); //1st Skill Tap
			CheckImageTap(630, 630, 710, 650, 0.92, 'Skill_04.png', 640, 670, 2, 100, 0, 1); //4st Skill Tap
			heroNewGrow();

			var stoptimes = ScreenStopTimes(540, 250, 840, 550, 0.98, 'checkSCstop.png', 2);
			if (stoptimes >= 6){
				console.log('stoptimes >= 6, ', stoptimes);
				suddenAD(2);
			}
		}

		for (var j = 1; j <= 10; j++) {
			if (!useReturn(1)) return false;
			var dDt = (j - 1) * 20
			DIY_swipe(750 + dDt, 200 + dDt, 750 + dDt, 300 + dDt, 5, 10);
			DIY_swipe(750 + dDt, 300 + dDt, 750 + dDt, 200 + dDt, 5, 10);
		}
	}

}

function fight1000Boss(){
	if (!config.isRunning) return false;
	if (recoNum(1) % 1000 != 0){return false;}	

	console.log('fight 1000 Boss !!')
	for (var l = 1; l <= 5; l++) {
		var fightBoss1 = CheckImageTap(1140, 14, 1210, 50, 0.90, 'fight_boss_1.png', 0, 0, 1, 100, 2, 1); //
		if (fightBoss1){
			tapFor(1220, 30, 2, 30, 100, 1000);
		}else{
			tapFor(1220, 30, 1, 30, 100, 1000);
		}
		
		var fightBoss2 = CheckImageTap(1140, 14, 1210, 50, 0.90, 'fight_boss_1.png', 0, 0, 1, 100, 2, 1); //
		if (fightBoss2){
			for (var m = 1; m <= 40; m++) {
				lv1000Boss2();
				sleep(200);
				if(recoNum(1) % 1000 != 0){break;}
			}
			if(recoNum(1) % 1000 != 0){break;}
		}
		
		sleep(1000);
	}

}

function lv1000Boss(){
	if (!config.isRunning) return false;
	console.log('lv 1000 Boss !!');

	var chkTap = 0  //
	for (var i = 1; i <= 3; i++) {
		rbm.keepScreenshotPartial(630, 200, 1100, 600);
		var filename = '1000BOSS_0' + i + '.png';
		var Img1 = rbm.findImage(filename, 0.85);
		// rbm.log(filename + ':', Img1);

		if (Img1 != undefined) {
			rbm.log('i:', i, Img1);
			tapFor(Img1.x, Img1.y, 3, 20, 300);
			chkTap = i;
		}
		if (chkTap != i){break;}
	}
	rbm.releaseScreenshot();
}

function lv1000Boss2(){
	if (!config.isRunning) return false;
	console.log('lv 1000 Boss !!');

	var scriptDir = config.scriptDir;
	var scriptPath = getStoragePath() + '/' + scriptDir;

	var chkTap = 0  //
	for (var l = 1; l <= 3; l++) {
		if (!config.isRunning) return false;

		console.log('l:', l);

		for (var k = 1; k <= 3; k++) {
			var image = getScreenshotModify(430, 200, 670, 400, 670, 400, 100);
			var filename = scriptPath + '/' + '1000BOSS_2_0' + l + '.png';	
			var tImg = openImage(filename);

			console.log('l:', l, 'filename:', filename);
			var results = findImages(image, tImg, 0.94, 3, true);
			rbm.log('results:', results);
			if (results != ''){

				results = results.sort(function(a, b) {
					return a.score < b.score ? 1 : -1;
				});

				for (var index in results){
					if (!config.isRunning) return false;

					var result = results[index];
					rbm.log('result:', l, index, results);
					
				}

				var result = results[0];
				
				var tapX = result.x + 430;
				var tapY = result.y + 200;

				console.log('tapX:', tapX, ', tapY:', tapY);

				tapFor(tapX, tapY, 2, 20, 30, 200);
				chkTap = l;
				break;

			}
			rbm.releaseScreenshot();
			sleep(200);
			// if (chkTap != l){break;}
		}
	}
}

function masterSkillUp(Timer){
	if (!config.isRunning) return false;
	if (Date.now() < mstSkillupTimer) return false;

	console.log('masterSkillUp');

	tapFor(160, 60, 2, 20, 30, 2000);
	DIY_swipe(150, 170, 150, 900, 15, 200);
	DIY_swipe(150, 170, 150, 900, 15, 1000);

	var masterDPSpos = useReturn(3);
	var masterUpY = 260 + (masterDPSpos - 1) * 160;
	if (masterDPSpos == 0){tapFor(60, 60, 2, 20, 30, 500); return false;}

	console.log('skillFull:', skillFull);
	if (!skillFull){
		var skillFull1 =  CheckImageTap(350, 540, 1100, 720, 0.96, 'map_skill_icon_08.png', 0, 0, 1, 100, 2, 1); //
		var skillFull2 =  CheckImageTap(350, 540, 1100, 720, 0.98, 'map_skill_icon_08b.png', 0, 0, 1, 100, 2, 1); //
		if (!skillFull1 && !skillFull2){
			tapFor(220, masterUpY, 3, 20, 30, 100);
			tapFor( 60, masterUpY, 3, 20, 30, 500);
		}else{skillFull = 1;}
	}

	var scriptDir = config.scriptDir;
	var scriptPath = getStoragePath() + '/' + scriptDir;
	for (var k = 1; k <= 4; k++) {
		if (!config.isRunning) return false;
		if (!useReturn(1)){
			rbm.releaseScreenshot();
			return false;
		}

		var findImgY = 125
		if (k == 1){findImgY = masterUpY + 70;}

		for (var l = 1; l <= 2; l++) {
			var image = getScreenshotModify(170, findImgY, 60, 715 - findImgY, 60, 715 - findImgY, 100);
			var filename = scriptPath + '/' + 'itemUP_01.png';			
			var tImg = openImage(filename);
			
			var results = findImages(image, tImg, 0.96, 4, true);
			if (results != ''){

				results = results.sort(function(a, b) {
					return a.y > b.y ? 1 : -1;
				});

				for (var index in results){
					if (!config.isRunning) return false;
					// rbm.log('results:', results);

					var result = results[index];
					tapFor(250, findImgY + result.y, 4, 20, 30, 100);
				}
			}else{break;}
			rbm.releaseScreenshot();
			sleep(100);
		}

		if (k != 4){
			DIY_swipe(150, 680, 150, 150, 50, 30);
			tapFor(340, 150, 1, 20, 30, 500);
		}
	}
	
	DIY_swipe(150, 170, 150, 900, 15, 150);
	DIY_swipe(150, 170, 150, 900, 15, 150);
	DIY_swipe(150, 170, 150, 900, 15, 500);

	tapFor(60, 60, 2, 20, 30, 500);
	mstSkillupTimer =  Date.now() + Timer * 1000;
}

function heroLvUp(Timer){
	if (!config.isRunning) return false;
	if (Date.now() < heroLvUpTimer) return false;
	
	console.log('heroLvUp');

	DIY_swipe(150, 710, 150, -300, 15, 100);
	DIY_swipe(150, 710, 150, -300, 15, 100);
	DIY_swipe(150, 710, 150, -300, 15, 300);

	var scriptDir = config.scriptDir;
	var scriptPath = getStoragePath() + '/' + scriptDir;
	for (var k = 1; k <= 7; k++) {
		if (!config.isRunning) return false;
		if (!useReturn(1)){
			rbm.releaseScreenshot();
			return false;
		}

		for (var l = 1; l <= 2; l++) {
			var image = getScreenshotModify(170, 160, 60, 560, 60, 560, 100);
			var filename = scriptPath + '/' + 'itemUP_01.png';			
			var tImg = openImage(filename);

			var results = findImages(image, tImg, 0.96, 4, true);
			if (results != ''){

				results = results.sort(function(a, b) {
					return a.y < b.y ? 1 : -1;
				});

				for (var index in results){
					if (!config.isRunning) return false;
					// rbm.log('results:', results);

					var result = results[index];
					tapFor(250, 160 + result.y, 2, 20, 30, 30);
					tapFor( 60, 160 + result.y, 3, 20, 30, 30);
					tapFor(250, 160 + result.y, 3, 20, 30, 30);
				}
			}else{break;}
			rbm.releaseScreenshot();
			sleep(100);
		}
		DIY_swipe(150, 160, 150, 650, 70, 100);
		tapFor(340, 160, 1, 30, 30, 50);
	}
	
	heroLvUpTimer =  Date.now() + Timer * 1000;
}

function heroNewGrow(){
	if (!config.isRunning) return false;

	var heroUp1 = CheckImageTap(85, 80, 110, 100, 0.98, 'hero_upOpen_03.png', 0, 0, 1, 100, 2, 0); //
	if (heroUp1){
		
		console.log('herheroNewGrowoLvUp');

		tapFor(60, 60, 2, 20, 30, 30);

		for (var i = 1; i <= 5; i++){
			var heroUp2 = CheckImageTap(280, 210, 340, 280, 0.98, 'hero_upOpen_03.png', 0, 0, 1, 100, 2, 0); //
			if (heroUp2){
				tapFor(250, 270, 2, 20, 30, 30);
				break;
			}else{
				DIY_swipe(150, 170, 150, 900, 10, 200);
			}
			sleep(200)
		}
	}
}

function sysErrorRestart(){
	if (!config.isRunning) return false;
	
	var sysErr = CheckImageTap(570, 290, 700, 350, 0.96, 'SYS_ERROR_01.png', 0, 0, 1, 100, 2, 1); //
	if (sysErr) {
		rbm.stopApp(config.PackangName); sleep(300);
		rbm.stopApp(config.PackangName); sleep(800);
		rbm.startApp(config.PackangName,config.LaunchActivityName); 

		for (var j = 0; j <= 20; j++) {
			console.log('Restart App ', j, 'sec...');
			sleep(1000);
		}
	}
}

function ADgift5sec(){
	if (!config.isRunning) return false;

	tapFor(700, 30, 1, 10, 30, 800);
	tapFor(1080, 100, 1, 10, 30, 500);
	
	tapFor(700, 30, 1, 10, 30, 800);
	tapFor(1080, 100, 1, 10, 30, 500);

	keycode('HOME', 300); sleep(1000);
	rbm.startApp(config.PackangName,config.LaunchActivityName);
	sleep(1000);

	tapFor(590, 360, 1, 10, 30, 500);
	tapFor(590, 450, 4, 10, 300, 1000);
	
}

function ADgift30sec(slt){  //slt:1 Coin, 2 Ruby, 3 DPS
	if (!config.isRunning) return false;

	var seltX = [170, 600, 940, 300];
	var seltY = [ 70, 290, 290, 470];

	var ADSec30 = CheckImageTap(seltX[slt], seltY[slt], seltX[slt]+seltX[0], seltY[slt]+seltY[0], 0.90, 'AD30sec_00.png', 0, 0, 1, 100, 2, 1); //
	if (ADSec30){
		tapFor(seltX[slt]+20, seltY[slt]+20, 2, 10, 30, 100);
		waittime('ADSec30', 37);

		keycode('HOME', 500); sleep(500);
		rbm.startApp(config.PackangName,config.LaunchActivityName);
		sleep(1000);
		
		for (var i = 1; i <= 10; i++){
			var gift = CheckImageTap(540, 200, 710, 350, 0.96, 'ADgiftGet.png', 0, 0, 2, 100, 2, 1);  //
			if (gift){
				tapFor(590, 450, 2, 10, 20, 100);
				break;
			}
			sleep(200);
		}
		// tapFor(590, 450, 4, 10, 300, 100);
		waittime('AD Btn', 6);

	}else{
		var gift = CheckImageTap(540, 200, 710, 350, 0.96, 'ADgiftGet.png', 0, 0, 2, 100, 2, 1);  //
		if (gift){
			tapFor(590, 450, 2, 10, 20, 100);
		}

		sleep(1000);
	}
}

//====MOD GAME===

function herolvup2(){
	if (!config.isRunning) return false;
	
	console.log('heroLvUp2');

	//              1  2  3  4  5  6  7  8  9  10  11  12  13  14  15  16  17  18  19  20
	var lvupt = [0, 8, 8, 8, 8, 8, 8, 8, 8, 8,  8,  8,  8,  8,  7,  6,  6,  5,  5,  4,  3];
	var btnDY = [0, 675, 471, 267];

	tapFor(250, 290, 25, 30, 50, 200);
	DIY_swipe(150, 710, 150, -300, 15, 300);
	DIY_swipe(150, 710, 150, -300, 15, 300);
	DIY_swipe(150, 710, 150, -300, 15, 300);
	DIY_swipe(150, 710, 150, -300, 15, 300);

	for (var i = 1; i <= 20; i++){
		if (i <= 18){var tapY = btnDY[1];}
		else if (i == 19){var tapY = btnDY[2];}
		else if (i == 20){var tapY = btnDY[3];}

		tapFor(250, tapY, 2, 30, 50, 50);
		tapFor(100, tapY, 2, 30, 50, 50);
		tapFor(250, tapY, 9, 30, 50, 90);
		
		for (var j = 1; j <= lvupt[i]; j++){
			tapFor(250, tapY, 2, 30, 50, 50);
			tapFor(100, tapY, 1, 30, 50, 50);
		}
		DIY_swipe(150, 160, 150, 378, 70, 30);
		tapFor(340, 350, 1, 30, 30, 200);
	}

}

function herolvup3(){
	if (!config.isRunning) return false;
	if (hero20_4000) return false;


	tapFor(60, 60, 2, 20, 30, 500);
	var mMenu1 = CheckImageTap(20, 25, 100, 70, 0.95, 'mainMenu_01.png', 0, 0, 1, 100, 2, 0); //
	if (!mMenu1) return false;

	var hero01_1 = CheckImageTap(10, 110, 140, 300, 0.95, 'hero01_1.png', 0, 0, 1, 100, 2, 0); //
	if (!hero01_1) return false;



	// var hero20_4000 = CheckImageTap(10, 120, 120, 260, 0.95, 'hero_icon_20_4000.png', 0, 0, 1, 100, 2, 1); //
	// if (hero20_4000) {
	// 	tapFor(160, 60, 2, 20, 30, 800);
	// 	tapFor(250, 230, 1, 20, 30, 800);
	// 	tapFor(740, 570, 2, 20, 30, 800);

	// 	return false;
	// }
		
	console.log('heroLvUp3');

	//              1  2  3  4  5  6  7  8  9  10  11  12  13  14  15  16  17  18  19  20
	var lvupt = [0, 8, 8, 8, 8, 8, 8, 8, 8, 8,  8,  8,  8,  8,  7,  6,  6,  5,  5,  4,  3];
	var btnDY = [0, 675, 471, 267];

	tapFor(250, 290, 2, 30, 50, 200);

	for (var i = 1; i <= 20; i++){
		if (i <= 18){var tapY = btnDY[1];}
		else if (i == 19){var tapY = btnDY[2];}
		else if (i == 20){var tapY = btnDY[3];}

		tapFor(250, tapY, 2, 30, 50, 50);
		tapFor(100, tapY, 2, 30, 50, 50);
		tapFor(250, tapY, 9, 30, 50, 90);
		
		for (var j = 1; j <= lvupt[i]; j++){
			tapFor(250, tapY, 2, 30, 50, 50);
			tapFor(100, tapY, 1, 30, 50, 50);
		}
		
		tapFor(250, 290, 1, 30, 50, 200);
	}
	
	// var hero20_4000 = CheckImageTap(10, 120, 120, 260, 0.95, 'hero_icon_20_4000.png', 0, 0, 1, 100, 2, 1); //
	// if (hero20_4000) {
	// 	tapFor(160, 60, 2, 20, 30, 800);
	// 	tapFor(250, 230, 1, 20, 30, 800);
	// 	tapFor(740, 570, 2, 20, 30, 800);

	// 	return false;
	// }
}

function reKey(){
	if (!config.isRunning) return false;

	var picNM = [0, -1, -1, -1, -1];
	var postY = [0, -1, -1, -1, -1];
	var picSi = [0, 0.81, 0.80, 0.84, 0.83];

	var rekey0 = CheckImageTap(550, 400, 720, 470, 0.96, 'reKey_00.png', 0, 0, 1, 100, 2, 1); //
	if (rekey0) {
	
		console.log('reKey Start !!');

		for (j = 1; j <= 12; j++) {
			
			rbm.keepScreenshotPartial(460, 300, 820, 450);  //
			for (var i = 1; i <= 4; i++) {
				if (picNM[i] == -1) {
					
					for (var l = 1; l <= 2; l++) {
						var filename = 'reKey_' + l + '_0' + i + '.png';
						var Img1 = rbm.findImage(filename, picSi[i]);
						// rbm.log(filename + ':', Img1);
						if (Img1 != undefined){break;}
					}

					if (Img1 != undefined) {
						rbm.log(filename + ':', Img1);
						picNM[i] = 1;
						if (Img1.x > 485 - 10 && Img1.x < 485 + 10){postY[1] = 1;}
						if (Img1.x > 564 - 10 && Img1.x < 564 + 10){postY[2] = 1;}
						if (Img1.x > 645 - 10 && Img1.x < 645 + 10){postY[3] = 1;}
						if (Img1.x > 725 - 10 && Img1.x < 725 + 10){postY[4] = 1;}
					}
				}
			}
			rbm.releaseScreenshot();

			var sumpicNM = 0;
			// rbm.log('picNM:', picNM);
			for (var l = 0; l < picNM.length; l++) {
				sumpicNM += picNM[l];
			}

			if (sumpicNM == 4){
				console.log('soultion over !!');
				tapFor(600, 430, 2, 30, 50, 100);
				waittime('soultion over !!', 12);
				return false;
			}
			
			for (var k = 1; k <= 4; k++) {
				if (postY[k] == -1) {
					tapX = 500 + (k - 1) * 80;
					tapFor(tapX, 340, 1, 30, 30, 50);
				}
			}
			tapFor(450, 260, 1, 30, 50, 100);

		}
	}
}

//==========

function Fight_GG() {
	if (!config.isRunning) return false;


	var FightSW = CheckImageTap(500, 970, 700, 1100, 0.90, 'get01.png', 0, 0, 1, 100, 2, 1);
	if (!FightSW) {
		FightSW = CheckImageTap(500, 970, 700, 1100, 0.90, 'left01.png', 0, 0, 1, 100, 2, 1);
	} sleep(200);

	if (FightSW) {
		var spd2_01 = CheckImageTap(540, 740, 700, 820, 0.60, 'AD_Speedx2_01.png', 0, 0, 1, 100, 2, 1);
		if (spd2_01) {return false;}

		console.log('Start to Fight!!');
		tapFor(600, 1040, 4, 20, 200, 1700);
		tapFor(35,  420, 1, 30, 100, 1000);
		tapFor(200, 150, 1, 30, 100, 500);
		tapFor(280,  20, 4, 60, 100, 500);
		tapFor(620, 150, 1, 30, 100, 500);
		tapFor(630, 820, 1, 30, 100, 900);
		tapFor(630, 910, 1, 30, 100, 800);
	}
}

function startcheck(wt) {
	if (!config.isRunning) return false;
	var waitTime = wt * 1000;
	sleep(waitTime);
	tapFor(360, 990, 8, 30, 400, 200);
}

function dailystore() {
	if (!config.isRunning) return false;
	tapFor(570, 30, 1, 20, 100, 1000);
	tapFor(180, 380, 1, 20, 100, 1000);
}

function adspeedx2(ADt) {
	if (!config.isRunning) return false;

	var FightSW = CheckImageTap(500, 970, 700, 1100, 0.90, 'get01.png', 0, 0, 1, 100, 2, 1);
	if (!FightSW) {
		FightSW = CheckImageTap(500, 970, 700, 1100, 0.90, 'left01.png', 0, 0, 1, 100, 2, 1);
	} if (!FightSW) {return false;}

	sleep(1000);
	var spd2_01 = CheckImageTap(540, 740, 700, 820, 0.60, 'AD_Speedx2_01.png', 0, 0, 1, 100, 2, 1);
	if (spd2_01) {
		tapFor(570, 790, 1, 20, 100, 300);
		tapFor(660, 790, 1, 20, 100, 1500);
		// sleep(1000);
	}

	var spd2_02 = CheckImageTap(240, 730, 460, 850, 0.90, 'AD_Speedx2_02.png', 0, 0, 1, 100, 2, 1);
	if (spd2_02) {
		cancelListGG();
		tapFor(360, 790, 5, 20, 400, 300);
		waitAD2(ADt);
	}

}

function cancelListGG() {
	if (!config.isRunning) return false;
	
	
	tapFor( 35, 420, 1, 30, 100, 900);
	tapFor(430,  20, 3, 30, 100, 500);
	tapFor(350, 150, 1, 30, 100, 500);
	tapFor(360, 460, 1, 30, 100, 500);
	tapFor(560, 660, 3, 30, 100, 300);
	tapFor(690,  20, 1, 30, 100, 500);

}

function debug(Timer) {
	if (!config.isRunning) return false;
	if (!debugFc) return debugTimer = Date.now();
	console.log('Debug');

	if (debugFc) {
		var ErrorTime = (Date.now() - debugTimer) / 1000 - Timer;
		// console.log(ErrorTime, Date.now(), debugTimer, Timer);
		console.log(ErrorTime, Timer);

		
		var pointColor = getPointcolorHex(360, 760);
		var chkColor = isSameColorHex(pointColor, 'E7AC30', 20);
		if (chkColor) {
			tapFor(365, 765, 2, 50, 100, 500);   //點開始mini game / 關閉
		} else if (ErrorTime > 0) {
			console.log('Debug Click Back');
			debugTimer = Date.now();
			keycode('BACK', 500);
			tapFor(360, 40, 2, 50, 100, 200);
			sleep(2000);
			debugFc = false;
		}
	}

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
	tapFor(380, 730, 1, 50, 50, 3000);  //點選-資料 //Tibackup 8.xx pro  420 730 / free 140 730
	
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
function openNewItem(item, st) {
	if (!config.isRunning) return false;
	if (item == 8) {debugFc = false; rebirth(3, 0); return false;}
	console.log('Open New Item !!');

	var tapX = ['', '', '', 600, 600, 600, '',  175];      //3:裝備 /4:寵物 /5:寶物 /7:簽到獎勵
	var tapY = ['', '', '', 830, 830, 830, '',   30];      //檢查是否有new紅泡泡(開寶箱)

	var pntX = ['', '', '', 360, 360, 360, '',  160];      //3:裝備 /4:寵物 /5:寶物 /7:簽到獎勵
	var pntY = ['', '', '', 450, 450, 450, '',  375];      //檢查是否有蓋備出現

	var dlyS = ['', '', '', 700, 700, 700, '', 2000];      //翻牌開物品等待

	for (var i = 0; i <= st; i++){
		if (!config.isRunning) return false;
		// console.log('openNewItm i:', i);

		if (useReturn(item)){                                 //檢查是否有new紅泡泡(開寶箱)
			tapFor(tapX[item], tapY[item], 1, 50, 100, 500);
		} else {
			var pointColor = getPointcolorHex(pntX[item], pntY[item]);      //寶物蓋牌出現確認
			var chkColor = isSameColorHex(pointColor, 'A57B39', 30);
			if (chkColor) {tapFor(360, 830, 1, 50, 100, dlyS[item]); break;}
		}

		if (item == 7) {
			var pointColor = getPointcolorHex(360, 820);                //刷每日獎勵，領取鈕
			var chkColor = isSameColorHex(pointColor, 'E7AB31', 30);
			if (chkColor) {tapFor(360, 830, 1, 50, 100, 500);}
		}
		
		sleep(500);
	}
}

function chkGameOK(sec) {
	console.log('Game Starting......');
	for (var i = 0; i <= sec; i++) {
		if (!config.isRunning) return false;
		// console.log('Start Game Wait Sec:', i);

		if (useReturn(1)) {
			console.log('Game Start OK!!');
			sleep(1000);
			break;
		}
		sleep(1000);
	}
}

function chkGetItem(item, itemLv, cycle) {  //secF: item=4 ==> petLv
	if (!config.isRunning) return false;

	var pointX = ['', '', '', 314, 354, 0, '', 0];
	var pointY = ['', '', '', 538, 444, 0, '', 0];
	var pointC = ['', '', '', 'D110FA', 'A49F67', 'FFFFFF', '', 'FFFFFF'];  
	//4=>全傷:波烏靈:A7BCCF， 點傷:泰伊:DA8B52，武傷:羅拓:A49F67 
	//5=>紅裝:90453A，藍裝:3F688A，坐標 x315,y403

	var pointD = ['', '', '', 20, 20, 40];

	if (!refreshSw) {return true;}
	if (item == 5 || item == 7 || item == 8) {return true;}

	if (item == 3 && chkGearLv(itemLv, 314, 538, 2)) {
		return true;
	} else {
		for (var i = 0; i < 4; i++) {
			var pointColor = getPointcolorHex(pointX[item], pointY[item]);
			var chkColor = isSameColorHex(pointColor, pointC[item], pointD[item]);
			// console.log('item:', item, ', chkColor:', pointColor, pointC[item], chkColor, i);
			if (chkColor) {
				console.log('Get Target item in', itemName[item]);
				if (item != 4) {return true;}

				if (chkPetLv(itemLv, cycle)) {return true;}
			}
			sleep(100);
		}
		console.log('Not Found Target item in', itemName[item]);
		return false;
	}
}

function chkGearLv(lv, intX, intY, mode) {    //mode:  1:return Lv   2: return >=Lv true/false
	if (!config.isRunning) return false;

	var item3LvC = ['', 'FBFFF8', '6EFF0D', '0CA7FA', 'D110FA', 'DF9100'];

	for (var j = 1; j <= 5; j++) {
		for (var i = 0; i < 4; i++) {
			var pointColor = getPointcolorHex(intX, intY);
			var chkColor = isSameColorHex(pointColor, item3LvC[j], 30);
			// console.log('chkColor:', pointColor, item3LvC[j], chkColor, i);
			if (chkColor) {
				if (mode == 1) {return j;}

				console.log('Get Gear Lv:', j);

				if (j >= lv) {console.log('Match Gear Lv', lv);	return true;}
				else {console.log('Not Match Gear Lv', lv);	return false;}
			}
			sleep(50);
		}
	}
	console.log('Not Found Gear Lv', lv);
	
	if (mode == 1) {return 0;}
	return false;
}

function chkDalyGearLv(lv, pice) {
	if (!config.isRunning) return false;

	var chLvX = ['', 126, 324, 522, 212, 436];
	var chLvY = ['', 446, 446, 446, 709, 709];
	var chkLv = ['',   0,   0,   0,   0,   0];
	var ctRLv = ['',   0,   0,   0,   0,   0];
	var cntRLv = 0;

	for (var i = 1; i <= 5; i++) {
		chkLv[i] = chkGearLv(lv, chLvX[i], chLvY[i], 1);
		ctRLv[chkLv[i]] = ctRLv[chkLv[i]] + 1;
		if (chkLv[i] == lv) {cntRLv = cntRLv + 1;}
	}
	rbm.log("DalyGear chkLv:", chkLv);
	rbm.log("DalyGear ctRLv:", ctRLv);

	if (cntRLv >= pice) {
		console.log('Target OK!! Lv:', lv,', pice:', cntRLv, '/', pice);
		return true;
	} else {
		console.log('Target NG!! Lv:', lv,', pice:', cntRLv, '/', pice);
		return false;
	}
}

function abandonGear(sw) {
	if (!config.isRunning) return false;
	if (sw == 0) return false;

	//Gear Name Cut from 304,393 w:110 H:110
	var abandobj = {
		1 : [' gloves', '01騎士手套(武傷L)', '02戰士手套(點傷L)', '03妖精手套(全傷L)', '04獵人手套(暴傷L)', '05黑騎士手套(武傷M)', '06食人魔手套(點傷M)', '07森林妖精手套(全傷M)', '08哥布林獵人手套(暴傷M)', '09主君手套(武傷H)', '10泰坦手套(點傷H)', '11妖精王手套(全傷H)', '12惡魔獵人手套(暴傷H)'],
		2 : [' helmet', '01矮人頭盔(妖劍L)', '02聖職者帽(神劍L)', '03傭兵頭盔(英劍L)', '04咒術師帽子(魔劍L)', '05秘銀頭盔(妖劍M)', '06女武神頭盔(神劍M)', '07劍鬥士頭盔(英劍M)', '08死亡騎士帽(魔劍M)', '09山銅頭盔(妖劍H)', '10大天使頭盔(神劍H)', '11不敗頭盔(英劍H)', '12惡魔頭盔(魔劍H)'],
		3 : ['  armor', '01Equa080(寵傷L)', '02刀刃盔甲(必傷L)', '03召喚師盔甲(古傷M)', '04野獸盔甲(古傷H)', '05獸王盔甲(寵傷H)', '06破壞盔甲(破傷L)', '07定罪盔甲(必傷H)', '08破滅盔甲(破傷H)', '09古代召喚盔甲(古傷H)', '10紅野獸盔甲(寵傷M)'],  //   
		4 : ['   ring', '01水晶戒指(全金L)', '02紅寶石戒指(BOSS金L)', '03哥布林戒指(蛋金L)', '04鑽石戒指(全金M)', '05閃亮紅寶石戒指(BOSS金M)', '06青色哥布林戒指(蛋金M)', '07紅鑽石戒指(全金H)', '08燦爛的紅寶石戒指(BOSS金H)', '09哥布林王戒指(蛋金H)'],  // 
		5 : ['earring', '01祖母綠耳環(手套L)', '02魔法師耳環(頭盔L)', '03藍寶石耳環(盔甲L)', '04閃亮祖母綠耳環(手套M)', '05大魔法師耳環(頭盔M)', '06閃亮藍寶石耳環(盔甲M)', '07燦爛的祖母綠耳環(手套H)', '08賢者耳環(頭盔H)', '09燦爛的藍寶石耳環(盔甲H)']
	}

	var abaSwobj = {
		1 : [' gloves', 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 2, 1],
		2 : [' helmet', 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
		3 : ['  armor', 1, 1, 1, 1, 0, 1, 1, 1, 1, 1], 
		4 : ['   ring', 1, 1, 1, 0, 0, 1, 0, 0, 1],
		5 : ['earring', 1, 1, 1, 1, 1, 1, 0, 0, 1]
	}

	rbm.keepScreenshotPartial( 300,  390, 420, 510);  //
	for (var j = 1; j <= 5; j++) {
		var lengthI = Object.keys(abandobj[j]).length - 1;
		for (var i = 1; i <= lengthI; i++) {
			var strf = '_0'; if (i >= 10) {strf = '_'}

			console.log('Check Aband Gear:', abandobj[j][i]);

			if (abaSwobj[j][i] != 2) {
				var filename = 'gear_0' + j + strf + i + '.png';
				var Img1 = rbm.findImage(filename, 0.96);
				rbm.log('Img1:', Img1);
				
				if (Img1 != undefined && Img1.score >= 0.96) {
					console.log('Found Aband Gear');
					rbm.releaseScreenshot();

					if (abaSwobj[j][i] == 0){
						console.log('This Gear Not to Aband');
						return false;
					}
					return true;
				} else {
					console.log('Not Match Aband Gear');
				}
			} else {
				console.log('Aband Gear Not Have Picture');
			}

			console.log('----------------------');
		}
	}
	rbm.releaseScreenshot();
	sleep(100);

	console.log('Not Found Aband Gear !!');
	return false;
}

function abandonTreasures(sw, typc) {   //typc: 1:紅 2:藍 3:紫 4:黃 5:綠
	if (!config.isRunning) return false;
	if (sw == 0) return false;

	var colortre = 0;
	var pointC = ['', '90553A', '3F688A', '6B4689', '958F43', '3F9782'];
	var treasC = ['', 'Red', 'blue', 'purple', 'yellow', 'green'];
	//5=>紅裝:90453A，藍裝:3F688A，紫裝:6B4689，黃裝:958F43，綠裝:3F9782

	var pointColor = getPointcolorHex(315, 396);   //y403
	for (var k = 1; k <= 5; k++) {
		var chkColor = isSameColorHex(pointColor, pointC[k], 30);
		console.log(k, ', typc:', typc, ', chkColor:', pointColor, pointC[typc], chkColor);

		if (chkColor) {
			if (typc != 0 && typc !== k){
				console.log('Target Color Code:', k,'not match', typc);
				return true;
			}

			colortre = k;
			console.log('Target :', treasC[k], ', Color Code:', colortre);
			break;
		}
	}


	//Gear Name Cut from 304,393 w:110 H:110
	var tagName = {
		1 : ['   Red', '01悲情之槍(一般怪傷)', '02受詛咒的盾牌(魔劍傷)', '03激情的一半(休息中受損)', '04審判天秤(破壞名劍傷)', '05鬥志之劍(點傷)', '06神聖羽毛(神劍傷)', '07神秘的樹枝(妖劍傷)', '08集中的髮箍(古代名劍傷)', '09勇猛的髮箍(英劍傷)', '10極光立方體(英妖劍傷)', '11決意戒指()', '12前進號角(休息中)'],
		2 : ['  Blue', '01魔女寶珠(金x10)', '02神秘鈴鐺(百寶%)', '03世界樹的果實(MAX MP)', '04冰劍(火傷)', '05魔法師葫蘆瓶()', '06哥布林笛子', '07受詛咒的鐵棍(爆傷)', '08英雄披風', '09懺悔之鏡', '10智慧藥水', '11精靈耳環(憤怒-MP)', '12青色種子', '13大地之杖(水傷)'],
		3 : ['Purple', '01龍之靴(寵技點)', '02黑暗之劍(光傷)', '03召喚師的鏡子', '04獸王戒指(全寵%)'],  
		4 : ['yellow', '01火花鞭(地傷)', '02幸運硬幣', '03黃金雞蛋', '04光之飛鏢(暗傷)', '05貪婪的契約書', '06萬能鑰匙'], 
		5 : [' green', '01英雄信物', '02發光粉末', '03隕石碎片', '04霸氣項鍊', '05魔法沙漏(BOSS時間)', '06賢能之書', '07狂戰士手套', '08古代之石(古劍時間)']
	}

	var tagSwitch = {
		1 : ['   Red', 2, 2, 1, 1, 1, 2, 2, 1, 2, 2, 1, 1],
		2 : ['  Blue', 2, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2],
		3 : ['Purple', 1, 2, 1, 1],  
		4 : ['yellow', 2, 2, 2, 2, 2, 1],
		5 : [' green', 1, 0, 3, 1, 1, 2, 2, 1]
	}

	var chkItemName = 'Treasures'

	rbm.keepScreenshotPartial( 300,  390, 420, 620);  //
	for (var j = 1; j <= 5; j++) {
		var lengthI = Object.keys(tagName[j]).length - 1;
		for (var i = 1; i <= lengthI; i++) {
			if (j != colortre) {break;}
			var strf = '_0'
			if (i >= 10) {strf = '_'}

			console.log('Check Aband ' + chkItemName + ':', tagName[j][i]);

			if (tagSwitch[j][i] == 2) {
				console.log(chkItemName, 'is already had');

			} else {
				var filename = 'Treasures_0' + j + strf + i + '.png';
				var Img1 = rbm.findImage(filename, 0.95);
				// rbm.log('Img1:', Img1);
				
				if (Img1 != undefined && Img1.score >= 0.95) {
					console.log('Found Aband ' + chkItemName);
					rbm.releaseScreenshot();

					if (tagSwitch[j][i] == 0){
						console.log('This ' + chkItemName + ' Not to Aband');
						return false;
					}
					return true;
					
				} else {
					console.log('Not Match Aband ' + chkItemName);
				}
			}
			console.log('----------------------');
		}
	}
	rbm.releaseScreenshot();
	sleep(100);

	console.log('Not Found Aband ' + chkItemName + ' !!');
	// return true;
	return false;
}

function abandonbackSkill(sw) {
	if (!config.isRunning) return false;
	if (sw == 0) return false;


	for (var j = 0; j < 20; j++){
		console.log('檢查大技等待:', j, 'x 200 ms');

		var pointColor = getPointcolorHex(108, 420);      //轉生背動技顯示等待
		var chkColor = isSameColorHex(pointColor, 'FFBA4E', 20);
		if (chkColor) {break;}
		
		sleep(150);
	}

	var chkItemName = 'BackSkill'

	//backSkill Name Cut from 304,393 w:110 H:110
	var tagName = {
		1 : [' attack', '01放置達人(武傷)', '02強化刀刃(全傷)', '03弱點攻擊(暴傷)', '04點擊達人(點傷)', '05急速成長(寵傷)'],
		2 : ['   gold', '01金幣掠奪(普通)', '02金幣掠奪(BOSS)'],
		3 : [' killer', '01怪物殺手(普通)', '02怪物殺手(BOSS)'],
		4 : [' ----  '],  // 
		5 : [' ----  ']
	}

	var tagSwitch = {
		1 : [' attack', 0, 1, 1, 1, 1],
		2 : ['   gold', 1, 1],
		3 : [' killer', 1, 1],
		4 : [' ----  '],  // 
		5 : [' ----  ']
	}

	rbm.keepScreenshotPartial( 300,  390, 420, 610);  //
	for (var j = 1; j <= 5; j++) {
		var lengthI = Object.keys(tagName[j]).length - 1;
		for (var i = 1; i <= lengthI; i++) {
			if (lengthI == 0) {break;}

			console.log('Check Aband ' + chkItemName + ':', tagName[j][i]);
			var filename = 'BackSkill_0' + j + '_0' + i + '.png';
			var Img1 = rbm.findImage(filename, 0.95);
			rbm.log(chkItemName +'Img1:', Img1);
			
			if (Img1 != undefined && Img1.score >= 0.95) {
				console.log('Found Aband ' + chkItemName);
				rbm.releaseScreenshot();

				if (tagSwitch[j][i] == 0){
					console.log('This ' + chkItemName + ' Not to Aband');
					return false;
				}
				return true;
				
			} else {
				console.log('Not Match Aband ' + chkItemName);
			}

			console.log('----------------------');
		}
	}
	rbm.releaseScreenshot();
	sleep(100);

	console.log('Not Found Aband ' + chkItemName + ' !!');
	return false;

}

function chkPetLv(lv, cycle) {
	if (!config.isRunning) return false;
	if (cycle == undefined) cycle = 3;

	var newbbX = ['', 348, 348, 348, 348];
	var newbbY = ['', 520, 526, 534, 539];
	var chkLvC = {
		1 : ['', 'F3FFE9', 'F4FFEC', 'F8FFF2', 'F9FFF5'],
		2 : ['', 'F1FFE6', '475241', '969D91', 'FAFFF5'],
		3 : ['', 'F3FFE9', '92A087', '384526', 'F9FFF5'],
	}

	for (var j = 1; j <= cycle; j++) {
		var img = getScreenshotModify(348, 0, 1, 540, 1, 540, 100);
		for (var i = 1; i <= 4; i++) {
			if (!config.isRunning) return false;

			var getColor = getpointHex(img, 0, newbbY[i]);
			var colorOK = isSameColorHex(getColor, chkLvC[j][i], 45);
			// rbm.log('chk Pet Lv', lv, ', j:', j, ', i:', i, 'getColor:', getColor, ', chkLvC[lv][i]:', chkLvC[lv][i], ', colorOK:', colorOK);
			if (!colorOK) {break;}

			if (i == 4){
				releaseImage(img);
				console.log('Get LV', j, ' Pet!')

				if (j >= lv) {
					console.log('GetLV >= SetLv :', j, '>=', lv, ' Pet!');
					return true;
				} else {
					console.log('GetLV < SetLv :', j, '<', lv, ' Pet!');
					return false;
				}
			}
		}
		sleep(100);
		if (j == cycle){
			releaseImage(img);
			console.log('Not Found LV', lv, ' Pet!');
			return true;
		}
	}
}

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

function waittime(str, t1){
	if (!config.isRunning) return false;

	for (i = 1; i <= t1; i++){
		sleep(1000);
		console.log(str + ', wait time:', i);
	}
}
// ===========================================================

function main(){       //主流程
	if (!config.isRunning) return false;

	if (useReturn(1)) {
		console.log('Main Page : True');
		
		var modver = modVerst;
		if (modver == 1){
			CheckImageTap(380, 630, 400, 650, 0.96, 'Skill_01.png', 390, 670, 2, 100, 0, 0); //1st Skill Tap
			CheckImageTap(630, 630, 710, 650, 0.96, 'Skill_04.png', 640, 670, 2, 100, 0, 0); //4st Skill Tap
			herolvup3();

			// var reGateLv = 3500;

		}else if (modver == 0 || modver == 2){
			heroLvUp(420);
			tapMonster();
			heroNewGrow();

			var tapmod = 3;
			var hero20 = CheckImageTap(20, 150, 100, 240, 0.98, 'hero_icon_20.png', 0, 0, 1, 100, 2, 1); //
			if (hero20){tapmod = 4;}

			if (tapmod == 1){
				tapFor(250, 270, 2, 20, 30, 30);
				tapFor(250, 480, 5, 20, 30, 30);
				tapFor(100, 480, 1, 20, 30, 30);
				tapFor(1240, 550, 2, 20, 30, 30);
			} else if (tapmod == 2){
				tapFor(250, 270, 5, 20, 30, 30);
				tapFor(100, 270, 1, 20, 30, 30);
				tapFor(1240, 550, 2, 20, 30, 30);
			} else if (tapmod == 3){
				tapFor(250, 480, 5, 20, 30, 30);
				tapFor(100, 480, 2, 20, 30, 30);
				tapFor(250, 690, 5, 20, 30, 30);
				tapFor(100, 690, 1, 20, 30, 30);
				tapFor(1240, 550, 2, 20, 30, 30);
			} else if (tapmod == 4){
				tapFor(250, 270, 5, 20, 30, 30);
				tapFor(100, 270, 2, 20, 30, 30);
				tapFor(250, 480, 5, 20, 30, 30);
				tapFor(100, 480, 1, 20, 30, 30);
				tapFor(1240, 550, 2, 20, 30, 30);
			}

			
			// var reGateLv = 2850;
		}

		if (recoNum(1) >= reGateLv){

			tapFor(160, 60, 3, 20, 100, 800);

			DIY_swipe(150, 170, 150, 900, 15, 200);
			DIY_swipe(150, 170, 150, 900, 15, 200);
			DIY_swipe(150, 170, 150, 900, 15, 1000);

			tapFor(160, 60, 2, 20, 30, 800);
			tapFor(250, 230, 1, 20, 30, 800);

			if (re_AD_10p == 1) {
				for (var i = 1; i <= 3; i++){
					var reAD10p = CheckImageTap(450, 530, 640, 600, 0.95, 'reAD+10p.png', 0, 0, 1, 100, 2, 1); //
					if (reAD10p){
						tapFor(480, 560, 2, 20, 30, 2000);
						waittime('AD', 45);
						suddenAD(1);
						sleep(2000);
					}else{
						tapFor(740, 570, 2, 20, 30, 2000);
						reKey();				
					}
				}

			}else{
				tapFor(740, 570, 2, 20, 30, 2000);
				reKey();					
			}
		}

		tapFor(60, 60, 2, 20, 30, 30);
		masterSkillUp(300);
		fight1000Boss();

		ADback = 0;

	}else{
		ADback = ADback + 1;
		console.log('Main Page : False', ', ADback:', ADback);

		var s2 = 20
		if (ADback == 1){
			CheckImageTap(450, 390, 620, 470, 0.96, 'AD_to_fight_01.png', 0, 0, 2, 100, 1, 1);      //看廣告戰鬥:NO
			sleep(s2);
			CheckImageTap(810, 50, 960, 190, 0.96, 'XX.png', 0, 0, 2, 100, 1, 1);                  //右上 叉叉 Tap
			sleep(s2);
			CheckImageTap(410, 250, 680, 320, 0.96, 'SkillReset_01.png', 830, 300, 2, 100, 0, 1);   //技能冷卻按 X
			sleep(s2);

		}else if (ADback == 2){
			getADgift();
			sleep(s2);
			CheckImageTap(450, 280, 680, 380, 0.96, 'getHeroCoin_01.png', 840, 210, 2, 100, 0, 1);  //英雄離線金幣 X
			sleep(s2);
			CheckImageTap(540, 400, 740, 480, 0.96, 'AD_gift_00.png', 0, 0, 2, 100, 1, 1);  //
			sleep(s2);

		}

		if (ADback >= 3){suddenAD(1);	ADback = 0;}
		sysErrorRestart()
	}

}

// ===========================================================

function setFirstsetting() {

	re_gate_3 = 3; //轉生關卡-仟位
	re_gate_2 = 5; //轉生關卡-佰位
	re_gate_1 = 0; //轉生關卡-十位
	re_gate_0 = 0; //轉生關卡-個位

	re_AD_10p = 1; //轉生_廣告_拿10趴

	modVerst = 1;  //Mod_版本_0:原版_1:無限升_2:金上限
	
}

function setFirstTimer() {   //預設值設定
	
	mstSkillupTimer  = Date.now() +   60 * 1000;
	heroLvUpTimer    = Date.now() +   20 * 1000;

	checkScreenTimer = Date.now();
	// rbm.screencrop('stagecheck1.png', 338, 22, 390, 82);
	rbm.screencrop('checkSCstop.png', 540, 250, 840, 550);

	ADback = 0;
	hero20_4000 = 0;
	skillFull = 0;

	reGateLv =  re_gate_3 * 1000 + re_gate_2 * 100 + re_gate_1 * 10 + re_gate_0 * 1 ;
	console.log('reGateLv:', reGateLv);
}


function test(cycle, DT){
	rbm.init();
	config.isRunning = true;               //腳本測試用function
	for(var n = 0; n <= cycle; n++) {
		if (!config.isRunning) return false;
		
		if (n == 0) { 
			setFirstsetting();   //設定初值設定值
			setFirstTimer();     //設定初始時間值
			
			ScreenErrorTime1 = Date.now()
		} else if (n >= 1) {
			console.log('n = ', n, '/', cycle, ', CRA 腳本開始');
			// lv1000Boss2();
			// main();

			// btheroer();

			// ADgift5sec();
			ADgift30sec(2);
			// herolvup3();
			// reKey();
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
	console.log('syousin50 腳本開始');	
	while(config.isRunning) { main(); }
} 

// gg script path = '/storage/emulated/0/Robotmon/scripts/com.donny.bladecrafter2/ggscript/com.studiodrill.bladecrafter2.lua'
// ./bin/adb -s emulator-5558 shell ps | grep app_
// ./bin/adb shell kill -9 2552
// ./bin/adb shell
// ps | grep app_