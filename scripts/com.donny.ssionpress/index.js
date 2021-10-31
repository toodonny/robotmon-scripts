importJS('RBM-0.0.3');

// ============================idlerpg=============================== //

var config = {
  appName: 'com.donny.ssionpress',
  oriScreenWidth: 1280, // source
  oriScreenHeight: 720,
  oriVirtualButtonHeight: 0,
  oriResizeFactor: 1, 
  eventDelay: 50,
  imageThreshold: 1,
  imageQuality: 100,
  resizeFactor: 1, // small -> quickly
  scriptDir: 'scripts/com.donny.ssionpress/images',
  fullPath: getStoragePath() + '/scripts/com.donny.ssionpress/images',
  isRunning: false,
  PackangName: 'com.itamgames.dungeon_princess',
  LaunchActivityName: 'com.google.firebase.MessagingUnityPlayerActivity',
};

// 應用:Dungeon Princess
// 包名:com.itamgames.dungeon_princess
// 啟動類:com.google.firebase.MessagingUnityPlayerActivity

//應用:Dungeon Princess!
//包名:com.ssicosm.dungeon_princess_ad
//啟動類:com.unity3d.player.UnityPlayerActivity

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
	// rbm.log('orgpoint:', {b:checkb, g:checkg, r:checkr})
	// rbm.log('getpoint:', getpoint);
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

	var WidthF = 1.0;
	var HeightF = 1.0;
	var cropWidth = finX - intX;
	var cropHeight = finY - intY;
	var resizeWidth = cropWidth * WidthF;
	var resizeHeight = cropHeight * HeightF;

	var getScreen = getScreenshotModify(intX, intY, cropWidth, cropHeight, resizeWidth, resizeHeight, 100);
	var filename = config.fullPath + '/' + ImageName;
	var Img = openImage(filename);
	var target = findImage(getScreen, Img);
	releaseImage(getScreen);
	releaseImage(Img);

	if (target != undefined && target.score > Siml) {
		target.score = target.score.toFixed(4)
		target.x2 = Math.round((intX + target.x)*WidthF);
		target.y2 = Math.round((intY + target.y)*HeightF);
		target.result = true;
	} else {target.result = false;}

	if (mesg == undefined) {mesg = 0;}
	if (mesg == 1) {
		if (target.result){rbm.log(ImageName + ':', target);} 
		else if (!target.result){rbm.log(ImageName + ':', 'undefined');}
	}
	if (Taptype == 2) {return target.result;}

	if (!target.result) return false;
	for (var i = 0; i < TapTimes; i++) {
		if (!config.isRunning) return false;
		if (target.result) {
			if (Taptype == 0) {tap(TapX, TapY, 50);}
			else if (Taptype == 1) {tap(target.x2, target.y2, 50);}
			sleep(Delay1)
		}
	}
}

function rbmCheckImageTap(intX, intY, finX, finY, Siml, ImageName, TapX, TapY, TapTimes, Delay1, Taptype, mesg) {  //Taptype:  0:Tap X,Y, 1:tapImage, 2:return 
	if (!config.isRunning) return false;

	rbm.keepScreenshotPartial(intX, intY, finX, finY); // x1, y1, x2, y2
	var targetImag = rbm.imageExists(ImageName, Siml);
	var targetImg1 = rbm.findImage(ImageName, Siml);
	rbm.releaseScreenshot();

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
	var PicSharePath = '/storage/emulated/legacy/Pictures/CTA';
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
		console.log('畫面相似', targetImg.score.toFixed(5), '/', siml, ', ', ScreenErrorTime2/1000, 'sec');
	}
	checkScreenTimer = Date.now() + Timer * 1000
	
	return ScreenErrorTime2 / 1000
}

function usingTimeString(startTime) {
  return '循環時間：' + (Date.now() - startTime) + 'ms';
}

//==============================功能性function=====================================//

