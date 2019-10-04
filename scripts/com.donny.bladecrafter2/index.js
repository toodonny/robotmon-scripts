importJS('RBM-0.0.3');

// ============================idlerpg=============================== //

var config = {
  appName: 'com.donny.bladecrafter2',   //最強名劍 2
  oriScreenWidth: 720, // source
  oriScreenHeight: 1280,
  oriVirtualButtonHeight: 0,
  oriResizeFactor: 1, 
  eventDelay: 50,
  imageThreshold: 1,
  imageQuality: 100,
  resizeFactor: 1, // small -> quickly
  scriptDir: 'scripts/com.donny.bladecrafter2/images',
  isRunning: false,
  PackangName: 'com.studiodrill.bladecrafter2',
  LaunchActivityName: 'com.studiodrill.bladecrafter2.MainActivity',
  TiPackangName: 'com.keramidas.TitaniumBackup',
  TiLaunchActivityName: 'com.keramidas.TitaniumBackup.MainActivity',
};


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
			var img = getScreenshotModify(0, 48, 300, 1, 300, 1, 100);
			for (var j = 1; j <= 3; j++) {
				var getColor = getpointHex(img, calnX[j], 0);
				var isSame = isSameColorHex(getColor, calnColor[j], 30);
				// console.log('get:', getColor, ', OK:', calnColor[j]);
				if (!isSame) {releaseImage(img); return false;}
			} releaseImage(img); return true;

		case  2: return chknewbubble( 53, 150);   //檢查是否有new紅泡泡(minigame)
		case  3: return chknewbubble(620, 800);   //new泡泡有沒有，裝備
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

function recoNum(choiceF) {        //各項數字辨識
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

						for (var j = 0; j <= 30; j++){
							if (useReturn(1)) {return false;}
							keycode('BACK', 200); sleep(400);
							sleep(500);
						}
						stoptime1 = 0;
					}

					var OKbtn = checkPointcolor(300, 830, 5, '59678A'); //確認鈕
					if (OKbtn) {
						b = b + 1;
						if (b >= 3) {
							for (var j = 0; j <= 10; j++){
								if (useReturn(1)) {return false;}
								keycode('BACK', 200); sleep(400);
								sleep(500);
							}
						}
					} else { b = 0;}


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
function menutap(pg) {
	if (!config.isRunning) return false;
	if (pg < 0 && pg > 6) {console.log('Page Error!!'); return false;}
	console.log('1 Menu - Page', pg);

	tapFor(680, 680, 4, 30, 200, 200);   //點右邊向下三角型

	var pgX = 50 + 123 * (pg - 1);
	tapFor(pgX, 1260, 1, 50, 100, 500);  //點選單-pg
}

function menutap2(pg) {
	if (!config.isRunning) return false;
	if (pg < 0 || pg > 6) {console.log('Page Error!!'); return false;}
	console.log('2 Menu - Page', pg);

	//100,1270  dW = 120,  now:594E41   not:968169
	var newbbX = [680,  100,  220,  340,  460,  580,  700];
	var newbbY = [680, 1270, 1270, 1270, 1270, 1270, 1270];
	var nowbbC = ['FFFFFF', '594E41', '594E41', '594E41', '594E41', '594E41', '594E41'];
	var notbbC = ['FFFFFF', '968169', '968169', '968169', '968169', '968169', '968169'];

	var img = getScreenshotModify(0, newbbY[pg], 710, 1, 710, 1, 100);
	var getColor = getpointHex(img, newbbX[pg], 0);
	var colorNow = isSameColorHex(getColor, nowbbC[pg], 20);
	var colorNot = isSameColorHex(getColor, notbbC[pg], 20);
	releaseImage(img);

	if ( pg == 0 && !colorNow) {return false;}
	else if (colorNow && !colorNot) {return false;}
	// rbm.log('mgNewBubble, i:', i, 'getColor:', getColor, ', newbbC[i]:', newbbC[i], ', colorOK:', colorOK);
	tapFor(680, 60, 1, 30, 100, 200);
	tapFor(newbbX[pg], newbbY[pg], 1, 30, 100, 500);//pg:0:點右邊向下三角型, 點選單-pg 
}

function chknewbubble(intX, intY) {
	if (!config.isRunning) return false;

	var newbbX = ['', intX, intX + 5, intX + 5 + 17];
	var newbbY = ['', intY, intY, intY];
	var newbbC = ['', 'FF6540', 'FFFFFF', 'FF6540'];

	var img = getScreenshotModify(0, intY, 720, 1, 720, 1, 100);
	for (var i = 1; i <= 3; i++) {
		var getColor = getpointHex(img, newbbX[i], 0);
		var colorOK = isSameColorHex(getColor, newbbC[i], 20);
		// rbm.log('mgNewBubble, i:', i, 'getColor:', getColor, ', newbbC[i]:', newbbC[i], ', colorOK:', colorOK);
		if (!colorOK) {return false;}
	}
	releaseImage(img);
	return true;


}

