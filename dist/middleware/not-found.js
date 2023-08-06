"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundMiddleware = void 0;
const NotFoundMiddleware = (req, res) => {
    return res.status(404).send("not found");
};
exports.NotFoundMiddleware = NotFoundMiddleware;
