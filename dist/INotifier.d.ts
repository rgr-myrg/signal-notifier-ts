import { Notification } from './Notification';
export interface INotifier {
    schedule(notification: Notification): void;
}
