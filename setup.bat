@echo off
title Downloading modules for TL;Dr.
cd ".\api\ts\"
copy .env.example .env
call npm install
cd "..\..\app\"
call npm install
cd ..
cls
echo Successfully installed all modules!
pause