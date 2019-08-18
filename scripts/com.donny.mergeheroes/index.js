importJS('RBM-0.0.3');

// ============================idlerpg=============================== //

var config = {
  appName: 'com.donny.mergeheroes',
  oriScreenWidth: 720, // source
  oriScreenHeight: 1280,
  oriVirtualButtonHeight: 0,
  oriResizeFactor: 1, 
  eventDelay: 50,
  imageThreshold: 1,
  imageQuality: 100,
  resizeFactor: 1, // small -> quickly
  scriptDir: 'scripts/com.donny.mergeheroes/images',
  isRunning: false,
  PackangName: 'com.indiejoy.mergeheroes',
  LaunchActivityName: 'org.cocos2dx.javascript.AppActivity',
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
		case  1:   //主畫面
			var colorLOK = checkPointcolor(45, 160, 15, '4A117D'); //L圖標紫色
			return colorLOK;

		case  2:   //龍洞畫面
			// var img1 = getScreenshotModify(645, 106, 45, 1, 45, 1, 100);
			// var winOK = true;
			// for (var j = 0; j <= 3; j++) {
			// 	dlpoint[j] = getpointHex(img1, xxX[j] - xxX[0], 0);
			// 	// rbm.log(j, 'dlpoint:', dlpoint[j], ', xxColor:', xxColor[j]);

			// 	var colorOK = isSameColorHex(xxColor[j], dlpoint[j], 10);
			// 	if (!colorOK) {winOK = false; break;}
			// }
			// releaseImage(img1);
			// // rbm.log('dlpoint:', dlpoint);
			// // rbm.log('xxColor:', xxColor);
			// return winOK

			
			for (var i = 4; i <= 4; i++) {
				var intX = XXBtn[i][0];
				var intY = XXBtn[i][1];
				var width = XXBtn[i][2];
				var high = XXBtn[i][3];
				var img1 = getScreenshotModify(intX, intY, width, high, width, high, 100);
				var winOK = true;
				for (var j = 0; j <= 2; j++) {
					XXBtn[3][j] = getpointHex(img1, XXBtn[1][j], 0);
					// rbm.log(j, 'dlpoint:', dlpoint[j], ', xxColor:', xxColor[j]);

					var colorOK = isSameColorHex(XXBtn[2][j], XXBtn[3][j], 10);
					if (!colorOK) {winOK = false; intX = -1; intY = -1; break;}
				}
				releaseImage(img1);
				if (winOK) {break;}
				// console.log('i:', i, ', winOK:', winOK);
			}
			return winOK;
			// return {'r':winOK, 'x':intX, 'y':intY};
			
		case  3:   //魔力珠畫面
			var img1 = getScreenshotModify(645, 306, 45, 1, 45, 1, 100);
			var winOK = true;
			for (var j = 0; j <= 3; j++) {
				dlpoint[j] = getpointHex(img1, xxX[j] - xxX[0], 0);
				// rbm.log(j, 'dlpoint:', dlpoint[j], ', xxColor:', xxColor[j]);

				var colorOK = isSameColorHex(xxColor[j], dlpoint[j], 10);
				if (!colorOK) {winOK = false; break;}
			}
			releaseImage(img1);
			// rbm.log('dlpoint:', dlpoint);
			// rbm.log('xxColor:', xxColor);
			return winOK

		case  4:  //看廣告按鈕(大按鈕) 貓頭鷹
			var intX = ADbtn[4][0];
			var intY = ADbtn[4][1];
			var width = ADbtn[4][2];
			var high = ADbtn[4][3];
			var img1 = getScreenshotModify(intX, intY, width, high, width, high, 100);
			var winOK = true;
			for (var j = 0; j <= 2; j++) {
				ADbtn[3][j] = getpointHex(img1, ADbtn[1][j], 0);
				// rbm.log(j, 'dlpoint:', dlpoint[j], ', xxColor:', xxColor[j]);

				var colorOK = isSameColorHex(ADbtn[2][j], ADbtn[3][j], 20);
				if (!colorOK) {winOK = false; intX = -1; intY = -1; break;}
			}
			releaseImage(img1);
			return {'r':winOK, 'x':intX, 'y':intY};

		
		case  5:  //看廣告按鈕(大按鈕) 輪盤
			var intX = ADbtn[5][0];
			var intY = ADbtn[5][1];
			var width = ADbtn[5][2];
			var high = ADbtn[5][3];
			var img1 = getScreenshotModify(intX, intY, width, high, width, high, 100);
			var winOK = true;
			for (var j = 0; j <= 2; j++) {
				ADbtn[3][j] = getpointHex(img1, ADbtn[1][j], 0);
				// rbm.log(j, 'dlpoint:', dlpoint[j], ', xxColor:', xxColor[j]);

				var colorOK = isSameColorHex(ADbtn[2][j], ADbtn[3][j], 20);
				if (!colorOK) {winOK = false; intX = -1; intY = -1; break;}
			}
			releaseImage(img1);
			return {'r':winOK, 'x':intX, 'y':intY};
		
		case  6:  //看廣告按鈕(大按鈕) 輪盤
			var intX = ADbtn[6][0];
			var intY = ADbtn[6][1];
			var width = ADbtn[6][2];
			var high = ADbtn[6][3];
			var img1 = getScreenshotModify(intX, intY, width, high, width, high, 100);
			var winOK = true;
			for (var j = 0; j <= 2; j++) {
				ADbtn[3][j] = getpointHex(img1, ADbtn[1][j], 0);
				// rbm.log(j, 'dlpoint:', dlpoint[j], ', xxColor:', xxColor[j]);

				var colorOK = isSameColorHex(ADbtn[2][j], ADbtn[3][j], 20);
				if (!colorOK) {winOK = false; intX = -1; intY = -1; break;}
			}
			releaseImage(img1);
			return {'r':winOK, 'x':intX, 'y':intY};

		case  7:  //看廣告按鈕(大按鈕) 輪盤
			var intX = ADbtn[7][0];
			var intY = ADbtn[7][1];
			var width = ADbtn[7][2];
			var high = ADbtn[7][3];
			var img1 = getScreenshotModify(intX, intY, width, high, width, high, 100);
			var winOK = true;
			for (var j = 0; j <= 2; j++) {
				ADbtn[3][j] = getpointHex(img1, ADbtn[1][j], 0);
				// rbm.log(j, 'dlpoint:', dlpoint[j], ', xxColor:', xxColor[j]);

				var colorOK = isSameColorHex(ADbtn[2][j], ADbtn[3][j], 20);
				if (!colorOK) {winOK = false; intX = -1; intY = -1; break;}
			}
			releaseImage(img1);
			return {'r':winOK, 'x':intX, 'y':intY};

		case  8:  //看廣告按鈕(小按鈕)
			for (var i = 4; i <= 6; i++) {
				var intX = ADbtn_s[i][0];
				var intY = ADbtn_s[i][1];
				var width = ADbtn_s[i][2];
				var high = ADbtn_s[i][3];
				var img1 = getScreenshotModify(intX, intY, width, high, width, high, 100);
				var winOK = true;
				for (var j = 0; j <= 2; j++) {
					ADbtn_s[3][j] = getpointHex(img1, ADbtn_s[1][j], 0);
					// rbm.log(j, 'dlpoint:', dlpoint[j], ', xxColor:', xxColor[j]);

					var colorOK = isSameColorHex(ADbtn_s[2][j], ADbtn_s[3][j], 10);
					if (!colorOK) {winOK = false; intX = -1; intY = -1; break;}
				}
				releaseImage(img1);
				if (winOK) {break;}
				// console.log('i:', i, ', winOK:', winOK);
			}
			return {'r':winOK, 'x':intX, 'y':intY};
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
			if (i == 2){
				keycode('HOME', 200); sleep(1000);
				rbm.startApp(config.PackangName,config.LaunchActivityName);
				sleep(200);
			}
			if (i >= 3) {
				var mainpage = useReturn(1); //主畫面書本圖示
				if (mainpage) {
					a = a + 1;
					if (i < 10 && a >= 10) {console.log('選單鈕，出現10秒，異常'); return false;}
					else if (i > 10 && a >=  4) {console.log('選單鈕，出現 5秒，回到遊戲'); return false;}
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

function timedotchk() { //Power full ":" 檢查
	if (!config.isRunning) return false;

	var timedot = []; var dotChk = false;
	var img = getScreenshotModify(51, 559, 3, 1, 3, 1, 100);
	for (var j = 0; j <= 2; j++) {
		if (!config.isRunning) return false;

		timedot[j] = getpointHex(img, j, 0);
		var colorOK = isSameColorHex('FEFEFF', timedot[j], 5);
		// rbm.log(j, ', timedot:', timedot[j], ', colorOK:', colorOK);

		if (colorOK) {dotChk = true; break;}
	}
	releaseImage(img);

	return dotChk;

}

function powerfulltap() {
	if (!config.isRunning) return false;

	var a_times = 0;
	for (var i = 0; i <= 20; i++) {
		if (!config.isRunning) return false;
		// console.log('tap loop:', i);

		if (useReturn(1)) {
			var pwPoint = getPointcolor(45, 520);
			if (pwPoint.b <= 150) {
				tapFor(50, 450, 20, 30, 40, 80);
				a_times = 0;
			} else if (timedotchk()) {
					console.log('Power Full!!')
					break;
			} else {
				a_times = a_times + 1;
				if (a_times >= 3) {
					console.log('Power Full to Tap!!')
					tapFor(50, 540, 1, 50, 100, 100);
				}
			}

		} else {
			if (useReturn(3)) {tapFor(670, 310, 1, 50, 100, 100);}
			break;
		}
		sleep(100);
	}
}

function tapbird(f) {
	if (!config.isRunning) return false;
	if (!useReturn(1)) return false;

	var nowTime = Math.floor( Date.now() / 1000) % f;
	if (nowTime == 0) {
		for (var n = 0; n <= 6; n++) {
			if (!config.isRunning) return false;
		
			// console.log('n:', n)
			var tapX = 150 + n * 450 / 6;
			tapFor(tapX, 220, 1, 30, 30, 50);
		}
	}

}

function tapherolist(Timer) {
	if (!config.isRunning) return false;
	if (!useReturn(1)) return false;
	if (Date.now() < tapherolistTimer) return false;

	console.log('tap hero list');
	tapFor(670, 1230, 1, 50, 50, 1000);
	
	tapherolistTimer =  Date.now() + Timer * 1000;
}

function taprandhero(Timer) {
	if (!config.isRunning) return false;
	if (!useReturn(1)) return false;
	if (Date.now() < taprandheroTimer) return false;

	console.log('tap hero list');
	tapFor( 45, 230, 1, 50, 50, 1000);
	tapFor(340, 260, 1, 50, 50, 1000);
	// tapFor(300, 960, 1, 50, 50, 2000);
	
	taprandheroTimer =  Date.now() + Timer * 1000;
}

function taprandrelic(Timer) {
	if (!config.isRunning) return false;
	if (!useReturn(1)) return false;
	if (Date.now() < taprandrelicTimer) return false;

	console.log('tap hero list');
	tapFor( 45, 230, 1, 50, 50, 1000);
	tapFor(210, 260, 1, 50, 50, 1000);
	// tapFor(300, 960, 1, 50, 50, 2000);
	
	taprandrelicTimer =  Date.now() + Timer * 1000;
}

function tapdailyraw(Timer) {
	if (!config.isRunning) return false;
	if (!useReturn(1)) return false;
	if (Date.now() < tapdailyrawTimer) return false;
	console.log('tap daily raw');

	var colorOK = checkPointcolor(65, 320, 20, 'FD0005'); //NEW 圖示紅色
	console.log('colorOK:',colorOK);

	if(colorOK) {
		tapFor( 45, 348, 2, 50, 50, 1000);
	}

	tapdailyrawTimer =  Date.now() + Timer * 1000;
}

function mergeherosMove(Timer, limit) {
	if (!config.isRunning) return false;
	if (!useReturn(1)) return false;
	if (Date.now() < mergeherosMoveTimer) return false;

	console.log('merge heros Move');

	var stage1st = 13;
	for (var j = 13; j >= 7; j--) {
		if (stage1st <= limit) { 
			console.log('heros:', stage1st, '< limit:', limit, ', Break!');
			break;
		}
		if (j < stage1st) {
			console.log(j, '<', stage1st, ', Move Hero!!')
			// break;
		
			for (var i = 0; i <= 5; i++) {
				if (!config.isRunning) return false;
				if (!useReturn(1)) return false;

				var mvX0 = MergeMove.x[i];
				var mvY0 = MergeMove.y[i];
				
				var colorOK = checkPointcolor(mvX0, mvY0, 15, '1D440F'); //平台沒人(綠色)
				if (!colorOK) {
					var mvX1 = MergeMove.x[i + 1];
					var mvY1 = MergeMove.y[i + 1];
					DIY_swipe(mvX0, mvY0, mvX1, mvY1, 25, 100);
				} else {
					stage1st =  MergeMove.g[i];
					console.log('stage', stage1st, 'no hero!');
					sleep(100);
				}
			}
		}
		sleep(100);
	}
	mergeherosMoveTimer =  Date.now() + Timer * 1000;
}

function mergeherosHists(intlv, finlv) {
	if (!config.isRunning) return false;

	var rate = 0.5;

	for (var i = intlv; i <= finlv; i++) {
		if (!config.isRunning) return false;
		console.log('Lv ', i, ' Check');

		// var img = getScreenshotModify(55, 765, 606, 386, 606, 386, 100);
		var img = getScreenshotModify(75, 762, 580, 190, 580 * rate, 190 * rate, 100);
		// console.log('111111');
		// results = findImageHists(img, lvcode[i], 0.86, 5);
		results = findImageHists(img, lvcode_05[i], 0.86, 8);
		// console.log('222222');
		releaseImage(img);
		// console.log('333333');

		for (var index in results) {
			if (!config.isRunning) return false;
			
			var result = results[index];
			var remainder = index % 2;
			rbm.log('result', index, remainder, result);

			if (remainder == 0) {
				var mvX0 = (result.x / rate) +  55;
				var mvY0 = (result.y / rate) + 765;
			} else if (remainder == 1) {
				var mvX1 = (result.x / rate) +  55;
				var mvY1 = (result.y / rate) + 765;
				DIY_swipe(mvX1, mvY1, mvX0, mvY0, 30, 200);
			}
			console.log(mvX1, mvY1, mvX0, mvY0);
		}
		sleep(300);
	}
}
//==========Fight Lair Dragon=========

function dragonlairNew() {
	if (!config.isRunning) return false;
	
	var colorOK = checkPointcolor(698, 454, 20, 'FD0005');   //NEW 圖示紅色
	if(colorOK) {tapFor(698 - 30, 454 + 30, 1, 50, 100, 500);}
	console.log('New Icon:', colorOK);

	for (var i = 0; i <= 3; i++) {
		if (!config.isRunning) return false;

		var dlwinOK = useReturn(2);
		if (dlwinOK) {
			console.log('Dragons Lair Win OK');
			return true;
		} else if (i == 3) {
			return false;
		}
		
		sleep(200)
	}
}

function fightdragonlair(c1, c2) {   //打龍穴，max ---> min
	if (!config.isRunning) return false;

	for (var i = c1; i >= c2; i--) {
		if (!config.isRunning) return false;

		for (var l = 0; l <= 8; l++) {  //檢查是否所有龍不能打進行跳出
			dslChk[9] = dslChk[l]
			if (dslChk[9] == 0) {
				console.log('No Dragon Fight');
				 break;
			}
		}

		if (dslChk[i]) {  //檢查指定等級的龍能不能打
			var img = getScreenshotModify(dslX[i], dslY[i], 25, 1, 25, 1, 100);
			for (var j = 0; j <= 1; j++) {
				if (!config.isRunning) return false;

				dslpoint[j] = getpointHex(img, dslXd[j], 0);
				
				var colorOK = isSameColorHex(dslColor[i], dslpoint[j], 20);
				// rbm.log(i, j, 'dslColor:', dslColor[i], ', dslpoint:', dslpoint[j], ', colorOK:', colorOK);

				if (!colorOK) {
					dslChk[i] = 0;
					break;
				}
			}
			releaseImage(img);
			rbm.log('dslChk:', dslChk);

			if (dslChk[i]) {  //打完龍收獎勵到主畫面
				tapFor(dslX[i], dslY[i], 2, 50, 150, 200);
				tapFor(550, 990, 2, 50, 150, 200);

				for (var k = 0; k <= 120; k++) {
					sleep(1000);
					console.log('Fight Dragon Timeer:', k, ' sec');
					
					var colorOK = checkPointcolor(280, 840, 15, '59678A');   //點灰色按鈕
					if(colorOK) {tapFor(285, 840, 2, 50, 300, 100);}

					var dlwinOK = useReturn(2);
					if (dlwinOK) {sleep(300); break;}					
				}
			}

		}
	}
}

function fightdragon(){
	if (!config.isRunning) return false;
	console.log('fight dragon lair');

	dslChk = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0];
	sleep(100);
	var dslWin = dragonlairNew();
	sleep(100);
	console.log('dslWin:', dslWin);
	sleep(100);
	if (dslWin) {
		sleep(400);
		DIY_swipe(605, 600, 605, 990, 30, 800)
		fightdragonlair(8, 5);

		DIY_swipe(605, 890, 605, 500, 30, 800)
		fightdragonlair(4, 0);
	}
}

function fightdragonlairloop(looptime) {
	if (!config.isRunning) return false;
	console.log('fight dragon lair loop');


	dslChk = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0];
	sleep(100);
	var dslWin = dragonlairNew();
	sleep(100);
	console.log('dslWin:', dslWin);
	sleep(100);
	if (dslWin) {
		sleep(400);
		DIY_swipe(605, 600, 605, 990, 30, 500)
		fightdragonlair(8, 5);

		DIY_swipe(605, 890, 605, 500, 30, 500)
		fightdragonlair(4, 0);

		
		console.log('dslWin 2:', dslWin);

		var tapChk = false;
		for (var m = 1; m <= 3; m++) {
			switch (m) {
				case 1:	tapChk = Date.now() >= taprandrelicTimer; break;
				case 2:	tapChk = Date.now() >= tapherolistTimer; break;
				case 3: tapChk = Date.now() >= taprandheroTimer; break;
			}
			console.log('m:', m, ', tapChk:', tapChk);
			if (tapChk) {
				for (var j = 0; j <= 30; j++){
					if (useReturn(1)) {break;}
					keycode('BACK', 200); sleep(900);
				}
				switch (m) {
					case 1:	taprandrelic(210); break;
					case 2:	tapherolist(210); break;
					case 3: taprandhero(210); break;
				}
				ADgetany();

				mergeherosMove(360,10);
			}

		}
	
		keycode('HOME', 400);

	} else if (!dslWin) {

		for (var i = 0; i <= looptime; i++) {
			if (i <= 3) {keycode('HOME', 400);}
			sleep(1000);
			console.log('Home wait', i, '/', looptime, 'sec');
		}
		
		// console.log('Start Game')
		rbm.startApp(config.PackangName,config.LaunchActivityName); sleep(500);

		for (var j = 0; j <= 10; j++) {
			var dslWin = dragonlairNew();
			if (dslWin) {break;}
			// keycode('BACK', 200); sleep(400);
			sleep(500);
			tapFor(698 - 30, 454 + 30, 1, 50, 100, 500);
		}
	}
}

//==========TiBackup Artics=========
function Tireduction(key) {
	if (!config.isRunning) return false;

	console.log('TiBackup to Reduction');

	rbm.stopApp(config.PackangName); sleep(300)
	rbm.stopApp(config.PackangName); sleep(1200)
	rbm.startApp(config.TiPackangName,config.TiLaunchActivityName); sleep(2000);

	tapFor( 40, 360, 1, 50, 50, 500);  //選第二個程式(merge hero)
	tapFor(470, 130, 1, 50, 50, 500);  //點選-備份還原功能
	tapFor( 40, 360, 1, 50, 50, 500);  //選第二個程式(merge hero)
	tapFor(470, 130, 1, 50, 50, 500);  //點選-備份還原功能
	tapFor(120, 350, 1, 50, 50, 2000);  //選第一個備份資料-還原
	tapFor(420, 730, 1, 50, 50, 3000);  //點選-資料	
	// tapFor(120, 350, 1, 50, 50, 2000);  //選 Merge Heros
	
	// console.log('Start Game')
	rbm.startApp(config.PackangName,config.LaunchActivityName); sleep(5000);

	for (var i = 0; i <= 20; i++) {
		if (!config.isRunning) return false;
		// console.log('i:', i);

		// var colorLOK = checkPointcolor(41, 178, 15, '540D78'); //確認L圖標紫色
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

function Tibackup() {
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

//================
function bosstap() {
	var img = getScreenshotModify(165, 65, 1, 820, 1, 820, 100);
	for (var j = 0; j <= 9; j++){gpoint[j] = getImageColor(img, 0, blockY3[j]);}
	releaseImage(img);
	
	for (var i = 0; i <= 9; i++) {
		if(gpoint[i].r == '255') {tap(180, 1100, 25);}
		else {tap(540, 1100, 25);}
	}
	sleep(bosstapsleep);
}

function tapblock3() {
	// var fightfire = checkPointcolor(260, 250, 0, 'F6C31B');
	// console.log('fightfire:', fightfire);
	// if (fightfire){
		var power = checkPointcolor(394, 884, 0, '00FFFF');
		if (power) {powerftap();} 
		else {bosstap();}
	// } else { sleep(5000);}
}

function bossfight() {
	if (!bossfightSw) return false;

	var gsftpt2Chk = true;
	var img = getScreenshotModify(223, 914, 1, 25, 1, 25, 100);
	for (var j = 0; j <= 2; j++){bsftptN[j] = getImageColor(img, 0, bsftptY[j]);}
	releaseImage(img);
	rbm.log('bsftptN:', bsftptN, 'bsftptR:', bsftptR);
	for (var i = 0; i <= 2; i++) {if (bsftptN[i].r != bsftptR[i]) {gsftpt2Chk = false} }
	if (gsftpt2Chk) { tap(223, 955, 50); sleep(3000);}
	
	var gsftpt1Chk = true;
	var img = getScreenshotModify(343, 934, 1, 25, 1, 25, 100);
	for (var j = 0; j <= 2; j++){bsftptN[j] = getImageColor(img, 0, bsftptY[j]);}
	releaseImage(img);
	// rbm.log('bsftptN:', bsftptN, 'bsftptR:', bsftptR);
	for (var i = 0; i <= 2; i++) {if (bsftptN[i].r != bsftptR[i]) {gsftpt1Chk = false} }
	if (gsftpt1Chk) { tap(310, 955, 50); sleep(6000);}


}

function fighting() {
	var fightclock = checkPointcolor(250, 240, 0, 'FFB900');
	console.log('fightclock:', fightclock);
	if (fightclock) {
		tapblock2()
	} else {	
		var fightfire = checkPointcolor(260, 250, 0, 'F6C31B');
		console.log('fightfire:', fightfire);
		if (fightfire) {
			tapblock3()
		} else {
			bossfight();
			sleep(3000);
		}
	}
}

function main(){       //主流程
	if (!config.isRunning) return false;
	
	
	 powerfulltap();
	 tapbird(3);
	 
	 taprandrelic(80);  //點輪盤 - 物品
	 taprandhero(60);   //點輪盤 - 英雄
	 tapherolist(60);   //點右下英雄列表
	 tapdailyraw(60);   //檢查每日獎勵

	 ADgetany();

	 mergeherosMove(90,12);

	 sleep(1000);
}

// ===========================================================

function setFirstTimer() {   //預設值設定
	tapherolistTimer = Date.now() +   1 * 1000;
	taprandheroTimer = Date.now() +   1 * 1000;
	taprandrelicTimer = Date.now() +   1 * 1000;
	tapdailyrawTimer = Date.now() +   1 * 1000;
	mergeherosMoveTimer = Date.now() +   1 * 1000;

	
	// mergerdragonTimer = Date.now() +   1 * 1000;

	// blockY2 = [615, 515, 415, 315, 215, 115, 15, 0];
	// blockY3 = [815, 715, 615, 515, 415, 315, 215, 115, 15, 0];

	xxX = [645, 657, 670, 684]; //視窗xx 色碼 x坐標
	xxColor = ['9A21DB', 'F7AA13', 'AE5C05', 'FFFFFF']; //視窗xx 色碼

	dlpoint = [];

	// dslX = [387, 258, 488, 248, 518, 236, 466, 201, 453];
	// dslY = [914, 806, 765, 597, 573, 749, 669, 551, 535];

	dslX = [387, 258, 488, 248, 518, 236, 466, 201, 453];
	dslY = [960, 852, 811, 643, 619, 818, 738, 620, 604];
	dslColor = ['00CA07', 'FDAF00', '03EEFE', 'EA1601', '7300C9', 'FA40FF', 'E08001', '1DA993', '809DA4'];

	dslXd = [0, 22];
	dslChk = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0];
	dslpoint =[];

	lvcode = [
		0, 
		1, 
		2, 
		3, 
		'2221100013111100321101110022001A', 
		'3301000023121000031111100022001A', 
		'3211110002221110022111110022001A', 
		'3200010022211120131001210022001A', 
		'1400100004111000022121010022001A', 
		'2221000022211100022210010022001A', 
		10, 
		11, 
		12]; //getImageHistCode(89, 767, 123, 793);

	lvcode_05 = [
		0, 
		1, 
		2, 
		3, 
		'2221000013111100221101110011000D', 
		'3301000013121000031111100011000D', 
		'3211110002221110032111110011000D', 
		'3200110022211110131101210011000D', 
		'1400100003111000021121010011000D', 
		'2321000022211100022210010011000D', 
		10, 
		11, 
		12]; //getImageHistCode(89, 767, 123, 793);


	RelicLvColor = {
		0: ['SR', '2F91FE', '917D65', '99BEE0'],
		1: ['S', '4B1779', 'ECC94A', '4B1779'],
		2: ['A', '4D0507', 'FDE74C', '4D0507'],
		3: ['B', '0A2F67', 'B1B4B9', '0A2F67'],
		4: ['C', '1E440B', 'CDD6E3', '1E440B'],
		5: ['D', '07491C', 'AF6F10', '07491C'],
		6: ['pointX', 0, 12, 24],  //get X color
		7: ['intXY', 304, 551],  //initial X,Y
		8: []  //Tmp for get point color (Hex)
	}

	BuyRelic = {
		0: ['SR', 'S', 'A', 'B', 'C', 'D'],
		1: [   0,   0,   0,   0,   0,   0],
		2: ''
	}

	ADbtn = {
		0: [157, 785, 25, 1],
		1: [0, 12, 24],
		2: ['1B7B8C', 'FFFFFF', '1C3243'],
		3: [],
		4: [157, 786, 25, 1],  //貓頭鷹
		5: [190, 949, 25, 1],  //輪盤
		6: [157, 750, 25, 1],  //每日獎勵
		7: [208, 761, 25, 1]   //商店英雄2
	}


	ADbtn_s = {
		0: [440, 489, 25, 1],  //商店英雄1
		1: [0, 12, 24],
		2: ['1B7B8C', 'FFFFFF', '1C3243'],
		3: [],
		4: [458, 524, 25, 1],  //商店英雄1-第1位
		5: [458, 744, 25, 1],  //商店英雄1-第2位 y位移 220
		6: [458, 964, 25, 1]   //商店英雄1-第3位

	}

	XXBtn = {
		0: [586, 132, 25, 1],  //龍之谷 叉叉
		1: [0, 12, 24],
		2: ['9A560E', 'E20406', 'FFFFFF'],
		3: [],
		4: [586, 132, 25, 1, '']   //龍之谷 叉叉

	}

	MergeMove = {
		x: [ 369,  229,   89, 649, 509, 369, 229],
		y: [1112, 1112, 1112, 957, 957, 957, 957],
		g: [  13,   12,   11,  10,   9,   8,   7],
		color: ['1D440F']
	}

	checkScreenTimer  = Date.now() +   5 * 1000;  //畫面停止檢查用，不可刪
	ScreenErrorTime1 = Date.now()
	rbm.screencrop('checkADstop.png', 180, 270, 590, 860);

}

function setFirstsetting() {
	
	
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

			// getImageHistCode(89, 767, 123, 793, 0.5);
			// mergeherosHists(7, 9);
			// if (!useReturn(1) && !ADbtnChk) {keycode('BACK', 400);}

			// main();
			// fightdragon();
			// fightdragonlairloop(60);
			buyRelicloop(2, 0); //hart: 1:redhard, 2:dragonhart;  minLV: 0:SR, 1:S, 2:A, 3:B, 4:C, 5:D


			// mergeherosMove(360,10);

			// while(config.isRunning) {main();}
			// console.log('n = ', n, ', CRA 腳本結束');
			// sleep(1000);
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
	setFirstTimer();     //設定初始值

	console.log('Crush Them All 腳本開始');	
	while(config.isRunning) { main(); }
} 

// ./bin/adb -s emulator-5558 shell ps | grep app_
// ./bin/adb shell kill -9 2552
// ./bin/adb shell
// ps | grep app_