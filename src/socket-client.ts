import { Manager, Socket } from 'socket.io-client';

let socket: Socket;

export const connectToServer = (jwtToken: string) => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            authentication: `Bearer ${jwtToken}`
        }
    });

    socket?.removeAllListeners();
    socket = manager.socket('/');

    addListeners();
};

const addListeners = () => {
    const severStatusLabel =
        document.querySelector<HTMLSpanElement>('#server-status')!;
    const clientsUl = document.querySelector<HTMLUListElement>('#clients-ul')!;
    const messageForm =
        document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput =
        document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl =
        document.querySelector<HTMLUListElement>('#messages-ul')!;

    socket.on('connect', () => {
        severStatusLabel.innerHTML = 'online';
    });

    socket.on('clients-updated', (clients: string[]) => {
        clientsUl.innerHTML = clients
            .map(client => `<li>${client}</li>`)
            .join('');
    });

    socket.on(
        'message-from-server',
        (payload: { fullName: string; message: string }) => {
            messagesUl.innerHTML += `<li>${payload.fullName}: ${payload.message}</li>`;
        }
    );

    socket.on('disconnect', () => {
        severStatusLabel.innerHTML = 'offline';
    });

    messageForm.addEventListener('submit', event => {
        event.preventDefault();
        if (messageInput.value.trim().length <= 0) return;
        socket.emit('message-form-client', { message: messageInput.value });
        messageInput.value = '';
    });
};
