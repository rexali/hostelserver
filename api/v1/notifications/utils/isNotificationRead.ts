import { NotificationType } from "../types/types";

export function isNotificationsRead(notificatons: Array<NotificationType>) {
    if (notificatons.filter((notification) => notification.read === true).length === 0) {
        return true;
    } else {
        return false;
    }
}