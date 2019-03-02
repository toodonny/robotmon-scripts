.\updateadb\adb connect emulator-5556
.\updateadb\adb -s emulator-5556 push .\images  /storage/emulated/legacy/Robotmon/scripts/com.donny.idlerpg/images
.\updateadb\adb -s emulator-5556 push .\index.js  /storage/emulated/legacy/Robotmon/scripts/com.donny.idlerpg/
.\updateadb\adb -s emulator-5556 shell rm -r /storage/emulated/legacy/Robotmon/scripts/com.donny.idlerpg/index.zip

pause