import { HubConnectionBuilder } from '@microsoft/signalr';
import { connect } from 'umi';

export const getWishlist = () => {
  const connection = new HubConnectionBuilder()
    .withUrl('http://171.244.5.88:90/message')
    .withAutomaticReconnect()
    .build();

  if (connection) {
    return connection;
  }
};