function useReturn(choiceF){          //各項回授點檢查 
	if (!config.isRunning) return false;
	//console.log('各項升級限制條件');
	
	switch (choiceF) {
		case  1: return CheckImageTap( 625,   10, 710,   70, 0.95, 'mainpagebutton.png', 1, 1, 1, 50, 2);    return;   //右上功能圖示 OK
		case  2: return CheckImageTap( 170,   10, 220,   50, 0.95, 'speedx2.png', 1, 1, 1, 50, 2);           return;   //檢查2倍速圖示 OK
		case  3: return CheckImageTap( 310,  590, 410,  690, 0.85, 'ADbox.png', 1, 1, 1, 50, 2);             return;   //檢查寶箱看廣告  OK
		case  4: return CheckImageTap(   0,  580, 110,  820, 0.85, 'speedX2icon.png', 1, 1, 1, 50, 2);       return;   //2倍速選單圖示 OK
		case  5: return CheckImageTap( 220,  560, 360,  700, 0.85, 'herostore_str.png', 1, 1, 1, 50, 2);     return;   //英雄商店文字
		case  6: return CheckImageTap( 220,  600, 340,  700, 0.85, 'lvupallhero2.png', 1, 1, 1, 50, 2);      return;   //英雄頁面全英雄升級文字
		case  7: return CheckImageTap( 240,  600, 400,  700, 0.85, 'lvupallhero.png', 1, 1, 1, 50, 2);       return;   //英雄頁面全英雄升級文字 Y差 +60 ok
		case  8: return CheckImageTap( 110, 1210, 310, 1280, 0.85, 'guildChaticon.png', 1, 1, 1, 50, 2);     return;   //工會聊天室圖示
		case  9: return CheckImageTap( 270,   60, 500,  375, 0.85, 'dailystr.png', 1, 1, 1, 50, 2);          return;   //每日獎勵字樣
		
		case 10: return CheckImageTap( 550,  800, 700,  880, 0.85, 'timeplaying.png', 1, 1, 1, 50, 2);       return;   //看廣告金幣(開啟)
		case 11: return CheckImageTap( 650,   20, 700,   65, 0.85, 'ADdebug1.png', 1, 1, 1, 50, 2);          return;   //廣告右上固定
		case 12: return CheckImageTap( 680,    0, 720,   33, 0.85, 'AD_XX_01.png', 1, 1, 1, 50, 2);          return;   //AD_XX_01
		
		case 13: return CheckImageTap( 270,  510, 380,  560, 0.85, 'herobookicon.png', 1, 1, 1, 50, 2);      return;   //英雄冊文字
		case 14: return CheckImageTap(  25, 1180, 160, 1280, 0.85, 'herowepon.png', 1, 1, 1, 50, 2);         return;   //英雄冊文字
		
		case 21: return CheckImageTap(  45,  530, 110,  590, 0.80, 'retreatBoss02.png', 1, 1, 1, 50, 2);       return;  //BOSS戰鬥，撤退鈕
		case 22: return CheckImageTap( 135,  510, 560,  560, 0.80, 'bossticks.png', 1, 1, 1, 50, 2);         return;  //地城BOSS選關(門票字樣)
		case 23: return CheckImageTap2( 220, 510, 390,  560, 0.95, 'bossticks_0.png', 'bossticks2_0.png', 1, 1, 1, 50, 2);   return;  //地城BOSS票=0
		case 24: return CheckImageTap( 480,  610, 610,  660, 0.96, 'spdongeon_0_2.png', 1, 1, 1, 50, 2, 0);       return;  //活動BOSS票=0 //地城BOSS票=0
		case 25: return CheckImageTap(  15,  510,  90,  570, 0.95, 'backarry2.png', 1, 1, 1, 50, 2);             return;  //
		
		
		case 26: return CheckImageTap( 640,  200, 700,  260, 0.95, 'exped_help.png', 1, 1, 1, 50, 2);        return;  //遠征問號圖示
		case 27: return CheckImageTap( 230,   10, 290,   60, 0.95, 'blitz_Bcoin.png', 1, 1, 1, 50, 2);       return;  //突襲幣圖示
		case 28: return CheckImageTap( 230,   10, 290,   60, 0.95, 'arena_Acoin.png', 1, 1, 1, 50, 2);        return;  //競技幣圖示
		
		
		case 30: return CheckImageTap( 170, 1030, 320, 1180, 0.90, 'robotplant.png', 1, 1, 1, 50, 2);        return;  //機器人工廠字樣-底部
		case 31: return CheckImageTap( 170,  580, 320, 1180, 0.90, 'robotplant.png', 1, 1, 1, 50, 2);        return;  //機器人工廠字樣-全列表
		case 32: return CheckImageTap(  20, 1080,  85, 1180, 0.90, 'robotplantpic.png', 1, 1, 1, 50, 2);     return;  //機器人工廠圖-全列表
		case 33: return CheckImageTap(  20,  680,  85, 1180, 0.90, 'robotplantpic.png', 1, 1, 1, 50, 2);     return;  //機器人工廠圖-底部
		case 34: return CheckImageTap(   5, 1070,  55, 1190, 0.90, 'robotplantpicauto.png', 1, 1, 1, 50, 2); return;  //機器人工廠圖-底部-開自動
		
		case 40: return CheckImageTap( 330,  170, 390,  250, 0.90, 'reincarnationicon.png', 1, 1, 1, 50, 2); return;  //輪迴畫面中上圖示
		case 41: return CheckImageTap( 270,  980, 450, 1050, 0.90, 'reincarnationNG.png', 1, 1, 1, 50, 2);   return;  //未滿140關提示
		case 42: return CheckImageTap2( 60, 180, 650,  820, 0.90, 'ascending_prismicon2.png', 'ascending_goldicon2.png', 1, 1, 1, 50, 2, 1);   return;  //輪回畫面確認
		
		case 50: return checkPointcolor3(360, 640, 40, '00BEFF', 360, 660, 40, 'FFFFFF', 360, 760, 40, '6D370C'); return;   //看box廣告圖示點 ok
		// case 51: return checkPointcolor3(286, 513, 50, '0091E0', 290, 513, 50, '003067', 300, 513, 50, '305985'); return;   //物品數量小G 新版y差+20 ok
		// case 52: return checkPointcolor3( 15, 515, 50, '0168A5', 125, 515, 50, 'B31B0F', 240, 515, 50, '45681F'); return;   //材料地下城材料清單 新版y差+20 ok
		
		// case 50: return checkPointcolor3(360, 640, 40, '00BEFF', 360, 660, 40, 'FFFFFF', 360, 760, 40, '6D370C'); return;   //看box廣告圖示點 ok
		case 51: 
			
			rbm.keepScreenshotPartial( 0,  490,  710,  560);
			var Img1 = rbm.findImage('list_F_icon2.png', 0.90);        //中間圖示 F 
			var Img2 = rbm.findImage('list_water_icon2.png', 0.90);    //中間圖示 水
			// rbm.log('list_F_icon2:', Img1);
			// rbm.log('list_water_icon2:', Img2);
			rbm.releaseScreenshot();

			if(Img1 == undefined && Img2 == undefined){return false}
			return true


		// case 61: return checkPointcolor3( 42, 435, 50, 'FFA800',  51, 432, 50, 'FFA800',  51, 440, 50, 'FFA800'); return;   //對話頻道橘色驚嘆號
		
		case 61: return CheckImageTap( 30,  440, 64,  474, 0.90, 'guildeventicon.png', 1, 1, 1, 50, 2);       return;   //對話頻道橘色驚嘆號
		
		case 81: return CheckImageTap( 300,  340, 415,  380, 0.90, 'areafightchoice.png', 1, 1, 1, 50, 2);       return;   //競技場挑戰對手文字
		case 82: return CheckImageTap( 390,   70, 440,  140, 0.90, 'arena_rest.png', 1, 1, 1, 50, 2);            return;   //競技場商店文字，當日停戰
		
		//case 91: return CheckImageTap( 660,    0, 720,   60, 0.90, 'guildbosshelpRU.png', 1, 1, 1, 50, 2);       return;   //工會BOSS,右上?圖
		case 91: return CheckImageTap( 600,    0, 720,   60, 0.90, 'guildbosshelpRY.png', 1, 1, 1, 50, 2);       return;   //工會BOSS,右上?圖
		
	}
}

