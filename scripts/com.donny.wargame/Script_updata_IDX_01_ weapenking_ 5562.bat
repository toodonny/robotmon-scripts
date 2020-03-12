.\bin\adb connect emulator-5562           /sdcard/Robotmon/scripts/com.donny.wargame/images/
.\bin\adb -s emulator-5562 push .\images  /sdcard/Robotmon/scripts/com.donny.wargame/images
.\bin\adb -s emulator-5562 push .\index.js  /sdcard/Robotmon/scripts/com.donny.wargame/
.\bin\adb -s emulator-5562 push .\index.html  /sdcard/Robotmon/scripts/com.donny.wargame/
.\bin\adb -s emulator-5562 push .\ggscript  /sdcard/Robotmon/scripts/com.donny.wargame/ggscript
.\bin\adb -s emulator-5562 shell rm -r /sdcard/Robotmon/scripts/com.donny.wargame/index.zip

pause