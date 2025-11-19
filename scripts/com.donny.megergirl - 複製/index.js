importJS('RBM-0.0.3');
importJS('donnyLib');
// importJS('/storage/emulated/0/Download/Robotmon/scripts/com.donny.megergirl/lib/donnyLib.js');
// importJS('/sdcard/Download/Robotmon/scripts/com.donny.megergirl/lib/donnyLib.js');

////COMMAND START/STOP
//runSwitch = 0;

////ROBOTMON DEFAULT SETTING
var config = {
    appName: 'com.donny.megergirl',
    oriScreenWidth: 720, // source
    oriScreenHeight: 1280,
    oriVirtualButtonHeight: 0,
    oriResizeFactor: 1,
    eventDelay: 50,
    imageThreshold: 1,
    imageQuality: 100,
    resizeFactor: 1, // small -> quickly
    scriptDir: 'scripts/com.donny.megergirl/images',
    isRunning: false,
	PackangName: 'com.gamepub.hab.g',
	LaunchActivityName: 'com.unity3d.player.MergeGirlsUnityPlayerActivity',
	ggPackageName: 'com.nquihwfk',
	ggLaunchActivityName: 'com.nquihwfk.ActivityMain'
  };
  var rbm = new RBM(config);
  rbm.init();

//==============================功能性function=====================================//

function useReturn(choiceF){          //各項回授點檢查
	if (!config.isRunning) return false;
	//console.log('各項升級限制條件');

	switch (choiceF) {
		case  1: return CheckImageTap( 120,  480, 370,  810, 0.95, 'GG_gamecrush_menu_2.png', 1, 1, 1, 50, 2, 1); return;   // OK
		case  2:
			rbm.keepScreenshotPartial( 440, 10, 570, 70);
			var Img1 = rbm.findImage('speedx2.png', 0.90);        //檢查2倍速圖示
			var Img2 = rbm.findImage('speedx3.png', 0.90);        //檢查3倍速圖示
			rbm.releaseScreenshot();

			if(Img1 != undefined || Img2 != undefined){return true;}
			return false;

		case  3: return CheckImageTap( 600,  780, 710,  870, 0.95, 'Stone_win_ability_06.png', 1, 1, 1, 50, 2, 0); return;   //  OK
		case  4: return CheckImageTap(   5,  730,  55,  775, 0.95, 'main_winItem_attackPower.png', 1, 1, 1, 50, 2, 0); return;   // OK
		case  5: return 
		case  6: return 
		case  7: return
		case  8: return 
		case  9: return 
		case 10: return 
		case 11: return 
		case 12: return 
		case 13: return 
		case 14: return 
		case 15: return 

		case 50: return checkPointColor3(360, 640, 40, '00BEFF', 360, 660, 40, 'FFFFFF', 360, 760, 40, '6D370C'); return;   //看box廣告圖示點 ok
		// case 52: return checkPointColor3( 15, 515, 50, '0168A5', 125, 515, 50, 'B31B0F', 240, 515, 50, '45681F'); return;   //材料地下城材料清單 新版y差+20 ok

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


		case 61: return CheckImageTap( 30,  440, 64,  474, 0.90, 'guildeventicon.png', 1, 1, 1, 50, 2);       return;   //對話頻道橘色驚嘆號

		case 81: return CheckImageTap( 300,  340, 415,  380, 0.90, 'areafightchoice.png', 1, 1, 1, 50, 2);       return;   //競技場挑戰對手文字
		case 82: return CheckImageTap( 390,   70, 440,  140, 0.90, 'arena_rest.png', 1, 1, 1, 50, 2);            return;   //競技場商店文字，當日停戰

		case 91: return CheckImageTap( 600,    0, 720,   60, 0.90, 'guildbosshelpRY.png', 1, 1, 1, 50, 2);       return;   //工會BOSS,右上?圖

		case 101: return CheckImageTap( 625,  10, 710,   70, 0.90, 'mainpagebutton_bk.png', 1, 1, 1, 50, 2, 1);    return;   //右上功能圖示_模糊

	}
}

