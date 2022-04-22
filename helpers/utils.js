const fs    = require("fs");
const jsonc = require("jsonc");
const path  = require("path");
const cli   = {};

const themeConfigFile = jsonc.parse(fs.readFileSync(path.join(__dirname, "..", "themes.json")).toString());

function search(themeIdentifier) {
    if (Number.isInteger(parseInt(themeIdentifier))) return themeConfigFile[parseInt(themeIdentifier)];
    themeIdentifier = themeIdentifier.split("+").join(" ");
    themeConfigFile.forEach((elem) => {
        if (elem["name"] === themeIdentifier) return elem;
    });
    return -1;
}

function list(commandLedger) {
    const themeIdentifier = commandLedger?.args[0]?.value.split("+").join(" ");

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
    const themeIdentifier = commandLedger?.args[0]?.value.split("+").join(" ");
    if (themeIdentifier === undefined) process.exit(1);
    console.log(themeIdentifier);
    const themeData = search(themeIdentifier);

    console.log(themeData);
}

cli["install"] = install;

module.exports = cli;