"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthenticated = void 0;
const custom_error_1 = require("./custom-error");
class Unauthenticated extends custom_error_1.CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}
exports.Unauthenticated = Unauthenticated;
