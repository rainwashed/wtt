const fs    = require("fs");
const jsonc = require("jsonc");
const path  = require("path");
const cli   = {};

const themeConfigFile = jsonc.parse(fs.readFileSync(path.join(__dirname, "..", "themes.json")).toString());

/**
 * Search for a theme based on a theme id or theme name
 * @param {number|string} themeIdentifier 
 * @returns Theme element
 */
// TODO: Fix space-including titles
function search(themeIdentifier) {
    let e;
    if (Number.isInteger(parseInt(themeIdentifier))) return themeConfigFile[parseInt(themeIdentifier)];

    themeIdentifier = themeIdentifier.split("+").join(" ");
    themeConfigFile.forEach((elem) => {
        if (elem["name"] === themeIdentifier) return e = elem;
    });

    return e;
}

function list(commandLedger) {
    const themeIdentifier = commandLedger?.args[0]?.value?.split("+").join(" ");

    if (themeIdentifier === undefined) {
        themeConfigFile.forEach((value, index) => {
            console.log(`${`[${index}]`.yellow} - ${value["name"]} / ${((value["meta"]["isDark"] === true) ? "🌙" : "☀").gray}`);
        });
    } else {
        for (let [ index, value ] of themeConfigFile.entries()) {
            if (value["name"] === themeIdentifier || index === parseInt(themeIdentifier)) {
                const personCredits = value["meta"]["credits"].map((creditObject) => creditObject["name"]);

                console.log(
`${`[${index}]`.yellow} - ${value["name"].rainbow}
-------------------
Built By: ${personCredits.join(", ").italic}

Red ------: ${value["red"].red}
Green ----: ${value["green"].green}
Yellow ---: ${value["yellow"].yellow}
Blue -----: ${value["blue"].blue}
Purple ---: ${value["purple"].magenta}
Cyan -----: ${value["cyan"].cyan}
White ----: ${value["white"].white}

Background: ${value["background"]}
Foreground: ${value["foreground"]}
Cursor----: ${value["cursorColor"]}
Selection-: ${value["selectionBackground"]}
`);
                break;
            }
        }
    }

}

cli["list"] = list;

function install(commandLedger) {
    const commandStart = Date.now();
    const themeIdentifier = commandLedger?.args[0]?.value?.split("+").join(" ");
    if (themeIdentifier === undefined) process.exit(1);
    const themeData = search(themeIdentifier);
    const windowsTerminalConfigFile = jsonc.parse(fs.readFileSync(global.windowsTerminalConfig).toString());

    if (themeData === undefined || themeData === {}) {
        console.log(`${"themeData".bold} returned invalid.`.red);
        process.exit(1);
    }

    console.log(`Installing ${themeData["name"].rainbow}`);

    for (const scheme of windowsTerminalConfigFile["schemes"]) {
        if (scheme["name"] === themeData["name"]) {
            console.log(`${scheme["name"].rainbow} is already installed.`);
            process.exit(1);
        };
    }

    windowsTerminalConfigFile["schemes"].push(themeData);

    fs.writeFileSync(global.windowsTerminalConfig, jsonc.stringify(windowsTerminalConfigFile));

    console.log(`Installed  ${themeData["name"].rainbow} in ${(Date.now() - commandStart)}ms.`);
    process.exit(0);
}

cli["install"] = install;

module.exports = cli;