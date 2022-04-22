const fs    = require("fs");
const jsonc = require("jsonc");
const path  = require("path");
const cli   = {};

function list(commandLedger) {
    const themeIdentifier = commandLedger?.args[0]?.value.split("+").join(" ");
    const themeConfigFile = jsonc.parse(fs.readFileSync(path.join(__dirname, "..", "themes.json")).toString());

    if (themeIdentifier === undefined) {
        themeConfigFile.forEach((value, index) => {
            console.log(`${`[${index}]`.yellow} - ${value["name"]} / ${((value["meta"]["isDark"] === true) ? "🌙" : "☀").gray}`);
        });
    } else {
        for (let [ index, value ] of themeConfigFile.entries()) {
            if (value["name"] === themeIdentifier) {
                const personCredits = value["meta"]["credits"].map((creditObject) => creditObject["name"]);

                console.log(
`[${`${index}]`.yellow} - ${value["name"].rainbow}
-------------------
Built By: ${personCredits.join(", ").italic}

Red ------: ${value["red"]}
Green ----: ${value["green"]}
Yellow ---: ${value["yellow"]}
Blue -----: ${value["blue"]}
Purple ---: ${value["purple"]}
Cyan -----: ${value["cyan"]}
White ----: ${value["white"]}

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

module.exports = cli;