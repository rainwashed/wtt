const fs = require("fs");
const colors = require("colors");
const path = require("path");
const os = require("os");
const infoOutModule = require("./helpers/info.out.js");

if (os.platform() !== "win32") {
    console.error("This program does not work on %s".white.bgRed, systemType);
    process.exit(1);
}

const systemUsername = os.userInfo().username;
const commandArgs = process.argv.slice(2);
const windowsTerminalRegex = /Microsoft.WindowsTerminal_.{0,}/; // Regex for the Windows Terminal folder

let windowsTerminalFolder = path.join("C:", "Users", systemUsername, "AppData", "Local", "Packages");

fs.readdirSync(windowsTerminalFolder).forEach((f) => {
    if (windowsTerminalRegex.test(f)) return windowsTerminalFolder = path.join("C:", "Users", systemUsername, "AppData", "Local", "Packages", f);
});

let commandLedger = {
    flags: [], // starts with --flag
    params: [], // starts with -name=value
    rootCommand: "", // only one
    args: [],
};

for (let [index, value] of Object.entries(commandArgs)) {
    if (value.startsWith("--")) commandLedger.flags.push({
        index,
        value: value.replace("--", ""),
    })
    else if (value.startsWith("-")) commandLedger.params.push({
        index,
        value: value.replace("-", "").split("="),
    })
    else if (commandLedger.rootCommand === "") commandLedger.rootCommand = value;
    else commandLedger.args.push({
        index,
        value
    })
}

if (commandLedger.rootCommand === "") {
    infoOutModule.defaultHelp();
    process.exit(1);
} else if (commandLedger.rootCommand === "help") {
    infoOutModule.help(commandLedger.args[0].value);
    process.exit(1);
}

