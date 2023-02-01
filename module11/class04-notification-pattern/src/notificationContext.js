export default class NotificationContext {
  constructor() {
    this.notifications = [];
  }

  hasNotifications() {
    return this.notifications.length > 0;
  }

  addNotification(notification) {
    return this.notifications.push(notification);
  }
}
