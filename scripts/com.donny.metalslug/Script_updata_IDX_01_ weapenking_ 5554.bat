.\updateadb\adb connect emulator-5558
.\updateadb\adb -s emulator-5558 push .\images  /storage/emulated/legacy/Robotmon/scripts/com.donny.metalslug/images
.\updateadb\adb -s emulator-5558 push .\index.js  /storage/emulated/legacy/Robotmon/scripts/com.donny.metalslug/
.\updateadb\adb -s emulator-5558 push .\index.html  /storage/emulated/legacy/Robotmon/scripts/com.donny.metalslug/
.\updateadb\adb -s emulator-5558 push .\ggscript  /storage/emulated/legacy/Robotmon/scripts/com.donny.metalslug/ggscript
.\updateadb\adb -s emulator-5558 shell rm -r /storage/emulated/legacy/Robotmon/scripts/com.donny.metalslug/index.zip
