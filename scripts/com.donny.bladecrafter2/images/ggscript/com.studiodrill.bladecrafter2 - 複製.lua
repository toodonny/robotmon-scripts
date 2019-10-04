print('INFO: BreakDungeon Heros v0.0.1 Script by Toodonny') 

if gg.VERSION_INT < 83000 then
	print('ERROR: You need a newer version of GameGuardian app to run this script. At least v8.30.0, Head to the website to update your app.') 
	goto endall
	end

gg.clearResults()

--prompt = gg.prompt(
--    {'ask any', 'ask num', 'ask text', 'ask path', 'ask file', 'ask set', 'ask speed', 'checked', 'not checked'}, 
 --   {[1]='any val', [7]=123, [6]=-0.34, [8]=true}, 
--    {[2]='number', [3]='text', [4]='path', [5]='file', [6]='setting', [7]='speed', [8]='checkbox', [9]='checkbox'})
--menualert = gg.alert('A or B or C?', 'A', 'B', 'C')
--multmenu = gg.multiChoice({'劍士-2星', '老人-2星', '女法-2星', '拳擊-2星', '弓手-2星'}, {[1]=true, [2]=true, [3]=true}, 'Select letter:')

menu = gg.choice({  '1. 全1星技連放；爆發100%',
					'2. 女法/老人/女劍2星-其它1星技連放；爆發100%',
					'3. 基地金幣時間：首次於1~36切GG。', 
					'4. 打工時間：全休息→自動→立馬切GG。', 
					'5. 加速時間0.01~15(一直變小)。', 
					'6. 模糊(一直變小)。' , 
					'7. 模糊(一直變大)。' 
					}, nil, '--==== 功能選單 ====--')

					
