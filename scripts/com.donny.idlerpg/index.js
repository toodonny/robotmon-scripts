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


// -英雄資料-----
function lvupHero(stageMin, lvupl, Timer) {  //	   OK
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
	
	var lvupX = new Array( 20, 580, 540, 440, 340);
	// var lvupTap = new Array( '', 20, 10, 5, 3);
	
	for (var i = 1; i <= 2; i++){
		if (!config.isRunning) return false;
		
		if (useReturn(1)) {
			choiceMenu(1);

			// DIY_swipe(480, 790, 480, 850, 60, 500);
			
			var list_dY = 92
			// console.log('7;', useReturn(7), ', 6;', useReturn(6), ', 5;', useReturn(5));
			if (useReturn(7)) { var heroheart = 1; }
			else if (useReturn(6)) { var heroheart = 2; }
			else if (useReturn(5)) { var heroheart = 3; list_dY = 0}
			else { var heroheart = 0; }
			
			if (heroheart > 0) {
				
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
							var tapY = Img2.y - 5 + 106 * (k - 1);
							
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
		var goldLv  = num_Recognition(18, goldY1, 66, goldY2, 0.65, 'num_Reco/hero_lv_num/hero_goldlv_num_');
		
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
			
			for (var j = 1; j <= 4; j++){
				if (!config.isRunning) return false;
				// console.log('Village AutoLvup click', i, j);
				
				var robotplantck = villagerobotplant();
				if (robotplantck == 1 || robotplantck == 2 || robotplantck == 4 || robotplantck == 5) {
					rbm.keepScreenshotPartial( 210,  520, 715, 565);  //村莊vip4確認
					var Img1 = rbm.findImage('v4villageautobt.png', 0.90);  //vip4全升級按鈕
					var Img2 = rbm.findImage('v4villageautock.png', 0.90);  //vip4只升到自動的 check box
					rbm.releaseScreenshot();
					
					// if (Img1 != undefined) { rbm.log('Img1:',Img1); }
					// if (Img2 != undefined) { rbm.log('Img2:',Img2); }	
					// Img1 = undefined;
					if(robotplantck == 4 || robotplantck == 5) {
						tapFor(20, 1100, 6, 70, 200);
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
						tapFor(20, 1100, 6, 70, 200);
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
						tapFor(tapX1, tapY1, 6, 50, 100);
						
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

	var lvupX = [20, 580, 540, 440, 340];
	var lvupCheckNG = checkPointcolor(lvupX[1], intY, 30, strNG);
	var lvupCheckOK = checkPointcolor(lvupX[1], intY, 30, strOK);
	// console.log('lvupCheckNG', lvupCheckNG, ', lvupCheckOK', lvupCheckOK);

	if (lvupCheckNG) {return false;}
	if (lvupCheckOK) {
		if (uplv > 1) {		
			DIY_swipe(lvupX[1], intY, 160, intY, 120, 200);
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
						CheckImageTap(60, 600, 650, 1100, 0.90, 'reincarnationx2OK5.png', 1, 1, 2, 500, 1, 1);      //輪迴按鈕X2
					} else { 
						CheckImageTap(200, 980, 280, 1150, 0.80, 'reincarnationOK.png', 1, 1, 2, 500, 1);      //輪迴按鈕
					}
					CheckImageTap(280, 630, 440,  680, 0.80, 'reincarnationQ.png', 480, 830, 2, 500, 0);      //輪迴確認
					CheckImageTap(200, 980, 280, 1110, 0.80, 'reincarnationOK.png', 1, 1, 2, 500, 1);      //輪迴按鈕
					CheckImageTap(280, 630, 440,  680, 0.80, 'reincarnationQ.png', 480, 830, 2, 500, 0);      //輪迴確認
					CheckImageTap(300, 1105, 410,  1270, 0.80, 'reincarnationOKbtn.png', 1, 1, 1, 500, 1);      //輪迴"好"按鈕
					
					CheckImageTap(300, 900, 420, 1080, 0.80, 'reincarnGame.png', 1, 1, 2, 500, 1);         //輪盤遊戲開始鈕
					CheckImageTap(300, 900, 420, 1080, 0.80, 'reincarnGame_dark.png', 630, 215, 10, 500, 0);    //輪盤遊戲開始鈕_按過
					
					CheckImageTap(185, 75, 245, 135, 0.80, 'getnewthing.png', 360, 310, 12, 500, 0, 0);    //得到新物品


					if (useReturn(1)) {
						a = a + 1;
						if (a >= 3) { sleep(200); return false }
					}
					
					sleep(500);
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
	
	if (!toRincarnSw) {console.log('自動輪迴關閉，不檢查關卡'); return false;}
	
	var ministage  =  ministageSw;
	var maxstage   =  9500;
	var stuckstage =  -1; 
	var rintimes1  =  rintimes1Sw;

	stage = recoNum(1) * 1;
	console.log('關卡', stage, '到達');
	if (stage % 50 == 0) console.log('關卡', stage, '到達');
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

// -撿寶箱&大技--
function tapBox(vdX, mode) {  //點寶箱  mode: 1:刷關  2:寶箱    OK
	if (!config.isRunning) return false;
	if (!useReturn(2)) getADSpeed();
	// if (useReturn(50)) {console.log('top:ADBox'); getADBox();}
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
				tapFor(40, 410, tapRLtimeSw, 50, 50, afterRLDySw);
				var crystalR = checkCrystal(1, crystalCKSw, 2);
				tapBoxXY(1, 1, vdX);
			}
			
			if (useReturn(50)) { getADBox();}  //console.log('mid2:ADBox');
			
			tapFor(680, 410, tapRLtimeSw, 50, 50, afterRLDySw);
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
	if (!getADBoxSw) return false;
	//console.log('路上連點');

	var tapX = { 
	    1: ['Left  X:', 210, 265, ''], //左半邊  新版 [2]y差值 -60 ok
	    2: ['Right X:',  10, 265, '']  //右半邊  新版 [2]y差值 -60 ok
	}; 		
		
	var dX = ( 640 - 220 ) / vdX2
	for (var i = 1; i <= times; i++){
		for (var j = 1; j <= vdX2 + 1; j++){
			if (!config.isRunning) return false;
			var tapBX = tapX[modLR][1] + dX * (j - 1);
			tapFor(tapBX, tapX[modLR][2], 1, 20, 10);
			tapX[modLR][3] = tapX[modLR][3] + tapBX + ', ';
		}
	}
	//console.log(tapX[modLR][0], tapX[modLR][3])
}

function tapSkill(pc, mod) {   //點大技  mod: 1:刷關  2:打BOSS
	if (!config.isRunning) return false;
	if (!tapSkillSw && mod == 1) return false;
	if (!useReturn(51) && mod == 1) return false;
	console.log('放大技, 模式:', mod);
	
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
				tapFor( skillX, skillY + 20, 4, 50, 60);
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
	if (!useReturn(61) && Date.now() < GuildchatTimer) return false;
	if (!useReturn(51)) return false;
	if (!useReturn(2)) return false;
	console.log('工會聊天室幫助&領取');

	for (var i = 1; i <= 8; i++){
		if (!config.isRunning) return false;
		
		sleep(200);
		if (useReturn(1)) {
			
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
					tapFor( Img3.x + 10, Img3.y + 10, 2, 60, 300);
					//console.log('Have Help', k);	
				}
				else if (Img4 != undefined) {
					tapFor(Img4.x + 10, Img4.y + 10, 5, 60, 400);
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
		}
		else if (Img3 == undefined && Img4 != undefined) {
			tapFor(Img4.x, Img4.y, 1, 70, 400);
		}
		else if (Img3 != undefined && Img4 == undefined) {


			var bossft_dX = 0;
			rbm.keepScreenshotPartial( 250, 280, 470, 360);  //確認有工會戰爭偏移找團戰
			var Img5 = rbm.findImage('guildfightlable.png', 0.90);
			console.log('Img5:', Img5);
			rbm.releaseScreenshot();
			if (Img5) {bossft_dX = 250;}
			console.log('bossft_dx:', bossft_dX);

			rbm.keepScreenshotPartial( 560, 150 + bossft_dX, 705, 370 + bossft_dX);  //確認打boss碼表圖
			var Img2 = rbm.findImage('guildBosslock.png', 0.90);
			rbm.releaseScreenshot();
			
			if (Img2 != undefined) {
				console.log('沒有工會boss可打，跳出');
				GuildBossTimer =  Date.now() + Timer * 1000;
				return false;
			}
			if (Img2 == undefined) {
				console.log('工會boss開放可打');
				tapFor(560, 150 + bossft_dX, 1, 70, 400);
			}
		}

		if (useReturn(91)) {
			for (var j = 1; j <= 100; j++){
				if (!config.isRunning) return false;
				//console.log('Guild Boss Fight : ', i, j );

				//console.log('21:', useReturn(21));
				if (!useReturn(21)){  //BOSS戰鬥，撤退鈕
					//console.log('GuildBoss:', bosslv, th13);
					
					if (useReturn(91)) {
						var bossfig = GuildBossCK(bosslv, th13);
						if (bossfig == -1) {
							keycode('BACK', 300);
							keycode('BACK', 300);
							GuildBossTimer =  Date.now() + Timer * 1000;
							return false;
						}
					}
					else {
						rbm.keepScreenshotPartial( 310, 700, 405, 1170);  //確認可否刷新對手
						var Img1 = rbm.findImage('OKbutton.png', 0.90);
						rbm.releaseScreenshot();
						if (Img1 != undefined) {
							tapFor(Img1.x, Img1.y, 1, 70, 400);
						}
						
						CheckImageTap(185, 75, 245, 135, 0.80, 'getnewthing.png', 1, 1, 5, 500, 1, 0);    //得到新物品
					}

				}
				else {
					//console.log('Fight Boss');
					tapFor(  680,   410, 2, 70, 150);
					
					tapSkill(5, 2);

					// for (var k = 1; k <= pc; k++){ 
					// 	if (!config.isRunning) return false;
						
					// 	var skillX = 290 + 74 * (k - 1);
						
					// 	if (checkPointcolor(skillX, 519, 15, 'FFFFFF')) {
					// 		tapFor( skillX, 519, 2, 50, 40);
					// 	}
					// }
					
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
	
	
	for (var i = 1; i <= 10; i++){
		if (!config.isRunning) return false;
		console.log('選boss，迴圈:', i);

		rbm.keepScreenshotPartial( 475,  380, 565, 1105);  //找打BOSS組隊圖示
		var Img0s = rbm.findImages('guildbossteamicon2.png', 0.90, 4, true, false);
		rbm.releaseScreenshot();
		
		if (Img0s != '')  {
			Img0s = Img0s.sort(function (a, b) {return a.y > b.y ? 1 : -1;});	
			
			var countImg1 = 0;
			for (var index in Img0s) {
				if (!config.isRunning) return false;
				var result = Img0s[index];
				countImg1 = countImg1 + 1;
				
				//rbm.log('Img0s:', countImg1, result)
				var intX1 = result.x - 480;
				var intY1 = result.y - 180;
				var intX2 = result.x - 468 + 130;
				var intY2 = result.y - 101 + 200;
				break;
			}
			
			rbm.keepScreenshotPartial( intX1,  intY1, intX2, intY2);  //BOSS降級按鈕
			var Img1 = rbm.findImage('guildbossdonwlvbutton.png', 0.90);
			var Img2 = rbm.findImage('guildbosshelpicon.png', 0.90);
			rbm.log('Img1:',Img1);
			rbm.log('Img2:',Img2);
			rbm.releaseScreenshot();
			
			if (Img1 != undefined) { rbm.log('Img1:',Img1); }
			if (Img2 != undefined) { rbm.log('Img2:',Img2); }	
			
			if (Img1 != undefined && Img2 == undefined) {
				tapFor( Img1.x, Img1.y, 1, 60, 200);
			}
			if (Img1 != undefined && Img2 != undefined) {
				if (!config.isRunning) return false;
				console.log('確認難度選單開啟');
				
				var checkX = Img2.x + 160 + 140 * (bosslv - 1);
				var color1 = checkPointcolor(checkX, Img2.y, 30, 'F28459');   //等級按鈕  5D3322:暗的, F28459:亮的
				
				if (color1) { rbm.log('color1:', color1, checkX, Img2.y); }
				
				if (!color1) {
					tapFor( checkX, Img2.y, 1, 60, 200);
				}
				if (color1) {
					if (!config.isRunning) return false;
					
					console.log(400,  Img1.y, 690, Img1.y + 325);
					rbm.keepScreenshotPartial(400,  Img1.y, 690, Img1.y + 325);  //找閃電
					var Img3 = rbm.findImage('guildbosschallenge.png', 0.90);
					var Img4 = rbm.findImage('thundericonBTN.png', 0.92);
					var Img6 = rbm.findImage('thundericonBTN_dark.png', 0.92);
					rbm.releaseScreenshot();
					
					if (Img3 != undefined) { rbm.log('Img3:',Img3); }
					if (Img4 != undefined) { rbm.log('Img4:',Img4); }
					if (Img6 != undefined) { rbm.log('Img6:',Img6); }


					if (Img3 != undefined) {
						
						if (Img6 != undefined) {
							console.log('閃電低於', 100 + 200 * (th13 - 1), '，閃電不足，跳出');
							return -1;
							
						}
						else if (Img4 == undefined) {
							tapFor( Img3.x, Img3.y, 1, 60, 300);
						}
						else if (Img4 != undefined) {
							console.log('等待開打選100 or 300 閃電');
							
							var tapX = 440;
							if (th13 == 3) {tapX = 580;}
							
							console.log(tapX, Img4.y, 30, 'E78900');
							var color2 = checkPointcolor(tapX, Img4.y + 50, 30, 'E78900');   //等級按鈕  7E1C23:暗的, E78900:亮的
							if (color2) { rbm.log('color2:', color2, tapX, Img4.y); }
							
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

function Guildmedal(attrib, herocode, Timer) {  //工會求勛章
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
		
		sleep(200);
		if (useReturn(1)) {
			
			var a = 0;
			for (var j = 1; j <= 6; j++){
				if (!config.isRunning) return false;
				//console.log('Guildmedal', i, j);
				
				rbm.keepScreenshotPartial( 0, 425, 250, 500);             //
				var Img1 = rbm.findImage('chatMenuButton.png', 0.9);
				var Img2 = rbm.findImage('guildChatButton.png', 0.9);  //
				rbm.log('Img1:', Img1);
				rbm.log('Img2:', Img2);
				rbm.releaseScreenshot();
				
				if (Img1 != undefined) {
					if (Img2 == undefined) {
						tapFor( Img1.x + 10, Img1.y + 10, 1, 60, 300);
					}
					else if (Img2 != undefined) {
						tapFor(Img2.x + 10, Img2.y + 10, 1, 60, 1000);
					}
				}
				
				if (useReturn(8)) {a = a + 1; if (a >= 2) break;}
				
				sleep(300);
			}
			
			var a = 0; b = 0;
			for (var k = 1; k <= 25; k++){
				if (!config.isRunning) return false;
				//if (!useReturn(8)) return false;
				//console.log('Guildmedal', i, j, k);
				
				rbm.keepScreenshotPartial( 5, 1075, 95, 1170);             //求勛章按鈕
				var Img3 = rbm.findImage('guildmedalbutton.png', 0.90);
				var Img7 = rbm.findImage('guildmedalbutton_dark.png', 0.90);
				var Img8 = rbm.findImage('guildmedalgetbutton.png', 0.90);
				rbm.log('Img3:', Img3);
				rbm.log('Img7:', Img7);
				rbm.log('Img8:', Img8);
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
					}
					else if (totalsec > maldhelpupTSw) {
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
					
					if (Img4 != undefined) {rbm.log('Img4:', Img4);}
					if (Img5 != undefined) {rbm.log('Img5:', Img5);}
					
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

function herolistchoice(attrib, herocode) {
	if (!config.isRunning) return false;
	//console.log('選英雄', attrib, no);
	
	
	ScreenShottoPath('CTA_herolistchoice_');

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

function getDailyreward(Timer) {   //領取每日任務獎勵   OK
	if (!config.isRunning || Date.now() < getDailyTimer) return false;
	if (!useReturn(51)) return false;
	if (!useReturn(2)) return false;
	console.log('領取每日任務獎勵');

	for (var i = 1; i <= 4; i++){
		if (!config.isRunning) return false;
		
		sleep(200);
		if (useReturn(1)) {
			choiceMenu(0);
				
			for (var j = 1; j <= 3; j++){
				if (!config.isRunning) return false;
				console.log(' Daily Reward', i, j);
				
				var chkPointX = 400 + 106 * (j - 1);
				if (checkPointcolor(chkPointX, 710, 40, 'FF2281')) {
					for (var k = 1; k <= 3; k++){
						checkPointcolorTap(chkPointX, 710, 40, 'FF2281', 1, 1, 1, 1000, 1);
						
						console.log('9:', useReturn(9));
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


function DalyDungeons(mF2, pc, failureT, Timer) {  //【F2:材料魔王 1:水  2:火  3:木  4:光  5:暗】【PC:大技數量】   OK
	if (!config.isRunning || Date.now() < maDungeonTimer) return false;
	if (!autoWeekSw) return false;
	if (!useReturn(51)) return false;
	if (!useReturn(2)) return false;
	//console.log('mF2:', mF2); console.log('mF2:', mF2, ', 本日自動打材料關閉'); 
	if (mF2 == 0) {return false;}
	
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
				if (!useReturn(21)){  //BOSS戰鬥，撤退鈕
					
					// console.log('21:false', 1111)
					rbm.keepScreenshotPartial( 310, 880, 405, 1170);  //完成後確認鈕
					var targetImg3 = rbm.findImage('OKbutton.png', 0.80);
					rbm.releaseScreenshot();

					if (targetImg3 != undefined && targetImg3.score >= 0.80) {
					// console.log('21:false', 2222)
						tapFor(targetImg3.x, targetImg3.y, 1, 60, 500);
					}
					else {	

						// console.log('21:false', 3333)
						for (var l = 1; l <= 4; l++){
							dgticks[1] = recoNum(2); sleep(150); //1 確認目前票數
							dgticks[2] = recoNum(2); sleep(150); //2 確認目前票數
							dgticks[3] = recoNum(2); sleep(150); //3 確認目前票數
							
							console.log('l:', l, dgticks[0], dgticks[1], dgticks[2], dgticks[3])
							if (dgticks[1] == dgticks[2] && dgticks[2] == dgticks[3] && dgticks[1] != -1){
								dgticks[0] = dgticks[1]; break;
							}
						}
						
					// console.log('21:false', 4444)
						// console.log(' 24:', useReturn(24));
						if (useReturn(24)) {
							sleep(300);
							checkPointcolorTap(690, 510, 20, 'FFFFFF', 0, 0, 2, 100, 1);
							spdongeonSw = 0;
							console.log(' 0票，本活動BOSS次數用完，切回正常BOSS');
							return false;
						}
						
					// console.log('21:false', 5555)
						if ( (dgticks[0] == 0 || dgticks[0] <= dgticksSw) && dgticks[0] != -1) {
							sleep(300);
							checkPointcolorTap(690, 510, 20, 'FFFFFF', 0, 0, 2, 100, 1);
							// console.log('1Timer:', Timer, dgticksSw, dgticks);
							Timer = Timer + 1200 //* (dgticksSw - dgticks[0] + 1);
							// console.log('2Timer:', Timer);
							maDungeonTimer =  Date.now() + Timer * 1000;
							console.log('小於保留票數', dgticks[0], '<=', dgticksSw, '或 0票，', Timer / 60, '分，後檢查', i, j);
							return false;
						}

						// console.log('21:false', 6666)
						if (dgticks[0] > dgticksSw){
							console.log('大於保留票數', dgticks[0], '>', dgticksSw, ', 正常打BOSS', 'bossLV:', DalyDungeonsLv);
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
				}
				else {
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

					// for (var k = 1; k <= pc; k++){ 
					// 	if (!config.isRunning) return false;
						
					// 	// var skillX = 210 + 66 * (k - 1);
					// 	// if (checkPointcolor(skillX, 418, 30, 'FFFFFF')) {
					// 	// 	tapFor( skillX, 428, 4, 50, 40);
					// 	// }

					// 	var skillX = 320 + 74 * (k - 1);
					// 	if (checkPointcolor(skillX, 538, 30, 'FFFFFF')) {
					// 		tapFor( skillX, 538, 3, 50, 40);
					// 	}



					// }
					
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
	if (!checkPointcolor(407, 1201, 20, 'FFA800') || Date.now() < ExpedTimer) return false;
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
	
	for (var i = 1; i <= 5; i++){
		if (!config.isRunning) return false;
		
		//console.log('遠征問號圖示, 26:', useReturn(26));
		if (useReturn(26)) {
			var tapAutoT = 0; var emptyC = 0;
			for (var j = 1; j <= 40; j++){
				if (!config.isRunning) return false;
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
					if (ExpeditemSw == 0 && ExpedstarSw == 0) {
						tapFor( Img2.x, Img2.y, 1, 60, 700);
					}
					else {
						rbm.keepScreenshotPartial(Img2.x - distRe[1],  Img2.y - distRe[2], Img2.x - distRe[3], Img2.y - distRe[4]);  //
						var Img3 = rbm.findImage('exped_refresh.png', 0.90);
						// rbm.log('refresh:', Img3);
						rbm.releaseScreenshot();
						
						if (Img3 != undefined && ExpeditemSw > 0) {
							var itemFile = 'exped_item/exped_item_' + ExpeditemSw + '.png';
							rbm.keepScreenshotPartial(Img2.x - distIt[1],  Img2.y - distIt[2], Img2.x - distIt[3], Img2.y - distIt[4]);  //
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
					
					console.log('沒有可執行的遠征(每日勛章除外)');
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
			
			var a = 1;
			for (var j = 1; j <= 6; j++){
				if (!config.isRunning) return false;
				console.log('Choice Dungeon : ', i, j );
				
				rbm.keepScreenshotPartial( 500, 525, 560, 1140);  //地城選單圖示範圍
				var targetImg = rbm.findImage('Dungeon_0' + F1 + '.png', 0.90);
				if (F1 == 1 && targetImg == undefined) {

					for (var k = 1; k <= 3; k++) {
						var targetImg = rbm.findImage('Dungeon_0' + F1 + '_' + k + '.png', 0.90);  //活動boss主選單畫面
						if (targetImg != undefined) break;
					}
				}
				
				rbm.releaseScreenshot();
				if (targetImg != undefined && targetImg.score >= 0.90) {
					tapFor(targetImg.x, targetImg.y, 1, 60, 400);
				}
				
				switch(F1) {    //【F1:地城類別 1:材料 2:突襲 3:遠征 4:競技 】
					case 1 :
						console.log('case 1', F1);
						rbm.keepScreenshotPartial( 110, 590, 440, 1170);  //boss選單圖示範圍  屬性圖示
						var targetImg2 = rbm.findImage('materialBoss/materialBoss4_0' + F2 + '.png', 0.90);
						rbm.log('targetImg2:', targetImg2);
						rbm.releaseScreenshot();
						if (targetImg2 != undefined && targetImg2.score >= 0.90) {
							
							var spY = 0;
							if (F2 == 7) {var spY = 50;} 
							rbm.keepScreenshotPartial( targetImg2.x + 330, targetImg2.y - 54, targetImg2.x + 480, targetImg2.y + 40 + spY);  //boss選單圖示範圍
							var targetImg7 = rbm.findImage('enterbossroom.png', 0.90);
							rbm.log('targetImg7:', targetImg7);
							rbm.releaseScreenshot();
							
							if (targetImg7 != undefined && targetImg7.score >= 0.90) {
								console.log('tap targetImg7');
								tapFor(targetImg7.x, targetImg7.y, 1, 60, 300);
							}
						}
							rbm.keepScreenshotPartial( 590, 560, 680, 1170);  //確認"挑戰"按鈕出現量
							var results = rbm.findImages('challengeBoss.png', 0.90, 6, true, false);
							rbm.releaseScreenshot();
							
							var countchl = Object.keys(results).length;
							//console.log(countchl); //取物件長度，挑戰鈕數量
							if (countchl >= 1) {console.log('挑戰鈕 >= 2個，BOSS選擇完成'); return false;}
						
					case 2 : if (useReturn(27)) {a = a + 1; if ( a >= 2 ) {sleep(300); return false;}}; break;  //遠征問號圖示
					case 3 : if (useReturn(26)) {a = a + 1; if ( a >= 2 ) {sleep(300); return false;}}; break;  //突襲幣圖示
					case 4 : if (useReturn(28)) {a = a + 1; if ( a >= 2 ) {sleep(300); return false;}}; break;  //競技幣圖示	
				}	

				sleep(200)
			}
		}

		sleep(200);
	}
}

function choiceMaterialboss(w0, w1, w2, w3, w4, w5, w6, Timer) {  //每日材料BOSS屬性
	if (!config.isRunning || Date.now() < chMatbossTimer) return false;
	if (!autoWeekSw){console.log('自動打材料總開關：關閉'); return false;}
	if (!useReturn(1)) return false;
	//console.log('每日材料BOSS屬性');
	
	
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
	var week = new Date().getDay() * 1;
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

function upMenu(Timer) {
	if (!config.isRunning || Date.now() < upMenuTimer) return false;
	if (!useReturn(2)) return false;
	if (!useReturn(51)) return false;
	
	console.log('檢查收信、每日獎勵(右上)');
	
	if (!receiveMailSw && !loginDailySw) {
		console.log('!receiveMailSw && !loginDailySw');
		upMenuTimer =  Date.now() + Timer * 1000;
		return false;
	}
	
	var a = 0; var b = 0;
	for (var i = 1; i <= 8; i++) {
		if (!config.isRunning) return false;
	
		CheckImageTap( 625, 10, 710, 70, 0.85, 'mainpagebutton.png', 1, 1, 1, 800, 1);  //右上功能圖示
		
		if (receiveMailSw) {
			var mailcolor = checkPointcolor(255, 92, 30, 'DD1819');
			//console.log('mailcolor:', mailcolor);
			
			if (mailcolor) {
				tapFor(244, 102, 3, 50, 150, 600);
				receiveMail();
			}
		}
		
		if (loginDailySw) {
			var loginDailycolor = checkPointcolor(255, 192, 30, 'DD1819');
			//console.log('loginDailycolor:', loginDailycolor);
			
			if (loginDailycolor) {
				tapFor(240, 191, 3, 50, 150, 600);
				loginDailyreward();
			}
		}
		
		if (i == 8) {
			console.log('檢查', 8, '次, ', Timer, '秒後再檢查');
			
			CheckImageTap( 651, 29, 687, 52, 0.85, 'upmenuclose.png', 1, 1, 1, 300, 1);  //右上功能圖示關閉
			CheckImageTap( 651, 29, 687, 52, 0.85, 'upmenuclose.png', 1, 1, 1, 300, 1);  //右上功能圖示關閉
			
			upMenuTimer =  Date.now() + Timer * 1000;
			return false;
		}
		
		sleep(200);
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
		
		rbm.keepScreenshotPartial( 149, 99, 350, 115);  //確認"有mail提示"
		var results = rbm.findImages('mailExclamationmark.png', 0.90, 2, true, false);
		if (results == '') results = rbm.findImages('mailExclamationmark2.png', 0.90, 2, true, false);
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
				tapFor(result.x, result.y + 5, 2, 50, 100, 300);
				
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
	if (useReturn(50) || useReturn(51)) { return false;}
	
	for (var i = 1; i <= 3; i++){
		console.log('debug檢查', i);
		
		//console.log('1:', useReturn(1));
		if (useReturn(1)) {
			CheckImageTap(260, 630, 450, 1180, 0.90, 'getButton.png', 1, 1, 2, 200, 1, 0);      //點擊獲取
			CheckImageTap(280, 490, 420,  540, 0.90, 'exitgame.png', 240, 830, 1, 200, 0, 0);    //取消退出遊戲
			CheckImageTap(235, 495, 450,  550, 0.85, 'noticks.png', 240, 820, 1, 300, 0, 0);    //
			CheckImageTap(280, 400, 420,  460, 0.90, 'noAdenough.png', 360, 700, 1, 200, 0, 0);  //廣告不足
			CheckImageTap(230,  22, 262,   43, 0.90, 'speedoff.png', 1, 1, 1, 200, 1, 0);  //加速關閉點on
			CheckImageTap(280, 400, 440,  630, 0.90, 'X2SPEED_SMALL_ICON.png', 240, 820, 1, 200, 0, 1);  //加速直接點視窗關閉
			
			if (useReturn(52)){ checkPointcolorTap(690, 510, 20, 'FFFFFF', 0, 0, 2, 100, 1); } // 點向下箭頭 
		}
		else {
			
			CheckImageTap( 651, 29, 687, 52, 0.85, 'upmenuclose.png', 1, 1, 1, 300, 1);  //右上功能圖示關閉
			CheckImageTap2(620, 1200, 690, 1260, 0.85, 'guildBack.png', 'guildBack2.png', 1, 1, 1, 200, 1);    //公會退出鈕1,2
			CheckImageTap(185, 75, 245, 135, 0.85, 'getnewthing.png', 360, 310, 10, 400, 0);    //得到新物品
			CheckImageTap( 80, 590, 410, 640, 0.95, 'androiderror.png', 600, 690, 1, 200, 0);    //android 停止
			CheckImageTap(300, 125, 360, 190, 0.95, 'reincarnationOK2.png', 360, 1200, 1, 200, 0);    //轉生後的 好
			CheckImageTap(300, 600, 410,  1270, 0.80, 'reincarnationOKbtn.png', 1, 1, 1, 500, 1, 1);      //"好"按鈕

			
			if (i == 3) {CheckImageTap(0, 0, 720, 1280, 0.85, 'waitinglogo.png', 1, 1, 1, 200, 1);}    //待機移動logo
		}
		
		CheckImageTap(500, 0, 720, 530, 0.85, 'rightupXX.png', 1, 1, 1, 200, 1, 0);    //右上的叉叉
		CheckImageTap(310, 600, 405, 1170, 0.85, 'OKbutton.png', 1, 1, 1, 200, 1, 0);    //確認鈕
		
		if (useReturn(50) || useReturn(51)) { return false;}
		
		sleep(100);
	}
	debugTimer =  Date.now() + Timer * 1000;
}

function Donnylog() {
	
	
}

function main(){       //主流程
	if (!config.isRunning) return false;
	var gg = 0;	var vdxx = 10; var tapmod = tapBOXmodSw
	var bossatt = choiceMaterialboss(menuW0Sw, menuW1Sw, menuW2Sw, menuW3Sw, menuW4Sw, menuW5Sw, menuW6Sw, 1)

	console.log('main 卡畫面與重啟APP檢查')
	tapBox(vdxx, tapmod); debug(6);  //卡畫面與重啟APP檢查

	console.log('main 每日地牢')
	tapBox(vdxx, tapmod); DalyDungeons(bossatt, 5, failureTime, 120);   //每日地牢

	console.log('main 廣告金幣')
	tapBox(vdxx, tapmod); getADGold(60);  //廣告金幣

	console.log('main 村莊升級')
	tapBox(vdxx, tapmod); lvupVillage2(2, 60);   //村莊升級

	console.log('main 每日挑戰任務')
	tapBox(vdxx, tapmod); getDailyreward(900);  

	console.log('main 競技場')
	tapBox(vdxx, tapmod); Areafight(1800);    //每日挑戰任務、競技場

	console.log('main 英雄升級')
	tapBox(vdxx, tapmod); lvupHero(lvupHerostgSw, lvupHeroDi, lvuptimeSw);  //英雄升級

	console.log('main 公會幫助')
	tapBox(vdxx, tapmod); Guildchat(180);

	console.log('main 公會勛章')
	tapBox(vdxx, tapmod); Guildmedal(heroattribSw, herocodeSw, 1020)   //公會幫助、公會勛章

	console.log('main 遠征')
	tapBox(vdxx, tapmod); Expeditions(60);  //遠征

	console.log('main 畫面停止判斷')
	tapBox(vdxx, tapmod); checkScreenStop(30, resetappTm, 6);

	console.log('main 自動收信每日獎勵');
	tapBox(vdxx, tapmod); upMenu(3600);  //畫面停止判斷，自動收信每日獎勵
	
	console.log('main 公會BOSS')
	tapBox(vdxx, tapmod); GuildBoss(guildbosshdSw, guildbossthSw, 5, 3600);  //公會BOSS
}

function setFirstTimer() {   //預設值設定
	lvupHeroTimer     = Date.now() +   60 * 1000; //tt
	lvupVillageTimer  = Date.now() +  120 * 1000; //tt
	getADGoldTimer    = Date.now() +   60 * 1000; //tt
	GuildchatTimer    = Date.now() +   20 * 1000;
	GuildmedalTimer   = Date.now() +   80 * 1000;
	GuildBossTimer    = Date.now() +  0 * 1000; //tt
	
	getDailyTimer     = Date.now() +    0 * 1000;
	ScreenStoptimer   = Date.now() +    3 * 1000;
	toRincarnTimer    = Date.now() +   30 * 1000;
	maDungeonTimer    = Date.now() +   10 * 1000;
	chMatbossTimer    = Date.now() +   -1 * 1000;
	upStartlvTimer    = Date.now() +   10 * 1000;
	ExpedTimer        = Date.now() -  110 * 1000;
	AreafigthTimer    = Date.now() +  210 * 1000;
	
	debugTimer        = Date.now() -   10 * 1000;
	checkScreenTimer  = Date.now() +    0 * 1000;
	
	ScreenStoptimer   = Date.now() +   15 * 1000;
	ScreenErrorTime1  = Date.now()
	
	upMenuTimer       = Date.now() +    0 * 1000;
	
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
	
	furniture = true;
	Autofight = false;
	
	stopbugV = 0;
	stage = 0;
	RinF = 0;
	spdstage = 0;
	stage0Error = 0;     //關卡判斷初值
	DalyDungeonsLv = 1;  //地牢預設打最強
	
	herogoldlvmin  = 0;
	totallvupstage = 0;
	villageF       = 1;
	herolvupQ      = 0;
}

function setFirstsetting() {
	lvupHeroSw    =    1;   //英雄升級開關
	lvupHeroDi    =    3;   //升級量級次 1:x1, 2:x10, 3:x100, 4:MAX
	lvupHerostgSw =   40;   //設定開始升級關卡
	lvupheromdSw  =    3;   //1:定時, 2:自動, 3:設定
	lvuptimeSw    =  240;   //英雄升級檢查間隔
	lvuplimitSw   =  600;   //金幣等級到達不檢查
	//自動判斷是以魔晶+金幣等級-100為下次檢查關卡

	lvupVillageSw =    1;
	lvupVillageDi =    2;

	autoWeekSw    =    1;   //每日可打材料屬性【1:水  2:火  3:木  4:光  5:暗】
	dgticksSw     =    0;   //保留票數

	spdongeonSw   =    0;   //活動boss，9:雪怪，8:豬怪，7:龍怪
	spdstageSw    =  300;

	menuW0Sw      =    1;   //星期日：木、水、暗 (3, 1, 5)
	menuW1Sw      =    2;   //星期一：火、暗 (2, 5)
	menuW2Sw      =    4;   //星期二：木、光 (3, 4)
	menuW3Sw      =    1;   //星期三：水、火 (1, 2)
	menuW4Sw      =    3;   //星期四：木、光 (3, 4)
	menuW5Sw      =    1;   //星期五：水、暗 (1, 5)
	menuW6Sw      =    4;   //星期六：光、火 (4, 2)

	failureTime   =   5;   //打材料boss，判定打不過(剩下時間s)

	toRincarnSw   =    1;   //輪迴開關
	ministageSw   =  1500;   //輪迴關卡
	rintimes1Sw   =    1;   //輪迴關卡檢查次數
	doubMG        =    0;   //輪迴兩倍魔晶

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

	autoStuckSw   =   50;
	autoMinSw     =  140;
	StucktimeSw   =   30;

	ExpedSw       =    1;   //遠征開關
	ExpedHeroSw   =    1;   //每個遠征最大人數
	ExpedstarSw   =    2;   //刷目標的星級(以上)
	ExpeditemSw   =    0;   //刷目標的物品

	arenaSw       =    1;   //競技開關
	arenaticksSw  =    0;   //保留票數
	arenaFightpw  = 90000;  //對戰戰力
	arenatkchgSw  =    0;   //打不過刷新

	getADBoxSw    =    1;   //撿寶箱開關
	tapBOXmodSw   =    2;   //寶箱亂點之術  1:刷關強化  2:點寶箱強化
	tapRLtimeSw   =    2;   //(A) 點左右頁面次數(按住50ms，間隔50ms)
	afterRLDySw   =   80;   //(B) 點完左右頁面等待時間 ms
	crystalCKSw   =    2;   //(C) 檢查左右水晶次數 (每次35ms)
	tapSkillSw    =    1;   //(D)放大技開關
	skillslepSw   =  300;   //(E)放大技後延遲 ms
	//動作流程與時間差說明
	//① 點擊左邊(A)次 → 等待(B)毫秒 → 檢查左水晶(C)次 → 點擊 210~710(每50pix)
	//② 點擊右邊(A)次 → 等待(B)毫秒 → 檢查右水晶(C)次 → 點擊  10~510(每50pix)
	//③ 施放大技(D) → 等待(E)毫秒 →  回到 ①

	guildchatSw   =    1;   //工會求幫助開關
	guildmaldSw   =    1;   //工會求勛章開關
	heroattribSw  =    4;   //周一~周六：屬性代碼：1:水  2:火  3:木  4:光  5:暗  0:關閉
	herocodeSw    =    1;   //周一~周六：英雄代碼請見設定頁最下方
	heroattrib2Sw =    1;   //周日：1:水  2:火  3:木  4:光  5:暗  0:關閉
	herocode2Sw   =   11;   //周日：英雄代碼請見設定頁最下方
	maldhelpupTSw =    5;   //提早進入求助時間

	guildbossSw   =    1;   //工會打BOSS開關
	guildbosshdSw =    3;   //工會打BOSS難度 1:弱, 2:中, 3:強
	guildbossthSw =    1;   //工會打BOSS閃電用量 1:100, 2:300
	failureth3Sw  =    0;   //打不過閃電改 300
	failuredwlvSw =    0;   //閃電300 打不過降級打

	admodeSw      =    2;   //看廣告模式
	adtimesetSw   =   85;   //廣告檢查總時間
	resetappTm    =   60;   //卡畫面重啟時間
	upStartlvSw   =    0;   //英雄自動升星

	receiveMailSw =    1;   //收mail
	loginDailySw  =    1;   //每日登入獎勵

	scrShotSw     =    1;   //重啟前畫面抓圖(Debug用)
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

			// // console.log(400,  Img1.y, 690, Img1.y + 325);
			// rbm.keepScreenshotPartial(400, 393, 690, 718);  //找閃電
			// var Img3 = rbm.findImage('guildbosschallenge.png', 0.90);
			// var Img4 = rbm.findImage('thundericonBTN.png', 0.92);
			// var Img6 = rbm.findImage('thundericonBTN_dark.png', 0.92);
			// rbm.releaseScreenshot();
			
			// if (Img3 != undefined) { rbm.log('Img3:',Img3); }
			// if (Img4 != undefined) { rbm.log('Img4:',Img4); }
			// if (Img6 != undefined) { rbm.log('Img6:',Img6); }

			// CheckImageTap(300, 600, 410,  1270, 0.80, 'reincarnationOKbtn.png', 1, 1, 1, 500, 1, 1);      //輪迴"好"按鈕

			// GuildBossCK(3, 1)

			// herolistchoice(2, 16);

			while(config.isRunning) {main();}
			sleep(1000)
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
  
	ministageSw = ministage1UI * 1 + ministage2UI * 1 + ministage3UI * 1 + ministage4UI * 1;
	if (ministageSw <= 140) ministageSw = 140;
	arenaFightpw = arenaFgpw1UI * 1 + arenaFgpw2UI * 1 + arenaFgpw3UI * 1 + arenaFgpw4UI * 1;

	// commandsetting();    //設定值列表
	setFirstTimer();     //設定初始值

	console.log('Crush Them All 腳本開始');	
	while(config.isRunning) { main(); }
} 
