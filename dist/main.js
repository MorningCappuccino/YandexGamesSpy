"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var content_1 = require("./content");
var greet_1 = require("./greet");
function hello(compiler) {
    console.log("Hello from ".concat(compiler));
}
hello("TypeScript");
console.log((0, greet_1.sayHello)("TypeScript"));
(0, content_1.YandexGamesSpy)();