function recoNum(choiceF) {        //各項數字辨識
	if (!config.isRunning) return false;
	//console.log('各項數字辨識', choiceF);

	switch (choiceF) {
		case  1: return	num_Recognition(Game04Chkpoint[1][1], Game04Chkpoint[1][2], Game04Chkpoint[1][3], Game04Chkpoint[1][4], 0.94, 'num_gray/game4_num_blk_', 1); break;  // 位置1 數字
		case  2: return	num_Recognition(Game04Chkpoint[2][1], Game04Chkpoint[2][2], Game04Chkpoint[2][3], Game04Chkpoint[2][4], 0.94, 'num_gray/game4_num_blk_', 1); break;  // 位置2 數字
		case  3: return	num_Recognition(Game04Chkpoint[3][1], Game04Chkpoint[3][2], Game04Chkpoint[3][3], Game04Chkpoint[3][4], 0.94, 'num_gray/game4_num_blk_', 1); break;  // 位置3 數字
		case  4: return	num_Recognition(Game04Chkpoint[4][1], Game04Chkpoint[4][2], Game04Chkpoint[4][3], Game04Chkpoint[4][4], 0.94, 'num_gray/game4_num_blk_', 1); break;  // 位置4 數字

	}
}

//MENU CHOICE
function mainMenuChoice(page) {
	if (!config.isRunning) return false;
	if (!useReturn(4)) return false;
	//1st MenuIcon X,Y = 5,1205
	var intX = 5;
	var intY = 1205;

	var disX = 120;
	var disY = 0;

	var checkColor = "CE9663";
	var notcheckColor = "633D42";

	var posX = intX + (page - 1) * disX;
	var posY = intY + (page - 1) * disY;

	for (var i = 0; i < 4; i++){
		var posChk1 = checkPointColor(posX, posY, 20, checkColor);
		var posChk2 = checkPointColor(posX, posY, 20, notcheckColor);
		if (posChk1) {
			sleep(500);
			return false;
		} else if (posChk2) {
			tapFor(posX, posY, 5, 60, 500, 200);
		}
		sleep(500);
	}

	console.log("mainMenuChoice :", page);
}

function megerAbilityTap(item, taps) {
	if (!config.isRunning) return false;
	if (!useReturn(4)) return false;

	//1st MenuIcon X,Y = 5,1205
	var intX = 352;
	var intY = 820;

	var disX = 60;
	var disY = 0;

	var posX = intX + (item - 1) * disX;
	var posY = intY + (item - 1) * disY;

	tapFor(posX, posY, taps, 60, 200, 100);
	console.log("megerAbilityTap :", item);
}

////FLOW FUNCTION
function ggCrackWinChk() {
	if (!config.isRunning) return false;

	mainMenuChoice(2);
	var maxSoneCrackChk1 = 	CheckImageTap(670, 1150, 715, 1180, 0.95, 'megerMenu_maxSaveStone_nocrack.png', 1, 1, 1, 100, 2, 0);
	sleep(100);
	var maxSoneCrackChk2 = 	CheckImageTap(670, 1150, 715, 1180, 0.95, 'megerMenu_maxSaveStone_crack.png', 1, 1, 1, 100, 2, 0);
	sleep(100);
	
	if (maxSoneCrackChk1) {
		console.log('Meger Menu MaxSaveStone : No Crack')
		megerAbilityTap(2, 4);
		ggCrackStart(1);

	} else if (maxSoneCrackChk2) {
		console.log('Meger Menu MaxSaveStone : Crack')



		sleep(500);
		return false;
	} else {
		console.log('Meger Menu MaxSaveStone : Fail')
		megerAbilityTap(2, 4);

	}
}