function farmermedia(dncycle, Gt, mtap, uptap) {
	if (!config.isRunning) return false;
	if (debugFc) return false;
	if (!useReturn(1)) return debugFc = true;
	console.log('Farmer Media');

	var gametimes = Gt * 1000;
	var cycles = Math.round(gametimes / (40*(10+40) + 100 + 160 + 200));
	console.log('循環', cycles, '次，連點', Gt, 'sec');
	
	menutap2(1);

	for (var i = 0; i < dncycle; i++){
		var pointColor = getPointcolorHex(550, 50);
		var chkColor = isSameColorHex(pointColor, 'EE6C34', 20);
		if (chkColor){tapFor(555, 50, 1, 50, 80, 80);}

		var pointColor = getPointcolorHex(30, 910);
		var chkColor = isSameColorHex(pointColor, '2CB6BE', 20);
		if (chkColor){break;}

		DIY_Fstswipe(360, 800, 360, 1150, allswspd, allswwait);  //向下滑
	}

	tapandlvup(Gt, cycles, mtap, uptap);
}

function tapandlvup(Gt, cy, mtap, uptap) {
	if (!config.isRunning) return false;
	if (debugFc) return false;
	if (!useReturn(1)) return debugFc = true;
	console.log('Tap and LvUp');

	var t1 = Date.now()
	var aa = 0;
	for (var i = 0; i < cy; i++) {
		if (!config.isRunning) return false;

		if (i % 3 == 0) {
			for (var j = 0; j <= 4; j++) {
				if (!config.isRunning) return false;
				// console.log('tap loop i/j;', i, j);
				
				if (!useReturn(1)) {
					aa = aa + 1;
					if (aa >= 3) {return false;}
				} else { aa = 0; break;}
				sleep(450);
			}
			var dt = Math.round((Date.now() - t1) / 1000);
			// console.log('循環:', i, '次，連點時間:', dt, '/', Gt, 'sec');
			console.log('循環:', i, ',時間:', dt, '/', Gt, 's');
		}

		// tapFor(360, 530, 50, 10, 40, 100); //點中間打怪(點寶箱)
		tapFor(680, 220, mtap, 10, 30, 50); //點中間打怪(不點寶箱)
		tapFor(600, 950, uptap, 30, 40, 200);   //點人物升級
	}

}

function weaponlvup(){
	if (!config.isRunning) return false;
	if (debugFc) return false;
	if (!useReturn(1)) return debugFc = true;
	console.log('Weapon Lvup');

	




}

function rebirth(upcycle, wT) {
	if (!config.isRunning) return false;
	if (debugFc) return false;
	if (!useReturn(1)) return debugFc = true;
	console.log('Rebirth');

	menutap2(0);
	menutap2(1);

	for (var i = 0; i < upcycle; i++){
		var dpY = 0;
		if (i % 2 == 0) { dpY = 10 }
		DIY_Fstswipe(360, 1150 - dpY, 360, 800, allswspd, allswwait);  //向上滑4欠
	}

	sleep(1500);
	tapFor(600, 1160, 1, 50, 200, 600);
	tapFor(240, 880, 3, 50, 200, 500); //點轉生，等5000ms
	tapFor(600, 1160, 1, 50, 200, 600);
	tapFor(240, 880, 3, 50, 200, 500); //點轉生，等5000ms

	for (var j = 0; j < wT; j++){
		console.log('轉生後等待:', j, ' sec');
		sleep(1000);
	}

	tapeggeq(eqeggTaptime);
	taptreasures(treaTaptime, treaNew, treaStone);
}

function tapeggeq(Timer) {
	if (!config.isRunning || Timer == 0) return false;
	if (debugFc) return false;
	if (!useReturn(1)) return debugFc = true;
	if (Date.now() < tapeggeqTimer) {
		var waittime = Math.round((tapeggeqTimer - Date.now())/1000);
		console.log('Tap Egg and Eq:', waittime, ' sec');
		return false;
	}

	console.log('Tap Egg and E');

	menutap2(3);
	tapFor(600, 830, 5, 50, 300, 1000);
	
	menutap2(4);
	tapFor(600, 830, 5, 50, 300, 1000);

	tapeggeqTimer =  Date.now() + Timer * 1000;
}

