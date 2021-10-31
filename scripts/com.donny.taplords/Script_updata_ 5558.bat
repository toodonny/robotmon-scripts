REM .\updateadb\adb connect emulator-5558
.\updateadb\adb -s emulator-5558 push .\images  /storage/emulated/0/Robotmon/scripts/com.donny.taplords/
.\updateadb\adb -s emulator-5558 push .\index.js  /storage/emulated/0/Robotmon/scripts/com.donny.taplords/
.\updateadb\adb -s emulator-5558 push .\index.html  /storage/emulated/0/Robotmon/scripts/com.donny.taplords/
.\updateadb\adb -s emulator-5558 push .\ggscript  /storage/emulated/0/Robotmon/scripts/com.donny.taplords/ggscript
.\updateadb\adb -s emulator-5558 shell rm -r /storage/emulated/0/Robotmon/scripts/com.donny.taplords/index.zip

pause