function getDailyRewardAD() {
	if (!config.isRunning) return false;
	if (!watchADgetReward) return false;

	tapFor(570, 96, 4, 50, 70, 2000, 200);

	for (var i = 1; i <= 6; i++) {
		// console.log('get Daily Reward AD, i :', i, 'Start');
		if (DailyAD_Chk[i]) {
			var tapX = DailyAD_X[i];
			var tapY = DailyAD_Y[i];

			var watchChk = CheckImageTap(40, 745, 685, 1180, 0.80, 'DailyReward_AD_'+i+'.png', 0, 0, 1, 50, 2, 1);
			if (watchChk) {
				for (var j = 1; j < 20; j++) {
					if (!config.isRunning) return false;

					tapFor(tapX, tapY, 1, 100, 1500, 100);
					
					sleep(1000);

					var watchChk = CheckImageTap(40, 745, 685, 1180, 0.80, 'DailyReward_AD_'+i+'.png', 0, 0, 1, 50, 2, 1);
					if (!watchChk) {break;}

				}

				for (var ti = 1; ti <= 63; ti++){
					if (!config.isRunning) return false;

					sleep(1000);
					console.log('AD wait time :', ti, 'sec');
				}
				
				keycode('HOME', 200); sleep(1000);
				keycode('HOME', 200); sleep(2000);

				rbm.startApp(config.PackangName,config.LaunchActivityName);
				sleep(5500);

				tapFor(700, 220, 10, 50, 70, 500, 200);
				sleep(3000);

				return true;

			} else {
				if (i == 6)	{	
					tapFor(124, 1218, 4, 50, 70, 200, 200);
					watchADgetReward = 0;
					return false;
				}
				
			}
		}
		
		sleep(100);
		
		// console.log('get Daily Reward AD, i :', i, 'End');
	}
}

/////QUESTS
function underGround() {
	if (!config.isRunning) return false;
	if (!underGroundSW) return false;

	for (i = 0; i <= 0; i++){
		var fileName = 'under_010' + i + '_choiceRoom.png'

		if(i == 0) {
			var choiceRoom = CheckImageTap(285, 145, 440, 200, 0.95, fileName, 1, 1, 1, 100, 2, 1);
		}else {
			var choiceRoom = CheckImageTap(320, 690, 600, 850, 0.95, fileName, 1, 1, 1, 100, 2, 1);
		}

		if (choiceRoom) {
			tapFor(430, 670, 2, 50, 100, 1000);
			tapFor(640, 1230, 2, 50, 100, 2000);
			break;
		}
	}

	var choiceRoom = CheckImageTap(280, 600, 440, 650, 0.95, 'under_0200_choiceTactics.png', 1, 1, 1, 100, 2, 1);
	if (choiceRoom) {
		for(var i = 1; i <= 4; i++) {
			if (!config.isRunning) return false;

			var choceFinish = CheckImageTap(90, 915, 630, 945, 0.95, "under_0299_tactics.png", 1, 1, 1, 100, 2, 1);
			if (choceFinish) {
				tapFor(610, 1180, 3, 50, 100, 1000);
				break;
			}

			var fileName = "under_020" + i +"_tactics.png"
			CheckImageTap(45, 760, 605, 820, 0.95, fileName, 1, 1, 2, 700, 1, 1);

			sleep(100);
		}
	}

	CheckImageTap(470, 1090, 535, 1130, 0.95, 'under_0300_tactics.png', 1, 1, 5, 1000, 1, 1);
	

	for (i = 1; i <= 60; i++) {
		if (!config.isRunning) return false;

		var fighting = getOver = CheckImageTap(5, 730, 55, 780, 0.95, 'under_0600_markFighting.png', 1, 1, 2, 1000, 2, 0);
		if(fighting) {
			sleep(1000);
			console.log('Fighting ', i, 'sec...');
		}else{
			break;
		}

	}

	CheckImageTap(180, 630, 350, 880, 0.95, 'under_0401_fightOver.png', 120, 1215, 2, 1000, 0, 1);
	CheckImageTap(280, 830, 450, 880, 0.95, 'under_0400_fightOver.png', 610, 1180, 3, 1000, 0, 1);

	var getOver = CheckImageTap(255, 830, 360, 880, 0.95, 'under_0500_gateOver.png', 1, 1, 2, 1000, 2, 1);
	if (getOver) {
		tapFor(360, 1050, 4, 50, 100, 1000);
		tapFor(120, 1215, 11, 50, 100, 1000);

		// underGroundSW = 0;
		return false;
	}

	CheckImageTap(580, 1040, 650, 1090, 0.95, 'under_0700_intounderground.png', 1, 1, 1, 1000, 1, 1);
	
	CheckImageTap(30, 970, 130, 1060, 0.95, 'under_0800_undergroundLevel35.png', 610, 1015, 1, 1500, 0, 1);
	CheckImageTap(500, 620, 600, 690, 0.95, 'under_0801_undergroundGO.png', 1, 1, 1, 1000, 1, 1);

	var ticketOver = CheckImageTap(565, 200, 650, 240, 0.95, 'under_0802_ticketx0.png', 1, 1, 1, 1, 2, 1);
	if (ticketOver) {
		tapFor(120, 1215, 5, 100, 100, 1000);

		underGroundSW = 0;
		return false;
	}
}

