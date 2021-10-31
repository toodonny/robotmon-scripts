.\bin\adb -s J1AXJR048300A4G shell rm -r /sdcard/Robotmon/scripts/com.donny.syousin50/images
.\bin\adb -s J1AXJR048300A4G shell rm -r /sdcard/Robotmon/scripts/com.donny.syousin50/*.*
.\bin\adb -s J1AXJR048300A4G shell rm -r /sdcard/Robotmon/scripts/com.donny.syousin50/ggscript

.\bin\adb -s J1AXJR048300A4G push .\images  /sdcard/Robotmon/scripts/com.donny.syousin50/images
.\bin\adb -s J1AXJR048300A4G push .\index.js  /sdcard/Robotmon/scripts/com.donny.syousin50/
.\bin\adb -s J1AXJR048300A4G push .\index.html  /sdcard/Robotmon/scripts/com.donny.syousin50/
.\bin\adb -s J1AXJR048300A4G push .\ggscript  /sdcard/Robotmon/scripts/com.donny.syousin50/ggscript
.\bin\adb -s J1AXJR048300A4G shell rm -r /sdcard/Robotmon/scripts/com.donny.syousin50/index.zip



PAUSE