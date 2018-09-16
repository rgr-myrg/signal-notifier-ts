import {Signal} from 'signal-ts';
import {INotifier} from './INotifier';

export class Notification {
    public data: any;

    constructor(public notifier: INotifier, public signal: Signal<any>) {}

    public emit(data?: any):void {
        this.data = data || null;
        this.notifier.schedule(this);
    }

    public post(): void {
        this.signal.emit(this.data);
    }
}
