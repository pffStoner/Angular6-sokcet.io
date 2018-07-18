import * as io from 'socket.io-client';
import {Subject, Observable} from 'rxjs';

export class ChatService {

    private url = 'http://localhost:5000/';
    private socket;

    test(params) {
     console.log('params' + params);
    }

    sendMessage(message) {
        this.socket.emit('add-message', message);
    }

    getMessages() {
        const observable = new Observable(observer => {
            this.socket = io(this.url);
            this.socket.on('message', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconect();
            };
        });

        return observable;
    }

}
