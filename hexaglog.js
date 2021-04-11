import HexaglogItemSheet from "./module/sheet/hexaglog-item-sheet.js"
import HexaglogPlayerSheet from "./module/sheet/hexaglog-player-sheet.js"
import HexaglogHirelingSheet from "./module/sheet/hexaglog-hireling-sheet.js"

Hooks.once("init", function () {
    console.log("hexaglog | Initializing system");

    // Disable the default sheets
    Items.unregisterSheet("core", ItemSheet)
    Actors.unregisterSheet("core", ActorSheet)

    // Import our custom sheet
    Items.registerSheet("hexaglog", HexaglogItemSheet, { makeDefault: true });
    Actors.registerSheet("hexaglog", HexaglogPlayerSheet, { types: ["player"], makeDefault: true });
    Actors.registerSheet("hexaglog", HexaglogHirelingSheet, { types: ["hireling"], makeDefault: true });


    // If you need to add Handlebars helpers, here are a few useful examples:
    Handlebars.registerHelper('concat', function () {
        var outStr = '';
        for (var arg in arguments) {
            if (typeof arguments[arg] != 'object') {
                outStr += arguments[arg];
            }
        }
        return outStr;
    });

    Handlebars.registerHelper('toLowerCase', function (str) {
        return str.toLowerCase();
    });

    Handlebars.registerHelper('toUpperCase', (str) => {
        return str.toUpperCase();
    })
});