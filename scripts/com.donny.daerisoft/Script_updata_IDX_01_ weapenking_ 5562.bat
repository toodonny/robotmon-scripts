.\bin\adb connect emulator-5562           /sdcard/Robotmon/scripts/com.donny.daerisoft/images/
.\bin\adb -s emulator-5562 push .\images  /sdcard/Robotmon/scripts/com.donny.daerisoft/images
.\bin\adb -s emulator-5562 push .\index.js  /sdcard/Robotmon/scripts/com.donny.daerisoft/
.\bin\adb -s emulator-5562 push .\index.html  /sdcard/Robotmon/scripts/com.donny.daerisoft/
.\bin\adb -s emulator-5562 push .\ggscript  /sdcard/Robotmon/scripts/com.donny.daerisoft/ggscript
.\bin\adb -s emulator-5562 shell rm -r /sdcard/Robotmon/scripts/com.donny.daerisoft/index.zip

pause