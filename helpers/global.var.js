const fs             = require("fs");
const path           = require("path");
const projectVersion = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package.json")))["version"];

module.exports = {
    projectVersion,
};