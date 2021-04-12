import { Badge, Card, Space, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import styles from '../BookShelfTable.less';
import ScrollContainer from 'react-indiana-drag-scroll';
import { connect, Dispatch } from 'umi';
import DrawerItem from './DrawerItem';

interface CustomBookShelfProps {
  dispatch: Dispatch;
  organizebook?: any;
  drawergrid?: any;
}
interface CustomBookShelfState {
  editFormVisible: boolean;
  column: string;
}
class CustomBookShelf extends React.Component<CustomBookShelfProps, CustomBookShelfState> {
  constructor(props: any) {
    super(props);
    this.state = {
      editFormVisible: false,
      column: '',
    };
  }

  renderGrid() {
    var { drawergrid } = this.props;

    var tmp: any = [];
    drawergrid.data.forEach((drawer: any, index: number) => {
      
      tmp.push(
        <Card.Grid
          style={{
            width: 'calc(33.33333% - 10px)',
            padding: '5px 15px',
            cursor: 'pointer',
            margin: '5px'
          }}
        >
          <div
            onClick={() => {
              this.props
                .dispatch({
                  type: 'drawergrid/onSelectDrawer',
                  payload: drawer,
                })
                .then(() => {
                  this.props.dispatch({
                    type: 'transferbook/fetchBooksInDrawer',
                    payload: {
                      bookGroupId: '',
                      drawerId: drawer.id,
                      isInDrawer: true,
                      pageNumber: 1,
                      filterName: '',
                      pagination: 1,
                    },
                  });
                });
            }}
          >
            <DrawerItem drawer={drawer} />
          </div>
        </Card.Grid>,
      );
    });
    return tmp;
  }

  render() {
    return (
      <Card style={{ border: 'none'}}>{this.renderGrid()}</Card>
    );
  }
}
export default connect((state) => ({ ...state }))(CustomBookShelf);
