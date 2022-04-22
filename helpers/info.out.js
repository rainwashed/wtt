const systemUsername = require("os").userInfo().username;

const commandReference = {
    "list": `
-------------------

${"list".bold}
List theme schemes or details about a specific theme
    
Arguments: Theme name or index number
Valid Parameters: None
Valid Flags: None
    
-------------------
`,

    "install": `
-------------------

${"install".bold}
Install a theme schema

Arguments: Theme name or index number
Valid Parameters: None
Valid Flags: --nonInteractive

For theme names that contain a space, replace the space with a +
(ex: 3024 Day -> 3024+Day)

or optionally use the theme index number
(ex: 3024 Day -> 0)

-------------------
`,

    "backup": `
-------------------

${"backup".bold}
Backup the Windows Terminal configuration file to a local location (default: C:/Users/${systemUsername}/Documents/wtt)

Arguments: None
Valid Parameters: None
Valid Flags: None

-------------------
`,

    "upload": `
-------------------

${"upload".bold}
Upload the Windows Terminal configuration file to a GitHub repository

Arguments: None
Valid Parameters: None
Valid Flags: None

-------------------    
`,

    "download": `
-------------------

${"download".bold}
Download the Windows Terminal configuration file from the GitHub repository

Arguments: None
Valid Parameters: None
Valid Flags: None

-------------------    
`,

    "clean": `
-------------------

${"clean".bold}
Reset the Windows Terminal configuration file to the original (the default backup when first running wtt)

Arguments: None
Valid Parameters: None
Valid Flags: None

-------------------    
`,

    "about": `
-------------------

${"about".bold}
List system information and wtt information such as version, configuration file, valid backups, etc.

Arguments: None
Valid Parameters: None
Valid Flags: None

-------------------    
`,

    "credits": `
-------------------

${"credits".bold}
List authors, contributors, dependencies, and other information regarding the project

Arguments: None
Valid Parameters: None
Valid Flags: None

-------------------    
`,

    "help": `
-------------------

${"help".bold}
Show documentation on a specific command or show this screen

Arguments: command
Valid Parameters: None
Valid Flags: None

-------------------    
`,
};

function help(command) {
    console.log(commandReference[command]);
}

function defaultHelp() {
    console.log(
`${"wtt Command Usage".rainbow}
-------------------

${"list".bold} ${"-----------------------------------------".gray} List theme schemes
${"install".bold} ${"•••••••••••••••••••••••••••••••••••••••••".gray} Install a theme 
${"backup".bold} ${"----------------------".gray} Backup Windows Terminal config file
${"upload".bold} ${"•••••••".gray} Upload Windows Terminal config file to GitHub repo
${"download".bold} ${"-".gray} Download Windows Terminal config file from GitHub repo
${"clean".bold} ${"••••••••".gray} Reset Windows Terminal config file to the original
${"about".bold} ${"------------------------------".gray} About the project and system
${"credits".bold} ${"•••••••••••••••••••••••••••••••••••••••••••••••••".gray} Credits
${"help".bold} ${"----------------------------------------".gray} Help with a command

-------------------

The syntax of wtt is as follows
${"wtt".gray} <command> [--flags] [-params=value]

The ${"command".bold} is required as to determine what wtt should do. The command is first come first serve, meaning that a command that comes before another will be set as the root command and the others as an argument.

${"--flags".bold} are to be assumed as a default value of ${"false".red} to ${"true".green} unless explicitly stated as so.

${"-params=value".bold} are optional unless stated that it is necessary for a command (ex: theme name for install as the default is an interactive menu).

-------------------

${"Global".bold}
Global flags and parameters for all commands

Valid Parameters: None
Valid Flags: --no-color

--no-color: Do not show terminal color styling such as bold, red, etc.

-------------------

Made with ❤️ and 🕑
    `);
}

const infoOut = {
    defaultHelp,
    help,
};

module.exports = infoOut;