# NIST Password Validator

## Setup
 * Clone this repository: `git clone https://github.com/mackenco/password-validator.git && cd password-validator`
 * `yarn install` or `npm install` to install dependencies
 * `yarn link` or `npm link` to link the executables
 
## Usage
```
  password_validator [options] [common-path]
  
  Validates a list of passwords per NIST guidelines
  
  Options:

    -V, --version                output the version number
    -i, --input [input]          Path to text file containing passwords
    -p, --passwords [passwords]  Comma-separated list of passwords to validate
    -h, --help                   output usage information
```
    
 * Can also accepted piped input: `cat my_password_file | password_validator`
 * Check out `/example/examples.sh` for different uses, and run `password_validator_examples` to see them in action. 
 * Input and common password files must be either newline or comma-delimited. 
 * Passwords are validated based on four criteria:
 
    * Have an 8 character minimum
    * Have a 64 character maximum
    * Only ASCII characters and spaces
    * Not a common password. If a common password file is supplied, passwords are checked against this file. If not, this [Common Password List](https://github.com/danielmiessler/SecLists/raw/master/Passwords/Common-Credentials/10-million-password-list-top-1000000.txt) is used.

## Structure
    .
    ├── example    # Usage examples
    ├── lib        # Source files
    ├── test       # Automated tests. Run `yarn/npm test` to run the test suite and see coverage.
    └── README.md

## Next Steps
 * Spaces are valid characters, meaning `password 1` is valid (despite `password1` appearing on the common list). Should this check for common passwords with whitespace removed? 
 * How frequently does [Common Password List](https://github.com/danielmiessler/SecLists/raw/master/Passwords/Common-Credentials/10-million-password-list-top-1000000.txt) change? Add a flag to pull down the latest version of this to use for the common passwords.
 * More validation - probe edge cases like malformed pipe input 
