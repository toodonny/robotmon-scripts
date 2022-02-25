@echo off
set /p var=Please Enter LDPlayer4 ID (1~10):
set /a deviceNum = 5554 + %var% * 2
set deviceName=emulator-
set "device=%deviceName%%deviceNum%"
echo %device%

.\bin\adb -s %device% shell rm -r /sdcard/Robotmon/scripts/com.donny.idlerpg

.\bin\adb -s %device% shell mkdir -p /sdcard/Robotmon/scripts/com.donny.idlerpg

.\bin\adb -s %device% push .\images  /sdcard/Robotmon/scripts/com.donny.idlerpg/images
.\bin\adb -s %device% push .\index.js  /sdcard/Robotmon/scripts/com.donny.idlerpg/
.\bin\adb -s %device% push .\index.html  /sdcard/Robotmon/scripts/com.donny.idlerpg/

pause
