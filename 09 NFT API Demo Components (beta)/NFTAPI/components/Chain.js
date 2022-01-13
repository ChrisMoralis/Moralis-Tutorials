import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

export default function Chain (props){
        return(
            <Select onChange={props.onChainChange} style={{width:"100%"}}>
                <Option key={'eth'} value={'eth'}>Ethereum</Option>
                <Option key={'ropsten'} value={'ropsten'}>Ropsten</Option>
                <Option key={'rinkeby'} value={'rinkeby'}>Rinkeby</Option>
                <Option key={'goerli'} value={'goerli'}>Goerli</Option>
                <Option key={'kovan'} value={'kovan'}>Kovan</Option>
                <Option key={'bsc'} value={'bsc'}>BSC</Option>
                <Option key={'bsc testnet'} value={'bsc testnet'}>BSCtest</Option>
                <Option key={'matic'} value={'matic'}>Polygon</Option>
                <Option key={'mumbai'} value={'mumbai'}>Mumbai</Option>
                <Option key={'avalanche'} value={'avalanche'}>Avalanche</Option>
                <Option key={'avalanche testnet'} value={'avalanche testnet'}>AvalancheTest</Option>
                <Option key={'fantom'} value={'fantom'}>Fantom</Option>
                <Option key={'ganache'} value={'ganache'}>LocalDevChain</Option>
            </Select>
        )
}