function taptreasures(Timer, newo, slate) {    //newo:開新寶物，slate:太古石板
	if (!config.isRunning && Timer == 0) return false;
	if (!newo && !slate) return false;
	if (debugFc) return false;
	if (!useReturn(1)) return debugFc = true;
	if (Date.now() < taptreasuresTimer) {
		var waittime = Math.round((taptreasuresTimer - Date.now())/1000);
		console.log('Tap Treasures New and Slate:', waittime, ' sec');
		return false;
	}

	console.log('Tap Treasures New and Slate');

	menutap2(5);
	if (newo) {tapFor(600, 810, 3, 50, 300, 1500);}
	if (slate) {tapFor(600, 940, 4, 50, 200, 500);}
	
	tapFor(360, 40, 3, 50, 150, 300);

	taptreasuresTimer =  Date.now() + Timer * 1000;
}

function mgnewbubble() {
	if (!config.isRunning) return false;
	if (!mini1play && !mini2play && !mini3play) return false;

	if(!useReturn(2)) {return false;} //檢查是否有new紅泡泡(minigame)
	console.log('Have MiniGame to Play !!');

	tapFor( 50, 150, 2, 50, 100, 500);  //點小遊戲
	if (mini1play) {tapFor(410, 460, 2, 50, 100, 200);}  //點 mini 1
	if (mini2play) {tapFor(130, 460, 2, 50, 100, 200);}  //點 mini 2
	if (mini3play) {tapFor(130, 715, 2, 50, 100, 200);}  //點 mini 3

	for (var j = 1; j <= 10; j++) {
		if (!config.isRunning) return false;

		console.log('Mini Wait, j:', j);
		var pointColor = getPointcolorHex(360, 760);
		var chkColor = isSameColorHex(pointColor, 'E7AC30', 20);
		if (chkColor){tapFor(365, 765, 2, 50, 100, 500); break;}  //點開始mini game / 關閉

		sleep(1000);
	}
}

function bsnewbubble() {    //自動打boss (小遊戲系列)
	if (!config.isRunning) return false;
	if (!mini1play && !mini2play && !mini3play) return false;
	if (week != 4) {return false;}

	if(!useReturn(6)) {return false;} //檢查是否有new紅泡泡(world boss)
	console.log('Have World Boss to Fight !!');

	tapFor(  50,  315, 2, 50, 80, 500);  //點world boss
	tapFor( 400, 1040, 2, 50, 80, 200);  //輸入(開打鈕)
	tapFor(  50,  315, 2, 50, 80, 200);  //點world boss
	tapFor( 400, 1040, 2, 50, 80, 200);  //輸入(開打鈕)
	tapFor(  50,  315, 2, 50, 80, 200);  //點world boss
	tapFor( 400, 1040, 2, 50, 80, 200);  //輸入(開打鈕)

	for (var j = 1; j <= 10; j++) {
		if (!config.isRunning) return false;

		console.log('Mini Wait, j:', j);
		var pointColor = getPointcolorHex(360, 760);
		var chkColor = isSameColorHex(pointColor, 'E7AC30', 20);
		if (chkColor){tapFor(365, 765, 2, 50, 100, 300); break;}  //點開始mini game / 關閉

		sleep(1000);
	}


}

function playMiniGame() {
	if (!config.isRunning) return false;

	var chkGame123 = minigameclock();
	if (chkGame123 > 0) {
		// debugTimer = Date.now();
		debugFc = true;
		switch(chkGame123) {
			case 1: mini1samepork(60, mini1DtapT, mini1Taps); return;     //mini game 1
			case 2: mini2weponking(35, mini2taps, mini2tpwt, mini2wt); return;     //mini game 2
			case 3: mini3kickmonster(32, mini3slt1, mini3slt2, mini3slt3, mini3slt4); return;     //mini game 3
		}
	}
}

function minigameclock() {
	if (!config.isRunning) return false;

	rbm.keepScreenshotPartial( 45,  150, 125, 230);  //小遊戲3，時鐘圖示
	var Img1 = rbm.findImage('mini3clock.png', 0.70);
	rbm.releaseScreenshot();
	sleep(100);

	if (Img1 != undefined) { rbm.log('Img1:',Img1); }
	if (Img1 == undefined) {
		console.log('沒時鐘，跳出minigame檢查');
		sleep(1000); 
		return false;

	} else if(Img1 != undefined) {
		var mini123Color = [0, '000000', 'FFFFFF', '5D4C41'];
		var pointColor = getPointcolorHex(90, 340);
		for (var i = 1; i <= 3; i++) {
			var chkColor = isSameColorHex(pointColor, mini123Color[i], 20);
			// console.log('chkColor:', pointColor, mini123Color[i], chkColor, i)
			if (chkColor) {sleep(100); return i;}
		}
	}
}

