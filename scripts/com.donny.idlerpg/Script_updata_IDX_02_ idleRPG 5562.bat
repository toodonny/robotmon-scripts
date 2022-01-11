REM .\bin\adb connect emulator-5556
.\bin\adb -s emulator-5556 shell rm -r /sdcard/Robotmon/scripts/com.donny.idlerpg/images
.\bin\adb -s emulator-5556 shell rm -r /sdcard/Robotmon/scripts/com.donny.idlerpg/*.*
.\bin\adb -s emulator-5556 shell rm -r /sdcard/Robotmon/scripts/com.donny.idlerpg/ggscript

.\bin\adb -s emulator-5556 push .\images  /sdcard/Robotmon/scripts/com.donny.idlerpg/images
.\bin\adb -s emulator-5556 push .\index.js  /sdcard/Robotmon/scripts/com.donny.idlerpg/
.\bin\adb -s emulator-5556 push .\index.html  /sdcard/Robotmon/scripts/com.donny.idlerpg/
.\bin\adb -s emulator-5556 shell rm -r /sdcard/Robotmon/scripts/com.donny.idlerpg/index.zip

REM pause
