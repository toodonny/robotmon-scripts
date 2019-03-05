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
  isRunning: false,
  PackangName: 'net.supercat.stone',
  LaunchActivityName: '.MainActivity',
};
 
 
var rbm = new RBM(config);
rbm.init();
 
 ////============================ New Function ===============================////
 
function getRandom(min,max) {
	return Math.floor(Math.random()*(max-min+1))+min;
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

////============================ Old Function ===============================////

function CheckImageTap(intX, intY, ImgW, ImgH, Siml, ImageName, TapX, TapY, TapTimes, Delay1, Taptype) {
	rbm.keepScreenshotPartial(intX - 2, intY - 2, intX + ImgW + 4, intY + ImgH + 4); // x1, y1, x2, y2
	var StoneLvUP = rbm.imageExists(ImageName, Siml);
	for (var i = 0; i < TapTimes; i++) {
		//console.log(StoneLvUP, ': Find-' + ImageName)
		//rbm.log(StoneLvUP)
		if (StoneLvUP) {
			if (Taptype == 1) {
				rbm.imageClick(ImageName, Siml)
				//console.log('Click-' + ImageName)
			}
			else if (Taptype == 0) {
				tap(TapX, TapY, 100)
				//console.log('Tap-' + TapX + ',' + TapY)
			}
			sleep(Delay1)
		}
	}
	rbm.releaseScreenshot();
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

function DIY_radomswipe1(intx, inty, finax, finay, moveD, sleeptime) {
	var movedistance = (finay - inty) / moveD
	
	var MoveXD = (finax - intx) / moveD
	var MoveYD = (finay - inty) / moveD
	
	tapDown(intx, inty, 60);
	for (var i = 0; i < moveD; i++) {
		if (!config.isRunning) {
			tapUp(intx, i, 200);
			break;
		}
		intx = intx + MoveXD
		inty = inty + MoveYD
		
		intxR = intx + getRandom(-30,30);
		intyR = inty + getRandom(-30,30);
		
		moveTo(intxR, intyR, 10 +  getRandom(-5,5));
	}
	moveTo(finax, finay, 40)	
	tapUp(finax, finay, 40)
	if (sleeptime != undefined) sleep(sleeptime);
}

function DIY_radomswipe2(intx, inty, finax, finay, moveD, sleeptime) {
	var movedistance = (finay - inty) / moveD
	
	var MoveXD = (finax - intx) / moveD
	var MoveYD = (finay - inty) / moveD
	
	tapDown(intx, inty, 60);
	for (var i = 0; i < moveD; i++) {
		if (!config.isRunning) {
			tapUp(intx, i, 200);
			break;
		}
		intx = intx + MoveXD + getRandom(-30,30);
		inty = inty + MoveYD + getRandom(-30,30);
		moveTo(intx, inty, 10 +  getRandom(-5,5));
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

function usingTimeString(startTime) {
  return '循環時間：' + (Date.now() - startTime) + 'ms';
}

function FindStonesImages(stoneslv1,stoneslv2,column) { 
	var a = 0
	var now = Date.now();
	var StonesImages = []; // [] array,  {} object
	var StoneGridLv = [];
	if (eightdragonchangswitch == 0) var stone15findmax = mooncompswitch * 2 + 4;
	if (eightdragonchangswitch == 1) var stone15findmax = eightdragonmoonset * 2 + 4;

	var StoneMaxFindArray = new Array(16,16,16,16,16,16,16,16,16,8,6,4,4,4,18, stone15findmax,18,4,4,4,4,4,4,4,4,4,4);
	//var StoneMaxFindArray = new Array(6,6,6,6,6,6,6,6,6,8,6,4,4,4,6, stone15findmax,6,4,4,4,4,4,4,4,4,4,4);
	var stoneDir = config.stoneDir;
	var StonesPath = getStoragePath() + '/' + stoneDir;
		
	for(var k = stoneslv1; k <= stoneslv2 ; k++) {
		if (!config.isRunning) return false;
		
		
		rbm.keepScreenshotPartial(956, 1403, 956 + 66, 1403 + 21);
		var BagOpenCheck = rbm.imageExists('BagOpen_-.png', 0.9)
		rbm.releaseScreenshot();
		console.log('BagOpenCheck:', BagOpenCheck);
		if (BagOpenCheck) {
			if (StoneCountArray[k] >= 2 || k == stonelvmin ) {
				
				sleep(dectcompraw4);
				
				//console.log('BagOpenCheck-Open')
				
				/*
				combinecount = combinecount + 1
				var comcountremainder = combinecount % 3
				if (comcountremainder == 0)	RubyBox();
				
				var comcountremainder = combinecount % 4
				if (comcountremainder == 0) characterbubble();
				*/
				
				//tap(389, 1000, 60); sleep(100); 
				
				var x0 = 0; var y0 = 0; var x1 = 0; var y1 = 0;
				var checkxy = 0;
				var stoneDir = config.stoneDir;
				var StonesPath = getStoragePath() + '/' + stoneDir;


				var filename = StonesPath + '/stones_lv' + k + '_1080_ALL_cmp.png';				
				var tImg = openImage(filename);
				var image = getScreenshotModify(44, 1478, 900, 330, 450, 165, 100);

				var results = findImages(image, tImg, 0.90, StoneMaxFindArray[k], true);
				
				var Stones = 0; var nextStone = 0;
				for(var index in results) {
					var result = results[index];
					if (!config.isRunning) return false;
					
					Stones = Stones + 1
					
					var kindexNum = index * 1
					var indexremainder = kindexNum % 2
					
					if (k == 15 && mooncompswitch > 0) {
						if (kindexNum < mooncompswitch) {
							indexremainder = 2
						}
						else if (kindexNum >= mooncompswitch) {
							indexremainder = (kindexNum - 3) % 2
						}
					}

					//rbm.log('k=' + k,'index=' + index,'remainder=' + indexremainder,result.x, result.y, result.score);
					sleep(dectcompraw2);
					if (indexremainder == 0) {
						var x0 = 46 + result.x * 2 + 40
						var y0 = 1479 + result.y * 2  + 40
						////console.log('indexremainder=000',x0, y0)
					}
					else if (indexremainder == 1) {
						var x1 = 46 + result.x * 2  + 40
						var y1 = 1479 + result.y * 2  + 40
						////console.log('indexremainder=111',x1, y1)
						//DIY_swipe(x0, y0, x1, y1, 20);
						
						if (dectcompraw1 == 1) {
							DIY_swipe(x0, y0, x1, y1, 30);
						}
						else if (dectcompraw1 == 2) {
							DIY_radomswipe1(x0, y0, x1, y1, 30);
						}
						else if (dectcompraw1 == 3) {
							DIY_radomswipe2(x0, y0, x1, y1, 30);
						}
						
						nextStone = nextStone + 1;
						
						/*
						if (x1 > x0) {
							DIY_swipe(x1, y1, x0, y0, 60);
						}
						else if (x1 <= x0) {
							DIY_swipe(x0, y0, x1, y1, 60);
						}
						*/
					}
					sleep(dectcompraw3);
				}
				releaseImage(tImg);
				releaseImage(image);
				
				ScreenCheck = 0
				StoneCountArray[k] = Stones - nextStone * 2
				
				switch(k) {
					case 23 : 
						if (StoneCountArray[k + 1] == 99) { StoneCountArray[k + 1] = nextStone}
						else { StoneCountArray[k + 1] = StoneCountArray[k + 1] + nextStone }
						
						break;
					
					case 24 : 
						break;
						
					default :
						if (StoneCountArray[k + 1] == 99) { StoneCountArray[k + 1] = nextStone}
						else { StoneCountArray[k + 1] = StoneCountArray[k + 1] + nextStone }
						
						if (StoneCountArray[k + 2] == 99) { StoneCountArray[k + 2] = nextStone}
						else { StoneCountArray[k + 2] = StoneCountArray[k + 2] + nextStone }
						
						break;
				}				
				
				if (k == stonelvmin) { 
					if (Stones <= 1) { 
						combinecount = combinecount - 1 
					}
					else { 
						combinecount = 0
					}
				}
				
				console.log('combinecount =', combinecount);
				ResterTimerSet = Date.now()
			}
		}
		else {
			if (!config.isRunning) return false;
			
			sleep(100);
			console.log('背包找不到，畫面檢查');
			AttackMode(1); //檢查背包打開/自動攻擊
			QuizRestart();
			
			CheckImageTap(455,  575, 180,  60, 0.9, 'exitstone.png', 680, 1280, 1, 150, 0); //Exit Grow Stone Online
			CheckImageTap(490, 1060, 100, 600, 0.9, 'ok_button.png', 1, 1, 1, 150, 1); //OK_Button
			CheckImageTap(600,  200, 470, 750, 0.9, 'closeboard.png', 1, 1, 1, 2, 1); //closeboard
			CheckImageTap(470, 1100, 133,  95, 0.9, 'Receiveaward.png', 1, 1, 1, 150, 1); //Receiveaward
			CheckImageTap(626,  868, 154,  51, 0.9, 'fastdig_ok.png', 430, 1130, 1, 150, 0);   //fast dig OK button
			CheckImageTap(299,  897, 207,  39, 0.9, 'UpdataFailed.png', 540, 1120, 1, 150, 0); //wifi or lan disconnected
			CheckImageTap(438,  825, 109,  42, 0.9, 'break_down.png', 650, 1150, 1, 150, 0);   //break down stone : cancle
			CheckImageTap(570, 1190, 205,  78, 0.9, 'dungeon_backtomini.png', 1, 1, 1, 150, 1); //dungeon_backtomini
			
			//CheckImageTap(441, 648, 113, 39, 0.8, 'Unlock_Stone.png', 540, 1210, 1, 150, 0); //stone lv_up : ok
			
			timetoRestarApp2(RestartApptimeset);
		}
		console.log('石頭',k,'級',usingTimeString(now));
		now = Date.now();
	}
}

function FindStonesImages2(stoneslv1,stoneslv2) { 
	var a = 0
	var now = Date.now();
	var StonesImages = []; // [] array,  {} object
	var StoneGridLv = [];
	if (eightdragonchangswitch == 0) var stone15findmax = mooncompswitch * 2 + 4;
	if (eightdragonchangswitch == 1) var stone15findmax = eightdragonmoonset * 2 + 4;

		
	rbm.keepScreenshotPartial(956, 1403, 956 + 66, 1403 + 21);
	var BagOpenCheck = rbm.imageExists('BagOpen_-.png', 0.9)
	rbm.releaseScreenshot();
	console.log('BagOpenCheck:', BagOpenCheck);
	if (BagOpenCheck) {
		var stones =  MergerStone(stoneslv1, stoneslv2);
		// console.log('stones:', stones);
		if (stones <= 15) {characterbubble2();}
		RubyBox();

		//==========================================================
		// for(var k = stoneslv1; k <= stoneslv2 ; k++) {
		// 	if (!config.isRunning) return false;
			
		// 		if (StoneCountArray[k] >= 2 || k == stonelvmin ) {
					
		// 			sleep(dectcompraw4);
					
		// 			var Stones = 0; var nextStone = 0;
		// 			for(var index in results) {
		// 				if (!config.isRunning) return false;
						
		// 				Stones = Stones + 1
						
		// 				var kindexNum = index * 1
		// 				var indexremainder = kindexNum % 2
						
		// 				if (k == 15 && mooncompswitch > 0) {
		// 					if (kindexNum < mooncompswitch) {
		// 						indexremainder = 2
		// 					}
		// 					else if (kindexNum >= mooncompswitch) {
		// 						indexremainder = (kindexNum - 3) % 2
		// 					}
		// 				}

		// 				sleep(dectcompraw2);
		// 			}
		// 			sleep(dectcompraw3);
					
		// 			console.log('combinecount =', combinecount);
		// 			ResterTimerSet = Date.now()
		// 		}
		// 	}
		}
		else {
			if (!config.isRunning) return false;
			
			sleep(100);
			console.log('背包找不到，畫面檢查');
			AttackMode(1); //檢查背包打開/自動攻擊
			QuizRestart();
			
			CheckImageTap(455,  575, 180,  60, 0.9, 'exitstone.png', 680, 1280, 1, 150, 0); //Exit Grow Stone Online
			CheckImageTap(490, 1060, 100, 600, 0.9, 'ok_button.png', 1, 1, 1, 150, 1); //OK_Button
			CheckImageTap(600,  200, 470, 750, 0.9, 'closeboard.png', 1, 1, 1, 2, 1); //closeboard
			CheckImageTap(470, 1100, 133,  95, 0.9, 'Receiveaward.png', 1, 1, 1, 150, 1); //Receiveaward
			CheckImageTap(626,  868, 154,  51, 0.9, 'fastdig_ok.png', 430, 1130, 1, 150, 0);   //fast dig OK button
			CheckImageTap(299,  897, 207,  39, 0.9, 'UpdataFailed.png', 540, 1120, 1, 150, 0); //wifi or lan disconnected
			CheckImageTap(438,  825, 109,  42, 0.9, 'break_down.png', 650, 1150, 1, 150, 0);   //break down stone : cancle
			CheckImageTap(570, 1190, 205,  78, 0.9, 'dungeon_backtomini.png', 1, 1, 1, 150, 1); //dungeon_backtomini
			
			//CheckImageTap(441, 648, 113, 39, 0.8, 'Unlock_Stone.png', 540, 1210, 1, 150, 0); //stone lv_up : ok
			
			timetoRestarApp2(RestartApptimeset);
		}
		// console.log('石頭',k,'級',usingTimeString(now));
		now = Date.now();
	
}

function MergerStone(intLv, finLv) {
	if (!config.isRunning) return false;

	var soltx = [];
	var solty = [];

	var soltcount = 0;
	for(var n = 1; n <= 3 ; n++) {
		for(var m = 1; m <= 8 ; m++) {
			soltx[soltcount] =   95 + 112 * (m - 1);
			solty[soltcount] = 1525 + 112 * (n - 1);
			soltcount = soltcount + 1;
		}
	}
	// rbm.log('soltx;', soltx);
	// rbm.log('solty;', solty);

	var stoneLvobj = [];
	var stoneDir = config.stoneDir;
	var StonesPath = getStoragePath() + '/' + stoneDir;

	var image = getScreenshotModify(44, 1478, 900, 330, 450, 165, 100);

	var objcount = 0;
	for(var k = intLv; k <= finLv ; k++) {
		if (!config.isRunning) return false;

		var filename = StonesPath + '/stones_lv' + k + '_1080_ALL_cmp.png';				
		var tImg = openImage(filename);
		var results = findImages(image, tImg, 0.88, 24, true);

		for(var index in results) {
			if (!config.isRunning) return false;

			var result = results[index];
			stoneLvobj[objcount] = result;
			stoneLvobj[objcount].score = result.score.toFixed(5)*1;
			stoneLvobj[objcount].Lv = k;
			// rbm.log('log 1:', stoneLvobj[objcount])
			
			objcount = objcount + 1;
		}
	}
	releaseImage(tImg);
	releaseImage(image);

	var AllStone = Object.keys(stoneLvobj).length;
	rbm.log('石頭數量:', AllStone);

	var mgNo = 0; var mgCount = 0;
	for (var i = 0; i <= AllStone - 1; i++) {
		if (!config.isRunning) return false;
		if (stoneLvobj[mgNo] == undefined) break;
		if (stoneLvobj[mgNo + 1] == undefined) break;
		// rbm.log('log 1:', i, mgNo, stoneLvobj[mgNo]);
		// rbm.log('log 1:', i, mgNo + 1, stoneLvobj[mgNo + 1]);
		// rbm.log('')
		if (stoneLvobj[mgNo].Lv == stoneLvobj[mgNo + 1].Lv) {
			var x0 = 46 + stoneLvobj[mgNo].x * 2 + 40
			var y0 = 1479 + stoneLvobj[mgNo].y * 2  + 40
			var x1 = 46 + stoneLvobj[mgNo + 1].x * 2  + 40
			var y1 = 1479 + stoneLvobj[mgNo + 1].y * 2  + 40
			switch (dectcompraw1) {
				case 1: DIY_swipe(x0, y0, x1, y1, 50, dectcompraw3); break;
				case 2: DIY_radomswipe1(x0, y0, x1, y1, 50, dectcompraw3); break;
				case 3: DIY_radomswipe2(x0, y0, x1, y1, 50, dectcompraw3); break;  
			}

			mgNo = mgNo + 2;
			mgCount = mgCount + 1;
		} else {
			mgNo = mgNo + 1;
		}
	}

	if (mgCount == 90) {
		stoneLvobj = stoneLvobj.sort(function (a, b) {
			return a.Lv < b.Lv ? 1 : -1;
		});	

		for (var j = 0; j <= AllStone - 1; j++){
			var x2 =   46 + stoneLvobj[j].x * 2 + 40
			var y2 = 1479 + stoneLvobj[j].y * 2  + 40
			var xD = Math.abs(x2 - soltx[j]);
			var yD = Math.abs(y2 - solty[j]);

			if (j == 0) {
				var xD2 = 15;
				var yD2 = 15;
			} else if (j > 0){
				var x3 =   46 + stoneLvobj[j].x * 2 + 40
				var y3 = 1479 + stoneLvobj[j].y * 2  + 40
				var xD2 = Math.abs(x3 - soltx[j -1]);
				var yD2 = Math.abs(y3 - solty[j -1]);
			}

			if (xD > 10 || yD > 10) {
				if (xD2 > 10 || yD2 > 10) {
					rbm.log('j:', j, xD, yD, x2, y2, soltx[j], solty[j]);
					DIY_swipe(x2, y2, soltx[j], solty[j], 40);
					
				}
			}
		}
	}

	return AllStone;

}

function AttackMode(Mode) { //攻擊模式：1:自動攻擊  2:定點攻擊  3:手動模式
	if (!config.isRunning) return false;
	console.log('攻擊模式切換')
	rbm.keepScreenshotPartial(950, 1800, 950 + 90, 1800 + 90); // x1, y1, x2, y2
	var BagClose = rbm.imageExists('BagClose_+.png', 0.9);
    rbm.releaseScreenshot();
    //console.log('BagClose-before', BagClose)
	//sleep(100)
	if (BagClose && Mode == 1) { //切換至 自動攻擊
		console.log('切換至 自動攻擊')
		
		rbm.keepScreenshotPartial(130, 1660, 134 + 155, 1664 + 55);
		rbm.imageClick('Attack-Local.png', 0.90)
		rbm.imageClick('Attack-Local.png', 0.90)
				
		//rbm.log('menu',rbm.findImage('Attack-Menu.png', 0.90));
		rbm.imageClick('Attack-Menu.png', 0.90)
		
		sleep(500)
		rbm.keepScreenshotPartial(130, 1660, 134 + 155, 1664 + 55);
		var AttackAuto = rbm.imageExists('Attack-Auto.png', 0.90);
		//rbm.log('menu',rbm.findImage('Attack-Auto.png', 0.50));
		if (AttackAuto) {
			tap(980, 1830, 100)
		}
		rbm.releaseScreenshot();
	}
	else if (BagClose && Mode == 2) {  //切換至 定點攻擊
		console.log('切換至 定點攻擊')
		
		rbm.keepScreenshotPartial(130, 1660, 134+155, 1664+55);
		rbm.imageClick('Attack-Menu.png', 0.90)
		rbm.imageClick('Attack-Menu.png', 0.90)
				
		//rbm.log('menu',rbm.findImage('Attack-Menu.png', 0.90));
		rbm.imageClick('Attack-Auto.png', 0.90)
		
		sleep(500)
		rbm.keepScreenshotPartial(130, 1660, 134+155, 1664+55);
		var AttackAuto = rbm.imageExists('Attack-Local.png', 0.90);
		//rbm.log('menu',rbm.findImage('Attack-Local.png', 0.50));
		if (AttackAuto) {
			tap(980, 1830, 100)
		}
		rbm.releaseScreenshot();
	}
	else if (BagClose && Mode == 3) {  //切換至 手動模式
		console.log('切換至 手動模式')
		
		rbm.keepScreenshotPartial(130, 1660, 134+155, 1664+55);
		rbm.imageClick('Attack-Auto.png', 0.90)
		rbm.imageClick('Attack-Auto.png', 0.90)
				
		//rbm.log('menu',rbm.findImage('Attack-Menu.png', 0.90));
		rbm.imageClick('Attack-Local.png', 0.90)
		
		sleep(500)
		rbm.keepScreenshotPartial(130, 1660, 134+155, 1664+55);
		var AttackAuto = rbm.imageExists('Attack-Menu.png', 0.90);
		//rbm.log('menu',rbm.findImage('Attack-Menu.png', 0.50));
		if (AttackAuto) {
			tap(980, 1830, 100)
		}
		rbm.releaseScreenshot();
	}
	//sleep(200)
}

function RubyBox() { //檢查寶箱拿鑽&看廣告拿鑽 main
	if (!config.isRunning) return false;
	
	console.log('檢查寶箱/廣告拿寶石');
	
	for (var j = 0; j < 2; j++) {
		
		var img = getScreenshot();
		var RubyButton = getImageColor(img, 60, 1060 + j * 140);  //1st:60,1203
		var RubyButtonCheck = isSameColor({b: 57, g:53, r: 160, a: 0},RubyButton, 40)
		releaseImage(img);
		if (RubyButtonCheck) {

			rbm.keepScreenshotPartial(40, 1815, 480, 1890); // x1, y1, x2, y2
			var RubyBoxpa = rbm.imageExists('rubybox100pa.png', 0.90);
			rbm.releaseScreenshot();
			if (RubyBoxpa) {
				//sleep(200)
				//console.log('RubyBoxFull_Open')

				tap(510, 1000, 60); sleep(100);
				tap(510, 1000, 60); sleep(200);

				tap(62, 1065 + j * 140, 100); // sleep(4000);

				for (var i = 0; i < 40; i++) {
					if (!config.isRunning) {
						return false;
					}
					sleep(500);

					rbm.keepScreenshotPartial(240, 1090 + j * 140, 310, 1160 + j * 140); // x1, y1, x2, y2
					var target = rbm.imageExists('rubyboxget.png', 0.90);
					rbm.releaseScreenshot();
					if (target) {
						tap(300, 1100 + j * 140, 100); // sleep(400);
						break;
					}
				}

				tap(510, 1000, 60); sleep(200);

				QuizRestart();

				RubyBoxClick = RubyBoxClick + 1
			}
			else{
				AD_GetRuby(120)
			}
		}
		else {
			CheckImageTap(600,  200, 470, 750, 0.9, 'closeboard.png', 1, 1, 1, 2, 1); //closeboard
		}
	}
}

function AD_GetRuby(Timer) { //看廣告拿寶石
	if (!config.isRunning) return false;
	var AD_GetRubyTD = Date.now() - AD_GetRubyTimer
	console.log('看廣告拿寶石')
	for (var j = 0; j < 2; j++) {
		var img = getScreenshot();
		var GetRuby = getImageColor(img, 60, 1060 + j * 140);
		var GetRubyCheck = isSameColor({b: 63, g:58, r: 169, a: 0}, GetRuby, 40)
		releaseImage(img);

		if (AD_GetRubyswitch == 1 && GetRubyCheck  && Date.now() > AD_GetRubyTimer) {
			//console.log('GetRubyCheck=true)')
			var img = getScreenshot();
			var RubyButton = getImageColor(img, 60, 1060 + j * 140);
			var RubyButtonCheck = isSameColor({b: 57, g:53, r: 160, a: 0}, RubyButton, 40)
			releaseImage(img);
			if (RubyButtonCheck) {
				sleep(200)
				//console.log('RubyBoxFull_Open')

				tap(510, 1000, 60); sleep(100);
				tap(510, 1000, 60); sleep(200);

				tap(60, 1060 + j * 140, 100); sleep(250);

				tap(290, 1100 + j * 140, 100); sleep(700); // 寶箱-寶石
				tap(160, 1100 + j * 140, 100); sleep(700); // 廣告-寶石

				tap(510, 1000, 60); sleep(200);


				for (var i = 0; i < 6 ; i++) {
					sleep(500);
					rbm.keepScreenshotPartial(512, 920, 512 + 135, 920 + 40); // x1, y1, x2, y2
					var checkimg = rbm.imageExists('ruby_5free.png', 0.9);
					rbm.releaseScreenshot();
					if (checkimg) {
						tap(420, 1120, 100); sleep(500);
						//break;
					}

					rbm.keepScreenshotPartial(385, 935, 695, 1185); // x1, y1, x2, y2
					var checkImg3 = rbm.imageExists('AD_non.png', 0.95);
					rbm.releaseScreenshot();
					if (checkImg3 || !config.isRunning) {
						AD_GetRubyTimer = Date.now() + 600 * 1000
						console.log('廣告不夠，延10分檢查')
						return false;
					}
				}

				QuizRestart();
				AD_watch(90);
				AD_GetRubyTimer = AD_GetRubyTimer + Timer * 1000;
			}
		}
	}
}

function AD_watch(ADtimer) {
	if (!config.isRunning) return false;
	console.log('自動看廣告檢查')
	for (var i = 0; i < ADtimer; i++) {
		if (!config.isRunning) return false;
		
		if (i > 4) {
			rbm.keepScreenshotPartial(935, 454 - 190, 935 + 55, 454 + 65);
			var Disconnect = rbm.imageExists('main_fbmark.png', 0.9);
			rbm.releaseScreenshot();
			if (Disconnect) {
				break;
			}
			
			rbm.keepScreenshotPartial(431, 510, 431 + 161, 510 + 54);
			var QuizTest = rbm.imageExists('Quiz_Lable.png', 0.9);
			rbm.releaseScreenshot();
			if (QuizTest) {
				break;
			}
			
			rbm.keepScreenshotPartial(490, 1060, 490 + 100, 1060 + 160);
			var OKbutton = rbm.imageExists('ok_button.png', 0.9);
			rbm.releaseScreenshot();
			if (OKbutton) {
				CheckImageTap(490, 1060, 100, 160, 0.9, 'ok_button.png', 1, 1, 1, 200, 1); //OK_Button
				CheckImageTap(490, 1060, 100, 160, 0.9, 'ok_button.png', 1, 1, 1, 200, 1); //OK_Button
				break;
			}
			
			console.log('廣告觀看計時 = ' + i);
			keycode('BACK', 40);
		}
		
		sleep(1000)
	}
}

function ScreenShottoPath() { //全畫面截圖存檔
	var DateName = Math.floor(Date.now()/1000);
	var QuizShotFilename = 'QuizShot' + DateName.toString() + '.png';
	var PicSharePath = '/storage/emulated/legacy/Pictures/StoneQuizPic';
	var QuizSavefile = PicSharePath + '/' + QuizShotFilename;	
	var QuizShot = getScreenshot();
	saveImage(QuizShot, QuizSavefile);
	releaseImage(QuizShot);
}

function QuizRestart() {   // 小測驗判斷與解答 main
	if (!config.isRunning) return false;
	console.log('小測驗檢查')
	
	for (var i = 0; i < 6; i++) {
		rbm.keepScreenshotPartial(420, 500 - 50, 610, 580 - 50); // x1, y1, x2, y2
		var QuizTest = rbm.imageExists('Quiz_Lable.png', 0.9);
		rbm.releaseScreenshot();
			if (QuizTest) {
				break;
			}
		sleep(300);
	}
	if (QuizTest) {
		tap(850, 1000, 100); sleep(200);
		tap(850, 1000, 100); sleep(200);
		
		QuizAnswer();
		
	}	
}

function QuizAnswer() { //小測驗解答判斷
	console.log('小測驗解答判斷');
	var targetCharacter1 = -1;
	var AltCharacterNum = 0;
	var Character = { 
	    'Attributes':[
	        {'No':0,'Type':'Non','MainFile':'','AltFile':'','x':0,'y':0,'Rank':''}, 
	        {'No':1,'Type':'Bear','MainFile':'Quiz_Main_1_N.png','AltFile':'Quiz_Alt_1_N.png','x':'','y':'','Rank':''}, 
	        {'No':2,'Type':'Rabb','MainFile':'Quiz_Main_2_N.png','AltFile':'Quiz_Alt_2_N.png','x':'','y':'','Rank':''}, 
	        {'No':3,'Type':'LBoy','MainFile':'Quiz_Main_3_N.png','AltFile':'Quiz_Alt_3_N.png','x':'','y':'','Rank':''}, 
	        {'No':4,'Type':'Blue','MainFile':'Quiz_Main_4_N.png','AltFile':'Quiz_Alt_4_N.png','x':'','y':'','Rank':''}, 
	        {'No':5,'Type':'Kaka','MainFile':'Quiz_Main_5_N.png','AltFile':'Quiz_Alt_5_N.png','x':'','y':'','Rank':''}, 
	        {'No':6,'Type':'GNja','MainFile':'Quiz_Main_6_N.png','AltFile':'Quiz_Alt_6_N.png','x':'','y':'','Rank':''}, 
	        {'No':7,'Type':'LGir','MainFile':'Quiz_Main_7_N.png','AltFile':'Quiz_Alt_7_N.png','x':'','y':'','Rank':''} 
	    ], 
	}; 	
	//確認主要對象是誰
	Tag_Main:
	for (var i = 1; i < 8; i++) {
		var targetmathtimes1 = 0;
		//console.log('i=',i,' main check');
		for (var j = 0; j < 3; j++) {
			rbm.keepScreenshotPartial(470, 1060, 580, 1140);
			var targetPic1 = rbm.imageExists(Character.Attributes[i].MainFile, 0.95)
			rbm.releaseScreenshot();
			if (targetPic1) {  //確認比對人物編號
				targetmathtimes1 = targetmathtimes1 + 1
			}
			if (targetmathtimes1 >= 1) {
				rbm.log(i, Character.Attributes[i].Type,'-Main-',rbm.findImage(Character.Attributes[i].MainFile, 0.95))
				targetCharacter1 = i;
				break Tag_Main;
			}
		}
	}
	//解答區找人與x坐標儲存
	if (targetCharacter1 >= 1) {
		rbm.keepScreenshotPartial(120, 790, 650, 920);
		for (var i = 1; i < 8; i++) {
			var targetmathtimes2 = 0;
			for (var j = 0; j < 1; j++) {
				
				var targetPic1 = rbm.findImage(Character.Attributes[i].AltFile, 0.92)
				
				//rbm.log(i,Character.Attributes[i].Type,'-answer-',rbm.findImage(Character.Attributes[i].AltFile, 0.80))

				if (targetPic1 != undefined && targetPic1.score >= 0.92) {  //確認比對人物編號
					targetmathtimes2 = targetmathtimes2 + 1
					//rbm.log(i,Character.Attributes[i].Type,'-answer-',rbm.findImage(Character.Attributes[i].AltFile, 0.90))
				}
				if (targetmathtimes2 >= 1) {
					Character.Attributes[i].x = targetPic1.x;
					Character.Attributes[i].y = targetPic1.y;
					AltCharacterNum = AltCharacterNum + 1
					//console.log(i, 'targetPic1.x=' + targetPic1.x, 'targetPic1.y=' + targetPic1.y)
					break;
				}
			}
		}
		rbm.releaseScreenshot();
		
		//console.log('AltCharacterNum = ' + AltCharacterNum)
		
		if (AltCharacterNum == 4) {
			Character.Attributes = Character.Attributes.sort(function (a, b) {
				return a.x < b.x ? 1 : -1;
			});
			
			for (var k = 0; k < 4; k++) {
				//sleep(100)
				Character.Attributes[k].Rank = 4 - k
			}
			
			Character.Attributes = Character.Attributes.sort(function (a, b) {
				return a.No > b.No ? 1 : -1;
			});
			
			for (var i = 0; i < 0; i++) {
				//rbm.log(Character.Attributes[i].No, Character.Attributes[i].Type, 'Rank='+Character.Attributes[i].Rank, 'x='+Character.Attributes[i].x, 'y='+Character.Attributes[i].y)
			}
			
			console.log(Character.Attributes[targetCharacter1].Type,' 是第 ',Character.Attributes[targetCharacter1].Rank,' 名！');
			
			//sleep(1000);
			//ScreenShottoPath();
			
			
			rbm.keepScreenshotPartial(120, 1370, 980, 1450); // x1, y1, x2, y2
			var QuizRankFile = 'Quiz_Rank_' + Character.Attributes[targetCharacter1].Rank + '.png'
			rbm.imageClick(QuizRankFile, 0.90);
			rbm.releaseScreenshot();
			
			ResterTimerSet = Date.now()
		}
		else {
			console.log('人物坐標不符4個，重開!')
			sleep(500);
			ScreenShottoPath();
			RubyBoxClick = 0;
			//RestartApp();
		}
	}
	else if (targetCharacter1 == -1) {
		sleep(500);
		ScreenShottoPath();
		console.log('沒找到目標，不做答!')
	}
}

function QuizRestart2() {
	console.log('小測驗無法解-重開礦山')
	rbm.keepScreenshotPartial(431, 510, 431 + 161, 510 + 54); // x1, y1, x2, y2
	var QuizTest = rbm.imageExists('Quiz_Lable.png', 0.9);
	rbm.releaseScreenshot();
	if (QuizTest) {
		sleep(1500);
		ScreenShottoPath();
		
		sleep(1000);
		RubyBoxClick = 0;
		
	}	
}

function timetoRestarApp(CycleTimer) {
	console.log('設定時間-重開礦山')
	var Timerremainder = (Date.now() / 1000) % CycleTimer
	console.log('Date.now = ' + Date.now(),CycleTimer,Timerremainder)
	if (Timerremainder < 15) {
		RestartApp()
	}
}

function timetoRestarApp2(CycleTimer) { //重開app，時間控制 main
	if (!config.isRunning || RestartAppswitch == 0) return false;
	console.log('設定時間-重開礦山2');
	
	var Timerremainder = (Date.now() - ResterTimerSet) / 1000 ;
	console.log(Timerremainder,'/',CycleTimer);
	
	
	
	var BACKtremainder = combinecount % 3
	if (Timerremainder <= 40) {
		sleep(1000);
	}
	else if (Timerremainder > 40) {
		rbm.keepScreenshotPartial(935, 454 - 190, 935 + 55, 454 + 65); // x1, y1, x2, y2
		var Disconnect = rbm.imageExists('main_fbmark.png', 0.9);
		rbm.releaseScreenshot();
		if (Disconnect) {
			return false;
		}
		else {
			keycode('BACK', 100);
		}
		sleep(1000)
	}
	
	if (Timerremainder > CycleTimer) {
		RestartApp(120);
	}
}

function canceltoRestartApp() {
	console.log('canceltoRestartApp')
	var result = rbm.currentApp();
	var packageName = result.packageName;
	var activityName = result.activityName;
	rbm.log(result)
	if (packageName.indexOf('stone') == -1) {
		console.log('start:' + config.PackangName)
		RestartApp()
	}
}

function RestartApp(Timer) {  //礦山app重開
	console.log('礦山重開')
	keycode('HOME', 4000);
	sleep(1000)
	rbm.stopApp(config.PackangName); sleep(500)
	rbm.stopApp(config.PackangName); sleep(2000)
	//console.log(Date.now())
	rbm.startApp(config.PackangName,config.LaunchActivityName);
	for (var i = 1; i < Timer; i++) {
		if (!config.isRunning || RestartAppswitch == 0) {
			return false;
		}
		
		CheckImageTap(490, 1060, 100, 160, 0.9, 'ok_button.png', 1, 1, 1, 200, 1) //OK_Button
		CheckImageTap(470, 1100, 133,  95, 0.9, 'Receiveaward.png', 1, 1, 1, 200, 1) //Receiveaward
		CheckImageTap(600,  200, 470, 750, 0.9, 'closeboard.png', 1, 1, 1, 2, 1); //closeboard
		sleep(800);
		console.log(i,'秒');
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
		CheckImageTap(626,  868, 154,  51, 0.95, 'fastdig_ok.png', 430, 1130, 1, 200, 0);   //fast dig OK button
	}
}

function Stonecount(stonelv) { //石頭數量 stonelv:指定等級，空格:0
	
	if (stonelv == 0) {
		var siml = 0.95;
	}
	else {
		var siml = 0.85;
	}
	//console.log('stonelv = ' + stonelv,'siml = ' + siml)
	var stoneDir = config.stoneDir;
	var StonesPath = getStoragePath() + '/' + stoneDir;
	var filename = StonesPath + '/stones_lv' + stonelv + '_1080_ALL_cmp.png';	
	var tImg = openImage(filename);
	var image = getScreenshotModify(46, 1478, 900, 330, 450, 165, 100);
	var results = findImages(image, tImg, siml, 12, true);
	var indexNum = -1
	for(var index in results) { 
		//var result = results[index];
		//rbm.log('index=' + index, result.x, result.y, result.score);

		indexNum = index * 1
	}
	releaseImage(tImg);
	releaseImage(image);
	
	return indexNum + 1;
}

function characterbubble() {  //角色對話泡包點擊 main
	if (!config.isRunning || characterbubbleSwitch == 0) return false;
	
	//tap(890, 1420, 50);
	//tap(890, 1420, 50);
	//tap(890, 1120, 100);
	var StoneNum = Stonecount(0)
	console.log('有 ',StoneNum, ' 個空格');
	if (StoneNum >= 6) {
		//console.log('有 ', Stonecount(0), ' 個空格');
		
		//tap(990, 1400, 200); //點包包下拉
		//tap(990, 1400, 200);
		
		var stoneDir = config.stoneDir;
		var StonesPath = getStoragePath() + '/' + stoneDir;	
		var filename1 = StonesPath + '/characterbubble.png';
		
		var tImg1 = openImage(filename1);
		
		for (var i = 0; i < 2; i++) {
			var image = getScreenshotModify(5, 255, 1075 - 5, 1900 - 255, 1075 - 5, 1900 - 255, 90);
			var results1 = findImages(image, tImg1, 0.8, 3, true);
			for(var index in results1) {
				var result1 = results1[index];
				
				//rbm.log('characterbubble = ',result1.x, result1.y, result1.score)

				var x1 = 5 + result1.x + 0
				var y1 = 255 + result1.y + 0
				
				if (x1 > 640 && x1 < 1080 && y1 > 175 & y1 < 575) {
					
				}
				else if (x1 > 0 && x1 < 141 && y1 > 730 & y1 < 1322) {
					
				}
				else{
					tap (x1, y1, 10);
				}
			}
			sleep(100);
			releaseImage(image);
		}
		releaseImage(tImg1);
		
		//AttackMode(1); //檢查背包打開/自動攻擊
	}
	else if (StoneNum < 6) {
		console.log('空格有 '+StoneNum+' 不足6個!不點角色!')
	}
}

function characterbubble2() {  //角色對話泡包點擊 main
	if (!config.isRunning || characterbubbleSwitch == 0) return false;
 
		console.log('有 個空格');
		
		var stoneDir = config.stoneDir;
		var StonesPath = getStoragePath() + '/' + stoneDir;	
		var filename1 = StonesPath + '/characterbubble.png';
		
		var tImg1 = openImage(filename1);
		
		for (var i = 0; i < 2; i++) {
			var image = getScreenshotModify(5, 255, 1075 - 5, 1900 - 255, 1075 - 5, 1900 - 255, 90);
			var results1 = findImages(image, tImg1, 0.8, 3, true);
			for(var index in results1) {
				var result1 = results1[index];
				
				//rbm.log('characterbubble = ',result1.x, result1.y, result1.score)

				var x1 = 5 + result1.x + 0
				var y1 = 255 + result1.y + 0
				
				if (x1 > 640 && x1 < 1080 && y1 > 175 & y1 < 575) {
					
				}
				else if (x1 > 0 && x1 < 141 && y1 > 730 & y1 < 1322) {
					
				}
				else{
					tap (x1, y1, 200);
				}
				break;
			}
			sleep(100);
			releaseImage(image);
		}
		releaseImage(tImg1);
		
	
}

function friendheartfind() {  //朋友送愛心尋找 藍→黃
	var stoneDir = config.stoneDir;
	var StonesPath = getStoragePath() + '/' + stoneDir;	
	var image = getScreenshotModify(640, 940, 95, 870, 95, 870, 90);
	
	var filename1 = StonesPath + '/friendheart_bule.png';
	var tImg1 = openImage(filename1);
	var results1 = findImages(image, tImg1, 0.9, 5, true);
	for(var index in results1) {
		var result1 = results1[index];
		if (!config.isRunning) {
			releaseImage(tImg1);
			releaseImage(image);
			return false;
		}
		//rbm.log('buleheart = ',result1.x, result1.y, result1.score)

		var x1 = 640 + result1.x + 40
		var y1 = 940 + result1.y + 40
		tap (x1, y1)
		sleep(800)
	}
	releaseImage(tImg1);
	sleep(400)
	
	var filename2 = StonesPath + '/friendheart_yellow.png';		
	var tImg2 = openImage(filename2);
	var results2 = findImages(image, tImg2, 0.9, 5, true);
	for(var index in results2) {
		var result2 = results2[index];
		if (!config.isRunning) {
			releaseImage(tImg2);
			releaseImage(image);
			return false;
		}
		//rbm.log('yellowheart = ',result2.x, result2.y, result2.score)

		var x2 = 640 + result2.x + 40
		var y2 = 940 + result2.y + 40
		tap (x2, y2)
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
		tap(700, 480, 100);sleep(2000)
		tap(700, 300, 100);sleep(2000)
		tap(540, 550, 100);sleep(4000)
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

function WhiteCrystalMake(Timer) { //收工藝裝備，製作工藝
	if (!config.isRunning || Date.now() < WhiteCrystalTimer) return false;
	if (!WhiteCrystalswitch) return false;
	console.log('收工藝裝備，製作工藝')
	
	var mooncount = Stonecount(15);
	if (mooncount == 0) return false;
	if (mooncount > 4) {mooncount = 4}
	
	var craftsmenu = 0;
	var WhiteCrystalTD = Date.now() - WhiteCrystalTimer
		
	if (Stonecount(0) < 4) {
		sleep(500);
		tap(990, 1400, 200); sleep(1000); //點包包下拉
		
		AttackMode(3);
	}
	
	for (var i = 0; i < 6; i++) {
		CheckImageTap(947, 1688, 87, 83, 0.9, 'craftsbutton.png', 1, 1, 1, 200, 1) //craftsbutton
		sleep(1000)
		
		rbm.keepScreenshotPartial(450, 830, 680, 940); // x1, y1, x2, y2
		var image = rbm.imageExists('craftsmenu.png', 0.90);
		rbm.releaseScreenshot();
		if (image) {
			craftsmenu = 1;
			//console.log('craftsmenu = ' + craftsmenu)
			break;
		}
	}
	
	rbm.keepScreenshotPartial(450, 830, 680, 940); // x1, y1, x2, y2
	var image = rbm.imageExists('craftsmenu.png', 0.97);
	rbm.releaseScreenshot();
	if (craftsmenu == 1) {  //CraftsOkOpen.png
		
		var craftsgetmake = 0;
		
		//收裝備
		var stoneDir = config.stoneDir;
		var StonesPath = getStoragePath() + '/' + stoneDir;
		
		var filename1 = StonesPath + '/craftsokopen.png';
		var tImg1 = openImage(filename1);
		var image1 = getScreenshotModify(110, 1100, 870, 140, 870, 140, 100);
		var results1 = findImages(image1, tImg1, 0.90, 3, true);
		
		for(var index in results1) {
			var result1 = results1[index];
			
			if (Stonecount(0) == 0) {
				FindStonesImages(5, 11, 0);    //合成  5  ==> 11
				CheckImageTap(947, 1688, 87, 83, 0.9, 'craftsbutton.png', 1, 1, 1, 200, 1) //craftsbutton
				sleep(1000)
				if (Stonecount(0) == 0) {
					keycode('BACK', 600)
					return false;
				}
			}

			var x0 = 110 + result1.x + 40 - 40;
			var y0 = 1100 + result1.y + 85 - 85;
			sleep(300)
			//rbm.log(result1.x, result1.y, result1.score);
			for (var i = 0; i < 1; i++) {
				tap(x0, y0, 50);sleep(1000)
				tap(x0, y0, 50);sleep(1000)
				tap(x0, y0, 50);sleep(1000)
				tap(x0, y0, 50);sleep(1000)
				CheckImageTap(490, 1060, 100, 160, 0.9, 'ok_button.png', 1, 1, 1, 200, 1) //OK_Button
				CheckImageTap(490, 1060, 100, 160, 0.9, 'ok_button.png', 1, 1, 1, 200, 1) //OK_Button
			}
			craftsgetmake = craftsgetmake + 1
		}	
		releaseImage(tImg1);
		releaseImage(image1);
			
		
		//製作裝備
		var craftTableX = new Array( '', 0, 0, 0, 0, 0)
		for (var n = 1; n <= 5; n++) { craftTableX[n] = 58 + 241 * (n - 1) };
		var filename2 = StonesPath + '/CraftsMake.png';	
		var tImg2 = openImage(filename2);
		var image2 = getScreenshotModify(60, 940, 1020, 960,  1020, 960, 100);
		var results2 = findImages(image2, tImg2, 0.90, mooncount, true);
		releaseImage(tImg2);
		releaseImage(image2);
		
		for(var index in results2) {
			var result2 = results2[index];
			var x1= 120 + result2.x + 40
			var y1 = 1000 + result2.y + 40
			//rbm.log(result2.x, result2.y, result2.score);
			
			
			for (var i = 0; i < 1; i++) {
				CheckImageTap(947, 1688, 87, 83, 0.9, 'craftsbutton.png', 1, 1, 1, 200, 1) //craftsbutton
				sleep(500)
				
				tap(x1, y1, 20);
				
				var MakeListEx = 0;
				for (var k = 0; k < 10; k++) {
					sleep(1000);
					rbm.keepScreenshotPartial(330, 560, 550, 630); // x1, y1, x2, y2
					var image = rbm.imageExists('CraftsMakeList.png', 0.8);
					rbm.releaseScreenshot();
					if (image) {
						MakeListEx = 1;
						break;
					}
				}
				/*
				if (MakeListEx == 1) {
					
					if (CraftsMakeEatneedleswitch == 1 && x1 > 110 && x1 < 380){
						CraftsMakeSelect(1);
					}
					else if (CraftsMakeIceneedleswitch == 1 && x1 > 405 && x1 < 675){
						CraftsMakeSelect(2);
					}
					else{
						CraftsMakeSelect(3);
					}
				}
				*/
				if (MakeListEx == 1) {
						 if (x1 > craftTableX[1] && x1 < craftTableX[2]){ CraftsMakeSelect(CraftsMake1switch); }
					else if (x1 > craftTableX[2] && x1 < craftTableX[3]){ CraftsMakeSelect(CraftsMake2switch); }
					else if (x1 > craftTableX[3] && x1 < craftTableX[4]){ CraftsMakeSelect(CraftsMake3switch); }
					else if (x1 > craftTableX[4] && x1 < craftTableX[5]){ CraftsMakeSelect(CraftsMake4switch); }
				}
			}
			craftsgetmake = craftsgetmake + 1
		}
		keycode('BACK', 1000);
	}
	
	
	tap(990, 1400, 200); sleep(300); //點包包下拉
	tap(990, 1400, 200); sleep(300); //點包包下拉
	tap(990, 1400, 200); sleep(300); //點包包下拉
	tap(990, 1400, 200); sleep(300); //點包包下拉
	AttackMode(1);
	
	WhiteCrystalTimer = Date.now() + Timer * 1000;
	
}

function CraftsMakeSelect(CraftsSelect){ //製作工藝，物品選擇  1:食針  2:冰針  3:水晶
	if (!config.isRunning) return false;
	if (CraftsSelect == 0) return false;
	//console.log('開始製作工藝');
	
	var itemEN = new Array('', 'Solar Stone Craft[Rare~Unique]', ' Advanced miracle Card', ' Middle Miracle Card', ' Beginner Miracle Card', 'Phoenix Craft[normal~Unique]', ' Expanding Bag Scroll', ' Hat Craft', ' Armor Craft', ' Energy of Solar Craft', ' Shining Item Crystal Craft', ' Crystal Craft(Crescent)');
	var itemTC = new Array('', '[手藝]太陽石【稀有~獨特】', '高級奇蹟卡工藝', '中級奇蹟卡工藝', '初級奇蹟卡工藝', '白色鳳凰', 'Expanding Bag Scroll', '[初級]帽子工藝', '裝備手藝', 'Energy of Solar', '[手藝]閃亮水晶', '[手藝]白水晶');
	var itemTCnew = new Array('', '1.太陽石', '2.高級卡', '3.中級卡', '4.初級卡', '5.鳳凰', '6.背包卷', '7.帽子卷', '8.裝備卷', '9.太陽水晶', '10.閃亮水晶', '11.白水晶');
	
	var CraftItem = 'craftlist_' + CraftsSelect + '.png';
	console.log('開始製作工藝', itemTCnew[CraftsSelect]);
	

	tap(980, 1730, 80);
	tap(980, 1730, 80);
	sleep(1000);
	
	tap(800, 800, 100);
	sleep(2000);
	
	
	
	for (var j = 0; j < 7; j++) {
		if (!config.isRunning) return false;
		
		rbm.keepScreenshotPartial(55, 340, 735, 1330); //找設定齒輪，點擊切換區域
		var itemImg = rbm.findImage(CraftItem, 0.9);
		//rbm.log('j:', j, ', itemTCnew[CraftsSelect]:', itemImg)

		if (itemImg != undefined && itemImg.score >= 0.9) {
			console.log('Find:', itemTCnew[CraftsSelect]);
			tap(itemImg.x, itemImg.y, 200);
			sleep(2500);
			
			console.log('Tap Found:', itemTCnew[CraftsSelect]);
			keycode('BACK', 100);
			sleep(500)
			keycode('BACK', 100);
			sleep(1000);
			
			console.log('BACK:', itemTCnew[CraftsSelect]);
			sleep
			break;
		}
		else {
			var outImg0 =  rbm.findImage('outcrafteslist_0.png', 0.9);
			var outImg1 =  rbm.findImage('outcrafteslist_1.png', 0.9);
			var outImg2 =  rbm.findImage('outcrafteslist_2.png', 0.9);
			var outImg5 =  rbm.findImage('outcrafteslist_5.png', 0.9);
			if (outImg0 == undefined &&  outImg1 == undefined &&  outImg2 == undefined &&  outImg5 == undefined) { 
				DIY_swipe(980, 1220, 980, 430, 150, 800);
			}
			else if (outImg0 != undefined ||  outImg1 != undefined ||  outImg2 != undefined ||  outImg5 != undefined) { 
				console.log('Not Found:', itemTCnew[CraftsSelect]);  break;
			}
		}

		rbm.releaseScreenshot();
		
		sleep(1000);
		ResterTimerSet = Date.now();
	}

		
	/*
	var CraftsMakeItem = new Array(0,'CraftsMakeEatneedle','CraftsMakeIceneedle','CraftsMakeMoon');
	var MakeFile = CraftsMakeItem[CraftsSelect] + '_TC.png'
	var DoitFile = CraftsMakeItem[CraftsSelect] + 'Doit_TC.png'
	//console.log(MakeFile, DoitFile)
	
	for (var j = 0; j < 3; j++) {
		//console.log('1j=',j)
		if (j == 0){
			if (CraftsSelect == 1){
				var craftOkButton_Y = 1580;
			}
			else if (CraftsSelect == 2){
				var craftOkButton_Y = 1580;
				xy_swipe(150, 1250, 150, 780, 25);
			}
			else if (CraftsSelect == 3){
				var craftOkButton_Y = 1440;
				for (var i = 0; i < 5; i++){
					xy_swipe(150, 1250, 150, 780, 25);
				}
			}
		}
		else {
			if (CraftsSelect == 1){
				var craftOkButton_Y = 1580;
				xy_swipe(150, 780, 150, 1250, 25);
			}
			else if (CraftsSelect == 2){
				var craftOkButton_Y = 1580;
				xy_swipe(150, 750, 150, 1250, 25);
				sleep (500);
				xy_swipe(150, 1250, 150, 780, 25);
			}
			else if (CraftsSelect == 3){
				var craftOkButton_Y = 1480
				xy_swipe(150, 1250, 150, 750, 25);
			}
		}
		
		//console.log('2j=', j, craftOkButton_Y);
		rbm.keepScreenshotPartial(440, 820, 770, 1340); // x1, y1, x2, y2
		var image1 = rbm.imageExists(CraftsMakeItem[CraftsSelect] + '_TC.png', 0.9);
		rbm.releaseScreenshot();
		if (image1) {
			rbm.imageClick(CraftsMakeItem[CraftsSelect] + '_TC.png', 0.9)
			rbm.imageClick(CraftsMakeItem[CraftsSelect] + '_TC.png', 0.9)
		}
		
		rbm.keepScreenshotPartial(450, 1040, 840, 1500); // x1, y1, x2, y2
		var image1 = rbm.imageExists(CraftsMakeItem[CraftsSelect] + 'Doit_TC.png', 0.9);
		rbm.releaseScreenshot();
		if (image1) {
		//if (image1 || image2) {
			sleep(2000)
			CheckImageTap(470, 1100, 130, 580, 0.9, 'craftsbuttonOK.png', 1, 1, 1, 200, 1) //OK_Button
			CheckImageTap(470, 1100, 130, 580, 0.9, 'craftsbuttonOK.png', 1, 1, 1, 200, 1) //OK_Button
			console.log('CraftsMakeDoit')
			sleep(2000)
			break;
		}
		
		sleep(800);
		ResterTimerSet = Date.now();
	}
	*/
	
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
			tap(tapx, tapy); sleep(200);
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
				tap(260, 580);
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
	else if (AreaID == 3 && Date.now() > AreaTimer3 ) {  //副本
		AreaChangelistclick();
		tap(travelareaX, 460, 20); sleep(1000); //點擊 副本
		
		
		AreaTimer3 = Date.now() + Timer * 1000
	}
	else if (AreaID == 4 && Date.now() > AreaTimer4 ) {  //城鎮
		AreaChangelistclick();
		tap(travelareaX, 460, 20); sleep(1000); //點擊 城鎮
		
		AreaTimer4 = Date.now() + Timer * 1000
	}
	else if (AreaID == 5 && Date.now() > AreaTimer5 ) {  //強制回礦區
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
					tap(260, 580);
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
			for(var i = 0; i <= 20; i++) {
				CheckImageTap( 20,  870, 145, 485, 0.80, 'goldx2_button.png', 1, 1, 1, 200, 1);   //Goldx2_Button
				CheckImageTap(505,  915, 290,  50, 0.80, 'goldx2_OK.png', 430, 1130, 1, 200, 0);   //Goldx2_OK
				
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
		else{
			rbm.keepScreenshotPartial(320, 1090, 500, 1190); // x1, y1, x2, y2
			var checkImg2 = rbm.imageExists('Rebirth_ADWatch.png', 0.80);
			rbm.releaseScreenshot();
			if (checkImg2) {
				console.log('廣告重生')
				for(var i = 0; i <= 10; i++) {
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
	if ( DougeonWFStoneswitch > 0 && Date.now() > Dougeon_WFStoneTimer) {
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
						CheckImageTap(600,  200, 470, 750, 0.9, 'closeboard.png', 1, 1, 1, 2, 1); //closeboard
						
						ResterTimerSet = Date.now()
						Dougeon_WFStoneTimer = Date.now() + Timer * 1000
						return false;
					}
					else if (dungeonbattletimes > 0) {
						console.log('門票：' + j + '張, 未到設定：' + DungeonTicketsset + '，開打')
						rbm.releaseScreenshot();
						
						if (DougeonWFStoneswitch == 1){
							Dougeon_WFFight(dungeonbattletimes);
						}
						else if (DougeonWFStoneswitch >= 2){
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

function Dougeon_WFFight(dbtimes){  //地城 打水火石

	tap (810, 1450, 120);
	tap (810, 1630, 120);
	tap (810, 1450, 120);
	tap (810, 1630, 120);
	
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

function Dougeon_500k1mFight(){ //地城 打500K or 1M
	if (!config.isRunning) return false;
	console.log('地城 500K or 1M');
	
	for (var i = 0; i < 5; i++){
		deadcheck(50);
		
		xy_swipe(300, 1740, 300, 1320, 25); //移動單次檢查基礎 380向上
		sleep(500)
		
		rbm.keepScreenshotPartial(130, 620, 265, 1770);
		var targetPic2 = rbm.findImage('underground_500k_1m.png', 0.90);
		rbm.releaseScreenshot();
		
		if (targetPic2 != undefined && targetPic2.score > 0.90) {  //確認找到 500k & 1m 地下城
			var x1 = targetPic2.x;
			var y1 = targetPic2.y + 200 * (DougeonWFStoneswitch - 2);
			
			tap(x1, y1); sleep(200);
			tap(x1, y1); sleep(200);
			tap(x1, y1); sleep(200);
			
			break;
		}
	}
	
}

function deadcheck(checktimer){
	if (!config.isRunning) return false;
	console.log('吃土檢查！');
	
	
	rbm.keepScreenshotPartial(260, 1080, 830, 1220);
	var targetPic2 = rbm.imageExists('deadcheckwait.png', 0.95);
	rbm.releaseScreenshot();

	if (targetPic2) {
	
		var deadcheckf = 0;
		for (var j = 0; j < checktimer; j++){
			if (!config.isRunning) return false;
			
			rbm.keepScreenshotPartial(260, 1080, 830, 1220);
			var targetPic1 = rbm.imageExists('deadcheckwait.png', 0.95);
			rbm.releaseScreenshot();

			if (targetPic1) {  //確認找到人死的證據
				console.log('穢土轉生結印 ',j/2,' 秒')
				sleep(500);
				deadcheckf = 0;
			}
			else if(!targetPic1 & deadcheckf < 2) {
				deadcheckf = deadcheckf + 1;
			}
			else if(!targetPic1 & deadcheckf >= 2) {
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
		AreaTimer5 =  Date.now();  //頻道
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
					var y1 = target1.y - ( 3 - Math.floor(eightdragonhuntermap/3) ) * 135;
					//console.log('XY1', eightdragonhuntermap - Math.floor(eightdragonhuntermap/3))
					//console.log(x1, y1)
					tap(x1, y1)
					sleep(1000);
			
						rbm.keepScreenshotPartial(790, 1080, 940, 1680); // x1, y1, x2, y2
						var target2 = rbm.findImage('underground_entrycheck.png', 0.80);
						rbm.releaseScreenshot();
						if (target2 != undefined && target2.score > 0.80) {
							var x2 = target2.x + 55;
							var y2 = target2.y + 26 + ( eightdragonhuntermap - Math.floor(eightdragonhuntermap/3) * 3 ) * 135;
							//console.log( 'XY2', eightdragonhuntermap - Math.floor(eightdragonhuntermap/3) * 3 );
							//console.log(x2, y2);
							tap(x2, y2)		;			
							sleep(1000);
							
							for (var j = 0; j < 3; j++){
								rbm.keepScreenshotPartial(720, 500, 940, 610); // x1, y1, x2, y2
								var target3 = rbm.findImage('underground_quickentry.png', 0.80);
								rbm.releaseScreenshot();
								if (target3 != undefined && target3.score > 0.80) {
									var x3 = target3.x + 50;
									var y3 = target3.y + 20 + 580;
									//console.log(x3, y3);
									tap(x3, y3);			
							
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

function stonecompoundnotup(stonelv1,stonelv2) {  //指定石頭不跳階合成
	if (!config.isRunning) return false;
	
	for (var i = 0; i < 10; i++) {
		rbm.keepScreenshotPartial(40, 1815, 480, 1890); // x1, y1, x2, y2
		var target1 = rbm.imageExists('buffer_stonelvup_on.png', 0.80);
		var target2 = rbm.imageExists('buffer_stonelvup_off.png', 0.80);
		if (target1) {
			rbm.imageClick('buffer_stonelvup_on.png', 0.80);
		}
		if (target2) {
			FindStonesImages(stonelv1, stonelv1, 0);    //合成  12  ==> 12
			rbm.imageClick('buffer_stonelvup_off.png', 0.80);
			break;
		}
		rbm.releaseScreenshot();
		
		sleep(200)
	}
}

function DailyAchievene(Timer) { //ReceiveDaily
	if (!config.isRunning || Dailyswitch == 0 ) return false;
	if (Date.now() < DailyAchieveneTimer) { return false; }
	
	for (var i = 0; i < 15; i++) {
		if (!config.isRunning) return false;
		
		CheckImageTap(930, 150,  50, 255, 0.85,  'Achievene.png', 1, 1, 1, 300, 1); //Achievene
		CheckImageTap( 65, 860, 150,  70, 0.85, 'ReceiveAll.png', 1, 1, 1, 300, 1); //Achievene		
		sleep(1000);
		
		rbm.keepScreenshotPartial( 50, 870, 225, 935); // x1, y1, x2, y2
		var checkImg1 = rbm.imageExists('ReceiveAll_dark.png', 0.90);
		rbm.releaseScreenshot();
		if (checkImg1) {
			tap(995, 905, 100); sleep(200);
			tap(995, 905, 100); sleep(200);
			console.log('ReceiveAll_dark Break DailyAchievene')	
			DailyAchieveneTimer = Date.now() + Timer * 1000
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
				
			if ( combinecount > -15) {
				FindStonesImages(min, StonMax, 0); //合成  min ~ max
			}
			else if (combinecount <= -15) {
				//console.log(' combinecount <= -10');
				
				for (var i = 0; i < 27; i++) {
					StoneCountArray[i] = 99;
				}
				
				FindStonesImages(min, 18, 0);
				combinecount = 0;
			}
			
			rain_fastdig();  //下雨天快速挖
		}
		else if (eightdragonswitch == 1 && Stonecount(15) < eightdragonmoonset) {
			console.log('8龍模式，合成6~13，彎月未滿 ' + eightdragonmoonset + ' 個')
			FindStonesImages(6, 13, 0);    //合成  5  ==> 13
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
					console.log('彎月數量 = ',Stonecount(15),', 累計檢查次數 = ', EDbackminigmooncount);
					
					if (EDbackminigmooncount >= 6) {
						AreaTimer5 =  Date.now();  //強制回礦區
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
		
		FindStonesImages(6, 13, 0);    //合成  5  ==> 13
		AreaChange(6, CHLpersontimeset); // Change to channels
		AD_Goldx2(AD_Goldx2timeset); //打獵 2倍金幣&看廣告自動重生
		CheckImageTap(470, 1120, 610 - 470, 1170 - 1120, 0.9, 'Rebirth_Now.png', 1, 1, 1, 200, 1); //Rebirth_Now
		
		CheckImageTap(484,  1026, 107,  62, 0.9, 'deadlevetbutton.png', 1, 1, 1, 200, 1);   //dead in 1m levetbutton
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

function timer(t, st) {
	if (!config.isRunning) return false;
	
	for (var i = 1; i <= t; i++) {
		if (!config.isRunning) return false;
		sleep(1000);
		
		if ( st == 1 ) {
			console.log('wait ', i, ' /', t, ' sec');
		}
	}
}

function test(a) {
	config.isRunning = true;
	
	for(var n = 0; n <= a; n++) {
		if (!config.isRunning) return false;
		
		
		if (n == 0) {
			
			DougeonWFStoneswitch = 3;   //打水火石             0:關  1:開
			DungeonTicketsset    = 0;   //打水火石剩餘票設定    0:打光所有票  11:時間為 0:00
			DungeonRoomset       = 1;   //打水火石等級設定      0:不打     1:Beginner  2:Easy  
									              	//                     3:Normal   4:Hard      5:Hell

			//合成方式調整
			dectcompraw1 =   2;       //1:正常模式  2:手抖模式  3:手殘模式
			dectcompraw2 = 100;
			dectcompraw3 = 2000;
			dectcompraw4 = 100;										
										
			eightdragonchangswitch = 0;
			mooncompswitch         = 0;
			combinecount           = 0;
			friendheartswitch      = 0;
			RubyBoxClick           = 0;
			characterbubbleSwitch  = 1;
			AD_GetRubyswitch       = 0;
			eightdragonhuntermap   = 3;
			RestartAppswitch       = 1;
				
			stonelvmin = 7;
			
			RestartApptimeset = 120;
			
			friendheartTimer     = Date.now() + 30 * 1000;
			AD_GetRubyTimer      = Date.now() + 50 * 1000;
			ResterTimerSet       = Date.now() + 0 * 1000;
			WhiteCrystalTimer    = Date.now() + 10 * 1000;
			Dougeon_WFStoneTimer = Date.now() + 40 * 1000;  //打水火石
			AD_Goldx2Timer       = Date.now() + 10 * 1000;  //打獵區金幣2倍&重生
			DailyAchieveneTimer  = Date.now() + 20 * 1000  //DailyAchieveneTimer
			
			AreaTimer1 =  Date.now();  //頻道
			AreaTimer2 =  Date.now();  //狩獵區
			AreaTimer3 =  Date.now();  //副本
			AreaTimer4 =  Date.now();  //城鎮
			AreaTimer5 =  Date.now();  //強制回礦區
			AreaTimer6 =  Date.now();  //切換少人頻道
			
			DailyAchieveneTimer  = Date.now() + 20 * 1000  //DailyAchieveneTimer
			Dougeon_WFStoneTimer = Date.now();  //打水火石
			
		}
		else if (n > 0) {
			console.log('n:', n, ', 腳本測試開始');
			// var aa = 0;
			// CraftsMakeSelect(n);
			// MergerStone(1, 24);
			// sleep(500);
			// FindStonesImages2(1, 24);

			while(config.isRunning) {FindStonesImages2(1, 24);}    //合成  5  ==> 8		
			
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
}

function stop() {
	config.isRunning=false;
}

function start( dectcomprawT1, dectcomprawT2, dectcomprawT3, dectcomprawT4, min, max, rainmax, friendheart, ad_ruby, charabubble, rainfastdig, WCrystal, moonkeep, CraftsMake1, CraftsMake2, CraftsMake3, CraftsMake4, DWFStone, DTickets, DWFroomlv, EightDragon, EDmoonkeep, EDareachange, EDmoonback, EDgotohunter, resetapp, resetapptime, goldx2, goldx2T, CHLperson, CHLpersonT, DailyAchieveneT) {
	config.isRunning = true;
	combinecount = 0;
	ScreenCheck = 0;
	RubyBoxClick = 0;
	EDbackminigmooncount = 0;
	
	//合成方式調整
	dectcompraw1 = dectcomprawT1
	dectcompraw2 = dectcomprawT2
	dectcompraw3 = dectcomprawT3
	dectcompraw4 = dectcomprawT4
	console.log('合成方式調整防偵測:', dectcompraw1, dectcompraw2, dectcompraw3, dectcompraw4)
	
	
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
	
	
	friendheartTimer = Date.now() + 30 * 1000;
	AD_GetRubyTimer = Date.now() + 50 * 1000;
	ResterTimerSet = Date.now() + 0 * 1000;
	WhiteCrystalTimer = Date.now() + 10 * 1000;
	Dougeon_WFStoneTimer = Date.now() + 40 * 1000;  //打水火石
	AD_Goldx2Timer = Date.now() + 10 * 1000;  //打獵區金幣2倍&重生
	DailyAchieveneTimer = Date.now() + 20 * 1000  //DailyAchieveneTimer
	
	AreaTimer1 =  Date.now();  //頻道
	AreaTimer2 =  Date.now();  //狩獵區
	AreaTimer3 =  Date.now();  //副本
	AreaTimer4 =  Date.now();  //城鎮
	AreaTimer5 =  Date.now();  //強制回礦區
	AreaTimer6 =  Date.now();  //切換少人頻道

	
  //StoneCountArray = new Array( 1, 2, 3, 4, 5, 6, 7, 8, 9,10, 1, 2, 3, 4, 5, 6, 7, 8, 9,10, 1, 2, 3, 4, 5, 6, 7, 8);
	StoneCountArray = new Array(99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99);
	
	while(config.isRunning) {
		// StoneCompound(stonelvmin, normalstonelvmax, rainstonelvmax);
		StoneCompound(stonelvmin, normalstonelvmax);
	}
}
