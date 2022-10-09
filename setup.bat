@echo off
title Downloading modules for TL;Dr.
cd ".\api\ts\"
call npm install
cd ..
cd ..
cd ".\app\"
call npm install
cd ..
cls
echo Successfully installed all modules!
pause