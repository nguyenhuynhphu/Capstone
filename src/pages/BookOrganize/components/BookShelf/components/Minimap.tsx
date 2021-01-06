import React from 'react';
import styles from '../BookShelfTable.less';

interface MinimapProps {
  data: any;
  row: number;
  column: number;
  selectedPart: any;
}
interface MinimapState {
  column: string;
  width: number
}
class Minimap extends React.Component<MinimapProps, MinimapState> {
  constructor(props: any) {
    super(props);
    this.state = {
      column: '',
      width: 0
    };
  }

  componentDidMount() {
    var auto = '';
    for (let index = 0; index < this.props.column; index++) {
      auto += 'auto ';
    }
    this.setState({
      column: auto,
    });
    let parentCol: any = document.getElementsByClassName('calcCol')[0];
    let width = parentCol.offsetWidth;

    width = width / this.props.column - 4;
    this.setState({
      width: width
    })
  }


  renderGrid() {
    var { selectedPart } = this.props;
    var tmp: any = [];
    var array2Dimesion: any = [];
    for (let i = 1; i < this.props.row + 1; i++) {
      for (let j = 1; j < this.props.column + 1; j++) {
        array2Dimesion.push([i, j]);
      }
    }
    array2Dimesion.reverse();
    for (let index = 0; index < array2Dimesion.length; index++) {
      let item = array2Dimesion[index];
      if(item[0] >= selectedPart.rowStart && item[0] <= selectedPart.rowEnd){
        if(item[1] >= selectedPart.colStart && item[1] <= selectedPart.colEnd){
            tmp.push(<div className={styles.minimapItem} style={{backgroundColor: 'rgba(255, 0, 0, .8)', width: this.state.width}}></div>);
        }else{
            tmp.push(<div className={styles.minimapItem} style={{ width: this.state.width}}></div>);
        }
      }else{
        tmp.push(<div className={styles.minimapItem} style={{width: this.state.width}}></div>);
      }

    }

    return tmp;
  }

  render() {
    return (
      <div className={styles.minimap}>
        <div className={styles.minimapGrid} style={{ gridTemplateColumns: this.state.column }}>
          {this.renderGrid()}
        </div>
      </div>
    );
  }
}
export default Minimap;
