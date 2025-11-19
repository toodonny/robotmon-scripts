REM .\bin\adb connect emulator-5556
.\bin\adb -s emulator-5556 shell rm -r /sdcard/Download/Robotmon/scripts/com.donny.megergirl/images
.\bin\adb -s emulator-5556 shell rm -r /sdcard/Download/Robotmon/scripts/com.donny.megergirl/*.*
.\bin\adb -s emulator-5556 shell rm -r /sdcard/Download/Robotmon/scripts/com.donny.megergirl/ggscript

.\bin\adb -s emulator-5556 push .\images  /sdcard/Download/Robotmon/scripts/com.donny.megergirl/images
.\bin\adb -s emulator-5556 push .\lib  /sdcard/Download/Robotmon/scripts/com.donny.megergirl/lib
.\bin\adb -s emulator-5556 push .\lib  /sdcard/Download/Robotmon/libs
.\bin\adb -s emulator-5556 push .\index.js  /sdcard/Download/Robotmon/scripts/com.donny.megergirl/
.\bin\adb -s emulator-5556 push .\index.html  /sdcard/Download/Robotmon/scripts/com.donny.megergirl/
.\bin\adb -s emulator-5556 shell rm -r /sdcard/Download/Robotmon/scripts/com.donny.megergirl/index.zip

pause

REM pause
