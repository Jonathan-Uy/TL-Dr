#!/bin/bash
cd "./api/ts"
cp .env.example .env
npm install

cd "../../app"
npm install

clear

echo "Successfully installed all modules!"