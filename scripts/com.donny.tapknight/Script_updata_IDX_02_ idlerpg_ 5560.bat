.\updateadb\adb connect emulator-5560
.\updateadb\adb -s emulator-5560 push .\images  /storage/emulated/legacy/Robotmon/scripts/com.donny.tapknight/images
.\updateadb\adb -s emulator-5560 push .\index.js  /storage/emulated/legacy/Robotmon/scripts/com.donny.tapknight/
.\updateadb\adb -s emulator-5560 push .\index.html  /storage/emulated/legacy/Robotmon/scripts/com.donny.tapknight/
.\updateadb\adb -s emulator-5560 shell rm -r /storage/emulated/legacy/Robotmon/scripts/com.donny.tapknight/index.zip
