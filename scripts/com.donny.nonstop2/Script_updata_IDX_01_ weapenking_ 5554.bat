.\updateadb\adb connect emulator-5554
.\updateadb\adb -s emulator-5554 push .\images  /storage/emulated/legacy/Robotmon/scripts/com.donny.nonstop2/images
.\updateadb\adb -s emulator-5554 push .\index.js  /storage/emulated/legacy/Robotmon/scripts/com.donny.nonstop2/
.\updateadb\adb -s emulator-5554 push .\index.html  /storage/emulated/legacy/Robotmon/scripts/com.donny.nonstop2/
.\updateadb\adb -s emulator-5554 push .\ggscript  /storage/emulated/legacy/Robotmon/scripts/com.donny.nonstop2/ggscript
.\updateadb\adb -s emulator-5554 shell rm -r /storage/emulated/legacy/Robotmon/scripts/com.donny.nonstop2/index.zip
