"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
const custom_error_1 = require("./custom-error");
class ServerError extends custom_error_1.CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = 500;
    }
}
exports.ServerError = ServerError;
