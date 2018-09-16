import { Signal } from 'signal-ts';
import { INotifier } from './INotifier';
export declare class Notification {
    notifier: INotifier;
    signal: Signal<any>;
    data: any;
    constructor(notifier: INotifier, signal: Signal<any>);
    emit(data?: any): void;
    post(): void;
}
