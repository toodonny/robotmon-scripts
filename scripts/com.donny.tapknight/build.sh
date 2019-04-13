echo 1
bin/adb -s emulator-5556 shell rm -r sdcard/Robotmon/scripts/com.donny.idlerpg
echo 2
bin/adb -s emulator-5556 shell mkdir sdcard/Robotmon/scripts/com.donny.idlerpg
echo 3
bin/adb -s emulator-5556 push * sdcard/Robotmon/scripts/com.donny.idlerpg/
echo 4
bin/adb -s emulator-5556 shell rm -r sdcard/Robotmon/scripts/com.donny.idlerpg/index.zip