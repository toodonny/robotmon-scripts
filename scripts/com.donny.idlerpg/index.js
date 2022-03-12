importJS('RBM-0.0.3');

// ============================idlerpg=============================== //

var config = {
  appName: 'com.donny.idlerpg',
  oriScreenWidth: 720, // source
  oriScreenHeight: 1280,
  oriVirtualButtonHeight: 0,
  oriResizeFactor: 1, 
  eventDelay: 50,
  imageThreshold: 1,
  imageQuality: 100,
  resizeFactor: 1, // small -> quickly
  scriptDir: 'scripts/com.donny.idlerpg/images',
  isRunning: false,
  PackangName: 'com.godzilab.idlerpg',
  LaunchActivityName: 'com.godzilab.idlerpg.Main',
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
1
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
	var PicSharePath = '/sdcard/Pictures/CTA';
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
		case  1: return CheckImageTap( 625,   10, 710,   70, 0.95, 'mainpagebutton.png', 1, 1, 1, 50, 2, 0);    return;   //右上功能圖示 OK
		case  2: 
		
		// var spdx2 = CheckImageTap(440, 10, 570, 70, 0.95, 'speedx2.png', 1, 1, 1, 50, 2);    //檢查2倍速圖示 OK
		// if (spdx2) {return true;}
		// var spdx3 = CheckImageTap(440, 10, 570, 70, 0.95, 'speedx3.png', 1, 1, 1, 50, 2);    //檢查3倍速圖示 OK
		// if (spdx3) {return true;}
		// else {return false;}

		rbm.keepScreenshotPartial( 440, 10, 570, 70);
		var Img1 = rbm.findImage('speedx2.png', 0.90);        //檢查2倍速圖示
		var Img2 = rbm.findImage('speedx3.png', 0.90);        //檢查3倍速圖示
		rbm.releaseScreenshot();

		if(Img1 != undefined || Img2 != undefined){return true;}
		return false;

		case  3: return CheckImageTap( 310,  590, 410,  690, 0.85, 'ADbox.png', 1, 1, 1, 50, 2);             return;   //檢查寶箱看廣告  OK
		case  4: return CheckImageTap(   0,  580, 110,  820, 0.85, 'speedX2icon_3.png', 1, 1, 1, 50, 2);       return;   //2倍速選單圖示 OK
		case  5: return CheckImageTap( 220,  560, 360,  700, 0.85, 'herostore_str.png', 1, 1, 1, 50, 2, 0);     return;   //英雄商店文字
		case  6: return CheckImageTap( 220,  600, 340,  700, 0.85, 'lvupallhero2.png', 1, 1, 1, 50, 2, 0);      return;   //英雄頁面全英雄升級文字
		case  7: return 
		case  8: return CheckImageTap( 110, 1210, 310, 1280, 0.85, 'guildChaticon.png', 1, 1, 1, 50, 2);     return;   //工會聊天室圖示
		case  9: return CheckImageTap( 270,   60, 500,  375, 0.85, 'dailystr.png', 1, 1, 1, 50, 2);          return;   //每日獎勵字樣
		
		case 10: return CheckImageTap( 550,  800, 700,  880, 0.85, 'timeplaying.png', 1, 1, 1, 50, 2);       return;   //看廣告金幣(開啟)
		case 11: return CheckImageTap( 650,   20, 700,   65, 0.85, 'ADdebug1.png', 1, 1, 1, 50, 2);          return;   //廣告右上固定
		case 12: return CheckImageTap( 680,    0, 720,   33, 0.85, 'AD_XX_01.png', 1, 1, 1, 50, 2);          return;   //AD_XX_01
		
		case 13: return CheckImageTap( 270,  510, 380,  560, 0.85, 'herobookicon.png', 1, 1, 1, 50, 2);      return;   //英雄冊文字
		case 14: return CheckImageTap(  25, 1180, 160, 1280, 0.85, 'herowepon.png', 1, 1, 1, 50, 2);         return;   //英雄冊文字

		case 15: return CheckImageTap( 440,   10, 570,   70, 0.95, 'speedx3.png', 1, 1, 1, 50, 2);           return;   //檢查3倍速圖示 OK
		
		case 21: return CheckImageTap(  45,  530, 110,  590, 0.80, 'retreatBoss02.png', 1, 1, 1, 50, 2);       return;  //BOSS戰鬥，撤退鈕
		case 22: return CheckImageTap( 135,  510, 560,  560, 0.80, 'bossticks.png', 1, 1, 1, 50, 2);         return;  //地城BOSS選關(門票字樣)
		case 23: return CheckImageTap2( 220, 510, 390,  560, 0.95, 'bossticks_0.png', 'bossticks2_0.png', 1, 1, 1, 50, 2);   return;  //地城BOSS票=0
		case 24: return CheckImageTap( 480,  610, 610,  660, 0.96, 'spdongeon_0_2.png', 1, 1, 1, 50, 2, 0);       return;  //活動BOSS票=0 //地城BOSS票=0
		case 25: return CheckImageTap(  15,  510,  90,  570, 0.95, 'backarry2.png', 1, 1, 1, 50, 2);             return;  //戰鬥中退回按鈕
		
		
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
			var Img1 = rbm.findImage('list_F_icon2.png', 0.90);        //中間圖示 魔晶
			var Img2 = rbm.findImage('list_F_icon.png', 0.90);         //中間圖示 F
			// var Img2 = rbm.findImage('list_water_icon2.png', 0.90);    //中間圖示 水
			// rbm.log('list_F_icon2:', Img1);
			// rbm.log('list_F_icon:', Img2);
			// rbm.log('list_water_icon2:', Img2);
			rbm.releaseScreenshot();

			if(Img1 != undefined && Img2 != undefined){return true;}
			return false;


		// case 61: return checkPointcolor3( 42, 435, 50, 'FFA800',  51, 432, 50, 'FFA800',  51, 440, 50, 'FFA800'); return;   //對話頻道橘色驚嘆號
		
		case 61: return CheckImageTap( 30,  440, 64,  474, 0.90, 'guildeventicon.png', 1, 1, 1, 50, 2);       return;   //對話頻道橘色驚嘆號
		
		case 81: return CheckImageTap( 300,  340, 415,  380, 0.90, 'areafightchoice.png', 1, 1, 1, 50, 2);       return;   //競技場挑戰對手文字
		case 82: return CheckImageTap( 390,   70, 440,  140, 0.90, 'arena_rest.png', 1, 1, 1, 50, 2);            return;   //競技場商店文字，當日停戰
		
		//case 91: return CheckImageTap( 660,    0, 720,   60, 0.90, 'guildbosshelpRU.png', 1, 1, 1, 50, 2);       return;   //工會BOSS,右上?圖
		case 91: return CheckImageTap( 600,    0, 720,   60, 0.90, 'guildbosshelpRY.png', 1, 1, 1, 50, 2);       return;   //工會BOSS,右上?圖

		case 101: return CheckImageTap( 625,  10, 710,   70, 0.90, 'mainpagebutton_bk.png', 1, 1, 1, 50, 2, 1);    return;   //右上功能圖示_模糊
		
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
		case  6: return num_Recognition(12, 1075, 85, 1095, 0.88, 'num_Reco/guildmedaltime_num/guildmedaltime_num_'); break;  //公會求勳章時間
		case  7: return num_Recognition(360, 19, 430, 36, 0.88, 'num_Reco/guildbosserg_num/guildbosserg_num_'); break;  //公會BOSS能量(閃電)
		case  8: return num_Recognition(35, 507, 95, 524, 0.88, 'num_Reco/guildbosserg_num/guildbosserg_num_'); break;  //f幣數量
		case  9: return ''; break;  //
		
		case 41: return num_Recognition(240, 480, 360, 510, 0.90, 'num_Reco/arena_num/arena_num_'); break;  //競技場第1位
		case 42: return num_Recognition(240, 628, 360, 658, 0.90, 'num_Reco/arena_num/arena_num_'); break;  //競技場第2位
		case 43: return num_Recognition(240, 776, 360, 806, 0.90, 'num_Reco/arena_num/arena_num_'); break;  //競技場第3位
		
	}
}

//=============================2020.07.10 Retest================================//

// -廣告獎勵-----
function getADBox() {   //寶箱廣告觀看 OK
	if (!config.isRunning) return false;
	//if (!useReturn(51) && !useReturn(50)) return false;
	//if (!useReturn(50)) return false;
	console.log('寶箱廣告');

	for (var i = 1; i <= 3; i++){
		if (!config.isRunning) return false;
		
		sleep(200);
		// if (useReturn(1)) {
			if (useReturn(3)) {

				if(admodeSw == 3) {
					tapFor(360, 780, 3, 30, 100, 300);
					return false;
				}

				for (var j = 1; j <= 3; j++){
					if (!config.isRunning) return false;
					//console.log(' AD box click', i, j);
					
					sleep(300);
					CheckImageTap( 310,  590, 410, 690, 0.90, 'ADbox.png', 1, 1, 1, 4000, 1, 0);
				}
			
				waitAD(adtimesetSw);

				//getADGoldTimer =  getADGoldTimer + 30 * 1000;
			}
			else {
				return false;
			}
		// }
	}
}

function getADSpeed() {  //看廣告拿2倍速 OK
	if (!config.isRunning) return false;
	if (!useReturn(51)) return false;
	//if (useReturn(2)) return false;
	console.log('檢查2倍速');
	CheckImageTap( 440, 10, 570, 70, 0.90, 'speedoff.png',    1, 1, 1, 500, 1, 0);  //加速關閉點on
	CheckImageTap( 651, 29, 687, 52, 0.85, 'upmenuclose.png', 1, 1, 1, 500, 1);  //右上功能圖示關閉

	if (useReturn(2)) {return false;}

	for (var i = 1; i <= 8; i++){
		if (!config.isRunning) return false;
		//console.log(i, useReturn(1));
		
		sleep(200);
		if (useReturn(1)) {
			var speedx2 = useReturn(2);
			var speedx3 = useReturn(15);
			
			// if (!useReturn(2)) {
			if (!speedx2 && !speedx3){

				var spdx2AD = 0;
				for (var k = 1; k <= 8; k++){
					sleep(500);

					var upADicon = CheckImageTap( 440, 10, 570, 70, 0.95, 'speedx2_up_ad_icon.png', 1, 1, 1, 1000, 2, 0);  //上方點看廣告小圖示
					var x2ADyesno = CheckImageTap( 280, 480, 420, 540, 0.95, 'speedx2_yesno_icon.png', 480, 820, 1, 2000, 2, 0);  //兩倍速看廣告 YES

					if (upADicon) {tapFor(520, 24, 1, 30, 100, 1000); spdx2AD = 1;}
					if (x2ADyesno) {tapFor(480, 820, 1, 30, 100, 3000); spdx2AD = 2;}

					if (spdx2AD == 2) {
						ADtimeout[0] = -1;
						waitAD(adtimesetSw, false);
						getADGoldTimer =  getADGoldTimer + 30 * 1000;

						if(k ==3) {
							break;
						}
					}

				}

				if (spdx2AD == 2) {break;}

				console.log('AD CD time wait!!')

				choiceMenu(5);
				DIY_swipe(480, 660, 480, 1000, 20, 2500);
				
				if (i == 1){
					DIY_swipe(480, 660, 480, 1000, 20, 2500);
				}

				var x2Y = -1;
				for (var m = 1; m <= 10; m++){
					rbm.keepScreenshotPartial( 5,  580,  130,  1200);  //x2 + x3 倍速選單圖示
					var targetImg = rbm.findImage('speedX2icon_3.png', 0.90);
					//rbm.log('speedX2icon_3:', targetImg)
					rbm.releaseScreenshot();
					
					if (targetImg != undefined && targetImg.score >= 0.90){
						if (x2Y == -1) {x2Y = targetImg.y;}
						else if (x2Y != -1 && targetImg.y == x2Y) {break;}
						else if (x2Y != -1 && targetImg.y != x2Y) {x2Y = -1;}
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

						}else if (Img2 != undefined) {
							sleep(1000);
							if ( ADtimeout[0] == -1) {
								ADtimeout[0] = Date.now();
								ADtimeout[1] = (Date.now() - ADtimeout[0])/1000
								//console.log('ADtimeout[0]:', ADtimeout[0], ', ADtimeout[1]:', ADtimeout[1]);

							}else if ( ADtimeout[1] > 80) {
								console.log('卡看廣告:', ADtimeout[1], '/80 秒，重啟app');
								startApp(180, scrShotSw);

							}else if (ADtimeout[0] > 0 && ADtimeout[1] != -1) {
								ADtimeout[1] = (Date.now() - ADtimeout[0])/1000
								console.log('ADtimeout[0]:', ADtimeout[0], ', ADtimeout[1]:', ADtimeout[1]);
							}
							return false;

						}else if (Img3 != undefined) {
							tapFor(Img3.x, Img3.y, 1, 60, 2000);
							ADtimeout[0] = -1;
							waitAD(adtimesetSw, false);
							getADGoldTimer =  getADGoldTimer + 30 * 1000;

						}else if (Img4 != undefined) {	
							tapFor(Img4.x, Img4.y, 1, 60, 2000);	
							ADtimeout[0] = -1;
							break;

						}

						
						sleep(200);
					}

				}else {
					DIY_swipe(480, 800, 480, 660, 40, 2500);

				}

			}else {
				return false;
			}
		}
	}
}