function recoNum(choiceF) {        //各項數字辨識
	if (!config.isRunning) return false;
	//console.log('各項數字辨識', choiceF);
	
	switch (choiceF) {
		case  1: return	num_Recognition(320, 16, 395, 50, 0.85, 'num_Reco/idle_stage_num/idle_stage_num3_'); break;  //關卡數
		case  2:
			//每日地城目前票數
			rbm.keepScreenshotPartial(180, 540, 370, 570);  //Indentification Ticks
			var targetImg = rbm.findImage('num_Reco/dalydueng_num/dalyduengtick1_num_-.png', 0.90);
			rbm.releaseScreenshot();
			// if(targetImg != undefined) {rbm.log(targetImg);}
			if (targetImg != undefined && targetImg.score >= 0.90) {
				// rbm.log(9999, targetImg.x - 30, 525, targetImg.x, 545, 0.90)
				return num_Recognition(targetImg.x - 30, 540, targetImg.x, 570, 0.90, 'num_Reco/dalydueng_num/dalyduengtick1_num_');
			}		
			return -1;
			break;  //
		case  3: return num_Recognition(66, 690, 108, 704, 0.85, 'num_Reco/hero_lv_num/hero_magiclv_num_'); break;  //英雄1魔晶等級
		case  4: return num_Recognition(280, 490, 375, 540, 0.90, 'num_Reco/dalydueng_num/dalyduengtime_num_'); break;  //地牢計時
		
		case  5: 
			rbm.keepScreenshotPartial( 5,  580,  130,  1180);  //廣告金幣選單圖示
			var targetImg = rbm.findImage('ADgoldicon.png', 0.90);
			rbm.releaseScreenshot();
			
			if (targetImg != undefined && targetImg.score >= 0.90) {
				return num_Recognition(556, targetImg.y + 32, 636,  targetImg.y + 62, 0.90, 'num_Reco/goldADtime_num/goldADtime_num_');
			}		
			return -1;
			break;  //
		case  6: return num_Recognition(12, 1075, 85, 1095, 0.88, 'num_Reco/guildmedaltime_num/guildmedaltime_num_'); break;  //
		case  7: return ''; break;  //
		case  8: return ''; break;  //
		case  9: return ''; break;  //
		
		case 41: return num_Recognition(240, 480, 360, 510, 0.90, 'num_Reco/arena_num/arena_num_'); break;  //競技場第1位
		case 42: return num_Recognition(240, 628, 360, 658, 0.90, 'num_Reco/arena_num/arena_num_'); break;  //競技場第2位
		case 43: return num_Recognition(240, 776, 360, 806, 0.90, 'num_Reco/arena_num/arena_num_'); break;  //競技場第3位
		
	}
}

//=============================2020.07.10 Retest================================//

// -廣告獎勵-----
function getADBox() {   //寶箱廣告觀看 OK
	//if (!config.isRunning) return false;
	//if (!useReturn(51) && !useReturn(50)) return false;
	//if (!useReturn(50)) return false;
	console.log('寶箱廣告');

	for (var i = 1; i <= 3; i++){
		if (!config.isRunning) return false;
		
		sleep(200);
		if (useReturn(1)) {
			if (useReturn(3)) {
				for (var j = 1; j <= 3; j++){
					if (!config.isRunning) return false;
					//console.log(' AD box click', i, j);
					
					sleep(300);
					CheckImageTap( 310,  590, 410, 690, 0.90, 'ADbox.png', 1, 1, 2, 1000, 1);
				}
				
				waitAD(adtimesetSw);
				//getADGoldTimer =  getADGoldTimer + 30 * 1000;
			}
			else {
				return false;
			}
		}
	}
}

function getADSpeed() {  //看廣告拿2倍速 OK
	if (!config.isRunning) return false;
	if (!useReturn(51)) return false;
	//if (useReturn(2)) return false;
	console.log('檢查2倍速');
	CheckImageTap( 230, 22, 262, 43, 0.90, 'speedoff.png',    1, 1, 1, 200, 1, 0);  //加速關閉點on
	CheckImageTap( 651, 29, 687, 52, 0.85, 'upmenuclose.png', 1, 1, 1, 300, 1);  //右上功能圖示關閉
	var speedx2 = useReturn(2);
	for (var i = 1; i <= 8; i++){
		if (!config.isRunning) return false;
		//console.log(i, useReturn(1));
		
		sleep(200);
		// console.log('useReturn(1):', useReturn(1), ', usereturn(2):', useReturn(2));
		if (useReturn(1)) {
			if (!useReturn(2)) {
				choiceMenu(5);
				
				
				var x2Y = -1;
				for (var m = 1; m <= 10; m++){
					rbm.keepScreenshotPartial( 5,  580,  130,  1180);  //x2 + x3 倍速選單圖示
					var targetImg = rbm.findImage('speedX2icon.png', 0.90);
					//rbm.log('speedX2icon:', targetImg)
					rbm.releaseScreenshot();
					
					if (targetImg != undefined && targetImg.score >= 0.90){
						if (x2Y == -1) x2Y = targetImg.y;
						else if (x2Y != -1 && targetImg.y == x2Y) break;
						else if (x2Y != -1 && targetImg.y != x2Y) x2Y = -1;
					}
					sleep(150);
				}
				
				if (targetImg != undefined && targetImg.score >= 0.90) {
					for (var j = 1; j <= 3; j++){
						if (!config.isRunning) return false;
						//console.log(' speedx2AD click', j);
						
						var inY = targetImg.y - 20;
						var fiY = targetImg.y + 100;

						rbm.keepScreenshotPartial(  550,  inY, 710,  fiY);  //x2 + x3 倍速選單圖示
						var Img1 = rbm.findImage('timeplaying.png', 0.90);
						var Img2 = rbm.findImage('watchAD_dark.png', 0.90);
						var Img3 = rbm.findImage('watchAD.png', 0.90);
						var Img4 = rbm.findImage('openButton.png', 0.90);
						//rbm.log('Img1-timeplaying:', Img1)
						//rbm.log('Img2-watchAD_dark:', Img2)
						//rbm.log('Img3-watchAD:', Img3)
						//rbm.log('Img4-openButton:', Img4)
						rbm.releaseScreenshot();
						if (Img1 != undefined) {
							ADtimeout[0] = -1;
							return false;
						}		
						if (Img2 != undefined) {
							sleep(1000);
							if ( ADtimeout[0] == -1) {
								ADtimeout[0] = Date.now();
								ADtimeout[1] = (Date.now() - ADtimeout[0])/1000
								//console.log('ADtimeout[0]:', ADtimeout[0], ', ADtimeout[1]:', ADtimeout[1]);
							}
							else if ( ADtimeout[1] > 60) {
								console.log('卡看廣告:', ADtimeout[1], '/60 秒，重啟app');
								startApp(180, scrShotSw);
							}
							else if (ADtimeout[0] > 0 && ADtimeout[1] != -1) {
								ADtimeout[1] = (Date.now() - ADtimeout[0])/1000
								console.log('ADtimeout[0]:', ADtimeout[0], ', ADtimeout[1]:', ADtimeout[1]);
							}
							return false;
						}		
						if (Img3 != undefined) {
							tapFor(Img3.x, Img3.y, 3, 60, 300);
							ADtimeout[0] = -1;
							waitAD(adtimesetSw, false);
							getADGoldTimer =  getADGoldTimer + 30 * 1000;
						}		
						if (Img4 != undefined) {	
							tapFor(Img4.x, Img4.y, 1, 60, 300);	
							ADtimeout[0] = -1;
						}
						
						sleep(200);
					}
				}				
				else {
					DIY_swipe(480, 660, 480, 800, 40, 1500);
				}
			}
			else {
				return false;
			}
		}
	}
}

