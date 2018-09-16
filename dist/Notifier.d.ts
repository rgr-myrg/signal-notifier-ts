import { Signal } from 'signal-ts';
import { INotifier } from './INotifier';
import { Notification } from './Notification';
export declare class Notifier implements INotifier {
    notifications: Notification[];
    shouldNotify: boolean;
    resume(): void;
    pause(): void;
    notify(signal: Signal<any>): Notification;
    schedule(notification: Notification): void;
    postNotifications(): void;
}
