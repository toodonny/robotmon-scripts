importJS('RBM-0.0.3');

// ============================idlerpg=============================== //

var config = {
  appName: 'com.donny.syousin50',   //日語50音-初心の冒險
  oriScreenWidth: 720, // source
  oriScreenHeight: 1280,
  oriVirtualButtonHeight: 0,
  oriResizeFactor: 1, 
  eventDelay: 50,
  imageThreshold: 1,
  imageQuality: 100,
  resizeFactor: 1, // small -> quickly
  scriptDir: 'scripts/com.donny.syousin50/images',
  isRunning: false,
  PackangName: 'com.aria63.Syousin50',
  LaunchActivityName: 'com.unity3d.player.UnityPlayerActivity',
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
	
	if (getpoint.r <= 16) getkr = '0' + getkr;
	if (getpoint.g <= 16) getkg = '0' + getkg;
	if (getpoint.b <= 16) getkb = '0' + getkb;

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
	var PicSharePath = '/storage/emulated/legacy/Pictures/Mergeheroes';
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
		case  1: return CheckImageTap( 300, 665, 390, 755, 0.95, 'mainmark.png', 1, 1, 1, 50, 2);    return;   //主頁框上方圖
		case  2: return CheckImageTap( 245, 830, 470, 910, 0.95, 'q_word.png', 1, 1, 1, 50, 2);    return;   //問答 "題"
		case  3: return CheckImageTap( 550, 780, 670, 900, 0.95, 'fightbook.png', 1, 1, 1, 50, 2);    return;   //戰鬥日記
		case  4: return CheckImageTap( 500,  30, 580, 110, 0.95, 'magic_icon.png', 1, 1, 1, 50, 2);    return;   //
		case  5: return CheckImageTap( 260,  30, 288, 62, 0.95, 'coinicon.png', 1, 1, 1, 50, 2);    return;   //錢幣小圖示(上中)
		

			
			
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
			if (i >= 2) {
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

function normalclick() {
	if (!config.isRunning) return false;

	CheckImageTap( 550, 780, 670, 900, 0.95, 'fightbook.png', 1, 1, 1, 50, 2);  //戰鬥日記
	CheckImageTap( 550, 780, 670, 900, 0.95, 'fightbook.png', 1, 1, 1, 50, 2);  //戰鬥日記

}

function startFight(ftboss) {
	if (!config.isRunning) return false;
	// if (!useReturn(5)) return false;
	console.log('Start Fight !!!')

	nomana = CheckImageTap( 470, 20, 520, 80, 0.80, 'nomana.png', 1, 1, 1, 50, 2);  //AD MANA
	if (nomana & useReturn(5)) {
		tapFor(550, 50, 2, 50, 100, 1500);
		waitAD2(65);
	}

	// CheckImageTap( 95, 875, 210, 1000, 0.95, 'fightsword.png', 1, 1, 1, 50, 1);  //戰鬥藍劍
	fightin = CheckImageTap( 95, 875, 210, 1000, 0.95, 'fightsword.png', 1, 1, 1, 50, 2);  //戰鬥藍劍
	if (fightin) {
		if (ftboss) {tapFor(360, 900, 1, 30, 100, 300);}
		tapFor(160, 950, 1, 30, 50, 1000);
	}

	if(useReturn(3)) {  //有無戰鬥日記
		if (useReturn(4)) {  //是否為法師
			tapFor(140, 1010, 1, 80, 100, 500);    //攻擊
		} else {
			sleep(500);
			tapFor(420, 1020, 1, 80, 100, 1000);   //換角
			tapFor(160,  900, 2, 80, 400, 3000);   //選法師
		}
	}
}

function clickSkill(skX) {
	if (!config.isRunning) return false;

	skillX = ['', 140, 300, 430, 560]

	for (i = 0; i < 4; i++) {
		if (!config.isRunning) return false;

		rbm.keepScreenshotPartial( 480, 720, 540, 780);  //確認技能說明
		var Img1 = rbm.findImage('skillinfo_OK.png', 0.97);  //技能說明 勾選
		var Img2 = rbm.findImage('skillinfo_NG.png', 0.97);  //技能說明 無勾選
		rbm.releaseScreenshot();

		if (Img1 != undefined) { 
			tapFor(500, 740, 1, 80, 100, 200);	
		} else if (Img2 != undefined) { 
			tapFor(skillX[skX], 1000, 1, 80, 100, 200);	 // 4:560, 3:430
		} else {
			break;
		}

		sleep(600);
	}
	
}

function answer_magic() {
	if (!config.isRunning) return false;

	rbm.keepScreenshotPartial( 400, 840, 610, 1080);  //確認技能說明
	var Img1 = rbm.findImage('Q_findHiragana.png', 0.98);  //Q_find_Hiragana
	var Img2 = rbm.findImage('Q_findKatagana.png', 0.98);  //Q_find_Katagana
	rbm.releaseScreenshot();

	if (Img1 != undefined) { 
		gana = 2
	} else if (Img2 != undefined) { 
		gana = 1
	} else {
		console.log('Not Question Screen !!');
		// sleep(300);
		return false
	}
	
	console.log('Have Question Screen !!');

	checkQ = checkQuestion(gana);
	// console.log(checkQ);

	if (checkQ != 0) {
		// sleep(500);
		clickA = clickAnswer(checkQ[0], checkQ[1]);
	}

}

function answer_magic2() {
	if (!config.isRunning) return false;

	if (useReturn(2)) {
		console.log('have "題" 字'); 

		checkQ = checkQuestion();
		// console.log(checkQ);

		if (checkQ != 0) {
			sleep(1000);
			clickA = clickAnswer(checkQ[0], checkQ[1]);
		}


	} else { 
		console.log('no 題'); 
	}

}

function checkQuestion(ganaF) {
	if (!config.isRunning) return false;
	console.log('找題問，問什麼？？')

	hirakata = ['', 'Q_Hiragana', 'Q_Katakana']

	rbm.keepScreenshotPartial( 255, 895, 375, 975);  //找發問問題
	for (var i = 1; i <= 51; i++) {
		if (!config.isRunning) return false;

		if (subname[i] != 'xx') {
			subname0 = i; if (i < 10) {subname0 = '0' + i;}
			filename = hirakata[ganaF] + '/' + subname0 + '_' + subname[i] + '.png';
			// console.log('filename:', filename);

			var Img1 = rbm.findImage(filename, 0.988);  //找發問的題目
			// if (Img1 != undefined) { rbm.log('QUESTION_Img1:',Img1); }
			if (Img1 != undefined) { rbm.log('QUESTION_Img1:"',Img1.score,'"'); }
			
			if (Img1 != undefined) { 
				rbm.log('問題：', hirakata[ganaF] , subname[i]);
				// rbm.log('return:', j, i);
				rbm.releaseScreenshot();
				return [ganaF, i];
			}
		}
	}
	rbm.releaseScreenshot();
	
	
	tapFor(200, 1070, 2, 50, 100, 200);
	return false;
}

function clickAnswer(j1, i) {
	if (!config.isRunning) return false;
	console.log('找答案，點選!!', j1, i);

	if (j1 == 1) { j = 2;}
	if (j1 == 2) { j = 1;}

	hirakata = ['', 'A_Hiragana', 'A_Katakana']

	rbm.keepScreenshotPartial( 150, 1020, 570, 1130);  //找答案

	subname0 = i; if (i < 10) {subname0 = '0' + i;}
	filename = hirakata[j] + '/' + subname0 + '_' + subname[i] + '.png';
	// console.log('filename:', filename);

	var Img1 = rbm.findImage(filename, 0.975);  //找答案
	// if (Img1 != undefined) { rbm.log('ANSWER_Img1:',Img1); }
	if (Img1 != undefined) { rbm.log('ANSWER_Img1:"',Img1.score,'"'); }
	rbm.releaseScreenshot();
	
	if (Img1 != undefined) { 
		rbm.log('答案：', hirakata[j] , subname[i]);
		// rbm.log('x:', Img1.x, ', y:', Img1.y);
		rbm.releaseScreenshot();
		
		sleep(300);
		tapFor(Img1.x, Img1.y, 3, 80, 300, 1000);
		return [Img1.x, Img1.y];
	}
	
	tapFor(200, 1070, 2, 30, 100, 300);
	return 0;
}

function getMaterial(ADf) {
	if (!config.isRunning) return false;

	var getchoi = ['', 'AD_YES.png', 'AD_NON.png'];

	rbm.keepScreenshotPartial( 260, 610, 450, 660);        //
	var Img3 = rbm.findImage('winboss.png', 0.95);         
	rbm.releaseScreenshot();

	if (Img3 != undefined) {tapFor(Img3.x, Img3.y, 1, 60, 300, 1000);}


	rbm.keepScreenshotPartial( 220, 890, 300, 1125);        //
	var Img1 = rbm.findImage(getchoi[ADf], 0.97);           //
	var Img2 = rbm.findImage('get2xmaterial.png', 0.97);    //
	rbm.releaseScreenshot();

	if (Img1 != undefined) {
		console.log(getchoi[ADf]);
		tapFor(Img1.x, Img1.y, 1, 60, 300, 1500);
		if (ADf == 1) {	waitAD2(65); }
		else {
			sleep(2000);
			keycode('BACK', 600);
			sleep(1000);


		}

	} else if (Img2 != undefined) {
		console.log('AD_NON');
		tapFor(Img2.x, Img2.y + 40, 2, 80, 100, 3000);
		keycode('BACK', 600);
		sleep(5000);


	}
}


// ===========================================================

function main(){       //主流程
	if (!config.isRunning) return false;
	
	
	startFight(1);     //戰鬥&選法師
	clickSkill(4);     //選技能  
	answer_magic();   //法師答題模式
	getMaterial(2);   //看廣告拿獎勵

	 sleep(1000);
}

// ===========================================================

function setFirstTimer() {   //預設值設定
	tapherolistTimer = Date.now() +   1 * 1000;
	taprandheroTimer = Date.now() +   1 * 1000;

	
	

	checkScreenTimer  = Date.now() +   5 * 1000;  //畫面停止檢查用，不可刪
	ScreenErrorTime1 = Date.now()
	rbm.screencrop('checkADstop.png', 180, 270, 590, 860);

}

function setFirstsetting() {

	// hirakata = ['', 'Q_Hiragana', 'Q_Katakana']
	subname = ['', 'a', 'i', 'u', 'e', 'o', 'ka', 'ki', 'ku', 'ke', 'ko', 'sa', 'si', 'su', 'se', 'so', 'ta', 'chi', 'tsu', 'te', 'to', 'na', 'ni', 'nu', 'ne', 'no', 'ha', 'hi', 'hu', 'he', 'ho', 'ma', 'mi', 'mu', 'me', 'mo', 'ya', 'xx', 'yu', 'xx', 'yo', 'ra', 'ri', 'ru', 're', 'ro', 'wa', 'xx', 'xx', 'xx', 'wo', 'n']
	
	
}

function test(cycle){
	rbm.init();
	config.isRunning = true;               //腳本測試用function
	for(var n = 0; n <= cycle; n++) {
		if (!config.isRunning) return false;
		
		if (n == 0) { 
			setFirstsetting();   //設定初值設定值
			setFirstTimer();     //設定初始時間值
		} else if (n >= 1) {
			console.log('n = ', n, '/', cycle, ', CRA 腳本開始');

			// startFight();
			// clickSkill();
			// answer_magic();
			// getMaterial(1);

			while(config.isRunning) {main();}
			// console.log('n = ', n, ', CRA 腳本結束');
			sleep(1000);
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
	setFirstsetting();   //設定初值設定值
	setFirstTimer();     //設定初始時間值
	console.log('syousin50 腳本開始');	
	while(config.isRunning) { main(); }
} 

// ./bin/adb -s emulator-5558 shell ps | grep app_
// ./bin/adb shell kill -9 2552
// ./bin/adb shell
// ps | grep app_