function mini1samepork(Gt, DtapT, Otaps) {
	if (!config.isRunning) return false;
	// if (minigameclock() != 1) return false;
	console.log('Mini Game 1 Same Pork');

	var startTime = Date.now();
	// var gametimes = Gt * 1000;
	// var cycles = Math.round(gametimes/200 + 2);
	cycles = 2;
	// console.log(gametimes, cycles);

	var chk1or2 = 1;
	for (var k = 0; k < cycles; k++) {

		//X:50 Y:350 X:125 Y:455 W:75 H:105 dX:108 dY:139

		var cardState = {  //  未開:0   已存:1  配對:3 
			0:[0, 0, 0, 0, 0, 0],
			1:[0, 0, 0, 0, 0, 0],
			2:[0, 0, 0, 0, 0, 0],
			3:[0, 0, 0, 0, 0, 0],
			4:[0, 0, 0, 0, 0, 0],
		}; 

		for (var j = 0; j < 5; j++) {
			for (var i = 0; i < 6; i++) {
				if (!config.isRunning) return false;

				var chkTime = Date.now() - startTime - Gt * 1000;
				console.log('chkTime:', chkTime);
				if (chkTime > 1000){
					console.log('Set Time Out!!');
					return false;
				}

				console.log('Pork-i:', i, ', j:', j, ', cardState[j][i]', cardState[j][i]);

				var pointX = 50 + i * 108;
				var pointY = 350 + j * 139;

				var pointColor = getPointcolorHex(pointX, pointY);
				var chkColor = isSameColorHex(pointColor, 'FFFFFF', 20);

				if (chkColor){cardState[j][i] = 3;}
				else if (cardState[j][i] == 0 && !chkColor) {
					sleep(DtapT);
					tapFor(pointX - 2, pointY - 2, Otaps, 40, 80, 50);  //點擊開牌

					if (chk1or2 == 1) {
						console.log('The 1st Pork!!');

						Tag_BK2:
						for (var l = 1; l <= 15; l++) {
							if (!config.isRunning) return false;
							// console.log('Wait FFFFFF Check Pork-l:', l);

							var pointColor = getPointcolorHex(pointX, pointY);
							var chkColor = isSameColorHex(pointColor, 'FFFFFF', 20);
							if (chkColor) {
								rbm.keepScreenshotPartial( pointX, pointY, pointX + 75, pointY + 105);  //

								for (var n = 0; n < 5; n++) {
									for (var m = 0; m < 6; m++) {
										if (!config.isRunning) return false;
										// console.log('Pork-m:', m, ', n:', n, ', cardState[n][m]', cardState[n][m]);
										
										if (cardState[n][m] == 1) {
											// console.log('Start Check Same Pork..... :?');

											var FileName = '/mini1TmpPic/mini1_pork_' + (n + 1) + '_' + (m + 1) + '.png';
											var Img1 = rbm.findImage(FileName, 0.955);

											if (Img1 != undefined) { rbm.log('Img1:',Img1); }

											if (Img1 != undefined) {
												console.log('Find Same Pork!! :)');

												var finditX = 50 + m * 108;
												var finditY = 350 + n * 139;
												tapFor(finditX, finditY, 2, 50, 80, 600);

												cardState[n][m] = 3;
												cardState[j][i] = 3;
												
												rbm.releaseScreenshot();
												break Tag_BK2;
											}
										} else if (cardState[n][m] == 0) {
											console.log('Not Find Same Pork!! :<');
											rbm.releaseScreenshot();

											var cropFileName = '/mini1TmpPic/mini1_pork_' + (j + 1) + '_' + (i + 1) + '.png';
											rbm.screencrop(cropFileName, pointX, pointY, pointX + 75, pointY + 105);

											cardState[j][i] = 1;
											chk1or2 = 2;
											break Tag_BK2;
										}
									}
								}
								rbm.releaseScreenshot();
							} 
							
							sleep(50);
						}
					} else if (chk1or2 == 2) {
						console.log('The 2nd Pork!!');

						for (var o = 1; o <= 15; o++) {
							if (!config.isRunning) return false;
							// console.log('Wait FFFFFF Check Pork-o:', o);

							var pointColor = getPointcolorHex(pointX, pointY);
							var chkColor = isSameColorHex(pointColor, 'FFFFFF', 20);
							if (chkColor) { 

								console.log('Save Flop Pork.....');
								var cropFileName = '/mini1TmpPic/mini1_pork_' + (j + 1) + '_' + (i + 1) + '.png';
								rbm.screencrop(cropFileName, pointX, pointY, pointX + 75, pointY + 105);
								cardState[j][i] = 1;

								rbm.keepScreenshotPartial( pointX, pointY, pointX + 75, pointY + 105);  //

								Tag_BK3:
								for (var n = 0; n < 5; n++) {
									for (var m = 0; m < 6; m++) {								

										if (cardState[n][m] == 0 || (n == j && m == i)) {
											rbm.releaseScreenshot();
											break Tag_BK3;
										} else if (cardState[n][m] == 1) {
											var FileName = '/mini1TmpPic/mini1_pork_' + (n + 1) + '_' + (m + 1) + '.png';
											var Img2 = rbm.findImage(FileName, 0.955);

											if (Img2 != undefined) { rbm.log('Img2:',Img2); }

											if (Img2 != undefined) {
												console.log('Find Same Pork!! :)');

												var finditX = 50 + m * 108;
												var finditY = 350 + n * 139;

												tapFor(pointX, pointY, 2, 50, 80, 120);
												tapFor(finditX, finditY, 2, 50, 80, 120);
												tapFor(pointX, pointY, 1, 50, 80, 120);
												tapFor(finditX, finditY, 1, 50, 80, 120);

												cardState[n][m] = 3;
												cardState[j][i] = 3;
												
												rbm.releaseScreenshot();
												break Tag_BK3;
											}
										}
									}
								}

								rbm.releaseScreenshot();
								
								chk1or2 = 1;

								break;
							}
							sleep(50)
						}
					}

					// if (j == 4 && i == 5) {
					// 	console.log('Obj cardState:')
					// 	for (var z = 0; z < 5; z++) {
					// 		rbm.log('   cardState[' + z + ']', cardState[z]);
					// 	}
					// }
				}

			}
			if (minigameclock() != 1) return false;
		}

		sleep(100);
	}
	
	// debugTimer = Date.now();
	debugFc = true;
	console.log('Mini Game 1 Over');
}

