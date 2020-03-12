.\updateadb\adb connect emulator-5554
.\updateadb\adb -s emulator-5554 push .\images  /sdcard/Robotmon/scripts/com.donny.nonstop2/images
.\updateadb\adb -s emulator-5554 push .\index.js  /sdcard/Robotmon/scripts/com.donny.nonstop2/
.\updateadb\adb -s emulator-5554 push .\index.html  /sdcard/Robotmon/scripts/com.donny.nonstop2/
.\updateadb\adb -s emulator-5554 push .\ggscript  /sdcard/Robotmon/scripts/com.donny.nonstop2/ggscript
.\updateadb\adb -s emulator-5554 shell rm -r /sdcard/Robotmon/scripts/com.donny.nonstop2/index.zip

pause