function checkGameStuck(chkL) {
	if (!config.isRunning) return false;

	var manaCheck = ['', 'bar_mana_01.png', 'bar_mana_02.png', 'bar_mana_03.png'];

	intX = 0
	intY = 719
	finX = 118
	finY = 727

	for (var i = 1; i <= 3; i++) {
		rbm.keepScreenshotPartial( intX, intY, finX, finY);  //x2 + x3 倍速選單圖示

		var targetImg1 = rbm.findImage(manaCheck[i], 0.96);
		if (targetImg1 != undefined) {
			rbm.log(manaCheck[i] + ':', targetImg1);
			count = manaCheckResults.push(targetImg1.x);
			break;
		} else {
			rbm.log(manaCheck[i] + ':', 'Not Found!!');
		}
		rbm.releaseScreenshot();
	}

	// manaCheckResults = [1, 1, 1, 1, 1, 1, 1];

    if (count > chkL) {
        manaCheckResults.shift(); // 若長度超過 5，則刪除第一個元素
		
		var allEqual = manaCheckResults.every(function(val) {
			return val === manaCheckResults[0];
		});

    }else{
		allEqual = 0;
	}
	rbm.log(count, ', ', manaCheckResults)

	rbm.log('allEqual:', allEqual);

	return allEqual
}

////GG CRACK FLOW
function ggCrackStart(mode) {
	if (!config.isRunning) return false;

	CheckImageTap(5, 100, 55, 660, 0.95, 'GG_startCrack_icon.png', 1, 1, 1, 1500, 1, 1);
	CheckImageTap(100, 60, 175, 1200, 0.95, 'GG_startCrack_game_icon.png', 1, 1, 1, 1500, 1, 1);

	var restScripChk = CheckImageTap(50, 600, 100, 750, 0.95, 'GG_startCrack_restartScript_str.png', 1, 1, 1, 100, 2, 1);
	if (restScripChk) {
		if (!config.isRunning) return false;
		console.log('');

		setFirstTimer();     //設定初始時間值
		// setFirstsetting();   //設定初值設定值
		ggScriptRestart(mode);   //遊戲關閉，GG腳本快速重啟

	} else {
		sleep(2000);
		for (var j = 1; j < 10; j++) {
			if (!config.isRunning) return false;
			if (useReturn(3)) return false;

			var activityChk = CheckImageTap(20, 6, 70, 70, 0.95, 'GG_startCrack_activity_icon.png', 1, 1, 1, 100, 2, 1);
			if (activityChk) {
				if (!config.isRunning) return false;

				var searchChkP = checkPointColor(290, 58, 15, '80CBC4');
				console.log(j, ', searchChkP :', searchChkP);
				if (!searchChkP) {
					console.log('search NOT!!!');
					tapFor(290, 32, 2, 80, 100, 500);

				} else {
					console.log('search OK!!!!');
					ggScriptRestart(mode);   //遊戲關閉，GG腳本快速重啟
				}

			} else {
				tapFor(50, 50, 1, 90, 1500, 100);
				CheckImageTap(100, 50, 170, 1235, 0.95, 'GG_startCrack_game_icon.png', 1, 1, 1, 1000, 1, 1);
			}

			sleep(500);
		}
	}
}