function getADGold(Timer) {  //看廣告拿金幣  OK
	if (!config.isRunning || Date.now() < getADGoldTimer) {return false;}
	if (!goldADSw){return false;}
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

function waitAD(timer, speedx2) {   // 看廣告判斷機制
	if (!config.isRunning) return false;
	if (speedx2 == undefined) var speedx2 = true;
	console.log('等待廣告', 'speedx2:', speedx2);

	a = 0;
	for (var i = 1; i <= timer; i++){
		if (!config.isRunning) return false;
		

		var currApp = rbm.currentApp();
		// rbm.log(currApp);
		// console.log('currApp.activityName;', currApp.activityName);

		
		var adListQ = Object.keys(adActivity.info).length - 1;
		// console.log('adListQ:', adListQ);
		for (var k = 0; k <= adListQ; k++) {
			// console.log(k, adListQ, adActivity.info[k].activityName);
			if (currApp.activityName == adActivity.info[k].activityName){
				var activityStaut = k;
				break;
			}

			if (k == adListQ) {rbm.log(currApp);}
		}
		if (activityStaut == 1) {
			console.log(activityStaut, '在遊戲中,', i, 'sec');

			if (useReturn(3)) {return false;}

			rbm.keepScreenshotPartial(260, 500, 450, 1180);  ///點擊獲取
			var Img = rbm.findImage('getButton.png', 0.90);
			rbm.releaseScreenshot();
			if (Img != undefined && Img.score >= 0.90) {
				console.log('出現獲取鈕，點擊跳出');
				sleep(300);
				tapFor(Img.x , Img.y, 3, 60, 200);
				return false;
			}

			CheckImageTap(280, 490, 420,  540, 0.90,  'exitgame.png', 240, 830, 1, 500, 0, 0);    //取消退出遊戲

			if (useReturn(1)) {
				a = a + 1;
				if (i < 10 && a >= 10) {console.log('選單鈕，出現10秒，異常'); return false;}
				else if (i > 10 && a >=  5) {console.log('選單鈕，出現 5秒，回到遊戲'); return false;}

				if (!speedx2 && useReturn(2)) {console.log('廣告 2倍速 完成');return false;}  //無加速變有加速判斷

				CheckImageTap(310, 600, 405, 1170, 0.90,  'OKbutton.png',   1,   1, 1, 500, 1, 0);    //確認鈕
			}else {
				a = 0;
				CheckImageTap(500,   0, 720,  530, 0.90, 'rightupXX.png',   1,   1, 1, 500, 1, 0);    //遊戲中右上的叉叉	
				CheckImageTap(100, 550, 500,  780, 0.99, 'AD_close_video_box.png',   1,   1, 1, 3500, 1, 0);    //遊戲繼續觀看廣告畫面
			}

		}else if (activityStaut == 2) {
			for (var l = 1; l <= 20; l++){
				
				console.log(l, activityStaut, '發現google store，按BACK鍵，回廣告,', i, 'sec');
				keycode('BACK', 1000);

				var activityStaut2 = -1;
				for (var k = 0; k <= adListQ; k++) {
					// console.log(k, adListQ, adActivity.info[k].activityName);
					if (currApp.activityName == adActivity.info[k].activityName){
						activityStaut2 = k;
						break;
					}

					if (k == adListQ) {rbm.log('NEW_ad_app', currApp);}
				}

				if (activityStaut2 > 2) {
					sleep(10000);
					break;
				}

				sleep(500);
			}

		}else {
			console.log(activityStaut, '看廣告畫面中,', i, 'sec');

			// if (i > 5 && i < timer) {console.log(i, 'sec');}
			if (i >= timer - 10) {
				console.log('廣告觀看計時 = ' + i, '按BACK，切廣告')
				keycode('BACK', 1000);
				sleep(1000);
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
			if (sizeObj.width == 720 && i >= 15 && admodeSw == 2) {

				var stoptime1 = ScreenStopTimes( 180, 270, 590, 860, 0.999, 'checkADstop.png', 1, 1)

				var currApp = rbm.currentApp();
				if (currApp.activityName == adActivity.info[1].activityName) {
					console.log('error 廣告中錯誤, 畫面停止時間歸0!!');
					ScreenErrorTime1 = Date.now()
					ScreenErrorTime2 = 0;
					stoptime1 = 0;
					keycode('BACK', 200); sleep(400);
				}

				rbm.keepScreenshotPartial(665, 20, 718, 55);  ///檢查 >> 點擊
				for (var j = 1; j <= 12; j++){
					if (j % 2 == i % 2) {
						var n0 = 0;
						if (j >= 10){n0 = '';}
						var filename = 'AD_rr_0' + n0 + j + '.png';
						var Img = rbm.findImage(filename, 0.99);
						// rbm.log(i, j, filename, Img);
						if (Img != undefined) {break;}
					}
				}
				rbm.releaseScreenshot();

				if (Img != undefined || stoptime1 > 88 || i > 45) {
					tapFor(690, 35, 1, 30, 100, 2500);

					// console.log('adListQ:', adListQ);
					for (var k = 0; k <= adListQ; k++) {
						// console.log(k, adListQ, adActivity.info[k].activityName);
						if (currApp.activityName == adActivity.info[k].activityName){
							var activityStaut = k;
							break;
						}
			
						if (k == adListQ) {rbm.log('NEW_ad_app', currApp);}
					}
					if (activityStaut == 2) {
						console.log(l, activityStaut, '廣告結束發現google store，按BACK鍵，回廣告');
						keycode('BACK', 1000);

						sleep(1000);
						tapFor(670, 84, 1, 30, 100, 4500);


					}else {
						sleep(2000);
						tapFor(690, 35, 1, 30, 100, 3000);

					}


					
				}

				if (stoptime1 >= 3 || i >= 40) {		
					// console.log(i, 'sec', 'stoptime1 >= 3 || i >= 35 , press key BACK' );
					console.log('廣告結束，畫面停3秒，回遊戲');
					keycode('BACK', 200); sleep(400);
					stoptime1 = 0;
				}

				if (i == 44 && overwtADSw){ScreenShottoPath('watchAD45sec_');}

				rbm.keepScreenshotPartial(470, 690, 600, 720);  ///點繼續看AD YES NO
				var Img = rbm.findImage('AD_YESNO_01.png', 0.90);
				rbm.releaseScreenshot();
				if (Img != undefined && Img.score >= 0.90) {
					console.log('AD_YES_NO，Wait 6 sec');
					tapFor(Img.x , Img.y, 1, 60, 200);
					sleep(6000);
					stoptime1 = 0;
				}
	
				rbm.keepScreenshotPartial(650, 60, 690, 105);  ///點擊AD X
				for (var j = 1; j <= 7; j++){
					if (j % 2 == i % 2) {
						var n0 = 0;
						if (j >= 10){n0 = '';}
						var filename = 'AD_XX_0' + n0 + j + '.png';
						var Img = rbm.findImage(filename, 0.98);
						// rbm.log(i, j, filename, Img);
						if (Img != undefined) {break;}
					}
				}
				// var Img = rbm.findImage('AD_XX_001.png', 0.90);
				rbm.releaseScreenshot();
				if (Img != undefined && Img.score >= 0.99) {
					console.log(filename);
					tapFor(Img.x + 5, Img.y + 5, 1, 60, 200);
					sleep(1000);
				}


			}

		}

		sleep(850);
		//console.log('Wait Time: ', i, '/', timer);
	}
}

function choiceMenu(page) {  //主選單頁面  page: 1:英雄 2:村莊 3:寶物 4:挑戰 5:商店
	if (!config.isRunning) return false;
	if (!useReturn(51)) return false;
	// console.log('Choice Manu : ', page);
	
	tapFor(300, 70, 2, 50, 100, 100);

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
				
					checkPointcolorTap(colorX, colorY, 50, colorHEX[1], colorX+5, colorY+5, 1, 100, 0)
					if (checkPointcolor(colorX, colorY + 3, 50, colorHEX[2])) {
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


// -英雄資料-----
function lvupHero(stageMin, lvupl, Timer) {  //	 英雄升級  OK
	if (!config.isRunning || Date.now() < lvupHeroTimer) return false;	
	// if (stage > 0 && totallvupstage > 0 &&  stage <= totallvupstage) {return false;}
	// if (herogoldlvmin >= lvuplimitSw) return false;
	if (!lvupHeroSw) return false;
	if (!useReturn(51)) return false;
	if (!useReturn(2)) return false;
	if (stage <= stageMin) return false;
	console.log('英雄升級');

	if (stage > 0 && totallvupstage > 0 &&  stage <= totallvupstage) {
		console.log('stage:', stage, '未達英雄等級', totallvupstage, '跳出升級'); 
		lvupHeroTimer =  Date.now() + Timer * 10 * 1000;
		return false;
	}
	if (herogoldlvmin >= lvuplimitSw) {
		console.log('英雄金幣等級:', herogoldlvmin, '達到設定', lvuplimitSw, '跳出升級'); 
		lvupHeroTimer =  Date.now() + Timer * 10 * 1000;
		return false;
	}
	if (herolvupAllok == 1) {
		console.log('全數英雄等級到達,', lvuplimitSw);
		return false;
	}
	
	var lvupX = new Array( 20, 580, 540, 440, 340);
	// var lvupTap = new Array( '', 20, 10, 5, 3);
	
	for (var i = 1; i <= 2; i++){
		if (!config.isRunning) return false;
		
		if (useReturn(1)) {
			choiceMenu(1);

			// DIY_swipe(480, 790, 480, 850, 60, 500);
			
			var list_dY = 92
			// console.log('7;', useReturn(7), ', 6;', useReturn(6), ', 5;', useReturn(5));
			var heroheart = 0;
			if (useReturn(5)) {heroheart = 1; list_dY = 0}
			if (useReturn(6) && lvupAllHeroSw) {heroheart = 3; }
			
			if (heroheart == 3) {
				tapFor(630, 680, 8, 30, 100, 100);
				tapFor(250, 680, 3, 30, 100, 500);

				lvupHeroTimer =  Date.now() + Timer * 1000;
				//lvupTap(lvupl, 683, 'E38100', '8C4800');               // lvupTap(uplv, intY, strOK, strNG)

			}else if (heroheart == 1) {
				
				var a = 1;
				for (var j = 1; j <= 5; j++){
					if (!config.isRunning) return false;
					// console.log('Hero Lvup click', i, j);
					// sleep(300);
					
					// rbm.keepScreenshotPartial( 230, 550, 280, 1180);  //確認"愛心"按鈕出現量
					// var Img2s = rbm.findImages('heroHarticon.png', 0.90, 6, true, false);
					// rbm.releaseScreenshot();

					rbm.keepScreenshotPartial( 100, 550, 280, 1180);  //確認"小劍"按鈕出現量
					var Img2s = rbm.findImages('hero_list_sword_icon.png', 0.90, 6, true, false);
					rbm.releaseScreenshot();
					

					if (Img2s != '')  {
						Img2s = Img2s.sort(function (a, b) {
							return a.y > b.y ? 1 : -1;
						});
						var Img2 = Img2s[0];
						// rbm.log('Img2:', Img2);	
						
						var harts = Object.keys(Img2s).length;
						console.log('自動判定人數:', harts, '人'); //取物件長度
					}

					// rbm.log('Img2 Sowrd:', Img2);

					if (Img2 != undefined && Img2.y > 730 + list_dY) {
						// console.log('Img2.y > 730');
						DIY_swipe(Img2.x, Img2.y, 700, 730 + list_dY, 70, 100);
						// tapFor(700, 730, 1, 50, 300);
					}
					else if (Img2 != undefined && Img2.y < 680 + list_dY) {
						console.log('Img2.y > 680');
						DIY_swipe(Img2.x, Img2.y, 700, 680 + list_dY, 70, 100);
						// tapFor(700, 680, 1, 50, 300);
					}
					else if (Img2 != undefined) {
						
						console.log(Img2.x, Img2.y);
						var totallv = heroinformation(Img2.x, Img2.y);
						// rbm.log(totallv);
						if (lvupheromdSw == 2) {
							totallvupstage = totallv.tolvmax - 100;
						}
						if (lvupheromdSw == 3) {
							herogoldlvmin = totallv.goldlvmin							
						}
						

						
						var tapY =  Img2.y - 5 + 106 * (5 - 1)
						// if (checkPointcolor(580, tapY, 20, '8C4800')) {  //最後一人不能升級跳出
						// 	lvupHeroTimer =  Date.now() + Timer * 1000;
						// 	return false;
						// }
						
						//英雄升級
						for (var k = 1; k <= harts; k++){
							if (!config.isRunning) return false;
							// console.log('=========Hero Tap Lv Up=========, k:', k);
							var tapY = Img2.y + 5 + 106 * (k - 1);
							
							var nowgoldlv = Hero.information[k-1].goldlv;
							var lvupQ = lvuplimitSw - nowgoldlv;
							if (lvupQ > 0) {
								// rbm.log('人員' + k + ':' + '等級未達:', nowgoldlv + '/' + lvuplimitSw, ', lvupQ:' + lvupQ);
								rbm.log('人員' + k + ':' + nowgoldlv + '/' + lvuplimitSw + ', 等級未到:');
								
								lvupTaps[3] = Math.floor(lvupQ/100);                    // 取百位數
								lvupTaps[2] = Math.floor(lvupQ/10) - lvupTaps[3] * 10;  // 取十位數
								lvupTaps[1] = lvupQ - Math.floor(lvupQ/10) * 10 + 3;    // 取個位數
								lvupTap(lvupl, tapY, 'E38100', '8C4800');               // lvupTap(uplv, intY, strOK, strNG)
							}
							else if (lvupQ <= 0) {
								// rbm.log('人員' + k + ':' + '等級到達:', nowgoldlv + '/' + lvuplimitSw, ', lvupQ:' + lvupQ);
								rbm.log('人員' + k + ':' + nowgoldlv + '/' + lvuplimitSw + ', 等級到達:');
								herolvupQ = herolvupQ + 1;
								if (herolvupQ == harts){herolvupAllok = 1;}
							}
						}
						lvupTaps = new Array( '', 20, 12, 5, 3);
						a = a + 1
					}
					
					lvupHeroTimer =  Date.now() + Timer * 1000;
					if (a >= 2) return false;
				}
			}
			else {
				DIY_swipe(480, 660, 480, 750, 90, 500);
			}

		}
		sleep(200);
	}	
}

function heroinformation(intX, intY) {  //英雄訊息  OK
	if (!config.isRunning) return false;
	
	var attribcolor = new Array( '', '0083C6', 'A80000', '587C00', 'E3BB00', '2C1268')
	var attribwordE = new Array( '',  'water',   'fire',   'wood',  'light',   'dark')
	var attribwordC = new Array( '',     '水',     '火',     '木',     '光',     '暗')
	
	for (var p = 1; p <= 5; p++) {
		if (!config.isRunning) return false;
		var magicY1 = intY - 58 + 104 * (p - 1);
		var magicY2 = magicY1 + 20;
		var goldY1  = magicY1 + 77;
		var goldY2  = goldY1 + 20;
		var magicLv = num_Recognition(66, magicY1, 108, magicY2, 0.75, 'num_Reco/hero_lv_num/hero_magiclv_num_');
		var goldLv  = num_Recognition(18, goldY1, 90, goldY2, 0.70, 'num_Reco/hero_lv_num/hero_goldlv_num_');
		
		var heroatt = 'NONO'
		var attribY = magicY1 + 38;
		var img = getScreenshotModify(250, attribY, 1, 1, 1, 1, 100);
		for (var q = 1; q <= 5; q++) {
			strRGB = attribcolor[q];
			checkr = parseInt(strRGB.substr(0, 2), 16) * 1;
			checkg = parseInt(strRGB.substr(2, 2), 16) * 1;
			checkb = parseInt(strRGB.substr(4, 2), 16) * 1;
			checka = 0;
			
			var getpoint = getImageColor(img, 0, 0);
			var check = isSameColor({b:checkb, g:checkg, r:checkr, a:checka}, getpoint, 30);
			
			if (check) {heroatt = attribwordC[q]; break;}
			else (heroatt = 'NONO')
		}
		releaseImage(img);

		Hero.information[p-1].magiclv = magicLv;
		Hero.information[p-1].goldlv  = goldLv;
		Hero.information[p-1].attrib  = heroatt;
		Hero.information[p-1].totallv = magicLv + goldLv;
		
		

		// console.log('英雄', p, '魔晶等級:', magicLv, ', 金幣等級:', goldLv, ', 屬性:', heroatt);
	}
	
	// rbm.log(Hero.information[0]);
	// rbm.log(Hero.information[1]);
	// rbm.log(Hero.information[2]);
	// rbm.log(Hero.information[3]);
	// rbm.log(Hero.information[4]);
	
	var totallvmax = Math.max.apply(null, Hero.information.map(function (o) {return o.totallv;})) //
	var totallvmin = Math.min.apply(null, Hero.information.map(function (o) {return o.totallv;})) //
	var goldlvmax = Math.max.apply(null, Hero.information.map(function (o) {return o.goldlv;})) //
	var goldlvmin = Math.min.apply(null, Hero.information.map(function (o) {return o.goldlv;})) //
	
	// rbm.log(totallvmax, totallvmin);
	
	return {'tolvmax':totallvmax, 'tolvmin': totallvmin, 'goldlvmax':goldlvmax, 'goldlvmin': goldlvmin};
}


// -村莊資料-----
function lvupVillage2(lvupl, Timer) {  //村莊升級2
	if (!config.isRunning || Date.now() < lvupVillageTimer) return false;
	if (!lvupVillageSw) return false;
	if (!useReturn(51)) return false;
	if (!useReturn(2)) return false;
	console.log('村莊升級');

	for (var i = 1; i <= 2; i++){
		if (!config.isRunning) return false;
		
		if (useReturn(1)) {
			choiceMenu(2);
			
			for (var k = 1; k <= 8; k++) {
				
				sleep(300);
				rbm.keepScreenshotPartial( 50,  600, 250, 700);  //村莊列表第一、二格，開啟檢查
				var Img1 = rbm.findImage('villagelevel0.png', 0.90);  //村莊未開 lv0
				rbm.releaseScreenshot();
				if (Img1 != undefined){
					DIY_swipe(550, 625, 550, 1030, 60, 100);
					tapFor(550, 1030, 1, 30, 100, 100);
				}else {
					break;
				}

			}

			for (var j = 1; j <= 4; j++){
				if (!config.isRunning) return false;
				// console.log('Village AutoLvup click', i, j);
				
				var robotplantck = villagerobotplant();
				if (robotplantck == 1 || robotplantck == 2 || robotplantck == 4 || robotplantck == 5) {
					rbm.keepScreenshotPartial( 210,  520, 715, 600);  //村莊vip4確認
					var Img1 = rbm.findImage('v4villageautobt.png', 0.90);  //vip4全升級按鈕
					var Img2 = rbm.findImage('v4villageautock.png', 0.90);  //vip4只升到自動的 check box
					rbm.releaseScreenshot();
					
					// if (Img1 != undefined) { rbm.log('Img1:',Img1); }
					// if (Img2 != undefined) { rbm.log('Img2:',Img2); }	
					// Img1 = undefined;
					if(robotplantck == 4 || robotplantck == 5) {
						tapFor(20, 1100, 4, 30, 100, 100);
					}
					if (Img1 != undefined && Img2 != undefined) { 
						if (robotplantck == 1) {
							DIY_swipe(480, 1100, 480, 260, 10, 200);
						}
						rbm.log('有村莊自動升級，已勾選到自動，點升級3次'); 
						tapFor(Img1.x, Img1.y, 3, 50, 300);
						break;
					}
					else if (Img1 != undefined && Img2 == undefined) { 
						rbm.log('有村莊自動升級，未勾選到自動'); 
						tapFor(235, 545, 1, 50, 200);
					}
					else if (Img1 == undefined) {
						rbm.log('無村莊自動升級，進行點擊升級'); 
						tapFor(20, 1100, 3, 30, 100, 100);
						var villback = villagelvup();
						lvupVillageTimer =  Date.now() + Timer * 1000;
						return false;
						break;
					}
				}
				else if (robotplantck == 3) {
					rbm.log('機器人工廠自動，直接升級');
					var lvupD = lvupTap(lvupl, 1100, 'FAAC00', '8C4800');
					var y = Math.log(villageF)/Math.log(2);
					if (lvupD) { 
						Timer = Timer * (1 - Math.pow(2, y+1))/(1-2) - 2;
						villageF = 1;
						console.log('本次可升級, 下次檢查:', Timer, '秒後');
					}
					else if (!lvupD) { 
						villageF = villageF * 2;
						Timer = Timer * villageF;
						console.log('本次不可升級, 下次檢查:', Timer, '秒後');
					}
					// console.log('lvupD:', lvupD, ', 下次檢查時間:', Timer, '秒後');
					break;
				}
				else if (robotplantck == -1) {
					rbm.log('機器人工廠判斷異常，跳出');
					break;
				}
			}
			lvupVillageTimer =  Date.now() + Timer * 1000;
			return false;
		}
		sleep(200);
	}	
}

function villagelvup() {  //村莊不用vip4升級
	if (!config.isRunning) return false;

	for (var i = 1; i <= 4; i++) {
		CheckImageTap( 200, 620, 320, 730, 0.90, 'villageupget.png', 1, 1, 1, 50, 1);  //村莊獲取升級
		rbm.keepScreenshotPartial( 550, 565, 660, 1180);  //確認"升級鈕金幣圖"出現量
		var Img2s = rbm.findImages('villageupgrade.png', 0.92, 6, true, false);
		rbm.releaseScreenshot();
		console.log('villagelvup:', i);

		if (Img2s != '')  {
			Img2s = Img2s.sort(function (a, b) {
				return a.y < b.y ? 1 : -1;
			});
			
			var coines = Object.keys(Img2s).length;
			console.log('可升級項目:', coines, '個'); //取物件長度
			
			var a = 0;
			for (var index in Img2s) {
				if (!config.isRunning) return false;
				var result = Img2s[index];
				// rbm.log(result);
	
				for (var k = 1; k <= 1; k++) {
					if (!config.isRunning) return false;
					// console.log('villagelvup:', i, k);
					
					var tapX1 = 20;
					var tapY1 = result.y + 10;
					tapFor(tapX1, tapY1, 3, 50, 150);
					// console.log(tapX1, tapY1);
					
					var autoY1 = result.y -  10;
					var autoY2 = result.y +  10;
					rbm.keepScreenshotPartial( 8, autoY1, 32, autoY2);  //確認auto符號
					var Img1 = rbm.findImage('lvupAuto.png', 0.90);  
					rbm.releaseScreenshot();
					
					// if (Img1 != undefined) { rbm.log('Img1:',Img1); }
					
					if (result.y >= 1070 && Img1 != undefined) {
						DIY_swipe(480, result.y, 480, 650, 60, 10);
						tapFor(480, 650, 1, 100, 50, 100);

						a = 0;
						break;
					}
					else if (Img1 == undefined) {
						var lvY1 = result.y -  3;
						var lvY2 = result.y + 13;
						var villagelv = num_Recognition(153, lvY1, 200, lvY2, 0.90, 'num_Reco/village_num/village_lv_num_');
						console.log('村莊等級:', villagelv);
						if (villagelv == -1 || villagelv >= 160) break;
						
						var lvupQ = 100 - villagelv % 100;		
						// rbm.log('1 lvupTaps:', lvupTaps, ', lvupQ:', lvupQ);						
						lvupTaps[2] = Math.floor(lvupQ/10);  // 取十位數
						lvupTaps[1] = lvupQ - lvupTaps[2] * 10 + 1;  // 取個位數
						// rbm.log('2 lvupTaps:', lvupTaps, ', lvupQ:', lvupQ);
						
						lvupTap(2, result.y, 'FDB000', '8C4800');
						tapFor(tapX1, tapY1, 6, 30, 100, 100);
						
						lvupTaps = new Array( '', 20, 12, 5, 3);
						// rbm.log('3 lvupTaps:', lvupTaps, ', lvupQ:', lvupQ);
						
						a = a + 1;
					}
				}
				if (villagelv == -1 || villagelv >= 160) {break;}
				if (result.y >= 1070) {	break; }
			}
			if (a > 0) {
				console.log('a:', a);
				return false;
			}
		}
		sleep(100);
	}
}

function villagerobotplant() {  //村莊機器人判斷
	if (!config.isRunning) return false;
	
	var a = 0;
	for (var i = 1; i <= 20; i++){
		if (!config.isRunning) return false;
		
		rbm.keepScreenshotPartial( 5, 540, 320, 1190);  //村莊機器人工廠確認
		var Img1 = rbm.findImage('robotplant.png', 0.90);
		var Img2 = rbm.findImage('robotplantpic.png', 0.90);
		var Img3 = rbm.findImage('robotplantpicauto.png', 0.90);
		rbm.releaseScreenshot();
		
		// if (Img1 != undefined) { rbm.log('Img1:',Img1); }
		// if (Img2 != undefined) { rbm.log('Img2:',Img2); }
		// if (Img3 != undefined) { rbm.log('Img3:',Img3); }
		
		if ((Img1 != undefined && Img1.y < 1085) || (Img2 != undefined && Img2.y < 1085)) {
			rbm.log('有機器人工廠，未在底端，等定位', i);
		}else if (Img1 == undefined && Img2 == undefined && Img3 == undefined) {
			rbm.log('機器人工廠未開啟 1'); 
			return 1;
		}else if (Img1 != undefined && Img2 != undefined && Img3 == undefined) { 
			rbm.log('機器人工廠已開啟，未達自動 2'); 
			return 2;
		}else if (Img1 != undefined && Img2 != undefined && Img3 != undefined) { 
			rbm.log('機器人工廠已開啟，達到自動 3'); 
			return 3;
		}else if (Img1 != undefined && Img2 == undefined) { 
			rbm.log('機器人工廠已開啟，圖示不存在 4'); 
			return 4;
		}else if (Img1 == undefined && Img2 != undefined) { 
			rbm.log('機器人工廠已開啟，名稱不存在 5'); 
			return 5;
		}

		sleep(150)
	}
	console.log('無法判斷，異常 -1')
	return -1;
}


// -升級通用-----
function lvupTap(uplv, intY, strOK, strNG) {  //英雄、村莊升級
	if (!config.isRunning) return false;
	// console.log('Lv Up Tap!!');

	var lvupX = [20, 580, 540, 440, 340, 250];
	var lvupCheckNG = checkPointcolor(lvupX[1], intY, 30, strNG);
	var lvupCheckOK = checkPointcolor(lvupX[1], intY, 30, strOK);
	// console.log('lvupCheckNG', lvupCheckNG, ', lvupCheckOK', lvupCheckOK);
	// console.log('NG:', lvupX[1], intY, 30, strNG);
	// console.log('OK:', lvupX[1], intY, 30, strOK);

	if (lvupCheckNG) {return false;}
	if (lvupCheckOK) {
		if (uplv > 1) {		
			DIY_swipe(lvupX[1], intY, 160, intY, 60, 150);
		}
		for (var j = uplv; j >= 1; j--){
			checkPointcolorTap(lvupX[j], intY + 3, 40, strOK, 1, 1, lvupTaps[j], 80, 1);
			if (lvupTaps[j] > 0) {
				var checkcolor = checkPointcolor(lvupX[j], intY + 3, 40, strOK);
				if (checkcolor) {
					tapFor(lvupX[j], intY, lvupTaps[j], 40, 60, 30);
				}

			}
			if (uplv == 4) break;
		}
	}
	return true;
}

// -輪迴-----
function toRincarnation(Timer) {  //輪迴   OK
	if (!config.isRunning || Date.now() < toRincarnTimer) return false;
	if (!useReturn(51)) return false;
	if (!toRincarnSw) return false;
	console.log('輪迴');
	
	DalyDungeonsLv = 1;
	setFirstTimer()     //設定初始值
	for (var i = 1; i <= 4; i++){
		if (!config.isRunning) return false;
		
		if (useReturn(1)) {
			CheckImageTap(20, 30, 85, 75, 0.85, 'reincarnationButton.png', 1, 1, 2, 500, 1);      //主畫面左上輪迴鈕
			
			if (useReturn(42)) {
				a = 1;
				for (var j = 1; j <= 70; j++){
					if (!config.isRunning) return false;
					//if (useReturn(41)) return false;
					console.log('Reincarnation', i, j);

					if (useReturn(41)) {
						tapFor( 650, 200, 2, 50, 100);
						console.log(' Lv < 140 out Rincarnation')
						toRincarnTimer =  Date.now() + Timer * 1000;
						return false;
					}
					
					if (doubMG) {
						var reincX2CHK = CheckImageTap(60, 600, 650, 1100, 0.90, 'reincarnationx2OK5.png', 1, 1, 2, 500, 2, 0);      //輪迴按鈕X2
						if (reincX2CHK) {
							tapFor(300, 1030, 2, 30, 200, 1000);
						}else {
							CheckImageTap(200, 980, 280, 1150, 0.80, 'reincarnationOK.png', 1, 1, 2, 500, 1);      //輪迴按鈕
						}
					} else { 
						CheckImageTap(200, 980, 280, 1150, 0.80, 'reincarnationOK.png', 1, 1, 2, 500, 1);      //輪迴按鈕
					}

					CheckImageTap(280, 630, 440,  680, 0.80, 'reincarnationQ.png', 480, 830, 2, 500, 0, 0);      //輪迴確認
					CheckImageTap(200, 980, 280, 1110, 0.80, 'reincarnationOK.png', 1, 1, 2, 500, 1, 0);      //輪迴按鈕
					CheckImageTap(280, 630, 440,  680, 0.80, 'reincarnationQ.png', 480, 830, 2, 500, 0, 0);      //輪迴確認
					CheckImageTap(300, 1105, 410,  1270, 0.80, 'reincarnationOKbtn.png', 1, 1, 1, 500, 1, 0);      //輪迴"好"按鈕
					
					if(rouletShotSw) {
						var roulet = CheckImageTap(300, 900, 420, 1080, 0.80, 'reincarnGame.png', 1, 1, 2, 500, 2);         //輪盤遊戲開始鈕
						if (roulet) {
							console.log('Shot Roulette');
							ScreenShottoPath('reincarRoulette');
							sleep(500);

							tapFor(360, 1000, 2, 30, 100, 500);
						}

						var reinGame_dk = CheckImageTap(300, 900, 420, 1080, 0.80, 'reincarnGame_dark.png', 630, 215, 10, 500, 2, 0);    //輪盤遊戲開始鈕_按過
						if (reinGame_dk) {
							tapFor(630, 215, 4, 30, 50, 500);
							console.log('Shot reincarnGame_dark2 ');
							ScreenShottoPath('reincarnGame_dark2 ');
							sleep(100);
	
							tapFor(630, 215, 7, 30, 50, 200);
						}
					}

					// CheckImageTap(300, 900, 420, 1080, 0.80, 'reincarnGame.png', 1, 1, 2, 500, 1);              //輪盤遊戲開始鈕
					// CheckImageTap(300, 900, 420, 1080, 0.80, 'reincarnGame_dark.png', 630, 215, 10, 500, 1);    //輪盤遊戲開始鈕_按過

					CheckImageTap(185, 75, 245, 135, 0.85, 'getnewthing.png', 360, 310, 12, 500, 0, 0);    //得到新物品
					CheckImageTap(500, 0, 720, 530, 0.85, 'rightupXX.png', 1, 1, 1, 200, 1, 0);    //右上的叉叉

					if (useReturn(1)) {
						a = a + 1;
						if (a >= 2) { sleep(200); return false }
					}
					
					sleep(200);
					toRincarnTimer =  Date.now() + Timer * 1000;
				}
			}
		}
		sleep(200);
	}
}

function stagerincarnation() {  //自動輪回   OK
	if (!config.isRunning) return false;
	
	//console.log('stage:', 'spdongeonSw:', spdongeonSw)
	//console.log('stage:', recoNum(1), 'spdongeonSw:', spdongeonSw)
	
	
	var ministage  =  ministageSw;
	var maxstage   =  19500;
	var stuckstage =  -1; 
	var rintimes1  =  rintimes1Sw;

	stage = stageChk();
	// stage = recoNum(1) * 1;
	
	// if (stage - stageOld > 10) {
	// 	console.log('關卡辨識有誤, stageOld:', stageOld, ', stage:', stage);
	// 	stage = stageOld
	// }
	console.log('第', stage, '關,', mainMsg, ', 寶物:', artifictGet);

	if (!toRincarnSw) {
		console.log('自動輪迴:關閉'); 
		return false;
	}

	// if (stage % 50 == 0) {console.log('關卡', stage, '到達');}
	if (stage >= ministage && stage <= maxstage) {
		RinF = RinF + 1;
		//console.log('Rang:', RinF + '/' + rintimes1, ', Stuck:',  RinF + '/' + rintimes2);
		console.log('Rang:', RinF + '/' + rintimes1);
		
		if (RinF >= rintimes1) {
			console.log('超過' + ministage + '關，檢查' + rintimes1 + '次，進行輪迴');
			toRincarnTimer = 0;
			toRincarnation(600);
		}
	}
	else if (autoStuck() >= autoStuckSw) {
		toRincarnTimer = 0;
		toRincarnation(600);
	}
}

function stageChk() {
	var stageGet = recoNum(1) * 1;
	if (stageOld > 0) {
		if (stageGet - stageOld > 20) {
			// console.log('關卡辨識有誤, stageOld:', stageOld, ', stageGet:', stageGet);
			stageOld = -1
			return -1
		} else {
			// console.log('關卡辨識正確, stageOld:', stageOld, ', stageGet:', stageGet);
			stageOld = stageGet
			return stageGet
		}
	}else if(stageOld < 1){
		// console.log('關卡暫存比對, stageOld:', stageOld, ', stageGet:', stageGet);
		stageOld = stageGet
		return -1
	}
}

function autoStuck() {  //  卡關自動判斷式   OK
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

function tapBox(vdX, mode) {  //寶箱亂亂點之術
	if (!config.isRunning) return false;
	if (!useReturn(2)) getADSpeed();
	if (!useReturn(51)) return false;
	// console.log('寶箱亂亂點之術');
	
	var bossStage = stage % 100  //0:為boss關
	
	stagerincarnation();
	
	//console.log('1:', useReturn(1));
	if (useReturn(1)) {
		checkPointcolorTap(690, 510, 20, 'FFFFFF', 0, 0, 2, 100, 1)
		
		if (mode == 1) {
			if (bossStage != 0) {
				tapFor(  40,   410, 2, 70, 70);			
				tapBoxXY(1, 1, vdX);
			}
			
			if (useReturn(50)) { getADBox();}  //console.log('mid1:ADBox');
			
			tapFor(  680,   410, 2, 70, 70);
			tapBoxXY(2, 1, vdX);
			
			//tapSkill(5);
		}
		else if (mode == 2) {
			if (bossStage != 0) {
				tapFor(40, 410, tapRLtimeSw, 30, 50, afterRLDySw);
				var crystalR = checkCrystal(1, crystalCKSw, 2);
				tapBoxXY(1, 1, vdX);
			}
			
			if (useReturn(50)) { getADBox();}  //console.log('mid2:ADBox');
			
			tapFor(680, 410, tapRLtimeSw, 30, 50, afterRLDySw);
			if (bossStage != 0) {
				var crystalR = checkCrystal(2, crystalCKSw, 2);
			}
			tapBoxXY(2, 1, vdX);
		}
	
		//if (crystalR != undefined || bossStage == 0 || mode == 1) {}
		tapSkill(5, 1);

		if (mode == 2) {
			sleep(skillslepSw);
		}
		
		if (useReturn(50)) { getADBox();}  //console.log('bot:ADBox');
	}
}

function checkCrystal(modLR, times, pics) {   //檢查左右水晶   OK
	if (!config.isRunning) return false;
	//console.log('水晶坐標定義');
	
	var crystalXY = { 
	    // 1: ['Left :', 140, 275, 185, 335], //左水晶
	    // 2: ['Right:', 520, 275, 565, 335]  //右水晶
	    1: ['Left :',  69, 245, 140, 335], //左水晶
	    2: ['Right:', 510, 245, 590, 335]  //右水晶
	}; 	
	
	//console.log('水晶坐標定義', crystalXY[modLR][0], crystalXY[modLR][1], crystalXY[modLR][2], crystalXY[modLR][3], crystalXY[modLR][4]);
	
	for (var j = 1; j <= times; j++){
		rbm.keepScreenshotPartial( crystalXY[modLR][1], crystalXY[modLR][2], crystalXY[modLR][3], crystalXY[modLR][4]);  //水晶位置抓圖
		for (var i = 1; i <= pics; i++) {
			var Img = rbm.findImage('crystal3_' + i + '.png', 0.75);
			//rbm.log(crystalXY[modLR][0], j, i, Img);
			//if (Img != undefined) { rbm.log(crystalXY[modLR][0], j, i, Img); break; }
			if (Img != undefined) { break; }
		}
		rbm.releaseScreenshot();
		if (Img != undefined) { break; }
		sleep(35);
	}

	return Img;
}

function tapBoxXY(modLR, times, vdX2) {  //路上連點  OK
	if (!config.isRunning) return false;
	console.log('1111 !getADBoxSw');
	if (!getADBoxSw) return false;
	console.log('2222 !activityCheck[1]', activityCheck[1]);
	if (activityCheck[1] == -1) return false;
	console.log('3333 actFx3today:', actFx3today, ',treachest_x0:', treachest_x0);
	if (activityCheck[1] == 4 && treachest_x0 > 0) return false;  //activityCheck[1]  3倍f 檢查結果 1:無, 2:有-開啟, 3:有-等待
	// if (actFx3today && treachest_x0 > 0) return false;
	console.log('路上連點');
	
	var tapX = { 
	    1: ['Left  X:', 210, 285, ''], //左半邊  新版 [2]y差值 -60 ok
	    2: ['Right X:',  90, 285, '']  //右半邊  新版 [2]y差值 -60 ok
	}; 		
		
	var dX = ( 600 - 220 ) / vdX2
	for (var i = 1; i <= times; i++){
		for (var j = 1; j <= vdX2 + 1; j++){
			if (!config.isRunning) return false;
			var tapBX = tapX[modLR][1] + dX * (j - 1);
			tapFor(tapBX, tapX[modLR][2], 1, 15, 10, 10);
			tapX[modLR][3] = tapX[modLR][3] + tapBX + ', ';
		}
	}
	//console.log(tapX[modLR][0], tapX[modLR][3])
}

function tapSkill(pc, mod) {   //點大技  mod: 1:刷關  2:打BOSS
	if (!config.isRunning) return false;
	if (!tapSkillSw && mod == 1) return false;
	if (!useReturn(51) && mod == 1) return false;
	// console.log('放大技, 模式:', mod);
	
	var skill_n = [66, 360, 418];
	var skill_b = [74, 438, 538];

	if (mod == 1) {var midX = skill_n[1]; var skilldX =  skill_n[0]; var skillY = skill_n[2];}
	if (mod == 2) {var midX = skill_b[1]; var skilldX =  skill_b[0]; var skillY = skill_b[2];}
	var firstX = midX - skilldX / 2 * pc + 50 

	if ((mod == 1 && useReturn(1)) || mod == 2) {
		for (var i = 1; i <= pc; i++){ 
			if (!config.isRunning) return false;
			
			var skillX = firstX + skilldX * (i - 1);
			// console.log(i, skillX, stage, mod, useReturn(1));

			if (checkPointcolor(skillX, skillY, 30, 'FFFFFF')) {
				tapFor( skillX, skillY + 5, 2, 40, 50);
				if (mod == 1) {
					stoptime[1] = 0;
					if (stage % 100 != 0) return false;
				}
			}

		}
	}
}

function tapSkill2(ski, skf, timer) {    //設定時間差點大技打水晶
	if (!config.isRunning || Date.now() < skilltimer) return false;
	if (!tapSkillSw) return false;
	if (!useReturn(51)) return false;
	console.log('時間差放大技', timer, '秒');
	
	var skillcolor = new Array( '', '0094C8', 'FAED0E', '', '', '')
	
	//tapFor(  680,   410, 2, 50, 100);
	if (checkPointcolor(690, 510, 15, '2B1708')) {
		for (var i = ski; i <= skf; i++){ 
			if (!config.isRunning) return false;
			
			var skillX = 150 + 104 * (i - 1);
			
			if (checkPointcolor(skillX, 1010, 30, 'FFFFFF')) {
				tapFor( skillX, 1020, 4, 50, 60);
				stoptime[1] = 0;
				if (stage % 100 != 0) return false;
			}
		}
	}
}

//==============================遊戲function=====================================//
function Guildchat(Timer) {  //公會聊天室幫助&領取
	if (!config.isRunning) return false;
	if (!guildchatSw) return false;
	if (!useReturn(61)) return false;
	if (Date.now() < GuildchatTimer && !useReturn(51)) return false;
	// if (!useReturn(51)) return false;
	if (!useReturn(2)) return false;
	console.log('工會聊天室幫助&領取');

	for (var i = 1; i <= 8; i++){
		if (!config.isRunning) return false;
		
		sleep(200);
		if (useReturn(1)) {
			
			gotoGuildChat();    //進入工會聊天畫面

			var scoreValue = 0.80
			// var a = 0;
			// for (var j = 1; j <= 6; j++){
				
			// 	if (!config.isRunning) return false;
			// 	var scoreValue = 0.80
			// 	//console.log('Go Guild Chat', j);
				
			// 	rbm.keepScreenshotPartial( 0, 425, 250, 500);             //
			// 	var Img1 = rbm.findImage('chatMenuButton.png', scoreValue);
			// 	var Img2 = rbm.findImage('guildChatButton.png', scoreValue);  //
			// 	// rbm.log('chatMenuButton img 1:', Img1);
			// 	// rbm.log('guildChatButton img 2:', Img2);
			// 	rbm.releaseScreenshot();
				
			// 	if (Img1 != undefined && Img1.score >= scoreValue) {
			// 		if (Img2 == undefined || ( Img2 != undefined && Img2.score < 0.8)) {
			// 			tapFor( Img1.x + 10, Img1.y + 10, 1, 60, 100);
			// 			//console.log('No GuildChatButton Tap AllChatButton')
			// 		}
			// 		else if (Img2 != undefined && Img2.score >= scoreValue) {
			// 			tapFor(Img2.x + 10, Img2.y + 10, 1, 60, 1500);
			// 			//console.log('Yes GuildChatButton Tap GuildChatButton')
			// 		}
			// 	}
				
			// 	if (useReturn(8)) {a = a + 1; if (a >= 2) break;}
			// 	sleep(300);
			// }
			
			var a = 0;
			for (var k = 1; k <= 6; k++){
				if (!config.isRunning) return false;
				if (!useReturn(8)) return false;
				
				rbm.keepScreenshotPartial( 540, 65, 720, 1080);             //
				var Img3 = rbm.findImage('guildChathelp.png', scoreValue);
				var Img4 = rbm.findImage('guildChatget.png', scoreValue);  //
				// rbm.log('guildChathelp.png Img3', Img3);
				// rbm.log('guildChatget.png Img4',Img4);
				rbm.releaseScreenshot();
				
				if (Img3 != undefined) {
					tapFor( Img3.x + 10, Img3.y + 10, 2, 120, 300);
					//console.log('Have Help', k);	
				}
				else if (Img4 != undefined) {
					tapFor(Img4.x + 10, Img4.y + 10, 5, 120, 400);
					//console.log('Have Get', k);
				}
				else if (Img3 == undefined && Img4 == undefined) {
					a = a + 1;
					if (a >= 1) break;
					DIY_swipe(480, 600, 480, 800, 30, 1000);
				}
				
				CheckImageTap(270, 540, 450, 620, 0.90, 'nohelpneed.png', 1, 1, 1, 500, 1);       //沒有幫助需求
				
				sleep(300)
			}
			
			var a = 0;
			for (var l = 1; l <= 15; l++){
				if (!config.isRunning) return false;
				if (!useReturn(8)) return false;
				
				CheckImageTap(630, 1200, 690, 1260, 0.90, 'guildBack.png', 1, 1, 1, 1000, 1);       //公會退出鈕
				CheckImageTap(310,  600, 405, 1170, 0.85, 'OKbutton.png', 1, 1, 1, 200, 1, 0);    //確認鈕

				
				if (useReturn(1)) {
					GuildchatTimer =  Date.now() + Timer * 1000;
					a = a + 1;
					if (a >= 2) {console.log('公會幫助結束'); sleep(200); return false }
				}
				
				sleep(200);
			}

		}
	}
}

function GuildBoss(bosslv, th13, pc, Timer) {  //公會BOSS
	if (!config.isRunning || Date.now() < GuildBossTimer) return false;
	if (!guildbossSw) return false;
	if (!useReturn(51)) return false;
	if (!useReturn(2)) return false;
	console.log('工會打BOSS');

	for (var i = 1; i <= 15; i++){
		if (!config.isRunning) return false;
		//console.log('Guild Boss Fight : ', i );

		rbm.keepScreenshotPartial( 280, 1190, 440, 1280);  //確認打boss
		var Img3 = rbm.findImage('guildTimerlimiticon.png', 0.90);
		var Img4 = rbm.findImage('guildTimerlimiticon_dark.png', 0.90);
		rbm.releaseScreenshot();		
		
		
		if (Img3 == undefined && Img4 == undefined) {
			CheckImageTap(610, 1200, 690, 1260, 0.90, 'guildbutton.png', 1, 1, 1, 500, 1, 0);    //進入工會頁面

		}else if (Img3 == undefined && Img4 != undefined) {
			tapFor(Img4.x, Img4.y, 1, 70, 400);

		}else if (Img3 != undefined && Img4 == undefined) {


			var bossEng = recoNum(7);
			var diffEng = bossEng - guildbossegSw - (100 + 200 * (guildbossthSw - 1));
			console.log('guild boss energy:', bossEng, ', difference energy:', diffEng);
			if (diffEng >= 0) {
				console.log('主畫面 能量足夠, 可以打BOSS!!')
			}else if (diffEng < 0) {
				console.log('主畫面 能量不足, 不打BOSS!!')
				Timer = 3600;
				GuildBossTimer =  Date.now() + Timer * 1000;
				console.log('Fight Boss Wait Time:', (GuildBossTimer - Date.now())/1000, 'sec');
				sleep(1000);
				keycode('BACK', 600);
				return false;
			}

			var bossft_dX = 0;

			rbm.keepScreenshotPartial( 250, 280, 470, 360);  //確認有工會戰爭偏移找團戰
			var Img5 = rbm.findImage('guildfightlable_CN.png', 0.90);
			rbm.log('guildfightlable_CN:', Img5);
			if (Img5 == undefined) {
				Img5 = rbm.findImage('guildfightlable_EN.png', 0.90);
				rbm.log('guildfightlable_EN:', Img5);
			}
			rbm.releaseScreenshot();


			// rbm.keepScreenshotPartial( 250, 280, 470, 360);  //確認有工會戰爭偏移找團戰
			// var Img5 = rbm.findImage('guildfightlable.png', 0.90);
			// console.log('Img5:', Img5);
			// rbm.releaseScreenshot();

			if (Img5) {bossft_dX = 250;}
			// console.log('bossft_dx:', bossft_dX);

			rbm.keepScreenshotPartial( 560, 150 + bossft_dX, 705, 370 + bossft_dX);  //確認打boss碼表圖
			var Img2 = rbm.findImage('guildBosslock.png', 0.90);
			rbm.releaseScreenshot();
			
			if (Img2 != undefined) {
				console.log('沒有工會boss可打，跳出');
				Timer = 3600;
				GuildBossTimer =  Date.now() + Timer * 1000;
				return false;
			}

			if (Img2 == undefined) {
				console.log('工會boss開放可打');
				tapFor(560, 150 + bossft_dX, 1, 70, 400);
			}
		}

		if (useReturn(91)) {   //工會BOSS,右上?圖
			for (var j = 1; j <= 80; j++){
				if (!config.isRunning) return false;
				//console.log('Guild Boss Fight : ', i, j );

				if (!useReturn(21)){  //BOSS戰鬥，撤退鈕
					//console.log('GuildBoss:', bosslv, th13);
					
					if (useReturn(91)) {

						bossEng = recoNum(7);
						diffEng = bossEng - guildbossegSw - (100 + 200 * (guildbossthSw - 1));
						console.log('guild boss energy:', bossEng, ', difference energy:', diffEng);
						if (diffEng >= 0) {
							console.log('選BOSS畫面 能量足夠, 可以打BOSS!!')

						}else if (diffEng < 0) {
							console.log('選BOSS畫面  能量不足, 不打BOSS!!')
							Timer = 3600;
							GuildBossTimer =  Date.now() + Timer * 1000;
							console.log('Fight Boss Wait Time:', (GuildBossTimer - Date.now())/1000, 'sec');
							sleep(1000);
							keycode('BACK', 600);
							keycode('BACK', 600);
							return false;
						}


						var bossfig = GuildBossCK(bosslv, th13);
						if (bossfig == -1) {
							keycode('BACK', 600);
							keycode('BACK', 600);
							Timer = 600;
							GuildBossTimer =  Date.now() + Timer * 1000;
							console.log('Fight Boss Wait Time:', (GuildBossTimer - Date.now()/1000), 'sec');
							return false;
						}

					}else {
						rbm.keepScreenshotPartial( 310, 700, 405, 1170);  //確認是否有OK鈕
						var Img1 = rbm.findImage('OKbutton.png', 0.90);
						rbm.releaseScreenshot();
						if (Img1 != undefined) {
							tapFor(Img1.x, Img1.y, 1, 70, 400);
						}
						
						CheckImageTap(185, 75, 245, 135, 0.85, 'getnewthing.png', 1, 1, 5, 500, 1, 0);    //得到新物品
					}

				}
				else {
					//console.log('Fight Boss');
					tapFor(680, 410, 2, 70, 150);
					tapSkill(5, 2);

				}
				sleep(1000);
			}
		}
		sleep(500);
	}
}

function GuildBossCK(bosslv, th13) {  //公會BOSS
	if (!config.isRunning) return false;
	//if (!useReturn(61) && Date.now() < GuildBossTimer) return false;
	//if (!guildbossSw) return false;
	//if (!useReturn(51)) return false;
	//if (!useReturn(2)) return false;
	
	if (!useReturn(91)) return false;
	console.log('工會BOSS, 選BOSS來打');
	
	
	for (var i = 1; i <= 20; i++){
		if (!config.isRunning) return false;
		console.log('選boss，迴圈:', i);

		rbm.keepScreenshotPartial( 475,  380, 565, 1105);  //找打BOSS組隊圖示
		var Img0s = rbm.findImages('guildbossteamicon_2.png', 0.90, 4, true, false);
		if (Img0s == ''){
			Img0s = rbm.findImages('guildbossteamicon_1.png', 0.90, 4, true, false);
		}
		rbm.releaseScreenshot();
		
		if (Img0s != '')  {
			Img0s = Img0s.sort(function (a, b) {return a.y > b.y ? 1 : -1;});	
			
			var countImg1 = 0;
			for (var index in Img0s) {
				if (!config.isRunning) return false;
				var result = Img0s[index];
				countImg1 = countImg1 + 1;
				
				rbm.log('guildbossteamicon2.png:', countImg1, result)
				var intX1 = result.x - 480;
				var intY1 = result.y - 180;
				var intX2 = result.x - 468 + 130;
				var intY2 = result.y - 101 + 200;
				break;
			}
			
			console.log('intX1,  intY1, intX2, intY2:', intX1,  intY1, intX2, intY2);
			rbm.keepScreenshotPartial(intX1,  intY1, intX2, intY2);  //BOSS降級按鈕
			var Img1 = rbm.findImage('guildbossdonwlvbutton.png', 0.90);
			var Img2 = rbm.findImage('guildbosshelpicon.png', 0.90);
			// rbm.log('guildbossdonwlvbutton:',Img1);
			// rbm.log('guildbosshelpicon:',Img2);
			rbm.releaseScreenshot();
			
			// if (Img1 != undefined) { rbm.log('guildbossdonwlvbutton:',Img1); }
			// if (Img2 != undefined) { rbm.log('guildbosshelpicon:',Img2); }	
			
			if (Img1 != undefined && Img2 == undefined) {
				tapFor( Img1.x, Img1.y, 1, 60, 200);
			}


			var downLvBtn = 1;
			rbm.keepScreenshotPartial(10, 380, 180, 1120);  //BOSS LV文字
			for (var j = 1; j <= 5; j++) {
				var filename = 'guildBossLv_0' + j + '.png';
				var Img7 = rbm.findImage(filename, 0.90);
				// rbm.log(filename, ':', Img7);

				if (Img7 != undefined ) {
					rbm.log(filename, 'OK', Img7);
					if (Img7.x < 100) {
						console.log(filename, 'x<100:', Img7.x);
						downLvBtn = 0;
					}
					break;
				}
			}
			rbm.releaseScreenshot();

			console.log('downLvBtn:', downLvBtn);
			if ((downLvBtn == 0) || (Img1 != undefined && Img2 != undefined)) {
				if (!config.isRunning) return false;
				console.log('確認難度選單開啟');
				
				if (downLvBtn == 1) {
					var checkX = Img2.x + 160 + 140 * (bosslv - 1);
					var color1 = checkPointcolor(checkX, Img2.y, 30, 'F28459');   //等級按鈕  5D3322:暗的, F28459:亮的
					
					if (!color1) {
						tapFor(checkX, Img2.y, 1, 60, 200);
					}
				}
				

				if (color1 || downLvBtn == 0) {
					if (!config.isRunning) return false;
					
					// console.log(400,  Img1.y, 690, Img1.y + 325);
					if (downLvBtn == 0) {
						rbm.keepScreenshotPartial(400, 440, 690, 730);  //找閃電 無降級

					}else {
						rbm.keepScreenshotPartial(400,  Img1.y, 690, Img1.y + 325);  //找閃電 有降級

					}
					
					var Img3 = rbm.findImage('guildbosschallenge.png', 0.90);
					var Img4 = rbm.findImage('thundericonBTN.png', 0.92);
					var Img6 = rbm.findImage('thundericonBTN_dark.png', 0.92);
					rbm.releaseScreenshot();
					
					// if (Img3 != undefined) { rbm.log('guildbosschallenge:',Img3); }
					// if (Img4 != undefined) { rbm.log('thundericonBTN:',Img4); }
					// if (Img6 != undefined) { rbm.log('thundericonBTN_dark:',Img6); }


					if (Img3 != undefined) {
						
						if (Img6 != undefined) {
							console.log('閃電低於', 100 + 200 * (th13 - 1), '，閃電不足，跳出');
							return -1;
							
						}else if (Img4 == undefined) {
							tapFor( Img3.x, Img3.y, 1, 60, 300);

						}else if (Img4 != undefined) {
							console.log('等待開打選100 or 300 閃電');
							
							var tapX = 440;
							if (th13 == 3) {tapX = 580;}
							
							// console.log(tapX, Img4.y, 30, 'E78900');
							var color2 = checkPointcolor(tapX, Img4.y + 50, 30, 'E78900');   //等級按鈕  7E1C23:暗的, E78900:亮的
							// if (color2) { rbm.log('color2:', color2, tapX, Img4.y); }
							
							if (color2) {
								console.log('BOSS開打，選', 100 + 200 * (th13 - 1), '閃電', tapX, Img4.y + 10)
								tapFor( tapX, Img4.y + 10, 1, 60, 500);
							}
							// else if (!color2) {
							// 	console.log('閃電低於', 100 + 200 * (th13 - 1), '，閃電不足，跳出');
							// 	return -1;
							// }
						}


					}
				}
			}
		
		}

		if (useReturn(21)){ break; }
		if (i == 20){ return -1;}
		sleep(200);
	}
}

function GuildOrder() {         //公會接收命令
	if (!config.isRunning) return false;
	console.log('GuildOrder');

	if (guildChattest  <= 2){
		rbm.keepScreenshotPartial( 17, 1110, 700, 1140);             //
		var Img1 = rbm.findImage('guildOrder/order_0805466.png', 0.94);
		var Img2 = rbm.findImage('guildOrder/order_0806449.png', 0.94);  //
		rbm.log('order_0805466 img 1:', Img1);
		rbm.log('order_0806449 img 2:', Img2);
		rbm.releaseScreenshot();
		
		if (Img1 != undefined) {
			GuildCheat('order_0805466 : Hi!! I am here!!');    //工會聊天發言
			guildChattest = guildChattest + 1;
			sleep(3000);

		}else if (Img2 != undefined) {
			GuildCheat('order_0806449 : Hi!! I am there!!');    //工會聊天發言
			guildChattest = guildChattest + 1;
			sleep(3000);
		}

	}

}

function GuildCheat(str) {      //工會聊天發言
	if (!config.isRunning) return false;

	gotoGuildChat();    //進入工會聊天畫面
	tapFor(130, 1130, 3, 30, 100, 1500);
	//'Hi!! I am here!!'

	rbm.typing(str);

	tapFor(630, 1130, 1, 30, 100, 1000);

	keycode('BACK', 1000);
	keycode('BACK', 1000);
}

function Guildmedal(attrib, herocode, Timer) {  //工會求勛章
	console.log('Date.now() - GuildmedalTImer:', (Date.now() - GuildmedalTimer)/1000);
	if (!config.isRunning || Date.now() < GuildmedalTimer) return false;
	if (!guildmaldSw) return false;
	if (!useReturn(51)) return false;
	if (!useReturn(2)) return false;
	console.log('工會求勛章');

	var week = new Date().getDay() * 1;
	var hours = new Date().getHours() * 1;

	if (week == 0) {
		var attrib = heroattrib2Sw;
		var herocode = herocode2Sw;
	}
	// console.log('week:', week, ', attrib:', attrib, ', herocode:', herocode);
	
	for (var i = 1; i <= 8; i++){
		if (!config.isRunning) return false;

		var weekCal = new Date().getDay() * 1;
		var week = weekCal % 7;
		// console.log('week:', week);

		var stopChk = 0;
		var todayNowTime = new Date();                     //現在時間
		console.log('todayNowTime:', todayNowTime);        //現在時間

		if (week == 6) {
			var stopAskTime = new Date();                  //停止求勳章起始時間
			stopAskTime.setDate (stopAskTime.getDate() + 0);
			stopAskTime.setHours (16);
			stopAskTime.setMinutes (0);
			stopAskTime.setSeconds (0);
			console.log('stopAskTime:', stopAskTime);      //停止求勳章起始時間
			
			if (todayNowTime > stopAskTime) {
				console.log('遊戲時間：周六 16:00 ~ 00:00，停止求勳章!!');
				stopChk = 1;
			}

		}else if(week == 0) {
			var epicsAskTime = new Date();                 //停止求勳章結束時間
			epicsAskTime.setDate (epicsAskTime.getDate());
			epicsAskTime.setHours (0);
			epicsAskTime.setMinutes (15);
			epicsAskTime.setSeconds (0);
			console.log('epicsAskTime:', epicsAskTime);    //停止求勳章結束時間

			if (todayNowTime < epicsAskTime) {
				console.log('遊戲時間：周日 00:00 ~ 00:15，停止求勳章!!');
				stopChk = 1;
			}
		}

		if (stopChk) {
			console.log('遊戲時間：周六 16:00 ~ 周日 00:15，停止求勳章!!');
			console.log('周日 00:30 後 600 秒檢查!!');
			
			GuildmedalTimer =  Date.now() + 600 * 1000;
			CheckImageTap2(620, 1200, 690, 1260, 0.85, 'guildBack.png', 'guildBack2.png', 1, 1, 1, 200, 1);    //公會退出鈕1,2
			return false;

		}else {
			console.log('符合求勳章時間!!')
		}


		sleep(200);
		if (useReturn(1)) {
			
			gotoGuildChat();    //進入工會聊天畫面

			var scoreValue = 0.80
			var a = 0; b = 0;
			for (var k = 1; k <= 25; k++){
				if (!config.isRunning) return false;
				//if (!useReturn(8)) return false;
				//console.log('Guildmedal', i, j, k);
				
				rbm.keepScreenshotPartial( 5, 1075, 95, 1170);             //求勛章按鈕
				for (var k = 1; k <= 3; k++) {
					var filename = 'guildmedalbutton_' + k + '.png'
					var Img3 = rbm.findImage(filename, 0.90);
					rbm.log(filename + ':', Img3);
					if (Img3 != undefined) {break;}
				}
		
				var Img7 = rbm.findImage('guildmedalbutton_dark.png', 0.90);
				var Img8 = rbm.findImage('guildmedalgetbutton.png', 0.90);
				// rbm.log('Img3:', Img3);
				// rbm.log('Img7:', Img7);
				// rbm.log('Img8:', Img8);
				rbm.releaseScreenshot();
				
				//if (Img3 != undefined) {rbm.log('Img3:', Img3);}
				//if (Img7 != undefined) {rbm.log('Img7:', Img7);}
				//if (Img8 != undefined) {rbm.log('Img8:', Img8);}
				
				if (Img8 != undefined) {
					tapFor(Img8.x + 10, Img8.y + 10, 4, 60, 300);
					a = 0;
				}
				if (Img3 != undefined) {
					tapFor(Img3.x + 10, Img3.y + 10, 1, 60, 300);
					a = 0;
				}
				else if (Img7 != undefined) {
					console.log('確認下次求勛章時間');
					
					for (var n = 1; n <= 5; n++){
						var waitStr = recoNum(6); //
						//console.log('waitStr:', waitStr);
						if (waitStr != 0) break;
						sleep(150);
					}
					
					var waithr = Math.floor(waitStr/10000);  // 獲1~2字串 hr
					var waitmin = Math.floor(waitStr/100) - waithr * 100; // 獲3~4字串 min
					var waitsec = waitStr - waithr * 10000 -  waitmin * 100; // 獲5~6字串 sec
					var totalsec = waithr * 3600 + waitmin * 60 + waitsec;
					
					//var waithr = waitStr.substr(0, 2);  // 獲1~2字串 hr
					//var waitmin = waitStr.substr(2, 2); // 獲3~4字串 min
					//var waitsec = waitStr.substr(4, 2); // 獲5~6字串 sec
					
					console.log('求勛章尚待:', waithr, ':', waitmin, ':', waitsec, '，共', totalsec, '秒');
					if (totalsec <= maldhelpupTSw) {
						console.log('等待總秒數小於設定:', totalsec * 1, '<=', maldhelpupTSw);
						for (var m = totalsec + 5; m >= 0; m--){
							if (!config.isRunning) return false;
							sleep(1000);
							console.log('等待倒數:', m, '秒');
						}

					}else if (totalsec > maldhelpupTSw) {


						var timerNext = waithr * 3600 + waitmin * 60 + waitsec - maldhelpupTSw + 5;
						GuildmedalTimer =  Date.now() + timerNext * 1000;
						console.log('下次檢查等待:', timerNext, '秒');
						
						CheckImageTap2(620, 1200, 690, 1260, 0.85, 'guildBack.png', 'guildBack2.png', 1, 1, 1, 200, 1);    //公會退出鈕1,2
						//console.log('GuildmedalTimer:', GuildmedalTimer, ', Date.now():', Date.now(), ', ', (GuildmedalTimer - Date.now())/1000);
	
						return false;
					}	
				}
				else {
					rbm.keepScreenshotPartial( 620, 365, 700, 415);             //屬性排列按鈕
					var Img4 = rbm.findImage('herolist_attributton_dark.png', 0.90);
					var Img5 = rbm.findImage('herolist_attributton.png', 0.90);
					rbm.releaseScreenshot();
					
					// if (Img4 != undefined) {rbm.log('Img4:', Img4);}
					// if (Img5 != undefined) {rbm.log('Img5:', Img5);}
					
					if (Img4 != undefined) {
						tapFor(Img4.x + 10, Img4.y + 10, 1, 60, 300);
						a = 0;
					}
					else if (Img5 != undefined || medalHero != undefined) {
						console.log('可以求勛章，點進選英雄');
						sleep(3000);
						var medalHero = herolistchoice(attrib, herocode);
						rbm.log('medalHero:', medalHero);
						
						if (medalHero != undefined) {
							rbm.log('找到目標英雄，點一下', medalHero.x + 30, medalHero.y - 220, medalHero.x + 170, medalHero.y - 160);
							
							rbm.keepScreenshotPartial( medalHero.x + 30, medalHero.y - 220, medalHero.x + 170, medalHero.y - 160);             //求勛章按鈕
							var Img6 = rbm.findImage('guildmedalfinded.png', 0.85);
							rbm.releaseScreenshot()
							
							// if (Img6 != undefined) {rbm.log('Img6:', Img6);}
							if (Img6 != undefined) {
								rbm.log('確定求勛章按鈕出現，可求勛章');
								tapFor(Img6.x, Img6.y, 21, 60, 500);
							}						
							else if (Img6 == undefined) {
								rbm.log('點選目標英雄，求勛章');
								tapFor(medalHero.x + 10, medalHero.y + 10, 1, 60, 500);
							}
						}
						else if (medalHero == undefined && Img6 == undefined && b <= 2) {
							rbm.log('找不到目標英雄，上移列表', ', b:', b);
							DIY_swipe(670, 1000, 670, 600, 30, 5000);
							b = b + 1;
						}
						a = 0;
					}
					else if (Img3 == undefined) {
						a = a + 1;
						if (a > 3) {break;}
					}
					if (b >= 2) break;
					//if (b >= 1) break;
					//console.log('a:', a);
					sleep(200)
				}
			}
			
			var a = 0;
			for (var l = 1; l <= 15; l++){
				if (!config.isRunning) return false;
				if (!useReturn(8)) return false;
				//console.log('Guildmedal', i, j, ', l:', l);
				
				CheckImageTap(630, 1200, 690, 1260, 0.90, 'guildBack.png', 1, 1, 1, 1000, 1);       //公會退出鈕
				
				if (useReturn(1)) {
					GuildmedalTimer =  Date.now() + Timer * 1000;
					a = a + 1;
					if (a >= 2) { sleep(200); return false }
				}
				sleep(200);
			}
			
		}
	}
}

function gotoGuildChat() {     //進入工會聊天畫面
	
	var a = 0;
	for (var j = 1; j <= 6; j++){
		
		if (!config.isRunning) return false;
		var scoreValue = 0.80
		//console.log('Go Guild Chat', j);
		
		rbm.keepScreenshotPartial( 0, 425, 250, 500);             //
		var Img1 = rbm.findImage('chatMenuButton.png', scoreValue);
		var Img2 = rbm.findImage('guildChatButton.png', scoreValue);  //
		// rbm.log('chatMenuButton img 1:', Img1);
		// rbm.log('guildChatButton img 2:', Img2);
		rbm.releaseScreenshot();
		
		if (Img1 != undefined && Img1.score >= scoreValue) {
			if (Img2 == undefined || ( Img2 != undefined && Img2.score < 0.8)) {
				tapFor( Img1.x + 10, Img1.y + 10, 1, 60, 100);
				//console.log('No GuildChatButton Tap AllChatButton')
			}
			else if (Img2 != undefined && Img2.score >= scoreValue) {
				tapFor(Img2.x + 10, Img2.y + 10, 1, 60, 1500);
				//console.log('Yes GuildChatButton Tap GuildChatButton')
			}
		}
		
		if (useReturn(8)) {a = a + 1; if (a >= 2) break;}
		sleep(300);
	}


}

function herolistchoice(attrib, herocode) {
	if (!config.isRunning) return false;
	//console.log('選英雄', attrib, no);
	
	if (maldShotSw) {ScreenShottoPath('CTA_herolistchoice_');}

	var atribdir = new Array( '', '1_water',  '2_fire',  '3_wood',  '4_light',  '5_dark')
	
	switch (attrib) {
		case 1: if (herocode > 18) {console.log(attrib, herocode, '編號錯誤，退出'); return false; }; break;
		case 2: if (herocode > 17) {console.log(attrib, herocode, '編號錯誤，退出'); return false; }; break;
		case 3: if (herocode > 18) {console.log(attrib, herocode, '編號錯誤，退出'); return false; }; break;
		case 4: if (herocode > 16) {console.log(attrib, herocode, '編號錯誤，退出'); return false; }; break;
		case 5: if (herocode > 18) {console.log(attrib, herocode, '編號錯誤，退出'); return false; }; break;
	}
	
	rbm.keepScreenshotPartial( 10, 455, 705, 1270);  //找英雄畫面
	var Img1 = rbm.findImage('hero_list_o/' + atribdir[attrib] + '/herolist_' + attrib + '_' + herocode + '.png', 0.85);
	var Img2 = rbm.findImage('hero_list_w/' + atribdir[attrib] + '/herolist_' + attrib + '_' + herocode + '.png', 0.85);
	rbm.releaseScreenshot();
	
	if (Img1 != undefined) {rbm.log("_o", 'herolist_' + attrib + '_' + herocode + '.png', 'Img1:',Img1);}
	if (Img2 != undefined) {rbm.log("_w", 'herolist_' + attrib + '_' + herocode + '.png', 'Img2:',Img2);}
	
	if (Img1 != undefined) {return Img2;}
	if (Img2 != undefined) {return Img2;}
	
}

function getDailyreward(Timer) {   //領取今日挑戰獎勵   OK
	if (!config.isRunning || Date.now() < getDailyTimer) return false;
	if (!useReturn(51)) return false;
	if (!useReturn(2)) return false;
	console.log('領取今日挑戰', ', f Coin:', recoNum(8));

	for (var i = 1; i <= 4; i++){
		if (!config.isRunning) return false;
		
		sleep(200);
		if (useReturn(1)) {
			choiceMenu(0);
				
			for (var j = 1; j <= 3; j++){
				if (!config.isRunning) return false;
				// console.log(' Daily Reward', i, j);
				
				var chkPointX = 400 + 106 * (j - 1);
				if (checkPointcolor(chkPointX, 710, 40, 'FF2281')) {
					for (var k = 1; k <= 3; k++){
						checkPointcolorTap(chkPointX, 710, 40, 'FF2281', 1, 1, 1, 1000, 1);
						
						// console.log('9:', useReturn(9));
						if (useReturn(9)) {
							
							var a = 0;
							for (var l = 6; l >= 1; l--) {
								var tapRewardY = 850 - 104 * (l -1);
								//console.log('l:', l, 550, tapRewardY, 60, checkPointcolor(550, tapRewardY, 60, '00C8DA'))
								if (checkPointcolor(550, tapRewardY, 60, '00C8DA')) {
									tapFor(550, tapRewardY, 2, 50, 100);
									a = a + 1;
								}
								
								if (l == 1 && a == 0) { 
									tapFor(640, 280, 3, 70, 200);
									getDailyTimer =  Date.now() + Timer * 1000;
								}
							}
						}
						
						sleep(200);
					}
				}
				else {
					CheckImageTap(500, 0, 720, 380, 0.90, 'rightupXX.png', 1, 1, 1, 300, 1);    //右上的叉叉
					CheckImageTap(500, 0, 720, 380, 0.90, 'rightupXX.png', 1, 1, 1, 300, 1);    //右上的叉叉
					CheckImageTap(500, 0, 720, 380, 0.90, 'rightupXX.png', 1, 1, 1, 300, 1);    //右上的叉叉
					getDailyTimer =  Date.now() + Timer * 1000;
					return false;
				}
				
				sleep(200);
			}
		}
	}
}

function DalyDungeons(mF2, pc, failureT, Timer) {  //【F2:材料魔王 1:水  2:火  3:木  4:光  5:暗】【PC:大技數量】
	console.log('Date.now() - maDungeonTimer:', (Date.now() - maDungeonTimer)/1000);
	if (!config.isRunning || Date.now() < maDungeonTimer) return false;
	if (!autoWeekSw) return false;
	if (!useReturn(51)) return false;
	if (!useReturn(2)) return false;
	//console.log('mF2:', mF2); console.log('mF2:', mF2, ', 本日自動打材料關閉'); 
	if (mF2 == 0) {return false;}
	if (actmaterialX2Sw && activityCheck[4] == -1) return false;
	
	var mmF2 = mF2
	if (spdongeonSw != 0 ){
		mmF2 = spdongeonSw;
	
		if (stage < spdstageSw) { 
			console.log('打活動怪:ON, 關卡未達', stage, '/', spdstageSw); 
			return false; 
		}
	}

	var dgticks = new Array( -1, -1, -1, -1);
	console.log('材料地下城 打材料', mmF2);
	checkPointcolorTap(690, 510, 20, 'FFFFFF', 0, 0, 2, 100, 1)
	choiceDungeon(1, mmF2);
	
	console.log('start choice BossLV');
	for (var i = 1; i <= 20; i++){
		if (!config.isRunning) return false;
		
		if (useReturn(1)) {
			var a = 1; var b = 1;
			for (var j = 1; j <= 190; j++){
				if (!config.isRunning) return false;
				// console.log('Choice Boss Fight : ', i, j, ', bossLV:', DalyDungeonsLv );

				// console.log('21:', useReturn(21));
				if (!useReturn(21)){  //BOSS戰鬥，撤退鈕，判斷不在boss畫面
					
					rbm.keepScreenshotPartial( 300, 990, 560, 1080);  //完成後確認鈕
					var targetImg3 = rbm.findImage('OKbutton.png', 0.80);
					rbm.releaseScreenshot();

					if (targetImg3 != undefined && targetImg3.score >= 0.80) {
						tapFor(targetImg3.x, targetImg3.y, 1, 60, 500);

					}else {	
						for (var l = 1; l <= 4; l++){
							dgticks[1] = recoNum(2); sleep(50); //1 確認目前票數
							dgticks[2] = recoNum(2); sleep(50); //2 確認目前票數
							dgticks[3] = recoNum(2); sleep(50); //3 確認目前票數
							
							// console.log('l:', l, dgticks[0], dgticks[1], dgticks[2], dgticks[3])
							if (dgticks[1] == dgticks[2] && dgticks[2] == dgticks[3] && dgticks[1] != -1){
								dgticks[0] = dgticks[1]; break;
							}
						}
						
						// console.log(' 24:', useReturn(24));
						if (useReturn(24)) {
							sleep(300);
							checkPointcolorTap(690, 510, 20, 'FFFFFF', 0, 0, 2, 100, 1);
							spdongeonSw = 0;
							console.log(' 0票，本活動BOSS次數用完，切回正常BOSS');
							return false;
						}
						
						var dgticksInput = dgticksSw;
						if (earlydgMaterialSw > 0) {
							var nextDaymateral = choiceMaterialboss(menuW0Sw, menuW1Sw, menuW2Sw, menuW3Sw, menuW4Sw, menuW5Sw, menuW6Sw, 1, 1);
							if (nextDaymateral == earlydgMaterialSw){
								console.log('提前保留屬性符合，保留票為:', earlydgticksSw);
								dgticksInput = earlydgticksSw;
							}
						}

						if (!materialCHK && actmaterialX2Sw && dungeonsx2LeftT != -1 && dungeonsx2LeftT < actmateriaX2TSw) {
							console.log('地牢x2活動出現 , 剩餘', dungeonsx2LeftT ,' 小時, 提前時間', actmateriaX2TSw, ' 小時, 保留票為', actdgticksSw);
							dgticksInput = actdgticksSw;

						}

						if (materialCHK && materialX2Sw) {
							console.log('材料x2 指定屬性開啟, 材料x2 發現, 保留票為', materX2TickSw);
							dgticksInput = materX2TickSw;
						}

						// console.log('保留票為:', dgticksInput);
						if ( (dgticks[0] == 0 || dgticks[0] <= dgticksInput) && dgticks[0] != -1) {
							sleep(300);
							checkPointcolorTap(690, 510, 20, 'FFFFFF', 0, 0, 2, 100, 1);
							// console.log('1Timer:', Timer, dgticksInput, dgticks);
							Timer = Timer + 1200 //* (dgticksInput - dgticks[0] + 1);
							// console.log('2Timer:', Timer);
							maDungeonTimer =  Date.now() + Timer * 1000;
							console.log('小於保留票數', dgticks[0], '<=', dgticksInput, '或 0票，', Timer / 60, '分，後檢查', i, j);
							return false;
						}

						if (dgticks[0] > dgticksInput){
							console.log('大於保留票數', dgticks[0], '>', dgticksInput, ', 正常打BOSS', 'bossLV:', DalyDungeonsLv);
							rbm.keepScreenshotPartial( 590, 560, 680, 1170);  //挑戰BOSS
							var results = rbm.findImages('challengeBoss.png', 0.90, 6, true, false);
							// rbm.log('challengeBoss:', results);
							rbm.releaseScreenshot();
							// rbm.log('results:', results);

							if (results != '')  {
								results = results.sort(function (a, b) {return a.y < b.y ? 1 : -1;});								

								for (var index in results) {
									if (!config.isRunning) return false;
									var result = results[index];
									// rbm.log('challengeBoss:', result);
									tapFor(result.x, result.y - 100 * (DalyDungeonsLv - 1), 1, 90, 1000);
									// console.log('tap:', result.x, result.y - 100 * (DalyDungeonsLv - 1));
									break;
								}
							}
						}
					}
					
					// console.log('noticks.png');
					rbm.keepScreenshotPartial( 235, 495, 450, 550);  //No Ticks
					var targetImg3 = rbm.findImage('noticks.png', 0.85);
					rbm.releaseScreenshot();
					if (targetImg3 != undefined && targetImg3.score >= 0.85) {
						tapFor( 240, 820, 1, 60, 500);
						b = b + 1
					}
					else if(targetImg3 == undefined && b >= 2){
						return false;
					}
					
					// console.log('(j >= 20 && useReturn(1))');
					if (j >= 20 && useReturn(1)) {
						a = a + 1;
						checkPointcolorTap(690, 510, 20, 'FFFFFF', 0, 0, 2, 100, 1)
						maDungeonTimer =  Date.now() + Timer * 1000;
						if ( a >= 2 ) { 
							return false;
						}
					}
				}else {
					// console.log('Fight Boss');
					tapFor(  680,   410, 2, 70, 150);
					var fighttime = recoNum(4);
					if (fighttime > 3 && fighttime < failureT && DalyDungeonsLv != 2) {
						console.log('戰鬥時間剩:', fighttime, '地牢BOSS打不過，改打次一級'); 
						DalyDungeonsLv = 2;
						
						for (var o = 1; o <= 4; o++){
							CheckImageTap(  45,  530, 110,  590, 0.80, 'retreatBoss02.png', 1, 1, 1, 500, 1); 
							CheckImageTap( 300,  480, 420,  550, 0.80, 'retreatBossstr.png', 480, 830, 1, 500, 0); 
							sleep(200)
						}
						break;
					}

					tapSkill(5, 2);
				}
				
				sleep(600)
			}
		}

		sleep(300);
	}
}

function Blitz(Timer) {  //突襲
	if (!config.isRunning) return false;
	if (!useReturn(51)) return false;
	if (!useReturn(2)) return false;
	console.log('突襲');


}

function Expeditions(Timer) {   //遠征
	if (!config.isRunning) return false;
	if (!ExpedSw) return false;
	if (Date.now() < ExpedTimer) return false;
	if (!checkPointcolor(402, 1200, 20, 'DD1819')) return false;
	if (!useReturn(51)) return false;
	if (!useReturn(2)) return false;
	console.log('遠征');		
	
	var quSw = ['', 1, 1, 1, 1, 1, 1, 1];
	var scrX = ['', 20, 170, 510, 660, 530, 600];
	var insY = ['', 400, 500];
	
	var distRe = ['', 540 - 540, 691 - 742, 540 - 685, 691 - 773];
	var distIt = ['', 540 - 311, 691 - 688, 540 - 465, 691 - 761];
	var distSt = ['', 540 -  22, 691 - 678, 540 - 127, 691 - 770];
	
	var itemName = ['', '水寶石',  '火寶石',  '木寶石',  '光寶石',  '暗寶石', '', '', '', '', ''];
	
	var countempty = 0;
	for (var v = 1; v <= 2; v++) {
		var emptyY1 = 520 + 104 * (v - 1);
		var emptyY2 = 520 + 104 * (v - 0);
		for (var w = 1; w <= 4; w++) {
			var emptyX1 = 115 + 100 * (w - 1);
			var emptyX2 = 115 + 100 * (w - 0);
			
			countempty = countempty + 1
			if (countempty == ExpedHeroSw + 1) break;
		}
		if (countempty == ExpedHeroSw + 1) break;
	}
	//console.log('隊伍主頁-空格檢查XY:', emptyX1, emptyY1, emptyX2, emptyY2);
	
	checkPointcolorTap(690, 510, 20, 'FFFFFF', 0, 0, 2, 500, 1)
	choiceDungeon(3, 5);
	
	for (var i = 1; i <= 7; i++){
		if (!config.isRunning) return false;
		
		//console.log('遠征問號圖示, 26:', useReturn(26));
		if (useReturn(26)) {
			var tapAutoT = 0; var emptyC = 0;

			for (var k = 1; k <= 20; k++){
				if (!config.isRunning) return false;
				if (ExpedSw != 2) {break;}

				CheckImageTap(450, 1215, 640, 1275, 0.90, 'exped_collect_all.png', 1, 1, 1, 200, 1, 0);    //exped_collect_all
				CheckImageTap(310, 700, 405, 1170, 0.90, 'OKbutton.png', 1, 1, 1, 200, 1, 0);    //
				CheckImageTap(80, 1215, 270, 1275, 0.90, 'exped_start_all.png', 1, 1, 1, 200, 1, 0);    //
				sleep(200);

				if (k == 30) {
					CheckImageTap(500, 0, 720, 380, 0.85, 'rightupXX.png', 1, 1, 1, 200, 1, 0);    //右上的叉叉
					sleep(150)
					CheckImageTap(500, 0, 720, 380, 0.85, 'rightupXX.png', 1, 1, 1, 200, 1, 0);    //右上的叉叉
					sleep(150)
					CheckImageTap(500, 0, 720, 380, 0.85, 'rightupXX.png', 1, 1, 1, 200, 1, 0);    //右上的叉叉
					sleep(150)
					
					console.log('2 沒有可執行的遠征(每日勛章除外)');
					ExpedTimer =  Date.now() + Timer * 1000;
					return false;
				}
			}

			for (var j = 1; j <= 40; j++){
				if (!config.isRunning) return false;
				if (ExpedSw != 1) {break;}
				// console.log('Expeditions : ', i , j);
				
				rbm.keepScreenshotPartial( scrX[3],  400, scrX[4], 1260);  //收集、碼錶(主畫面)
				var Img1 = rbm.findImage('exped_collect.png', 0.90);
				var Img2s = rbm.findImages('exped_clock.png', 0.90, 4, true, false);
				if (Img2s == '')  {Img2 = rbm.findImage('exped_clock.png', 0.90);}
				rbm.releaseScreenshot();
				
				if (Img2s != '')  {
					Img2s = Img2s.sort(function (a, b) {
						return a.y < b.y ? 1 : -1;
					});	
					countImg2 = 0;
					for (var index in Img2s) {
						if (!config.isRunning) return false;
						var result = Img2s[index];
						countImg2 = countImg2 + 1;
									
						rbm.keepScreenshotPartial( result.x - 220,  result.y, result.x - 165, result.y + 40);  //收集、碼錶(主畫面)
						var ImgX = rbm.findImage('exped_item_X2.png', 0.90);
						rbm.releaseScreenshot();
						//if (ImgX != undefined) { rbm.log('ImgX:',ImgX); }
						//rbm.log('Img2s:', countImg2, result)
						//rbm.log('ImgX:',ImgX);
						if (ImgX == undefined) {
							var Img2 = result;
							break;
						}
					}
				}
				
				rbm.keepScreenshotPartial( scrX[5],  30, scrX[6], 370);  //碼錶(編排隊伍 Y:40:細部編隊，Y:310:自動編隊&開始)
				var Img6 = rbm.findImage('exped_clock.png', 0.90);
				rbm.releaseScreenshot();
				
				rbm.keepScreenshotPartial( 310, 700, 405, 1170);  //確認鈕
				var Img5 = rbm.findImage('OKbutton.png', 0.90);
				rbm.releaseScreenshot();
				
				// if (Img1 != undefined) { rbm.log('Img1:',Img1); }
				// if (Img2 != undefined) { rbm.log('Img2:',Img2); }
				// if (Img5 != undefined) { rbm.log('Img5:',Img5); }
				// if (Img6 != undefined) { rbm.log('Img6:',Img6); }
				
				
				     if (Img1 != undefined) {tapFor( Img1.x, Img1.y, 1, 60, 500);}
				else if (Img5 != undefined) {tapFor( Img5.x, Img5.y, 1, 60, 500);}
				else if (Img2 != undefined) {
					//確認按刷新條件
					if (Expeditem1Sw == 0 && ExpedstarSw == 0) {
						tapFor( Img2.x, Img2.y, 1, 60, 700);
					}
					else {
						rbm.keepScreenshotPartial(Img2.x - distRe[1],  Img2.y - distRe[2], Img2.x - distRe[3], Img2.y - distRe[4]);  //
						var Img3 = rbm.findImage('exped_refresh.png', 0.90);
						// rbm.log('refresh:', Img3);
						rbm.releaseScreenshot();
						
						if (Img3 != undefined && Expeditem1Sw > 0) {
							rbm.keepScreenshotPartial(Img2.x - distIt[1],  Img2.y - distIt[2], Img2.x - distIt[3], Img2.y - distIt[4]);  //
							var itemFile = 'exped_item/exped_item_' + Expeditem1Sw + '.png';
							var Img4 = rbm.findImage(itemFile, 0.90);
							rbm.releaseScreenshot();
							// rbm.log('item:', Img4);
							
							// if (Img4 != undefined) {tapFor( Img2.x, Img2.y, 1, 60, 700);}
							// if (Img4 == undefined) {console.log('道具不符合，按刷新');}
							// if (Img4 == undefined) {tapFor( Img3.x, Img3.y, 1, 60, 800);}
						}
						else if (Img3 != undefined && ExpedstarSw > 0) {
							var stars = expedStars(scrX[1], Img2.y - 60, scrX[2], Img2.y + 60)
							var stars = expedStars(Img2.x - distSt[1],  Img2.y - distSt[2], Img2.x - distSt[3], Img2.y - distSt[4]);  //
							// console.log (scrX[1], Img2.y - 60, scrX[2], Img2.y + 60, 'stars:', stars);
							if (stars >= ExpedstarSw){tapFor( Img2.x, Img2.y, 1, 60, 700);}
							if (stars < ExpedstarSw) {console.log('現有星級:', stars, ', 目標星級:', ExpedstarSw, ', 星級不符，刷新');}
							if (stars < ExpedstarSw) {tapFor( Img3.x, Img3.y, 1, 60, 800);}
						}
						else if (Img3 == undefined) {
							tapFor( Img2.x, Img2.y, 1, 60, 700);
						}
					}
				}
				else if (Img6 != undefined && Img6.y > 300) {
					rbm.keepScreenshotPartial( 210,  1045, 510, 1090);  //自動編隊、開始
					var Img7 = rbm.findImage('exped_autofill.png', 0.90);
					var Img8 = rbm.findImage('exped_start.png', 0.90);
					rbm.releaseScreenshot();
					
					// if (Img7 != undefined) { rbm.log('Img7:',Img7); }
					// if (Img8 != undefined) { rbm.log('Img8:',Img8); }
				
					if (Img7 != undefined && Img8 == undefined) {
						console.log('點自動填滿');
						tapFor(Img7.x, Img7.y, 3, 50, 200);
						//tapAutoT = tapAutoT + 1;
					}
					else if (Img7 != undefined && Img8 != undefined) {
						rbm.keepScreenshotPartial(emptyX1, emptyY1, emptyX2, emptyY2);  //空格確認
						var Img9 = rbm.findImage('exped_empty.png', 0.90);
						//var Img11 = rbm.findImage('exped_empty2.png', 0.90);
						rbm.releaseScreenshot();
						
						//if (Img9 != undefined) { rbm.log('Img9:',Img9); }
						//if (Img11 != undefined) { rbm.log('Img11:',Img11); }
						
						if (Img9 != undefined) {
							emptyC = emptyC + 1;
							console.log('人數', ExpedHeroSw, ', 確認次數:', emptyC, '/3');
							if (emptyC >= 3) {
								console.log('人數正確，可以開始', emptyC);
								tapFor(Img8.x, Img8.y, 1, 80, 700);
								emptyC = 0;
							}
						}
						else if (Img9 == undefined) {
							console.log('人數過多，編隊砍人');
							tapFor(emptyX1 + 50, emptyY1 + 50, 1, 80, 800);
						}
					}
				}
				else if (Img6 != undefined && Img6.y < 300) {
					var empty2X1 = 4 + 90 * (ExpedHeroSw + 0);
					var empty2X2 = 4 + 90 * (ExpedHeroSw + 1);
					// console.log('Im10XY:', empty2X1, 308, empty2X2, 390);
					for (var k = 1; k <= 12; k++) {
						if (!config.isRunning) return false;
						
						rbm.keepScreenshotPartial(empty2X1, 308, empty2X2, 390);  //空格確認
						var Img10 = rbm.findImage('exped_empty.png', 0.90);
						rbm.releaseScreenshot();
						
						// if (Img10 != undefined) { rbm.log('Img10:',Img10); }
						
						if (Img10 == undefined) { 
							console.log('砍掉多的人', empty2X1 + 50, 308 + 50);
							tapFor(empty2X1 + 50, 308 + 50, 3, 60, 200, 300);
						}
						else if (Img10 != undefined) {
							console.log('人數正確', ExpedHeroSw, '人');
							CheckImageTap(  5,  230,  105,  275, 0.90, 'backarry2.png', 1, 1, 1, 50, 1);
							break;
						}
						sleep(100);
					}
				}
				else if ( (useReturn(26) &&　Img1 == undefined && Img2 == undefined && Img5 == undefined && Img6 == undefined)){ //|| tapAutoT >= 5
					CheckImageTap(500, 0, 720, 380, 0.85, 'rightupXX.png', 1, 1, 1, 200, 1, 0);    //右上的叉叉
					sleep(150)
					CheckImageTap(500, 0, 720, 380, 0.85, 'rightupXX.png', 1, 1, 1, 200, 1, 0);    //右上的叉叉
					sleep(150)
					CheckImageTap(500, 0, 720, 380, 0.85, 'rightupXX.png', 1, 1, 1, 200, 1, 0);    //右上的叉叉
					sleep(150)
					
					console.log('1 沒有可執行的遠征(每日勛章除外)');
					ExpedTimer =  Date.now() + Timer * 1000;
					return false;
				}
				
				sleep(250)
			}
		}

		sleep(300);
	}
}

function expedStars(intX, intY, finX, finY) {	//遠征星數
	if (!config.isRunning) return false;
	//console.log('Count Expeditions Starts');

	var a = 0;
	rbm.keepScreenshotPartial(intX, intY, finX, finY);  //挑戰BOSS
	var results = rbm.findImages('exped_star.png', 0.90, 5, true, false);
	rbm.releaseScreenshot();
	//rbm.log('results:', results);
	
	if (results != '')  {
		results = results.sort(function (a, b) {
			return a.y < b.y ? 1 : -1;
		});								
		
		for (var index in results) {
			if (!config.isRunning) return false;
			var result = results[index];
			a = a + 1;
		}
	}
		
	//console.log('Count Expeditions Starts: ', a);
	return a;
}

function Areafight(Timer) {  //競技場
	if (!config.isRunning || Date.now() < AreafigthTimer) return false;
	if (!arenaSw) return false;
	if (!useReturn(51)) return false;
	if (!useReturn(2)) return false;
	console.log('競技場');
	
	choiceDungeon(4, 5)
	for (var i = 1; i <= 6; i++){
		if (!config.isRunning) return false;
		
		var arenatick = -1
		rbm.keepScreenshotPartial( 120, 10, 200, 60);  //檢查競技票數
		for (var l = 6; l >= 0; l--) {
			//rbm.log('1 arenaticks:', l);
			var Img4 = rbm.findImage('arenaticks_' + l + '.png', 0.94);
			//rbm.log('2 arenaticks:', l, Img4);
			if (Img4 != undefined) {
				arenatick = l;
				break;
			}
		}
		rbm.releaseScreenshot();
		console.log('票數', arenatick);
		
		var arenaRest = useReturn(82);
		if (arenatick <= arenaticksSw  || arenaRest) {
			var hour = new Date().getHours() * 1;
			var nexthour = 25 - hour
			Timer = nexthour * 60 * 60;
			AreafigthTimer =  Date.now() + Timer * 1000;
			if (arenaRest) { console.log('今日無競技場可打, 下次檢查', nexthour, '小時後'); }
			else { console.log('小於保留票數', arenatick, '<=', arenaticksSw, '或 0票', ', 下次檢查', nexthour, '小時後'); }
			keycode('BACK', 500);
			return false;
		}
		
		var changeF = 1;
		for (var j = 1; j <= 240; j++){
			if (!config.isRunning) return false;
			if (arenatick == -1 || arenatick <=  arenaticksSw) break;
			// console.log('Arena Fight : ', i, j );
			
			//console.log('21:', useReturn(21));
			if (!useReturn(21)){  //BOSS戰鬥，撤退鈕	
				// console.log('81:', useReturn(81));		
				if (useReturn(81)) {
					
					if (!arenatkchgSw) {
						changeF = 0;
						console.log('刷新設定關閉，不刷新');
					}
					else {
						rbm.keepScreenshotPartial( 280, 1000, 450, 1060);  //確認可否刷新對手
						var Img1 = rbm.findImage('arenanochange1.png', 0.90);
						var Img2 = rbm.findImage('arenanochange2.png', 0.90);
						var Img4 = rbm.findImage('arenatickchang.png', 0.90);
						rbm.releaseScreenshot();
						
						if (Img1 != undefined && Img2 != undefined ) {
							//rbm.log('Img1:', Img1);
							//rbm.log('Img2:', Img2);
							changeF = 0;
							//return false;
						}
						else if (Img4 != undefined) {
							
							
						}
					}
					
					for (var k = 3; k >= 1; k--){
						if (!config.isRunning) return false;
						
						var power = recoNum(40 + k);
						//Console.log('power:', k, power);
						
						if (power < arenaFightpw && power > 5000) {
							console.log('對手戰力小於設定:', power, '<', arenaFightpw, ', 打了');
							if (changeF == 0) {
								var arenatapY = 460 + 148 * (k - 1)
								tapFor(580, arenatapY, 3, 100, 300);
								sleep(500)
								break;
							}
						}
						else if(power > arenaFightpw){
							console.log('對手戰力高於設定:', power, '>', arenaFightpw, ', 不打');
							if (changeF == 1) {
								
								
							}
							if (k == 1){
								Timer = 60 * 60;
								AreafigthTimer =  Date.now() + Timer * 1000;
								console.log('全部戰力高於設定，跳出, 下次檢查', Timer/60, '分鐘後');
								keycode('BACK', 500);
								keycode('BACK', 500);
								return false;
							}
						}
					}
					//return false;
					
				}
				else {
					rbm.keepScreenshotPartial( 310, 700, 405, 1170);  //確認可否刷新對手
					var Img3 = rbm.findImage('OKbutton.png', 0.90);
					rbm.releaseScreenshot();
					if (Img3 != undefined) {
						//rbm.log('Img3:', Img3);
						tapFor(Img3.x, Img3.y, 2, 70, 300);
						keycode('BACK', 200);
						return false;
					}
					else {
						//CheckImageTap(310, 670, 410, 730, 0.90, 'arenafightbutton.png', 1, 1, 2, 400, 1, 0);      // 點擊挑戰按鈕
						CheckImageTap(330, 1210, 390, 1280, 0.90, 'arenafighttick1_2.png', 1, 1, 2, 500, 1, 0);     // 點擊票數戰鬥
						
						rbm.keepScreenshotPartial( 310, 670, 410, 730);  //點擊挑戰按鈕
						var Img5 = rbm.findImage('arenafightbutton.png', 0.90);
						rbm.releaseScreenshot();		
						//rbm.log('Img5:', Img5);
						
						if (Img5 != undefined) {
							tapFor(Img5.x, Img5.y, 2, 50, 400);
						}
						else if (Img5 == undefined) {
							tapFor(125, 740, 2, 50, 300);
						}
						
					}
				}
			}
			
			sleep(500);
		}		

		sleep(300);
	}
}

function choiceDungeon(F1, F2) {  //【F1:地城類別 1:材料 2:突襲 3:遠征 4:競技 】 1-OK
	if (!config.isRunning) return false;
	if (!useReturn(51)) return false;
	if (!useReturn(2)) return false;
	console.log('選擇地下城', F1, F2);
	
	for (var i = 1; i <= 4; i++){
		if (!config.isRunning) return false;
		
		if (useReturn(1)) {
			choiceMenu(4);
			sleep(400);
			
			rbm.keepScreenshotPartial( 650, 530, 718, 600);  //確認是否為兩倍活動
			var targetImg8 = rbm.findImage('materialX2icon.png', 0.80);
			rbm.log('targetImg8:', targetImg8);
			rbm.releaseScreenshot();
			if (targetImg8 != undefined) {
				console.log('發現地牢兩倍，自動檢查兩倍設定');
				materialCHK = 1;

				if(materialX2Sw > 0) {
					console.log('材料兩倍屬性指定:', materialX2Sw);
					F2 = materialX2Sw
				}else{
					console.log('材料兩倍屬性指定關閉');
				}
			}

			var a = 1;
			for (var j = 1; j <= 6; j++){
				if (!config.isRunning) return false;
				console.log('Choice Dungeon : ', i, j );
				
				rbm.keepScreenshotPartial( 500, 525, 719, 1140);  //地城選單圖示範圍
				var targetImg = rbm.findImage('Dungeon_0' + F1 + '.png', 0.90);

				if (F1 == 1 && targetImg == undefined) {
					for (var k = 1; k <= 3; k++) {
						var targetImg = rbm.findImage('Dungeon_0' + F1 + '_' + k + '.png', 0.90);  //活動boss主選單畫面
						if (targetImg != undefined) break;
					}
				}
				
				rbm.releaseScreenshot();
				if (targetImg != undefined && targetImg.score >= 0.90) {
					tapFor(targetImg.x, targetImg.y, 1, 60, 600);
				}
				
				switch(F1) {    //【F1:地城類別 1:材料 2:突襲 3:遠征 4:競技 】
					case 1 :
						// console.log('case 1', F1);
						rbm.keepScreenshotPartial( 110, 590, 440, 1170);  //boss選單圖示範圍  屬性圖示
						var targetImg2 = rbm.findImage('materialBoss/materialBoss4_0' + F2 + '.png', 0.90);
						// rbm.log('targetImg2:', targetImg2);
						rbm.releaseScreenshot();
						if (targetImg2 != undefined) {
							
							var spY = 0;
							if (F2 == 7) {var spY = 50;} 
							rbm.keepScreenshotPartial( targetImg2.x + 330, targetImg2.y - 54, targetImg2.x + 480, targetImg2.y + 40 + spY);  //boss選單圖示範圍
							var targetImg7 = rbm.findImage('enterbossroom.png', 0.90);
							// rbm.log('targetImg7:', targetImg7);
							rbm.releaseScreenshot();
							
							if (targetImg7 != undefined && targetImg7.score >= 0.90) {
								// console.log('tap targetImg7');
								tapFor(targetImg7.x, targetImg7.y, 1, 60, 300);
							}
						}
							rbm.keepScreenshotPartial( 590, 560, 680, 1170);  //確認"挑戰"按鈕出現量
							var results = rbm.findImages('challengeBoss.png', 0.90, 6, true, false);
							rbm.releaseScreenshot();
							
							var countchl = Object.keys(results).length;
							//console.log(countchl); //取物件長度，挑戰鈕數量
							if (countchl >= 1) {console.log('挑戰鈕 >= 2個，BOSS選擇完成'); return false;}
						
					case 2 : if (useReturn(27)) {a = a + 1; if ( a >= 2 ) {sleep(300); return false;}}; break;  //突襲幣圖示
					case 3 : if (useReturn(26)) {a = a + 1; if ( a >= 2 ) {sleep(300); return false;}}; break;  //遠征問號圖示
					case 4 : if (useReturn(28)) {a = a + 1; if ( a >= 2 ) {sleep(300); return false;}}; break;  //競技幣圖示	
				}	

				sleep(200)
			}
		}

		sleep(200);
	}
}

function choiceMaterialboss(w0, w1, w2, w3, w4, w5, w6, Timer, offset) {  //每日材料BOSS屬性
	if (!config.isRunning || Date.now() < chMatbossTimer) return false;
	if (!autoWeekSw){console.log('自動打材料總開關：關閉'); return false;}
	if (!useReturn(1)) return false;
	// console.log('每日材料BOSS屬性');
	
	
	//每日可打材料屬性【1:水  2:火  3:木  4:光  5:暗】
	//
	//星期日：木、水、暗 (3, 1, 5)
	//星期一：火、暗 (2, 5)
	//星期二：木、光 (3, 4)
	//星期三：水、火 (1, 2)
	//星期四：木、光 (3, 4)
	//星期五：水、暗 (1, 5)
	//星期六：光、火 (4, 2)
	
	//變數陣列定義
	var weekCal = new Date().getDay() * 1 + offset;
	var week = weekCal % 7;
	var hours = new Date().getHours() * 1;
	//console.log('week:', week, ', hours:', hours);
	
	var menuWeekN = new Array( '周日', '周一', '周二', '周三', '周四', '周五', '周六');
	var autoWeekF = new Array(  5,    2,    4,    1,    3,    5,   4);
	var menuWeekF = new Array( w0,   w1,   w2,   w3,   w4,   w5,  w6);
	var bossAtt   = new Array( '', '水', '火', '木', '光', '暗',  '');
	var menuStr   = new Array( ', 本日關閉自動打材料。', ', 指定錯誤，打預設：', ', 指定正確, 打指定：');
	var menuError = 0;
	
	//if (hours <= 1) week = week - 1;
	//if (week <= -1) week = 6;
	
	//無指定屬性檢查
	if (menuWeekF[week] == 0) {
		//console.log(menuWeekN[week], menuStr[menuError]);
		return 0;
	}	
	
	//手動指定屬性檢查
	switch(week) {
		case 0 : var menuWeekOK = new Array( '', 3, 1, 5); break;
		case 1 : var menuWeekOK = new Array( '', 2, 5, 9); break;
		case 2 : var menuWeekOK = new Array( '', 3, 4, 9); break;
		case 3 : var menuWeekOK = new Array( '', 1, 2, 9); break;
		case 4 : var menuWeekOK = new Array( '', 3, 4, 9); break;
		case 5 : var menuWeekOK = new Array( '', 1, 5, 9); break;
		case 6 : var menuWeekOK = new Array( '', 4, 2, 9); break;
	}
	
	for (var i = 1; i <= 3; i++){
		//console.log(i, week, menuWeekF[week], menuWeekOK[i], menuError)
		if (menuWeekF[week] == menuWeekOK[i]) {var menuError = 2; break;}
		else {var menuError = 1;}
	}
	
	if ( menuWeekF[week] != 0 && menuError == 1) {
		//console.log(menuWeekN[week], menuStr[menuError], bossAtt[autoWeekF[week]] + '屬性(' + autoWeekF[week] + ')');
		if (spdongeonSw != 0 ) { console.log('打活動怪:ON, 活動怪優先打');}
		chMatbossTimer = Date.now() + Timer * 1000;
		return autoWeekF[week] * 1;
	}
	else if ( menuWeekF[week] != 0 && menuError == 2) {
		//console.log(menuWeekN[week], menuStr[menuError], bossAtt[menuWeekF[week]] + '屬性(' + menuWeekF[week] + ')');
		if (spdongeonSw != 0 ) { console.log('打活動怪:ON, 活動怪優先打');}
		chMatbossTimer = Date.now() + Timer * 1000;
		return menuWeekF[week] * 1;
	}
}

function upMenu(Timer) {   //上方選單功能 自動收信、每日獎勵、任務選單
	if (!config.isRunning || Date.now() < upMenuTimer) return false;
	if (!useReturn(2)) return false;
	if (!useReturn(51)) return false;
	
	if (!receiveMailSw && !loginDailySw && !actListSw) {
		// console.log('!receiveMailSw && !loginDailySw');
		upMenuTimer =  Date.now() + Timer * 1000;
		return false;
	}
	console.log('檢查收信、每日獎勵(右上)、任務選單、當日寶箱是否0');
	
	var a = 0; var b = 0;
	for (var i = 1; i <= 8; i++) {
		if (!config.isRunning) return false;
	
		if (treachest_x0 == -1) {
			CheckImageTap( 490, 540, 590, 590, 0.85, 'dailystr_main.png', 1, 1, 1, 300, 1, 1);  //主畫面今日挑戰
			rbm.keepScreenshotPartial(390, 1230, 450, 1260);      //確認剩下寶箱是否 x0
			var Img1 = rbm.findImage('treasurechest_icon.png', 0.90);
			var Img2 = rbm.findImage('treasurechest_x0_2.png', 0.85);
			rbm.releaseScreenshot();
			rbm.log(Img1);
			rbm.log(Img2);

			if (Img1 != undefined && Img2 != undefined) {
				console.log('今日寶箱剩 x0 個');
				treachest_x0 = 0;

			}else if (Img1 != undefined && Img2 == undefined) {
				console.log('今日寶箱剩 ?? 個');
				treachest_x0 = 99;

			}else if (Img1 == undefined && Img2 == undefined) {
				console.log('今日寶箱 畫面有誤無法判斷');
				treachest_x0 = -1;
			}

			if (treachest_x0  != -1) {
				CheckImageTap(500, 0, 720, 530, 0.85, 'rightupXX.png', 1, 1, 1, 200, 1, 0);    //右上的叉叉
				CheckImageTap(500, 0, 720, 530, 0.85, 'rightupXX.png', 1, 1, 1, 200, 1, 0);    //右上的叉叉
				CheckImageTap(500, 0, 720, 530, 0.85, 'rightupXX.png', 1, 1, 1, 200, 1, 0);    //右上的叉叉
			}

		}else if (treachest_x0  != -1) {
			CheckImageTap( 625, 10, 710, 70, 0.85, 'mainpagebutton.png', 1, 1, 1, 800, 1);  //右上功能圖示
		}
		
		if (receiveMailSw) {
			console.log('檢查收信');
			var mailcolor = checkPointcolor(255, 92, 30, 'DD1819');
			console.log('mailcolor:', mailcolor);
			
			if (mailcolor) {
				tapFor(244, 102, 3, 50, 150, 600);
				receiveMail();
			}
		}
		
		if (loginDailySw) {
			console.log('每日獎勵(右上)');
			var loginDailycolor = checkPointcolor(255, 192, 30, 'DD1819');
			console.log('loginDailycolor:', loginDailycolor);
			
			if (loginDailycolor) {
				tapFor(240, 191, 3, 50, 150, 600);
				loginDailyreward();
			}
		}
		
		if (actListSw > 0) {
			console.log('任務選單, 活動檢查');

			var actListicolor = checkPointcolor(380, 92, 10, '3C0F01');
			console.log('actListicolor:', actListicolor);
			
			if (actListicolor) {
				tapFor(360, 102, 1, 50, 150, 1200);
				activityCHK();
			}

		}

		if (i == 8) {
			console.log('檢查', 8, '次, ', Timer, '秒後再檢查');
			
			CheckImageTap( 651, 29, 687, 52, 0.85, 'upmenuclose.png', 1, 1, 1, 300, 1);  //右上功能圖示關閉
			CheckImageTap( 651, 29, 687, 52, 0.85, 'upmenuclose.png', 1, 1, 1, 300, 1);  //右上功能圖示關閉
			CheckImageTap(500, 0, 720, 530, 0.85, 'rightupXX.png', 1, 1, 1, 200, 1, 0);    //右上的叉叉
			CheckImageTap(500, 0, 720, 530, 0.85, 'rightupXX.png', 1, 1, 1, 200, 1, 0);    //右上的叉叉
			
			upMenuTimer =  Date.now() + Timer * 1000;
			return false;
		}
		
		sleep(150);
	}
}

function loginDailyreward() {   //登錄獎勵-每日
	if (!config.isRunning) return false;
	if (!loginDailySw) return false;
	console.log('領取月登錄獎勵');

	var a = 0;
	for (var i = 1; i <= 8; i++) {
		if (!config.isRunning) return false;
		// console.log('loginDailyreward2', i);
		
		rbm.keepScreenshotPartial( 60, 235, 670, 1040);     //確認找圖範圍(最後行)
		var Img1 = rbm.findImage('loginDaly_bk.png', 0.85);       //找圖
		rbm.releaseScreenshot();

		if (Img1 != undefined && i != 8)  {
			console.log('月登錄獎勵找到，點擊', Img1.x, Img1.y);
			tapFor(Img1.x, Img1.y, 8, 50, 200);
		}
		
		if (Img1 == undefined || i == 8) {
			a = a + 1;
			if (a >= 3 || i == 8) {
				console.log('月登錄獎勵領完，退出');
		
				CheckImageTap(500, 0, 720, 380, 0.85, 'rightupXX.png', 1, 1, 1, 200, 1, 0);    //右上的叉叉
				sleep(150)
				CheckImageTap(500, 0, 720, 380, 0.85, 'rightupXX.png', 1, 1, 1, 200, 1, 0);    //右上的叉叉
				sleep(150)
				CheckImageTap(500, 0, 720, 380, 0.85, 'rightupXX.png', 1, 1, 1, 200, 1, 0);    //右上的叉叉
				sleep(150)		
				
				return false;
			}
		}
		sleep(300);
	}
}

function receiveMail() {  //收mail，預設全收
	if (!config.isRunning) return false;
	if (!receiveMailSw) return false;
	console.log('收mail，預設全收')
	
	for (var i = 1; i <= 6; i++) {
		if (!config.isRunning) return false;
		// console.log('receiveMail', i)
		
		rbm.keepScreenshotPartial( 140, 90, 360, 125);  //確認"有mail提示"
		var results = rbm.findImages('mailExclamationmark.png', 0.90, 2, true, false);
		if (results == '') results = rbm.findImages('mailExclamationmark3.png', 0.90, 2, true, false);
		rbm.releaseScreenshot();
		
		if (results == '')  {
			console.log('沒有要收的mail，退出');
	
			CheckImageTap(500, 0, 720, 380, 0.85, 'rightupXX.png', 1, 1, 1, 150, 1, 0);    //右上的叉叉
			sleep(150)
			CheckImageTap(500, 0, 720, 380, 0.85, 'rightupXX.png', 1, 1, 1, 150, 1, 0);    //右上的叉叉
			sleep(150)
			CheckImageTap(500, 0, 720, 380, 0.85, 'rightupXX.png', 1, 1, 1, 150, 1, 0);    //右上的叉叉
			sleep(150)		
			
			return false;
		}
			
		if (results != '')  {
			results = results.sort(function (a, b) {
				return a.x > b.x ? 1 : -1;
			});	

			for (var index in results) {
				if (!config.isRunning) return false;
				var result = results[index];
				// rbm.log(result);
				// rbm.log(result.x, result.y + 5);
				tapFor(result.x - 5, result.y + 5, 2, 50, 100, 300);
				
				for (var j = 1; j <= 15; j++) {
					if (!config.isRunning) return false;
					// console.log('receiveMail', i, j);
					
					var Allcheckcolor = checkPointcolor( 70, 1120, 30, 'E2A95C');
					var Receivecolor = checkPointcolor( 120, 1120, 30, 'E2A95C');
					var Darkcolor = checkPointcolor( 120, 1120, 30, '100903');
					// console.log('Allcheckcolor:', Allcheckcolor, ', Receivecolor:', Receivecolor, ', Darkcolor:', Darkcolor);
					

					rbm.keepScreenshotPartial( 11, 129, 190, 1115);  //找工會mail勾選的，來取消
					var result2s = rbm.findImages('mailGuildchecked.png', 0.95, 2, true, false);
					rbm.releaseScreenshot();
					
					if (result2s != '')  {

						for (var index in result2s) {
							if (!config.isRunning) return false;
							var result2 = result2s[index];

							var tapX = result2.x + 10;
							var tapY = result2.y + 10;
							console.log('Find mailGuild, tapX:', tapX, ', tapY:', tapY);
							tapFor(tapX, tapY, 1, 60, 200);
						}
					}
					else if (result2s == '') {
						if (Allcheckcolor) tapFor( 70, 1120, 1, 50, 300);
						else if (Receivecolor)  tapFor( 120, 1120, 2, 50, 200);
						else if (Darkcolor)  tapFor( 120, 1120, 6, 50, 200);
						else break;
					}
					sleep(200);
				}
			}
			sleep(300);
		}
		sleep(300);
	}
}

function activityCHK() {   //活動判斷  1:Fx3倍
	if (!config.isRunning) return false;

	// activityQuest = new Array( '', '寶箱Fx3倍', '突襲manta', '工會戰爭', '地牢x2', '遠征x2');
	// activityState = new Array( '',  '-無', '-有-開啟', '-有-等待', '-有-等待-fx3-當日');
	// activityCheck = new Array( '', -1, -1, -1, -1, -1);
	//統一抓圖坐標
	//活動類 x1:420, x2:510, 上緣:11
	//碼錶圖 x1:550, x2:585

	DIY_swipe(658, 100, 658, 1300, 20, 5000);
	for (var j = 1; j <= 2; j++){
		if (j == 2) {
			rbm.keepScreenshotPartial(250, 150, 420, 1140);  ///確認將開啟任務
			var Img = rbm.findImage('activityList_future.png', 0.90);
			rbm.releaseScreenshot();
			if (Img != undefined && Img.score >= 0.90) {
				console.log('發現 即將開始任務, 拉到最上方!');
				sleep(300);
				DIY_swipe(658, Img.y + 10, 658, -100, 200, 2000);
				tapFor(658 , 100, 1, 60, 200);
			}
		}

		for (var i = 1; i <= 5; i++) {
			console.log('activity item i:', i);
			rbm.keepScreenshotPartial( 400, 80, 560, 1270);  //確認活動項目
			var filename = 'activityList_0' + i + '.png'
			var targetImg1 = rbm.findImage(filename, 0.80);
			rbm.releaseScreenshot();

			if (targetImg1 != undefined) {
				activityCheck[i] = 2

				// console.log(targetImg1.x, targetImg1.y);

				rbm.keepScreenshotPartial( 520, targetImg1.y - 20, 600, targetImg1.y + 80);  //確認活動有無碼錶
				var targetImg2 = rbm.findImage('activityClock.png', 0.80);
				rbm.releaseScreenshot();
				if (targetImg2 != undefined) {
					activityCheck[i] = 3;

					var hrX1 = 75;
					var hrX2 = 311;
					var hrY1 = targetImg2.y + 47;
					var hrY2 = targetImg2.y + 70;

					// activityTime(hrX1, hrY1, hrX2, hrY2);    //活動時間判斷 x1:75, x2:295

					var actwaitTime2 = activityTime(hrX1, hrY1, hrX2, hrY2);     //活動時間判斷 x1:75, x2:295
					// console.log('2 waitTime2:', actwaitTime2);
					
					var today = new Date();
					var actStart = new Date();
					actStart.setMonth(actStart.getMonth() + 0);
					actStart.setDate (actStart.getDate() + actwaitTime2[1]);
					actStart.setHours (actStart.getHours() + actwaitTime2[2]);
					actStart.setMinutes (actStart.getMinutes() + actwaitTime2[3]);
					actStart.setSeconds (actStart.getSeconds() + actwaitTime2[4]);
		
					var todayDate = today.getDate();
					var actStartDate = actStart.getDate();
		
					console.log(i, '每日活動-', activityQuest[i], activityState[activityCheck[i]], ',todayDate:', todayDate, ',actStartDate:', actStartDate);
					console.log('  Time left:',  actwaitTime2[1], ' 天', actwaitTime2[2], ' 時', actwaitTime2[3], '分');
					console.log('  Today:', today);
					console.log('  Start:', actStart);
		
					// console.log('todayDate:', todayDate);
					// console.log('actStartDate:', actStartDate);
					if (i == 1 && todayDate == actStartDate) {
						console.log('  已是活動開啟當日，點寶箱暫停!!')
						actFx3today = 1;
						activityCheck[i] = 4;
					}

					if (i == 4){
						dungeonsx2LeftT =  actwaitTime2[1] * 24 + actwaitTime2[2] + actwaitTime2[3] / 60;
						console.log('地牢x2 出現，剩餘:',  dungeonsx2LeftT, ' 小時');
					}
				}else {
					console.log(i, '每日活動-', activityQuest[i], activityState[activityCheck[i]], ',todayDate:', 'no data', ',actStartDate:', 'no data');
				}

			}else {
				activityCheck[i] = 1;
				console.log(i, '每日活動-', activityQuest[i], activityState[activityCheck[i]], ',todayDate:', 'no data', ',actStartDate:', 'no data');
			}
			
		}
	}
}

function activityTime(x1, y1, x2, y2) {    //活動時間判斷 x1:75, x2:295
	if (!config.isRunning) return false;

	var actTimeX = new Array( -1, -1, -1, -1, -1, -1, -1);
	var actTimeY = new Array( -1, -1, -1, -1, -1, -1, -1);
	var actTimeR = new Array( -1, -1, -1, -1, 0);

	rbm.keepScreenshotPartial( x1, y1, x2, y2);  //完成後確認鈕
	var ImgStart = rbm.findImage('activityQStartat.png', 0.80);
	var ImgEnd = rbm.findImage('activityQEndat.png', 0.80);
	var ImgDay = rbm.findImage('activityQDay.png', 0.80);
	var ImgHour = rbm.findImage('activityQHour.png', 0.80);
	var ImgMin = rbm.findImage('activityQMin.png', 0.80);
	rbm.releaseScreenshot();


	rbm.log('1 ImgStart:', ImgStart);
	rbm.log('2 ImgEnd:', ImgEnd);
	rbm.log('3 ImgDay:', ImgDay);
	rbm.log('4 ImgHour:', ImgHour);
	rbm.log('5 ImgMin:', ImgMin);


	if (ImgStart != undefined) {actTimeR[0] = 1;}
	if (ImgEnd != undefined) {actTimeR[0] = 2;}

	if (ImgDay != undefined) {

		actTimeX[1] = 129;
		actTimeX[2] = ImgDay.x;
		actTimeX[3] = ImgDay.x + 17;
		
		var intX1 = actTimeX[1];
		var intX2 = actTimeX[2];
		var dayORC = num_Recognition(intX1, y1, intX2, y2, 0.85, 'num_Reco/activity_num/wait/activitywait_num_');
		actTimeR[1] = dayORC;
	} else {
		actTimeR[1] = 0;
	}

	if (ImgHour != undefined) {

		if (ImgDay == undefined) {actTimeX[3] = 129;}
		actTimeX[4] = ImgHour.x;
		actTimeX[5] = ImgHour.x + 40;

		var intX1 = actTimeX[3];
		var intX2 = actTimeX[4];
		var hrORC = num_Recognition(intX1, y1, intX2, y2, 0.85, 'num_Reco/activity_num/wait/activitywait_num_');
		actTimeR[2] = hrORC;
	}else {
		actTimeR[2] = 0;
	}

	if (ImgMin != undefined) {

		if (ImgHour == undefined) {actTimeX[5] = 129;}
		actTimeX[6] = ImgMin.x;

		var intX1 = actTimeX[5];
		var intX2 = actTimeX[6];
		var minORC = num_Recognition(intX1, y1, intX2, y2, 0.85, 'num_Reco/activity_num/wait/activitywait_num_');
		actTimeR[3] = minORC;
	}else {
		actTimeR[3] = 0;
	}

	// rbm.log('actTimeX:', actTimeX);
	// rbm.log('actTimeR:', actTimeR);

	// var waitDay = actTimeR[1] + actTimeR[2] / 24 + actTimeR[1] + 1 / 60 / 24 ;
	// console.log('waitDay:', waitDay);

	return actTimeR;
}

function artifictStore(Timer) {  //商店刷寶物
	if (!config.isRunning) return false;
	if (!artistorereSw) return false;
	if (Date.now() < artiStoreTimer) return false;
	if (!useReturn(51)) return false;
	if (!useReturn(2)) return false;
	if (artifictGet) return false;
	console.log('商店刷寶物');

	var recolorHEX = new Array( 0, '48270D', '330000');
	var recolorStr = new Array( '無法判斷', '免費刷', 'F幣刷');
	var artifictTg = new Array( 0, artitarget1Sw, artitarget2Sw, artitarget3Sw);

	choiceMenu(3);
	sleep(500);
	tapFor(710, 560, 4, 30, 200, 500);

	for (var i = 0; i <= 5; i++) {
		// CheckImageTap(690, 520,   719,  550, 0.85, 'artifictStore_!.png', 630, 560, 1, 600, 0, 0);    //寶物商店按鈕驚嘆號

		for (var j = 0; j <= 1; j++) {
			var chkJ = j % 2 + 1;
			var chkColor = checkPointcolorTap(580, 590, 20, recolorHEX[chkJ], 0, 0, 1, 100, 2);
			// console.log('j:', j, ', chkJ:', chkJ, ', chkColor:', chkColor, recolorHEX[chkJ]);
			if (chkColor) {recolorHEX[0] = chkJ; break;}
			sleep(50);
		}
		console.log('寶物商店狀態:', recolorStr[recolorHEX[0]]);

		var artifictTg = new Array( 0, artitarget1Sw, artitarget2Sw, artitarget3Sw);
		rbm.keepScreenshotPartial( 0, 600, 110, 1170);  //確認是否有指定寶物
		for (var k = 1; k <= 3; k++) {
			if (artifictTg[k] > 0) {

				var add0 = ''; if (artifictTg[k] < 10) { add0 = 0;}
				var filename = 'artifict_list/star' + artistarlvSw + '/90x80/artifict_90x80_' + artistarlvSw + '_' + add0 + artifictTg[k] + '.png'
				var Img = rbm.findImage(filename, 0.90);
				// rbm.log(filename, Img);

				if (Img != undefined) {
					console.log('刷寶物, Star:', artistarlvSw, ',No.:', artifictTg[k], '刷到!');
					rbm.releaseScreenshot();
					artifictGet = 1;
					artiStoreTimer =  Date.now() + Timer * 1000;
					rbm.releaseScreenshot();
					return false;
				} else {
					console.log('刷寶物, Star:', artistarlvSw, ',No.:', artifictTg[k], '沒有!');
				}
			}
			sleep(50);
		}
		rbm.releaseScreenshot();

		if (recolorHEX[0] == 2) { 
			checkPointcolorTap(690, 510, 20, 'FFFFFF', 0, 0, 1, 100, 1)  //點選單向下三角形
			break;

		}else if(recolorHEX[0] == 1 && artifictGet == 0) {
			tapFor(570, 560, 1, 30, 100, 700);
			tapFor(480, 820, 1, 30, 100, 500);
			break;

		}else if(recolorHEX[0] == 0) {
			break;
		}

		sleep(100);
	}
		
	artiStoreTimer =  Date.now() + Timer * 1000;
}

function reminderMsg(Timer) {      //提醒訊息
	if (!config.isRunning || Date.now() < reminderMsgTime) return false;
	
	var weekCal = new Date().getDay() * 1;
	var week = weekCal % 7;
	// console.log('week:', week);

	if (week >= 1 && week <= 5) return false;
	console.log('Reminder Message')

	var remPointH = new Array('', 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 23, 23, 23);
	var remPointM = new Array('',  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 30, 50, 55);
	if(week == 6){
		var postMsg = '';
		var todayNow = new Date();
		var nowHours = todayNow.getHours();
		var nowMinutes = todayNow.getMinutes();
		// console.log('nowHour:', nowHours, ', nowMinutes:', nowMinutes);

		for (var i = 15; i >= 1; i--){
			if(nowHours >= remPointH[i] && nowMinutes >= remPointM[i] && nowMinutes <= remPointM[i] + 4) {
				if (nowMinutes == 0){
					postMsg = (15 - i) + ', After ' + (24 - nowHours) + ' Hr ' + (nowMinutes) + ' Min, Epic Hero Medal !!!';
				}else if (nowMinutes > 0) {
					postMsg = (15 - i) + ', After ' + (23 - nowHours) + ' Hr ' + (60 - nowMinutes) + ' Min, Epic Hero Medal !!!';
				}
				console.log(postMsg);
				GuildCheat(postMsg);
				Timer = Timer + 120;
				break;
			}
			sleep(50);
		}
	}

	reminderMsgTime =  Date.now() + Timer * 1000;
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

		// debug(1);
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
	if (useReturn(50) || useReturn(51)) { return false;}
	
	var currApp = rbm.currentApp();
	rbm.log(currApp);
	var adListQ = Object.keys(adActivity.info).length - 1;
	for (var k = 0; k <= adListQ; k++) {
		// console.log(k, adListQ, adActivity.info[k].activityName);
		if (currApp.activityName == adActivity.info[k].activityName){
			var activityStaut = k;
			break;
		}
		if (k == adListQ) {rbm.log(currApp);}
	}

	if (k == 0) {
		console.log('在桌面，開啟CTA');
		startApp(180, scrShotSw);
		
	}else if (k == 1) {      
		console.log('在CTA遊戲，主畫面檢查');

		for (var j = 1; j <= 6; j++) {
			console.log('在CTA遊戲, debug檢查', j);

			// CheckImageTap(0, 0, 720, 1280, 0.85, 'waitinglogo.png', 1, 1, 1, 200, 0);    //待機移動logo
			CheckImageTap(310, 600, 405, 1170, 0.85, 'OKbutton.png', 1, 1, 1, 200, 1, 0);    //確認鈕
			CheckImageTap(280, 490, 420,  540, 0.90, 'exitgame.png', 240, 830, 1, 200, 0, 0);    //取消退出遊戲
			CheckImageTap(300, 600, 410,  1270, 0.80, 'reincarnationOKbtn.png', 1, 1, 1, 500, 1, 0);      //"好"按鈕
			checkPointcolorTap(690, 510, 20, 'FFFFFF', 0, 0, 1, 100, 1)  //點選單向下三角形
			CheckImageTap(260, 500, 450, 1180, 0.90, 'getButton.png', 1, 1, 2, 200, 1, 0);      //點擊獲取

			if (useReturn(1) && useReturn(51)) {
				break;

			}else {
				keycode('BACK', 500);
			}


			sleep(500);
		}
		
	}else if (k == 2) {
		console.log('在Google商店，退出');
		keycode('BACK', 500);

	}else if (k >= 3 && k <= adListQ) {
		console.log('看廣告中');
		waitAD(adtimesetSw);

	}else {
		console.log('無法判斷所在畫面');

		for (var i = 1; i <= 3; i++){
			console.log('無法判斷所在畫面, debug檢查', i);
			
			//console.log('1:', useReturn(1));
			if (useReturn(1)) {
				CheckImageTap(235, 495, 450,  550, 0.85, 'noticks.png', 240, 820, 1, 300, 0, 0);    //
				CheckImageTap(280, 400, 420,  460, 0.90, 'noAdenough.png', 360, 700, 1, 200, 0, 0);  //廣告不足
				CheckImageTap(230,  22, 262,   43, 0.90, 'speedoff.png', 1, 1, 1, 200, 1, 0);  //加速關閉點on
				CheckImageTap(280, 400, 440,  630, 0.90, 'X2SPEED_SMALL_ICON.png', 240, 820, 1, 200, 0, 0);  //加速直接點視窗關閉
				
				if (useReturn(52)){ checkPointcolorTap(690, 510, 20, 'FFFFFF', 0, 0, 2, 100, 1); } // 點向下箭頭 
	
			}else {
				CheckImageTap(280, 490, 420,  540, 0.90, 'exitgame.png', 240, 830, 1, 200, 0, 0);    //取消退出遊戲
				CheckImageTap( 651, 29, 687, 52, 0.85, 'upmenuclose.png', 1, 1, 1, 300, 1);  //右上功能圖示關閉
				CheckImageTap2(620, 1200, 690, 1260, 0.85, 'guildBack.png', 'guildBack2.png', 1, 1, 1, 200, 0);    //公會退出鈕1,2
				CheckImageTap(185, 75, 245, 135, 0.85, 'getnewthing.png', 360, 310, 10, 400, 0);    //得到新物品
				CheckImageTap( 80, 590, 410, 640, 0.95, 'androiderror.png', 600, 690, 1, 200, 0);    //android 停止
				CheckImageTap(300, 125, 360, 190, 0.95, 'reincarnationOK2.png', 360, 1200, 1, 200, 0);    //轉生後的 好
				CheckImageTap(300, 600, 410,  1270, 0.80, 'reincarnationOKbtn.png', 1, 1, 1, 500, 1, 0);      //"好"按鈕
	
				if (i == 3) {CheckImageTap(0, 0, 720, 1280, 0.85, 'waitinglogo.png', 1, 1, 1, 200, 0);}    //待機移動logo
			}
			
			if (i == 1){
				CheckImageTap(260, 500, 450, 1180, 0.90, 'getButton.png', 1, 1, 2, 200, 1, 0);      //點擊獲取
			}
			CheckImageTap(500, 0, 720, 530, 0.85, 'rightupXX.png', 1, 1, 1, 200, 1, 0);    //右上的叉叉
			CheckImageTap(310, 600, 405, 1170, 0.85, 'OKbutton.png', 1, 1, 1, 200, 1, 0);    //確認鈕
			
			checkPointcolorTap(690, 510, 20, 'FFFFFF', 0, 0, 1, 100, 1)  //點選單向下三角形
	
			// CheckImageTap(  10,  540,  100,  600, 0.90, 'backarry.png', 1, 1, 1, 200, 1);  //地牢選單退回鈕
			CheckImageTap( 300,  990,  560, 1080, 0.80, 'OKbutton.png', 1, 1, 1, 500, 1);  //地牢完成後確認鈕
	
			if (useReturn(50) || useReturn(51)) { 
				debugTimer =  Date.now() + Timer * 1000;
				return false;
			}
			
			sleep(100);
		}


	}

	debugTimer =  Date.now() + Timer * 1000;
}

function Donnylog() {
	
	
}

function main(){       //主流程
	if (!config.isRunning) return false;
	var gg = 0;	var vdxx = 12; var tapmod = tapBOXmodSw
	var bossatt = choiceMaterialboss(menuW0Sw, menuW1Sw, menuW2Sw, menuW3Sw, menuW4Sw, menuW5Sw, menuW6Sw, 1, 0);

	var stepMsg = new Array( '', '1_卡屏重啟', '2_收信日獎', '3_廣告金幣', '4_村莊升級', '5_今日挑戰', '6_打競技場', '7_英雄升級', '8_公會幫助', '9_公會勛章', '10_英雄遠征', '11_畫面停止', '12_每日地牢', '13_公會BOSS', '14_商店刷寶物', '15_寶箱廣告');
	var logMsg = new Array(0, stepMsg[1]+', '+stepMsg[2], stepMsg[3]+', '+stepMsg[4], stepMsg[5]+', '+stepMsg[6], stepMsg[7], stepMsg[8]+', '+stepMsg[9], stepMsg[10], stepMsg[11]+', '+stepMsg[12], stepMsg[13], stepMsg[14]+', '+stepMsg[15])
	mainMsg = logMsg[stepCtrl];

	// reminderMsg(240);  //求勳章時間提醒

	
	var todayNowTimeA = new Date();
	var elapsedTime = todayNowTimeA.getHours() * 60 + todayNowTimeA.getMinutes() + todayNowTimeA.getSeconds() / 60;  //經過的時間
	var remainingTime = 24 * 60 - elapsedTime;                                     //剩餘的時間
	
	// console.log(elapsedTime, remainingTime);

	// console.log('elapsedTime:', elapsedTime);

	// console.log(todayNowTimeA.getMinutes(), elapsedChkMin);

	if (todayNowTimeA.getMinutes() > elapsedChkMin) {
		console.log('elapsedTime:', elapsedTime);
		elapsedChkMin = todayNowTimeA.getMinutes();
		
	}else if (elapsedChkMin > todayNowTimeA.getMinutes()) {
		elapsedChkMin = todayNowTimeA.getMinutes();
	}

	if (elapsedTime >= 11 && elapsedTime <= 1429) {
		tapBox(vdxx, tapmod); 

	}else if (todayNowTimeA.getMinutes() > elapsedChkMin) {
		if (elapsedTime <= 10) {
			console.log('elapsedTime <= 10');
			
			if (elapsedTime > 5 && firstTimesetSw == 1) {
				console.log('run firstTimesetting');
				setFirstTimer();
				firstTimesetSw = 0;

			}else {
				console.log('elapsedTime <=10 fistTimesSw:', firstTimesetSw);

			}

		}else if (elapsedTime >= 1430) {
			console.log('elapsedTime >= 1430');
			if (firstTimesetSw == 0) {
				console.log('rest firstTimeSetting Sw');
				firstTimesetSw = 1;

			}else {
				console.log('remainingTime >=1430 fistTimesSw:', firstTimesetSw);
			}
		}

	}

	switch(stepCtrl) {
		case 1 :debug(6); upMenu(1800); break;                                  //1 卡屏重啟       //2 收信日獎
		case 2 :getADGold(60); lvupVillage2(2, lvupViltimeSw); break;           //3 廣告金幣       //4 村莊升級
		case 3 :getDailyreward(900); Areafight(1800); break;                    //5 今日挑戰       //6 打競技場
		case 4 :lvupHero(lvupHerostgSw, lvupHeroDi, lvuptimeSw); break;         //7 英雄升級
		case 5 :Guildchat(900); Guildmedal(heroattribSw, herocodeSw, 1020);     //8 公會幫助       //9 公會勛章
		case 6 :Expeditions(60); break;                                         //10 英雄遠征
		case 7 :checkScreenStop(30, resetappTm, 6); DalyDungeons(bossatt, 5, failureTime, 120); break;        //11 畫面停止判斷  //12 每日地牢
		case 8 :GuildBoss(guildbosshdSw, guildbossthSw, 5, 3600); break;        //13 公會BOSS
		case 9 :artifictStore(artistoTimeSw); getADBox(); break;                //14 商店刷寶      //15 寶箱廣告
		case 10 :break;                                        
		case 11 :
		case 12 :                              
		case 13 :
		case 14 :
		case 15 :
	}
	stepCtrl = stepCtrl + 1;
	if (stepCtrl > 9){stepCtrl = 1;}


}

function setFirstTimer() {   //預設值設定
	lvupHeroTimer     = Date.now() +   60 * 1000; //tt
	lvupVillageTimer  = Date.now() +  120 * 1000; //tt
	getADGoldTimer    = Date.now() +   60 * 1000; //tt
	GuildchatTimer    = Date.now() +   20 * 1000;
	GuildmedalTimer   = Date.now() +   80 * 1000;
	GuildBossTimer    = Date.now() +    0 * 1000; //tt
	
	getDailyTimer     = Date.now() +    0 * 1000;
	ScreenStoptimer   = Date.now() +    3 * 1000;
	toRincarnTimer    = Date.now() +   30 * 1000;
	maDungeonTimer    = Date.now() +   10 * 1000;
	chMatbossTimer    = Date.now() +   -1 * 1000;
	upStartlvTimer    = Date.now() +   10 * 1000;
	ExpedTimer        = Date.now() -  110 * 1000;
	AreafigthTimer    = Date.now() +  210 * 1000;

	artiStoreTimer    = Date.now() +   20 * 1000;
	
	debugTimer        = Date.now() -   10 * 1000;
	checkScreenTimer  = Date.now() +    0 * 1000;
	
	ScreenStoptimer   = Date.now() +   15 * 1000;
	ScreenErrorTime1  = Date.now()
	
	upMenuTimer       = Date.now() +    0 * 1000;

	reminderMsgTime   = Date.now() +    0 * 1000;
	
	stoptime       = [ '',  0,  0,  0,  0,  0,  0];
	autoStuckstage = [  0,  0,  0,  0,  0,  0,  0];
	stageStucktime = [  0,  0,  0,  0,  0,  0,  0];
	ADtimeout      = [ -1, -1, -1, -1, -1, -1, -1];
	lvupTaps       = [ '', 20, 10,  5,  3];

	Hero = {
	  'information':[
			{'NO': 1, 'magiclv': '', 'goldlv': '', 'attrib': '', 'totallv': ''},
			{'NO': 2, 'magiclv': '', 'goldlv': '', 'attrib': '', 'totallv': ''},
			{'NO': 3, 'magiclv': '', 'goldlv': '', 'attrib': '', 'totallv': ''},
			{'NO': 4, 'magiclv': '', 'goldlv': '', 'attrib': '', 'totallv': ''},
			{'NO': 5, 'magiclv': '', 'goldlv': '', 'attrib': '', 'totallv': ''},
		],
	}	

	adActivity = {
		'info':[
				{'activityName':'com.android.launcher3.Launcher','packageName':'com.ldmnq.launcher3'},  //桌面
				{'activityName':'.Main','packageName':'com.godzilab.idlerpg'},                          //遊戲中
				{'activityName':'com.google.android.finsky.activities.MainActivity','packageName':'com.android.vending'},  //廣告
				{'activityName':'com.applovin.adview.AppLovinFullscreenActivity','packageName':'com.godzilab.idlerpg'},    //廣告
				{'activityName':'com.facebook.ads.AudienceNetworkActivity','packageName':'com.godzilab.idlerpg'},          //廣告
				{'activityName':'com.adcolony.sdk.AdColonyInterstitialActivity','packageName':'com.godzilab.idlerpg'},     //廣告
				{'activityName':'com.google.android.gms.ads.AdActivity','packageName':'com.godzilab.idlerpg'},             //廣告
				{'activityName':'com.fyber.inneractive.sdk.activities.InneractiveFullscreenAdActivity','packageName':'com.godzilab.idlerpg'}, //廣告
				{'activityName':'com.unity3d.services.ads.adunit.AdUnitActivity','packageName':'com.godzilab.idlerpg'}     //廣告
		  ],
	  }

	activityQuest = new Array( '', '寶箱Fx3倍', '突襲manta', '工會戰爭', '地牢x2', '遠征x2');
	activityState = new Array( '',  '-無',   '-有-開啟',   '-有-等待', '-有-等待-fx3-當日');
	activityCheck = new Array( '', -1, -1, -1, -1, -1);

	furniture = true;
	Autofight = false;
	
	stopbugV = 0;
	stage = 0;
	stageOld = 0;
	RinF = 0;
	spdstage = 0;
	stage0Error = 0;     //關卡判斷初值
	DalyDungeonsLv = 1;  //地牢預設打最強
	
	herogoldlvmin  = 0;
	totallvupstage = 0;
	villageF       = 1;
	herolvupQ      = 0;
	herolvupAllok  = -1;

	materialCHK    = 0;

	mainMsg        = '';
	artifictGet    =  0;

	stepCtrl       =  1;

	actFx3today    =  0;
	treachest_x0   = -1;

	guildChattest  =  0;

	dungeonsx2LeftT = -1;


	firstTimesetSw  = 0;
	elapsedChkMin   = -1;
}

function setFirstsetting() {
	lvupHeroSw    =    1;   //英雄升級開關
	lvupAllHeroSw =    0;   //使用升級所有英雄鈕
	lvupHeroDi    =    3;   //升級量級次 1:x1, 2:x10, 3:x100, 4:MAX
	lvupHerostgSw =  110;   //設定開始升級關卡
	lvupheromdSw  =    3;   //1:定時, 2:自動, 3:設定
	lvuptimeSw    =  180;   //英雄升級檢查間隔
	lvuplimitSw   =  130;   //金幣等級到達不檢查
	//自動判斷是以魔晶+金幣等級-100為下次檢查關卡

	lvupVillageSw =    0;    //村莊升級
	lvupVillageDi =    2;    //級次 (1:x1, 2:x10, 3:x100)
	lvupViltimeSw =  240;    //村莊升級檢查間隔

	toRincarnSw   =    1;   //輪迴開關
	doubMG        =    0;   //輪迴兩倍魔晶
	ministageSw   = 1681;   //輪迴關卡
	rintimes1Sw   =    1;   //輪迴關卡檢查次數

	autoMinSw     =  140;   //開始檢查關卡 (140~9000)
	autoStuckSw   =   50;   //擊退次數輪回 (1~60)
	StucktimeSw   =   30;   //當前關卡時限 (10~300秒)

	mlvupautoSw   =    1;   //自動升級魔晶等級
	mlvuptargetSw = 2600;   //魔晶等級目標值(0:自動以最小等級為基準)
	mlvupwaterSw  =  200;   //水屬性等級差(正值)(-1:不升級)
	mlvupfireSw   =    0;   //火屬性等級差(正值)(-1:不升級)
	mlvupwoodSw   =    0;   //木屬性等級差(正值)(-1:不升級)
	mlvuplightSw  =    0;   //光屬性等級差(正值)(-1:不升級)
	mlvupdarkSw   =    0;   //暗屬性等級差(正值)(-1:不升級)
	//以最低等級為基礎進行等級差加級
	//由級別差值大到小進行升級
	//每次升級以10級為基礎量


	autoWeekSw    =    1;   //每日可打材料屬性【0:關閉 1:水  2:火  3:木  4:光  5:暗】
	dgticksSw     =    0;   //保留票數

	earlydgMaterialSw  =   5;  //提前保留屬性【0:關閉 1:水  2:火  3:木  4:光  5:暗】
	earlydgticksSw     =  12;  //提前保留票數

	actmaterialX2Sw    =   1;  //2倍地牢活動開始前，提前留票
	actmateriaX2TSw    =  16;  //2倍地牢活動開始前，提前留票時間
	actdgticksSw       =  12;  //2倍地牢活動開始前，提前留票數

	materialX2Sw  =    5;   //材料x2，指定屬性【0:關閉 1:水  2:火  3:木  4:光  5:暗】 NO UI
	materX2TickSw =    0;   //材料x2 保留票

	spdongeonSw   =    0;   //活動boss，9:雪怪，8:豬怪，7:龍怪
	spdstageSw    =   40;   //開始打活動boss關卡

	menuW0Sw      =    5;   //星期日：木、水、暗 (3, 1, 5)
	menuW1Sw      =    5;   //星期一：火、暗 (2, 5)
	menuW2Sw      =    4;   //星期二：木、光 (3, 4)
	menuW3Sw      =    2;   //星期三：水、火 (1, 2)
	menuW4Sw      =    4;   //星期四：木、光 (3, 4)
	menuW5Sw      =    5;   //星期五：水、暗 (1, 5)
	menuW6Sw      =    4;   //星期六：光、火 (4, 2)

	failureTime   =   59;   //打材料boss，判定打不過(剩下時間s)
  
	ExpedSw       =    2;   //遠征開關 (0:關 1:設定人數 2:系統自動)
	ExpedHeroSw   =    1;   //每個遠征最大人數
	ExpedstarSw   =    1;   //刷目標的星級(以1上)
	Expeditem1Sw  =    0;   //刷目標的物品1 (0:保持現有)
	Expeditem2Sw  =    0;   //刷目標的物品2 (0:保持現有)
	Expeditem3Sw  =    0;   //刷目標的物品3 (0:保持現有)
	Expeditem4Sw  =    0;   //刷目標的物品4 (0:保持現有)

	arenaSw       =    0;   //競技開關
	arenaticksSw  =    0;   //保留票數
	arenaFightpw  = 90000;  //對戰戰力
	arenatkchgSw  =    0;   //打不過刷新

	guildchatSw   =    1;   //工會求幫助開關

	guildmaldSw   =    1;   //工會求勛章開關
	heroattribSw  =    4;   //周一~周六：屬性代碼：1:水  2:火  3:木  4:光  5:暗  0:關閉
	herocodeSw    =    3;   //周一~周六：英雄代碼請見設定頁最下方
	heroattrib2Sw =    1;   //周日：1:水  2:火  3:木  4:光  5:暗  0:關閉
	herocode2Sw   =   18;   //周日：英雄代碼請見設定頁最下方
	maldhelpupTSw =    5;   //提早進入求助時間

	guildbossSw   =    1;   //自動打公會BOSS
	guildbossegSw =    0;   //工會BOSS能量保留
	guildbosshdSw =    1;   //工會打BOSS難度 1:弱, 2:中, 3:強
	guildbossthSw =    1;   //工會打BOSS閃電用量 1:100, 2:300
	failureth3Sw  =    0;   //打不過閃電改 300
	failuredwlvSw =    0;   //閃電300 打不過降級打

	getADBoxSw    =    1;   //撿寶箱開關
	tapBOXmodSw   =    2;   //寶箱亂點之術  1:刷關強化  2:點寶箱強化 
	tapRLtimeSw   =    3;   //(A) 點左右頁面次數(按住50ms，間隔50ms)
	afterRLDySw   =   50;   //(B) 點完左右頁面等待時間 ms
	crystalCKSw   =    2;   //(C) 檢查左右水晶次數 (每次35ms)
	tapSkillSw    =    1;   //(D)放大技開關
	skillslepSw   =  160;   //(E)放大技後延遲 ms
	//動作流程與時間差說明
	//① 點擊左邊(A)次 → 等待(B)毫秒 → 檢查左水晶(C)次 → 點擊 210~710(每50pix)
	//② 點擊右邊(A)次 → 等待(B)毫秒 → 檢查右水晶(C)次 → 點擊  10~510(每50pix)
	//③ 施放大技(D) → 等待(E)毫秒 →  回到 ①

	artistorereSw =    0;   //商店刷寶物
	artistoTimeSw =  840;   //商店刷寶物檢查時間(s)
	artistarlvSw  =    6;   //目標寶物星級 (5~7)
	artitarget1Sw =    1;   //目標寶物1 (0:關閉)
	artitarget2Sw =    2;   //目標寶物2 (0:關閉)
	artitarget3Sw =    3;   //目標寶物3 (0:關閉)

	receiveMailSw =    0;   //收mail
	loginDailySw  =    0;   //每日登入獎勵

	admodeSw      =    2;   //看廣告模式  (1:定時, 2:自動判斷  3:VIP5 點跳過)
	adtimesetSw   =   80;   //廣告檢查總時間
	resetappTm    =   80;   //卡畫面重啟時間

	goldADSw      =    0;   //廣告拿金幣開關    
	actListSw     =    1;   //當日活動判斷，活動開始前停撿寶箱
	actfx3Sw      =    1;   //fx3倍活動當日判斷(暫停撿寶箱)
	actdunx2Sw    =    1;   //地牢x2倍活動判斷(預留票用)

	upStartlvSw   =    0;   //英雄自動升星---UI_DEL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

	rouletShotSw  =    1;   //輪回輪盤抓圖
	scrShotSw     =    1;   //重啟前畫面抓圖(Debug用)
	maldShotSw    =    1;   //求勳章畫面抓圖(收集畫面用)
	overwtADSw    =    1;   //看廣告超過45秒抓圖

	//************預計功能********************
	artifactsSw   =    0;   //自動刷寶物
	buyartifactSw =    0;   //買刷到的寶物
	getmaterialSw =    0;   //打要買寶物的材料
	buyclstoneSw  =    0;   //買彩石
	artif1starSw  =    0;   //刷寶物1星級
	artif1codeSw  =    0;   //刷寶物1代碼
	artif2starSw  =    0;   //刷寶物2星級
	artif2codeSw  =    0;   //刷寶物2代碼
	artif3starSw  =    0;   //刷寶物3星級
	artif3codeSw  =    0;   //刷寶物3代碼
				
	artiflvupSw   =    0;   //現有寶物升級
	getmaterialSw =    0;   //自動打寶物材料
	artlvup1starSw=    0;   //升級寶物1星級
	artlvup1codeSw=    0;   //升級寶物1代碼
	artlvup2starSw=    0;   //升級寶物2星級
	artlvup2codeSw=    0;   //升級寶物2代碼
	artlvup3starSw=    0;   //升級寶物3星級
	artlvup3codeSw=    0;   //升級寶物3代碼
}

function test(cycle){
	rbm.init();
	config.isRunning = true;               //腳本測試用function
	for(var n = 0; n <= cycle; n++) {
		if (!config.isRunning) return false;
		
		if (n == 0) { 
			setFirstsetting();   //設定初值設定值
			setFirstTimer();     //設定初始時間值
			// commandsetting();    //初始設定值顯示
		}
		else if (n >= 1) {
			stage = recoNum(1) * 1
			console.log('============================================================================')
			console.log('n = ', n, ', CRA 腳本開始', stage)

			rbm.keepScreenshotPartial(650, 60, 690, 105);  ///點擊AD X
			for (var j = 1; j <= 7; j++){
				// if (j % 2 == i % 2) {
					var n0 = 0;
					if (j >= 10){n0 = '';}
					var filename = 'AD_XX_0' + n0 + j + '.png';
					var Img = rbm.findImage(filename, 0.99);
					rbm.log( j, filename, Img);
					// if (Img != undefined) {break;}
				// }
			}




			while(config.isRunning) {main();}

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
	// console.log(settingString, settings);
	for(var key in settings) {global[key] = settings[key] * 1;};
  
	ministageSw = ministage0UI * 1 +  ministage1UI * 1 + ministage2UI * 1 + ministage3UI * 1 + ministage4UI * 1;
	if (ministageSw <= 140) ministageSw = 140;
	arenaFightpw = arenaFgpw1UI * 1 + arenaFgpw2UI * 1 + arenaFgpw3UI * 1 + arenaFgpw4UI * 1;

	// commandsetting();    //設定值列表
	setFirstTimer();     //設定初始值

	console.log('Crush Them All 腳本開始');	
	while(config.isRunning) { main(); }
} 



	
	// mainMsg = 'main 1 卡畫面與重啟APP檢查';
	// tapBox(vdxx, tapmod); 
	// debug(6);  //卡畫面與重啟APP檢查

	// mainMsg = 'main 2 每日地牢';
	// tapBox(vdxx, tapmod); 
	// DalyDungeons(bossatt, 5, failureTime, 120);   //每日地牢

	// mainMsg = 'main 3 廣告金幣';
	// tapBox(vdxx, tapmod); 
	// getADGold(60);  //廣告金幣

	// mainMsg = 'main 4 村莊升級';
	// tapBox(vdxx, tapmod); 
	// lvupVillage2(2, lvupViltimeSw);   //村莊升級

	// mainMsg = 'main 5 每日挑戰任務';
	// tapBox(vdxx, tapmod); 
	// getDailyreward(900);  

	// mainMsg = 'main 6 競技場';
	// tapBox(vdxx, tapmod); 
	// Areafight(1800);    //每日挑戰任務、競技場

	// mainMsg = 'main 7 英雄升級';
	// tapBox(vdxx, tapmod); 
	// lvupHero(lvupHerostgSw, lvupHeroDi, lvuptimeSw);  //英雄升級

	// mainMsg = 'main 8 公會幫助';
	// tapBox(vdxx, tapmod); 
	// Guildchat(900);                           //公會幫助

	// mainMsg = 'main 9 公會勛章';
	// tapBox(vdxx, tapmod); 
	// Guildmedal(heroattribSw, herocodeSw, 1020)   //公會勛章

	// mainMsg = 'main 10 遠征';
	// tapBox(vdxx, tapmod); 
	// Expeditions(60);  //遠征

	// mainMsg = 'main 11 畫面停止判斷';
	// tapBox(vdxx, tapmod); 
	// checkScreenStop(30, resetappTm, 6);

	// mainMsg = 'main 12 自動收信每日獎勵';
	// tapBox(vdxx, tapmod); 
	// upMenu(3600);  //畫面停止判斷，自動收信每日獎勵
	
	// mainMsg = 'main 13 公會BOSS';
	// tapBox(vdxx, tapmod); 
	// GuildBoss(guildbosshdSw, guildbossthSw, 5, 3600);  //公會BOSS
	
	// mainMsg = 'main 14 商店刷寶物';
	// tapBox(vdxx, tapmod); 
	// artifictStore(artistoTimeSw);  //商店刷寶物, 不自動購買

	// console.log('main 15 寶箱廣告')
	// getADBox();


	
	// var weekCal = new Date().getDay() * 1;
	// var week = weekCal % 7;
	// console.log('week:', week);

	// var timerNext = waithr * 3600 + waitmin * 60 + waitsec - maldhelpupTSw + 5;
	// if (week == 6) {
	// 	var todayNowTime = new Date();
	// 	console.log('todayNowTime:', todayNowTime);

	// 	var next2ChkTime = new Date();
	// 	next2ChkTime.setDate (next2ChkTime.getDate() + 0);
	// 	next2ChkTime.setHours (23);
	// 	next2ChkTime.setMinutes (55);
	// 	next2ChkTime.setSeconds (0);
	// 	console.log('next2ChkTime:', next2ChkTime);

	// 	var epicsAskTime = new Date();
	// 	epicsAskTime.setDate (epicsAskTime.getDate() + 1);
	// 	epicsAskTime.setHours (0);
	// 	epicsAskTime.setMinutes (30);
	// 	epicsAskTime.setSeconds (0);
	// 	console.log('epicsAskTime:', epicsAskTime);

	// 	var next2AskTime =  new Date();
	// 	next2AskTime.setDate (next2AskTime.getDate() + 0);
	// 	next2AskTime.setHours (next2AskTime.getHours() + 0);
	// 	next2AskTime.setMinutes (next2AskTime.getMinutes() + 0);
	// 	next2AskTime.setSeconds (next2AskTime.getSeconds() + totalsec + 7 * 60 * 60);
	// 	console.log('next2AskTime:', next2AskTime);

	// 	var diffAskTime = (epicsAskTime- todayNowTime)/1000;
	// 	console.log('diffAskTime:', diffAskTime);

	// 	console.log('next2AskTime - next2ChkTime:', (next2AskTime - next2ChkTime)/1000);
	// 	if(next2AskTime > next2ChkTime) {
	// 		console.log('周六，下下次求勳章結束會跨日，傳說求勳章推移');
	// 		console.log('等待時間修正(跨日+30分):', diffAskTime);
	// 		timerNext = diffAskTime;
	// 	}else {
	// 		console.log('下下次求勳，未達跨日')
	// 	}

	// }