function getADGold(Timer) {  //看廣告拿金幣  OK
	if (!config.isRunning || Date.now() < getADGoldTimer) {return false;}
	if (!useReturn(2)) {return false;}
	if (!useReturn(51)) {return false;}　　　//物品數量小G
	console.log('檢查廣告拿金幣');

	for (var i = 1; i <= 3; i++){
		if (!config.isRunning) return false;
		
		sleep(200);
		if (useReturn(1)) {
			choiceMenu(5);
			
			rbm.keepScreenshotPartial( 5,  580,  130,  1180);  //廣告金幣選單圖示
			var targetImg = rbm.findImage('ADgoldicon.png', 0.90);
			rbm.releaseScreenshot();
			
			//rbm.log('ADgoldicon:',　targetImg);
			
			if (targetImg != undefined) {
				for (var j = 1; j <= 8; j++){
					if (!config.isRunning) return false;
					//console.log(' GoldAD click', i, j);
					
					var inY = targetImg.y;
					var fiY = targetImg.y + 120;
					//console.log(550,  inY, 710,  fiY)
					var waitTimer = CheckImageTap( 550,  inY, 710,  fiY, 0.90, 'timeplaying.png', 1, 1, 1, 50, 2); //看廣告金幣(開啟)
					if (waitTimer) {
						var waitStr = recoNum(5); //
						var nexttimer = Math.floor(waitStr/100) * 60 + parseInt((waitStr % 100) / 10) * 10 + parseInt(waitStr % 10); //	
						// console.log('waitStr:', recoNum(5), ', nexttimer:', nexttimer);
						console.log('廣告金幣，下次檢查時間:', nexttimer, '秒');
						getADGoldTimer =  Date.now() + nexttimer * 1000;
						return false;
					}
					CheckImageTap2(550, inY, 710, fiY, 0.80, 'watchAD.png', 'openButton.png', 1, 1, 1, 500, 1)
					
					sleep(200);
				}
				
				waitAD(adtimesetSw);
				getADGoldTimer =  Date.now() + Timer * 1000;
			}				
			else {
				DIY_swipe(480, 800, 480, 660, 40, 1500);
			}
		}
	}
}

function waitAD(timer, speedx2) {   // OK
	if (!config.isRunning) return false;
	if (speedx2 == undefined) var speedx2 = true;
	console.log('等待廣告', 'speedx2:', speedx2);
	
	a = 0;
	for (var i = 1; i <= timer; i++){
		if (!config.isRunning) return false;
		
		if (i > 5 && i < timer) {console.log(i, 'sec');}
		if (i >= timer - 10) {
			console.log('廣告觀看計時 = ' + i, '按BACK，切廣告')
			keycode('BACK', 1000);
		}
		// console.log('i:', i, ', timer:', timer);
		if (i >= timer) {
			console.log('廣告觀看計時 = ' + timer, '按HOME，切回遊戲')
			keycode('HOME', 200); sleep(200);
			keycode('HOME', 200); sleep(1000);
			// rbm.startApp(config.PackangName,config.LaunchActivityName);

			startApp(180, scrShotSw);
			sleep(1000);
		}

		var sizeObj = getScreenSize();
		if (sizeObj.width == 720 && i >= 5 && admodeSw == 2) {
			var stoptime1 = ScreenStopTimes( 180, 270, 590, 860, 0.999, 'checkADstop.png', 1, 1)
			if (stoptime1 >= 3 || i >= 35) {		
				// console.log(i, 'sec', 'stoptime1 >= 3 || i >= 35 , press key BACK' );
				console.log('廣告結束，畫面停3秒，回遊戲');
				keycode('BACK', 200); sleep(500);
				stoptime1 = 0;
			}
			  
			if (useReturn(1)){
				rbm.keepScreenshotPartial(260, 500, 450, 1180);  ///點擊獲取
				var Img = rbm.findImage('getButton.png', 0.90);
				rbm.releaseScreenshot();
				if (Img != undefined && Img.score >= 0.90) {
					console.log('出現獲取鈕，點擊跳出');
					sleep(300);
					tapFor(Img.x , Img.y, 3, 60, 200);
					return false;
				}
				
				a = a + 1;
				if (i < 10 && a >= 10) {console.log('選單鈕，出現10秒，異常'); return false;}
				else if (i > 10 && a >=  5) {console.log('選單鈕，出現 5秒，回到遊戲'); return false;}

				if (!speedx2 && useReturn(2)) {console.log('廣告 2倍速 完成');return false;}  //無加速變有加速判斷

				CheckImageTap(280, 490, 420,  540, 0.90,  'exitgame.png', 240, 830, 1, 500, 0, 1);    //取消退出遊戲		
				CheckImageTap(310, 600, 405, 1170, 0.90,  'OKbutton.png',   1,   1, 1, 500, 1, 1);    //確認鈕
			}
			else {
				a = 0;
				CheckImageTap(500,   0, 720,  530, 0.90, 'rightupXX.png',   1,   1, 1, 500, 1, 0);    //遊戲中右上的叉叉	
				CheckImageTap(100, 550, 500,  780, 0.99, 'AD_close_video_box.png',   1,   1, 1, 3500, 1, 0);    //遊戲繼續觀看廣告畫面
			}
		}
		sleep(700);
		//console.log('Wait Time: ', i, '/', timer);
	}
}

