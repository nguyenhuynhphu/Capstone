import { Alert, Col, List, Row, Space, Table } from 'antd';
import React from 'react';
import ReactPlayer from 'react-player';
import BookItem from './BookItem';

interface DrawerItemProps {
  drawer: any;
}

class DrawerItem extends React.Component<DrawerItemProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { drawer } = this.props;
    return (
      <>
      <Alert message={`Drawer ${drawer.drawerName}- Barcode: ${drawer.drawerBarcode}`} type="info" showIcon />
        <List
          dataSource={drawer.books}
          size="small"
          renderItem={(item) => (
            <List.Item>
              <BookItem book={item} />
            </List.Item>
          )}
        />
      </>
    );
  }
}
export default DrawerItem;
