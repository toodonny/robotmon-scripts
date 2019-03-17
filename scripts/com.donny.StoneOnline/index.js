importJS('RBM-0.0.3');

// ============================STONE=============================== //

var config = {
	appName: 'com.donny.StoneOnline',
	oriScreenWidth: 1080, // source
	oriScreenHeight: 1920,
	oriVirtualButtonHeight: 0,
	oriResizeFactor: 1,
	eventDelay: 500,
	imageThreshold: 1,
	imageQuality: 100,
	resizeFactor: 1, // small -> quickly
	stoneDir: 'scripts/com.donny.StoneOnline/images',
	stonePath: getStoragePath() + '/scripts/com.donny.StoneOnline/images',
	isRunning: false,
	PackangName: 'net.supercat.stone',
	LaunchActivityName: 'net.supercat.stone.MainActivity',
};

var stonesImg = [];
var ston
var rbm = new RBM(config);
rbm.init();

////============================ New Function ===============================////

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
	var check = isSameColor({ b: checkb, g: checkg, r: checkr, a: checka }, getpoint, diff);
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
	var check = isSameColor({ b: checkb, g: checkg, r: checkr, a: checka }, getpoint, diff);
	releaseImage(img);

	return check;
}

function checkPointcolorTap(intX, intY, diff, strRGB, TapX, TapY, TapTimes, Delay1, Taptype) {  //type: 0:TapX, TapY, 1:intX, intY, 2:return 
	if (!config.isRunning) return false;

	check = checkPointcolor(intX, intY, diff, strRGB);
	if (Taptype == 2) { return check; }                       //console.log('check:', check);
	for (var i = 0; i < TapTimes; i++) {
		if (!config.isRunning) return false;

		if (check) {
			if (Taptype == 0) { tap(TapX, TapY, 80); }          //console.log('Tap TapX, TapY: ', TapX, TapY)
			else if (Taptype == 1) { tap(intX, intY, 80); } 	//console.log('Tap intX, intY: ', intX, intY)
			sleep(Delay1)
		}
	}
}

////============================ Old Function ===============================////

function CheckImageTap(intX, intY, ImgW, ImgH, Siml, ImageName, TapX, TapY, TapTimes, Delay1, Taptype) {

	var cdin = convXY(intX - 2, intY - 2, intX + ImgW + 4, intY + ImgH + 4);
	var image = getScreenshotModify(cdin.x1, cdin.y1, cdin.codX, cdin.codY, cdin.ordX, cdin.ordY, 100);
	var filename = config.stonePath + '/' + ImageName;
	var tImg = openImage(filename);
	var target = findImage(image, tImg);
	releaseImage(image);
	releaseImage(tImg);
	// rbm.log(ImageName + ':', target);

	if (target != undefined && target.score > Siml) { var result = true; }
	else { var result = false; }

	if (Taptype == 2) return StoneLvUP;
	if (Taptype == 3) return target;

	// rbm.keepScreenshotPartial(intX - 2, intY - 2, intX + ImgW + 4, intY + ImgH + 4); // x1, y1, x2, y2
	// var StoneLvUP = rbm.imageExists(ImageName, Siml);
	for (var i = 0; i < TapTimes; i++) {
		if (result) {
			if (Taptype == 1) {
				var TaptoX = Math.round((intX + target.x) * widthF);
				var TaptoY = Math.round((intY + target.y) * heightF);
			} else if (Taptype == 0) {
				var TaptoX = TapX * widthF;
				var TaptoY = TapY * heightF;
			}
			// console.log('type:', Taptype, ', X:', TaptoX, ', Y:', TaptoY);
			tap(TaptoX, TaptoY, 100);
			sleep(Delay1)
		}
	}
	// rbm.releaseScreenshot();
}

function xy_swipe(intx, inty, finax, finay, moveD) {  //坐標位移
	var movedistance = (finay - inty) / moveD
	tapDown(intx, inty, 200);

	if (finay > inty) {
		for (var i = inty; i < finay; i = i + moveD) {
			moveTo(intx, i, 10);
			if (!config.isRunning) {
				tapUp(intx, i, 200);
				break;
			}
		}
	}
	else if (finay < inty) {
		for (var i = inty; i > finay; i = i - moveD) {
			moveTo(intx, i, 10);
			if (!config.isRunning) {
				tapUp(intx, i, 200);
				break;
			}
		}
	}

	moveTo(finax, finay, 250)
	tapUp(finax, finay, 200)
	sleep(200)
}

function DIY_swipe(intx, inty, finax, finay, moveD, sleeptime) {
	if (!config.isRunning) return false;
	var movedistance = (finay - inty) / moveD

	var MoveXD = (finax - intx) / moveD
	var MoveYD = (finay - inty) / moveD

	tapDown(intx, inty, 70);
	for (var i = 0; i < moveD; i++) {
		if (!config.isRunning) { tapUp(intx, i, 200); break; }
		intx = intx + MoveXD
		inty = inty + MoveYD
		moveTo(intx, inty, 8);
	}
	moveTo(finax, finay, 10)
	tapUp(finax, finay, 60)
	if (sleeptime != undefined) sleep(sleeptime);
}

function DIY_swipe_conv(intx, inty, finax, finay, moveD, sleeptime) {
	if (!config.isRunning) return false;
	// console.log(intx, inty, finax, finay, moveD, sleeptime)
	var cdin = convXY(intx, inty, finax, finay);
	var intx = Math.round(cdin.x1);
	var inty = Math.round(cdin.y1);
	var finax = Math.round(cdin.x2);
	var finay = Math.round(cdin.y2);

	// console.log(intx, inty, finax, finay, moveD, sleeptime)
	var movedistance = (finay - inty) / moveD

	var MoveXD = (finax - intx) / moveD
	var MoveYD = (finay - inty) / moveD

	tapDown(intx, inty, 70);
	for (var i = 0; i < moveD; i++) {
		if (!config.isRunning) { tapUp(intx, i, 200); break; }
		intx = intx + MoveXD
		inty = inty + MoveYD
		moveTo(intx, inty, 8);
	}
	moveTo(finax, finay, 10)
	tapUp(finax, finay, 10)
	if (sleeptime != undefined) sleep(sleeptime);
}

function DIY_radomswipe1(intx, inty, finax, finay, moveD, sleeptime) {
	var movedistance = (finay - inty) / moveD

	var MoveXD = (finax - intx) / moveD
	var MoveYD = (finay - inty) / moveD

	tapDown(intx, inty, 70);
	for (var i = 0; i < moveD; i++) {
		if (!config.isRunning) {
			tapUp(intx, i, 200);
			break;
		}
		intx = intx + MoveXD
		inty = inty + MoveYD

		intxR = intx + getRandom(-30, 30);
		intyR = inty + getRandom(-30, 30);

		moveTo(intxR, intyR, 10 + getRandom(-5, 5));
	}
	moveTo(finax, finay, 40)
	tapUp(finax, finay, 40)
	if (sleeptime != undefined) sleep(sleeptime);
}

