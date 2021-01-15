import { notification } from 'antd';

const sendNotification = (title: string, message: string, type: string) => {
  notification[type]({
    message: title,
    description: message,
  });
};

export default sendNotification;
