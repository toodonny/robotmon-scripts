REM .\bin\adb connect emulator-5562 
.\bin\adb -s emulator-5562 shell rm -r /sdcard/Robotmon/scripts/com.donny.ssionpress/images
.\bin\adb -s emulator-5562 shell rm -r /sdcard/Robotmon/scripts/com.donny.ssionpress/*.*
.\bin\adb -s emulator-5562 shell rm -r /sdcard/Robotmon/scripts/com.donny.ssionpress/ggscript

.\bin\adb -s emulator-5562 push .\images  /storage/emulated/legacy/Robotmon/scripts/com.donny.ssionpress/images
.\bin\adb -s emulator-5562 push .\index.js  /storage/emulated/legacy/Robotmon/scripts/com.donny.ssionpress/
.\bin\adb -s emulator-5562 push .\index.html  /storage/emulated/legacy/Robotmon/scripts/com.donny.ssionpress/
.\bin\adb -s emulator-5562 shell rm -r /storage/emulated/legacy/Robotmon/scripts/com.donny.ssionpress/index.zip

pause
