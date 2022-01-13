import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  Tooltip,
} from 'antd';
import Chain from "./components/Chain.js";
import NFTCards from "./components/NFTCards.js";
import APITitle from "./components/APITitle.js";

const Moralis = require("moralis");

export default class GetNFTLowestPrice extends Component {
  constructor() {
    super();
    this.state = {
      query: {
        chain: "eth",
        address: "",
        days: 7,
        marketplace: "",
        format: "",
        offset: "",
        limit: 9,
      },
      nftData: [],
      apiTitle: "GetNFTLowestPrice",
      apiDescription: <>

        <p>"NFT API gets an object with a number of NFTs and an array with NFT metadata(where available) for a given token contract address."</p>
        <p style={{ margin: "10px 0px" }}><span style={{ fontWeight: 600 }}>Address (required)</span>: Choose the contract address you want to search</p>
        <p>For example, this is the CryptoPunk address: 0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb</p>

      </>
    }
  }
  componentDidMount() {
    this.setState({ address: Moralis.User.current().get('ethAddress') })
  }

  submitQuery = async (state) => {
    this.setState({ nftData: await Moralis.Web3API.token.getNFTLowestPrice(state) })
    console.log("=== GetNFTLowestPrice ===")
    console.log(this.state.query)
    console.log(this.state.nftData)
  }
  onAddressChange = (e) => {
    this.setState({ query: { ...this.state.query, address: e.target.value } })
  }
  onDaysChange = (e) => {
    this.setState({ query: { ...this.state.query, days: e.target.value } })
  }
  onMarketplaceChange = (e) => {
    this.setState({ query: { ...this.state.query, marketplace: e.target.value } })
  }
  onChainChange = (e) => {
    this.setState({ query: { ...this.state.query, chain: e } })
  }



  render() {
    return (
      <div style={{ width: "95%", maxWidth: "1800px", margin: "auto" }}>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          layout="horizontal"
          style={{ width: "80%", maxWidth: "500px", margin: "auto" }}
        >
          <APITitle title={this.state.apiTitle} description={this.state.apiDescription} />
          <Form.Item label="Address *" >
            <Tooltip placement="right" title="The address of the token contract">
              <Input onChange={this.onAddressChange} />
            </Tooltip>
          </Form.Item>
          <Form.Item label="Days" >
            <Tooltip placement="right" title="The number of days to look back to find the lowest price If not provided 7 days will be the default.">
              <Input onChange={this.onDaysChange} />
            </Tooltip>
          </Form.Item>
          <Form.Item label="Marketplace" >
            <Tooltip placement="right" title="Marketplace from where to get the trades (only opensea is supported at the moment).">
              <Input onChange={this.onMarketplaceChange} />
            </Tooltip>
          </Form.Item>
          <Form.Item label="Chain" >
            <Tooltip placement="right" title="Choose the chain you wish to search">
              <Chain onChainChange={this.onChainChange} />
            </Tooltip>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Tooltip placement="right" title="You will see results appear under this button">
              <Button type="primary" htmlType="submit" style={{ width: "100%" }} onClick={() => this.submitQuery(this.state.query)}>Search GetAllTokenIds</Button>
            </Tooltip>
          </Form.Item>
        </Form>
        <NFTCards data={this.state.nftData} />
      </div>
    )
  }
}