function DIY_radomswipe2(intx, inty, finax, finay, moveD, sleeptime) {
	var movedistance = (finay - inty) / moveD

	var MoveXD = (finax - intx) / moveD
	var MoveYD = (finay - inty) / moveD

	tapDown(intx, inty, 70);
	for (var i = 0; i < moveD; i++) {
		if (!config.isRunning) {
			tapUp(intx, i, 200);
			break;
		}
		intx = intx + MoveXD + getRandom(-30, 30);
		inty = inty + MoveYD + getRandom(-30, 30);
		moveTo(intx, inty, 10 + getRandom(-5, 5));
	}
	moveTo(finax, finay, 40)
	tapUp(finax, finay, 40)
	if (sleeptime != undefined) sleep(sleeptime);
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

function tapFor(intX, intY, taptimes, pushtime, sleeptime, delaytime) {  //單點，多次連續點擊, taptimes:點擊次數, pushtime:按住時間, sleeptime:點擊間隔
	for (var i = 0; i < taptimes; i++) {
		if (!config.isRunning) return false;

		tap(intX * widthF, intY * heightF, pushtime);
		sleep(sleeptime);
	}
	if (delaytime != undefined) { sleep(delaytime); }
}

function convertImgcheck(intX1, intY1, intX2, intY2, siml, ImageName) {
	if (!config.isRunning) return false;

	var cdin = convXY(intX1, intY1, intX2, intY2);
	// rbm.log(ImageName, 'cdin:', cdin);

	var image = getScreenshotModify(cdin.x1, cdin.y1, cdin.codX, cdin.codY, cdin.ordX, cdin.ordY, 100);
	// rbm.log(ImageName, 'cdinRST:', cdin.x1, cdin.y1, cdin.codX, cdin.codY, cdin.ordX, cdin.ordY);

	var filename = config.stonePath + '/' + ImageName;
	var tImg = openImage(filename);
	var target = findImage(image, tImg);
	releaseImage(image);
	releaseImage(tImg);
	// rbm.log(ImageName, ':', target);

	if (target != undefined && target.score > siml) {
		target.x2 = Math.round((intX1 + target.x)*widthF);
		target.y2 = Math.round((intY1 + target.y)*heightF);
		target.result = true;
	}
	else { target.result = false; }
	// rbm.log(ImageName, ':', target);

	return target;
}

function converColorcheck(intX1, intY1, Vb, Vg, Vr, Vdiff) {
	if (!config.isRunning) return false;

	var cdin = convXY(intX1, intY1, intX1, intY1);
	var img = getScreenshot();
	var Color = getImageColor(img, cdin.x1, cdin.y1);
	var ColorCheck = isSameColor({ b: Vb, g: Vg, r: Vr, a: 0 }, Color, Vdiff);
	releaseImage(img);

	return ColorCheck;
}

function convXY(intX1, intY1, intX2, intY2) {
	if (intX1 != undefined) { var x1 = Math.round(intX1 * widthF); }
	else { var x1 = -1; }
	if (intY1 != undefined) { var y1 = Math.round(intY1 * heightF); }
	else { var y1 = -1; }
	if (intX2 != undefined) { var x2 = Math.round(intX2 * widthF); }
	else { var x2 = -1; }
	if (intY2 != undefined) { var y2 = Math.round(intY2 * heightF); }
	else { var y2 = -1; }

	if (x1 != -1 && x2 != -1) { var codX = x2 - x1 + 1; var ordX = intX2 - intX1 + 1; }
	else { var ordX = -1; var codX = -1; }
	if (y1 != -1 && y2 != -1) { var codY = y2 - y1 + 1; var ordY = intY2 - intY1 + 1; }
	else { var ordY = -1; var codY = -1; }

	return { 'x1': x1, 'y1': y1, 'x2': x2, 'y2': y2, 'codX': codX, 'codY': codY, 'ordX': ordX, 'ordY': ordY };
}

function ScreenShottoPath() { //畫面截圖存檔
	var DateName = Math.floor(Date.now() / 1000);
	var QuizShotFilename = 'QuizShot' + DateName.toString() + '.png';
	var PicSharePath = '/storage/emulated/legacy/Pictures/StoneQuizPic';
	var QuizSavefile = PicSharePath + '/' + QuizShotFilename;
	var QuizShot = getScreenshot();
	saveImage(QuizShot, QuizSavefile);
	releaseImage(QuizShot);
}

function usingTimeString(startTime) {
	return '循環時間：' + (Date.now() - startTime) + 'ms';
}

//========================Game Function====================================

function FindStonesImages2() {   //石頭合成全動作
	if (!config.isRunning) return false;

	var StonesImages = []; // [] array,  {} object
	var StoneGridLv = [];

	var BagOpenCheckobj = convertImgcheck(956, 1403, 1022, 1424, 0.9, 'BagOpen_-.png');
	// rbm.log('BagOpenCheckobj:', BagOpenCheckobj);

	if (BagOpenCheckobj.result) {
		sleep(s); var stones = MergerStone2(stonelvmin, normalstonelvmax, dectcompraw1);
		sleep(s); if (stones.AllStone == 0 && stones.stonelv0 == 0) QuizRestart();
		sleep(s); if (stones.stonelv0 > 7) characterbubble2(8);
		sleep(s); if (stones.stonelv15 > 0 && stones.stonelv0 > 4) WhiteCrystalMake(300);
		sleep(s); RubyBox(5);
		sleep(s); AD_GetRuby(150);
		
		var OKbtnobj = convertImgcheck(440, 860, 640, 1800, 0.94, 'ok_button.png');
		if (OKbtnobj.result) { DIY_swipe(OKbtnobj.x2, OKbtnobj.y2, OKbtnobj.x2 + 20, OKbtnobj.y2 + 20, 25, 500); }
		} else {
		sleep(s); console.log('背包找不到，畫面檢查');
		sleep(s); AttackMode(1);   //檢查背包打開+自動攻擊
		sleep(s); QuizRestart();

		CheckImageTap(455, 575, 180, 60, 0.9, 'exitstone.png', 680, 1280, 1, 150, 0); //Exit Grow Stone Online
		CheckImageTap(490, 890, 100, 940, 0.9, 'ok_button.png', 1, 1, 1, 150, 1); //OK_Button
		CheckImageTap(600, 200, 470, 750, 0.9, 'closeboard.png', 1, 1, 1, 150, 1); //closeboard
		CheckImageTap(470, 1100, 133, 95, 0.9, 'Receiveaward.png', 1, 1, 1, 150, 1); //Receiveaward
		CheckImageTap(626, 868, 154, 51, 0.9, 'fastdig_ok.png', 430, 1130, 1, 150, 0);   //fast dig OK button
		CheckImageTap(299, 897, 207, 39, 0.9, 'UpdataFailed.png', 540, 1120, 1, 150, 0); //wifi or lan disconnected
		CheckImageTap(438, 825, 109, 42, 0.9, 'break_down.png', 650, 1150, 1, 150, 0);   //break down stone : cancle
		CheckImageTap(570, 1190, 205, 78, 0.9, 'dungeon_backtomini.png', 1, 1, 1, 150, 1); //dungeon_backtomini

		//CheckImageTap(441, 648, 113, 39, 0.8, 'Unlock_Stone.png', 540, 1210, 1, 150, 0); //stone lv_up : ok

		timetoRestarApp2(RestartApptimeset);
	}
}

function MergerStone2(intLv, finLv, mvMode) {  //石頭合成秘法2
	if (!config.isRunning) return false;
	console.log('石頭合成秘法2')

	var AllStone = 0; var stonelv15 = 0;
	var cdin = convXY(44, 1478, 44 + 900, 1478 + 330);
	var image = getScreenshotModify(cdin.x1, cdin.y1, cdin.codX, cdin.codY, cdin.ordX / 2, cdin.ordY / 2, 100);

	for (var k = intLv; k <= finLv; k++) {
		if (!config.isRunning) return false;

		var stonelvks = findImages(image, stonesImg[k], 0.87, 12, true);
		var stonelvk = Object.keys(stonelvks).length;
		AllStone = AllStone + stonelvk;

		if (k == intLv) {
			var stonelv0s = findImages(image, stonesImg[0], 0.95, 24, true);
			var stonelv0 = Object.keys(stonelv0s).length;
		}
		if (finLv < 15) {
			var stonelv15s = findImages(image, stonesImg[15], 0.87, 12, true);
			var stonelv15 = Object.keys(stonelv0s).length;
		} else if (k == 15) {
			var stonelv15 = Object.keys(stonelvks).length;
		}

		if (k == 15 && WhiteCrystalswitch) stonelvk = stonelvk - mooncompswitch;

		for (var m = 0; m <= stonelvk - 2; m = m + 2) {
			if (!config.isRunning) return false;

			var x0 = (46 + stonelvks[m].x * 2 + 40) * widthF;
			var y0 = (1479 + stonelvks[m].y * 2 + 40) * heightF;
			var x1 = (46 + stonelvks[m + 1].x * 2 + 40) * widthF;
			var y1 = (1479 + stonelvks[m + 1].y * 2 + 40) * heightF;

			var mvx0 = x0; var mvy0 = y0; var mvx1 = x1; var mvy1 = y1;
			if (x1 > x0) { mvx0 = x1; mvy0 = y1; mvx1 = x0; mvy1 = y0; };
			var randomtime = dectcompraw3 + getRandom(-100, 100);

			switch (mvMode) {
				case 1: DIY_swipe(mvx0, mvy0, mvx1, mvy1, MergermoveSW, randomtime); break;
				case 2: DIY_radomswipe1(mvx0, mvy0, mvx1, mvy1, MergermoveSW, randomtime); break;
				case 3: DIY_radomswipe2(mvx0, mvy0, mvx1, mvy1, MergermoveSW, randomtime); break;
			}

			ResterTimerSet = Date.now();
		}
		sleep(dectcompraw2);
	}
	releaseImage(image);
	sleep(dectcompraw4);
	rbm.log('石頭:', AllStone, ', 空格:', stonelv0, ', 彎月:', stonelv15, ', 留彎月:', mooncompswitch);
	return { 'AllStone': AllStone, 'stonelv0': stonelv0, 'stonelv15': stonelv15 };
}

function AttackMode(Mode) { //攻擊模式：1:自動攻擊  2:定點攻擊  3:手動模式
	if (!config.isRunning) return false;
	var modename = ['', '(1)自動攻擊', '(2)定點攻擊', '(3)手動模式'];
	console.log('攻擊模式切換:', modename[Mode]);

	BagMenu(0);
	var BagCloseobj = convertImgcheck(950, 1800, 1040, 1890, 0.85, 'BagClose_+.png');
	var BagClose = BagCloseobj.result;
	// rbm.log('BagClose:', BagClose);

	for (var i = 1; i <= 4; i++) {
		if (!config.isRunning) return false;
		if (!BagClose) return false;
		// console.log('BagClose Attack Mod:', Mode, 'i:', i);

		var cdin = convXY(130, 1660, 289, 1719);
		var image = getScreenshotModify(cdin.x1, cdin.y1, cdin.codX, cdin.codY, cdin.ordX, cdin.ordY, 100);
		var filename1 = config.stonePath + '/' + 'Attack-Auto.png';
		var filename2 = config.stonePath + '/' + 'Attack-Local.png';
		var filename3 = config.stonePath + '/' + 'Attack-Menu.png';

		var tImg1 = openImage(filename1);
		var tImg2 = openImage(filename2);
		var tImg3 = openImage(filename3);

		var target1 = findImage(image, tImg1);
		var target2 = findImage(image, tImg2);
		var target3 = findImage(image, tImg3);

		releaseImage(tImg1);
		releaseImage(tImg2);
		releaseImage(tImg3);
		releaseImage(image);

		// rbm.log('target1:', 'Auto', target1);
		// rbm.log('target2:', 'Local', target2);
		// rbm.log('target3:', 'Menu', target3);

		if (Mode == 1) {
			if (target1.score > 0.90) { var attackOK = 0; }
			else if (target2.score > 0.90) { var attackOK = 2; }
			else if (target3.score > 0.90) { var attackOK = 1; }
		} else if (Mode == 2) {
			if (target1.score > 0.90) { var attackOK = 1; }
			else if (target2.score > 0.90) { var attackOK = 0; }
			else if (target3.score > 0.90) { var attackOK = 2; }
		} else if (Mode == 3) {
			if (target1.score > 0.90) { var attackOK = 2; }
			else if (target2.score > 0.90) { var attackOK = 1; }
			else if (target3.score > 0.90) { var attackOK = 0; }
		}
		// console.log('attackOK:', attackOK);

		if (attackOK == 0) {
			DIY_swipe_conv(980, 1830, 980 + 30, 1830 + 30, 25, 2000);
			return true;
		} else if (attackOK == 1) {
			DIY_swipe_conv(130, 1660, 289, 1719, 20, 500);
		} else if (attackOK == 2) {
			DIY_swipe_conv(130, 1660, 289, 1719, 20, 500);
			DIY_swipe_conv(130, 1660, 289, 1719, 20, 500);
		}
		sleep(100);
	}

	return false;
}

function RubyBox(Timer) { //檢查寶箱拿鑽&看廣告拿鑽 main
	if (!config.isRunning) return false;
	if (Date.now() < RubyBoxTimer) { console.log('寶箱拿鑽等待:', (RubyBoxTimer - Date.now()) / 1000, '秒'); return false; }
	console.log('檢查寶箱/廣告拿寶石');

	for (var j = 0; j < 2; j++) {
		if (!config.isRunning) return false;
		// console.log('檢查寶箱/廣告拿寶石', 'j:', j);

		var RubyButtonCheck = converColorcheck(60, 1060 + j * 140, 57, 53, 160, 80)
		rbm.log('RubyButtonCheck:', RubyButtonCheck);
		if (RubyButtonCheck) {
			var RubyBoxpaobj = convertImgcheck(30, 1815, 480, 1890, 0.85, 'rubybox100pa3.png');
			// rbm.log('RubyBoxpa:', RubyBoxpaobj);

			var RubyBoxpa = false;
			if (RubyBoxpaobj.result) {
				var RubyBoxscoreD = RubyBoxpa1.score - RubyBoxpaobj.score;
				// console.log('RubyBoxscoreD:', RubyBoxscoreD);
				if (RubyBoxpaobj.x == RubyBoxpa1.x && RubyBoxscoreD >= 0 && RubyBoxscoreD < 0.01) {
					var RubyBoxpa = true;
				} else if (RubyBoxpaobj.score != RubyBoxpa1.score) {
					RubyBoxpa1 = RubyBoxpaobj;
					var RubyBoxpa = false;
				}
			}

			if (RubyBoxpa) {
				console.log('RubyBoxFull_Open')

				sleep(500);
				DIY_swipe_conv(62 + 30, 1065 + j * 140 + 30, 62, 1065 + j * 140, 25, 500);

				for (var i = 0; i < 40; i++) {
					if (!config.isRunning) return false;

					sleep(500);
					var intY1 = 1060 + j * 140;
					var intY2 = 1190 + j * 140;
					var rubyboxgetobj = convertImgcheck(220, intY1, 330, intY2, 0.85, 'rubyboxget1-1.png')
					var rubyboxget = rubyboxgetobj.result;
					// rbm.log('rubyboxgetobj:', rubyboxgetobj);
					// rbm.log('rubyboxget:', rubyboxget);

					if (rubyboxget) {
						sleep(500);
						DIY_swipe_conv(300 + 10, 1100 + j * 140 + 40, 300 - 35, 1100 + j * 140 - 10, 25, 500);
						DIY_swipe_conv(880, 1750, 660, 1750, 25, 500);

						rbm.log('RubyBoxget1.startT:', RubyBoxget1.startT, ', Timer:', Timer);
						RubyBoxTimer = Date.now() + (Timer + 110) * 1000;
						return true;
					}
				}

				RubyBoxClick = RubyBoxClick + 1;
			}
		}
		else {
			CheckImageTap(600, 200, 470, 750, 0.9, 'closeboard.png', 1, 1, 1, 150, 0); //closeboard
		}
	}

	RubyBoxTimer = Date.now() + Timer * 1000;
	return false;
}

function AD_GetRuby(Timer) { //看廣告拿寶石
	if (!config.isRunning) return false;
	if (Date.now() < AD_GetRubyTimer) { console.log('廣告拿鑽等待:', (AD_GetRubyTimer - Date.now()) / 1000, '秒'); return false; }
	if (!AD_GetRubyswitch) return false;
	console.log('看廣告拿寶石')

	for (var j = 0; j < 2; j++) {
		if (!config.isRunning) return false;

		var RubyButtonCheck = converColorcheck(60, 1060 + j * 140, 57, 53, 160, 80)
		// rbm.log('RubyButtonCheck:', RubyButtonCheck);
		if (RubyButtonCheck) {
			sleep(200)
			console.log('RubyButton OK');

			DIY_swipe_conv(62 + 30, 1065 + j * 140 + 30, 62, 1065 + j * 140, 25, 1500);
			DIY_swipe_conv(130 + 30, 1105 + j * 140 + 30, 130, 1105 + j * 140, 25, 1000);

			for (var i = 0; i < 4; i++) {
				if (!config.isRunning) return false;
				sleep(500);

				var ruby_5freeobj = convertImgcheck(512, 920, 647, 960, 0.90, 'ruby_5free.png');
				var ruby_5free = ruby_5freeobj.result;
				// rbm.log('ruby_5free:', ruby_5free);
				if (ruby_5free) {
					DIY_swipe_conv(420, 1120, 420 + 20, 1120 + 20, 25, 1000);
					QuizRestart();
					AD_watch(90);
				}

				var AD_nonobj = convertImgcheck(385, 935, 695, 1185, 0.90, 'AD_non.png');
				var AD_non = AD_nonobj.result;
				// rbm.log('AD_non:', AD_non);
				if (AD_non) {
					DIY_swipe_conv(880, 1750, 660, 1750, 25, 500);
					AD_GetRubyTimer = Date.now() + 600 * 1000;
					console.log('廣告不夠，延10分檢查')
					return false;
				}
			}

			DIY_swipe_conv(880, 1750, 660, 1750, 25, 500);
			AD_GetRubyTimer = AD_GetRubyTimer + Timer * 1000;
		}
	}
}

function AD_watch(ADtimer) {
	if (!config.isRunning) return false;
	console.log('自動看廣告檢查');

	for (var i = 0; i < ADtimer; i++) {
		if (!config.isRunning) return false;

		if (i > 4) {
			var Disconnectobj = convertImgcheck(935, 264, 990, 519, 0.90, 'main_fbmark.png');
			rbm.log('Disconnectobj:', Disconnectobj);
			if (Disconnectobj.result) { break; }

			var QuizTestobj = convertImgcheck(420, 450, 610, 570, 0.90, 'Quiz_Lable.png');
			rbm.log('QuizTestobj:', QuizTestobj);
			if (QuizTestobj.result) { break; }

			var OKbtnobj = convertImgcheck(440, 860, 640, 1800, 0.94, 'ok_button.png');
			rbm.log('OKbtnobj:', OKbtnobj);
			if (OKbtnobj.result) {
				DIY_swipe(OKbtnobj.x2, OKbtnobj.y2, OKbtnobj.x2 + 20, OKbtnobj.y2 + 20, 25, 500);
				break;
			}
		}

		if (i > 35) keycode('BACK', 100);
		if (i > 45) {
			console.log('廣告觀看計時 = ' + i, '回桌面，再回遊戲，切廣告')
			keycode('HOME', 300); sleep(5000);
			rbm.startApp(config.PackangName, config.LaunchActivityName);
			sleep(3000);
		}

		console.log('廣告觀看計時 = ' + i);
		sleep(1000)
	}
}

function QuizRestart() {   // 小測驗判斷與解答 main
	if (!config.isRunning) return false;
	console.log('小測驗檢查')

	for (var i = 0; i < 6; i++) {
		var QuizTestobj = convertImgcheck(420, 450, 610, 570, 0.90, 'Quiz_Lable.png');
		var QuizTest = QuizTestobj.result;
		// rbm.log('QuizTest:', QuizTest);
		if (QuizTest) { break; }
		sleep(150);
	}
	if (QuizTest) { QuizAnswer2(); }
}

function QuizAnswer2() {   //小測驗解答判斷1
	console.log('小測驗解答判斷');
	var targetCharacter1 = -1;
	var AltCharacterNum = 0;
	var Character = {
		'Attributes': [
			{ 'No': 0, 'Type': 'Non', 'MainFile': '', 'AltFile': '', 'x': 0, 'y': 0, 'Rank': '' },
			{ 'No': 1, 'Type': 'Bear', 'MainFile': 'Quiz_img/Quiz_Main_1_N.png', 'AltFile': '/Quiz_img/Quiz_Alt_1_N.png', 'x': '', 'y': '', 'Rank': '' },
			{ 'No': 2, 'Type': 'Rabb', 'MainFile': 'Quiz_img/Quiz_Main_2_N.png', 'AltFile': '/Quiz_img/Quiz_Alt_2_N.png', 'x': '', 'y': '', 'Rank': '' },
			{ 'No': 3, 'Type': 'LBoy', 'MainFile': 'Quiz_img/Quiz_Main_3_N.png', 'AltFile': '/Quiz_img/Quiz_Alt_3_N.png', 'x': '', 'y': '', 'Rank': '' },
			{ 'No': 4, 'Type': 'Blue', 'MainFile': 'Quiz_img/Quiz_Main_4_N.png', 'AltFile': '/Quiz_img/Quiz_Alt_4_N.png', 'x': '', 'y': '', 'Rank': '' },
			{ 'No': 5, 'Type': 'Kaka', 'MainFile': 'Quiz_img/Quiz_Main_5_N.png', 'AltFile': '/Quiz_img/Quiz_Alt_5_N.png', 'x': '', 'y': '', 'Rank': '' },
			{ 'No': 6, 'Type': 'GNja', 'MainFile': 'Quiz_img/Quiz_Main_6_N.png', 'AltFile': '/Quiz_img/Quiz_Alt_6_N.png', 'x': '', 'y': '', 'Rank': '' },
			{ 'No': 7, 'Type': 'LGir', 'MainFile': 'Quiz_img/Quiz_Main_7_N.png', 'AltFile': '/Quiz_img/Quiz_Alt_7_N.png', 'x': '', 'y': '', 'Rank': '' }
		],
	};
	//確認主要對象是誰
	console.log('確認主要對象是誰')
	Tag_Main:
	for (var i = 1; i < 8; i++) {
		var targetmathtimes1 = 0;
		// console.log('i=',i,' main check');
		for (var j = 0; j < 9; j++) {

			var targetPic1obj = convertImgcheck(470, 1060, 580, 1140, 0.90, Character.Attributes[i].MainFile);
			// rbm.log('targetPic1obj:', targetPic1obj);
			var targetPic1 = targetPic1obj.result;
			// rbm.log('targetPic1:', targetPic1);

			if (targetPic1obj.score < 0.85) break;

			if (targetPic1) {  //確認比對人物編號
				// rbm.log('QuizAnswer2 Main:', i, j, targetPic1obj)
				targetmathtimes1 = targetmathtimes1 + 1
			}
			if (targetmathtimes1 >= 1) {
				rbm.log(i, Character.Attributes[i].Type, '-Main-', targetPic1obj)
				targetCharacter1 = i;
				break Tag_Main;
			}
			sleep(100);
		}
	}


	console.log('解答區找人與x坐標儲存');
	if (targetCharacter1 >= 1) {

		for (var j = 0; j < 9; j++) {
			var cdin = convXY(120, 790, 650, 920);
			var image = getScreenshotModify(cdin.x1, cdin.y1, cdin.codX, cdin.codY, cdin.ordX, cdin.ordY, 100);

			for (var i = 1; i < 8; i++) {
				var targetmathtimes2 = 0;
				// console.log('Character', 'i:', i, ', j:', j);

				var filename = config.stonePath + Character.Attributes[i].AltFile;
				var tImg = openImage(filename);
				var targetPic1 = findImage(image, tImg);
				// if (targetPic1.score < 0.89) break;

				// rbm.log(i, j, Character.Attributes[i].Type, '-answer-', targetPic1);

				if (targetPic1 != undefined && targetPic1.score >= 0.925) {  //確認比對人物編號
					targetmathtimes2 = targetmathtimes2 + 1;
					rbm.log(i, j, Character.Attributes[i].Type, '-answer-', targetPic1)
				}
				if (targetmathtimes2 >= 1) {
					Character.Attributes[i].x = targetPic1.x;
					Character.Attributes[i].y = targetPic1.y;
					AltCharacterNum = AltCharacterNum + 1
					// break;
				}
			}
			releaseImage(image);
			releaseImage(tImg);
			sleep(100);
			console.log('AltCharacterNum:', AltCharacterNum);


			if (AltCharacterNum == 4) {
				Character.Attributes = Character.Attributes.sort(function (a, b) {
					return a.x < b.x ? 1 : -1;
				});

				for (var k = 0; k < 4; k++) {
					Character.Attributes[k].Rank = 4 - k
				}

				Character.Attributes = Character.Attributes.sort(function (a, b) {
					return a.No > b.No ? 1 : -1;
				});

				// for (var i = 1; i < 7; i++) {
				// 	rbm.log(Character.Attributes[i].No, Character.Attributes[i].Type, 'Rank='+Character.Attributes[i].Rank, 'x='+Character.Attributes[i].x, 'y='+Character.Attributes[i].y)
				// }

				console.log(Character.Attributes[targetCharacter1].Type, ' 是第 ', Character.Attributes[targetCharacter1].Rank, ' 個！');

				var cdin = convXY(120, 1370, 980, 1450);
				// rbm.log('QuizAnswer2  Rank:', cdin);

				var image = getScreenshotModify(cdin.x1, cdin.y1, cdin.codX, cdin.codY, cdin.ordX, cdin.ordY, 100);
				// rbm.log('QuizAnswer2  Rank:', cdin.x1, cdin.y1, cdin.codX, cdin.codY, cdin.ordX, cdin.ordY);

				var filename = config.stonePath + '/Quiz_Rank_' + Character.Attributes[targetCharacter1].Rank + '.png';
				var tImg = openImage(filename);
				var target = findImage(image, tImg);
				releaseImage(image);
				releaseImage(tImg);
				rbm.log('QuizAnswer2  Rank:', target)

				if (target != undefined && target.score > 0.90) { var Rank = true; }
				else { var Rank = false; }

				// console.log(120 + target.x, 1370 + target.y);
				// rbm.log(convXY(120 + target.x, 1370 + target.y))

				if (Rank) {
					// tapFor(120 + target.x, 1370 + target.y, 1, 60, 200, 5000);
					DIY_swipe_conv(120 + target.x, 1370 + target.y, 120 + target.x + 30, 1370 + target.y + 30, 10, 3000);
				}
				ResterTimerSet = Date.now()
				break;
			}
			else {
				console.log('人物坐標不符4個，重開!')
				sleep(500);
				// ScreenShottoPath();
				RubyBoxClick = 0;
				//RestartApp();
			}

			// Character.Attributes = Character.Attributes.sort(function (a, b) {
			// 	return a.x > b.x ? 1 : -1;
			// });

			// rbm.log(Character.Attributes[1]);
			// rbm.log(Character.Attributes[2]);
			// rbm.log(Character.Attributes[3]);
			// rbm.log(Character.Attributes[4]);
			// rbm.log(Character.Attributes[5]);
			// rbm.log(Character.Attributes[6]);
			// rbm.log(Character.Attributes[7]);
			// rbm.log(Character.Attributes[8]);
			// console.log('')
		}
		//console.log('AltCharacterNum = ' + AltCharacterNum)

		// return false;

	}
	else if (targetCharacter1 == -1) {
		sleep(500);
		// ScreenShottoPath();
		console.log('沒找到目標，不做答!')
	}
}

function timetoRestarApp2(CycleTimer) { //重開app，時間控制 main
	if (!config.isRunning || RestartAppswitch == 0) return false;
	console.log('設定時間-重開礦山2');

	var Timerremainder = (Date.now() - ResterTimerSet) / 1000;
	console.log(Timerremainder, '/', CycleTimer);

	var BACKtremainder = combinecount % 3
	if (Timerremainder <= 40) { sleep(1000); }
	else if (Timerremainder > 40) {
		var Disconnectobj = convertImgcheck(935, 264, 990, 519, 0.90, 'main_fbmark.png');
		var Disconnect = Disconnectobj.result;
		rbm.log('Disconnect:', Disconnect);

		if (Disconnect) { return false; }
		else { keycode('BACK', 100); }

		sleep(1000)
	}

	if (Timerremainder > CycleTimer) { RestartApp(120); }
}

function RestartApp(Timer) {  //礦山app重開
	console.log('礦山重開')
	keycode('HOME', 4000);
	sleep(1000)
	rbm.stopApp(config.PackangName); sleep(500)
	rbm.stopApp(config.PackangName); sleep(2000)
	//console.log(Date.now())
	rbm.startApp(config.PackangName, config.LaunchActivityName);
	for (var i = 1; i < Timer; i++) {
		if (!config.isRunning || RestartAppswitch == 0) {
			return false;
		}

		CheckImageTap(490, 1060, 100, 160, 0.9, 'ok_button.png', 1, 1, 1, 200, 1) //OK_Button
		CheckImageTap(470, 1100, 133, 95, 0.9, 'Receiveaward.png', 1, 1, 1, 200, 1) //Receiveaward
		CheckImageTap(600, 200, 470, 750, 0.9, 'closeboard.png', 1, 1, 1, 2, 1); //closeboard
		sleep(800);
		console.log(i, '秒');
		rbm.keepScreenshotPartial(956, 1803, 956 + 70, 1803 + 70); // x1, y1, x2, y2
		var BagClose = rbm.imageExists('BagClose_+.png', 0.95);
		rbm.releaseScreenshot();
		sleep(300)
		if (!config.isRunning || BagClose) {
			//console.log('確認包包 + 號，跳出迴圈')
			sleep(1000);
			break;
		}
		ResterTimerSet = Date.now()
	}
}

function characterbubble2(Timer) {  //角色對話泡包點擊 main
	if (!config.isRunning || Date.now() <= characterbubbleTimer) return false;
	if (!characterbubbleSwitch) return false;
	console.log('角色對話泡包點擊 2');

	var cdin = convXY(5, 255, 5 + 1070, 255 + 1645);
	var image = getScreenshotModify(cdin.x1, cdin.y1, cdin.codX, cdin.codY, cdin.ordX, cdin.ordY, 100);
	var filename = config.stonePath + '/characterbubble.png';
	var tImg = openImage(filename);
	var results = findImages(image, tImg, 0.8, 2, true);

	if (results != '') {
		for (var index in results) {
			var result = results[index];
			// rbm.log('bubble result:', result);
			var x1 = cdin.x1 + result.x;
			var y1 = cdin.y1 + result.y;

			// var cdin1 = convXY(x1, y1);
			var cdinobj = [
				{ 'x1': 640, 'y1': 175, 'x2': 1080, 'y2':  575 },
				{ 'x1':   0, 'y1': 730, 'x2':  141, 'y2': 1322 },
				{ 'x1': 565, 'y1': 560, 'x2':  600, 'y2':  590 }
			]
			console.log('找到人物:', 'x:', cdin1.x1, 'y:', cdin1.y1);

			var swipbubble = true
			for (var j = 0; j <= 2; j++) {
				if (x1 > cdinobj[j].x1 && x1 < cdinobj[j].x2 && y1 > cdinobj[j].y1 & y1 < cdinobj[j].y2) {
					swipbubble = false;
					console.log('bubble out:', j)
					break;
				}
			}
			if (swipbubble) { DIY_swipe(x1, y1, x1 + 20, y1 + 20, 25, 400); }
		}
	}
	sleep(100);
	releaseImage(image);
	releaseImage(tImg);

	characterbubbleTimer = Date.now() + Timer * 1000;
}

function BagMenu(menu) {  //0:關包包  1:開包包  2:強化   3:寵物  4:手藝  5:商店
	if (!config.isRunning) return false;
	var BagMenuLab = ['(0)關包包', '(1)開包包', '(2)強化', '(3)寵物', '(4)手藝', '(5)商店'];
	console.log('包包選單:', BagMenuLab[menu]);

	if (menu >= 2) {
		for (var i = 1; i <= 2; i++) {
			if (!config.isRunning) return false;

			var BagMenuobj = convertImgcheck(940, 1360, 1035, 1900, 0.90, 'BagMenu_' + 0 + '.png');
			// rbm.log('BagMenuobj: 0', BagMenuobj);
			if (BagMenuobj.result) break;

			var BagMenuobj = convertImgcheck(940, 1360, 1035, 1900, 0.90, 'BagMenu_' + 1 + '.png');
			// rbm.log('BagMenuobj: 1', BagMenuobj);
			if (BagMenuobj.result) {
				DIY_swipe(BagMenuobj.x2, BagMenuobj.y2, BagMenuobj.x2 + 20, BagMenuobj.y2 + 20, 25, 300);
			}
			sleep(200);
		}
	}

	for (var i = 1; i <= 2; i++) {
		if (!config.isRunning) return false;

		var BagMenuobj = convertImgcheck(940, 1360, 1035, 1900, 0.90, 'BagMenu_' + menu + '.png');
		// rbm.log('BagMenuobj:', menu, BagMenuobj);
		if (BagMenuobj.result) {
			DIY_swipe(BagMenuobj.x2, BagMenuobj.y2, BagMenuobj.x2 + 20, BagMenuobj.y2 + 20, 25, 300);
			if (i == 2) return true;
		}
		sleep(100);
	}
	sleep(1800);
	return false;
}

//=======================待轉換測試==================================

function WhiteCrystalMake(Timer) { //主：收工藝裝備，製作工藝
	if (!config.isRunning) return false;
	if (Date.now() < WhiteCrystalTimer) { console.log('工藝檢查等待:', (WhiteCrystalTimer - Date.now()) / 1000, '秒'); return false; }
	if (!WhiteCrystalswitch) return false;
	console.log('收工藝裝備，製作工藝')

	var attack3 = AttackMode(3);
	if (attack3) var menu4 = BagMenu(4);
	if (menu4) CraftsRecive();
	// console.log('attack3:', attack3);
	// console.log('menu4:', menu4);
	
	CraftsMake(CraftsMake1switch, CraftsMake2switch, CraftsMake3switch, CraftsMake4switch);

	var attack1 = AttackMode(1);
	WhiteCrystalTimer = Date.now() + Timer * 1000;

	return false;
}

function CraftsRecive() {  //收工藝品
	if (!config.isRunning) return false;
	// if (!Date.now() < WhiteCrystalTimer)  {console.log('收工藝等待:', (RubyBoxTimer-Date.now())/1000, '秒'); return false;}
	// if (!WhiteCrystalswitch) return false;
	console.log('收工藝品')

	//收裝備

	var cdin = convXY(110, 1100, 110 + 870, 1100 + 140);
	var image = getScreenshotModify(cdin.x1, cdin.y1, cdin.codX, cdin.codY, cdin.ordX, cdin.ordY, 100);
	var filename = config.stonePath + '/craftsokopen.png';
	var tImg = openImage(filename);
	var results = findImages(image, tImg, 0.90, 4, true);
	releaseImage(image);
	releaseImage(tImg);

	if (results != '') {
		results = results.sort(function (a, b) { return a.x > b.x ? 1 : -1; });

		for (var index in results) {
			var result = results[index];
			// rbm.log('bubble result:', result);
			var x1 = 110 + result.x + 0
			var y1 = 1100 + result.y + 0

			var cdin1 = convXY(x1, y1);
			console.log('可收工藝:', 'x:', cdin1.x1, 'y:', cdin1.y1);

			DIY_swipe_conv(x1, y1, x1 + 20, y1 + 20, 25, 3000);

			for (var j = 1; j <= 6; j++) {
				var OKbtnobj = convertImgcheck(490, 860, 590, 1800, 0.94, 'ok_button.png');
				rbm.log('OKbtnobj:', OKbtnobj);
				if (OKbtnobj.result) { DIY_swipe(OKbtnobj.x2, OKbtnobj.y2, OKbtnobj.x2 + 20, OKbtnobj.y2 + 20, 25, 2500); }
				sleep(300);
			}
		}
	} else if (results == '') { console.log('沒有可收工藝'); return false; }
}

function CraftsMake(item1, item2, item3, item4) {
	if (!config.isRunning) return false;
	console.log('開始工藝製作');

	
	var TableX = [];
	for (var k = 1; k <= 5; k++) { TableX[k] = 58 + 241 * (k - 1) };
	// rbm.log(TableX);
	var itemID = ['', item1, item2, item3, item4];
	
	var cdin = convXY(55, 940, 55 + 1020, 940 + 200);
	var image = getScreenshotModify(cdin.x1, cdin.y1, cdin.codX, cdin.codY, cdin.ordX, cdin.ordY, 100);
	console.log(cdin.x1, cdin.y1, cdin.codX, cdin.codY, cdin.ordX, cdin.ordY, 100);
	var filename  = config.stonePath + '/CraftsMake.png';
	var tImg  = openImage( filename);
	var results  = findImages( image,  tImg, 0.80, 4, true);
	rbm.log('results:', results)
	rbm.log('')

	if (results != '') {
		results = results.sort(function (a, b) { return a.x > b.x ? 1 : -1; });

		for (var index in results) {
			var result = results[index];
			rbm.log('restlt:', index, result);

			var x1 =  (55 + result.x) * widthF;
			var y1 =  (940 + result.y) * heightF;
			for (var i = 1; i <=4; i++) {
				if (x1 > TableX[i] && x1 < TableX[i + 1]) {
					DIY_swipe(x1, y1, x1 + 20, y1, 15, 3000);
					console.log('第', i, '格, 開始找', itemID[i]);
					CraftsMakeSelect(itemID[i]);
					break;
				}
			}
		}
	}
	sleep(100);
	releaseImage(image);
	releaseImage(tImg);
}

function CraftsMakeSelect(CraftsSelect) { //工藝品選擇 1.太陽石, 2.高級卡, 3.中級卡, 4.初級卡, 5.鳳凰, 6.背包卷, 7.帽子卷, 8.裝備卷, 9.太陽水晶, 10.閃亮水晶, 11.白水晶
	if (!config.isRunning) return false;
	if (CraftsSelect == 0) return false;

	var itemEN = new Array('', 'Solar Stone Craft[Rare~Unique]', ' Advanced miracle Card', ' Middle Miracle Card', ' Beginner Miracle Card', 'Phoenix Craft[normal~Unique]', ' Expanding Bag Scroll', ' Hat Craft', ' Armor Craft', ' Energy of Solar Craft', ' Shining Item Crystal Craft', ' Crystal Craft(Crescent)');
	var itemTC = new Array('', '[手藝]太陽石【稀有~獨特】', '高級奇蹟卡工藝', '中級奇蹟卡工藝', '初級奇蹟卡工藝', '白色鳳凰', 'Expanding Bag Scroll', '[初級]帽子工藝', '裝備手藝', 'Energy of Solar', '[手藝]閃亮水晶', '[手藝]白水晶');
	var itemTCnew = new Array('', '1.太陽石', '2.高級卡', '3.中級卡', '4.初級卡', '5.鳳凰', '6.背包卷', '7.帽子卷', '8.裝備卷', '9.太陽水晶', '10.閃亮水晶', '11.白水晶');
  var outnumlist = new Array('', 0, 1, 2, 5);

	// var CraftItem = '/craftlist_img/craftlist_' + CraftsSelect + '.png';
	console.log('選擇工藝品:', itemTCnew[CraftsSelect]);

	for (var j = 0; j < 7; j++) {
		if (!config.isRunning) return false;

		var cdin = convXY(55, 340, 735, 1330);
		var image = getScreenshotModify(cdin.x1, cdin.y1, cdin.codX, cdin.codY, cdin.ordX, cdin.ordY, 100);
		var filename = config.stonePath + '/' + 'craftlist_img/craftlist_' + CraftsSelect + '.png';
		var tImg = openImage(filename);
		var target = findImage(image, tImg);
	
		if (target != undefined && target.score > 0.73) {
			target.x2 = Math.round((55 + target.x)*widthF);
			target.y2 = Math.round((340 + target.y)*heightF);
			target.result = true;
		}	else { target.result = false; }
		var Crafsobj = target;
		rbm.log('Crafsobj:', CraftsSelect, Crafsobj);
		
		if (Crafsobj.result) {
			// console.log('Find:', itemTCnew[CraftsSelect]);

			DIY_swipe(Crafsobj.x2 + 25, Crafsobj.y2 + 20, Crafsobj.x2 + 20, Crafsobj.y2 + 20, 20, 1200);
			console.log('Tap Found:', itemTCnew[CraftsSelect]);

			var craftsbtnOKobj = convertImgcheck(280, 1050, 800, 1840, 0.85, 'craftsbuttonOK.png');
			// rbm.log('craftsbtnOKobj:', craftsbtnOKobj);
			if (craftsbtnOKobj.result) {
				DIY_swipe(craftsbtnOKobj.x2, craftsbtnOKobj.y2, craftsbtnOKobj.x2 + 5, craftsbtnOKobj.y2, 15, 2500);
				break;
			}

			
		// keycode('BACK', 500); sleep(500);
		// CheckImageTap(600, 200, 470, 750, 0.9, 'closeboard.png', 1, 1, 1, 150, 1); //closeboard
		// break;

		}	else {

			for (var n = 1; n <= 4; n++) {
				var filename = config.stonePath + '/' + 'outcrafteslist_' + outnumlist[n] + '.png';
				var tImg = openImage(filename);
				var target = findImage(image, tImg);
				rbm.log('outnum:', target);

				var swipelist = true;
				if (target != undefined && target.score > 0.80) {
					console.log('Not Found:', itemTCnew[CraftsSelect]);
					swipelist = false;
					break;
				}
			}
			
			if (swipelist) DIY_swipe_conv(980, 1020, 980, 530, 200, 800);
		}
		releaseImage(tImg);
		releaseImage(image);

		sleep(1000);
		ResterTimerSet = Date.now();

	}
	return false;
}

function rain_fastdig() { //雨天加速挖 main
	if (!config.isRunning || rain_fastdigswitch == 0 || eightdragonswitch == 1) return false;
	console.log('加速挖礦檢查')

	if (rain_fastdigswitch == 1) {
		rbm.keepScreenshotPartial(655, 120, 695, 340);
		var targetPic1 = rbm.imageExists('weather_rain.png', 0.95);
		rbm.releaseScreenshot();
	}
	else if (rain_fastdigswitch == 2) {
		var targetPic1 = 1;
	}
	else {
		var targetPic1 = 0;
	}

	if (targetPic1) {
		sleep(10)
		//console.log('click_fastdig')
		rbm.keepScreenshotPartial(33, 880 - 150, 121, 1137);
		rbm.imageClick('fastdig.png', 0.88);
		rbm.releaseScreenshot();
		sleep(2000);
		CheckImageTap(626, 868, 154, 51, 0.95, 'fastdig_ok.png', 430, 1130, 1, 200, 0);   //fast dig OK button
	}
}

function characterbubble2(Timer) {  //角色對話泡包點擊 main
	if (!config.isRunning || Date.now() <= characterbubbleTimer) return false;
	if (!characterbubbleSwitch) return false;
	console.log('角色對話泡包點擊 2');

	var cdin = convXY(5, 255, 5 + 1070, 255 + 1645);
	var image = getScreenshotModify(cdin.x1, cdin.y1, cdin.codX, cdin.codY, cdin.ordX, cdin.ordY, 100);
	var filename1 = config.stonePath + '/characterbubble.png';
	var tImg1 = openImage(filename1);
	var results1 = findImages(image, tImg1, 0.8, 2, true);

	if (results1 != '') {
		for (var index in results1) {
			var result1 = results1[index];
			// rbm.log('bubble result1:', result1);
			var x1 = 5 + result1.x + 0
			var y1 = 255 + result1.y + 0

			var cdin1 = convXY(x1, y1);
			var cdinobj = [
				{ 'x1': 640, 'y1': 175, 'x2': 1080, 'y2': 575 },
				{ 'x1': 0, 'y1': 730, 'x2': 141, 'y2': 1322 },
				{ 'x1': 565, 'y1': 560, 'x2': 600, 'y2': 590 }
			]
			console.log('找到人物:', 'x:', cdin1.x1, 'y:', cdin1.y1);

			var swipbubble = true
			for (var j = 0; j <= 2; j++) {
				if (cdin1.x1 > cdinobj[j].x1 && cdin1.x1 < cdinobj[j].x2 && cdin1.y1 > cdinobj[j].y1 & cdin1.y1 < cdinobj[j].y2) {
					swipbubble = false;
					console.log('bubble out:', j)
					break;
				}
			}
			if (swipbubble) { DIY_swipe_conv(x1, y1, x1 + 20, y1 + 20, 25, 400); }
		}
	}
	sleep(100);
	releaseImage(image);
	releaseImage(tImg1);

	characterbubbleTimer = Date.now() + Timer * 1000;
}

function friendheartfind() {  //朋友送愛心尋找 藍→黃
	var stoneDir = config.stoneDir;
	var StonesPath = getStoragePath() + '/' + stoneDir;
	var image = getScreenshotModify(640, 940, 95, 870, 95, 870, 90);

	var filename1 = StonesPath + '/friendheart_bule.png';
	var tImg1 = openImage(filename1);
	var results1 = findImages(image, tImg1, 0.9, 5, true);
	for (var index in results1) {
		var result1 = results1[index];
		if (!config.isRunning) {
			releaseImage(tImg1);
			releaseImage(image);
			return false;
		}
		//rbm.log('buleheart = ',result1.x, result1.y, result1.score)

		var x1 = 640 + result1.x + 40
		var y1 = 940 + result1.y + 40
		tap(x1, y1)
		sleep(800)
	}
	releaseImage(tImg1);
	sleep(400)

	var filename2 = StonesPath + '/friendheart_yellow.png';
	var tImg2 = openImage(filename2);
	var results2 = findImages(image, tImg2, 0.9, 5, true);
	for (var index in results2) {
		var result2 = results2[index];
		if (!config.isRunning) {
			releaseImage(tImg2);
			releaseImage(image);
			return false;
		}
		//rbm.log('yellowheart = ',result2.x, result2.y, result2.score)

		var x2 = 640 + result2.x + 40
		var y2 = 940 + result2.y + 40
		tap(x2, y2)
		sleep(800)
	}
	releaseImage(tImg2);
	releaseImage(image);
}

function frindheartOK() { //朋友送愛心完成或異常確認
	if (!config.isRunning) return false;

	rbm.keepScreenshotPartial(460, 720, 580, 780); // x1, y1, x2, y2
	var CheckImg1 = rbm.imageExists('friendheartok.png', 0.98);
	rbm.releaseScreenshot();
	if (CheckImg1) {
		friendheartswitch = friendheartswitch + 1
		console.log('朋友送愛心 : 0/30')
		return true;
	}

	rbm.keepScreenshotPartial(160, 620, 260, 680); // x1, y1, x2, y2
	var checkImg2 = rbm.imageExists('friendlist.png', 0.98);
	rbm.releaseScreenshot();
	if (!checkImg2) {
		console.log('朋友送心-選單無法判斷')
		return true;
	}
}

function friendheartcheck(Timer) { //朋友送愛心 main
	var friendheartTD = (Date.now() - friendheartTimer) / 1000
	//console.log('friend_heart_check','friendheartswitch='+friendheartswitch,'friendheartTD='+friendheartTD)
	if (!config.isRunning || friendheartswitch == 0) return false;
	console.log('朋友送愛心檢查');

	if (friendheartswitch > 0 && friendheartswitch < 3 && Date.now() > friendheartTimer) {
		sleep(2000)
		tap(700, 480, 100); sleep(2000)
		tap(700, 300, 100); sleep(2000)
		tap(540, 550, 100); sleep(4000)
		for (var i = 0; i < 18; i++) {

			if (frindheartOK() || !config.isRunning) {
				break;
			}
			else {
				tap(860, 890)
				tap(860, 890)
				friendheartfind();
				xy_swipe(105, 1790, 105, 1250, 25)
			}
		}
		//sleep(2000)

		keycode('BACK', 4000);
		//tap(1000, 530); sleep(1000)
		friendheartTimer = Date.now() + Timer * 1000
	}
	else if (friendheartswitch > 0 && friendheartTD > 3600) {
		friendheartswitch = 1
	}
	console.log('朋友送愛心，檢查完畢')
}

function AreaChangelistclick() {
	if (!config.isRunning) return false;

	for (var i = 0; i < 14; i++) {
		rbm.keepScreenshotPartial(1000, 100, 1080, 360); //找設定齒輪，點擊切換區域
		var targetPic3 = rbm.findImage('stone_setting.png', 0.8);
		rbm.releaseScreenshot();
		//rbm.log(targetPic3)
		if (targetPic3 != undefined && targetPic3.score >= 0.8) {
			tapx = targetPic3.x - 30;
			tapy = targetPic3.y + 10;
			tap(tapx, tapy, 200); sleep(200);
		}

		rbm.keepScreenshotPartial(390, 360, 700, 420); //出現切換區域選單跳出檢查
		var targetPic4 = rbm.imageExists('Travel_channels_lable.png', 0.8);
		rbm.releaseScreenshot();
		if (targetPic4) {
			sleep(300);
			break;
		}

		if (!config.isRunning) return false;
		sleep(300);
	}
}

function AreaChange(AreaID, Timer) {  //區域切換：AreaID= 1:頻道  2:狩獵區  3:副本  4:城鎮  5:強制回礦區  6:切換少人頻道
	if (!config.isRunning) return false;

	var AreaArray = new Array('---', '頻道', '狩獵區', '副本', '城鎮', '強制回礦區', '切換少人頻道')
	console.log('區域切換(' + AreaArray[AreaID] + ' , ' + Timer + ')')
	var travelareaX = 240 + (AreaID - 1) * 216
	//console.log('選擇 ' + AreaArray[AreaID])

	if (AreaID == 1 && Date.now() > AreaTimer1) {         //頻道
		AreaChangelistclick();
		tap(travelareaX, 460, 20); sleep(500); //點擊 頻道

		for (var i = 0; i < 8; i++) {

			rbm.keepScreenshotPartial(120, 360, 400, 430); // x1, y1, x2, y2
			var target1 = rbm.imageExists('Travel_channels_lessperson_no.png', 0.90);
			var target2 = rbm.imageExists('Travel_channels_lessperson_ok.png', 0.90);
			//console.log(target1, target2, rbm.imageClick('Travel_channels_lessperson_check.png', 0.90))
			if (target1) {
				rbm.imageClick('Travel_channels_lessperson_check.png', 0.90);
			}
			else if (target2) {
				tap(260, 580, 200);
				sleep(300);
				break;
			}
			rbm.releaseScreenshot();
			select(300);
		}

		AreaTimer1 = Date.now() + Timer * 1000
	}
	else if (AreaID == 2 && Date.now() > AreaTimer2) {   //狩獵區
		AreaChangelistclick();
		tap(travelareaX, 460, 20); sleep(1000); //點擊 狩獵區

		AreaTimer2 = Date.now() + Timer * 1000
	}
	else if (AreaID == 3 && Date.now() > AreaTimer3) {  //副本
		AreaChangelistclick();
		tap(travelareaX, 460, 20); sleep(1000); //點擊 副本


		AreaTimer3 = Date.now() + Timer * 1000
	}
	else if (AreaID == 4 && Date.now() > AreaTimer4) {  //城鎮
		AreaChangelistclick();
		tap(travelareaX, 460, 20); sleep(1000); //點擊 城鎮

		AreaTimer4 = Date.now() + Timer * 1000
	}
	else if (AreaID == 5 && Date.now() > AreaTimer5) {  //強制回礦區
		AreaChangelistclick();
		tap(456, 460, 20); sleep(1000);//點擊 狩獵區頁籤
		tap(320, 620, 20); sleep(4000); //點擊 礦洞

		AttackMode(1); //檢查背包打開/自動攻擊
		sleep(1000);
		AreaTimer5 = Date.now() + Timer * 1000
	}
	else if (AreaID == 6 && Date.now() > AreaTimer6 && CHLpersonswitch == 1) {  //切換少人頻道
		AreaChangelistclick();
		tap(240, 460, 20); sleep(500); //點擊 頻道

		for (var i = 0; i < 15; i++) {

			rbm.keepScreenshotPartial(130, 460, 200, 520); // x1, y1, x2, y2  //是否在打圖區判斷 ok
			var target1 = rbm.imageExists('Travel_channels_lessperson_mapcheck1.png', 0.90);
			var target2 = rbm.imageExists('Travel_channels_lessperson_mapcheck2.png', 0.90);
			rbm.releaseScreenshot();
			if (target1) {
				rbm.keepScreenshotPartial(120, 360, 400, 430); // x1, y1, x2, y2 //判斷是否有打勾 ok
				var target3 = rbm.imageExists('Travel_channels_lessperson_no.png', 0.97);
				var target4 = rbm.imageExists('Travel_channels_lessperson_ok.png', 0.97);
				//console.log(target3, target4, rbm.imageClick('Travel_channels_lessperson_check.png', 0.90))
				if (target3) {
					rbm.imageClick('Travel_channels_lessperson_check.png', 0.97);
				}
				else if (target4) {
					tap(260, 580, 200);
					sleep(300);
					rbm.releaseScreenshot();
					break;
				}
				rbm.releaseScreenshot();
			}
			else if (target2) {
				keycode('BACK', 40);
				break;
			}

			sleep(300);
		}

		AreaTimer6 = Date.now() + Timer * 1000
	}
}

function Map_Check(MapFc, Type) { // MapFc: 1打獵圖, 2礦區； Type: 1點擊圖示
	rbm.keepScreenshotPartial(640, 180, 750, 450);
	var targetPic1 = rbm.imageExists('Map_hunter.png', 0.70); // 確認打獵區地圖
	var targetPic2 = rbm.imageExists('Map_Mining.png', 0.70); // 確認在礦區

	if (MapFc == 1 && targetPic1) {
		if (Type == 1) {
			rbm.imageClick('Map_hunter.png', 0.70); //點擊到礦區
			rbm.imageClick('Map_hunter.png', 0.70); //點擊到礦區
		}
		rbm.releaseScreenshot();
		console.log('在打獵');
		return true;
	}
	else if (MapFc == 2 && targetPic2) {
		if (Type == 1) {
			rbm.imageClick('Map_Mining.png', 0.70);  //點擊到打獵選單
			rbm.imageClick('Map_Mining.png', 0.70);  //點擊到打獵選單
		}
		rbm.releaseScreenshot();
		console.log('在礦區');
		return true;
	}
}

function AD_Goldx2(Timer) {  //兩倍金幣 main
	if (!config.isRunning || AD_Goldx2switch == 0) return false;
	console.log('看廣告 金幣x2 & 自動重生')

	var AD_Goldx2TD = (Date.now() - AD_Goldx2Timer) / 1000

	if (Date.now() > AD_Goldx2Timer) {
		rbm.keepScreenshotPartial(20, 870, 165, 1355); // x1, y1, x2, y2
		var checkImg1 = rbm.imageExists('goldx2_button.png', 0.80);
		rbm.releaseScreenshot();
		if (checkImg1) {
			console.log('廣告金幣x2')
			for (var i = 0; i <= 20; i++) {
				CheckImageTap(20, 870, 145, 485, 0.80, 'goldx2_button.png', 1, 1, 1, 200, 1);   //Goldx2_Button
				CheckImageTap(505, 915, 290, 50, 0.80, 'goldx2_OK.png', 430, 1130, 1, 200, 0);   //Goldx2_OK

				rbm.keepScreenshotPartial(385, 935, 695, 1185); // x1, y1, x2, y2
				var checkImg3 = rbm.imageExists('AD_non.png', 0.95);
				rbm.releaseScreenshot();
				if (checkImg3 || !config.isRunning) {
					AD_Goldx2Timer = Date.now() + 600 * 1000
					console.log('金幣x2-廣告不夠，延10分檢查')
					return false;
				}

				sleep(300);
			}
			AD_watch(120);
		}
		else {
			rbm.keepScreenshotPartial(320, 1090, 500, 1190); // x1, y1, x2, y2
			var checkImg2 = rbm.imageExists('Rebirth_ADWatch.png', 0.80);
			rbm.releaseScreenshot();
			if (checkImg2) {
				console.log('廣告重生')
				for (var i = 0; i <= 10; i++) {
					CheckImageTap(320, 1090, 180, 100, 0.80, 'Rebirth_ADWatch.png', 1, 1, 1, 200, 1);   //Rebirth_ADWatch.png


					rbm.keepScreenshotPartial(385, 935, 695, 1185); // x1, y1, x2, y2
					var checkImg3 = rbm.imageExists('AD_non.png', 0.95);
					rbm.releaseScreenshot();
					if (checkImg3 || !config.isRunning) {
						AD_Goldx2Timer = Date.now() + 600 * 1000
						console.log('重生buffer-廣告不夠，延10分檢查')
						return false;
					}
					sleep(300);
				}
			}
		}
		AD_Goldx2Timer = Date.now() + Timer * 1000
	}
}

function Dougeon_WFStone(Timer) { //打地下城
	if (!config.isRunning || DougeonWFStoneswitch == 0) return false;
	console.log('打地下城檢查')

	var Map_Check_FC = Map_Check(2, 0);  // MapFc: 1打獵圖, 2礦區； Type: 1點擊圖示
	//if (Map_Check_FC && Date.now() > Dougeon_WFStoneTimer) {
	if (DougeonWFStoneswitch > 0 && Date.now() > Dougeon_WFStoneTimer) {
		sleep(2000)
		AreaChange(3, 100)

		Tag_Ticket:
		for (var i = 0; i < 10; i++) {    // 確認票數，選擇地城，開房間
			if (!config.isRunning || DougeonWFStoneswitch == 0) {
				return false;
			}

			deadcheck(50);

			rbm.keepScreenshotPartial(410, 550, 735, 600); // x1, y1, x2, y2
			for (var j = 10; j >= 0; j--) {  //檢查有幾張票，確認打不打
				if (!config.isRunning || DougeonWFStoneswitch == 0) {
					return false;
				}
				var Targetimage = rbm.imageExists('Ticket_' + j + '.png', 0.99);
				//rbm.log('j = ' + j ,rbm.findImage('Ticket_' + j + '.png', 0.99));
				if (Targetimage) {
					var dungeonbattletimes = j - DungeonTicketsset;
					if (j == -1) {
						dungeonbattletimes = 2
					}
					if (dungeonbattletimes <= 0) {
						console.log('門票：' + j + '張, 到設定：' + DungeonTicketsset + '，跳出')
						rbm.releaseScreenshot();
						CheckImageTap(600, 200, 470, 750, 0.9, 'closeboard.png', 1, 1, 1, 2, 1); //closeboard

						ResterTimerSet = Date.now()
						Dougeon_WFStoneTimer = Date.now() + Timer * 1000
						return false;
					}
					else if (dungeonbattletimes > 0) {
						console.log('門票：' + j + '張, 未到設定：' + DungeonTicketsset + '，開打')
						rbm.releaseScreenshot();

						if (DougeonWFStoneswitch == 1) {
							Dougeon_WFFight(dungeonbattletimes);
						}
						else if (DougeonWFStoneswitch >= 2) {
							Dougeon_500k1mFight()
							break Tag_Ticket;
						}
					}
				}
			}
			rbm.releaseScreenshot();
			sleep(400)

			if (i == 6) {
				console.log('找不到票，無法比對，跳出打副本');
				keycode('BACK', 300);
				ResterTimerSet = Date.now()
				Dougeon_WFStoneTimer = Date.now() + Timer * 1000
				return false;
			}
		}

		Dougeon_WFStoneTimer = Date.now() + Timer * 1000
	}
}

function Dougeon_WFFight(dbtimes) {  //地城 打水火石

	tap(810, 1450, 120);
	tap(810, 1630, 120);
	tap(810, 1450, 120);
	tap(810, 1630, 120);

	for (var i = 0; i < 40; i++) {
		sleep(250);
		rbm.keepScreenshotPartial(720, 540, 950, 680); // x1, y1, x2, y2
		var target = rbm.imageExists('dungeon_addroom.png', 0.90);
		rbm.releaseScreenshot();
		var dungeonroomY = 630 + (DungeonRoomset - 1) * 139
		if (target) {
			tap(840, dungeonroomY, 120);
			tap(840, dungeonroomY, 120);
			rbm.releaseScreenshot();
			break;
		}
	}

	for (var i = 0; i < 20; i++) {   //開房間，設密碼，準備單P
		if (!config.isRunning || DougeonWFStoneswitch == 0) {
			return false;
		}
		rbm.keepScreenshotPartial(320, 870, 770, 990); // x1, y1, x2, y2
		var target1 = rbm.imageExists('dungeon_roompw_null.png', 0.90);
		var target2 = rbm.imageExists('dungeon_roompw_7878.png', 0.90);
		rbm.releaseScreenshot();
		if (target1) {                   //確認密碼空的，開始設定密碼
			console.log('確認密碼空的，開始設定密碼')
			tap(780, 930, 50); sleep(200);
			tap(720, 930, 50); sleep(1000);
			keycode(14, 50); sleep(200);
			keycode(15, 50); sleep(200);
			keycode(14, 50); sleep(200);
			keycode(15, 50); sleep(200);
			tap(780, 930, 50); sleep(200);
		}
		else if (target2) {              //確認密碼7878，按確認開房間
			console.log('確認密碼7878，按確認開房間')
			tap(410, 1200, 50); sleep(200);
			tap(410, 1200, 50); sleep(200);
			tap(410, 1200, 50); sleep(200);
			break;
		}
		else {                          //密碼異常，清掉密碼重來
			console.log('密碼異常，清掉密碼重來')
			tap(780, 930, 50); sleep(200);
			tap(720, 930, 50); sleep(200);
			keycode('DEL', 50); sleep(200);
			tap(780, 930, 50); sleep(200);
		}
		sleep(300)
		ResterTimerSet = Date.now()
	}

	var ticketovercount = 0;
	var ticketusedcount = 0;
	for (var i = 0; i < 150; i++) {   //檢查進入地城 空地區 左邊圖示
		if (!config.isRunning || DougeonWFStoneswitch == 0) {
			return false;
		}

		rbm.keepScreenshotPartial(35, 755, 149, 1330); // x1, y1, x2, y2 //
		var target1 = rbm.imageExists('dungeon_play.png', 0.90); //左邊 PLAY 是否存在
		if (ticketusedcount < dbtimes && ticketovercount < 8) {
			rbm.imageClick('dungeon_play.png', 0.90)  //左邊 PLAY 開幹BOSS
			rbm.imageClick('dungeon_skip.png', 0.90)  //左邊 SKIP 跳過廢話

			var target2 = rbm.imageExists('dungeon_ticket_over.png', 0.90); //左邊 沒票
			if (target2) {
				ticketovercount = ticketovercount + 1
				console.log('ticketovercount= ' + ticketovercount)
			}
			else {
				ticketovercount = 0
			}
			rbm.releaseScreenshot();

			AttackMode(1); //檢查背包打開/自動攻擊

			rbm.keepScreenshotPartial(490, 1060, 590, 1220); // x1, y1, x2, y2
			var target3 = rbm.imageExists('ok_button.png', 0.90);
			if (target3) {                   //確認領石頭
				rbm.imageClick('ok_button.png', 0.90)
				ticketusedcount = ticketusedcount + 1
				console.log('ticketusedcount= ' + ticketusedcount)
			}
			rbm.releaseScreenshot();
		}
		else if (target1) {
			rbm.releaseScreenshot();
			if (ticketovercount >= 8 || ticketusedcount >= dbtimes) {
				console.log('沒票了 OR 票數達到了');
				Map_Check(1, 1);
				break;
			}
		}

		ResterTimerSet = Date.now()
	}
}

function Dougeon_500k1mFight() { //地城 打500K or 1M
	if (!config.isRunning) return false;
	console.log('地城 500K or 1M');

	for (var i = 0; i < 5; i++) {
		deadcheck(50);

		xy_swipe(300, 1740, 300, 1320, 25); //移動單次檢查基礎 380向上
		sleep(500)

		rbm.keepScreenshotPartial(130, 620, 265, 1770);
		var targetPic2 = rbm.findImage('underground_500k_1m.png', 0.90);
		rbm.releaseScreenshot();

		if (targetPic2 != undefined && targetPic2.score > 0.90) {  //確認找到 500k & 1m 地下城
			var x1 = targetPic2.x;
			var y1 = targetPic2.y + 200 * (DougeonWFStoneswitch - 2);

			tap(x1, y1, 200); sleep(200);
			tap(x1, y1, 200); sleep(200);
			tap(x1, y1, 200); sleep(200);

			break;
		}
	}

}

function deadcheck(checktimer) {
	if (!config.isRunning) return false;
	console.log('吃土檢查！');


	rbm.keepScreenshotPartial(260, 1080, 830, 1220);
	var targetPic2 = rbm.imageExists('deadcheckwait.png', 0.95);
	rbm.releaseScreenshot();

	if (targetPic2) {

		var deadcheckf = 0;
		for (var j = 0; j < checktimer; j++) {
			if (!config.isRunning) return false;

			rbm.keepScreenshotPartial(260, 1080, 830, 1220);
			var targetPic1 = rbm.imageExists('deadcheckwait.png', 0.95);
			rbm.releaseScreenshot();

			if (targetPic1) {  //確認找到人死的證據
				console.log('穢土轉生結印 ', j / 2, ' 秒')
				sleep(500);
				deadcheckf = 0;
			}
			else if (!targetPic1 & deadcheckf < 2) {
				deadcheckf = deadcheckf + 1;
			}
			else if (!targetPic1 & deadcheckf >= 2) {
				console.log('吃土結束，穢土轉生完成')
				break;
			}
		}
	}
}

function dungeonbackcheck() {
	if (!config.isRunning) return false;
	console.log('地城回礦區檢查')

	rbm.keepScreenshotPartial(35, 755, 149, 1330); // x1, y1, x2, y2 //
	var target1 = rbm.imageExists('dungeon_play.png', 0.90); //左邊 PLAY
	var target2 = rbm.imageExists('dungeon_ticket_over.png', 0.90); //左邊 沒票
	rbm.releaseScreenshot();

	if (target1 || target2) {
		AreaTimer5 = Date.now();  //頻道
		sleep(300);
		AreaChange(5, 5);  //區域切換：AreaID= 5:強制回礦區
	}
}

function EDTravel_field1() {  //8龍，礦區切換至打圖，彎月數控制
	if (!config.isRunning) return false;
	console.log('8龍，礦區切換至打圖1')

	if (eightdragonchangswitch == 1) {
		AreaChange(2, 0); // Change to Field

		for (var i = 0; i < 8; i++) {
			xy_swipe(200, 1700, 200, 800, 25)
			sleep(300)
			if (i >= 2) {
				rbm.keepScreenshotPartial(240, 1050, 670, 1730); // x1, y1, x2, y2
				var target1 = rbm.imageExists('underground_80a.png', 0.98);
				var target2 = rbm.imageExists('underground_' + eightdragonhuntermap + 'b.png', 0.92);
				//rbm.log('underground_80',rbm.findImage('underground_80a.png', 0.90));
				//rbm.log('underground_80',rbm.findImage('underground_80b.png', 0.90));
				//rbm.log('underground_' + eightdragonhuntermap + 'b.png',rbm.findImage('underground_' + eightdragonhuntermap + 'b.png', 0.90));
				rbm.releaseScreenshot();
				if (target1 && target2) {
					rbm.imageClick('underground_' + eightdragonhuntermap + 'b.png', 0.98);
					rbm.imageClick('underground_' + eightdragonhuntermap + 'b.png', 0.96);
					break;
				}
			}
			if (!config.isRunning) return false;
		}
	}
}

function EDTravel_field() {  //8龍，礦區切打獵，彎月數控制，切換以底圖判斷； 1:70,  2:80,  3:90-E,  4:90-N,  5:90-H
	if (!config.isRunning) return false;
	console.log('8龍，礦區切換至打圖');

	if (eightdragonchangswitch == 1) {
		AreaChange(2, 0); // Change to Field

		for (var i = 0; i < 8; i++) {
			rbm.keepScreenshotPartial(935, 454 - 190, 935 + 55, 454 + 65);
			var Disconnect = rbm.imageExists('main_fbmark.png', 0.9);
			rbm.releaseScreenshot();
			if (Disconnect) {
				console.log('不在主畫面，跳出檢查');
				break;
			}

			xy_swipe(500, 1700, 500, 1400, 25);
			sleep(1000);

			if (i >= 1) {
				rbm.keepScreenshotPartial(125, 270, 270, 1760); // x1, y1, x2, y2
				var target1 = rbm.findImage('underground_under.png', 0.80);
				//rbm.log('underground_under',rbm.findImage('underground_under.png', 0.90));
				rbm.releaseScreenshot();
				if (target1 != undefined && target1.score > 0.80) {
					var x1 = target1.x;
					var y1 = target1.y - (3 - Math.floor(eightdragonhuntermap / 3)) * 135;
					//console.log('XY1', eightdragonhuntermap - Math.floor(eightdragonhuntermap/3))
					//console.log(x1, y1)
					tap(x1, y1, 200)
					sleep(1000);

					rbm.keepScreenshotPartial(790, 1080, 940, 1680); // x1, y1, x2, y2
					var target2 = rbm.findImage('underground_entrycheck.png', 0.80);
					rbm.releaseScreenshot();
					if (target2 != undefined && target2.score > 0.80) {
						var x2 = target2.x + 55;
						var y2 = target2.y + 26 + (eightdragonhuntermap - Math.floor(eightdragonhuntermap / 3) * 3) * 135;
						//console.log( 'XY2', eightdragonhuntermap - Math.floor(eightdragonhuntermap/3) * 3 );
						//console.log(x2, y2);
						tap(x2, y2, 200);
						sleep(1000);

						for (var j = 0; j < 3; j++) {
							rbm.keepScreenshotPartial(720, 500, 940, 610); // x1, y1, x2, y2
							var target3 = rbm.findImage('underground_quickentry.png', 0.80);
							rbm.releaseScreenshot();
							if (target3 != undefined && target3.score > 0.80) {
								var x3 = target3.x + 50;
								var y3 = target3.y + 20 + 580;
								//console.log(x3, y3);
								tap(x3, y3, 200);

								break;
							}
							sleep(500);
						}
					}
				}
			}
			if (!config.isRunning) return false;
		}
	}
}

function stonecompoundnotup(stonelv1, stonelv2) {  //指定石頭不跳階合成
	if (!config.isRunning) return false;

	for (var i = 0; i < 10; i++) {
		rbm.keepScreenshotPartial(40, 1815, 480, 1890); // x1, y1, x2, y2
		var target1 = rbm.imageExists('buffer_stonelvup_on.png', 0.80);
		var target2 = rbm.imageExists('buffer_stonelvup_off.png', 0.80);
		if (target1) {
			rbm.imageClick('buffer_stonelvup_on.png', 0.80);
		}
		if (target2) {
			FindStonesImages2(stonelv1, stonelv1);    //合成  12  ==> 12
			rbm.imageClick('buffer_stonelvup_off.png', 0.80);
			break;
		}
		rbm.releaseScreenshot();

		sleep(200)
	}
}

function DailyAchievene(Timer) { //ReceiveDaily
	if (!config.isRunning || Dailyswitch == 0) return false;
	if (Date.now() < DailyAchieveneTimer) { return false; }

	for (var i = 0; i < 15; i++) {
		if (!config.isRunning) return false;

		CheckImageTap(930, 150, 50, 255, 0.85, 'Achievene.png', 1, 1, 1, 300, 1); //Achievene
		CheckImageTap(65, 860, 150, 70, 0.85, 'ReceiveAll.png', 1, 1, 1, 300, 1); //Achievene		
		sleep(1000);

		rbm.keepScreenshotPartial(50, 870, 225, 935); // x1, y1, x2, y2
		var checkImg1 = rbm.imageExists('ReceiveAll_dark.png', 0.90);
		rbm.releaseScreenshot();
		if (checkImg1) {
			tap(995, 905, 100); sleep(200);
			tap(995, 905, 100); sleep(200);
			console.log('ReceiveAll_dark Break DailyAchievene')
			DailyAchieveneTimer = Date.now() + Timer * 1000;
			break;
		}

		console.log('DailyAchievene Check :', i, ' times');
	}

}

function StoneCompound(min, max, rainmax) { // 主流程
	if (!config.isRunning) return false;

	//FindStonesImages(5, 8, 0);    //合成  5  ==> 8

	var Map_Check_FC1 = Map_Check(2, 0);  // MapFc: 1打獵圖, 2礦區； Type: 1點擊圖示
	var Map_Check_FC2 = Map_Check(1, 0);  // MapFc: 1打獵圖, 2礦區； Type: 1點擊圖示

	if (Map_Check_FC1) {                 // 確認在礦區

		//AreaChange(5, 600);  //區域切換：AreaID= 1:礦區 1頻	

		if (eightdragonswitch == 0) {
			var StonMax = max;

			/*
			rbm.keepScreenshotPartial(655, 119, 694, 338);
			var targetPic1 = rbm.imageExists('weather_rain.png', 0.95);
			rbm.releaseScreenshot();
			if (targetPic1) {  //確認是雨天
				StonMax = rainmax;
			}
			*/


			for (var i = 24; i >= min; i = i - 1) {
				StonMax = i;
				if (StoneCountArray[i] >= 2) {
					console.log('StoneCountArray[' + i + '] =', StoneCountArray[i], 'StonMax =', StonMax)
					break;
				}
			}

			if (combinecount > -15) {
				FindStonesImages2(min, StonMax); //合成  min ~ max
			}
			else if (combinecount <= -15) {
				//console.log(' combinecount <= -10');

				for (var i = 0; i < 27; i++) {
					StoneCountArray[i] = 99;
				}

				FindStonesImages2(min, 18);
				combinecount = 0;
			}

			rain_fastdig();  //下雨天快速挖
		}
		else if (eightdragonswitch == 1 && Stonecount(15) < eightdragonmoonset) {
			console.log('8龍模式，合成6~13，彎月未滿 ' + eightdragonmoonset + ' 個')
			FindStonesImages2(6, 13);    //合成  5  ==> 13
			stonecompoundnotup(14, 14); //指定金星不跳階合成
		}
		else if (eightdragonswitch == 1 && Stonecount(15) >= eightdragonmoonset) {
			console.log('8龍模式，彎月到達 ' + eightdragonmoonset + ' 個，停止合成')
			stonecompoundnotup(14, 14); //指定金星不跳階合成
			EDTravel_field(); // 切換80圖，打獵檢查 (切換開關 = ON)
		}

		characterbubble();   //點選角色對話泡泡		
	}
	else if (Map_Check_FC2) {              // 確認在打獵
		if (eightdragonswitch == 1 && eightdragonchangswitch == 1) {  //8龍模式，彎月到達回礦區檢查
			if (Stonecount(15) <= EDbackminigmoonset) {
				rbm.keepScreenshotPartial(956, 1403, 956 + 66, 1403 + 21);
				var BagOpenCheck = rbm.imageExists('BagOpen_-.png', 0.85)
				rbm.releaseScreenshot();

				if (BagOpenCheck) {
					EDbackminigmooncount = EDbackminigmooncount + 1;
					console.log('彎月數量 = ', Stonecount(15), ', 累計檢查次數 = ', EDbackminigmooncount);

					if (EDbackminigmooncount >= 6) {
						AreaTimer5 = Date.now();  //強制回礦區
						sleep(300);
						AreaChange(5, 120);
					}
				}
			}
			else if (Stonecount(15) > EDbackminigmoonset) {
				EDbackminigmooncount = 0;
			}
		}
		deadcheck(50);

		FindStonesImages2(6, 13);    //合成  5  ==> 13
		AreaChange(6, CHLpersontimeset); // Change to channels
		AD_Goldx2(AD_Goldx2timeset); //打獵 2倍金幣&看廣告自動重生
		CheckImageTap(470, 1120, 610 - 470, 1170 - 1120, 0.9, 'Rebirth_Now.png', 1, 1, 1, 200, 1); //Rebirth_Now

		CheckImageTap(484, 1026, 107, 62, 0.9, 'deadlevetbutton.png', 1, 1, 1, 200, 1);   //dead in 1m levetbutton
		dungeonbackcheck();  //人物在地城檢查，回礦區
		sleep(500)
	}
	else {                                // 不在打獵&礦區 上右上
		keycode('DPAD_DOWN', 100);
		keycode('DPAD_RIGHT', 100);
		keycode('DPAD_UP', 100);
	}

	WhiteCrystalMake(300);  //白色水晶製作
	friendheartcheck(1800);  //好友送愛心
	Dougeon_WFStone(600); //打地城
	DailyAchievene(3600); //每日獎勵

}


//===================設定、測試、執行==============================
function loadStones() {
	// console.log('Load Stones...');
	stonesImg = [];
	for (var k = 0; k <= 24; k++) {
		var filename = config.stonePath + '/Stones_img/stones_lv' + k + '_1080_ALL_cmp.png';
		stonesImg.push(openImage(filename));
	}
}

function releaseStones() {
	// console.log('Release Stones...');
	for (var k = 0; k <= 24; k++) {
		releaseImage(stonesImg[k]);
	}
}

function setFirstTimer() {   //通用，時間預設值設定
	friendheartTimer     = Date.now() + 30 * 1000;
	AD_GetRubyTimer      = Date.now() +  5 * 1000;
	ResterTimerSet       = Date.now() +  0 * 1000;
	WhiteCrystalTimer    = Date.now() + 10 * 1000;
	Dougeon_WFStoneTimer = Date.now() + 40 * 1000;  //打水火石
	AD_Goldx2Timer       = Date.now() + 10 * 1000;  //打獵區金幣2倍&重生
	DailyAchieveneTimer  = Date.now() + 20 * 1000;  //
	characterbubbleTimer = Date.now() + 10 * 1000;  //DailyAchieveneTimer
	RubyBoxTimer         = Date.now() +  5 * 1000;  //DailyAchieveneTimer

	testtapTimer = Date.now() + 60 * 1000;

	AreaTimer1 = Date.now();  //頻道
	AreaTimer2 = Date.now();  //狩獵區
	AreaTimer3 = Date.now();  //副本
	AreaTimer4 = Date.now();  //城鎮
	AreaTimer5 = Date.now();  //強制回礦區
	AreaTimer6 = Date.now();  //切換少人頻道

	DailyAchieveneTimer = Date.now() + 20 * 1000  //DailyAchieveneTimer
	Dougeon_WFStoneTimer = Date.now();  //打水火石

	whSize  = getScreenSize();
	widthF  = whSize.width / 1080;
	heightF = whSize.height / 1920;
	RubyBoxpa1  = { 'result': 0, 'score': 0, "x": 0, "y": 0, 'startT': 0, 'getT': 0, 'dT': 0 };
	RubyBoxget1 = { 'startT': 0, 'getT': 0, 'dT': 0 };

	loadStones();
}

function testsetting() {     //test用，預設值設定
	combinecount = 0;
	ScreenCheck  = 0;
	RubyBoxClick = 0;
	EDbackminigmooncount = 0;

	//整體時間調整
	s = 100;

	//合成方式調整
	dectcompraw1 =   1;
	dectcompraw2 = 100;
	dectcompraw3 = 400;
	dectcompraw4 = 300;
	MergermoveSW =  35;
	console.log('合成方式調整防偵測:', dectcompraw1, dectcompraw2, dectcompraw3, dectcompraw4, MergermoveSW);

	stonelvmin       =  4;      //合成，石頭最"低"等級        0:關  1:開
	normalstonelvmax = 24;      //一般合成，石頭最"高"等級    0:關  1:開
	rainstonelvmax   = 24;      //雨天合成，石頭最"高"等級    0:關  1:開
	//console.log('石頭等級設定:', stonelvmin, normalstonelvmax, rainstonelvmax)

	friendheartswitch     = 0;      //朋友送愛心開關        0:關  1:開
	AD_GetRubyswitch      = 1;      //看廣告拿鑽            0:關  1:開
	characterbubbleSwitch = 1;      //角色對話泡包點擊      0:關  1:開
	rain_fastdigswitch    = 0;      //下雨天快速挖礦        0:關  1:開
	//console.log('雜項設定:', friendheart, ad_ruby, charabubble, rainfastdig)

	WhiteCrystalswitch = 1;      //工藝製作(預設彎月)      0:關  1:開
	mooncompswitch     = 3;      //彎月保留量(作水晶用)  0:不保留
	//console.log('製作水晶設定', WCrystal, moonkeep)

	CraftsMake1switch = 11;    //工藝1
	CraftsMake2switch = 11;    //工藝2
	CraftsMake3switch = 11;    //工藝3
	CraftsMake4switch = 11;    //工藝4
	console.log('工藝:', CraftsMake1switch, CraftsMake2switch, CraftsMake3switch)

	DougeonWFStoneswitch = 0;     //打水火石地城          0:關  1:開
	DungeonTicketsset    = 10;     //打水火石地城票        設定值：0~10
	DungeonRoomset       = 1;     //打水火石地城等級      1:Beginner  2:Easy  3:Normal  4:Hard  5:Hell
	//console.log('打水火石地城設定', DWFStone, DTickets, DWFroomlv)

	eightdragonswitch      = 0;    //8龍專用(含鳳凰)，合成限制(雨天加速:關，合成：5~14) EightDragon
	eightdragonmoonset     = 0;    //8龍專用(含鳳凰)，合成停止(彎月數量) EDmoonkeep
	eightdragonchangswitch = 0;    //8龍專用(含鳳凰)，打獵←→打礦切換  EDareachange
	EDbackminigmoonset     = 0;    //8龍專用(含鳳凰)，回到礦區(彎月數量) EDmoonback
	eightdragonhuntermap   = 0;    //設定要打獵地圖 ，1:70, 2:80, 3:90-E, 4:90-N, 5:90-H
	//console.log('8龍模式UI:', EightDragon, EDmoonkeep, EDareachange, EDmoonback, EDgotohunter)
	//console.log('8龍模式SC:', eightdragonswitch, eightdragonmoonset, eightdragonchangswitch, EDbackminigmoonset, eightdragonhuntermap)

	RestartAppswitch  =  1;      //異常檢查自動重開app    0:關  1:開  resetapp
	RestartApptimeset = 90;      //異常檢查自動重開時間   檢查時間 "秒" resetapptime
	//console.log('異常重開設定:', resetapp, resetapptime)	

	AD_Goldx2switch  =  0;       //打圖 廣告 金幣x2 自動重生    0:關  1:開  goldx2
	AD_Goldx2timeset = 40;       //打圖 廣告 金幣重生檢查時間   檢查時間 "秒" goldx2T
	CHLpersonswitch  =  0;       //打圖 頻道 切換至少人頻道     0:關  1:開  goldx2
	CHLpersontimeset = 40;       //打圖 頻道 切換至少人頻道     切換時間 "秒"
	//console.log('廣告 金幣x2 自動重生:', goldx2, goldx2T, CHLperson, CHLpersonT)

	Dailyswitch = 0          //領取每日獎勵       0:關  1:開  

}

function test(n) {
	config.isRunning = true;

	for (var i = 0; i <= n; i++) {
		if (!config.isRunning) return false;

		if (i == 0) {
			testsetting();
			setFirstTimer();

			// rbm.log(getScreenSize());
			// console.log('width:', whSize.width, 'height:', whSize.height, 'widthF:', widthF, 'heightF:', heightF);
		}
		else if (i > 0) {
			console.log('n:', i, '/', n, ', 腳本測試開始');
			var j = 1;
			// var aa = 0;
			// CraftsMakeSelect(i);
			// QuizAnswer2();
			// QuizRestart();
			// AD_GetRuby(10);
			// CraftsMake(11, 11, 11, 11);
			
			// MergerStone2(stonelvmin, normalstonelvmax, dectcompraw1);

			// AttackMode(3);
			// BagMenu(0);
			// CraftsMakeSelect(i)
			FindStonesImages2();
			sleep(500);
			// while(config.isRunning) {StoneCompound(stonelvmin, normalstonelvmax, rainstonelvmax);}    //合成  5  ==> 8		
			console.log('')
			/*
		 //製作裝備
		 var stoneDir = config.stoneDir;
		 var StonesPath = getStoragePath() + '/' + stoneDir;
		 var filename2 = StonesPath + '/CraftsMake.png';	
		 var tImg2 = openImage(filename2);
		 var image2 = getScreenshotModify(60, 940, 1020, 960,  1020, 960, 100);
		 var results2 = findImages(image2, tImg2, 0.90, 4, true);
		 releaseImage(tImg2);
		 releaseImage(image2);
	 	
		 for(var index in results2) {
			 var result2 = results2[index];
			 rbm.log('1:', result2);
		 }	
		 */


		}
	}
	releaseStones();
}

function stop() {
	config.isRunning = false;
}

function start(s_timesUI, dectcomprawT1, dectcomprawT2, dectcomprawT3, dectcomprawT4, MergermoveUI, min, max, rainmax, friendheart, ad_ruby, charabubble, rainfastdig, WCrystal, moonkeep, CraftsMake1, CraftsMake2, CraftsMake3, CraftsMake4, DWFStone, DTickets, DWFroomlv, EightDragon, EDmoonkeep, EDareachange, EDmoonback, EDgotohunter, resetapp, resetapptime, goldx2, goldx2T, CHLperson, CHLpersonT, DailyAchieveneT) {
	config.isRunning = true;
	combinecount = 0;
	ScreenCheck = 0;
	RubyBoxClick = 0;
	EDbackminigmooncount = 0;

	//整體時間調整
	s = s_timesUI;

	//合成方式調整
	dectcompraw1 = dectcomprawT1;
	dectcompraw2 = dectcomprawT2;
	dectcompraw3 = dectcomprawT3;
	dectcompraw4 = dectcomprawT4;
	MergermoveSW = MergermoveUI;
	console.log('合成方式調整防偵測:', dectcompraw1, dectcompraw2, dectcompraw3, dectcompraw4, MergermoveSW);


	stonelvmin = min;            //合成，石頭最"低"等級        0:關  1:開
	normalstonelvmax = max;      //一般合成，石頭最"高"等級    0:關  1:開
	rainstonelvmax = rainmax;    //雨天合成，石頭最"高"等級    0:關  1:開
	//console.log('石頭等級設定:', stonelvmin, normalstonelvmax, rainstonelvmax)

	friendheartswitch = friendheart;      //朋友送愛心開關        0:關  1:開
	AD_GetRubyswitch = ad_ruby;           //看廣告拿鑽            0:關  1:開
	characterbubbleSwitch = charabubble;  //角色對話泡包點擊      0:關  1:開
	rain_fastdigswitch = rainfastdig;     //下雨天快速挖礦        0:關  1:開
	//console.log('雜項設定:', friendheart, ad_ruby, charabubble, rainfastdig)

	WhiteCrystalswitch = WCrystal;      //白水晶製作(彎月)      0:關  1:開
	mooncompswitch = moonkeep;          //彎月保留量(作水晶用)  0:不保留
	//console.log('製作水晶設定', WCrystal, moonkeep)

	CraftsMake1switch = CraftsMake1;    //工藝1
	CraftsMake2switch = CraftsMake2;    //工藝2
	CraftsMake3switch = CraftsMake3;    //工藝3
	CraftsMake4switch = CraftsMake4;    //工藝4
	console.log('食針 冰針:', CraftsMake1, CraftsMake2, CraftsMake3)

	DougeonWFStoneswitch = DWFStone;    //打水火石地城          0:關  1:開
	DungeonTicketsset = DTickets;       //打水火石地城票        設定值：0~10
	DungeonRoomset = DWFroomlv;         //打水火石地城等級      1:Beginner  2:Easy  3:Normal  4:Hard  5:Hell
	//console.log('打水火石地城設定', DWFStone, DTickets, DWFroomlv)

	eightdragonswitch = EightDragon;        //8龍專用(含鳳凰)，合成限制(雨天加速:關，合成：5~14) EightDragon
	eightdragonmoonset = EDmoonkeep;        //8龍專用(含鳳凰)，合成停止(彎月數量) EDmoonkeep
	eightdragonchangswitch = EDareachange;  //8龍專用(含鳳凰)，打獵←→打礦切換  EDareachange
	EDbackminigmoonset = EDmoonback;        //8龍專用(含鳳凰)，回到礦區(彎月數量) EDmoonback
	eightdragonhuntermap = EDgotohunter;    //設定要打獵地圖 ，1:70, 2:80, 3:90-E, 4:90-N, 5:90-H
	//console.log('8龍模式UI:', EightDragon, EDmoonkeep, EDareachange, EDmoonback, EDgotohunter)
	//console.log('8龍模式SC:', eightdragonswitch, eightdragonmoonset, eightdragonchangswitch, EDbackminigmoonset, eightdragonhuntermap)

	RestartAppswitch = resetapp;           //異常檢查自動重開app    0:關  1:開  resetapp
	RestartApptimeset = resetapptime;      //異常檢查自動重開時間   檢查時間 "秒" resetapptime
	//console.log('異常重開設定:', resetapp, resetapptime)	

	AD_Goldx2switch = goldx2;              //打圖 廣告 金幣x2 自動重生    0:關  1:開  goldx2
	AD_Goldx2timeset = goldx2T;            //打圖 廣告 金幣重生檢查時間   檢查時間 "秒" goldx2T
	CHLpersonswitch = CHLperson            //打圖 頻道 切換至少人頻道     0:關  1:開  goldx2
	CHLpersontimeset = CHLpersonT          //打圖 頻道 切換至少人頻道     切換時間 "秒"
	//console.log('廣告 金幣x2 自動重生:', goldx2, goldx2T, CHLperson, CHLpersonT)

	Dailyswitch = DailyAchieveneT          //領取每日獎勵       0:關  1:開  

	setFirstTimer();

	while (config.isRunning) {
		FindStonesImages2();
		sleep(500);

		// StoneCompound(stonelvmin, normalstonelvmax, rainstonelvmax);
	}
	releaseStones();
}


// ./adb -s emulator-5558 shell
// / # ps | grep app_