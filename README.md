# NIST Password Validator

## Setup
 * Clone this repository: `git clone https://github.com/mackenco/password-validator.git && cd $_`
 * `yarn install` to install dependencies
 * `yarn link` to link the executables
 
## Usage
 * Run `cat path_to_passwords.txt | password_validator [path_to_common_passwords.txt]`. The output will print to the console.
 * Input and common password files must be either newline or comma-delimited. 
 * Passwords are validated based on four criteria:
 
    * Have an 8 character minimum
    * Have a 64 character maximum
    * Only ASCII characters and spaces
    * Not a common password. If a common password file is supplied, passwords are checked against this file. If not, this [Common Password List](https://github.com/danielmiessler/SecLists/raw/master/Passwords/Common-Credentials/10-million-password-list-top-1000000.txt) is used.

## Structure
    .
    ├── example    # Usage examples. Run `password_validator_example` to execute. Update the .txt files in this directory as needed.
    ├── lib        # Source files
    ├── test       # Automated tests. Run `yarn test` to run the test suite.
    ├── index.js   # Actual executeable file for this package. Not much going on in there. 
    └── README.md

## Next Steps
 * How frequently does [Common Password List](https://github.com/danielmiessler/SecLists/raw/master/Passwords/Common-Credentials/10-million-password-list-top-1000000.txt) change? Add a flag to pull down the latest version of this to use for the common passwords.
 * Add support for input files (or raw passwords) to be passed in directly as options, e.g. `password_validator -p 'password1,password2'` or `password_validator -i my_passwords.txt`
 * Spaces are valid characters, meaning `password 1` is valid (despite `password1` appearing on the common list). Should this check for common passwords with whitespace removed? 
 * More validation - probe edge cases like malformed pipe input and unresolvable file paths 