function ggScriptRestart(mode) {
	if (!config.isRunning) return false;

	for (var i = 1; i < 30; i++) {
		if (!config.isRunning) return false;

		CheckImageTap(620, 110, 650, 140, 0.85, 'GG_scriptPlay_icon.png', 1, 1, 1, 1200, 1, 1);
		CheckImageTap(560, 600, 650, 950, 0.95, 'GG_scriptRun_icon.png', 1, 1, 1, 1200, 1, 1);
		
		CheckImageTap(50, 600, 100, 750, 0.95, 'GG_startCrack_restartScript_str.png', 1, 1, 1, 1500, 1, 1);
		CheckImageTap(530, 600, 600, 930, 0.95, 'GG_startCrack_MenuBTN_OK.png', 1, 1, 1, 1500, 1, 1);

		if(mode == 1) {
			CheckImageTap(110, 380, 510, 900, 0.95, 'GG_startCrack_restartScript_1.png', 1, 1, 1, 1500, 1, 1);
		}else if (mode == 2) {
			CheckImageTap(110, 380, 510, 900, 0.95, 'GG_startCrack_restartScript_6.png', 1, 1, 1, 1500, 1, 1);
		}else{
			console.log('It is Error!!')
		}
		sleep(1000)

		if (useReturn(3)) {
			console.log("GG StartCrack Restart Script 1st : OK, i :", i);
			break;
		}
	}


}

function ggCrackSkillMP() {
	if (!config.isRunning) return false;

	var chkImageNameOn = ['BOSS_GoBack_BTN', 'Battle_SkillAuto_on', 'Battle_Speedx2_on', 'Stone_win_ability_03_on' ];
	var chkImageNameOff = ['BOSS_Fight_BTN', 'Battle_SkillAuto_off', 'Battle_Speedx2_off', 'Stone_win_ability_03_off' ];

	for (var i = 0; i <= 10; i++) {
		if (!config.isRunning) return false;

		console.log ('i=', i);

		console.log('===========Chk on============');
		for (var j = 1; j <= 3; j++) {
			if (!config.isRunning) return false;
			CheckImageTap(390, 490, 715, 860, 0.90, chkImageNameOn[j]+'.png', 1, 1, 1, 500, 1, 1);
			sleep(50);
		}
			
		console.log('===========Chk off============');
		var crackSkillCHK = 0;
		for (var j = 0; j <= 3; j++) {
			if (!config.isRunning) return false;

			var crackSkillRE = CheckImageTap(390, 490, 715, 860, 0.90, chkImageNameOff[j]+'.png', 0, 0, 0, 0, 2, 1);
			if (crackSkillRE) { crackSkillCHK ++ ;}
			sleep(50);
		}

		console.log('crackSkillCHK ==', crackSkillCHK, ' !!');


		crackSkillmpCHK = 0;
		for (var j = 0; j <= 5; j++) {
			if (!config.isRunning) return false;

			var intX = 116 + j * 120
			var intY = 721

			var searchChkP = checkPointColor(intX, intY, 15, '73D2E6');  //MP條，藍色
			if (searchChkP) {
				crackSkillmpCHK ++ ;
			}
		}

		console.log('crackSkillmpCHK ==', crackSkillmpCHK, ' !!');

		if  (crackSkillCHK == 4 && crackSkillmpCHK == 6) {
			if (!config.isRunning) return false;

			console.log('is OK to crack MP !!');
			ggCrackStart(2);

			break;
		}

		sleep(2500);
	}
}

