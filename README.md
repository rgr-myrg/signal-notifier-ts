[![Build Status](https://travis-ci.org/rgr-myrg/signal-notifier-ts.svg?branch=master)](https://travis-ci.org/rgr-myrg/signal-notifier-ts) [![npm version](https://badge.fury.io/js/signal-notifier-ts.svg)](https://badge.fury.io/js/signal--notifier-ts)

# TypeScript Signal Notifier

Notifier and [Signal Pattern](https://en.wikipedia.org/wiki/Signals_and_slots) pattern written in Typescript.

This module **signal-notifier-ts** uses typed [Signals](https://www.npmjs.com/package/signal-ts), also written in TypeScript.

# Installation

```
npm install signal-notifier-ts
```

# Usage

### Creating a Notifier

Create an instance of the Notifier.
```typescript
import {Signal, Notifier} from "signal-notifier-ts";

let notifier: Notifier = new Notifier();
```
Create Signal(s) with the specified type, i.e, _string_, _number_, etc.

```typescript
let onCompleted: Signal<number> = new Signal();
```

### Add function callback

Register a callback with **add()**.

```typescript
onCompleted.add((n: number) => {
     console.log("got a number", n);
});
```

### Emitting signals with the Notifier

The Notifier allows for controling signals flow through a queue of notifications.

You can call **notifier.pause()** to pause emitting notifications or **notifier.resume()** to process the queue of notifications immediately. For example, you can pause() while waiting for an operation to complete and resume emitting from the queue with resume().

To emit a signal invoke the notify() method and emit data to the signal:
```typescript
notifier.notify(onCompleted).emit(299792458);
```

# Usage Sample
### Automated Teller Machine
```typescript
class ATMProcessor {
     constructor(atm: ATM) {
         // Subscribe to Signals
          atm.onPinEntered.add((pin: number) => {
               console.log('pin entered:', pin);
          });
          atm.onWithdrawAmount.add((amount: number) => {
               console.log('withdraw amount:', amount);
          });
          atm.onBalanceRequested.add((pin: number) => {
               console.log('balance requested w/pin:', pin);
          });
     }
}

// Extend the Notifier and create signals
class ATM extends Notifier {
     onPinEntered: Signal<number> = new Signal();
     onWithdrawAmount: Signal<number> = new Signal();
     onBalanceRequested: Signal<number> = new Signal();

     constructor() {
          super();
          new ATMProcessor(this);
     }
     // Notify and Emit signals
     enterPin(pin: number): void {
          this.notify(this.onPinEntered).emit(pin);
     }
     withdrawFunds(amount: number): void {
          this.notify(this.onWithdrawAmount).emit(amount);
     }
     balanceRequest(pin: number): void {
          this.notify(this.onBalanceRequested).emit(pin);
     }
     // Pause notifications
     connectionDropped(): void {
         console.log('ATM disconnected');
          this.pause();
     }
     // Resume notifications
     connectionOk(): void {
          console.log('ATM online');
          this.resume();
     }
}
```
### Use Case
```typescript
let atm = new ATM();
// User authorized by entering pin
atm.enterPin(555);

// Connection drops
atm.connectionDropped();

// User requests withdrawal
atm.withdrawFunds(100);

// User requests balance
atm.balanceRequest(555);

// Connection is back online
atm.connectionOk();
```

### Expected Output

```typescript
pin entered: 555
ATM disconnected
ATM online
withdraw amount: 100
balance requested w/pin: 555
```
# License

[MIT License](https://raw.githubusercontent.com/rgr-myrg/signal-notifier-slot/master/LICENSE)

