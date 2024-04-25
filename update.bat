@echo off
cls

echo fetching ...
git fetch

echo checking out to main branch ...
git checkout main

echo resetting all changes ...
git reset --hard origin/main

echo applying changes ...
git pull origin main
