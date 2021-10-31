.\bin\adb connect emulator-5554           /sdcard/Robotmon/scripts/com.donny.daerisoft/images/

.\bin\adb -s emulator-5554 shell rm -r /sdcard/Robotmon/scripts/com.donny.daerisoft/images
.\bin\adb -s emulator-5554 shell rm -r /sdcard/Robotmon/scripts/com.donny.daerisoft/*.*
.\bin\adb -s emulator-5554 shell rm -r /sdcard/Robotmon/scripts/com.donny.daerisoft/ggscript

.\bin\adb -s emulator-5554 push .\images  /sdcard/Robotmon/scripts/com.donny.daerisoft/images
.\bin\adb -s emulator-5554 push .\index.js  /sdcard/Robotmon/scripts/com.donny.daerisoft/
.\bin\adb -s emulator-5554 push .\index.html  /sdcard/Robotmon/scripts/com.donny.daerisoft/
.\bin\adb -s emulator-5554 push .\ggscript  /sdcard/Robotmon/scripts/com.donny.daerisoft/ggscript
.\bin\adb -s emulator-5554 push .\libs  /sdcard/Robotmon/libs
.\bin\adb -s emulator-5554 shell rm -r /sdcard/Robotmon/scripts/com.donny.daerisoft/index.zip

pause