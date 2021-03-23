import { UserOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';

interface TableHeaderProps {
  title: String;
  description: String;
}

const TableHeader = (props: TableHeaderProps) => (
  <>
    <p style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 0 }}>{props.title}</p>
    <p style={{ fontSize: 14, fontStyle: 'italic', color: 'gray', marginBottom: 0 }}>
      {props.description}
    </p>
  </>
);

export default TableHeader;
