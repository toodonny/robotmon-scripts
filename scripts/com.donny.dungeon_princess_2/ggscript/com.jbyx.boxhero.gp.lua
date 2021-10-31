-- ================Function========================= --
function  QuestTime(str1, str2)
	ta = 1 t = {}
	for i = 1, 16, 1 do

		if i == 3 or i == 7 or i == 11  or i == 15 then cki = 1 else cki = 0 end
		if i == 1 then gg.searchNumber(str1, gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
		elseif cki == 1 then gg.searchNumber(str2, gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
		else gg.searchFuzzy('0', gg.SIGN_FUZZY_LESS, gg.TYPE_FLOAT, 0, -1 )  --搜尋變小
		end

		rc = gg.getResultCount()
		if rc == 1 then
			r = gg.getResults(rc)
			
			t[1] = {}
			t[1].address = r[1].address
			t[1].value = '0'
			t[1].flags = gg.TYPE_DWORD
			t[1].freeze = true
			t[1].freezeType = gg.FREEZE_NORMAL
			t[1].name = 'Quest Time = 0'
			
			print('i', i, ', addListItems: ', gg.addListItems(t))
			gg.setVisible(false)
			gg.processResume()  --取消暫停
			break

		elseif rc > 1 then
			gg.processResume()  --取消暫停
			gg.sleep(200)      --延時ms
			gg.processPause()   --遊戲暫停

		elseif i == 16 then
			print('Search Cycle Over Set! (15)')
		else
			print('results is error!')
			break
		end
	end
end

function searchHPMP(pow) 

	for i = 1, 1, 1 do
		hpV = prompt[1] * 10 ^ pow
		mpV = prompt[2] * 10 ^ pow
		-- Auto = prompt[3] * 1
		Auto = AutoCrack
		hpDmin = 0.1 + hpV - 1400
		hpDmax = 0.1 + hpV + hpV * 0.91
		mpDmin = 0.1 + mpV - 1400
		mpDmax = 0.1 + mpV + mpV * 0.91

		str1 = hpDmin..'~'..hpDmax..';'..mpDmin..'~'..mpDmax..'::16'
		str2 = '1000~'..hpDmax
		str3 = '1000~'..hpDmax..';'..'1000~'..mpDmax..'::16'

		if  hpV ~= 0 and mpV ~= 0 then
			gg.searchNumber(str1, gg.TYPE_DOUBLE, false, gg.SIGN_EQUAL, 0, -1)
		end

		rc1 = gg.getResultCount()
		print('rc1:',rc1)
		search = 0
	end
end

function searchChange(slT1, slT2)

	if Auto == 0 then
		print('Auto:',Auto)
		
	elseif rc1 <= 2 then
		r = gg.getResults(rc1)
		search = 1

	elseif rc1 > 2 then

		for l = 1, 3, 1 do
			if l == 1 then
				sleepT = slT1
			else
				sleepT = slT2
			end
			
			for k = 1, 2, 1 do
				gg.processResume()  --取消暫停
				gg.sleep(sleepT)      --延時ms
				gg.processPause()   --遊戲暫停
				gg.sleep(100)      --延時ms
			end
			
			gg.searchFuzzy('0', gg.SIGN_FUZZY_NOT_EQUAL, gg.TYPE_DOUBLE, 0, -1 )
			rc2 = gg.getResultCount()
			print('l:', l, ', rc2:',rc2)
			
			gg.searchNumber(str2, gg.TYPE_DOUBLE, false, gg.SIGN_EQUAL, 0, -1)
			rc3 = gg.getResultCount()
			print('l:', l, ', rc3:',rc3)
			
			if l == 4 and rc3 > 2 then
				gg.searchNumber(str3, gg.TYPE_DOUBLE, false, gg.SIGN_EQUAL, 0, -1)
			end
			
			rc4 = gg.getResultCount()
			print('l:', l, ', rc4:',rc4)
			if rc4 == 0 then
				break
				
			elseif  rc4 > 0 and rc4 < 3 then
				r = gg.getResults(rc4)
				if r[1].value ~= 0 then
					search = 1
				end
				break
			end 
		end 

	end

end

function autoSetHPMP()

	if search == 1 then
		t = {}
		t[1] = {}
		t[1].address = r[1].address
		t[1].value = hpV + 60000
		t[1].value = hpV * 0.09
		t[1].flags = gg.TYPE_DOUBLE
		t[1].freeze = true
		t[1].freezeType = gg.FREEZE_NORMAL
		t[1].name = 'HP'
		
		t[2] = {}
		t[2].address = r[1].address + 12
		t[2].value = mpV + 20000
		t[2].value = mpV * 0.08
		t[2].flags = gg.TYPE_DOUBLE
		t[2].freeze = true
		t[2].freezeType = gg.FREEZE_NORMAL
		t[2].name = 'HP'
		
		if rc4 > 1 then
			t[3] = {}
			t[3].address = r[1].address + 24
			t[3].value = hpV + 20000
			t[3].value = hpV + 3000
			t[3].flags = gg.TYPE_DOUBLE
			t[3].freeze = true
			t[3].freezeType = gg.FREEZE_NORMAL
			t[3].name = 'HP_plus'
		end
		print('addListItems:', t, gg.addListItems(t))
	
	end
end

function clearnAll(waitT)
	if search == 1 then
		for k = 0, waitT, 1 do
			gg.sleep(1000)      --延時ms
			gg.toast(k..' sec')
		end

		gg.clearResults()
		gg.clearList()
	end
end
-- ================Main Script========================= --
print('INFO: BreakDungeon Heros v0.0.1 Script by Toodonny') 

gg.clearResults()
gg.clearList()




hpDf = 2193
mpDf = 195
AutoCrack = 1

prompt = gg.prompt(
	{'HP', 'MP'},
	{[1]=hpDf, [2]=mpDf}, 
	{[1]='number', [2]='number'})
	
-- prompt = gg.prompt(
	-- {'HP', 'MP', 'AutoCrack'},
	-- {[1]=hpDf, [2]=mpDf, [3]=AutoCrack}, 
	-- {[1]='number', [2]='number', [3]='number'})

searchHPMP(2) 
searchChange(350, 150)
autoSetHPMP()

gg.setVisible(false)
gg.processResume()  --取消暫停	

-- clearnAll(200)



::endall::
-- print('INFO: You Can Find Backlift at GameGuardian Forum')
--gg.clearResults()

gg.toast('Thanks For Use Cheating')