import { Badge, Space, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import styles from '../BookShelfTable.less';
import ScrollContainer from 'react-indiana-drag-scroll';
import { connect, Dispatch } from 'umi';

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
        <Badge.Ribbon text={'15'}>
          <div
            key={drawer.key}
            className={`${styles.item} buttonActive`}
            onClick={(event) => {
              var buttons = document.getElementsByClassName('buttonActive');
              for (let i = 0; i < buttons.length; i++) {
                const element = buttons[i];
                element.classList.remove('active');
              }
              if (event.target.tagName.toLowerCase() === 'div') {
                event.target.classList.add('active');
              } else {
                event.target.parentNode.classList.add('active');
              }

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
            <Space direction='vertical'>
              <p style={{ margin: 0, fontSize: 20, color: '#1890FF' }}>ID: {drawer.id}</p>
              <p style={{ margin: 0, fontSize: 20, color: '#1890FF' }}>#{drawer.barcode}</p>
            </Space>
          </div>
        </Badge.Ribbon>,
      );
    });
    return tmp;
  }

  render() {
    var { organizebook } = this.props;
    var auto = '';
    for (
      let index = 0;
      index < organizebook.bookshelfLocate.colEnd - organizebook.bookshelfLocate.colStart + 1;
      index++
    ) {
      auto += 'auto ';
    }

    return (
      <>
        <ScrollContainer
          className={styles.bookShelfSection}
          vertical={true}
          horizontal={true}
          hideScrollbars={false}
        >
          <div className={styles.grid} style={{ gridTemplateColumns: auto }}>
            {this.renderGrid()}
          </div>
        </ScrollContainer>
      </>
    );
  }
}
export default connect((state) => ({ ...state }))(CustomBookShelf);
