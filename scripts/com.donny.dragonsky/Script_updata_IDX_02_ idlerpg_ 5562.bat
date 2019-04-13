.\updateadb\adb connect emulator-5562
.\updateadb\adb -s emulator-5562 push .\images  /storage/emulated/legacy/Robotmon/scripts/com.donny.dragonsky/images
.\updateadb\adb -s emulator-5562 push .\index.js  /storage/emulated/legacy/Robotmon/scripts/com.donny.dragonsky/
.\updateadb\adb -s emulator-5562 push .\index.html  /storage/emulated/legacy/Robotmon/scripts/com.donny.dragonsky/
.\updateadb\adb -s emulator-5562 shell rm -r /storage/emulated/legacy/Robotmon/scripts/com.donny.dragonsky/index.zip
pause