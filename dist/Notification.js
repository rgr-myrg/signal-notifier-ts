"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Notification = /** @class */ (function () {
    function Notification(notifier, signal) {
        this.notifier = notifier;
        this.signal = signal;
    }
    Notification.prototype.emit = function (data) {
        this.data = data || null;
        this.notifier.schedule(this);
    };
    Notification.prototype.post = function () {
        this.signal.emit(this.data);
    };
    return Notification;
}());
exports.Notification = Notification;
//# sourceMappingURL=Notification.js.map