////MAIN FLOW FUNCTION
function megerStone() {
	if (!config.isRunning) return false;
	if (watchADgetReward) return false;
	if (underGroundSW) return false;

	if (useReturn(3)) {
		// if (useReturn(3) & !getDAilyAD) {
			if (!config.isRunning) return false;
	
			console.log('---=== IN Play Screen ===---');
	
			mergerCycle ++ ;
			console.log("---=== mergerCycle  ===---:", mergerCycle);
			screenStopChk = checkGameStuck(7);
			console.log('screenStopChk:', screenStopChk);
	
			if (screenStopChk) {
				console.log('screenStopChk:', screenStopChk, ', Stop App!!');
				rbm.stopApp(config.PackangName); sleep(300);
				rbm.stopApp(config.PackangName); sleep(2000);
			}
	
			if (mergerCycle >= 10) {
				console.log('---=== mergerCycle >= 10  ===---');
				// mainMenuChoice(1);
				// var menu1CHK = CheckImageTap(80, 1100, 145, 1175, 0.95, 'main_menu1_chk01.png', 1, 1, 1, 100, 2, 1);
				// if (!menu1CHK) {
				// 	gameBreakChk ++
	
				// 	console.log('---=== gameBreakChk ===---:', gameBreakChk);
				// 	if (gameBreakChk >= 15) {
				// 		console.log('gameBreakChk >= 15, Stop App!!');
				// 		rbm.stopApp(config.PackangName); sleep(300);
				// 		rbm.stopApp(config.PackangName); sleep(2000);
				// 	}
				// } else {
				// 	gameBreakChk = 0;
				// }
				mergerCycle = 0
	
			} else if (mergerCycle % 9 == 0) {
				megerAbilityTap(1, 6);
				megerAbilityTap(2, 4);
				// mergerCycle = 0;
			}
	
	
			ggCrackWinChk();
	
			if (fightBoss_SW) {
				if (!config.isRunning) return false;
	
				console.log('----- ----- ----- -----')
				CheckImageTap(550, 500, 680, 580, 0.80, 'BOSS_Fight_BTN.png', 630, 480, 3, 50, 0, 1);
			}
	
			if (!speedEffectChk) {
				if (!config.isRunning) return false;
	
				console.log('----- ----- ----- -----')
				var ggiconChk = CheckImageTap(5, 100, 55, 660, 0.95, 'GG_startCrack_icon.png', 1, 1, 1, 100, 2, 1);
				var maxSoneCrackChk2 = 	CheckImageTap(670, 1150, 715, 1180, 0.95, 'megerMenu_maxSaveStone_crack.png', 1, 1, 1, 100, 2, 1);
	
				if (ggiconChk & maxSoneCrackChk2) {
					tapFor(630, 500, 4, 80, 200, 200);
					speedEffectChk = 1;
				}
			}
	
			// console.log('----- ----- ----- -----')
			var autoMegerChk1 = CheckImageTap( 475,  800, 515,  860, 0.90, 'Stone_win_ability_03_on.png', 1, 1, 1, 100, 2, 0);
			sleep(100);
			var autoMegerChk2 = CheckImageTap( 475,  800, 515,  860, 0.90, 'Stone_win_ability_03_off.png', 1, 1, 1, 100, 2, 0);
			sleep(100);
			// console.log('----- ----- ----- -----')
			if (autoMegerChk2){
				// console.log('----- ----- ----- -----')
				megerAbilityTap(3, 1);
				
			} else if (autoMegerChk1) {	
				tapFor(125, 920, 10, 50, 70, 2000, 200);
				tapFor(700, 220, 10, 50, 70, 500, 200);
	
				if (tapUpTeamLv_SW & tapUpTeamLv_CHK) {
					if (!config.isRunning) return false;
	
					for (var i =  1; i < 4; i++) {
						if (!config.isRunning) return false;
	
						tapFor(300, 500, 5, 40, 200, 150);
						CheckImageTap(280,  470, 440,  540, 0.95, 'get_rewards_str.png', 300, 500, 5, 200, 0, 1);
						CheckImageTap(250,  600, 450,  640, 0.95, 'rank_up_str.png', 700, 220, 5, 200, 0, 1);
	
						if (i >= 8) {
							//tapUpTeamLv_CHK = 0;
						}
						sleep(500);
					}
				}
			}
			
		} else {
	
			console.log('---=== NOT Play Screen ===---');
			CheckImageTap(180,  660, 370,  720, 0.95, 'android_gamestop_restart_str.png', 1, 1, 1, 2000, 1, 0);
			var crushChk = CheckImageTap( 120,  480, 370,  810, 0.95, 'GG_gamecrush_menu_2.png', 1, 1, 1, 100, 2, 0);
			if (crushChk){
				setFirstTimer()
				CheckImageTap(120,  480, 370,  810, 0.95, 'GG_gamecrush_menu_2.png', 1, 1, 1, 62000, 1, 0);
				CheckImageTap(250,  550, 450,  660, 0.95, 'get_offline_rewards_str.png', 182, 1140, 1, 1000, 0, 0);
				ggCrackWinChk();
				CheckImageTap(550, 500, 680, 580, 0.80, 'BOSS_Fight_BTN.png', 700, 220, 2, 50, 1, 0);
				
			}
	
			CheckImageTap(110, 380, 510, 900, 0.95, 'GG_startCrack_restartScript_1.png', 1, 1, 1, 15000, 1, 0);
			sleep(10);
			CheckImageTap(250,  550, 450,  660, 0.95, 'get_offline_rewards_str.png', 182, 1140, 1, 50, 0, 0);
			sleep(10);
			CheckImageTap(280,  470, 440,  540, 0.95, 'get_rewards_str.png', 700, 220, 2, 50, 0, 0);
			sleep(10);
	
			CheckImageTap(250,  600, 450,  640, 0.95, 'rank_up_str.png', 700, 220, 10, 50, 0, 0);
			sleep(10);
			
			CheckImageTap(240, 1150, 475, 1260, 0.95, 'tapblankclose_01.png', 700, 220, 2, 50, 0, 0);
			sleep(10);
			CheckImageTap(240, 1150, 475, 1260, 0.95, 'tapblankclose_02.png', 700, 220, 2, 50, 0, 0);
			sleep(10);
			CheckImageTap(640,  165, 710,  240, 0.95, 'character_status_book_icon.png', 125, 1220, 5, 250, 0, 0);
			sleep(10);
			ggCrackWinChk();
	
			sleep(1000)
	
	
			var outServiceChk = CheckImageTap( 250,  450, 450,  520, 0.95, 'game_out_of_service_str.png', 1, 1, 1, 100, 2, 0);
			if (outServiceChk) {
				rbm.stopApp(config.PackangName); sleep(300);
				rbm.stopApp(config.PackangName); sleep(2000);
				//rbm.startApp(config.PackangName,config.LaunchActivityName);
			}
		}
}

