#!/bin/bash
scrap
adb -s R38M9045JXT reverse tcp:8081 tcp:8081 && scrcpy -s R38M9045JXT