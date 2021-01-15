import React from 'react';
import { connect, Dispatch } from 'umi';
import styles from '../BookShelfTable.less';

interface MinimapProps {
  dispatch: Dispatch;
  selectedPart: any;
  organizebook?: any;
}
interface MinimapState {
  column: string;
  width: number;
}
class Minimap extends React.Component<MinimapProps, MinimapState> {
  constructor(props: any) {
    super(props);
    this.state = {
      column: '',
      width: 0,
    };
  }

  renderGrid() {
    var { selectedPart, organizebook } = this.props;
    let width = 384 / organizebook.choiceBookShelf.col - 4;
    var tmp: any = [];
    var array2Dimesion: any = [];
    for (let i = 1; i < organizebook.choiceBookShelf.row + 1; i++) {
      for (let j = 1; j < organizebook.choiceBookShelf.col + 1; j++) {
        array2Dimesion.push([i, j]);
      }
    }
    array2Dimesion.reverse();
    for (let index = 0; index < array2Dimesion.length; index++) {
      let item = array2Dimesion[index];
      if (item[0] >= selectedPart.rowStart && item[0] <= selectedPart.rowEnd) {
        if (item[1] >= selectedPart.colStart && item[1] <= selectedPart.colEnd) {
          tmp.push(
            <div
              className={`items ${styles.minimapItem}`}
              style={{ backgroundColor: 'rgba(255, 0, 0, .8)', width: width }}
            ></div>
          );
        } else {
          tmp.push(<div className={`items ${styles.minimapItem}`} style={{ width: width }}></div>);
        }
      } else {
        tmp.push(<div className={`items ${styles.minimapItem}`} style={{ width: width }}></div>);
      }
    }

    return tmp;
  }

  render() {
    var { organizebook } = this.props;
    var auto = '';
    for (let index = 0; index < organizebook.choiceBookShelf.col; index++) {
      auto += 'auto ';
    }

    return (
      <div className={styles.minimap}>
        <div className={styles.minimapGrid} style={{ gridTemplateColumns: auto }}>
          {this.renderGrid()}
        </div>
      </div>
    );
  }
}
export default connect((state: any) => ({ ...state }))(Minimap);
