print('INFO: BreakDungeon Heros v0.0.1 Script by Toodonny') 

if gg.VERSION_INT < 7300 then
	print('Ver:', gg.VERSION_INT)
	print('ERROR: You need a newer version of GameGuardian app to run this script. At least v7.30, Head to the website to update your app.') 
	goto endall
end

gg.clearResults()

--prompt = gg.prompt(
--    {'ask any', 'ask num', 'ask text', 'ask path', 'ask file', 'ask set', 'ask speed', 'checked', 'not checked'}, 
 --   {[1]='any val', [7]=123, [6]=-0.34, [8]=true}, 
--    {[2]='number', [3]='text', [4]='path', [5]='file', [6]='setting', [7]='speed', [8]='checkbox', [9]='checkbox'})
--menualert = gg.alert('A or B or C?', 'A', 'B', 'C')
--multmenu = gg.multiChoice({'劍士-2星', '老人-2星', '女法-2星', '拳擊-2星', '弓手-2星'}, {[1]=true, [2]=true, [3]=true}, 'Select letter:')

menu = gg.choice({  '1. Pet Big Skill Lock!!',
					'2. ',
					'3. ', 
					'4. ', 
					'5. ', 
					'6. 模糊(一直變小)。' , 
					'7. 模糊(一直變大)。' 
					}, nil, '--==== 功能選單 ====--')

					
if menu == 1 then     --找17;400;400;400:50 (爆氣值滿/人活著的時)
	ta = 1
	t = {}

	searchnum = '0;1~200;100~200::11'
	for i = 1, 16, 1 do
		if i == 1 then
			gg.searchNumber(searchnum, gg.TYPE_DWORD, false, gg.SIGN_EQUAL, 0, -1)
		elseif i == 3 or i == 7 or i == 11  or i == 15 then
			gg.searchNumber('1~200', gg.TYPE_DWORD, false, gg.SIGN_EQUAL, 0, -1)
		else	
			gg.searchFuzzy('0', gg.SIGN_FUZZY_GREATER, gg.TYPE_DWORD, 0, -1 )  --搜尋變大
		end

		rc = gg.getResultCount()

		if rc == 1 then
			r = gg.getResults(rc)
			
			t[1] = {}
			t[1].address = r[1].address
			t[1].value = '449'
			t[1].flags = gg.TYPE_DWORD
			t[1].freeze = true
			t[1].freezeType = gg.FREEZE_NORMAL
			t[1].name = 'Pet Big Skill'
			
			print('i', i, ', addListItems: ', gg.addListItems(t))
			gg.setVisible(false)
			gg.processResume()  --取消暫停

			break

		elseif rc > 1 then
			gg.processResume()  --取消暫停
			gg.sleep(1500)       --延時300ms
			gg.processPause()   --遊戲暫停

		elseif i == 16 then
			print('Search Cycle Over Set! (15)')
		else
			print('results is error!')
			break
		end
	end


elseif menu == 2 then 
elseif menu == 3 then
elseif menu == 4 then
elseif menu == 5 then
elseif menu == 6 then  --加速時間尋找(就是一直變小)
	gg.clearResults()
	for i = 2, 40, 1 do
		if i == 1 then
			gg.searchNumber('0.01~15', gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)   --搜尋 0.01~15 秒數
		elseif i > 1 then
			gg.searchFuzzy('0', gg.SIGN_FUZZY_LESS, gg.TYPE_FLOAT, 0, -1 )  --搜尋變小
		end
	
		gg.processResume()  --取消暫停
		gg.sleep(300)
		gg.processPause()   --遊戲暫停
		
		rc = gg.getResultCount()
		if rc == 1 then
			gg.getResults(1)
			gg.editAll('15', gg.TYPE_FLOAT) -- 15 194天
			break
		end
	end
	
elseif menu == 7 then  --加速時間尋找(就是一直變小)
	gg.clearResults()
	for i = 2, 40, 1 do
		if i == 1 then
			gg.searchNumber('0.01~15', gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)   --搜尋 0.01~15 秒數
		elseif i > 1 then
			gg.searchFuzzy('0', gg.SIGN_FUZZY_GREATER, gg.TYPE_FLOAT, 0, -1 )  --搜尋變大
		end
	
		gg.processResume()  --取消暫停
		gg.sleep(300)
		gg.processPause()   --遊戲暫停

		rc = gg.getResultCount()
		if rc == 1 then
			gg.getResults(1)
			gg.editAll('15', gg.TYPE_FLOAT) -- 15 194天
			break
		end
	end

	
	
else
	print('Subscribe My Channel → ------')

end
 



::endall::
print('INFO: You Can Find Backlift at GameGuardian Forum')
--gg.clearResults()

gg.toast('Thanks For Use Cheating')