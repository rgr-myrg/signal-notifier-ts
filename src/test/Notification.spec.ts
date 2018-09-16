import {Notifier} from '../../src/ts/Notifier';
import {Notification} from '../../src/ts/Notification';
import {Signal} from 'signal-ts';

describe('Notification Test', () => {
    class TestReceiver {
        onReceive(x: number) {}
    }

    let notifier: Notifier;
    let receiver: TestReceiver;
    let signal: Signal<number>;
    let notification: Notification;

    beforeEach(() => {
        notifier = new Notifier();
        receiver = new TestReceiver();
        signal = new Signal<number>();
        notification = new Notification(notifier, signal);

        spyOn(notifier, 'schedule').and.callThrough();
        spyOn(receiver, 'onReceive').and.callThrough();
        spyOn(signal, 'emit').and.callThrough();

        // Pause receiving notifications
        notifier.pause();

        signal.add((x: number) => receiver.onReceive(x));
    });

    it('Notification should assign the notifier', () => {
        expect(notification.notifier).toEqual(notifier);
    });

    it('Notification should assign the signal', () => {
        expect(notification.signal).toEqual(signal);
    });

    it('emit() should schedule the notification', () => {
        let count: number = notifier.notifications.length;
        notification.emit(5);

        expect(notifier.schedule).toHaveBeenCalledWith(notification);
        expect(notifier.notifications.length).toEqual(count + 1);
    });

    it('post() should emit the signal', () => {
        notification.emit(5);
        notification.post();

        expect(signal.emit).toHaveBeenCalledWith(5);
        expect(receiver.onReceive).toHaveBeenCalledWith(5);
    });
});
