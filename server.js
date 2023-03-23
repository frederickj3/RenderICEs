"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var fs_1 = __importDefault(require("fs"));
var mime_types_1 = __importDefault(require("mime-types"));
var lookup = mime_types_1.default.lookup;
var port = process.env.PORT || 3000;
var server = http_1.default.createServer(function (req, res) {
    var path = req.url;
    console.log(__dirname);
    console.log(path);
    if (path === "/" || path === "/home") {
        path = "/index.html";
    }
    var mime_type = lookup(path.substring(1));
    console.log("mime-types: " + mime_type);
    fs_1.default.readFile(__dirname + path, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end("Error 404 - File Not Found" + err.message);
            return;
        }
        res.setHeader("x-Content-Type-Options", "nosniff");
        res.writeHead(200, { 'Content-Type': mime_type });
        res.end(data);
    });
});
server.listen(port, function () {
    console.log("Server running at:".concat(port, "/"));
});
//# sourceMappingURL=server.js.map