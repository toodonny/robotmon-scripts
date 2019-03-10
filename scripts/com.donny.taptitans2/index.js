importJS('RBM-0.0.3');

// ============================taptitans2=============================== //

var config = {
  appName: 'com.donny.taptitans2',
  oriScreenWidth: 720, // source
  oriScreenHeight: 1280,
  oriVirtualButtonHeight: 0,
  oriResizeFactor: 1, 
  eventDelay: 100,
  imageThreshold: 1,
  imageQuality: 100,
  resizeFactor: 1, // small -> quickly
  scriptDir: 'scripts/com.donny.taptitans2/images',
  isRunning: false,
  isPause: false,
  PackangName: 'com.gamehivecorp.taptitans2',
  LaunchActivityName: 'com.unity3d.player.UnityPlayerActivity',
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
	
	return check;
}

function checkPointcolorTap(intX, intY, diff, strRGB, TapX, TapY, TapTimes, Delay1, Taptype) {  //type: 0:TapX, TapY, 1:intX, intY, 2:return 
	if (!config.isRunning) return false;
	
	check = checkPointcolor(intX, intY, diff, strRGB);
	if (Taptype == 2) {return check;}                       //console.log('check:', check);
	for (var i = 0; i < TapTimes; i++) {
		if (!config.isRunning) return false;
		
		if (check) {
			if (Taptype == 0) { tap(TapX, TapY, 80); }          //console.log('Tap TapX, TapY: ', TapX, TapY)
			else if (Taptype == 1) { tap(intX, intY, 80); } 	//console.log('Tap intX, intY: ', intX, intY)
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

function CheckImageTap(intX, intY, finX, finY, Siml, ImageName, TapX, TapY, TapTimes, Delay1, Taptype) {  //Taptype:  0:Tap X,Y, 1:tapImage, 2:return 
	if (!config.isRunning) return false;
	rbm.keepScreenshotPartial(intX, intY, finX, finY); // x1, y1, x2, y2
	var targetImag = rbm.imageExists(ImageName, Siml);

	if (Taptype == 2) {
		rbm.releaseScreenshot();
		return targetImag;
	}
	
	for (var i = 0; i < TapTimes; i++) {
		if (!config.isRunning) return false;
		if (targetImag) {
			if (Taptype == 0) {
				tap(TapX, TapY, 100)
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
	sleep(sleeptime)
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

function ScreenShottoPath(filename) { //全畫面截圖存檔
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
	
	//console.log('數字辨識-測試function');
	var Character = { 
	    'Attributes':[
	        {'No':0, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':1, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':2, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':3, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':4, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':5, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':6, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':7, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':8, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':9, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':10, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':11, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':12, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':13, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':14, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':15, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':16, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':17, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':18, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':19, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':20, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':21, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':22, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':23, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':24, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':25, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':26, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':27, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':28, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':29, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':30, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''},
	        {'No':31, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':32, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':33, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':34, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':35, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':36, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':37, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':38, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':39, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':40, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':41, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':42, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':43, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':44, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':45, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':46, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':47, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':48, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	        {'No':49, 'Value':0, 'x':0, 'y':'', 'Rank':'', 'score':''}, 
	    ], 
	}; 	
	
	//抓圖辨識數字及x位置
	rbm.keepScreenshotPartial(x1, y1, x2, y2);
	var arrynum = 0
	for (var i = 0; i <= 9; i++) {
		if (!config.isRunning) return false;
		
		//console.log('1 reNum:', 'findImages', numstr + i + '.png', siml);
		var results = rbm.findImages(numstr + i + '.png', siml, 5, false, false);
		//rbm.log('2 reNum:', i, rbm.findImages(numstr + i + '.png', 0.60, 6, true, false));
		//rbm.log('3 reNum:', i, rbm.findImages(numstr + '2-' + i + '.png', 0.90, 6, false, false));
		
		for (var index in results){
			if (!config.isRunning) return false;
			
			var result = results[index];
			//rbm.log('4 reNum:', i, numstr + i + '.png', result.x, result.y, result.score)
			
			Character.Attributes[arrynum].Value = i;
			Character.Attributes[arrynum].x = result.x;
			Character.Attributes[arrynum].y = result.y;
			Character.Attributes[arrynum].score = result.score.toFixed(5);
			
			arrynum = arrynum + 1
		}
	}
	rbm.releaseScreenshot();
	
	if (Character.Attributes[0].score == '') return -1;
	
	//console.log('reNum:', 'sort a.x < b.x');
	Character.Attributes = Character.Attributes.sort(function (a, b) {
		return a.x < b.x ? 1 : -1;
	});	
	
	// for (var i = 0; i <= 49; i++ ) {
		// if (Character.Attributes[i].score == '') break;
		// rbm.log('5 reNum:', i, Character.Attributes[i])
	// }
	
	// console.log('clear errorX');
	for (var j = 0; j < 49; j++ ) {
		var errckX1 = Character.Attributes[j].x;
		var errcksc1 = Character.Attributes[j].score;
		
		if (errcksc1 != '') {
			var inK = j + 1;
			for (var k = inK; k <= 48; k++) {
				var errckX2 = Character.Attributes[k].x;
				var errcksc2 = Character.Attributes[k].score;
				
				var errckDv = Math.abs(errckX2 - errckX1);
				// console.log(j, k, errckDv, errckX1, errckX2, errcksc1, errcksc2)
				
				if (errckDv > 5 || errcksc2 == '') break
				
				if (errckDv <= 5) {
					if (errcksc1 > errcksc2) {var clear = k;}
					else if (errcksc1 < errcksc2) {var clear = j;}
					// console.log('clear:', clear, j, k, errcksc1, errcksc2);
					
					Character.Attributes[clear].Value = 0;
					Character.Attributes[clear].x = 0;
					Character.Attributes[clear].y = '';
					Character.Attributes[clear].score = '';
				}
				if (Character.Attributes[j].score == '') break;				
			}
		}
	}
	
	Character.Attributes = Character.Attributes.sort(function (a, b) {
		return a.x < b.x ? 1 : -1;
	});
	
	// for (var i = 0; i <= 49; i++ ) {
		// if (Character.Attributes[i].score == '') break;
		// rbm.log('6 reNum:', i, Character.Attributes[i])
	// }
	
	var Resultvalue = 0;
	
	for (var l = 0; l <= 49; l++) {
		if (Character.Attributes[l].score == '') break;
		Resultvalue = Resultvalue + Character.Attributes[l].Value * Math.pow(10,l);
	}
	
	return Resultvalue
}

function num_Recognition2(x1, y1, x2, y2, siml, numstr) {    //數字辨識-測試function
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
		rbm.keepScreenshotPartial(x1, y1, x2, y2);
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
					// console.log('j:', Character.Attributes[j].No, 'k:', Character.Attributes[k].No, 'errckDv:', errckDv, 'errckX1:', errckX1, 'errckX2:', errckX2, 'errcksc1:', errcksc1, 'errcksc2:', errcksc2)
					
					if (errckDv > 13 || errcksc2 == '') break
					
					if (errckDv <= 13) {
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
						// console.log('clear 1:', Character.Attributes[clear].No, j, k, errcksc1, errcksc2, errckval1, errckval2);
						
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
		// console.log('');
		// for (var i = 0; i <= 49; i++ ) {
		// 	if (Character.Attributes[i].score == '') break;
		// 	rbm.log('6 reNum:', i, Character.Attributes[i])
		// }
		
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

function tapFor(intX, intY, taptimes, pushtime, sleeptime){ //單點，多次連續點擊, taptimes:點擊次數, pushtime:按住時間, sleeptime:點擊間隔
	for (var i = 0; i < taptimes; i++){
		if (!config.isRunning) return false;
		
		tap(intX, intY, pushtime);
		sleep(sleeptime);
	}
}

function ScreenStopTimes(intX, intY, finX, finY, str, Timer) {  //Return stop times
	if (!config.isRunning ) return false;
	if (checkScreenTimer != undefined && Date.now() < checkScreenTimer) return false;

	//rbm.screencrop('checkSCstop.png', 670, 160, 720, 220)
	rbm.keepScreenshotPartial(intX, intY, finX, finY);  //關卡圖，比對是否卡關
	var targetImg = rbm.imageExists( str, 0.90)
	rbm.releaseScreenshot();
	console.log('SC targetImg: ', targetImg)
	
	if (targetImg == undefined) {
		rbm.screencrop( str, intX, intY, finX, finY)
		ScreenErrorTime1 = Date.now()
		ScreenErrorTime2 = Date.now() - ScreenErrorTime1
		
		console.log('ScStTi : No 1st picture : Crop it', ScreenErrorTime2/1000, 'sec');
	}
	else if (targetImg != undefined && targetImg) {
		ScreenErrorTime2 = Date.now() - ScreenErrorTime1
		console.log('ScStTi : creen is stop !! ', ScreenErrorTime2/1000, 'sec');
		
	}
	else if (targetImg != undefined && !targetImg){
		rbm.screencrop( str, intX, intY, finX, finY)
		ScreenErrorTime1 = Date.now()
		ScreenErrorTime2 = Date.now() - ScreenErrorTime1

		console.log('ScStTi : Screen is change !', ScreenErrorTime2/1000, 'sec');
	}
	
	checkScreenTimer = Date.now() + Timer * 1000
	
	return ScreenErrorTime2 / 1000
}

function usingTimeString(startTime) {
  return '循環時間：' + (Date.now() - startTime) + 'ms';
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
// Date.prototype.Format = function (fmt) {  
//     var o = {
//         "M+": this.getMonth() + 1, //月份 
//         "d+": this.getDate(), //日 
//         "h+": this.getHours(), //小时 
//         "m+": this.getMinutes(), //分 
//         "s+": this.getSeconds(), //秒 
//         "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
//         "S": this.getMilliseconds() //毫秒 
//     };
//     if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//     for (var k in o)
//     if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//     return fmt;
// }


//==============================選單function=====================================//

function choiceMenu(page, listtype){    //切換頁面   page: 0:技能頁面  1:主角  2: 英雄  3:裝備  4:寵物  5:神器  6:商城 ； listtype: 0:不變  1:短  2:長
	if (!config.isRunning) return false;
	if (checkReturn(9)) { return false; }
	//if (checkReturn(9)) { console.log('有 AD_watch，跳出切換檢查'); return false; }
	//console.log('切換頁面-檢查')
	
	Tag_Manu:
	for (var j = 1; j <= 1; j++){
		rbm.keepScreenshotPartial(0, 1237, 720, 1280);  //出現確認按鈕跳出檢查
		for (var i = 1; i <= 6; i++){
			if (!config.isRunning) return false;
			
			//console.log('檢查:','TT2_menu_' + i + '.png')
			var targetImg2 = rbm.imageExists('TT2_menu_' + i + '.png', 0.95);
			if ( targetImg2 ){
				//console.log('切換頁面-可點擊')
				rbm.releaseScreenshot();
				break Tag_Manu;
			}
			
			//console.log('檢查:','TT2_menu_dark_' + i + '.png')
			var targetImg1 = rbm.imageExists('TT2_menu_dark_' + i + '.png', 0.95);
			if ( targetImg1 ){
				if ( j == 1 ){
					debug(0);					
				}
				
				if ( j == 2 ){
					rbm.releaseScreenshot();
					debug(0);
					console.log('切換頁面-不可點擊')
					return false;
				}
			}
		}
		rbm.releaseScreenshot();
	}
	
	for (var i = 1; i < 3; i++){
		if (!config.isRunning) return false;
		
		if ( page > 0  ){
			rbm.keepScreenshotPartial(0, 1237, 720, 1280);  //切換指定頁面
			rbm.imageClick('TT2_menu_' + page + '.png', 0.95);
			rbm.releaseScreenshot();
			
			if (listtype == 1) {
				sleep(400);
				rbm.keepScreenshotPartial( 555, 690, 600, 730);  //切換指定頁面
				if (rbm.imageExists('listtolong.png', 0.90)) {
					rbm.releaseScreenshot();
					//console.log('已切換到 shortlist')
					return false;
					//break;
				}
				else {
					rbm.keepScreenshotPartial( 555,   5, 600,  35);  //切換指定頁面
					rbm.imageClick('listtoshort.png', 0.90);
					rbm.releaseScreenshot();
					//console.log('切換到 shortlist')
				}
			}
			else if (listtype == 2) {
				sleep(400);
				rbm.keepScreenshotPartial( 555,   5, 600,  35);  //切換指定頁面
				if (rbm.imageExists('listtoshort.png', 0.90)) {
					rbm.releaseScreenshot();
					//console.log('已切換到 longlist')
					return false;
					//break;
				}
				else {
					rbm.keepScreenshotPartial( 555, 690, 600, 730);  //切換指定頁面
					rbm.imageClick('listtolong.png', 0.90);
					rbm.releaseScreenshot();
					//console.log('切換到 longlist')
				}
			}
		}
		
		if ( page == 0 ){
			sleep(400);
			if ( checkReturn(1) || checkReturn(8) || checkReturn(9)) break;
			
			rbm.keepScreenshotPartial( 650, 690, 690, 730);  //short list X
			rbm.imageClick('TT2_menu_' + page + '.png', 0.90);
			rbm.releaseScreenshot();
			
			rbm.keepScreenshotPartial( 650,   5, 690,  35);  //long list X
			rbm.imageClick('TT2_menu_' + page + '.png', 0.90);
			rbm.releaseScreenshot();
			
			debug()
			//sleep(400)
			//if (!checkReturn(1)) tap(50, 1250, 50); 
			//console.log(checkReturn(1), 'page = 0, 切換畫面檢查 =', i);
		}
		
		sleep(200);
		//console.log('切換', page, '畫面檢查 =', i);
	}
}

function buyMode(modef) {               //切換加級數量   1:x1， 2:x10，3:x100，4:xMAX
	if (!config.isRunning) return false;

	var buyModearray = new Array( '', 'x1', 'x10', 'x100', 'xMax');
	var buyXYarray = new Array( '', 430, 305, 185, 60);	
	
	//console.log('升級數量切換');

	for (var i = 0; i < 2; i++) {
		rbm.keepScreenshotPartial(535, 90, 675, 130);  //確認看廣告按鈕
		var targetImg1 = rbm.imageExists('BUY_STR.png', 0.95);
		if (targetImg1) {
			var targetImg2 = rbm.imageExists('BUY_' + buyModearray[modef] +'.png', 0.95);
			if (!targetImg2) {
				tap(550, 110); sleep(300);
				tap(buyXYarray[modef], 110); sleep(500);
				//console.log(i, '升級數量切換 -', buyModearray[modef]);
			}
			if ( targetImg2) {
				//console.log(i, '升級數量已是 -', buyModearray[modef]);
				break;
			}
		}
		else {
			console.log('沒有找到選單')
		}
	}
	rbm.releaseScreenshot();
}

function checkReturn(choiceF){          //各項回授點檢查 
	if (!config.isRunning) return false;
	//console.log('各項升級限制條件');
	
	switch (choiceF) {
		case  1: return CheckImageTap( 80,  990, 260, 1030, 0.90, 'Attackdam.png',    1, 1, 1, 50, 2);   //確認大技畫面，Attack Damage
		case  2: return CheckImageTap( 55,  710, 315,  740, 0.90, 'reduceGold80.png', 1, 1, 1, 50, 2);   //Reduce Gold Cost 90%
		case  3: return CheckImageTap( 10,  160, 105,  250, 0.90, 'icon_master1.png', 1, 1, 1, 50, 2);   //swordmastericon1
		case  4: return CheckImageTap( 10,  160, 105,  250, 0.90, 'icon_master2.png', 1, 1, 1, 50, 2);   //swordmastericon2
		
		case  5: return CheckImageTap(170,   75, 225,  135, 0.90, 'icon_stats.png',   1, 1, 1, 50, 2);   //hero stats
		case  6: return CheckImageTap(105,  160, 175, 1165, 0.90, 'hero_Maya.png',    1, 1, 1, 50, 2);   //hero name maya (all screen) 
		case  7: return CheckImageTap(105, 1130, 175, 1165, 0.90, 'hero_Maya.png',    1, 1, 1, 50, 2);   //hero name maya (bottom)
		
		case  8: return CheckImageTap(230,  900, 490, 1030, 0.90, 'ADcollect.png',    1, 1, 1, 50, 2);   //領取廣告 buffer
		case  9: return CheckImageTap(390,  900, 660, 1100, 0.90, 'ADwatch.png',      1, 1, 1, 50, 2);   //確認看廣告按鈕
		case 10: return CheckImageTap(390,  900, 660, 1100, 0.90, 'ADwatch_dark.png', 1, 1, 1, 50, 2);   //確認看廣告按鈕 暗的
		
		case 11: return CheckImageTap(175,   90, 205,  130, 0.90, 'bossHPicon.png',   1, 1, 1, 50, 2);   //確認打boss中
		case 12: return CheckImageTap(300,  400, 420,  460, 0.90, 'quitBOX_dark.png', 1, 1, 1, 50, 2);   //退出視窗
		case 13: return CheckImageTap(395,   75, 430,  125, 0.90, 'icon_Inbox.png',   1, 1, 1, 50, 2);   //大師畫面 Inbox
		case 14: return CheckImageTap(175,   90, 205,  130, 0.90, 'bossHPicon2.png',  1, 1, 1, 50, 2);   //確認打boss2中
		
		case 15: return CheckImageTap( 25, 1140,  90, 1210, 0.90, 'icon_prest.png',   1, 1, 1, 50, 2);   //prestige icon
		
		case 16: return CheckImageTap(650,   20, 715,   90, 0.93, 'buttleftboss.png',  1, 1, 1, 50, 2);  //leftboss button
		case 17: return CheckImageTap(650,   20, 715,   90, 0.93, 'buttfightboss.png', 1, 1, 1, 50, 2);  //fightboss button
		case 18: return CheckImageTap( 20,   45, 270,   75, 0.93, 'strheroDPS.png', 1, 1, 1, 50, 2);     //strheroDPS
		
		case 19: return CheckImageTap(540,  160, 670, 1165, 0.93, 'heromaxlv.png', 1, 1, 1, 50, 2);      //heromaxlv
		
		case 20: return CheckImageTap( 20,   45, 270,   75, 0.93, 'strTapdamage.png', 1, 1, 1, 50, 2);   //strTapdamage
		
		
		case 21: return CheckImageTap( 45,   95,  90,  135, 0.93, 'icon_salvager.png', 1, 1, 1, 50, 2);   //artifact:icon_salvager
		case 22: return CheckImageTap(105,  160, 310, 1165, 0.93, 'artifactsBS.png', 1, 1, 1, 50, 2);     //artifact:Book of Shadows
		
		case 23: return CheckImageTap(290,  400, 440,  470, 0.90, 'clanbossfightbox.png', 1, 1, 1, 50, 2)  //ClanBoss 戰鬥對話框
		case 24: return CheckImageTap(430, 1125, 500, 1160, 0.90, 'diamon5.png', 1, 1, 1, 50, 2)  //ClanBoss 花5鑽 戰鬥鈕
		
		
		
		
	}
	//確認大技畫面，寵物圖示( 10, 850, 80, 920)，Pet Damage( 80, 890, 220, 930)，Attack Damage( 80, 990, 260, 1030)
}

function recoNumgroup(choiceF) {        //各項數字辨識
	if (!config.isRunning) return false;
	//console.log('各項數字辨識');
	
	switch (choiceF) {
		case  1: return	num_Recognition(139, 189, 212, 205, 0.9, 'num_lv_blue_'); break;  //Master LvupNum blue Recognition
		case  2: return num_Recognition(139, 300, 212, 316, 0.9, 'num_lv_blue_'); break;  //Heros LvupNum blue Recognition
		case  3: return num_Recognition(655,  50, 720,  68, 0.9, 'num_gold_'); break;     //Master/Heros list gold Recognition
		case  4: return '';
		case  5: return '';
		case  6: return '';
		case  7: return '';
		case  8: return '';
		case  9: return num_Recognition2(328,  60, 390,  79, 0.75, 'Stage_Num/stage_num_3_'); break;
		
	}
}

//==============================遊戲function=====================================//

function tapMain(times, taptimes){      //主畫面點擊確認，大技頁面動作
	if (!config.isRunning) return false;
	//console.log('主畫面點擊，大技頁面')
	
	if (!checkReturn(1)) { choiceMenu(0, 0); }
	for (var i = 1; i <= times; i++){
		if (!config.isRunning) return false;
		
		//console.log( '9999', '0:', Date.now() - MasterLvUpTimer, Date.now() - HerosLvfstTimer, Date.now() - HerosLvUpTimer);
		//console.log( '9999', '1:', checkReturn(1));		
		//console.log( '9999', '2:',  Date.now() < MasterLvUpTimer, Date.now() < HerosLvfstTimer, Date.now() < HerosLvUpTimer );
		//console.log( '9999', '3:',  bossprestige < SwBossPrs, pregold < SwPrgolds);
	
		if ( checkReturn(1) && Date.now() < MasterLvUpTimer  && Date.now() < HerosLvfstTimer && Date.now() < HerosLvUpTimer && bossprestige < SwBossPrs && pregold < SwPrgolds) {
			for (var j = 1; j <= 3; j++) {
				if (ctrlFairyADcode != '00000') tapFor(360, 280, taptimes/3, 50, 50); //確認大技畫面，連續點擊
				if (ctrlFairyADcode == '00000') tapFor(360, 590, taptimes/3, 50, 50); //確認大技畫面，連續點擊
				tapSkillHS(ctrlSkillcode);
			}
			tapFor(270, 630, 3, 50, 50);
			tapFor(420, 630, 3, 50, 50);
		}
		else {
			if ( Date.now() < HerosLvfstTimer || Date.now() < HerosLvUpTimer) { var strlog = '英雄升級優先' }
			else if ( Date.now() < MasterLvUpTimer ) { var strlog = '大師二升級優先' }
			else if ( bossprestige >= SwBossPrs || pregold >= SwPrgolds ) {	var strlog = '卡關/金幣蛻變優先'; }
			
			console.log('不點擊', strlog);
			bossbreak(SwBossReT, 3);
			checkAD(ctrlFairyADcode);
			return false;
		}
		
		bossbreak(SwBossReT, 3);
		checkAD(ctrlFairyADcode);
		tapSkill(ctrlSkillcode);
		
	}
}

function tapSkill(ctrlCode){            //大技施放控制  (20,1105)~(700,1165) , ctrlCode:字串格式6位
	if (!config.isRunning || ctrlCode == '000000') return false;
	//console.log('大技施放控制-檢查');
	
	if ( checkReturn(1) ) {
		//var skilljump = ctrlCode
		rbm.keepScreenshotPartial( 140, 1105, 700, 1165);  //確認技能可以按。
		for (var i = 2; i <= 6; i++){
			if (!config.isRunning) break;
			
			var skilljump = ctrlCode.substr(i - 1, 1)
			if ( skilljump == 1 ){
				rbm.imageClick('mainSkill_' + i + '.png', 0.95);
				rbm.imageClick('mainSkill_' + i + '.png', 0.95);
			}
			
			//console.log( 'i=', i, '; skilljump=', skilljump);
		}
		rbm.releaseScreenshot();
	}
	if (!checkReturn(1)) { choiceMenu(0, 0); }
}

function tapSkillHS(ctrlCode){          //第一，大技施放控制  (20,1105)~(100,1165) , ctrlCode:字串格式1位
	if (!config.isRunning || ctrlCode == '000000') return false;
	//console.log('大技施放控制-檢查');
	
	if ( checkReturn(1) ) {
		//var skilljump = ctrlCode
		rbm.keepScreenshotPartial( 20, 1105, 100, 1165);  //確認技能可以按。
		for (var i = 1; i <= 1; i++){
			if (!config.isRunning) break;
			
			var skilljump = ctrlCode.substr(i - 1, 1)
			if ( skilljump == 1 ){
				rbm.imageClick('mainSkill_' + i + '.png', 0.95);
				rbm.imageClick('mainSkill_' + i + '.png', 0.95);
			}
			
			//console.log( 'i=', i, '; skilljump=', skilljump);
		}
		rbm.releaseScreenshot();
	}
	if (!checkReturn(1)) { choiceMenu(0, 0); }
}

function checkAD(ctrlCode){             //確認是否出現看廣告  ctrlCode:字串格式5位  鑽石/金幣/全技/80趴/回MP
	if (!config.isRunning) return false;
	//console.log('自動看廣告-檢查')
	var ADbufftype = new Array('', '鑽石', '金幣', '全技', '90趴', '回MP')


	if (ctrlFairyADcode == '00000') {	
		CheckImageTap(90, 970, 300, 1030, 0.90, 'ADNoThanks.png', 1, 1, 1, 50, 1);   //領取廣告 NoThanks
		return false;
	}
	
	if (checkReturn(9)) {
		if (ctrlCode == '11111'){
			tapFor(540, 950, 2, 50, 100)
		}
		else {
			
			//console.log('自動看廣告-檢查  checkReturn(9)')
			//var fairyADjump = ctrlCode
			rbm.keepScreenshotPartial( 355, 535, 445, 685);  //確認
			for (var i = 1; i <= 5; i++){
				if (!config.isRunning) break;
				
				
				fairyADjump = ctrlCode.substr(i - 1, 1)
				if ( fairyADjump == 1 ){
					
					if (i == 2 && nowgold < SwFaADGD ){
						console.log('金幣未達', SwFaADGD, ' 不收金幣')
					}
					else {
						targetImg2 = rbm.imageExists('fairyADbuffer_' + i + '.png', 0.97);
						if (targetImg2) {
							console.log('看廣告，拿【', ADbufftype[i],'】buffer');
							tapFor(540, 950, 2, 50, 100)
								
							AD_watch(45);
						
							if (i == 2) {
								MasterLvUpTimer = Date.now() +  30 * 1000;
								HerosLvUpTimer  = Date.now() +   5 * 1000;
								//HerosLvUp(SwHeroLvLm, SwHeroTm);    //英雄升級
								console.log('看完領金幣廣告，英雄升級 10秒後');
							}
							else if (i == 4) {
								MasterLvUpTimer = Date.now() +  65 * 1000;
								HerosLvUpTimer  = 0;
								console.log('看完80趴，英雄升級時間歸 0');
							}
							debug(0);
							break;
						}
					}
				}
				//else if (fairyADjump == 0) {
				if (i == 5) {
					//console.log('fairyADjump == 0, tap 180, 990');
					tapFor(180, 950, 2, 100, 50);
					//console.log('fairyADjump == 0, tap 180, 940');
					tapFor(180, 900, 2, 100, 50);
				}
				//console.log( 'i=', i, '; fairyADjump=', fairyADjump);
			}
			rbm.releaseScreenshot();
		}
		
		//console.log('ADwatch.png');
	}
}

function AD_watch(ADtimer) {            //看廣告等待檢查 ADtimer:看廣告檢查時間
	if (!config.isRunning || swVIP ) return false;

	console.log('看廣告等待')
	
	for (var i = 0; i < ADtimer + 20; i++) {
		if (!config.isRunning) return false;
		
		if (i > 10 && i < ADtimer) {
			//keycode('BACK', 40);	
		}
		else if (i ==  ADtimer) {
			console.log('廣告觀看計時 = ' + i, '回桌面，再回遊戲，切廣告')
			keycode('HOME', 300); sleep(5000);
			rbm.startApp(config.PackangName,config.LaunchActivityName);
			sleep(3000);
		}
		
		var sizeObj = getScreenSize();
		if (i > 10 && sizeObj.width == 720){
			var checkBreak1 = CheckImageTap(300, 400, 420,  460, 0.98, 'quitBOX.png', 180, 840, 1, 100, 2);
			if (checkBreak1) { tap(180, 840, 50);}
			
			var checkBreak2 = CheckImageTap(230, 960, 490, 1030, 0.98, 'ADcollect.png', 1, 1, 1, 100, 2);
			if (checkBreak2) { tap(360, 950, 50); break;}
			
			if (checkReturn(12)) {
				for (var j = 0; j < 30; j++) {
					if (!config.isRunning) return false;
					
					sleep(1000);
					var sizeObj = getScreenSize();
					//console.log('廣告觀看計時 = ' + i, '網路延時 = ' + j);
					
					if (sizeObj.width == 1280) break;
					if (sizeObj.width == 720) {
						if (!checkReturn(12)) break;
					}
				}
			}
		}
		
		sleep(1000)
		//console.log('廣告觀看計時 = ' + i);
	}
}

function MasterLvUp(MaxLvup, Timer){    //劍術大師升級
	//console.log('8888');
	if (!config.isRunning || !SwMastSw || Date.now() < MasterLvUpTimer) return false;
	//if ( checkReturn(11) || checkReturn(14)) return false;
	if ( SwMastLvRu && !checkReturn(2)) { console.log('Master-no90%', SwMastLvRu, checkReturn(2)); return false;}
	if (HerosLvUpTimer <= 5) return false;
	console.log('劍術大師升級');
	
	var buyModearray = new Array( '', 'x1', 'x10', 'x100', 'xMax');
	
	//usePerks(swRaintms, 0)
	choiceMenu(1, 2); sleep(300);
	for (var i = 0; i < 14; i++) {
		if (!config.isRunning) return false;
		
		if (checkReturn(20)) {
			if ( checkReturn(13)) {
				buyMode(4);	//sleep(300);
				
				SkillLvUp(1);
				
				MasterLv = recoNumgroup(1)
				
				if (MasterLv < MaxLvup) {
					console.log('劍術大師，Lv:', MasterLv, '<', MaxLvup, '，進行升級');
					tapFor(695, 190, 3, 100, 150)
					sleep(500);
					MasterLv = recoNumgroup(1)
				}
				else {
					console.log('劍術大師，Lv:', MasterLv, '>', MaxLvup, '，不升級');
				}
				
				//sleep(300);
				SkillLvUp(0);
				//Daily(1000);
				
				if (!checkReturn(20)) {
					console.log('沒有 Tap Damge，等待5秒');
					sleep(5000);
					
					if (!checkReturn(20)) { console.log('還是沒有 Tap Damge，跳出 Master Lvup'); return false; }
				}
				
				MasterLvUpTimer = Date.now() + Timer * 1000
				break;
			}
			if (!checkReturn(3)) {
				DIY_swipe(710, 190, 710, 690, 40, 400);
			}
		}
		else {
			sleep(200)
		}
	}
}

function SkillLvUp(clearF){                   //大技升級
	if (!config.isRunning || checkReturn(11)) return false;
	console.log('大技升級');
	var buyModearray = new Array( '', 'unlockskill.png', 'upgradex1.png')
	
	if ( checkReturn(13)) {
		for (var k = 1; k <= 2; k++) {
			if (MasterLvUpTimer == 0 || clearF == 1) {
				for (var l = 0; l < 6; l++){
					var tapy = 343 + l * 113
					tapFor(690, tapy, 1, 40, 60); 
				}
			}
			
			for (var j = 0; j < 5; j++) {
				if (!config.isRunning) return false;
				
				rbm.keepScreenshotPartial( 500, 300, 700, 1000);  //確認升級按鈕等級顯示
				var results = rbm.findImages(buyModearray[k], 0.85, 6, false, false);
				rbm.releaseScreenshot();
				
				if (results == '') break;
				
				results = results.sort(function (a, b) {
					return a.y < b.y ? 1 : -1;
				});	
				
				for (var index in results) {
					if (!config.isRunning) return false;
					var result = results[index];
					
					var x0 = 695;	
					var y0 = result.y + 10;
					
					for (var m = 1; m <= 10; m++){
						//console.log('k:', k, ', m:', m, ', x:', x0, ', y:', y0, ', color898989:', checkPointcolor(x0, y0, 20, '898989'));
						var check = checkPointcolor(x0, y0, 20, '898989');
						if (!check) { tapFor(x0, y0, 4, 50, 60); }  //console.log('check:false to tap');
						else if ( check) { break; }
					}
				}
			}
		}			
	}
}

function Daily(Timer) {                //每日任務獎勵
	if (!config.isRunning || Date.now() < DailyTimer) return false;
	console.log('每日任務獎勵');
	
	for (var i = 1; i <= 10; i++) {
		CheckImageTap(285, 80, 315, 110, 0.90, 'icon_achieve.png', 1, 1, 1, 50, 1);        //領取任務獎勵icon
		
		rbm.keepScreenshotPartial( 180, 240, 250, 280);  //確認daily_achie畫面
		var targetImg1 = rbm.imageExists('daily_achie.png', 0.95)
		rbm.releaseScreenshot();
		if (targetImg1) {
			
			CheckImageTap(510, 280, 630, 330, 0.90, 'collect.png', 1, 1, 3, 100, 1);
			
			rbm.keepScreenshotPartial( 480, 260, 655, 325);  //確認領取每日任務獎勵
			var targetImg2 = rbm.imageExists('complete.png', 0.95)
			if (!targetImg2) { var targetImg3 = rbm.imageExists('daily_reward.png', 0.95) }
			rbm.releaseScreenshot();
			if (targetImg2 || targetImg3) {
				tapFor(640, 79, 3, 50, 100);
				break;
			}
		}
		
		sleep(200);
	}
	
	DailyTimer = Date.now() + Timer * 1000
}

function HerosLvUp(oneMaxLv, Timer1, Timer2){    //英雄升級
	//console.log('hero 1111');
	if (!config.isRunning || !SwHeroSw ) return false;  
	
	//console.log('hero 2222'); 
	//console.log('hero 2222', Date.now() - HerosLvfstTimer, Date.now() - HerosLvUpTimer);
	if (Date.now() < HerosLvfstTimer && Date.now() < HerosLvUpTimer) { return false; }    //console.log('Hr2222', Date.now() - HerosLvfstTimer, Date.now() - HerosLvUpTimer);

	
	//console.log('hero 4444');
	if ( SwHeroLvRu && !checkReturn(2) && HerosLvUpTimer != 1) { console.log('Heros-no90%', SwHeroLvRu, checkReturn(2)); return false;}
	console.log('英雄升級');

	var heronew = 0;
	var heromaya = 0;
	
	strfilename = 'all_lvup_'
	var imagenamearray  = new Array(  '', 'yellow.png', 'orange.png', 'yellow.png');
	var thresholdarray  = new Array(  '',         0.85,         0.85,         0.85);
	var checkcolorarray = new Array(  '',     'F7A308',     'EF6E14',     'F7A308');
	var lvuptimesarray  = new Array(  '',            1,            1,            4);
	
	//usePerks(swRaintms, 0)
	choiceMenu(2, 2); sleep(500);
		
	for (var i = 0; i < 5; i++) {
		if (!config.isRunning) return false;
		//if (!checkReturn(18)) { console.log('沒有Hero DPS，跳出Hero Lvup'); return false;}
		
		if (!checkReturn(18)) {
			console.log('沒有 Hero DPS，等待5秒');
			sleep(6000);
			
			if (!checkReturn(18)) { console.log('還是沒有 Hero DPS，跳出 Hero Lvup'); return false; }
		}
		
		console.log('Return5:', checkReturn(5));
		if ( checkReturn(5)) {
			buyMode(4);	sleep(400);
			
			for (var j = 0; j < 4; j++) {
				if (!checkPointcolor(690, 220 + j * 114, 20, '898989')) { tapFor(690, 220 + j * 114, 2, 50, 80); }
			}
			
			goldcheck();
	
			HerosLvfstTimer = Date.now() + Timer1 * 1000
			if ( Date.now() < HerosLvUpTimer && HerosLvUpTimer != 1)  { console.log('Tap Over : Fist 3 Heros Lvup Only'); return false; }
			
			HerosLvfstTimer = Date.now() + Timer1 * 1000
			break;
		}
		else if (!checkReturn(5)) {
			DIY_swipe(710, 190, 710, 690, 25, 400);
		}
	}

	rbm.keepScreenshotPartial( 205, 1245, 240, 1265);  //確認NewHerolvup
	var targetImg2 = rbm.imageExists('NewHerolvup.png', 0.95)
	rbm.releaseScreenshot();
	if (targetImg2) { heronew = 1; }
	
	//console.log('111  heronoew =', heronew);
	
	if (Date.now() < HerosLvUpTimer && heronew != 1 ) { console.log('Othe Page - Fist 3 Heros Lvup Only'); return false; }

	for (var i = 0; i < 5; i++) {
		if (!config.isRunning) return false;
		//if (!checkReturn(18)) { console.log('沒有Hero DPS，跳出Hero Lvup'); return false;}

		if (!checkReturn(18)) {
			console.log('沒有 Hero DPS，等待5秒');
			sleep(6000);
			
			if (!checkReturn(18)) { console.log('還是沒有 Hero DPS，跳出 Hero Lvup'); return false; }
		}
				
		if (checkReturn(19) && heronew == 0 ) {
			var heromaxlvv = 1;
			if (i > 0) { sleep(1500); }
			console.log('找到 Hero Max Level');
			break;
		}
		else if ((checkReturn(5) && !checkReturn(6)) || (!checkReturn(5) && !checkReturn(7)) || i < 3 ) {
			DIY_swipe(710, 690, 710, 190, 25, 400);
		}
		else if ((checkReturn(5) && checkReturn(6)) || checkReturn(7)) {
			var heromaya = 1; sleep(1500);
			console.log('找到 Maya');
			break;
		}
		if (i == 5) {
			var heromaya = 1; sleep(1500);
			console.log('沒找到 Maya 也升級');
			break;
		}
	}
	
	if ( heromaya == 1 || heromaxlvv == 1 || heronew == 1 ) {
		for (var j = 1; j <= 14; j++) {
			for (var k = 1; k <= 3; k++) {
				for (var l = 1; l <= 2; l++) {
					if (!config.isRunning) return false;
					//if (!checkReturn(18)) { console.log('沒有Hero DPS，跳出Hero Lvup'); return false; }

					if (!checkReturn(18)) {
						console.log('沒有 Hero DPS，等待6秒');
						sleep(6000);
						
						if (!checkReturn(18)) { console.log('還是沒有 Hero DPS，跳出 Hero Lvup'); return false; }
					}
							
					//rbm.keepScreenshotPartial( 480, 150, 710, 1140);  //確認升級按鈕等級顯示 全y:1200  第2格y: 370
					
					rbm.keepScreenshotPartial( 690, 75, 715, 1215);  //確認升級按鈕等級顯示 全y:1200  第2格y: 370
					var results = rbm.findImages(strfilename + imagenamearray[k], thresholdarray[k], 10, true, false);
					rbm.releaseScreenshot();
					
					if (results == '')  break;

					results = results.sort(function (a, b) {
						return a.y < b.y ? 1 : -1;
					});								

					for (var index in results) {
						if (!config.isRunning) return false;
						var result = results[index];
						//rbm.log('k:', k, result);
						
						var x0 = 695;
						var y0 = result.y + 15;
						
						if ( k == 3 && checkPointcolor(x0, y0, 40, checkcolorarray[k])) {
							for (var m = 1; m <= 3; m++){
								if (!config.isRunning) return false;
								
								//console.log('l:', l, ', k:', k, ', m:', m, ', x:', x0, ', y:', y0, checkcolorarray[k] + ':', checkPointcolor(x0, y0, 20, checkcolorarray[k]), ', 898989:', checkPointcolor(x0, y0, 20, '898989'));
								var check = checkPointcolor(x0, y0, 20, '898989');
								if (!check) { tapFor(x0, y0, lvuptimesarray[k], 50, 60); }     //console.log('check:false to tap'); 
								else if ( check) { break; }                                    //console.log('check:true to break');
							}
						}
						else {
							tap(x0, y0, 50); sleep(80);
						}
					}
					//sleep(300);
				}
			}
			
			HerosLvfstTimer = Date.now() + Timer1 * 1000
			HerosLvUpTimer  = Date.now() + Timer2 * 1000
			if ( checkReturn(5)) break;
			DIY_swipe(710, 350, 710, 750, 25, 1500);
		}
	}	
}
 
function goldcheck() {
	if (!config.isRunning) return false;
	
	nowgold = recoNumgroup(3)
	//if ( nowgold > maxgold) { maxgold = nowgold; }
	if ( nowgold >= SwPrgolds) {	pregold = pregold + 1; }
	else { pregold = 0; }
	
	console.log('金轉: ', nowgold, '/', SwPrgolds, '; 次數:', pregold, '/', SwPrgoldT);
 }

function bossbreak(keepTimer, Timer) {  //BOSS 卡關判斷
	if (!config.isRunning || Date.now() < bossbkTimer[0]) return false;
	
	if ( checkReturn(1)) {
		rbm.keepScreenshotPartial( 640, 20, 715, 95);  //確認打boss按鈕
		var targetImg1 = rbm.imageExists('fightboss.png', 0.97)
		rbm.releaseScreenshot();
		if (targetImg1) {
			bossbkTimer[2] = ( Date.now() - bossbkTimer[1] ) / 1000;
			//console.log('bossbkTimer[2] = ', bossbkTimer[2], keepTimer,'bossbkTimer[1] =', bossbkTimer[1]);
			if (bossbkTimer[2] > keepTimer) {
				tap(700, 50, 100);
				bossbkTimer[2] = 0;
			}
		}
		else {
			bossbkTimer[1] = Date.now()
		}
		
		if (checkReturn(16)) { bossbkTimer[3] = Date.now();	}
		else { bossbkTimer[5] = bossbkTimer[3] }
		
		if (bossbkTimer[3] != 0 && checkReturn(17)) bossbkTimer[4] = Date.now();
		//console.log('1-Tm3:', bossbkTimer[3], '; Tm4:', bossbkTimer[4], '; Tm5:', bossbkTimer[5], '; Tm6:', bossbkTimer[6], '; bsNG:', bossprestige, '/', SwBossPrs)
		
		if (bossbkTimer[4] != 0 && bossbkTimer[3] != 0) {
			if (bossbkTimer[4] - bossbkTimer[3] <= 10 * 1000 && SwPrestig != 0 && nowgold >= SwBossGd ) {
				
				
				//rbm.screencrop('stagecheck1.png', 338, 22, 390, 82)
				rbm.keepScreenshotPartial( 325, 20, 395, 85);  //關卡圖，比對是否卡關
				var targetImg1 = rbm.imageExists('stagecheck1.png', 0.90)
				rbm.releaseScreenshot();
				if (targetImg1) {
					
					bossprestige = bossprestige + 1
					console.log('boss打不過、關卡圖不變、判定卡關')
					//MasterLvUpTimer = Date.now() +  0 * 1000;
				}
				else {
					bossprestige = 0;
					rbm.screencrop('stagecheck1.png', 330, 22, 390, 82)
					console.log('boss打不過、關卡圖有變、判定不卡關')
				}
				
				MasterLvUpTimer = 0;
				HerosLvUpTimer  = 0;
				HerosLvfstTimer  = 0;
				console.log('打不過了', MasterLvUpTimer, HerosLvUpTimer, HerosLvfstTimer)
			}
			bossbkTimer[3] = 0; bossbkTimer[4] = 0;
		}
		if (MasterLv >= 500) {
			if (bossprestige > 0) {
				//console.log('2-Tm3:', bossbkTimer[3], '; Tm4:', bossbkTimer[4], '; Tm5:', bossbkTimer[5], '; Tm6:', bossbkTimer[6], '; bsNG:', bossprestige, '/', SwBossPrs)
				
				if (bossprestige >= SwBossPrs ) {
					console.log('3-卡關次數:', bossprestige, '>= ', SwBossPrs, '; 觸發轉生');
					
					sleep(2000);
					prestige();
				}

				else {
					console.log('2-卡關次數:', bossprestige, '/', SwBossPrs)
				}
			}
			if ( pregold >= SwPrgoldT ) {
				console.log('4-金幣蛻變:', nowgold, '/', SwPrgolds, '; 次數:', pregold, '/', SwPrgoldT);
				
				sleep(2000);
				prestige();
			}
		}
		else {
			console.log('大師等級', MasterLv, '不到 500，不檢查轉生');
		}
	}
	
	if (!SwPrestig) { bossprestige = 0; }
	
	rbm.keepScreenshotPartial( 205, 1245, 240, 1265);  //確認NewHerolvup
	var targetImg2 = rbm.imageExists('NewHerolvup.png', 0.95)
	rbm.releaseScreenshot();
	if (targetImg2) {
		MasterLvUpTimer = 0;
		HerosLvfstTimer = 0;
		HerosLvUpTimer  = 1;
		
		console.log('有新英雄,英雄升級時間歸 0');
	}
	
	if (checkReturn(1)) {
		rbm.keepScreenshotPartial( 15, 1155, 105, 1280);  //確認轉生完成，無大技
		var targetImg = rbm.imageExists('allskillnon3.png', 0.95)
		//rbm.log('allskillnon3:', rbm.findImage('allskillnon3.png', 0.50));
		rbm.releaseScreenshot();
		
		if (targetImg) { 
			console.log('無大技，大師 Time = 0'); 
			MasterLvUpTimer = 0;
		}
	}
	
	//console.log('bossbkTimer[2]:', bossbkTimer[2])
	bossbkTimer[0]  = Date.now() + Timer * 1000;
}

function prestige(){                    //轉生
	if (!config.isRunning || !SwPrestig ) return false;
	console.log('條件到達轉生');
	
	MasterLvUpTimer = 0;
	HerosLvUpTimer  = 1;
	ArtifactTimer = Date.now() + 5 * 1000
	
	choiceMenu(1, 1); sleep(300);
	choiceMenu(1, 1); sleep(300);
	for (var i = 0; i < 10; i++) {
		if ( checkReturn(15)) {
			for (var j = 0; j < 15; j++) {
				if (!config.isRunning) return false;
				
				if (SwPrSaScr) {
					sleep(1000);
					rbm.keepScreenshotPartial( 55, 630, 135, 700);  //確認第二次轉生按鈕畫面
					var targetImg1 = rbm.imageExists('prestigehart.png', 0.90)
					rbm.releaseScreenshot();
					if (targetImg1) {
						//sleep(1000);
						//prestigeSendMessage()
						

						sleep(1000); 
						ScreenShottoPath('TT2_Prestige'); 
					}
				}
				
				sleep(1000);
				
				rbm.keepScreenshotPartial( 500, 1140, 550, 1210);  //確認轉生按鈕亮
				var targetImg1 = rbm.imageExists('prestige.png', 0.90)
				rbm.releaseScreenshot();
				if (targetImg1) { tap(550, 1180, 100); }
				
				
				if (checkReturn(1)) {
					rbm.keepScreenshotPartial( 15, 1155, 105, 1280);  //確認轉生完成，無大技
					var targetImg = rbm.imageExists('allskillnon3.png', 0.95)
					//rbm.log('allskillnon3:', rbm.findImage('allskillnon3.png', 0.50));
					rbm.releaseScreenshot();
					
					if (targetImg) { 
						console.log(j, '轉生完成'); 
						maxgold = 0;
						pregold = 0;
						sleep(1000);
						break;
					}
				}
				
				if (bossprestige >= SwBossPrs ) {
					console.log(j, '轉生, 卡關:', bossprestige, '>= ', SwBossPrs, '; 轉生');
				}
				else if ( pregold >= SwPrgoldT ) {
					console.log(j, '轉生, 金蛻:', nowgold, '/', SwPrgolds, '; 次數:', pregold, '/', SwPrgoldT);
				}				
				//console.log(j, '我要轉生');
				CheckImageTap(255, 815, 600, 1025, 0.90, 'prestigebutton.png', 1, 1, 3, 50, 1);   //Prestige 按鈕 兩個
			}
			break;
		}
		if (!checkReturn(15)) {
			DIY_swipe(350, 1090, 350, 690, 40, 400);
		}
		bossprestige = 0;
		usePerksTimer = Date.now();
	}
	
	//prestigeTimer = Date.now() + Timer * 1000
}

function prestigeSendMessage() {
	var Char = { 
	    'Att':[
	        {'No':0, 'x': '', 'y': '', 'w': '', 'h':'', 'r':'', 'q':'', 'log':'' }, 
	        {'No':1, 'x':315, 'y': 55, 'w': 95, 'h':30, 'r': 2, 'q':90, 'log':'Stage'}, 
	        {'No':2, 'x':135, 'y':635, 'w':195, 'h':25, 'r': 2, 'q':90, 'log':'Relics'}, 
	        {'No':3, 'x':450, 'y':912, 'w': 85, 'h':25, 'r': 2, 'q':90, 'log':'Since Time'}, 
	    ], 
	}; 		
	
	for (var i = 1; i <= 3; i++) {
		sleep(1000); 
		var ShotImg = getScreenshotModify( Char.Att[i].x, Char.Att[i].y, Char.Att[i].w, Char.Att[i].h, Char.Att[i].w/Char.Att[i].r, Char.Att[i].h/Char.Att[i].r, Char.Att[i].q);
		var base64 = getBase64FromImage(ShotImg);
		releaseImage(ShotImg);
		sendNormalMessage("Donny-TT2", base64);
	}
	
	/*
	sleep(1000); 
	var ShotImg = getScreenshotModify( 0, 0, 720, 1280, 720/2, 1280/2, 80);
	var base64 = getBase64FromImage(ShotImg);
	releaseImage(ShotImg);
	sendNormalMessage("Donny-TT2", base64);
	*/
}

function leftbuffer(Timer){             //左側獎勵
	if (!config.isRunning || Date.now() < leftbufferTimer) { return false; }
	
	if ( checkReturn(1)) {
		var Char = { 
			'Att':[
				{'x':  0, 'y':  0, 's1': 0, 's2':  0},
				{'x':360, 'y':840, 's1':50, 's2':100},    //collect xy
				{'x':640, 'y':380, 's1':50, 's2':100}     //X xy  
			], 
		}; 		
			
		rbm.keepScreenshotPartial( 15, 255, 80, 470);  //切換指定頁面
		targetImg3 = rbm.findImage('left_buffer_3.png', 0.90);
		rbm.imageClick('left_buffer_2.png', 0.90);     //離線錢錢點擊
		targetImg1 = rbm.imageExists('left_buffer_1.png', 0.90);  //每日獎勵判斷
		rbm.imageClick('left_buffer_1.png', 0.90);     //每日獎勵點擊
		rbm.releaseScreenshot();
		
		//rbm.log(rbm.findImage('left_buffer_3.png', 0.50));
		if (targetImg3 != undefined && targetImg3.score >= 0.9) { 
			console.log('有蛋蛋，點蛋蛋，開蛋蛋');
			//console.log(targetImg3.x, targetImg3.y);
			
			tapFor(targetImg3.x, targetImg3.y, 15, 80, 400)
		}
	
		if (targetImg1) {
			sleep(1000);
			rbm.keepScreenshotPartial( 40, 350, 115, 420);  //確認每日獎勵視窗
			targetImg2 = rbm.imageExists('dailyRaw.png', 0.90);
			rbm.releaseScreenshot();
			if (targetImg2) {
				for (var i = 1; i <= 2; i++) {
					for (var j = 1; j <= 2; j++) {
						if (!config.isRunning) return false;
						//console.log(Char.Att[i].x, Char.Att[i].y, Char.Att[i].s1,Char.Att[i].s2);
						tap(Char.Att[i].x, Char.Att[i].y, Char.Att[i].s1); sleep(Char.Att[i].s2);
					}
				}
			}			
		}
		
		leftbufferTimer = Date.now() + Timer * 1000;
	}
}

function debug(Timer){                  //卡畫面檢查
	if (Timer == 0) debugTimer = 0;
	if (!config.isRunning || Date.now() < debugTimer) return false;
	
	CheckImageTap(230, 900, 490, 1030, 0.90, 'ADcollect.png', 1, 1, 1, 50, 1);        //領取廣告 buffer
	
	CheckImageTap(290, 400, 430,  460, 0.90, 'quitBOX.png', 180, 840, 1, 50, 0);      //退出視窗，點擊 NO
	CheckImageTap(290, 400, 430,  460, 0.90, 'errorBOX.png', 360, 840, 1, 50, 0);     //退出視窗，點擊 
	CheckImageTap( 50, 395, 120,  460, 0.90, 'Exclamation.png', 360, 840, 1, 50, 0);  //退出視窗，點擊 Okay
	
	CheckImageTap( 40, 350, 115,  420, 0.90, 'dailyRaw.png', 360, 840, 1, 50, 0);     //退出視窗，點擊 collect
	
	CheckImageTap( 40, 350, 115,  420, 0.90, 'dailyRaw.png', 640, 380, 1, 50, 0);     //退出視窗，點擊 X
	
	if (ctrlFairyADcode == '00000') {	
		CheckImageTap(90, 900, 300, 1030, 0.90, 'ADNoThanks.png', 1, 1, 1, 50, 1);    //領取廣告 NoThanks
	}
	
	rbm.keepScreenshotPartial( 290, 400, 450, 470);  //確認使用 perks
	var targetImg1 = rbm.imageExists('perksBOX.png', 0.90)
	rbm.releaseScreenshot();
	if (targetImg1) { tap(490, 711, 50);}
	//if (targetImg1) { console.log('debug,gold,rain'); tap(490, 711, 50);}

	rbm.keepScreenshotPartial( 290, 400, 440, 470);  //確認公會boss打完要用鑽打對話
	targetImg2 = rbm.imageExists('clanbossfightbox.png', 0.93);
	rbm.releaseScreenshot();
	if (targetImg2) { tapFor(590, 425, 3, 100, 50);	}
	
	rbm.keepScreenshotPartial( 415, 1160, 540, 1220);  //確認公會boss打完要用鑽打鈕
	targetImg2 = rbm.imageExists('clanbossDMfight.png', 0.93);
	rbm.releaseScreenshot();
	if (targetImg2) { tapFor(640, 70, 3, 100, 50);	}
	
	rbm.keepScreenshotPartial( 300, 1150, 645, 1220);  //確認公會boss打完完成了
	targetImg2 = rbm.imageExists('clanbosscomplete.png', 0.93);
	rbm.releaseScreenshot();
	if (targetImg2) { tapFor(640, 70, 3, 100, 50);	}
	
	rbm.keepScreenshotPartial( 110, 1140, 170, 1170);  //確認公會boss打完要等待時間
	targetImg2 = rbm.imageExists('clanbosswait.png', 0.93);
	rbm.releaseScreenshot();
	if (targetImg2) { tapFor(640, 70, 3, 100, 50);	}	
	
	rbm.keepScreenshotPartial( 480, 260, 655, 305);  //確認領取每日任務獎勵
	var targetImg2 = rbm.imageExists('complete.png', 0.95)
	rbm.releaseScreenshot();
	if (targetImg2) { tapFor(640, 79, 3, 50, 100); }		
	
	CheckImageTap(255, 815, 600, 1025, 0.90, 'prestigebutton.png', 635, 285, 3, 50, 0);   //Prestige 按鈕 兩個

	
	debugTimer =  Date.now() + Timer * 1000;
}

function fightClanboss(){
	if (!config.isRunning || !swClanbos) { return false; }
	
	rbm.keepScreenshotPartial( 95, 15, 155, 65);  //確認公會boss能打
	//rbm.log(rbm.findImage('clanbossnow.png', 0.55));
	targetImg1 = rbm.imageExists('clanbossnow.png', 0.955);
	rbm.releaseScreenshot();
	if (targetImg1) {
		for (var i = 0; i <= 5; i++){
			if (!config.isRunning) { return false; }
			
			console.log('公會boss可以打了 ', i, '/5');
			tapFor(125, 60, 3, 100, 550);
			
			//console.log('公會boss可以打了 22');
			if (CheckImageTap(110, 1140, 170, 1170, 0.90, 'clanbossfire.png', 1, 1, 1, 50, 2)) {    //公會boss發火鈕
				tapFor(110, 1140, 3, 100, 50);
				//console.log('公會boss可以打了 33-11');
			}
			
			if (CheckImageTap(110, 1140, 170, 1170, 0.90, 'clanbosswait.png', 1, 1, 1, 50, 2)) {    //公會boss發火鈕
				tapFor(110, 1140, 3, 100, 50);
				//console.log('公會boss可以打了 33-22');
			}
			
			if (CheckImageTap(410, 1150, 540, 1220, 0.90, 'clanbossfight.png', 1, 1, 1, 50, 2)){    //公會boss 戰鬥鈕
				tapFor(550, 1170,  1, 80, 1000);
				//console.log('公會boss可以打了 44');
			}	
			
			if (CheckImageTap(95,  100, 160,  135, 0.90, 'clanbosseyes.png', 1, 1, 1, 50, 2)){    //公會boss 眼睛
				//console.log('公會boss可以打了 55');
				sleep(1500)
				
				for (var j = 1; j <= 28; j++){
					if (!config.isRunning) { return false; }
					tapFor(550, 1170,  1, 10, 10);
					tapFor(370,  480, 80,  8,  8);
					console.log('60下，第', j, '次');
								
					//if (CheckImageTap( 290, 400, 440, 470, 0.90, 'clanbossfightbox.png', 1, 1, 1, 50, 2)) {  //確認公會boss打完要用鑽打對話
					if (checkReturn(23) || checkReturn(24)) {  //確認公會boss打完要用鑽打對話
						console.log('打完用鑽對話, break');

						for (var j = 1; j <= 20; j++){
							if (!config.isRunning) { return false; }
							if (checkReturn(1)) { return false; }
							
							CheckImageTap( 290,  400, 440,  470, 0.90, 'clanbossfightbox.png', 590, 425, 3, 50, 0);     //確認公會boss打完要用鑽打對話
							CheckImageTap( 415, 1160, 540, 1220, 0.90, 'clanbossDMfight.png', 640, 70, 3, 50, 0);     //確認公會boss打完要用鑽打鈕
							CheckImageTap( 300, 1150, 645, 1220, 0.90, 'clanbosscomplete.png', 640, 70, 3, 50, 0);    //確認公會boss打完要用鑽打鈕
							CheckImageTap( 110, 1140, 170, 1170, 0.90, 'clanbosswait.png', 640, 70, 3, 50, 0);        //確認公會boss打完要用鑽打鈕
							
							sleep(500);
						}						
					}
				}
			}

			//sleep(500);
			//console.log('找 clanbossfight，i=', i)
		}
	}
	//else { console.log('沒有公會boss打'); }
}

function Artifact(Timer) {
	if (!config.isRunning || Date.now() < ArtifactTimer) { return false; }
	if (!SwArtifDv && !SwRedbook) { return false; }
	console.log('神器 - 檢查')
	
	if (SwRedbook) {
		console.log('神器 -,自動點紅書')
		
		choiceMenu(5, 2); sleep(200);
		choiceMenu(5, 2); sleep(300);
		for (var i = 0; i < 10; i++) {
			if (!config.isRunning) return false;
			
			if ( checkReturn(21)) {       //artifact:icon_salvager
				buyMode(4);	//sleep(300);
				
				for (var i = 0; i <= 10; i++) {
					if (!config.isRunning) return false;
					
					if (checkReturn(22)) {
						rbm.keepScreenshotPartial( 105,  160, 310, 1165);  //artifactsBS
						target = rbm.findImage('artifactsBS.png', 0.90);
						rbm.releaseScreenshot();
						if (target != undefined && target.score >= 0.9) { 
						
							console.log('有紅書，確認紅書升級');
							
							checkx = 690;
							checky = target.y + 40
							for (var j = 1; j <= 4; j++) {
								if ( checkPointcolorTap(checkx, checky, 10, '898989', 1, 1, 1, 1, 2)) { 
									console.log('愛心不足，紅書變灰');
									ArtifactTimer = Date.now() + 1800 * 1000; 
									return false; 
								}
								sleep(300);
								checkPointcolorTap(checkx, checky, 40, 'F7AA08', 695, 326, 3, 50, 1);
							}
						}
					}
					else if (!checkReturn(22)) {
						DIY_swipe(710, 650, 710, 250, 12, 400);
					}
				}	
				
				if (!checkReturn(21)) {
					console.log('沒有 icon_salvager，等待5秒');
					sleep(5000);
					
					if (!checkReturn(21)) {
						console.log('還是沒有 icon_salvager，跳出 artifacts');
						return false;
					}
				}
				
				ArtifactTimer = Date.now() + Timer * 1000
				break;
			}
			else if (!checkReturn(21)) {
				DIY_swipe(710, 290, 710, 690, 12, 400);
			}
		}	
	}
}


function checkScreenStop(Time1, Time2, Timer) {
	if (!config.isRunning || Date.now() < ScreenStoptimer ) return false;
	//console.log('CkScSt : Check Screen Stop');
	
	var stoptimes = ScreenStopTimes( 360 - 30, 460 - 30, 360 + 30, 460 + 30, 'checkSCstop.png', 10)
	if ( stoptimes >= Time2 ) {
		console.log('CkScSt : Restart App');
		startApp(160)
	}
	else if ( stoptimes >= Time1 ) {
		//console.log('CkScSt : Restart Autofight');
		//setFirstTimer();
	}
	
	ScreenStoptimer = Date.now() + Timer * 1000
}

function startApp(Timer) {  //app重開
	if (!config.isRunning) return false;
	console.log('RestartApp')
	
	keycode('HOME', 1000);
	sleep(1000)
	rbm.stopApp(config.PackangName); sleep(500)
	rbm.stopApp(config.PackangName); sleep(1000)
	//console.log(Date.now())
	rbm.startApp(config.PackangName,config.LaunchActivityName);
	
	var a = 0;
	for (var i = 1; i < Timer; i++) {
		if (!config.isRunning) return false;
		
		CheckImageTap( 165,  270, 560,  330, 0.90, 'wellcomeback.png', 200, 970, 1, 200, 0);  //遊戲開始1

		sleep(1000);
		
		ScreenErrorTime1 = Date.now()
		
		if (checkReturn(1)) {
			a = a + 1;
			
			if ( a >= 4 ) { 
				ScreenErrorTime1 = Date.now()
				setFirstTimer(); 
				break; 
			}
		}
		
		console.log('Start App : ', i, 'sec');
	}
}

function main(){                        //主流程
	if (!config.isRunning) return false;

	//console.log('HerosLvUp 英雄升級');
	HerosLvUp(SwHeroLvLm, SwHrfsTm, SwHeroTm);    //英雄升級
	
	//console.log('tapMain 畫面連點');
	tapMain(4, 21);
	
	//console.log('leftbuffer 左側獎勵嬐');
	leftbuffer(900);
	
	//console.log('MasterLvUp 劍術大師升級');
	MasterLvUp(SwMastLvLm, SwMastTm);  //劍術大師升級
	
	//console.log('debug 卡畫面檢查');
	debug(10);
	
	//console.log('fightClanboss 打工會BOSS');
	fightClanboss();
	
	//console.log('Artifact 神器檢查');
	Artifact(600);
	
	//console.log('ScreenStop 畫面停止檢查')
	checkScreenStop(20, 65, 20);
	
	//console.log('main-end')
}

function setFirstTimer() {
	MasterLvUpTimer = Date.now() + 20 * 1000;
	HerosLvUpTimer  = Date.now() + 15 * 1000;
	HerosLvfstTimer = Date.now() +  5 * 1000;
	prestigeTimer   = Date.now() + 90 * 1000;
	usePerksTimer   = Date.now() +  0 * 1000;
	leftbufferTimer = Date.now() +  0 * 1000;
	debugTimer      = Date.now() +  5 * 1000;
	ArtifactTimer   = Date.now() +  5 * 1000;
	DailyTimer      = Date.now() +  5 * 1000;
	ScreenStoptimer = Date.now() +  15 * 1000;
	
	checkScreenTimer = Date.now() 
	
		
	
	bossbkTimer = new Array(Date.now(), Date.now(), 0, 0, 0, 0, 0 );
	//function控制時間, 卡關起點, 卡關多久, 離開boss消失, 打boss出現, 離開boss同相次數

	MasterLv = 0;
	
	bossprestige = 0;
	maxgold =  0;
	pregold = -2;
	
	rbm.screencrop('stagecheck1.png', 338, 22, 390, 82)

	stagebk = -1;
}
function test(cycle){    
	rbm.init();
	config.isRunning = true;               //腳本測試用function
	for(var n = 0; n <= cycle; n++) {
		if (!config.isRunning) return false;
		
		if (n == 0) {
			//pauseswitch = 0;
			ctrlSkillcode = '111111';
			ctrlFairyADcode = '10000';

			swVIP   = 0         //VIP無廣告開關	
			
			SwMastSw   = 1      //劍術大師 升級開關
			SwMastTm   = 240    //劍術大師 升級檢查時間
			SwMastLvLm = 12500  //劍術大師 升級限制
			SwMastLvRu = 0      //劍術大師 cost -90%升級
			
			SwHeroSw   = 1      //全  體 英雄 升級開關
			SwHrfsTm   = 20     //第一頁 英雄 升級檢查時間
			SwHeroTm   = 180    //全  體 英雄 升級檢查時間
			SwHeroLvLm = 4000   //第一位 英雄 優先升級等級
			SwHeroLvRu = 0      //全  體 英雄 cost -90%升級
			
			SwBossReT = 5       //卡boss，等待再打時間
			
			SwPrestig = 1       //蛻變開關
			SwBossPrs = 3       //卡關的次數轉生
			SwPrgolds = 435     //金幣級次蛻變
			SwPrgoldT = 3       //金幣蛻變檢查次數
			SwPrSaScr = 1       //蛻變時自動抓圖
			
			SwArtifDv = 0       //自動開神器(轉生後觸發)
			SwRedbook = 0       //自動點紅書(開神器後觸發)
			
			swClanbos = 1       //打工會boss
			
			swPksrain = 0       //Perks : 天降黃金
			swRaintms = 0       //Perks : 天降黃金次數	
				
			
			setFirstTimer()     //設定初始值
			ScreenErrorTime1 = Date.now()
		}
		
		else if (n >= 1) {

			// var attack = checkReturn(1);
			// if(attack){
				var stage = recoNumgroup(9);
				// var stageD = stage - stagebk
				// console.log(stagebk, stage, stageD);
				// if (stagebk != -1 && stageD >= 0 && stageD < 100 && stage < 20000) {
					// stagebk = stage;
					console.log('n = '+ n, ', stage:', stage);
				// } else if (stagebk == -1) {
					// stagebk = stage;
				// }
			// } else if(!attack) {
				// stagebk = -1;
			// }
			
			
			// if (stage > 0 && stage < 55000) stageck = stage;
			// while(config.isRunning) { main(); }
			
			sleep(200);
		}
	}
}

function stop() {
	config.isRunning=false;
}

function start(UIVIP, UISk_1, UISk_2, UISk_3, UISk_4, UISk_5, UISk_6, UIFaAD_1, UIFaAD_2, UIFaAD_3, UIFaAD_4, UIFaAD_5, UIFaADGD, UIMastSw, UIMastTm, UIMastLvLm, UIMastLvRu, UIHeroSw, UIHrfsTm, UIHeroTm, UIHeroLvLm, UIHeroLvRu, UIBossReT, UIPrestig, UIBossGd, UIBossPrs, UIPrgolds, UIPrgoldT, UIPrSaScr, UIArtifDv, UIRedbook, UIClanbos ) {
	rbm.init();
	config.isRunning = true;

	swVIP   = UIVIP    //VIP無廣告開關
	//console.log('swVIP = ', UIVIP)
	
	if(UIHeroLvRu || UIMastLvRu) { UIFaAD_4 = 1; }
	
	ctrlSkillcode = String(UISk_1 * 1) + String(UISk_2 * 1) + String(UISk_3 * 1) + String(UISk_4 * 1) + String(UISk_5 * 1) + String(UISk_6 * 1);
	//console.log('ctrlSkillcode=', ctrlSkillcode)  //技能控制 CODE
	
	ctrlFairyADcode = String(UIFaAD_1 * 1) + String(UIFaAD_2 * 1) + String(UIFaAD_3 * 1) + String(UIFaAD_4 * 1) + String(UIFaAD_5 * 1);
	//console.log('ctrlFairyADcode=', ctrlFairyADcode)  //廣告BUFFER CODE
	
	SwFaADGD = UIFaADGD
	
	SwMastSw   = UIMastSw    //劍術大師 升級開關
	SwMastTm   = UIMastTm    //劍術大師 升級檢查時間
	SwMastLvLm = UIMastLvLm  //劍術大師 升級限制
	SwMastLvRu = UIMastLvRu  //劍術大師 cost -90%升級
	//console.log('Mast:', SwMastSw, SwMastTm, SwMastLvLm, SwMastLvRu)
	
	SwHeroSw   = UIHeroSw    //全  體 英雄 升級開關
	SwHrfsTm   = UIHrfsTm    //第一頁 英雄 升級檢查時間
	SwHeroTm   = UIHeroTm    //全  體 英雄 升級檢查時間
	SwHeroLvLm = UIHeroLvLm  //第一位 英雄 優先升級等級
	SwHeroLvRu = UIHeroLvRu  //全  體 英雄 cost -90%升級
	//console.log('Hero:', SwHeroSw, SwHeroTm, SwHeroLvLm, SwHeroLvRu)
	
	SwBossReT = UIBossReT    //卡boss，等待再打時間
	//console.log('BossK:', SwBossReT)
	
	SwPrestig = UIPrestig    //蛻變開關
	SwBossGd = UIBossGd      //金幣級次卡關轉生啟動
	
	SwBossPrs = UIBossPrs    //卡關的次數轉生
	SwPrgolds = UIPrgolds    //多少錢必定蛻變
	SwPrgoldT = UIPrgoldT    //金幣蛻變檢查次數
	SwPrSaScr = UIPrSaScr    //蛻變時自動抓圖
	//console.log('Prestig:', SwPrestig, SwBossGd, SwBossPrs, SwPrgolds, SwPrgoldT, SwPrSaScr)
	
	SwArtifDv = UIArtifDv    //自動開神器(轉生後觸發)
	SwRedbook = UIRedbook    //自動點紅書(開神器後觸發)
	//console.log('Artif:', SwArtifDv, SwRedbook)
	
	swClanbos = UIClanbos    //打公會boss
	//console.log('Other:', swClanbos)
	
	setFirstTimer()     //設定初始值
	ScreenErrorTime1 = Date.now()
	
	console.log('TT2 - 腳本執行開始');
	while(config.isRunning) { main(); }
}