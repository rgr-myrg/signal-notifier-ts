import {Notifier} from '../../src/ts/Notifier';
import {Notification} from '../../src/ts/Notification';
import {Signal} from 'signal-ts';

describe('Notifier Test', () => {
    class TestReceiver {
        onReceive(x: number) {}
    }

    let notifier: Notifier;
    let receiver: TestReceiver;
    let signal: Signal<number>;

    beforeEach(() => {
        notifier = new Notifier();
        receiver = new TestReceiver();
        signal = new Signal();

        signal.add((x: number) => receiver.onReceive(x));

        spyOn(receiver, 'onReceive').and.callThrough();
        spyOn(notifier, 'postNotifications').and.callThrough();
    });

    it('pause() should pause notifications', () => {
        notifier.pause();

        expect(notifier.shouldNotify).toBeFalsy();
        expect(notifier.postNotifications).toHaveBeenCalledTimes(0);
    });

    it('resume() should post notifications', () => {
        notifier.pause();

        notifier.notify(signal).emit(5);
        notifier.resume();

        expect(notifier.shouldNotify).toBeTruthy();
        expect(notifier.postNotifications).toHaveBeenCalled();
        expect(receiver.onReceive).toHaveBeenCalled();
    });

    it('notify() should create the notification', () => {
        let notification: Notification = notifier.notify(signal);
        expect(notification.signal).toEqual(signal);
    });

    it('schedule() should queue the notification', () => {
        let notification: Notification = new Notification(notifier, signal);
        let count: number = notifier.notifications.length;

        notifier.pause();
        notifier.schedule(notification);

        expect(notifier.notifications.length).toEqual(count + 1);
    });

    it('postNotifications() should post and flush the notifications queue', () => {
        let notification: Notification = new Notification(notifier, signal);

        notifier.shouldNotify = false;

        notifier.schedule(notification);
        notifier.schedule(notification);
        notifier.schedule(notification);

        let count: number = notifier.notifications.length;

        notifier.shouldNotify = true;
        notifier.postNotifications();

        expect(count).toEqual(3); // test original count
        expect(notifier.notifications.length).toEqual(0);
        expect(receiver.onReceive).toHaveBeenCalledTimes(count);
    });
});
