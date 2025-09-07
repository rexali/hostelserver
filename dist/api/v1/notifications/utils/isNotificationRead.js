"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotificationsRead = isNotificationsRead;
function isNotificationsRead(notificatons) {
    if (notificatons.filter((notification) => notification.read === true).length === 0) {
        return true;
    }
    else {
        return false;
    }
}