if menu == 1 then     --找17;400;400;400:50 (爆氣值滿/人活著的時)
	ta = 1
	t = {}
	for j =17, 18, 1 do
		searchnum = j..';400;400;400:50'
		gg.searchNumber(searchnum, gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
		rc = gg.getResultCount()
		r = gg.getResults(rc)
		
		for i = 1, rc - 2 , 1 do
			tr1 = i
			tr2 = i + 1
			tr3 = i + 2
			if r[tr1].value == '17.0' or r[tr1].value == '18.0' then
				if r[tr2].value == '400.0' and r[tr3].value == '400.0' then
				--print('First result value: ',i , r[tr1].value, r[tr2].value, r[tr3].value)
				
					for k = 1, 2, 1 do
						array1 = { 44, 92}
						array2 = {400,  87}
						array3 = { j..'-人物爆發',  j..'-人物1星-第1技'}

						t[ta] = {}
						t[ta].address = r[tr1].address + array1[k]
						--print('First result address: ', i, ta, r[tr1].address, t[ta].address)
						t[ta].value = array2[k]
						t[ta].flags = gg.TYPE_FLOAT
						t[ta].freeze = true
						t[ta].freezeType = gg.FREEZE_NORMAL
						t[ta].name = array3[k]
						
						ta = ta + 1
					end
				end
			end
		end	
		
		gg.clearResults()
	end
	
	
	print('addListItems: ', gg.addListItems(t))
	
	--print('results: ', t)
	
	--print('First 60 results: ', r)
	--print('First result: ', r[1])
	--print('First result address: ', r[1].address)
	--print('First result value: ', r[1].value)
	--print('First result type: ', r[1].flags)


elseif menu == 2 then     --找17;400;400;400:50 (爆氣值滿/人活著的時)
	--array1 = { 92, -4, 44} --記憶體偏移位置 17/18版本
	array1 = { 52, -44, 4} --記憶體偏移位置 400/400/400 版本
	array2 = { '1星技', '2星技', '爆氣值' } --偏移位置對應屬性
	array3 = {}
	array4 = {   1,  11,  31,  51,  61,  91, 111, 131, 141, 161, 181 , 351 } --技能ID
	array5 = { '露西', '克羅', '雅各', '艾琳', '修瑪', '修羅', '天樞星', '天璣星', '遙光', '玉衡星', '姜道夫', '密涅瓦' } --人物名子
	array6 = { '女劍', '爛弓', '拳擊', '女法', '萌忍', '水服',   '砍柴',   '酒桶', '乳走',   '矇妹',   '老人',  '白的'} --人物外號
	array7 = {   4,  11,   7,   4,  11,   8,   7,  11,   4,   4,   4 ,  10 } --1星技時間鑜定 (原值：7, 11, 7, 8, 11, 8, 8, 8)
	array8 = {  17,  17,  17,  18,  17,  17,  17,  17,  17,  17,  17 ,  17 } --2星技時間鎖定
	array9 = { 401, 401, 401, 401, 401, 401, 401, 401, 401, 401, 401 , 401 } --爆氣值鎖定
	arrayZ = {   1,   2,   3,   4,   5,   6,   7,   8,   9,  10,  11 ,  12 } --人物數量確認

	ta = 1
	t = {}
	searchnum = '400;400;400:12'
	gg.searchNumber(searchnum, gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
	rc = gg.getResultCount()
	r = gg.getResults(rc)
	
	for i = 1, rc - 2 , 1 do
		tr1 = i
		tr2 = i + 1
		tr3 = i + 2
		desadd21 = r[tr2].address - r[tr1].address
		desadd32 = r[tr3].address - r[tr2].address
		if  desadd21 == 4 and desadd32 == 4 then
			checkAdd = r[tr1].address + 64  --17/18:104   400/400/400 :64  技能ID比對
			searchAdd = '00000'..string.format("%X",checkAdd)
			gg.clearResults()
			
			gg.searchAddress( searchAdd, 0xFFFFFFFF, gg.TYPE_DWORD, gg.SIGN_EQUAL)
			u = gg.getResults(1)
			
			for m, v in ipairs(array9) do
				if u[1].value * 1 == array4[m] then
					print('找到人物：', ta, array5[m], array6[m])
					for k = 1, 3, 1 do
						t[ta] = {}
						t[ta].address =  r[tr1].address + array1[k]
						
						if k == 1 then 
							t[ta].value = array7[m]
						elseif k == 2 then 
							t[ta].value = array8[m]
						elseif k == 3 then 
							t[ta].value = array9[m]
						end
						
						t[ta].flags = gg.TYPE_FLOAT
						t[ta].freeze = true
						t[ta].freezeType = gg.FREEZE_NORMAL
						t[ta].name = array5[m]..'-'..array6[m]..'-'..array2[k]
						
						ta = ta + 1
					end
					
					break
				end
			end
		end
	end	
	print('addListItems: ', gg.addListItems(t))	
	gg.clearResults()
	
elseif menu == 3 then  --金幣時間修改(1~24切gg)
	searchmode = 0
	r = gg.getListItems()
	
	for i, v in ipairs(r) do
		if r[i].name == '基地金幣時間' then
			r[i].freeze = false
			r[i].value = '0'
			searchmode = searchmode + 1
		end
	end
	print('基地金幣時間解凍:', searchmode, gg.addListItems(r))
	
	if searchmode > 1 then
		rmad = {}
		rmid = 1
		for i, v in ipairs(r) do
			if r[i].name == '基地金幣時間' then
				gg.processResume()  --取消暫停
				gg.sleep(300)
				gg.processPause()   --遊戲暫停
				
				gg.clearResults()
				searchAdd = '00000'..string.format("%X", r[i].address)
				gg.searchAddress( searchAdd, 0xFFFFFFFF, gg.TYPE_FLOAT, gg.SIGN_EQUAL)
				u = gg.getResults(1)
				--print('u list:', u, searchAdd)
				realaddresscheck = u[1].value
				
				addchecktimes = 10
				for j = 1, 3, 1 do
					gg.processResume()  --取消暫停
					gg.sleep(300)
					gg.processPause()   --遊戲暫停
					
					gg.clearResults()
					gg.searchAddress( searchAdd, 0xFFFFFFFF, gg.TYPE_FLOAT, gg.SIGN_EQUAL)
					u = gg.getResults(1)
					--print('u2 list:', u)
				
					if u[1].value == realaddresscheck then
						addchecktimes = addchecktimes - 1
					elseif u[1].value ~= realaddresscheck then
						addchecktimes = addchecktimes + 1
					end
					
					if addchecktimes < 10 then
						rmad[rmid] = r[i].address
						rmid = rmid + 1

						break
					elseif addchecktimes > 10 then
						gg.clearResults()
						gg.searchNumber(u[1].value, gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)   --搜尋真實金幣位置秒數
						rc1 = gg.getResultCount()
						--print('real time:', u[1].value)
						
						if rc1 == 2 then
							r1 = gg.getResults(2)
							--print('確定真實位置，取得兩個結果', r1)
							if r1[1].value == r1[2].value then
								for i = 1, 2, 1 do
									r1[i].value = '78'
									r1[i].freeze = true 
									r1[i].freezeType = gg.FREEZE_NORMAL
									r1[i].name = '基地金幣時間'
								end
								print('addListItems: ', gg.addListItems(r1))
								
								break
							else
								print('找到兩個值不相等')
							end

						else
							print('結果數量不符合2')
							
						end
						
						break
					end
				end
			end
		end
		
		--goto goldsearchend
	end
	
	print('removeListItems: ', rmad, gg.removeListItems(rmad))
	
	if searchmode == 0 then
		gg.processResume()  --取消暫停
		gg.sleep(100)
		gg.processPause()   --遊戲暫停
		
		for i = 1, 15, 1 do
			--gg.sleep(200)
			if i == 1 then
				gg.searchNumber('1~36', gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)  --搜尋 6~36 秒數
				print('i=', i, 'search 1~36')
			elseif i % 5 == 0 then
				gg.searchNumber('1~60', gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)  --結果簡化至 6~60	
				print('i=', i, 'search 1~60')
			elseif i > 1 then
				gg.searchFuzzy('0', gg.SIGN_FUZZY_GREATER, gg.TYPE_FLOAT, 0, -1 )    --搜尋變大
				print('i=', i, 'search greater')
			end
			
			rc = gg.getResultCount()  --取得搜尋結果數量
			
			if rc >= 80 then
				gg.processResume()  --取消暫停
				gg.sleep(100)
				gg.processPause()   --遊戲暫停
			
			elseif rc > 2 and rc <= 80 then
				r = gg.getResults(rc)
				for i, v in ipairs(r) do
					rl3 = string.format("%X",r[i].address)
					rl3l = string.len(rl3)
					rl3r3 = string.sub(rl3,rl3l-2,rl3l)
					if rl3r3 == '9D8' or rl3r3 == 'B48' or rl3r3 == '134' or rl3r3 == 'F98' or rl3r3 == '6F8' or rl3r3 == 'ADC' or rl3r3 == '588' then
						print(i, r[i], rl3)
						rl3r3v = r[i].value
						gg.searchNumber(rl3r3v, gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)   --搜尋
					end
				end
				gg.processResume()  --取消暫停
				gg.sleep(100)
				gg.processPause()   --遊戲暫停

			elseif rc == 2 then
				r = gg.getResults(2)
				--gg.editAll('78', gg.TYPE_FLOAT)  --找到的位置都改成78
				if r[1].value == r[2].value then
					for i = 1, 2, 1 do
						r[i].value = '78'
						r[i].freeze = true 
						r[i].freezeType = gg.FREEZE_NORMAL
						r[i].name = '基地金幣時間'
					end
					print('addListItems: ', gg.addListItems(r))
					break
					
				else
					break
					
				end
			
			else
				print('沒找到任何結果')
				break
				
			end
		end
	end
	
	::goldsearchend::

	
elseif menu == 4 then  --4. 打工時間，全休息，自動立馬切GG

	submenu4 = gg.choice({  '    4.1 清空後，自動加入，重新搜尋鎖定。',
					'    4.2 所有打工仔時間，比照第一位。',
					'    4.3 所有打工仔時間，最速值。',
					}, nil, '4. 打工時間修改選項：')

	if submenu4 == 1 then
		gg.clearResults()
		r = gg.getListItems()
		
		rmad = {}
		rmid = 1
		for i, v in ipairs(r) do
			if r[i].name == '打工完成時間' or r[i].name == '比照第1打工仔星級' then
				rmad[rmid] = r[i].address
				rmid = rmid + 1
			end
		end
		print('舊有項目刪除: ', rmad, gg.removeListItems(rmad))
		
		for i = 1, 35, 1 do
			if i == 1 or i == 45 then
				gg.searchNumber('1~300', gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)   --搜尋 0.01~15 秒數
			elseif i > 1 and i < 45 then
				gg.searchFuzzy('1', gg.SIGN_FUZZY_GREATER, gg.TYPE_FLOAT, 0, -1 )  --搜尋變大
			end
		
			if i % 5 == 0 then
				gg.searchNumber('5~300', gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)   --結果簡化至 5~300
			end	
			
			gg.processResume()  --取消暫停
			gg.sleep(500)
			gg.processPause()   --遊戲暫停
			
			rc = gg.getResultCount()
			if rc < 80 then
				r = gg.getResults(rc)
				rmad = {}
				rmadNo1 = 1
				rmadNo2 = 2
				for i, v in ipairs(r) do
					if i ~= rc then
						iw = i + 1
						addrediff = r[iw].address - r[i].address
						valuediff = r[iw].value - r[i].value
						
						if addrediff == 32 and valuediff == 0 then
							for j = rmadNo1, rmadNo2, 1 do
								rmad[j] = {}
								rmad[j].address = r[i + j - rmadNo1].address
								rmad[j].value = '300'
								rmad[j].flags = gg.TYPE_FLOAT
								rmad[j].freeze = true
								rmad[j].freezeType = gg.FREEZE_NORMAL	
								rmad[j].name = '打工完成時間'
							end
							
							rmadNo1 = rmadNo1 + 1
							rmadNo2 = rmadNo2 + 1
						end
					end
				end
				
				for i, v in ipairs(rmad) do
					print('找到的位置', i, '：', rmad[i].address)
					rmadcount = i
				end
				print('打工時間項目鎖定: ', rmadcount, rmad[rmadcount].address, rmad[rmadcount].value, gg.addListItems(rmad))
				print('')

				checkAdd = rmad[rmadcount].address - 12  --第一個打工仔，星級數據
				searchAdd = '00000'..string.format("%X",checkAdd)
				gg.clearResults()
				
				gg.searchAddress( searchAdd, 0xFFFFFFFF, gg.TYPE_DWORD, gg.SIGN_EQUAL)
				u = gg.getResults(1)			
				print('第一打工仔星級數據:', '位置:', u[1].address, '; 數值:', u[1].value) 
				
				rmstart={}
				for i, v in ipairs(rmad) do
					rmstart[i] = {}
					rmstart[i].address = rmad[i].address - 12
					rmstart[i].value = u[1].value
					
					rmstart[i].flags = gg.TYPE_DWORD
					rmstart[i].freeze = true
					rmstart[i].freezeType = gg.FREEZE_NORMAL	
					rmstart[i].name = '比照第1打工仔星級'
					
					print('比照第一打工仔星級', i, '：', rmstart[i].address, rmstart[i].value)
				end
				print('比照第一打工仔星級(鎖定): ', gg.addListItems(rmstart))			

				gg.processResume()  --取消暫停
				gg.sleep(200)
				gg.processPause()   --遊戲暫停			
				
				for i, v in ipairs(rmstart) do
					rmstart[i].freeze = false
				end
				print('比照第一打工仔星級(解鎖): ', gg.addListItems(rmstart))	

				
				goto  endall
			end
		end
	end
	
	if submenu4 == 2 then
		gg.clearResults()
		r = gg.getListItems()
		
		rmad = {}
		rmid = 1
		for i, v in ipairs(r) do
			if r[i].name == '比照第1打工仔星級' then
				setTime = r[i].value
			end
		end
		print('找到第一打工仔星級(數值): ', setTime)	
		
		for i, v in ipairs(r) do
			if r[i].name == '比照第1打工仔星級' then
				r[i].value = setTime
				r[i].freeze = true
			end
		end
		print('比照第一打工仔星級(鎖定): ', gg.addListItems(r))	
		
		gg.processResume()  --取消暫停
		gg.sleep(200)
		gg.processPause()   --遊戲暫停		
		
		for i, v in ipairs(r) do
			if r[i].name == '比照第1打工仔星級' then
				r[i].freeze = false
			end
		end
		print('比照第一打工仔星級(解鎖): ', gg.addListItems(r))
		
	end

	if submenu4 == 3 then
		gg.clearResults()
		r = gg.getListItems()
		
		for i, v in ipairs(r) do
			if r[i].name == '比照第1打工仔星級' then
				setTime = r[i].value
			end
		end
		print('找到第一打工仔星級(數值): ', setTime)	

		searchnum = '128;'..setTime..':1C8h'
		gg.searchNumber(searchnum, gg.TYPE_DWORD, false, gg.SIGN_EQUAL, 0, -1)
		rc = gg.getResultCount()
		r2 = gg.getResults(rc)
		for i, v in ipairs(r2) do
			if r2[i].value == '128' then
				minCodeAddress = r2[i].address + 444
			end
		end		
		
		gg.clearResults()
		searchAdd = '00000'..string.format("%X", minCodeAddress)
		gg.searchAddress( searchAdd, 0xFFFFFFFF, gg.TYPE_DWORD, gg.SIGN_EQUAL)
		u = gg.getResults(1)		
		print('找到最速打工仔星級(數值): ', u[1].value, searchAdd)	
		
		for i, v in ipairs(r) do
			if r[i].name == '比照第1打工仔星級' then
				r[i].value = u[1].value
				r[i].freeze = true
			end
		end
		print('比照最速打工仔星級(鎖定): ', gg.addListItems(r))	
		
		gg.processResume()  --取消暫停
		gg.sleep(200)
		gg.processPause()   --遊戲暫停		
		
		for i, v in ipairs(r) do
			if r[i].name == '比照第1打工仔星級' then
				r[i].freeze = false
			end
		end
		print('比照最速打工仔星級(解鎖): ', gg.addListItems(r))
		
	end	
		
		
elseif menu == 5 then  --加速時間尋找(就是一直變小)
	for i = 1, 40, 1 do
		if i == 1 then
			gg.searchNumber('0.01~15', gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)   --搜尋 0.01~15 秒數
		elseif i > 1 then
			gg.searchFuzzy('0', gg.SIGN_FUZZY_LESS, gg.TYPE_FLOAT, 0, -1 )  --搜尋變小
		end
	
		gg.processResume()  --取消暫停
		
		gg.sleep(300)
		gg.processPause()   --遊戲暫停
		
		gg.sleep(100)
		
		rc = gg.getResultCount()
		if rc == 1 then
			gg.getResults(1)
			gg.editAll('15', gg.TYPE_FLOAT) -- 15 194天
			break
		end
	end

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
	print('Subscribe My Channel → RlyFoz Gaming')

end
 



::endall::
print('INFO: You Can Find Backlift at GameGuardian Forum')
--gg.clearResults()

gg.toast('Thanks For Use Cheating')