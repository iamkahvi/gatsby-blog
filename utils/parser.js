"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = void 0;
var data_js_1 = require("./data.js");
function parser(text) {
    var bList = [];
    var lines = text.split("\n").filter(Boolean);
    // console.log(lines);
    var titleRegex = /^\ \*\ (.*)$/m;
    var descRegex = /^\ {3}(.*)$/m;
    var i = 0;
    while (i < lines.length) {
        var m = lines[i].match(titleRegex);
        if (m !== null) {
            var book = {
                title: m[1],
                description: "",
            };
            var start = ++i;
            // Get to end of description
            while (!titleRegex.test(lines[i]) && i < lines.length) {
                var m_1 = lines[i].match(descRegex);
                if (m_1 !== null) {
                    lines[i] = m_1[1];
                }
                i++;
            }
            book.description = lines.slice(start, i).join(" ");
            bList.push(book);
        }
        else {
            i++;
        }
    }
    return bList;
}
exports.parser = parser;
parser(data_js_1.text);
console.log(JSON.stringify(parser(data_js_1.text)));
