.\updateadb\adb connect emulator-5560
.\updateadb\adb -s emulator-5560 push .\images  /storage/emulated/0/Robotmon/scripts/com.donny.boxhero/images
.\updateadb\adb -s emulator-5560 push .\index.js  /storage/emulated/0/Robotmon/scripts/com.donny.boxhero/
.\updateadb\adb -s emulator-5560 push .\index.html  /storage/emulated/0/Robotmon/scripts/com.donny.boxhero/
.\updateadb\adb -s emulator-5560 push .\ggscript  /storage/emulated/0/Robotmon/scripts/com.donny.boxhero/ggscript
.\updateadb\adb -s emulator-5560 shell rm -r /storage/emulated/0/Robotmon/scripts/com.donny.boxhero/index.zip

pause
