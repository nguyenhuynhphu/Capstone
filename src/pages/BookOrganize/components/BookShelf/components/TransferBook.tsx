import { Transfer, Button } from 'antd';
import React from 'react';
import styles from '../BookShelfTable.less';
class TransferBook extends React.Component {
  state = {
    mockData: [],
    targetKeys: [],
  };

  componentDidMount() {
    this.getMock();
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 200; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  };

  handleChange = (targetKeys: any) => {
    this.setState({ targetKeys });
  };


  render() {
    return (
      <Transfer
        className={styles.transferBook}
        dataSource={this.state.mockData}
        showSearch
        titles={['Storage', 'Drawer']}
        listStyle={{
          width: 250,
          height: 300,
        }}
        operations={['Add To Drawer', 'Remove from Drawer']}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        render={(item: any) => `${item.title}-${item.description}`}
        pagination
      />
    );
  }
}

export default TransferBook;
