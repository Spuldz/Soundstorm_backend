"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const getUser = (req, res) => {
    const user = req.user;
    res.json({ user });
};
exports.getUser = getUser;
