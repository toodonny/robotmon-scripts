REM .\updateadb\adb connect emulator-5556
.\updateadb\adb -s emulator-5556 push .\images  /storage/emulated/0/Robotmon/scripts/com.donny.KantoCoo/images
.\updateadb\adb -s emulator-5556 push .\images  /storage/emulated/0/Robotmon/scripts/com.donny.KantoCoo/
.\updateadb\adb -s emulator-5556 push .\index.js  /storage/emulated/0/Robotmon/scripts/com.donny.KantoCoo/
.\updateadb\adb -s emulator-5556 push .\index.html  /storage/emulated/0/Robotmon/scripts/com.donny.KantoCoo/
.\updateadb\adb -s emulator-5556 push .\ggscript  /storage/emulated/0/Robotmon/scripts/com.donny.KantoCoo/ggscript
.\updateadb\adb -s emulator-5556 shell rm -r /storage/emulated/0/Robotmon/scripts/com.donny.KantoCoo/index.zip

REM pause
REM 127.0.0.1:21503