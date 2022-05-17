#! /usr/bin/env node

const fs            = require("fs");
const path          = require("path");
const os            = require("os");
const colors        = require("colors");
const infoOutModule = require("./helpers/info.out.js");
const utilModule    = require("./helpers/utils.js");

if (os.platform() !== "win32") {
    console.error("This program does not work on %s".white.bgRed, os.platform());
    process.exit(1);
}

const systemUsername          = os.userInfo().username;
const commandArgs             = process.argv.slice(2);
const windowsTerminalRegex    = /Microsoft.WindowsTerminal_.{0,}/; // Regex for the Windows Terminal folder
global.windowsTerminalFolder  = path.join("C:", "Users", systemUsername, "AppData", "Local", "Packages");

fs.readdirSync(windowsTerminalFolder).forEach((f) => {
    if (windowsTerminalRegex.test(f)) return global.windowsTerminalFolder = path.join("C:", "Users", systemUsername, "AppData", "Local", "Packages", f);
});

global.windowsTerminalConfig  = path.join(global.windowsTerminalFolder, "LocalState", "settings.json");

let commandLedger = {
    flags: [], // starts with --flag
    params: [], // starts with -name=value
    rootCommand: "", // only one
    args: [],
};

if (fs.existsSync(path.join("C:", "Users", systemUsername, "Documents", "wtt", "settings.json")) === false) {
    fs.cpSync(global.windowsTerminalConfig, path.join("C:", "Users", systemUsername, "Documents", "wtt", "settings.json"));
    console.log("Saved failsafe backup!".yellow);
}

for (let [index, value] of Object.entries(commandArgs)) {
    if (value.startsWith("--")) commandLedger.flags.push({
        index,
        value: value.replace("--", ""),
    });
    else if (value.startsWith("-")) commandLedger.params.push({
        index,
        value: value.replace("-", "").split("="),
    });
    else if (commandLedger.rootCommand === "") commandLedger.rootCommand = value;
    else commandLedger.args.push({
        index,
        value
    });
}

if (commandLedger.rootCommand === "") {
    infoOutModule.defaultHelp();
    process.exit(1);
} else if (commandLedger.rootCommand === "help") {
    if (commandLedger.args[0] !== undefined && ["list", "install", "backup", "upload", "download", "clean", "about", "credits", "help"].includes(commandLedger.args[0].value)) {
        infoOutModule.help(commandLedger.args[0].value);
    }
    
    process.exit(1);
}

commandLedger.flags.forEach((flag) => {
    if (flag.value == "no-color") {
        colors.disable();        
    }
});

console.log(commandLedger);

if (["list", "install", "backup", "upload", "download", "clean", "about", "credits", "help"].includes(commandLedger.rootCommand.toLowerCase()) === false) {
    console.log("Invalid command!".bold.red);
    process.exit(1);
}

utilModule[commandLedger.rootCommand.toLowerCase()](commandLedger);