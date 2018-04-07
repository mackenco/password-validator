#!/bin/sh
echo "\ninvalid passwords"
echo "running 'cat \"./example/invalid.txt\" | password_validator'"
cat ./example/invalid.txt | password_validator

echo "\nall valid"
echo "running 'cat \"./example/valid.txt\" | password_validator'"
cat ./example/valid.txt | password_validator

echo "\nwith custom password list"
echo "running 'echo \"password1,averystrongpassword,password 1\" | password_validator ./example/weak_password_list.txt'"
echo "password1,averystrongpassword,password 1" | password_validator ./example/weak_password_list.txt