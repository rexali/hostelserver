"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = void 0;
exports.permissions = {
    user: {
        read: true,
        write: true,
        delete: false,
    },
    admin: {
        read: true,
        write: true,
        delete: true,
    },
    guest: {
        read: true,
        write: false,
        delete: false,
    }
};
