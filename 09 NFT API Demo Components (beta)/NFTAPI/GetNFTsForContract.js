import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd';
import Chain from "./components/Chain.js";
import Format from "./components/Format.js";
import NFTCards from "./components/NFTCards.js";
import APITitle from "./components/APITitle.js";

const Moralis = require("moralis");

export default class GetNFTsForContract extends Component {
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
      apiTitle: "GetNFTsForContract",
      apiMethod: "await Moralis.Web3API.token.searchNFTs(options);",
      apiDescription: <>
          <p>NFT API gets an object with the NFT count for the specified contract and an NFT array belonging to the given address for the specified contract.</p>
          <p style={{margin:"10px 0px"}}><span style={{fontWeight:600}}>Address (required)</span>: The owner of a given token (i.e. 0x1a2b3x...).</p>
          <p style={{margin:"10px 0px"}}><span style={{fontWeight:600}}>Token Address (required)</span>: Address of the contract.</p>
          </>,
    }
  }
  
  submitQuery = async (state) => {
    this.setState({nftData: await Moralis.Web3API.account.getNFTsForContract(state)})
  }
  onAddressChange = (e) => {
    this.setState({query:{...this.state.query, address: e.target.value}})
  }
  onChainChange = (e) => {
    this.setState({query:{...this.state.query, chain: e}})
  }
  onTokenAddressChange = (e) => {
    this.setState({query:{...this.state.query, token_address: e.target.value}})
  }
  onFormatChange = (e) => {
    this.setState({query:{...this.state.query, format: e}})
  }

  onOffsetChange = (e) => {
    this.setState({query:{...this.state.query, offset: e.target.value}})
  }
  onLimitChange = (e) => {
    this.setState({query:{...this.state.query, limit: e.target.value}})
    console.log('limit changed')
  }
  
  render() {
    return (
      <div style={{width:"95%", maxWidth:"1080px", margin:"auto"}}>
      <div style={{marginBottom: 20, textAlign:"center"}}>
      </div>
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        layout="horizontal"
        style={{width:"80%", maxWidth: "500px", margin:"auto"}}
      >
        <APITitle title={this.state.apiTitle} description={this.state.apiDescription} method={this.state.apiMethod}/>
        <Form.Item label="Address *" >
          <Input onChange={this.onAddressChange}/>
        </Form.Item>
        <Form.Item label="Token Address *">
          <Input onChange={this.onTokenAddressChange}/>
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
        <Form.Item wrapperCol={{offset: 6, span:18}}>
          <Button type="primary" htmlType="submit" style={{width:"100%"}} onClick={()=>this.submitQuery(this.state.query)}>Search {this.state.apiTitle}</Button>
        </Form.Item>
        
      </Form>
      <NFTCards minter="true" data={this.state.nftData} />
      </div>
    )
  }
}
