import { HubConnectionBuilder } from '@microsoft/signalr';

export const getWishlist = () => {
  const connection = new HubConnectionBuilder()
    .withUrl('https://localhost:5001/hubs/chat')
    .withAutomaticReconnect()
    .build();
  if (connection) {
    connection
      .start()
      .then((result) => {
        console.log('Connected!');
        connection.on('ReceiveMessage', (message) => {
          return message;
        });
      })
      .catch((e) => console.log('Signalr >> Connection failed: ', e));
  }
};
