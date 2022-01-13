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

export default class GetNFTs extends Component {
  constructor() {
    super();
    this.state = {
      query:{
        chain: "eth",
        address: Moralis.User.current().get('ethAddress'),
        format: "",
        offset: "",
        limit: 10,
      },
      nftData: [],
      apiTitle: "GetNFTs",
      apiMethod: "await Moralis.Web3API.account.getNFTs(options);",
      apiDescription: <>
          <p>NFT API gets all NFTs from the current user or address. Supports both ERC721 and ERC1155. Returns an object with the number of NFT objects and the array of NFT objects.</p>
          <p style={{margin:"10px 0px"}}><span style={{fontWeight:600}}>Address (required)</span>: A user address (i.e. 0x1a2b3x...).</p>
          <p style={{margin:"10px 0px"}}><a href="https://opensea.io/assets/0xb7f7f6c52f2e2fdb1963eab30438024864c313f6/239" target="_blank">Example NFT Url</a></p>
      </>,      
    }
  }
  
  submitQuery = async (state) => {
    this.setState({nftData: await Moralis.Web3API.account.getNFTs(state)})
    console.log("Component's state: ",this.state)
    console.log("The options object: ",this.state.query)
    console.log("The search results: ",this.state.nftData)
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
        <APITitle title={this.state.apiTitle} description={this.state.apiDescription} method={this.state.apiMethod}/>
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
      <NFTCards data={this.state.nftData} />
      </div>
    )
  }
}
