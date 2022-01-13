import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd';
import Chain from "./components/Chain.js";
import Format from "./components/Format.js";
import Filter from "./components/Filter.js";
import NFTCards from "./components/NFTCards.js";
import APITitle from "./components/APITitle.js";

// let appData = require("./Settings.json");
const Moralis = require("moralis");

export default class SearchNFTs extends Component {
  constructor() {
    super();
    this.state = {
      query:{
        chain: "eth",
        q: "",
        format: "",
        offset: "",
        limit: "10",
        filter: "",
      },
      oldQuery:{
        chain: "eth",
        q: "",
        format: "",
        offset: "",
        limit: "10",
        filter: "",
      },
      nftData: [],
      apiTitle: "SearchNFTs",
      apiMethod: "await Moralis.Web3API.token.searchNFTs(options);",
      apiDescription: <>
          <p>Do a cross-chain metadata search for any NFTs.</p> 
          <p>You get back fully resolved metadata.</p> 

            <p style={{margin:"10px 0px"}}><span style={{fontWeight:600}}>Query (required)</span>: Any search string parameter you want to look for</p>
            <p style={{margin:"10px 0px"}}><span style={{fontWeight:600}}>Filter (optional)</span>: What fields the search should match on. To look into the entire metadata set the value to 'global'. To have a better response time you can look into a specific field like 'name'. Available values: name; description; attributes; global; name,description; name,attributes; description,attributes; name,description,attributes</p>

</>,
    }
  }
  
  submitQuery = async (state) => {
    let query = this.state.query
    this.setState({oldQuery:query})
    // const NFTs = await Moralis.Web3API.token.searchNFTs(state);
    this.setState({nftData: await Moralis.Web3API.token.searchNFTs(state)})
    console.log(this.state.nftData.result)
  }
  onChainChange = (e) => {
    this.setState({query:{...this.state.query, chain: e}})
  }
  onQueryChange = (e) => {
    this.setState({query:{...this.state.query, q: e.target.value}})
  }
  onFormatChange = (e) => {
    this.setState({query:{...this.state.query, format: e}})
  }
  onFilterChange = (e) => {
    this.setState({query:{...this.state.query, filter: e}})
  }
  onOffsetChange = (e) => {
    this.setState({query:{...this.state.query, offset: e.target.value}})
  }
  onLimitChange = (e) => {
    let newLimit = e.target.value;
    if(e.target.value === ""){newLimit = "9";}
    this.setState({query:{...this.state.query, limit: newLimit}});
    console.log('limit changed');
  }
  
  render() {
    return (
      <div style={{width:"95%", maxWidth:"1800px", margin:"auto"}}>

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
        <Form.Item label="Query *">
          <Input onChange={this.onQueryChange}/>
        </Form.Item>
        <Form.Item label="Chain" >
          <Chain onChainChange={this.onChainChange}/>
        </Form.Item>
        <Form.Item label="Filter" >
          <Filter onFilterChange={this.onFilterChange}/>
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

          <NFTCards minter="true" data={this.state.nftData} />

      </div>
    )
  }
}
