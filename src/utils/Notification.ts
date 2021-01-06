import { notification } from 'antd';

const successNotification = (title: string, message: string, type: string) => {
  notification[type]({
    message: title,
    description: message,
  });
};

export default successNotification;
