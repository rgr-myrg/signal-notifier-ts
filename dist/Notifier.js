"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Notification_1 = require("./Notification");
var Notifier = /** @class */ (function () {
    function Notifier() {
        this.notifications = [];
        this.shouldNotify = true;
    }
    Notifier.prototype.resume = function () {
        this.shouldNotify = true;
        this.postNotifications();
    };
    Notifier.prototype.pause = function () {
        this.shouldNotify = false;
    };
    Notifier.prototype.notify = function (signal) {
        return new Notification_1.Notification(this, signal);
    };
    Notifier.prototype.schedule = function (notification) {
        this.notifications.push(notification);
        if (this.shouldNotify) {
            this.postNotifications();
        }
    };
    Notifier.prototype.postNotifications = function () {
        if (!this.shouldNotify) {
            return;
        }
        for (var i = this.notifications.length; i--;) {
            // non-null assertion operator postfix.
            this.notifications.shift().post();
        }
    };
    return Notifier;
}());
exports.Notifier = Notifier;
//# sourceMappingURL=Notifier.js.map