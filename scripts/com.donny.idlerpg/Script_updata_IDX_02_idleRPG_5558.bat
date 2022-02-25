REM .\bin\adb connect emulator-5558
.\bin\adb -s emulator-5558 shell rm -r /sdcard/Robotmon/scripts/com.donny.idlerpg/images
.\bin\adb -s emulator-5558 shell rm -r /sdcard/Robotmon/scripts/com.donny.idlerpg/*.*
.\bin\adb -s emulator-5558 shell rm -r /sdcard/Robotmon/scripts/com.donny.idlerpg/ggscript

.\bin\adb -s emulator-5558 push .\images  /sdcard/Robotmon/scripts/com.donny.idlerpg/images
.\bin\adb -s emulator-5558 push .\index.js  /sdcard/Robotmon/scripts/com.donny.idlerpg/
.\bin\adb -s emulator-5558 push .\index.html  /sdcard/Robotmon/scripts/com.donny.idlerpg/
.\bin\adb -s emulator-5558 shell rm -r /sdcard/Robotmon/scripts/com.donny.idlerpg/index.zip

REM pause
