set x=%date:~0,4%%date:~5,2%%date:~8,2%
set y=%time:~0,2%%time:~3,2%%time:~6,2%


PATH C:\Program Files\WinRAR\
WinRAR.exe a index-%x%-%y%.zip .\bin
WinRAR.exe a index-%x%-%y%.zip .\images
WinRAR.exe a index-%x%-%y%.zip .\index.html
WinRAR.exe a index-%x%-%y%.zip .\index.js
WinRAR.exe a index-%x%-%y%.zip .\Script_updata_IDX_02_idleRPG_choice.bat

PATH C:\Program Files\7-Zip
7z.exe a index-%x%-%y%.zip .\bin
7z.exe a index-%x%-%y%.zip .\images
7z.exe a index-%x%-%y%.zip .\index.html
7z.exe a index-%x%-%y%.zip .\index.js
7z.exe a index-%x%-%y%.zip .\Script_updata_IDX_02_idleRPG_choice.bat
 