function mini2weponking(Gt, taps, tapwt, cywt) {
	if (!config.isRunning) return false;
	// if (minigameclock() != 2) return false;
	console.log('Mini Game 2 Wepon King');

	var gametimes = Gt * 1000;
	var cycles = Math.round(gametimes / (taps*(60+tapwt+10) + cywt) + 3);
	// cycles = 1;
	// console.log(gametimes, cycles);
	for (var k = 0; k <= cycles; k++) {
		if (!config.isRunning) return false;

		console.log('mini game 2:', k, ' times');

		var gpointR = [];
		var img = getScreenshotModify(0, 621, 300, 1, 300, 1, 100);
		for (var j = 1; j <= taps; j++) {
			gpoint[j] = getImageColor(img, mnstX[j], 0);
			gpointR[j] = gpoint[j].r;
		}
		releaseImage(img);
		rbm.log('gpointR:', gpointR);

		for (var i = 1; i <= taps; i++) {
			// console.log('tap LR i:', i);

			var tapL = false; var tapR = false; var tapX = 540;
			if(gpointR[i] > '240' && gpointR[i] < '260') {tapL = true; tapX = 180;}
			if(gpointR[i] > '100' && gpointR[i] < '105') {tapR = true;}
			// console.log('tapL:', tapL, 'tapR:', tapR);
			
			if(i == 1 && !tapL && !tapR) {sleep(20); break;}

			// console.log('i:', i, ', tapX:', tapX);
			tap(tapX, 1100, 30);
			// if(tapL) {tap(180, 1100, 30);}
			// else if(tapR) {tap(540, 1100, 30);}
			// else {console.log('Error no tap', i);}
			sleep(tapwt);
			if (i == taps) {sleep(cywt);}
		}

		if (k % 15 == 0 && minigameclock() != 2) {break;}
	}
	
	// debugTimer = Date.now();
	debugFc = true;
	console.log('Mini Game 2 Over');
}

