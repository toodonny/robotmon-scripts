
////TOOL FUNCTION

/*
function isSameColor(c1, c2, diff) {
	if (!config.isRunning) return false;
	if (diff == undefined) diff = 20;
	if (Math.abs(c1.r - c2.r) > diff) return false;
	if (Math.abs(c1.g - c2.g) > diff) return false;
	if (Math.abs(c1.b - c2.b) > diff) return false;
	if (Math.abs(c1.a - c2.a) > diff) return false;
	return true;
}

function checkIsSameColor(strRGB1, strRGB2, diff) {

	var c1 = {r:-1, g:-1, b:-1, a:0};
	var c2 = {r:-1, g:-1, b:-1, a:0};
	
	c1.r = parseInt(strRGB1.substr(0, 2), 16) * 1;
	c1.g = parseInt(strRGB1.substr(2, 2), 16) * 1;
	c1.b = parseInt(strRGB1.substr(4, 2), 16) * 1;

	c2.r = parseInt(strRGB2.substr(0, 2), 16) * 1;
	c2.g = parseInt(strRGB2.substr(2, 2), 16) * 1;
	c2.b = parseInt(strRGB2.substr(4, 2), 16) * 1;

	if (!config.isRunning) return false;
	if (diff == undefined) diff = 20;
	if (Math.abs(c1.r - c2.r) > diff) return false;
	if (Math.abs(c1.g - c2.g) > diff) return false;
	if (Math.abs(c1.b - c2.b) > diff) return false;
	if (Math.abs(c1.a - c2.a) > diff) return false;
	return true;
}

function checkPointColor0(intX, intY, diff, strRGB) {  //return
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

function getPointcolor(intX, intY, msg) {  //return  msg
	if (!config.isRunning) return false;

	var img = getScreenshotModify(intX, intY, 1, 1, 1, 1, 100);
    var getpoint = getImageColor(img, 0, 0);

	var getkr = getpoint.r.toString(16);
	var getkb = getpoint.b.toString(16);
	var getkg = getpoint.g.toString(16);
	var getcolorHEX = getkr + getkg + getkb;

	if (msg) {	
		console.log('getkr:', getpoint.r, 'getkg:', getpoint.g, 'getkb:', getpoint.b);
		console.log('getkr:', getkr, 'getkg:', getkg, 'getkb:', getkb);
		console.log('getcolorHEX:', getcolorHEX);
	}
	

	return getcolorHEX;
}

function checkPointColor(intX, intY, diff, strRGB) {  //return
	if (!config.isRunning) return false;

	var checkr = parseInt(strRGB.substr(0, 2), 16) * 1;
	var checkg = parseInt(strRGB.substr(2, 2), 16) * 1;
	var checkb = parseInt(strRGB.substr(4, 2), 16) * 1;
	var checka = 0;

	var img = getScreenshotModify(intX, intY, 1, 1, 1, 1, 100);
    var getpoint = getImageColor(img, 0, 0);
	var check = isSameColor({b:checkb, g:checkg, r:checkr, a:checka}, getpoint, diff);
	releaseImage(img);
	// rbm.log('orgpoint:', {b:checkb, g:checkg, r:checkr})
	// rbm.log('getpoint:', getpoint);
	return check;
}

function checkPointColor3(intX1, intY1, diff1, strRGB1, intX2, intY2, diff2, strRGB2, intX3, intY3, diff3, strRGB3 ) {  //return
	if (!config.isRunning) return false;

	if (checkPointColor(intX1, intY1, diff1, strRGB1) & checkPointColor(intX2, intY2, diff2, strRGB2) & checkPointColor(intX3, intY3, diff3, strRGB3)) {
		var check = true;
		//console.log('3p check true');
	}
	else {
		var check =  false;
		//console.log('3p check false');
	}

	return check;
}

function checkPointColorTap(intX, intY, diff, strRGB, TapX, TapY, TapTimes, Delay1, Taptype) {  //type: 0:TapX, TapY, 1:intX, intY, 2:return
	if (!config.isRunning) return false;

	check = checkPointColor(intX, intY, diff, strRGB);
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

*/


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