function choiceMenu(page) {  //主選單頁面   OK
	if (!config.isRunning) return false;
	if (!useReturn(51)) return false;
	// console.log('Choice Manu : ', page);
	
	var colorHEX = new Array( '', 'E0A85A', 'FBE194', 'FFFFFF', '2B1708', '')
	for (var i = 1; i <= 3; i++){
		if (!config.isRunning) return false;
		
		if (useReturn(1)) {
			if (page > 0) {
				var colorX = 20 + 106 * (page - 1);
				var colorY = 1210;
				// console.log('X:', colorX, ', Y:', colorY);
				var a = 0;
				for (var j = 1; j <= 10; j++){ 
					if (!config.isRunning) return false;
					// console.log('i:', i, ', j:', j, ', a:', a);
				
					checkPointcolorTap(colorX, colorY, 20, colorHEX[1], 0, 0, 1, 100, 1)
					if (checkPointcolor(colorX, colorY + 3, 20, colorHEX[2])) {
						a = a + 1;
						if (a >= 3) {return false }
					}
					sleep(100);
				}
			}
			else if (page == 0) {
				var colorX = 690; var colorY = 510;	var a = 0;
				for (var k = 1; k <= 10; k++){ 
					if (!config.isRunning) return false;
				
					checkPointcolorTap(colorX, colorY, 20, colorHEX[3], 0, 0, 1, 100, 1)
					if (checkPointcolor(colorX, colorY + 3, 20, colorHEX[4])) {
						a = a + 1;
						if (a >= 3) { return false }
					}
					sleep(200);
				}
			}
		}
		
		sleep(200);
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
		startApp(180, scrShotSw);
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

function startApp(Timer, scrShot) {   //重啟APP
	if (!config.isRunning) return false;
	console.log('RestartApp')
	
	if (scrShot) {ScreenShottoPath('CTA_Debug_');}

	keycode('HOME', 300);
	sleep(800)
	rbm.stopApp(config.PackangName); sleep(300);
	rbm.stopApp(config.PackangName); sleep(600);
	rbm.startApp(config.PackangName,config.LaunchActivityName);
	
	var a = 0;
	for (var i = 1; i < Timer; i++) {
		if (!config.isRunning) return false;

		debug(1);
		sleep(1000);
		ScreenErrorTime1 = Date.now()
		if (useReturn(1)) {
			a = a + 1;
			
			if ( a >= 4 ) { 
				ScreenErrorTime1 = Date.now()
				setFirstTimer(); 
				break; 
			}
		}
		
		//console.log('Start App : ', i, 'sec');
	}	
}

function debug(Timer){       //異常檢查檢查
	if (Timer == 0) debugTimer = 0;
	if (!config.isRunning || Date.now() < debugTimer) return false;


	debugTimer =  Date.now() + Timer * 1000;
}

function Donnylog() {
	
	
}

function RUN_GG(){      //點GG修改
	if (!config.isRunning) return false;
	if (All_SKIP()){return false;}
	console.log('RUN_GG');    

	var FIGHT_STAGE = CheckImageTap(880, 10, 1210, 60, 0.90, 'FIGHT_STAGE.png', 1230, 30, 1, 100, 2, 0);       //
	if (!FIGHT_STAGE){return false;}
	chkBUG = 0;

	for (var i = 1; i <= 10; i++) {
		if (!config.isRunning) return false;
		console.log('RUN_GG FOR i:', i);
		
		CheckImageTap(1159, 0, 1280, 720, 0.90, 'GG/GG_ICON.png', 1230, 30, 1, 500, 1, 0);       //
		sleep(50);
		
		CheckImageTap(220, 10, 780, 700, 0.85, 'GG/Princess2.png', 1230, 30, 1, 500, 1, 0);       //
		sleep(50);
		
		CheckImageTap(370, 0, 810, 90, 0.90, 'GG/SEARCH_ICON.png', 1230, 30, 1, 500, 1, 0);       //
		sleep(50);
		
		CheckImageTap(1210, 110, 1275, 175, 0.85, 'GG/RUN_SCRIPT_LIST.png', 1230, 500, 1, 500, 1, 1);       //
		sleep(50);
		
		CheckImageTap(870, 530, 1010, 640, 0.90, 'GG/RUN_SCRIPT.png', 1230, 30, 1, 500, 1, 0);       //
		sleep(50);

		var SCRIPT_RUNNING = CheckImageTap(750, 440, 950, 550, 0.90, 'GG/SCRIPT_RUNNING.png', 1230, 30, 1, 100, 2, 0);       //
		if (SCRIPT_RUNNING){
			for (var j = 0; j <= 20; j++){
				console.log('SCRIPT_RUNNING:', j);
				var RE_RUN_SCTIPT = CheckImageTap(10, 300, 240, 460, 0.90, 'GG/RE_RUN_SCTIPT.png', 1230, 30, 1, 500, 2, 0);       //
				if (RE_RUN_SCTIPT){
					TIMER_BACK(0, 'SCRIPT END WAIT CLOSE');
					tapFor(1270, 50, 4, 20, 150, 2000); 
					return false;
				}

				sleep(1000);
			}
		}
		sleep(50);

		var RE_RUN_SCTIPT = CheckImageTap(10, 300, 240, 460, 0.90, 'GG/RE_RUN_SCTIPT.png', 1230, 30, 1, 500, 1, 0);       //
		if (RE_RUN_SCTIPT){tapFor(1270, 50, 4, 20, 150, 2000); break;}
		sleep(50);

		sleep(500);
	}

	// for (var j = 0; j <= 8; j++) {
	// 	if (!config.isRunning) return false;
	// 	console.log('Wait to Fight: ', j, 'sec')
	// 	sleep(1000);

	// 	var FIGHT_STAGE = CheckImageTap(1100, 10, 1210, 50, 0.85, 'FIGHT_STAGE.png', 1230, 30, 1, 100, 2, 0);       //
	// 	if (FIGHT_STAGE){sleep(1000); return false;}
	// }
}

function TAP_ATTACK(FightTeam){
	if (!config.isRunning) return false;
	if (All_SKIP()){return false;}
	console.log('TAP_ATTACK');    
	
	var attX = 100; var attY = 570;  //3rd:sk6 100, 570  3rd:sk4 
	if (FightTeam == 2) {attX = 480; attY = 480;}  //鐮刀女:sk5 457 480  斧頭女:sk5 470 480

	var FIGHT_STAGE = CheckImageTap(1100, 10, 1210, 50, 0.85, 'FIGHT_STAGE.png', 1230, 30, 1, 100, 2, 0);       //
	if (!FIGHT_STAGE){return false;}

	var GG_OK_CNT = 0; var CRACK_OK_CNT = 0;
    for (var i = 1; i <= 80; i++){
		if (!config.isRunning) return false;
		if (All_SKIP()){return false;}

		if (i % 4 <= 1){
			rbm.keepScreenshotPartial( 15, 200, 670, 260);  //
			var Img = rbm.findImage('HERO/SICKLE01.png', 0.95);
			rbm.log('SICKLE01:', Img);
			rbm.releaseScreenshot();
			if (Img != undefined) {attX = Img.x - 60; attY = Img.y + 230;}
		}

		var FIGHT_TIME = CheckImageTap(50, 80, 230, 130, 0.80, 'FIGHT_TIME.png', 1230, 30, 1, 100, 2, 0);       //
		if (FIGHT_TIME){sleep(1000); return false;}

		var HP_LINE_RED = CheckImageTap(696, 575, 1280, 630, 0.90, 'HP_LINE_RED.png', 1230, 30, 1, 100, 2, 0);       //
		var DEFENSE_ICON = CheckImageTap(696, 610, 1280, 650, 0.90, 'DEFENSE_ICON.png', 1230, 30, 1, 100, 2, 0);     //
		if (HP_LINE_RED && !DEFENSE_ICON){tapFor(attX, attY, 2, 20, 200, 100);}

		console.log('Attack Times:', i, ', Team:', FightTeam, ', attX:', attX, ', attY:', attY);

		sleep(500);
	} 
}

function Close_AD_BTN(){
	if (!config.isRunning) return false;
	if (All_SKIP()){return false;}
	console.log('Close_AD_BTN');    

	var FIGHT_TIME = CheckImageTap(50, 80, 230, 130, 0.95, 'FIGHT_TIME.png', 1230, 30, 1, 100, 2, 0);       //
	if (FIGHT_TIME){return false;}

	//AD_CLOSE_XX
	rbm.keepScreenshotPartial( 0, 20, 1280, 100);  //
	for (var i = 10; i >= 1; i--) {
		var str_0 = '';	if (i < 10){str_0 = '0';}
		var Img = rbm.findImage('AD_CLOSE_ICON/XX_CLOSE/AD_CLOSE_XX_0' + str_0 + i + '.png', 0.935);
		rbm.log('AD_CLOSE_XX_0' + str_0 + i +':', Img);

		var ImgFund = 1;
		if (Img != undefined) {break;}
		ImgFund = 0
	}rbm.releaseScreenshot();

	//AD_CLOSE_ICON
	rbm.keepScreenshotPartial(290, 400, 950, 700);  //
	for (var i = 11; i >= 1; i--) {
		if (ImgFund){break;}

		var str_0 = '';	if (i < 10){str_0 = '0';}
		var Img = rbm.findImage('AD_CLOSE_ICON/ICON_CLOSE/AD_CLOSE_ICON_0' + str_0 + i + '.png', 0.90);
		rbm.log('AD_CLOSE_ICON_00' + i +':', Img);

		var ImgFund = 1;
		if (Img != undefined) { 
			if (Img.x > 800 && Img.x < 930 && Img.y > 400 && Img.y < 645){
					console.log('"AD Fiel 2..."'); break;
			}if (Img.x > 420 && Img.x < 639 && Img.y > 580){
					console.log('"AD Fiel 3..."'); break;
			}if (Img.x > 265 && Img.x < 385 && Img.y > 580){
					console.log('"AD Fiel 4..."'); break;
			}if (Img.x > 650 && Img.x < 821 && Img.y > 410 && Img.y < 470){
					console.log('"AD Fiel 5..."'); break;
			}
		}
		ImgFund = 0
	}rbm.releaseScreenshot();

	if (ImgFund) { 
		tapFor(Img.x, Img.y, 1, 30, 100, 2000);

		for (var j = 0; j <= 10; j++){
			if (All_SKIP()){return false;}
			console.log('AD End Wait Time:', j, 'sec');
			sleep(980);

			var FIGHT_STAGE = CheckImageTap(1100, 10, 1210, 50, 0.85, 'FIGHT_STAGE.png', 1230, 30, 1, 100, 2, 0);       //
			if (FIGHT_STAGE){return true; break;}

			var FIGHT_TIME = CheckImageTap(50, 80, 230, 130, 0.75, 'FIGHT_TIME.png', 1230, 30, 1, 100, 2, 0);       //
			if (FIGHT_TIME){return false;}


		}
	}
}

function GG_START_APP(){
	if (!config.isRunning) return false;
	// if (!ALL_SKIP_SW) return false;
	console.log('GG_RESTART_APP');

	FightingTeam = 1;
	for (var i = 0; i <= 3; i++){

		CheckImageTap(850, 610, 950, 670, 0.97, 'GG/ERROR/GG_OK.png', 1120, 560, 4, 1000, 0, 0);       //
		// sleep(50);

		CheckImageTap(90, 400, 200, 490, 0.95, 'ICON_ON_DESK.png', 1230, 30, 2, 15000, 1, 0);       //
		// sleep(50);

		CheckImageTap(800, 340, 970, 480, 0.97, 'GG/ERROR/CRACK_OK.png', 1230, 30, 1, 500, 1, 0);       //
		// sleep(50);

		CheckImageTap(310, 280, 540, 380, 0.95, 'GG/ERROR/RE_START_APP.png', 1230, 30, 1, 15000, 1, 0);       //
		// sleep(50);

		CheckImageTap(520, 250, 770, 420, 0.95, 'GAME_START_DOOR.png', 1230, 30, 1, 8000, 1, 0);       //
		// sleep(50);

		// CheckImageTap(1110, 500, 1280, 640, 0.95, 'INSIDE_BOX.png', 1070, 510, 1, 3000, 0, 0);       //
		// sleep(50);

		// var FIGHT_MPA = CheckImageTap(180, 70, 330, 220, 0.95, 'FIGHTING_MAP_2.png', 1070, 510, 1, 100, 2, 0);       //
		// if (FIGHT_MPA){
		// 	tapFor(250, 340, 2, 30, 100, 300);
		// 	tapFor(1175, 650, 2, 30, 100, 500);
		// }sleep(50);

		// var GO_TO_WARE = CheckImageTap(810, 620, 1060, 720, 0.95, 'GO_TO_WARE.png', 1070, 510, 1, 100, 2, 0);       //	
		// if (GO_TO_WARE){tapFor(930, 680, 2, 200, 5000);	keycode('BACK', 600);}
		// sleep(50);

		// var FIGHT_STAGE = CheckImageTap(1100, 10, 1210, 50, 0.85, 'FIGHT_STAGE.png', 1230, 30, 1, 100, 2, 0);       //
		// if (FIGHT_STAGE){sleep(1000); ALL_SKIP_SW = 0; return false;}

		sleep(200);
	}
}

function All_SKIP(){
	if (!config.isRunning) return false;
	if (ALL_SKIP_SW) return true;

	var GG_OK = CheckImageTap(850, 610, 950, 670, 0.97, 'GG/ERROR/GG_OK.png', 1120, 560, 4, 1000, 2, 0);       //
	if (GG_OK){ALL_SKIP_SW = 1; return true;}
	sleep(50);

	var CRACK_OK = CheckImageTap(800, 340, 970, 480, 0.97, 'GG/ERROR/CRACK_OK.png', 1230, 30, 1, 500, 2, 0);       //
	if (CRACK_OK){ALL_SKIP_SW = 1; return true;}
	sleep(50);
}

function foreApp(){
	var tagADObj = {"activityName":"com.google.android.gms.ads.AdActivity","packageName":"com.ssicosm.dungeon_princess_ad"}
	var tagDskObj = {"activityName":"com.android.launcher3.Launcher","packageName":"com.ldmnq.launcher3"}
	var tagAppObj = {"activityName":"com.unity3d.player.UnityPlayerActivity","packageName":"com.ssicosm.dungeon_princess_ad"}
	var foreApp = rbm.currentApp();
	rbm.log(foreApp);
	if (foreApp = tagAppObj) {console.log('App : ture'); return true;}
	else {console.log('App : false'); return false;}	
}

function TIMER_BACK(cy, str){
	for (var i = 0; i <= cy; i++){
		if (!config.isRunning) return false;
		sleep(1000);
		console.log(str + ':', cy - i + 1, '.....');
	}
}

function con_fighting(){
	if (!config.isRunning) return false;

	for (var i = 1; i <= 20; i++){
		if (!config.isRunning) return false;
		console.log('FightingTeam:', FightingTeam);
		var GET_GOLD = CheckImageTap(740, 570, 1240, 680, 0.95, 'GET_GOLD.png', 1230, 30, 1, 100, 2, 1);       //

		if (GET_GOLD && chkBUG_CUNT <= 4){
			tapFor(800, 640, 2, 30, 100, 4000);
			var Close_AD = Close_AD_BTN();
			if (Close_AD){break;}

			sleep(1000);

		} else {
			var FIGHT_NEXT = CheckImageTap(740, 570, 1240, 680, 0.95, 'FIGHT_NEXT.png', 1230, 30, 1, 100, 2, 0);       //
			var FIGHT_NEXT2 = CheckImageTap(740, 570, 1240, 680, 0.95, 'FIGHT_NEXT2.png', 1230, 30, 1, 100, 2, 0);       //
			if (FIGHT_NEXT || FIGHT_NEXT2){
				tapFor(960, 640, 2, 30, 100, 5000);
				FightingTeam = 1;
				
				var Close_AD = Close_AD_BTN();
				if (Close_AD){break;}
			}	

			var NEXT_TEAM = CheckImageTap(740, 570, 1240, 680, 0.95, 'NEXT_TEAM.png', 1230, 30, 1, 100, 2, 0);       //
			if (NEXT_TEAM){
				tapFor(1148, 640, 2, 30, 100, 3000);
				FightingTeam = 2;
			}
		}
		sleep(500);


		var FIGHT_STAGE = CheckImageTap(1100, 10, 1210, 50, 0.85, 'FIGHT_STAGE.png', 1230, 30, 1, 100, 2, 0);       //
		if (FIGHT_STAGE){break;}

		if (chkBUG = 1){
			chkBUG_CUNT = chkBUG_CUNT + 1;
			console.log('chkBUG_CUNT:', chkBUG_CUNT);
			
			if (chkBUG_CUNT % 6 == 0){
				var Close_AD = Close_AD_BTN();
				sleep(50);
						
				var SEARCH_ICON = CheckImageTap(370, 0, 810, 90, 0.90, 'GG/SEARCH_ICON.png', 1230, 30, 1, 500, 2, 0);       //
				if (SEARCH_ICON){tapFor(1250, 45, 4, 20, 150, 1000);}
				sleep(50);

				chkBUG_CUNT = 0
			}
			
			if (chkBUG_CUNT % 12 == 0){
				ALL_SKIP_SW = 1;
				GG_START_APP();
				chkBUG_CUNT = 0;
			}
		}

		GG_START_APP();
	}
}

function main_menu(page){
	if (!config.isRunning) return false;

	CheckImageTap(15, 20, 100, 80, 0.97, 'LeftTop_Triangle.png', 1, 1, 1, 1000, 1, 0); 
	var mainPage = CheckImageTap(380, 610, 440, 680, 0.97, 'main_menu_bag.png', 1, 1, 0, 100, 2, 0); 
	if (mainPage) {
		var menuX = 270 + (page - 1) * 150;
		var menuY = 650;
		tapFor(menuX, menuY, 1, 30, 200, 2000);
	}
}

function cleanEQU(maxLv){
	if (!config.isRunning) return false;
	if (maxLv > 5){maxLv = 5;}

	console.log('maxLv:', maxLv);
	rbm.keepScreenshotPartial( 90, 635, 410, 680);  //
	for (var i = 0; i <= maxLv; i++){
		if (!config.isRunning) return false;
			
			var Img = rbm.findImage('equ_color_0' + i + '.png', 0.98);
			// rbm.log('equ_color_0' + i +':', Img);

			if (i == 0 && Img == undefined) {
				console.log('No Trash!! Left and Break!!');
				// tapFor(60, 45, 1, 30, 200, 1000);
				CheckImageTap(15, 20, 100, 80, 0.97, 'LeftTop_Triangle.png', 1, 1, 1, 1000, 1, 0); 
				rbm.releaseScreenshot();
				return false;
			}else if (i > 0 && Img != undefined) {
				tapFor(Img.x, Img.y, 1, 30, 100, 100);
			}
	}rbm.releaseScreenshot();

	tapFor(380, 660, 1, 30, 200, 2000);
	tapFor(530, 400, 1, 30, 200, 1000);
	tapFor(530, 440, 4, 30, 300, 100);
	tapFor(585,  80, 2, 30, 100, 100);
	
	CheckImageTap(15, 20, 100, 80, 0.97, 'LeftTop_Triangle.png', 1, 1, 1, 1000, 1, 0); 
	// tapFor(60, 45, 1, 30, 200, 1000);

}

function fightgo(){
	if (!config.isRunning) return false;
	
	var RIGHT_TOP_XX = CheckImageTap(1180, 35, 1260, 120, 0.95, 'RIGHT_TOP_XX.png', 1, 1, 1, 500, 2, 1);
	if (!RIGHT_TOP_XX) return false;

	for (var i = 1; i <= 3; i++){
		if (!config.isRunning) return false;
		console.log('fightgo i:', i);

		var map_icon_2 = CheckImageTap(420, 230, 530, 310, 0.95, 'map_icon_2.png', 1, 1, 1, 100, 2, 0);
		if (map_icon_2) {
			tapFor(770, 480, 1, 30, 200, 1000);  //700卡:220, 550, 800卡:460, 600, 900卡:770, 480

			fightLvx3();
			tapFor(1170, 670, 1, 30, 200, 1000);
			tapFor(900, 670, 1, 30, 200, 2000);
			break;

		} else {
			tapFor( 50, 350, 2, 30, 100, 1000);
			tapFor(920, 350, i, 30, 200, 1000);
		}

		sleep(500);
	}
}

function fightLvx3(){
	if (!config.isRunning) return false;
	
	rbm.keepScreenshotPartial(980, 620, 1050, 670);  //
	for (var i = 2; i >= 1; i--) {
		var Img = rbm.findImage('XX123_' + i + '.png', 0.985);
		// rbm.log('XX123_' + i +':', Img);
		if (Img != undefined) {tapFor(Img.x, Img.y, i, 20, 100, 200); break;}
	}rbm.releaseScreenshot();
}

function main(){       //主流程
	if (!config.isRunning) return false;

	var FIGHT_STAGE = CheckImageTap(870, 20, 940, 60, 0.95, 'FIGHT_STAGE.png', 1230, 30, 1, 100, 2, 1);       //
	if (!FIGHT_STAGE){FIGHT_STAGE_CUT = FIGHT_STAGE_CUT + 1;}
	else{FIGHT_STAGE_CUT = 0;}
	console.log('FIGHT_STAGE_CUT:', FIGHT_STAGE_CUT);

	if (FIGHT_STAGE_CUT > 0){
		rbm.keepScreenshotPartial(990, 15, 1110, 80);  //
		var Img1 = rbm.findImage('SINGLE_OUT_ICON.png', 0.985);
		var Img2 = rbm.findImage('SINGLE_OUT_0TICK.png', 0.985);
		if (Img1 != undefined) {rbm.log('SINGLE_OUT_ICON:', Img1);}
		if (Img2 != undefined) {rbm.log('SINGLE_OUT_0TICK:', Img2);}
		rbm.releaseScreenshot();

		if (Img1 != undefined && Img2 == undefined) {
			tapFor(1110, 660, 1, 100, 1000);
			tapFor( 690, 400, 1, 100, 1000);
		}

		GG_START_APP()

		if (CycleN % 5 == 0) {
			LV_UP_FRAME = CheckImageTap(40, 340, 860, 370, 0.90, 'LV_UP_FRAME.png', 160, 260, 1, 100, 1, 0);       //
		}

		FIGHT_STAGE_CUT = 0;
	}

	cleanEQU(5);
	fightLvx3();
	fightgo();

	CheckImageTap(1100, 610, 1220, 660, 0.95, 'back_home.png', 1, 1, 1, 500, 1, 0);
	CheckImageTap(1180, 35, 1260, 120, 0.95, 'RIGHT_TOP_XX.png', 1, 1, 1, 500, 1, 0);
	CheckImageTap(460, 300, 750, 400, 0.95, 'YES_unknow.png', 1, 1, 1, 500, 1, 0);
	

	rbm.keepScreenshotPartial(90, 560, 540, 620);  //
	for (var i = 2; i >= 1; i--) {
		var Img = rbm.findImage('SAPPHIRE_BULE' + i + '.png', 0.95);
		// rbm.log('SAPPHIRE_BULE' + i +':', Img);
		if (Img != undefined) {RUN_GG(); break;}
	}rbm.releaseScreenshot();


	sleep(1000);
	// TAP_ATTACK(FightingTeam);

	CycleN = CycleN + 1;
	
}

function setFirstTimer() {   //預設值設定
	
}

function setFirstsetting() {
	chkBUG = 1;
	chkBUG_CUNT = 0;
	FightingTeam = 1;
	ALL_SKIP_SW = 0;
	FIGHT_STAGE_CUT = 0;
	CycleN = 0;
	pageTG = 2;
}

function test(cycle){
	rbm.init();
	config.isRunning = true;               //腳本測試用function
	for(var n = 0; n <= cycle; n++) {
		if (!config.isRunning) return false;
		
		if (n == 0) { 
			setFirstsetting();   //設定初值設定值
			setFirstTimer();     //設定初始時間值
		}
		else if (n >= 1) {
			console.log('============================================================================');
			console.log('n = ', n, ', CRA 腳本開始', ', Team:', FightingTeam);

			console.log('n % 60 = ', n % 60, ', pageTG:' , pageTG);
			if(n % 10 == 0){
				console.log('n % 60 = 0, 切換畫面');

				main_menu(pageTG);
				switch (pageTG) {
					case 2 : pageTG = 5; break;
					case 5 : pageTG = 7; break;
					case 7 : pageTG = 2; break; 
				}
			}

			main();

			sleep(1000);
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
	console.log(settingString, settings);
	setFirstTimer();     //設定初始值
	setFirstsetting();
	
	console.log('Crush Them All 腳本開始');	
	while(config.isRunning) { main(); }
} 