function main() {       //主流程
	if (!config.isRunning) return false;

	getDailyRewardAD();
	underGround();

	megerStone()
}

////FIRST SETTING
function setFirstTimer() {   //預設值設定 - 時間相關
	DailyAD_Chk = ['', 0, 0, 1, 0, 1, 1];
	DailyAD_X = ['',  60, 300, 540,   60,  300,  540];
	DailyAD_Y = ['', 750, 750, 750, 1110, 1110, 1110];

	manaCheckResults = []


	mergerCycle = 0;
	tapUpTeamLv_CHK = 1;      //確認隊伍等級任務(主畫面)(計數)
	speedEffectChk = 0;       //速度修改後生效確認

	gameBreakChk = 0;

}

function setFirstsetting() {  //預設值設定 - 變數值相關
	fightBoss_SW = 0;         //挑戰BOSS，每次點寶箱前檢查
	tapUpTeamLv_SW = 0;       //點隊伍等級任務(主畫面)(布林值)
	watchADgetReward = 0;     //看廣告每日獎勵
	underGroundSW = 1;        //地下城自動打開關
}



////SCRIPT MENU TEST
function test(cycle){
	rbm.init();
	config.isRunning = true;               //腳本測試用function
	for(var n = 0; n <= cycle; n++) {
		if (!config.isRunning) return false;

		if (n == 0) {
			setFirstTimer();     //設定初始時間值
			setFirstsetting();   //設定初值設定值
		}
		else if (n >= 1) {

			console.log('============================================================================')
			console.log('n = ', n, ', CRA 腳本開始')

			// checkGameStuck(7);

			underGround();

			// ggCrackSkillMP();

			// main();
			
			sleep(1000);
			// console.log('n = ', n, ', CRA 腳本結束');
		}
	}
}

////ROBOTMON START & STOP SETTING
function stop() {
	config.isRunning=false;
}

var global = this;
function start(settingString) {
	rbm.init();
	config.isRunning = true;

	setFirstTimer();     //設定初始值-時間
	setFirstsetting();   //設定初始值-數值

	var settings = JSON.parse(settingString);
	console.log(settingString, settings);
	for(var key in settings) {global[key] = settings[key] * 1;};

	while(config.isRunning) { main(); }
}