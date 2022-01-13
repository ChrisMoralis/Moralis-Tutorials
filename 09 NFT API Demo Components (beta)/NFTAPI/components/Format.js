import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

export default function Format (props){
        return(
            <Select onChange={props.onFormatChange}>
                <Option key={'decimal'} value={'decimal'}>Decimal</Option>
                <Option key={'hex'} value={'hex'}>Hex</Option>
            </Select>
        )
}