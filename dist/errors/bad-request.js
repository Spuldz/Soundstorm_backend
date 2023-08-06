"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const custom_error_1 = require("./custom-error");
class BadRequest extends custom_error_1.CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}
exports.BadRequest = BadRequest;
