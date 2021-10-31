.\bin\adb -s emulator-5556 shell rm -r /sdcard/Robotmon/scripts/com.donny.syousin50/images
.\bin\adb -s emulator-5556 shell rm -r /sdcard/Robotmon/scripts/com.donny.syousin50/*.*
.\bin\adb -s emulator-5556 shell rm -r /sdcard/Robotmon/scripts/com.donny.syousin50/ggscript

.\bin\adb -s emulator-5556 push .\images  /sdcard/Robotmon/scripts/com.donny.syousin50/images
.\bin\adb -s emulator-5556 push .\index.js  /sdcard/Robotmon/scripts/com.donny.syousin50/
.\bin\adb -s emulator-5556 push .\index.html  /sdcard/Robotmon/scripts/com.donny.syousin50/
.\bin\adb -s emulator-5556 push .\ggscript  /sdcard/Robotmon/scripts/com.donny.syousin50/ggscript
.\bin\adb -s emulator-5556 shell rm -r /sdcard/Robotmon/scripts/com.donny.syousin50/index.zip



PAUSE