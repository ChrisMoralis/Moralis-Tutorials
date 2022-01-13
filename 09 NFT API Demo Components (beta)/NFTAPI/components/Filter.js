import React  from 'react';
import { Select } from 'antd';
const { Option } = Select;

export default function Filter (props){
        return(
            <Select onChange={props.onFilterChange}>
                <Option key={'name'} value={'name'}>Name</Option>
                <Option key={'description'} value={'description'}>Description</Option>
                <Option key={'attributes'} value={'attributes'}>Attributes</Option>
                <Option key={'global'} value={'global'}>Global</Option>
                <Option key={'name,description'} value={'name,description'}>Name & Description</Option>
                <Option key={'name,attributes'} value={'name,attributes'}>Name & Attributes</Option>
                <Option key={'description,attributes'} value={'description,attributes'}>Description & Attributes</Option>
                <Option key={'name,description,attributes'} value={'name,description,attributes'}>Name & Description & Attributes</Option>
            </Select>
        )
}