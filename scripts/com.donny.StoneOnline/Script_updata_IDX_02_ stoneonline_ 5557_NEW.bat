.\updateadb\adb connect emulator-5556
.\updateadb\adb -s emulator-5556 push .\images  /storage/emulated/legacy/Robotmon/scripts/com.donny.StoneOnline/images
.\updateadb\adb -s emulator-5556 push .\index.js  /storage/emulated/legacy/Robotmon/scripts/com.donny.StoneOnline/
.\updateadb\adb -s emulator-5556 push .\index.html  /storage/emulated/legacy/Robotmon/scripts/com.donny.StoneOnline/
.\updateadb\adb -s emulator-5556 shell rm -r /storage/emulated/legacy/Robotmon/scripts/com.donny.StoneOnline/index.zip
