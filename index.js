"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
console.log(Bun.argv);
var values = (0, util_1.parseArgs)({
    args: Bun.argv,
    options: {
        file: {
            type: "string",
            short: "f",
        },
    },
    strict: true,
    allowPositionals: true,
}).values;

var base = (_a = values.file) === null || _a === void 0 ? void 0 : _a.slice(0, (_b = values.file) === null || _b === void 0 ? void 0 : _b.lastIndexOf("/"));

var server = Bun.serve({
    port: 3000,
    fetch: function (req) {
        var path = new URL(req.url).pathname;
        return new Response(path === "/" ? Bun.file(values.file) : Bun.file(base + path));
    },
    error: function (request) {
        console.log(request);
        return new Response("Cought Error: " + request);
    },
});
console.log("Listening on http://localhost:".concat(server.port, " ..."));