function DIY_swipe(intx, inty, finax, finay, moveD, pushtime, sleeptime, mode) {  //mode: 0:not tap up  1:tap up
	if (!config.isRunning) return false;

	console.log('DIY_swipe')
	var MoveXD = (finax - intx) / moveD
	var MoveYD = (finay - inty) / moveD

	tapDown(intx, inty, 50 + pushtime);
	for (var i = 0; i < moveD; i++) {
		console.log(i);
		if (!config.isRunning) { tapUp(intx, i, 200);  break; }
		intx = intx + MoveXD
		inty = inty + MoveYD
		moveTo(intx, inty, 10);
	}
	moveTo(finax, finay, 100)

	if (mode) {tapUp(finax, finay, 10);}
	
	if (sleeptime != undefined) {sleep(sleeptime);}
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

/*
function num_Recognition(x1, y1, x2, y2, siml, numstr, grayF) {    //數字辨識-測試function  grayF: 1:gray  0:color
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
		
		if (grayF) {
			// console.log('gray : bgrToGray')
			var gray =  bgrToGray(image); // gray image
			// saveImage(image, scriptPath + '/image.png');
			saveImage(gray, scriptPath + '/gray.png');
			releaseImage(gray);

			var gray = openImage(scriptPath + '/gray.png');
		}
		
		var arrynum = 0
		for (var i = 0; i <= 9; i++) {
			if (!config.isRunning) return false;
			// console.log('chekc num:', i);

			var filename = scriptPath + '/' + numstr + i + '.png';
			var tImg = openImage(filename);

			// console.log('filename:', filename);
			// console.log('1 reNum:', 'findImages', numstr + i + '.png', siml);
			// var results = rbm.findImages(numstr + i + '.png', siml, 5, false, false);

			if (!grayF) {
				var results = findImages(image, tImg, siml, 3, true);
			}else{
				var results = findImages(gray, tImg, siml, 3, true);
			}

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

					if (errckDv > 7 || errcksc2 == '') break

					if (errckDv <= 7) {
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
		// releaseImage(gray);

		return Resultvalue
	}
}
*/

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





//========ChatGPT 簡化後===========

function parseColor(strRGB) {
    if (!config.isRunning) return false;
	return {
		r: parseInt(strRGB.substr(0, 2), 16),
		g: parseInt(strRGB.substr(2, 2), 16),
		b: parseInt(strRGB.substr(4, 2), 16),
		// a: 0 // 假設透明度默認為0
	};
}

function isSameColor(c1, c2, diff) {
	if (!config.isRunning) return false;
	if (typeof diff === 'undefined') diff = 20;

	return ['r', 'g', 'b'].every(function(channel) {
		return Math.abs(c1[channel] - c2[channel]) <= diff;
	});
}

function checkIsSameColor(strRGB1, strRGB2, diff) {
    if (!config.isRunning) return false;
	var c1 = parseColor(strRGB1);
	var c2 = parseColor(strRGB2);
	return isSameColor(c1, c2, diff);
}

function getPointColor(intX, intY) {
	if (!config.isRunning) return false;
	var img = getScreenshotModify(intX, intY, 1, 1, 1, 1, 100);
	var getpoint = getImageColor(img, 0, 0);
	releaseImage(img);
	return getpoint;
}

function getPointColorHex(intX, intY, msg) {
	if (!config.isRunning) return false;
	var getpoint = getPointColor(intX, intY);
	var getkr = getpoint.r.toString(16);
	var getkg = getpoint.g.toString(16);
	var getkb = getpoint.b.toString(16);
	var getcolorHEX = getkr + getkg + getkb;

	if (msg) {
		console.log('getkr:', getpoint.r, 'getkg:', getpoint.g, 'getkb:', getpoint.b);
		console.log('getcolorHEX:', getcolorHEX);
	}
	return getcolorHEX;
}

function checkPointColor(intX, intY, diff, strRGB) {
	if (!config.isRunning) return false;
	var checkColor = parseColor(strRGB);
	var getpoint = getPointColor(intX, intY);
	return isSameColor(checkColor, getpoint, diff);
}

function checkPointColor3(intX1, intY1, diff1, strRGB1, intX2, intY2, diff2, strRGB2, intX3, intY3, diff3, strRGB3) {
	if (!config.isRunning) return false;

	return checkPointColor(intX1, intY1, diff1, strRGB1) &&
		   checkPointColor(intX2, intY2, diff2, strRGB2) &&
		   checkPointColor(intX3, intY3, diff3, strRGB3);
}

function checkPointColorTap(intX, intY, diff, strRGB, TapX, TapY, TapTimes, Delay1, Taptype) {
	if (!config.isRunning) return false;

	var check = checkPointColor(intX, intY, diff, strRGB);
	if (Taptype == 2) return check;

	for (var i = 0; i < TapTimes; i++) {
		if (!config.isRunning) return false;

		if (check) {
			if (Taptype == 0) tap(TapX, TapY, 60);
			else if (Taptype == 1) tap(intX, intY, 60);

			sleep(Delay1);
		}
	}
}

function findRegionPoint(intX, intY, finX, finY, diff, strRGB, mode) {
	if (!config.isRunning) return false;

	var origX = 0, origY = 0;
	var distX = finX - intX;
	var distY = finY - intY;

	var checkColor = parseColor(strRGB);

	var directions = {
		1: { x1: origX, y1: origY, x2: distX, y2: distY, pX: 1, pY: 1 },   // 左上 -> 右下
		2: { x1: distX, y1: origY, x2: origX, y2: distY, pX: -1, pY: 1 },  // 右上 -> 左下
		3: { x1: origX, y1: distY, x2: distX, y2: origY, pX: 1, pY: -1 },  // 左下 -> 右上
		4: { x1: distX, y1: distY, x2: origX, y2: origY, pX: -1, pY: -1 }  // 右下 -> 左上
	};

	var img = getScreenshot();
	var cropImg = cropImage(img, intX, intY, distX + 1, distY + 1);

	var dir = directions[mode];
	for (var findY = dir.y1; dir.pY > 0 ? findY <= dir.y2 : findY >= dir.y2; findY += dir.pY) {
		for (var findX = dir.x1; dir.pX > 0 ? findX <= dir.x2 : findX >= dir.x2; findX += dir.pX) {
			if (!config.isRunning) return false;

			var getpoint = getImageColor(cropImg, findX, findY);
			var check = isSameColor(checkColor, getpoint, diff);

			if (check) {
				releaseImage(img);
				releaseImage(cropImg);
				return { x: findX + intX, y: findY + intY };
			}
		}
	}

	releaseImage(img);
	releaseImage(cropImg);
	return false;
}

function num_Recognition(x1, y1, x2, y2, siml, numstr, grayF) {    
    if (!config.isRunning) return false;

    var xD = x2 - x1;
    var yD = y2 - y1;
    var scriptDir = config.scriptDir;
    var scriptPath = getStoragePath() + '/' + scriptDir;

    // 初始化 Character 為一個空物件
    var Character = {};

    for (var n = 0; n <= 6; n++) {
        var image = getScreenshotModify(x1, y1, xD, yD, xD, yD, 100);
        
        if (grayF) {
            var gray = bgrToGray(image);
            saveImage(gray, scriptPath + '/gray.png');
            releaseImage(gray);
            gray = openImage(scriptPath + '/gray.png');
        }

        var arrynum = 0;
        for (var i = 0; i <= 9; i++) {
            if (!config.isRunning) return false;

            var filename = scriptPath + '/' + numstr + i + '.png';
            var tImg = openImage(filename);
            var results = grayF ? findImages(gray, tImg, siml, 3, true) : findImages(image, tImg, siml, 3, true);

            if (results != '') {
                for (var index in results) {
                    if (!config.isRunning) return false;

                    var result = results[index];

                    // 自動新增 Attribute
                    Character[arrynum] = {
                        value: i,
                        x: result.x,
                        y: result.y,
                        score: result.score.toFixed(5)
                    };
                    arrynum++;
                }
            }
        }

        // 確保至少有一項結果
        if (!Character[0] || Character[0].score === '') return -1;

        // 對 Character 進行排序
        var attributesArray = Object.keys(Character).map(function(key) { return Character[key]; });
        attributesArray.sort(function (a, b) {
            return a.x < b.x ? 1 : -1;
        });

        // 處理錯誤檢查邏輯
        for (var j = 0; j < attributesArray.length; j++) {
            var errckX1 = attributesArray[j].x;
            var errcksc1 = attributesArray[j].score;

            if (errcksc1 !== '') {
                for (var k = j + 1; k < attributesArray.length; k++) {
                    var errckX2 = attributesArray[k].x;
                    var errcksc2 = attributesArray[k].score;

                    var errckDv = Math.abs(errckX2 - errckX1);

                    if (errckDv > 7 || errcksc2 === '') break;

                    if (errckDv <= 7) {
                        var clear = (errcksc1 > errcksc2) ? k : j;

                        if (errcksc1 === errcksc2) {
                            if (attributesArray[j].value === attributesArray[k].value) {
                                var errfile = scriptPath + '/' + numstr + i + 'err.png';
                                saveImage(image, errfile);
                            }
                        }

                        attributesArray[clear].value = 0;
                        attributesArray[clear].x = 0;
                        attributesArray[clear].y = '';
                        attributesArray[clear].score = '';
                    }
                    if (attributesArray[j].score === '') break;
                }
            }
        }

        sleep(50);
        
        // 計算結果值
        var Resultvalue = 0;
        for (var l = 0; l < attributesArray.length; l++) {
            if (attributesArray[l].score === '') break;
            Resultvalue += attributesArray[l].value * Math.pow(10, l);
        }

        releaseImage(tImg);
        releaseImage(image);

        return Resultvalue;
    }
}
