#!/bin/sh
echo ""
echo "default example"
echo "running 'cat \"./example/input.txt\" | password_validator'"
cat "./example/input.txt" | password_validator

echo ""
echo "all valid"
echo "running 'cat \"./example/valid.txt\" | password_validator'"
cat "./example/valid.txt" | password_validator

echo ""
echo "with custom password list"
echo "running 'echo \"password1,averystrongpassword,password 1\" | password_validator ./example/weak_password_list.txt'"
echo "password1,averystrongpassword,password 1" | password_validator ./example/weak_password_list.txt