function mini3kickmonster(Gt, slt1, slt2, slt3, slt4) {
	if (!config.isRunning) return false;
	// if (minigameclock() != 3) return false;
	console.log('Mini Game 3 Kick Monsters');
	
	var gametimes = Gt * 1000;
	var cycles = Math.round(gametimes / 110 + 3);
	// console.log(gametimes, cycles);
	for (var i = 0; i <= cycles; i++) {
		if (!config.isRunning) return false;

		var sltime = 20;
		if (i < cycles / 4) { sltime = slt1; }
		else if (i < cycles / 4 * 2) { sltime = slt2; }
		else if (i < cycles / 4 * 3) { sltime = slt3; }
		else if (i > cycles / 4 * 3) { sltime = slt4; }

		// console.log('mini game 3:', i, ' times');

		if (i % 20 == 0 && minigameclock() != 3) {break;}

		rbm.keepScreenshotPartial( 50, 380, 650, 900);  //找怪物頭的範圍
		var Img0s = rbm.findImages('mini3monsticon.png', 0.95, 9, true, false);
		rbm.releaseScreenshot();
		if (Img0s != '')  {
			for (var index in Img0s) {
				if (!config.isRunning) return false;
				var result = Img0s[index];

				// rbm.log('result:', index, result);

				var rowmp1y = ['', 440, 630, 810];
				var checky = 20;

				var rowtpy = ['', 515, 700, 885];
				var rowbty = ['', 555, 740, 925];
				
				var tapmst = true;
				if (result.y > rowmp1y[3] && result.y < rowmp1y[3] + checky) {
				} else if (result.y > rowmp1y[2] && result.y < rowmp1y[2] + checky) {
				} else if (result.y > rowmp1y[1] && result.y < rowmp1y[1] + checky) {
				} else { tapmst = false;}

				if (tapmst) {
					tap(result.x, result.y, 20);
					// tapFor(result.x, result.y, 1, 20, 20, 10);
				}
			}
		}
		sleep(sltime);
	}
	
	// debugTimer = 0;
	debugFc = true;
	console.log('Mini Game 3 Over');
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
function TireductGame(Tilst, sec, item, itemLv, cycle){ //3:刷裝  4:刷寵  5:刷寶  7:簽到獎勵
	if (!config.isRunning) return false;
	if (Features < 3 || Features > 7 ) return false;
	if (Features == 6) return false;

	// var itemName = ['', '', '', 'Gear', 'Pet', 'Treasures', '', 'DailyReward'];

	// if (!chkGetItem(item, itemLv, cycle)) {
		Tireduction(Tilst);
		chkGameOK(sec);

		menutap2(item);
		openNewItem(item, 50);

	if (chkGetItem(item, itemLv, cycle)) {    //  } else {
		sleep(200);
		ScreenShottoPath('bladecrafter2_' + itemName[item]);

		switch(item) {
			case 3 : 
				// if (abandonGear(abGrSw)) {tapFor(300, 830, 3, 50, 300, 500);} 
				// else {config.isRunning = false;}
				if (!abandonGear(abGrSw)) {
					ScreenShottoPath('bladecrafter2_' + itemName[item]);
					config.isRunning = false;
				}
				break;

			case 4 : 
				ScreenShottoPath('bladecrafter2_' + itemName[item]);
				Tibackup(Tilst);
				chkGameOK(sec);
				break;

			case 5 : 
				ScreenShottoPath('bladecrafter2_' + itemName[item]);
				config.isRunning = false; break;

			case 6 : 
				ScreenShottoPath('bladecrafter2_' + itemName[item]);
				config.isRunning = false; break;
				
			case 7 : 
				if (chkDalyGearLv(item7Lv, item7Pc)) {
					ScreenShottoPath('bladecrafter2_' + itemName[item]);
					config.isRunning = false;
				}
				break;
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
	tapFor(140, 730, 1, 50, 50, 3000);  //點選-資料
	
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
	tapFor(510, 760, 1, 50, 50, 10000);  //點選-資料  X:510;Y:760;程式開啟確認備份
	
	// console.log('Start Game.....')
	rbm.startApp(config.PackangName,config.LaunchActivityName); sleep(5000);
}

// =========TiBackup Function===================================
function openNewItem(item, st) {
	if (!config.isRunning) return false;

	var tapX = ['', '', '', 600, 600, 600, '',  175];      //3:裝備 /4:寵物 /5:寶物 /7:簽到獎勵
	var tapY = ['', '', '', 830, 830, 830, '',   30];      //檢查是否有new紅泡泡(開寶箱)

	var pntX = ['', '', '', 360, 360, 360, '',  160];      //3:裝備 /4:寵物 /5:寶物 /7:簽到獎勵
	var pntY = ['', '', '', 450, 450, 450, '',  375];      //檢查是否有蓋備出現

	var dlyS = ['', '', '', 700, 700, 700, '', 2000];      //翻牌開物品等待

	for (var i = 0; i <= st; i++){
		if (!config.isRunning) return false;
		console.log('openNewItm i:', i);

		if (useReturn(item)){                                 //檢查是否有new紅泡泡(開寶箱)
			tapFor(tapX[item], tapY[item], 1, 50, 100, 500);
		}

		if (item == 7) {
			var pointColor = getPointcolorHex(360, 820);                //刷每日獎勵，領取鈕
			var chkColor = isSameColorHex(pointColor, 'E7AB31', 20);
			if (chkColor) {tapFor(360, 830, 1, 50, 100, 500);}
		}
		
		var pointColor = getPointcolorHex(pntX[item], pntY[item]);      //寶物蓋牌出現確認
		var chkColor = isSameColorHex(pointColor, 'A57B39', 20);
		if (chkColor) {tapFor(360, 830, 1, 50, 100, dlyS[item]); break;}
		
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
			sleep(500);
			break;
		}
		sleep(1000);
	}
}

function chkGetItem(item, itemLv, cycle) {  //secF: item=4 ==> petLv
	if (!config.isRunning) return false;

	// var itemName = ['', '', '', 'Gear', 'Pet', 'Treasures', ];

	var pointX = ['', '', '', 314, 354, 315, '', 0];
	var pointY = ['', '', '', 538, 444, 403, '', 0];
	var pointC = ['', '', '', 'D110FA', 'A49F67', '90453A', '', 'FFFFFF'];  //4=>全傷:波烏靈:A7BCCF， 點傷:泰伊:DA8B52，武傷:羅拓:A49F67 //5=>紅裝:90453A
	var pointD = ['', '', '', 20, 20, 40];

	if (!refreshSw) {return true;}

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
		1 : ['gloves', '01騎士手套(武傷L)', '02戰士手套(點傷L)', '03妖精手套(全傷L)', '04獵人手套(暴傷L)'],
		2 : ['helmet', '01矮人頭盔()', '02職職者帽子(神劍L)', '03傭兵頭盔(英劍L)'],
		3 : ['armor', '01Equ080(寵傷L)', '02刀刃盔甲(必殺傷L)', '02召喚師盔甲(古代傷L)', '04野獸盔甲(古代傷H)', '06破壞盔甲(破壞傷L)', '07定罪盔甲(必殺傷H)', '08破滅盔甲(破壞傷H)'],   //'05獸王盔甲(寵傷H)',  
		4 : ['ring', '01水晶戒指(全金L)','02哥布林戒指(蛋金L)', '04紅寶石戒指(BOSS金L)', '05哥布林王戒指(蛋金H)'],  // '02紅鑽石戒指(全金H)', 
		5 : ['earring', '01祖母綠耳環(手套L)', '02魔法師耳環(頭盔L)', '02藍寶石耳環(盔甲L)']
	}

	rbm.keepScreenshotPartial( 300,  390, 420, 510);  //
	for (var j = 1; j <= 5; j++) {
		var lengthI = Object.keys(abandobj[j]).length - 1;
		for (var i = 1; i <= lengthI; i++) {

			console.log('Check Aband Gear:', abandobj[j][i]);
			var filename = 'gear_0' + j + '_0' + i + '.png';
			var Img1 = rbm.findImage(filename, 0.95);
			
			rbm.log('Img1:', Img1);
			
			if (Img1 != undefined && Img1.score >= 0.95) {
				console.log('Found Aband Gear');
				rbm.releaseScreenshot();
				return true;
				
			} else {
				console.log('Not Match Aband Gear');
			}
			console.log('----------------------');
		}
	}
	rbm.releaseScreenshot();
	sleep(100);

	console.log('Not Found Aband Gear !!');
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

function chkGet() {
	for (var i = 0; i <= 20; i++) {
		if (!config.isRunning) return false;
		// console.log('i:', i);

		if (!useReturn(1)) {
			tapFor(400, 330, 1, 50, 150, 500);
		} else { 
			// console.log('Fund L Icon');
			tapFor( 40, 170, 1, 50, 250, 2000);
			break;
		}
		sleep(1000);
	}

	for (var j = 0; j <= 10; j++) {
		if (!config.isRunning) return false;
		// console.log('j:', j);

		var colorGetOK = checkPointcolor(260, 400, 15, 'F53A65'); //確認得到遺物
		if (colorGetOK) {
			// console.log(RelicLvChk());
			break;
		} else {
			if (key == 1) {tapFor(100, 940, 2, 50, 200, 1500);}  //選愛心遺物
			else if (key == 2) { tapFor(400, 940, 2, 50, 200, 1500);}  //選龍心遺物
			
			tapFor(320, 820, 2, 50, 200, 1500);  //龍心遺物使用1回購買
		}
		sleep(1000);
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
	tapFor(120, 350, 1, 50, 50, 1500);  //選 Merge Heros

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

function buyRelicloop(hart, minLv) {  //hart: 1:redhard, 2:dragonhart;  minLV: 0:SR, 1:S, 2:A, 3:B, 4:C, 5:D
	if (!config.isRunning) return false;

	var R = RelicLvChk();
	// console.log('R:', R);

	if (R >= 0) {
		BuyRelic[1][R] = BuyRelic[1][R] + 1;
	}


	for (var i = 0; i <= 5; i++) {
		BuyRelic[2] = BuyRelic[2] + BuyRelic[0][i] + ':' + BuyRelic[1][i] + ', ';  
	}
	console.log(BuyRelic[2]);
	BuyRelic[2] = '';

	if (R == -1) {
		console.log('Not in Get Screen')
		Tireduction(hart);
	} else if (R == -2) {
		ScreenShottoPath('relicLV_false_n_.png');
		sleep(1000);
		// console.log('R:', R);
	} else if (R > minLv & R != -1) {  //0:SR, 1:S, 2:A, 3:B, 4:C, 5:D
		Tireduction(hart);
	} else if (R <= minLv & R != -1) {  //0:SR, 1:S, 2:A, 3:B, 4:C, 5:D
		Tibackup();
	}

}

// ===========================================================

function main(){       //主流程
	if (!config.isRunning) return false;

	if (Features == 1) {
		var bsnewBB = bsnewbubble();
		var mgnewBB = mgnewbubble();
		if (!mgnewBB && !bsnewBB) {
			farmermedia(mstdncycle, totaltaptime, maintaptimes, lvuptaptimes);
			rebirth(rebupcycle, rebirthwait);
		}
		playMiniGame();
		debug(debugTmrChk);

	} else {
		TireductGame(1, 40, Features, itemLv[Features], 3); //(tilst, sec, item, secF, cycle)
	}
}

// ===========================================================

function setFirstTimer() {   //預設值設定
	tapeggeqTimer = Date.now() + 900 * 1000;  //收裝備/寵蛋
	taptreasuresTimer =  Date.now() + 300 * 1000;  //點寶物/太古石板
	
	checkScreenTimer  = Date.now() +   5 * 1000;  //畫面停止檢查用，不可刪
	ScreenErrorTime1 = Date.now();
	rbm.screencrop('checkADstop.png', 180, 270, 590, 860);

	itemName = ['', '', '', 'Gear', 'Pet', 'Treasures', '', 'DailyReward'];
	itemLv   = ['', '', '', item3Lv, item4Lv, '', '', '', ''];

	mnstX = [430, 287, 222, 157, 92, 27];
	mnstY = 621;
	mnstColor = 'FAE010';
	gpoint = [];

	calnX = ['', 156, 163, 193];
	calnY = 48;
	calnColor = ['', 'DF110D', '7B797B', '0079DE'];

	debugTimer = Date.now();   //debug initial
	debugFc = false;

	week = new Date().getDay();

}

function setFirstsetting() {

	mstdncycle   =  2;  //鉿人物向上滑動次數
	totaltaptime = 60;  //點擊主畫面與升級，維持時間
	maintaptimes = 55;  //每次循環主畫面點擊次數
	lvuptaptimes =  2;  //每次循環人物升級點擊次數

	rebupcycle  = 3;    //轉生前向上滑動次數
	rebirthwait = 6;    //轉生後等待秒數

	eqeggTaptime = 0;   //點武器與蛋時間差
	treaTaptime = 480;  //執行神器動作時間 秒
	treaNew   = 0;      //轉生後自動開神器
	treaStone = 1;      //轉生後自動石板升級

	mini1play  =   1;  //minigame1 開關
	mini1DtapT = 130;  //minigame1 開牌前延遲時間
	mini1Taps  =   4;  //minigame1 開牌點擊次數  

	mini2play =  1;  //minigame2 開關
	mini2taps =  5;  //minigame2 每次檢查點擊幾個
	mini2tpwt = 18;  //minigame2 點擊時間差
	mini2wt =  260;  //minigame2 武器王(橫) 每次點完等待

	mini3play =  1; //minigame3 開關
	mini3slt1 = 50; //minigame3 打地鼠 30秒 分4段 1段 時間差
	mini3slt2 = 30; //minigame3 打地鼠 30秒 分4段 2段 時間差
	mini3slt3 = 30; //minigame3 打地鼠 30秒 分4段 3段 時間差
	mini3slt4 = 20; //minigame3 打地鼠 30秒 分4段 4段 時間差
	
	allswspd  =  20;  //滑動速度(大:快)
	allswwait = 700;  //滑動完等待 毫秒

	debugTmrChk = 5;  //畫面異常多久觸發debug執行

	//**********************************************************//
	Features  = 1;    //1:正常腳本/ 3裝備 /4寵物 /5寶物 /7每日獎勵 //
	//**********************************************************//


	refreshSw = 1;    //循環刷開關
	abGrSw    = 0;    //裝備放棄 比對開關

	item3Lv   = 4;    //裝備目標等級  /1:白 2:藍 3:綠 4:紅 5:黃

	item4Lv   = 2;    //寵物目標等級

	item7Lv   = 4;    //每日獎勵 裝備 目標等級  /1:白 2:藍 3:綠 4:紅 5:黃
	item7Pc   = 1;    //每日獎勵 目標個數

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


			// chkDalyGearLv(4, 2);

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
	console.log('syousin50 腳本開始');	
	while(config.isRunning) { main(); }
} 

// gg script path = '/storage/emulated/0/Robotmon/scripts/com.donny.bladecrafter2/ggscript/com.studiodrill.bladecrafter2.lua'
// ./bin/adb -s emulator-5558 shell ps | grep app_
// ./bin/adb shell kill -9 2552
// ./bin/adb shell
// ps | grep app_