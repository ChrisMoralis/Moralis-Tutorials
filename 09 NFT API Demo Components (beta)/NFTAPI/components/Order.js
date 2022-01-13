import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

export default function Order (props){
    return(
        <Select onChange={props.onOrderChange}>
            <Option key={'ascending'} value={'ascending'}>Ascending</Option>
            <Option key={'descending'} value={'descending'}>Descending</Option>
        </Select>
    )
}