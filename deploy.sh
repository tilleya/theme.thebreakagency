#!/bin/bash
if [ $# -eq 0 ]; then
    read -p "Enter commit message: " commitMessage
else
    commitMessage="$*"
fi
git add .
git commit -m "$commitMessage"
git push
