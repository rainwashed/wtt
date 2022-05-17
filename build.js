// This file is to be used to compile the index.js into a binary
const path          = require("path");
const fs            = require("fs");
const colors        = require("colors");
const { execSync }  = require("child_process");

const executionStart = Date.now();

function attemptExecution(command) {
    let o = []; // Index 0 = if error was occurred / Index 1 = return
    try {
        o[0] = false;
        o[1] = execSync(command).toString();
    } catch (e) {
        o[0] = true;
        o[1] = e;        
    }

    return o;
}

function logError(subject, errorMessage) {
    console.log(`Encountered an error with ${subject.bold}`.red);
    console.log(errorMessage);
}

// Check if pkg package exists, if not install.
let npmLsOutput;

try {
    npmLsOutput = execSync("npm ls -g").toString();
} catch (e) {
    logError("npmLsOutput", e);
    process.exit(1);
}

if (!npmLsOutput.includes("pkg@")) {
    console.log("Unable to find pkg@ in the npm ls output. Attempting to install...".yellow);

    const [ errorOccurred, stdout ] = attemptExecution("npm i -g pkg");

    if (errorOccurred) {
        logError("npm i -g pkg", stdout);
        process.exit(1);
    } else {
        console.log(`Installed ${"pkg".bold} globally, continuing execution...`.green);
    }
} else {
    console.log(`Found ${"pkg".bold}, continuing execution...`.green);
}

// Actually build the binary
console.log("Attempting to build the binary...".yellow);

const buildTimeStart = Date.now();
let [ errorOccurred, stdout] = attemptExecution("pkg .");

if (errorOccurred) {
    logError("pkg --no-bytecode .", stdout);
    process.exit(1);
}

console.log(`Took ${Math.round((Date.now() - buildTimeStart) / 1000)}s to compile the binary.`.blue);

// Generate a checksum
console.log("Attempting to generate a checksum...".yellow);

const checkSumStart = Date.now();

attemptExecution("powershell.exe .\\generateChecksum.ps1");

console.log(`Took ${Date.now() - checkSumStart}ms to generate a checksum.`.blue);
console.log(`Finished the build process in ${Math.round((Date.now() - executionStart) / 1000)}s!`.rainbow);

console.log(
`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡿⠋⠄⣀⣀⣤⣴⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣌⠻⣿⣿
⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠹⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠹
⣿⣿⡟⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡛⢿⣿⣿⣿⣮⠛⣿⣿⣿⣿⣿⣿⡆
⡟⢻⡇⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣣⠄⡀⢬⣭⣻⣷⡌⢿⣿⣿⣿⣿⣿
⠃⣸⡀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠈⣆⢹⣿⣿⣿⡈⢿⣿⣿⣿⣿
⠄⢻⡇⠄⢛⣛⣻⣿⣿⣿⣿⣿⣿⣿⣿⡆⠹⣿⣆⠸⣆⠙⠛⠛⠃⠘⣿⣿⣿⣿
⠄⠸⣡⠄⡈⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠁⣠⣉⣤⣴⣿⣿⠿⠿⠿⡇⢸⣿⣿⣿
⠄⡄⢿⣆⠰⡘⢿⣿⠿⢛⣉⣥⣴⣶⣿⣿⣿⣿⣻⠟⣉⣤⣶⣶⣾⣿⡄⣿⡿⢸
⠄⢰⠸⣿⠄⢳⣠⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣼⣿⣿⣿⣿⣿⣿⡇⢻⡇⢸
⢷⡈⢣⣡⣶⠿⠟⠛⠓⣚⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⢸⠇⠘
⡀⣌⠄⠻⣧⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠛⠛⠛⢿⣿⣿⣿⣿⣿⡟⠘⠄⠄
⣷⡘⣷⡀⠘⣿⣿⣿⣿⣿⣿⣿⣿⡋⢀⣠⣤⣶⣶⣾⡆⣿⣿⣿⠟⠁⠄⠄⠄⠄
⣿⣷⡘⣿⡀⢻⣿⣿⣿⣿⣿⣿⣿⣧⠸⣿⣿⣿⣿⣿⣷⡿⠟⠉⠄⠄⠄⠄⡄⢀
⣿⣿⣷⡈⢷⡀⠙⠛⠻⠿⠿⠿⠿⠿⠷⠾⠿⠟⣛⣋⣥⣶⣄⠄⢀⣄⠹⣦⢹⣿`.rainbow.bold
);