"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const custom_error_1 = require("./custom-error");
class NotFound extends custom_error_1.CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}
exports.NotFound = NotFound;
