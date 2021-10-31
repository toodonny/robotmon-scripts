REM .\updateadb\adb connect emulator-5560
.\updateadb\adb -s emulator-5560 push .\images  /storage/emulated/0/Robotmon/scripts/com.donny.taplords/
.\updateadb\adb -s emulator-5560 push .\index.js  /storage/emulated/0/Robotmon/scripts/com.donny.taplords/
.\updateadb\adb -s emulator-5560 push .\index.html  /storage/emulated/0/Robotmon/scripts/com.donny.taplords/
.\updateadb\adb -s emulator-5560 push .\ggscript  /storage/emulated/0/Robotmon/scripts/com.donny.taplords/ggscript
.\updateadb\adb -s emulator-5560 shell rm -r /storage/emulated/0/Robotmon/scripts/com.donny.taplords/index.zip

pause
