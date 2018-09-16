import {Signal} from 'signal-ts';
import {INotifier} from './INotifier';
import {Notification} from './Notification';

export class Notifier implements INotifier {
    public notifications: Notification[] = [];
    public shouldNotify: boolean = true;

    public resume(): void {
        this.shouldNotify = true;
        this.postNotifications();
    }

    public pause(): void {
        this.shouldNotify = false;
    }

    public notify(signal: Signal<any>): Notification {
        return new Notification(this, signal);
    }

    public schedule(notification: Notification): void {
        this.notifications.push(notification);

        if (this.shouldNotify) {
            this.postNotifications();
        }
    }

    public postNotifications(): void {
        if (!this.shouldNotify) {
            return;
        }

		for (let i = this.notifications.length; i--;) {
			// non-null assertion operator postfix.
			this.notifications.shift()!.post();
		}
	}
}
