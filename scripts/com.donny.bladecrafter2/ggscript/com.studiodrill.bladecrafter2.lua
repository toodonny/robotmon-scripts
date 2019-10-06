
-- ================Function========================= --
function  petSkillTime(str1, str2) 
	ta = 1 t = {}
	for i = 1, 16, 1 do

		if i == 3 or i == 7 or i == 11  or i == 15 then cki = 1 else cki = 0 end
		if i == 1 then gg.searchNumber(str1, gg.TYPE_DWORD, false, gg.SIGN_EQUAL, 0, -1)
		elseif cki == 1 then gg.searchNumber(str2, gg.TYPE_DWORD, false, gg.SIGN_EQUAL, 0, -1)
		else gg.searchFuzzy('0', gg.SIGN_FUZZY_GREATER, gg.TYPE_DWORD, 0, -1 )  --搜尋變大
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
			gg.sleep(1500)      --延時ms
			gg.processPause()   --遊戲暫停

		elseif i == 16 then
			print('Search Cycle Over Set! (15)')
		else
			print('results is error!')
			break
		end
	end

end


-- ================Main Script========================= --
print('INFO: BreakDungeon Heros v0.0.1 Script by Toodonny') 

gg.clearResults()

--prompt = gg.prompt(
--    {'ask any', 'ask num', 'ask text', 'ask path', 'ask file', 'ask set', 'ask speed', 'checked', 'not checked'}, 
 --   {[1]='any val', [7]=123, [6]=-0.34, [8]=true}, 
--    {[2]='number', [3]='text', [4]='path', [5]='file', [6]='setting', [7]='speed', [8]='checkbox', [9]='checkbox'})
--menualert = gg.alert('A or B or C?', 'A', 'B', 'C')
--multmenu = gg.multiChoice({'劍士-2星', '老人-2星', '女法-2星', '拳擊-2星', '弓手-2星'}, {[1]=true, [2]=true, [3]=true}, 'Select letter:')

menu = gg.choice({  '1. Pet Big Skill Lock!!(1~200)',
					'2. Pet Big Skill Lock!!(150~200)',
					'3. Pet Big Skill Lock!!(100~150)', 
					'4. Pet Big Skill Lock!!(50~100)', 
					'5. Pet Big Skill Lock!!(1~50)'
					}, nil, '--==== 功能選單 ====--')

if menu == 0 then					 
elseif menu == 1 then scnum1 = '0;1~200;100~200::11' scnum2 = '1~200'
elseif menu == 2 then scnum1 = '0;150~200;100~200::11' scnum2 = '150~200'
elseif menu == 3 then scnum1 = '0;100~150;100~200::11' scnum2 = '100~150'
elseif menu == 4 then scnum1 = '0;50~100;100~200::11' scnum2 = '50~100'
elseif menu == 5 then scnum1 = '0;1~50;100~200::11' scnum2 = '1~50'
else print('Subscribe My Channel → ------')
end
 
petSkillTime(scnum1, scnum2);


::endall::
print('INFO: You Can Find Backlift at GameGuardian Forum')
--gg.clearResults()

gg.toast('Thanks For Use Cheating')