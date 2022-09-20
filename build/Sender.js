"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var venom_bot_1 = require("venom-bot");
var Sender = /** @class */ (function () {
    function Sender() {
    }
    Sender.prototype.initialize = function (sessao) {
        var _this = this;
        var qr = function (asciiQR) { };
        var status = function (statusSession) {
        };
        var start = function (client) {
            _this.client = client;
        };
        (0, venom_bot_1.create)(sessao, qr, status)
            .then(function (client) { return start(client); })
            .catch(function (error) { return console.error(error); });
    };
    return Sender;
}());
exports.default = Sender;
