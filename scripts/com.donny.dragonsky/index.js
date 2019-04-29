importJS('RBM-0.0.3');

// ============================idlerpg=============================== //

var config = {
  appName: 'com.donny.dragonsky',
  oriScreenWidth: 720, // source
  oriScreenHeight: 1280,
  oriVirtualButtonHeight: 0,
  oriResizeFactor: 1, 
  eventDelay: 50,
  imageThreshold: 1,
  imageQuality: 100,
  resizeFactor: 1, // small -> quickly
  scriptDir: 'scripts/com.donny.dragonsky/images',
  isRunning: false,
  PackangName: 'com.manacore.mod',
  LaunchActivityName: 'com.unity3d.player.UnityPlayerActivity',
};

// 應用:Dragon Sky
// 包名:com.manacore.mod
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
	
	console.log(getpoint.r, getpoint.g, getpoint.b)
	
	getkr = getpoint.r.toString(16)
	getkb = getpoint.b.toString(16)
	getkg = getpoint.g.toString(16)
	
	console.log(getkr, getkb, getkg)
	
	getcolorHEX = getkr & getkb & getkg
	
	return getcolorHEX;
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
	var PicSharePath = '/storage/emulated/legacy/Pictures/TT2';
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

//==============================功能性function=====================================//

function useReturn(choiceF){          //各項回授點檢查 
	if (!config.isRunning) return false;
	//console.log('各項升級限制條件');
	
	switch (choiceF) {
		case  1:   //主畫面書本
			rbm.keepScreenshotPartial( 670,  50, 705, 75);  //(主畫面)
			var Img1 = rbm.findImage('rubyicon.png', 0.90);
			rbm.releaseScreenshot();

			// if (Img1 != undefined) {rbm.log('rubyicon:', Img1);}
			if (Img1 != undefined) {return true;} else {return false;}

		case  2:   //回歸屬性畫面確認
			rbm.keepScreenshotPartial(415, 755, 570, 915);  ///點擊獲取
			for (var k = 1; k <= 4; k++) {
				var Img = rbm.findImage('attrib_' + k + '.png', 0.90);
				if (Img != undefined) {rbm.log('CHECK attrib_' + k + '.png', Img);}
				if (Img != undefined) break;
			}
			rbm.releaseScreenshot();
			if (Img != undefined) {return true;} 
			else {return false;}

		case  3:    //無廣告可看
			rbm.keepScreenshotPartial( 467,  687, 623, 980);  //(用太多蛋蛋)
			var Img1 = rbm.findImage('usemoreegg.png', 0.85);
			rbm.releaseScreenshot();
			if (Img1 != undefined) {rbm.log('usemoreegg:', Img1);}
			if (Img1 != undefined) {return true;} else {return false;}
			
		case  4:    //看廣告
			rbm.keepScreenshotPartial( 185,  949, 236, 994);  //(用太多蛋蛋)
			var Img1 = rbm.findImage('watchADbutton.png', 0.90);
			rbm.releaseScreenshot();

			if (Img1 != undefined) {rbm.log('watchADbutton:', Img1);}
			if (Img1 != undefined) {return true;} else {return false;}
			
		case  5:    //退出遊戲對話框
			rbm.keepScreenshotPartial( 295,  495, 430, 540);  //(用太多蛋蛋)
			var Img1 = rbm.findImage('exitgame.png', 0.90);
			rbm.releaseScreenshot();
			if (Img1 != undefined) {rbm.log('exitgame:', Img1);}
			if (Img1 != undefined) {return true;} else {return false;}
			
		case  6:    //關閉xx
			rbm.keepScreenshotPartial( 5, 1060, 715, 1275);  //(用太多蛋蛋)
			var Img1 = rbm.findImage('closebox.png', 0.90);
			rbm.releaseScreenshot();
			if (Img1 != undefined) {rbm.log('closebox:', Img1);}
			if (Img1 != undefined) {return Img1;} else {return false;}
			
		case  7:    //關閉xx
			rbm.keepScreenshotPartial( 26, 1034, 705, 1215);  //(用太多蛋蛋)
			var Img1 = rbm.findImage('closebox.png', 0.90);
			rbm.releaseScreenshot();
			if (Img1 != undefined) {rbm.log('closebox:', Img1);}
			if (Img1 != undefined) {return Img1;} else {return false;}

		case  8:    //回歸BUTTON 上
			rbm.keepScreenshotPartial( 330, 297, 394, 337);  //(用太多蛋蛋)
			var Img1 = rbm.findImage('goback1.png', 0.90);
			rbm.releaseScreenshot();
			if (Img1 != undefined) {rbm.log('goback1:', Img1);}
			if (Img1 != undefined) {return Img1;} else {return false;}

		case  9:    //回歸BUTTON 下
			rbm.keepScreenshotPartial( 463, 1065, 547, 1120);  //(用太多蛋蛋)
			var Img1 = rbm.findImage('goback2.png', 0.90);
			rbm.releaseScreenshot();
			if (Img1 != undefined) {rbm.log('goback2:', Img1);}
			if (Img1 != undefined) {return Img1;} else {return false;}
			
		case 10:    //回歸確認BUTTON
			rbm.keepScreenshotPartial( 327, 911, 401, 959);  //(用太多蛋蛋)
			var Img1 = rbm.findImage('ok.png', 0.90);
			rbm.releaseScreenshot();
			if (Img1 != undefined) {rbm.log('ok:', Img1);}
			if (Img1 != undefined) {return Img1;} else {return false;}
			
		case 11:    //看廣告 x2 加速
			rbm.keepScreenshotPartial( 525, 543, 574, 588);  //(用太多蛋蛋)
			var Img1 = rbm.findImage('watchADbutton2.png', 0.90);
			rbm.releaseScreenshot();
			if (Img1 != undefined) {rbm.log('watchADbutton2:', Img1);}
			if (Img1 != undefined) {return Img1;} else {return false;}
			
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

function autoStuck() {  //  卡關自動判斷式
	if (!config.isRunning) return false;
	
	if (stage > 0 && stage < autoMinSw) {
		//console.log('Stage:', stage, ', 未達卡關檢查關卡', autoMinSw);
		return false;
	}
	
	var errorMin = -15;
	var errorMax =  15;
	
	if (stage  > 0) {
		for (var i = 1; i <= 2; i++){ 
			if (autoStuckstage[i] == 0) {
				autoStuckstage[i] = stage;
				return autoStuckstage[0];
			}
		}
		
		var stageDi = stage - autoStuckstage[2]
		
		if (stageDi < errorMin || stageDi > errorMax) {
			//console.log('關卡辯識異常');
		}
		else if (stageDi > 0) {
			//console.log(autoStuckstage[2], '→', stage, '關卡前進', '，被擊退:', autoStuckstage[0], '/', autoStuckSw);
			autoStuckstage[1] = autoStuckstage[2];
			autoStuckstage[2] = stage;
			autoStuckstage[0] = 0;
			stageStucktime[0] = Date.now();
			ScreenErrorTime1 = Date.now()
			// stoptime[1] = 0;
		}
		else if (stageDi == 0) {
			//console.log(autoStuckstage[2], '→', stage, '關卡不變', '，被擊退:', autoStuckstage[0], '/', autoStuckSw);
			stageStucktime[0] = 0;
			stageStucktime[1] = Date.now() - stageStucktime[0];

		}
		else if (stageDi < 0) {
			//console.log(autoStuckstage[2], '→', stage, '關卡退後', '，被擊退:', autoStuckstage[0], '/', autoStuckSw);
			autoStuckstage[0] = autoStuckstage[0] + 1;
			ScreenErrorTime1 = Date.now()
			// stoptime[1] = 0;
		}
	}
	//console.log('擊退次數:', autoStuckstage[0], '/', autoStuckSw)
	
	return autoStuckstage[0];
}

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

function powerTap() {
	if (!config.isRunning) return false;
	if (!useReturn(4)) return false;
	console.log('powerTap');

	if (useReturn(6)) {swipFor(422, 58, 1, 60, 60, 100); }   //開啟自動boss

	for (var i = 1; i <= 4; i++) {
		var pwcolor = checkPointcolor(596, 1058, 30, 'D2D0CC')
		// console.log('pwcolor:', pwcolor);
		if (pwcolor) { swipFor(210, 870, 5, 10, 40, 50); }
		else break;
		// sleep(100);
	}
	return true;
}

function randTapskill(Timer) {
	if (!config.isRunning || Date.now() < randTapskillTimer) return false;
	if (!useReturn(4)) return false;

	console.log('randTapskill');

	// var ranDelay = 1200 + getRandom(-300, 300);
	// sleep(ranDelay);
	for (var i = 0; i <= 2; i++) {
		intxR = skillX[i] + getRandom(-15, 15);
		intyR = 1130 + getRandom(-15, 15);
		swipFor(intxR, intyR, 1, 10, 100, 200);
		// skillcode = (skillcode + 1) % 3 
	}
	randTapskillTimer = Date.now() + Timer * 1000;
}

function getQuestgold(Timer) {
	if (!config.isRunning || Date.now() < getQuestgoldTimer) return false;
	console.log('getQuestgold');

	rbm.keepScreenshotPartial( 58,  919, 74, 940);  //驚嘆號
	var Img1 = rbm.findImage('!.png', 0.90);
	rbm.releaseScreenshot();

	// if (Img1 != undefined) {rbm.log('getQuestgold:', Img1);}
	if (Img1 != undefined) {swipFor(Img1.x, Img1.y, 1, 50, 100, 2000);}

	rbm.keepScreenshotPartial( 532,  752, 635, 790);  //驚嘆號
	var Img1 = rbm.findImage('allgoldget.png', 0.90);
	rbm.releaseScreenshot();

	// if (Img1 != undefined) { rbm.log('allgoldget:', Img1); }
	if (Img1 != undefined) {
		swipFor(Img1.x, Img1.y, 1, 100, 300, 1500);
		swipFor(400, 840, 1, 80, 100, 200);
	}
	
	getQuestgoldTimer = Date.now() + Timer * 1000;
}


function buyPosition(Timer) {
	if (!config.isRunning || Date.now() < buyPositionTimer) return false;
	console.log('商店買藥水');

	rbm.keepScreenshotPartial( 573,  25, 635, 75);  //(商店圖示)
	var Img1 = rbm.findImage('store.png', 0.95);
	rbm.releaseScreenshot();

	// if (Img1 != undefined) { rbm.log('store:', Img1); }
	if (Img1 != undefined) {swipFor(580, 30, 1, 100, 100, 500);}


	rbm.keepScreenshotPartial( 195,  930, 240, 970);  //(商店圖示)
	var Img1 = rbm.findImage('store_coin.png', 0.95);
	rbm.releaseScreenshot();
	
	// if (Img1 != undefined) {rbm.log('store_coin:', Img1);}
	if (Img1 != undefined) {
		swipFor(240, 950, 4, 70, 150, 100);
		swipFor( 80, 950, 2, 70, 150, 100);
		keycode('BACK', 600);
	}
	
	buyPositionTimer =  Date.now() + Timer * 1000;
}

function getMagic(lvmin, lvmax, Timer) {   //賣物品
	if (!config.isRunning || Date.now() < sellItemTimer) return false;

	for (var i = lvmin; i <= lvmax; i++) {
		rbm.keepScreenshotPartial( 328, 630, 592, 1032);  //找武器，等級i
		var results = rbm.findImages('EquementLv_' + i + '.png', 0.980, 9, true, false);
		rbm.releaseScreenshot();
	
		// if (results != '')  {rbm.log('EquementLv', i, Object.keys(results).length);}
		if (results != '')  {

			for (var index in results) {
				if (!config.isRunning) return false;
				var result = results[index];
				// rbm.log('result:', result);
				swipFor(result.x + 5, result.y, 1, 100, 200, 800);
				
				rbm.keepScreenshotPartial( 24,  972, 302, 1026);  //找魔力取出按鈕
				var Img1 = rbm.findImage('magicget.png', 0.90);
				rbm.releaseScreenshot();	

				// if (Img1 != undefined) {rbm.log('magicget:', Img1);}
				if (Img1 != undefined) {swipFor(Img1.x, Img1.y, 3, 100, 200, 500);}
			}
		}
	}

	sellItemTimer =  Date.now() + Timer * 1000;
}

function clearnBag(Timer) {
	if (!config.isRunning || Date.now() < clearnBagTimer) return false;
	if (!useReturn(1)) return false;
	console.log('清包包-魔力取得');
	
	swipFor(220, 1140, 1, 80, 80, 1000);
	var getMag = getMagic2(1, 3, 6);
	if (getMag) {keycode('BACK', 400);}

	clearnBagTimer =  Date.now() + Timer * 1000;
}

function getMagic2(lvmin, lvmax, items) {   //賣物品
	if (!config.isRunning) return false;
	if (!useReturn(8)) return false;

	swipFor(696, 1003, 1, 80, 80, 700);
	for (var i = lvmin; i <= lvmax; i++) {
		for (var j = 1; j <= items; j++) {
			if (!config.isRunning) return false;

			rbm.keepScreenshotPartial( 328, 830, 595, 1032);  //找武器，等級i
			var Img2 = rbm.findImage('EquementLv_' + i + '.png', 0.987);
			rbm.releaseScreenshot();
		
			// if (Img2 != undefined)  {rbm.log('EquementLv:', i, j, Img2);}
			if (Img2 != undefined)  {
				swipFor(Img2.x + 15, Img2.y, 1, 100, 100, 500);

				rbm.keepScreenshotPartial( 28,  634, 58, 665);  //找魔力取出按鈕
				var Img3 = rbm.findImage('unlockmark.png', 0.95);
				rbm.releaseScreenshot();

				// if (Img3 != undefined) {rbm.log('unlockmark:', Img3);}
				if (Img3 != undefined) {
					rbm.keepScreenshotPartial( 24,  972, 302, 1026);  //找魔力取出按鈕
					var Img1 = rbm.findImage('magicget.png', 0.95);
					rbm.releaseScreenshot();

					// if (Img1 != undefined) {rbm.log('magicget:', Img1);}
					if (Img1 != undefined) {swipFor(Img1.x, Img1.y, 3, 80, 200, 300);}
				}
			} else {break;}

			sleep(300);
		}
		sleep(300);
	}
	return true;
}

function lvmaxHero(Timer) {
	if (!config.isRunning || Date.now() < lvmaxHeroTimer) return false;
	if (!useReturn(1)) return false;
	console.log('英雄升級max');
	
	swipFor(70, 1140, 1, 80, 80, 1000);
	if (useReturn(8)) {
		swipFor(260, 1000, 2, 80, 100, 300);
		keycode('BACK', 400);
	}

	lvmaxHeroTimer =  Date.now() + Timer * 1000;
}

// ===========================================================

function mergerdragon2(lvmin, lvmax, Timer) {
	if (!config.isRunning || Date.now() < mergerdragonTimer) return false;
	console.log('mergerdragon2');

	// 201,994  570,1222  範圍
	// 370,1110
	// 530,900  定點
	rbm.keepScreenshotPartial( 201, 994, 570, 1275);  //找龍
	// var image = getScreenshotModify(201, 994, 570-201, 1275-994, 570-201, 1275-994, 100);
	for (var i = lvmin; i <= lvmax; i++) {
		if (!config.isRunning) return false;

		var results = rbm.findImages('dragonLV_0' + i + '.png', 0.90, 3, true, false);
	
		// if (results != '')  {rbm.log('dragonLV_0', i, Object.keys(results).length);}
		if (results != '')  {

			for (var index in results) {
				if (!config.isRunning) return false;
				if (!useReturn(1)) return false;

				var result = results[index];
				rbm.log('dragonLV_0' + i + '.png:', result);
				var x0 = result.x;
				var y0 = result.y;
				if (y0 > 990) {DIY_swipe(x0, y0, 360, 980, 20, 200);}
				else {
					// saveImage(image, "/sdcard/Robotmon/test.png");
					console.log('y0 <= 990 : 不移動。')
				}

				// var mergerI = index % 2
				// if (mergerI == 0) {
				// 	var x0 = result.x;
				// 	var y0 = result.y;
				// } else if (mergerI == 1) {
				// 	var x1 = result.x;
				// 	var y1 = result.y;
				// 	DIY_swipe(x1, y1, x0, y0, 50, 1000);
			}
		}
	}
	// releaseImage(image);
	rbm.releaseScreenshot();
	
	mergerdragonTimer =  Date.now() + Timer * 1000;
}

function dragonsdot() {
	if (!config.isRunning) return false;

	rbm.keepScreenshotPartial( 299, 1216, 421, 1248);  //找武器，等級i
	var results = rbm.findImages('dragons_dot3.png', 0.85, 12, true, false);
	rbm.releaseScreenshot();
	var length = Object.keys(results).length;

	if (results != '')  {rbm.log('dragons_dot3:', length);}
	if (results != '')  {return length}
}

function tapEgg(Timer) {
	if (!config.isRunning || Date.now() < tapEggTimer) return false;
	console.log('Tap Egg')

	var dots = dragonsdot();
	var nondots = 13 - dots;
	if (nondots > 3) nondots = 5;
	if (nondots > 0) {swipFor(645, 1200, nondots, 60, 100, 200);}
	
	tapEggTimer =  Date.now() + Timer * 1000;
}

function tapBox2(Timer) {
	if (!config.isRunning || Date.now() < tapBoxTimer) return false;
	console.log('Tap Box 2')

	var boxname = ['', 'box_01.png', 'box_02.png', 'box_03.png'];

	rbm.keepScreenshotPartial( 628,  1004, 673, 1068);  //找魔力取出按鈕
	for (var i = 1; i<= 3; i++) {
		var Img1 = rbm.findImage(boxname[i], 0.85);
		if (Img1 != undefined) break;
	}
	rbm.releaseScreenshot();

	if (Img1 != undefined) {rbm.log(boxname[i] + ':', Img1);}
	if (Img1 != undefined) {swipFor(Img1.x, Img1.y, 1, 100, 200, 500);}
	
	tapBoxTimer =  Date.now() + Timer * 1000;
}

function ranSwiptap(Timer) {
	if (!config.isRunning || Date.now() < ranSwiptapTimer) return false;

	//360,960
	var dots = dragonsdot();
	if(dots >= 8) {
		var randXY = getRandom(100, 130);
		var x0 = 360 + randXY;
		var y0 = 960 + randXY;
		if (ranmove == 1) {
			for (var i = 1; i <= 7; i++) {
				if (!config.isRunning) return false;
				if (!useReturn(1)) return false;
				DIY_swipe(360, 960, x0, y0, 20, 200);
			}
			ranmove = 2;
		} else if (ranmove == 2) {	
			for (var i = 1; i <= 7; i++) {
				if (!config.isRunning) return false;
				if (!useReturn(1)) return false;
				DIY_swipe(x0, y0, 360, 960, 20, 200);
			}
			ranmove = 1;
		}
	}
	ranSwiptapTimer =  Date.now() + Timer * 1000;

}

function getADraward(Timer) {
	if (!config.isRunning || Date.now() < getADrawardTimer) return false;
	console.log('getADraward');

	var timeup = 0;
	for (var i = 1; i <= 6; i++) {
		rbm.keepScreenshotPartial( 587,  1269, 592, 1276);  //蛋蛋時間黃色
		var Img1 = rbm.findImage('eggyellow.png', 0.90);
		if (Img1 == undefined) {Img1 =  rbm.findImage('eggyellow2.png', 0.90);}
		rbm.releaseScreenshot();	

		if (Img1 != undefined) { rbm.log('getADraward:', Img1, ', timeup:', timeup); }
		if (Img1 != undefined) {
			swipFor(670, 500, 1, 50, 100, 500);
			timeup = 1;
		} else if (timeup == 1) {
			var adOK = waitAD2(55);
			break;
		}

		sleep(150);
	}

	getADrawardTimer = Date.now() + Timer * 1000;
}

function waitAD2(timer) {
	if (!config.isRunning) return false;
	console.log('等待廣告');
	
	a = 0;
	for (var i = 1; i <= timer; i++){
		if (!config.isRunning) return false;
		
		var sizeObj = getScreenSize();

		if (sizeObj.width == 720) {

			if ( i >= 1) {
				var watchADbtn = useReturn(11);
				var ADbtnscore = watchADbtn.score;
				if (ADbtnscore > 0.95) {                                //按看廣告2
					swipFor(540, 560, 1, 50, 100, 100);
				} else if (ADbtnscore > 0.90 && ADbtnscore < 0.95) {    //無廣告退出
					swipFor(360, 1090, 1, 50, 100, 100); return false;
				}
			}

			if (i >= 4) {
				var mainpage = useReturn(1); //主畫面書本圖示
				if (mainpage) {
					a = a + 1;
					if (i < 10 && a >= 10) {console.log('選單鈕，出現10秒，異常'); return false;}
					else if (i > 10 && a >=  4) {console.log('選單鈕，出現 5秒，回到遊戲'); return false;}
				} else {
					a = 0;
					var stoptime1 = ScreenStopTimes( 180, 270, 590, 860, 0.999, 'checkADstop.png', 1)
					// console.log('stoptime1:', stoptime1)
					if (stoptime1 >= 3 || i >= 35) {
						console.log('廣告結束，畫面停3秒，回遊戲');
						keycode('BACK', 200);
						stoptime1 = 0;
					}

					if (useReturn(5)) {swipFor(200, 750, 1, 50, 100, 100);}	 //離開遊戲按取消
					// if (useReturn(4)) {swipFor(150, 970, 1, 50, 100, 100);}  //按看廣告1
					// if (useReturn(11)) {swipFor(540, 560, 1, 50, 100, 100);}  //按看廣告1

					CkImgSwip(300,  570, 430,  700, 0.98, 'playAD.png',    1, 1, 1, 300, 1, 0);      //點擊播放廣告
					CkImgSwip(500, 1050, 720, 1280, 0.98, 'skipAD01.png',  1, 1, 1, 300, 1, 0);      //點擊右下略過廣告(中字)
					CkImgSwip(440,  660, 610,  750, 0.98, 'KPwatchAD.png', 1, 1, 1, 3000, 1, 0);     //點擊繼續看廣告
					CkImgSwip(440,  660, 610,  750, 0.98, 'KPwatchAD2.png', 1, 1, 1, 3000, 1, 0);     //點擊繼續看廣告2
					CkImgSwip(579,   12, 704,   44, 0.99, 'AD_rightup_01.png', 1,  1, 1, 300, 0, 0);   //右上叉叉01
					CkImgSwip(  0,    0, 110,   80, 0.98, 'AD_XX_03.png', 1,  1, 1, 3000, 1, 0);     //廣告結束，左上叉叉
					CkImgSwip(  0,    0, 110,   80, 0.98, 'AD_XX_04.png',   1,  1, 1, 3000, 1, 0);     //廣告結束，左上叉叉
				}
			}
			
			if (i >= 50) {
				console.log('畫面轉向，計時 = ' + i, '回桌面，再回遊戲，切廣告')
				keycode('HOME', 300); sleep(5000);
				rbm.startApp(config.PackangName,config.LaunchActivityName);
				sleep(3000);
			} else if (i >= 40) {
				console.log('畫面轉向，計時 = ' + i, '按 BACK，切廣告')
				keycode('BACK', 200); sleep(500);
			}
		}

		sleep(900);
		console.log('Wait Time: ', i, '/', timer, ', stoptime1:', stoptime1);
	}
}

function goback(attrib, Timer) {
	if (!config.isRunning || Date.now() < gobackTimer) return false;
	if (!gamereturn) return false;
	if (returnattrib == 0) return false;
	console.log('回歸檢查');

	var goback1 = useReturn(8);
	var goback2 = useReturn(9);

	if (goback1.x > 0 || goback2.x > 0) {
		for (var i = 1; i <= 20; i++) {
			console.log('回歸檢查成立', i);
			if (goback1.x > 0) {swipFor(goback1.x, goback1.y, 1, 80, 100, 1000);}
			if (goback2.x > 0) {swipFor(goback2.x, goback2.y, 1, 80, 100, 1000);}

			var gobackok = useReturn(10);
			if (gobackok.x > 0) {swipFor(gobackok.x, gobackok.y, 1, 80, 100, 1000);}

			var backatt = backattrib(attrib); //選回歸屬性  1:中  2:木  3:火  4:水
			if (backatt) break;
			goback1 = useReturn(8);
			goback2 = useReturn(9);

			sleep(1000);
		}
	}
	
	gobackTimer = Date.now() + Timer * 1000;
}

function backattrib(att) {   //回歸屬性選擇  1:中  2:木  3:火  4:水
	if (!config.isRunning) return false;
	console.log('回歸屬性選擇');

	var attribstr = ['', '中', '木', '火', '水']

	if (useReturn(2)) {
		for (var i = 1; i <= 5; i++) {
			if (!config.isRunning) return false;
			
			rbm.keepScreenshotPartial( 415, 755, 570, 915);  //(選擇回歸屬性)
			var Img1 = rbm.findImage('attrib_' + att + '.png', 0.90);
			rbm.releaseScreenshot();

			if (Img1 != undefined) {rbm.log('FIND attrib_' + att + '.png', Img1);}
			if (Img1 != undefined) {
				console.log('找到目標屬性:', attribstr[att], '屬性')
				swipFor(Img1.x - 20, Img1.y + 80, 1, 50, 100, 100);
				return true;
			} else {
				DIY_swipe(670, 760, 670, 1070, 100, 1000);
			}
			
			sleep(500);
		}
	}
	return false;
}

function debug(Timer){       //異常檢查檢查
	if (Timer == 0) debugTimer = 0;
	if (!config.isRunning || Date.now() < debugTimer) return false;
	console.log('debug檢查');

	if (useReturn(1)) {
		mainError = 0;
		
		if (useReturn(3)) {swipFor(540, 950, 1, 50, 100, 100);}	 //蛋蛋用太多

	} else {
		backattrib(3); //選回歸屬性  1:中  2:木  3:火  4:水

		if (useReturn(5)) {swipFor(200, 750, 1, 50, 100, 100);}	 //離開遊戲按取消

		var closebox = useReturn(6);  //關叉叉
		if (closebox.x > 0){swipFor(closebox.x, closebox.y, 1, 50, 100, 100);}

		if (mainError >= 10) {
			console.log('不在主畫面 ' + mainError + ' 次，按退回');
			keycode('BACK', 200); sleep(1000);
		}
	}

	debugTimer =  Date.now() + Timer * 1000;
}

function Donnylog() {
	
	
}

function main(){       //主流程
	if (!config.isRunning) return false;
	var s = 400

	// console.log('main 確認畫面');
	var mainBook = useReturn(1);

	if (mainBook) {              // 主畫面檢查，右上紅寶石
		mergerdragon2(1, 2, 0);  // 合成1~2級龍
		mergerdragon2(1, 4, 5);  // 合成1~4級龍
		tapBox2(3);              // 檢查寶箱來點
		tapEgg(8);               // 檢查蛋蛋來點
		ranSwiptap(12);          // 中間的龍向右下再拉回 (360, 960)

		getADraward(90)          //檢查蛋蛋黃色
		goback(returnattrib, 8);

		mainError = 0;
	}  else { 
		mainError = mainError + 1; 
		console.log('不在主畫面:', mainError);

		if (mainError >= 15) {
			console.log('沒有主畫面 25次，重啟遊戲');
			// RestartApp(20);
			mainError = 0;
		}

		sleep(1000);
	}

	goback(returnattrib, 8);

	// console.log('main Debug檢查')
	debug(20);               //Debug檢查

	sleep(500);             // 所有間格 500毫秒
}

function setFirstTimer() {   //預設值設定
	tapBoxTimer       = Date.now() +   1 * 1000;
	mergerdragonTimer = Date.now() +   1 * 1000;
	tapEggTimer       = Date.now() +   5 * 1000;
	ranSwiptapTimer   = Date.now() +   5 * 1000;
	getADrawardTimer  = Date.now() +   3 * 1000;
	debugTimer        = Date.now() +   5 * 1000;
	checkScreenTimer  = Date.now() +   5 * 1000;  //畫面停止檢查用，不可刪
	gobackTimer       = Date.now() +   5 * 1000;

	ranmove = 1;

	ScreenTimer  = Date.now() +   5 * 1000;
	
	stoptime       = new Array( '', 0, 0, 0, 0, 0, 0);
	autoStuckstage = new Array(  0, 0, 0, 0, 0, 0, 0);
	stageStucktime = new Array(  0, 0, 0, 0, 0, 0, 0);
	ADtimeout      = new Array( -1, -1, -1, -1, -1, -1, -1);
	lvupTaps       = new Array( '', 20, 10, 5, 3);

	skillX = [340, 440, 540];
	skillcode = 0;
	mainError = 0;
	rbm.screencrop('checkADstop.png', 180, 270, 590, 860);
}

function setFirstsetting() {
	gamereturn = 1;   //回歸開關
	returnattrib = 1; //回歸屬性選擇
	
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
			console.log('n = ', n, ', CRA 腳本開始');

			while(config.isRunning) {main();}
			// console.log('n = ', n, ', CRA 腳本結束');
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

// ./adb -s emulator-5558 shell ps | grep app_
// ./bin/adb shell kill -9 2552