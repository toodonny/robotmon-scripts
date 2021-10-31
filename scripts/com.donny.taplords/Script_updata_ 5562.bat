REM .\updateadb\adb connect emulator-5562
.\updateadb\adb -s emulator-5562 push .\images  /storage/emulated/0/Robotmon/scripts/com.donny.taplords/
.\updateadb\adb -s emulator-5562 push .\index.js  /storage/emulated/0/Robotmon/scripts/com.donny.taplords/
.\updateadb\adb -s emulator-5562 push .\index.html  /storage/emulated/0/Robotmon/scripts/com.donny.taplords/
.\updateadb\adb -s emulator-5562 push .\ggscript  /storage/emulated/0/Robotmon/scripts/com.donny.taplords/ggscript
.\updateadb\adb -s emulator-5562 shell rm -r /storage/emulated/0/Robotmon/scripts/com.donny.taplords/index.zip

pause
