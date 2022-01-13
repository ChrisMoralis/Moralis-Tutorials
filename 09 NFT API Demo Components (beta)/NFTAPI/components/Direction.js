import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

export default function Direction (props){
    return(
        <Select onChange={props.onDirectionChange}>
            <Option key={'both'} value={'both'}>Both</Option>
            <Option key={'to'} value={'to'}>To</Option>
            <Option key={'from'} value={'from'}>From</Option>
        </Select>
    )
}