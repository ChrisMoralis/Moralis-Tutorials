import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd';
import Chain from "./components/Chain.js";
import Format from "./components/Format.js";
import APITitle from "./components/APITitle.js";
import ResultsTable from "./components/ResultsTable.js";

const Moralis = require("moralis");

export default class GetNFTMetadata extends Component {
  constructor() {
    super();
    this.state = {
      query:{
        chain: "eth",
        address: "",
        format: "",
        offset: "",
        limit: 9,
      },
      nftData: [],
      apiTitle: "GetNFTMetadata",
      apiDescription: <>
          <p>CONTRACT SPECIFIC METADATA</p>
          <p>NFT API gets the contract level metadata (name, symbol, base token uri) for the given contract.</p>
          <p style={{margin:"10px 0px"}}><span style={{fontWeight:600}}>Address (required)</span>: A contract address (i.e. 0x1a2b3x...).</p>
      </>,   
        columns: [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Symbol',
                dataIndex: 'symbol',
                key: 'symbol',
                width: 130,
            },
            {
                title: 'Token Address',
                dataIndex: 'token_address',
                key: 'token_address',
            },
            {
                title: 'Contract Type',
                dataIndex: 'contract_type',
                key: 'contract_type',
                width: 150,
            },
            {
                title: 'Synced At',
                dataIndex: 'synced_at',
                key: 'synced_at',
            },
            ],   
    }
  }
  
  submitQuery = async (state) => {
    this.setState({nftData: await Moralis.Web3API.token.getNFTMetadata(state)})
    console.log(this.state)
  }
  onChainChange = (e) => {
    this.setState({query:{...this.state.query, chain: e}})
  }
  onAddressChange = (e) => {
    this.setState({query:{...this.state.query, address: e.target.value}})
  }
  onOffsetChange = (e) => {
    this.setState({query:{...this.state.query, offset: e.target.value}})
  }
  onLimitChange = (e) => {
    this.setState({query:{...this.state.query, limit: e.target.value}})
    console.log('limit changed')
  }
  onFormatChange = (e) => {
    this.setState({query:{...this.state.query, format: e}})
  }

  
  render() {

    return (
      <div style={{width:"95%", maxWidth:"1080px", margin:"auto"}}>

      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        layout="horizontal"
        style={{width:"80%", maxWidth: "500px", margin:"auto"}}
      >
        <APITitle title={this.state.apiTitle} description={this.state.apiDescription}/>
        <Form.Item label="Address *" >
            <Input value={this.state.query.address} onChange={this.onAddressChange}/>
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
        <Form.Item wrapperCol={{offset: 4, span:20}}>
          <Button type="primary" htmlType="submit" style={{width:"100%"}} onClick={()=>this.submitQuery(this.state.query)}>Search {this.state.apiTitle}</Button>
        </Form.Item>
      </Form>
        <ResultsTable data={this.state.nftData} columns={this.state.columns} api={this.state.apiTitle} />
      </div>
    )
  }
}
