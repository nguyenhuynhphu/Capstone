import { Badge } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import styles from '../BookShelfTable.less';
import ScrollContainer from 'react-indiana-drag-scroll';

interface CustomBookShelfProps {
  data: any;
  row: number;
  column: number;
  selectedPart: any;
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

  fetchData() {
    var { selectedPart } = this.props;
    var tmp: any = [];
    var array2Dimesion: any = [];
    for (let i = 1; i < this.props.row + 1; i++) {
      for (let j = 1; j < this.props.column + 1; j++) {
        array2Dimesion.push([i, j]);
      }
    }
    for (let index = 0; index < array2Dimesion.length; index++) {
      let item = array2Dimesion[index];
      if (item[0] >= selectedPart.rowStart && item[0] <= selectedPart.rowEnd) {
        if (item[1] >= selectedPart.colStart && item[1] <= selectedPart.colEnd) {
          tmp.push(
            <Badge.Ribbon text={'15'}>
              <div className={styles.item}>
                <Title level={1} style={{ margin: 0, fontSize: 34 }}>
                  {index + 1}
                </Title>
              </div>
            </Badge.Ribbon>,
          );
        }
      }
    }

    return tmp;
  }

  render() {
    var { selectedPart } = this.props;
    var auto = '';
    for (let index = 0; index < selectedPart.colEnd - selectedPart.colStart + 1; index++) {
      auto += 'auto ';
    }
    return (
      <ScrollContainer
        className={styles.bookShelfSection}
        vertical={true}
        horizontal={true}
        hideScrollbars={false}
      >
        <div className={styles.grid} style={{ gridTemplateColumns: auto }}>
          {this.fetchData()}
        </div>
      </ScrollContainer>
    );
  }
}
export default CustomBookShelf;
