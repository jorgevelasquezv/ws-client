import './style.css';
import { connectToServer } from './socket-client.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>WebSocket - Client</h2>

    <input id="jwtToken" type="text" placeholder="JWT Token" />
    <button id="connect-button">Connect</button>
    
    <br />
    <span id="server-status">offline</span>
    
    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input type="text" id="message-input" placeholder="message" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>

  </div>
`;

const btnConnect =
    document.querySelector<HTMLButtonElement>('#connect-button')!;

const jwtToken = document.querySelector<HTMLInputElement>('#jwtToken')!;

btnConnect.addEventListener('click', () => {
    if (jwtToken.value.trim().length <= 0)
        return alert('Please enter a valid JWT token');
    connectToServer(jwtToken.value.trim());
});
