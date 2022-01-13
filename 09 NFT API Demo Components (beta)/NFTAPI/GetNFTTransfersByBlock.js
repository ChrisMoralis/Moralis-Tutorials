import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd';
import Chain from "./components/Chain.js";
import Format from "./components/Format.js";
import ResultsTable from "./components/ResultsTable.js";
import APITitle from "./components/APITitle.js";

const Moralis = require("moralis");

export default class GetNFTTransfersByBlock extends Component {
  constructor() {
    super();
    this.state = {
      query:{
        address: "",
        token_address: "",
        chain: "eth",
        format: "",
        offset: "",
        limit: "9",
      },
      nftData: [],
      apiTitle: "GetNFTTransfersByBlock",
      apiDescription: "NFT API gets NFT transfers by block number or block hash",
      columns: [
        {
            title: 'From',
            dataIndex: 'from_address',
            key: 'from_address',
            width:150,
        },
        {
            title: 'To',
            dataIndex: 'to_address',
            key: 'to_address',
            width:150,
        },
        {
            title: 'Block Number',
            dataIndex: 'block_number',
            key: 'block_number',
            width:130,
        },
        {
            title: 'Token Address',
            dataIndex: 'token_address',
            key: 'token_address',
        },
        {
            title: 'TX Hash',
            dataIndex: 'transaction_hash',
            key: 'transaction_hash',
            ellipsis: true,
        },
      ],
    }
  }
  
  submitQuery = async (state) => {
    this.setState({nftData: await Moralis.Web3API.native.getNFTTransfersByBlock(state)})
  }
  onBlockOrHashChange = (e) => {
    this.setState({query:{...this.state.query, block_number_or_hash: e.target.value}})
  }
  onChainChange = (e) => {
    this.setState({query:{...this.state.query, chain: e}})
  }
  onFormatChange = (e) => {
    this.setState({query:{...this.state.query, format: e}})
  }
  onOffsetChange = (e) => {
    this.setState({query:{...this.state.query, offset: e.target.value}})
  }
  onLimitChange = (e) => {
    this.setState({query:{...this.state.query, limit: e.target.value}})
  }

  render() {
    return (
      <div style={{width:"95%", maxWidth:"1800px", margin:"auto"}}>
        <div style={{marginBottom: 20, textAlign:"center"}}>
        </div>
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          layout="horizontal"
          style={{width:"95%", maxWidth: "500px", margin:"auto"}}
        >
          <APITitle title={this.state.apiTitle} description={this.state.apiDescription}/>
          <Form.Item label="Block Number or Hash *" >
            <Input onChange={this.onBlockOrHashChange}/>
          </Form.Item>
          <Form.Item label="Chain" >
            <Chain onChainChange={this.onChainChange}/>
          </Form.Item>
          <Form.Item label="Format">
            <Format onFormatChange={this.onFormatChange}/>
          </Form.Item>
          <Form.Item label="Offset">
            <Input onChange={this.onOffsetChange}/>
          </Form.Item>
          <Form.Item label="Limit">
            <Input onChange={this.onLimitChange}/>
          </Form.Item>
          <Form.Item wrapperCol={{offset: 8, span:16}}>
            <Button type="primary" htmlType="submit" style={{width:"100%"}} onClick={()=>this.submitQuery(this.state.query)}>Search {this.state.apiTitle}</Button>
          </Form.Item>
          
        </Form>
        <div style={{marginTop:25}}>
          <ResultsTable data={this.state.nftData} columns={this.state.columns} api={this.state.apiTitle}/>
        </div>
      </div>
    )
  }
}
