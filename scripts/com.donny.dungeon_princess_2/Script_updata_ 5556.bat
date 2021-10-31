.\updateadb\adb connect 127.0.0.1:21503
.\updateadb\adb -s 127.0.0.1:21503 push .\images  /storage/emulated/0/Robotmon/scripts/com.donny.dungeon_princess_2/images
.\updateadb\adb -s 127.0.0.1:21503 push .\images  /storage/emulated/0/Robotmon/scripts/com.donny.dungeon_princess_2/
.\updateadb\adb -s 127.0.0.1:21503 push .\index.js  /storage/emulated/0/Robotmon/scripts/com.donny.dungeon_princess_2/
.\updateadb\adb -s -127.0.0.1:21503 push .\index.html  /storage/emulated/0/Robotmon/scripts/com.donny.dungeon_princess_2/
.\updateadb\adb -s 127.0.0.1:21503 push .\ggscript  /storage/emulated/0/Robotmon/scripts/com.donny.dungeon_princess_2/ggscript
.\updateadb\adb -s 127.0.0.1:21503 shell rm -r /storage/emulated/0/Robotmon/scripts/com.donny.dungeon_princess_2/index.zip

REM pause
REM 127.0.0.1:21503