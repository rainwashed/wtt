const commandSpan   = document.getElementById("command");
// const typew         = new Typewriter(commandSpan, {
//     loop: true,
// });
const commands      = [
    "list",
    "install",
    "backup",
    "upload",
    "download",
    "clean",
    "about",
    "credits",
    "help",
];

function returnRandomCommand() {
    return commands[Math.floor(Math.random() * commands.length)];    
}

commandSpan.innerText = returnRandomCommand();