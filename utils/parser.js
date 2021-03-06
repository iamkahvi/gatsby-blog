"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEntries = exports.parser = exports.addPostEntries = void 0;
var contentful = require("contentful-management");
var fs = require("fs");
require("dotenv").config();
function addPostEntries(pl) {
    return __awaiter(this, void 0, void 0, function () {
        var client, space, env, _i, pl_1, post, bPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Opening Connection...");
                    client = contentful.createClient({
                        accessToken: process.env.CONT_MANAGEMENT_TOKEN,
                    });
                    return [4 /*yield*/, client.getSpace("rbthbhshshw9")];
                case 1:
                    space = _a.sent();
                    return [4 /*yield*/, space.getEnvironment("master")];
                case 2:
                    env = _a.sent();
                    console.log("Starting Uploads");
                    _i = 0, pl_1 = pl;
                    _a.label = 3;
                case 3:
                    if (!(_i < pl_1.length)) return [3 /*break*/, 6];
                    post = pl_1[_i];
                    bPost = {
                        fields: {
                            postTitle: {
                                "en-US": post.frontmatter.title,
                            },
                            dateWritten: {
                                "en-US": post.frontmatter.date,
                            },
                            postBody: {
                                "en-US": {
                                    nodeType: "document",
                                    data: {},
                                    content: [
                                        {
                                            nodeType: "paragraph",
                                            content: [
                                                {
                                                    nodeType: "text",
                                                    marks: [],
                                                    value: post.rawMarkdownBody,
                                                    data: {},
                                                },
                                            ],
                                            data: {},
                                        },
                                    ],
                                },
                            },
                        },
                    };
                    return [4 /*yield*/, env.createEntry("blogPost", bPost)];
                case 4:
                    _a.sent();
                    console.log("Uploaded " + post.frontmatter.title);
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    console.log("Finished Uploads");
                    return [2 /*return*/];
            }
        });
    });
}
exports.addPostEntries = addPostEntries;
function parser(text) {
    console.log("Parsing Text: " + text.slice(0, 50) + "...");
    var bList = [];
    var lines = text.split("\n").filter(Boolean);
    var titleLineRegex = /\*\ (.*)\ by\ (.*)/m;
    var dateReg = /(\d{2})\/(\d{2})\/(\d{2,4})/m;
    var descRegex = /^\ {3}(.*)$/m;
    for (var i = 0; i < lines.length;) {
        var matches = lines[i].match(titleLineRegex);
        if (matches !== null && matches.length === 3) {
            var _1 = matches[0], title = matches[1], authorDate = matches[2];
            var book = {
                title: title,
                author: "",
                date: "",
                description: "",
            };
            var dateMatches = authorDate.match(dateReg);
            if (dateMatches !== null && dateMatches.length === 4) {
                var _2 = dateMatches[0], day = dateMatches[1], month = dateMatches[2], year = dateMatches[3];
                book.author = authorDate
                    .split("-")
                    .slice(0, -1)
                    .join("-")
                    .trim();
                book.date = (year.length === 2 ? "20" + year : year) + "-" + month + "-" + day;
            }
            else {
                book.author = authorDate.trim();
            }
            var start = ++i;
            // Get to end of description
            while (!titleLineRegex.test(lines[i]) && i < lines.length) {
                var m = lines[i].match(descRegex);
                if (m !== null) {
                    lines[i] = m[1];
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
function addEntries(bl) {
    return __awaiter(this, void 0, void 0, function () {
        var client, space, env, _i, bl_1, book, blItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Opening Connection...");
                    client = contentful.createClient({
                        accessToken: process.env.CONT_MANAGEMENT_TOKEN,
                    });
                    return [4 /*yield*/, client.getSpace("rbthbhshshw9")];
                case 1:
                    space = _a.sent();
                    return [4 /*yield*/, space.getEnvironment("master")];
                case 2:
                    env = _a.sent();
                    console.log("Starting Uploads");
                    _i = 0, bl_1 = bl;
                    _a.label = 3;
                case 3:
                    if (!(_i < bl_1.length)) return [3 /*break*/, 6];
                    book = bl_1[_i];
                    blItem = {
                        fields: {
                            bookTitle: {
                                "en-US": book.title,
                            },
                            bookAuthor: {
                                "en-US": book.author,
                            },
                            bookDescription: {
                                "en-US": {
                                    nodeType: "document",
                                    data: {},
                                    content: [
                                        {
                                            nodeType: "paragraph",
                                            content: [
                                                {
                                                    nodeType: "text",
                                                    marks: [],
                                                    value: book.description,
                                                    data: {},
                                                },
                                            ],
                                            data: {},
                                        },
                                    ],
                                },
                            },
                        },
                    };
                    if (book.date) {
                        // @ts-ignore
                        blItem.fields["dateFinished"] = { "en-US": book.date };
                    }
                    return [4 /*yield*/, env.createEntry("bookListItem", blItem)];
                case 4:
                    _a.sent();
                    console.log("Uploaded " + book.title);
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    console.log("Finished Uploads");
                    return [2 /*return*/];
            }
        });
    });
}
exports.addEntries = addEntries;
function readData(path) {
    var data = fs.readFileSync(path, "utf8");
    return data;
}
var text = readData("in_posts.json");
var pl = JSON.parse(text)["nodes"];
// console.log(pl);
// addPostEntries(pl);
