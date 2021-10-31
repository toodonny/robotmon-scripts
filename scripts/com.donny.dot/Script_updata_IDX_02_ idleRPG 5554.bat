REM .\bin\adb connect emulator-5556 
.\bin\adb -s emulator-5556 shell rm -r /sdcard/Robotmon/scripts/com.donny.dot/images
.\bin\adb -s emulator-5556 shell rm -r /sdcard/Robotmon/scripts/com.donny.dot/*.*
.\bin\adb -s emulator-5556 shell rm -r /sdcard/Robotmon/scripts/com.donny.dot/ggscript

.\bin\adb -s emulator-5556 push .\images  /storage/emulated/legacy/Robotmon/scripts/com.donny.dot/images
.\bin\adb -s emulator-5556 push .\index.js  /storage/emulated/legacy/Robotmon/scripts/com.donny.dot/
.\bin\adb -s emulator-5556 push .\index.html  /storage/emulated/legacy/Robotmon/scripts/com.donny.dot/
.\bin\adb -s emulator-5556 shell rm -r /storage/emulated/legacy/Robotmon/scripts/com.donny.dot/index.zip

REM pause
