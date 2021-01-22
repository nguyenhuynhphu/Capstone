import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';

export const getWishlist = () => {
  const connection = new HubConnectionBuilder()
    .withUrl('http://171.244.5.88:90/home/index')
    .withAutomaticReconnect()
    .build();
  if (connection) {
    connection
      .start()
      .then((result) => {
        console.log('Connected!');
        connection.on('4444', (message) => {
          return message;
        });
      })
      .catch((e) => console.log('Signalr >> Connection failed: ', e));
  }
};
