.\updateadb\adb connect emulator-5554
.\updateadb\adb -s emulator-5554 push .\images  /storage/emulated/legacy/Robotmon/scripts/com.donny.bladecrafter2/images
.\updateadb\adb -s emulator-5554 push .\index.js  /storage/emulated/legacy/Robotmon/scripts/com.donny.bladecrafter2/
.\updateadb\adb -s emulator-5554 push .\index.html  /storage/emulated/legacy/Robotmon/scripts/com.donny.bladecrafter2/
.\updateadb\adb -s emulator-5554 push .\ggscript  /storage/emulated/legacy/Robotmon/scripts/com.donny.bladecrafter2/ggscript
.\updateadb\adb -s emulator-5554 shell rm -r /storage/emulated/legacy/Robotmon/scripts/com.donny.bladecrafter2/index.zip
