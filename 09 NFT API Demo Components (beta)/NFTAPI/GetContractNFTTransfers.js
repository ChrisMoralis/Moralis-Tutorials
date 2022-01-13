import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  Tooltip,
} from 'antd';
import Chain from "./components/Chain.js";
import Format from "./components/Format.js";
import ResultsTable from "./components/ResultsTable.js";
import APITitle from "./components/APITitle.js";

const Moralis = require("moralis");

export default class GetContractNFTTransfers extends Component {
  constructor() {
    super();
    this.state = {
      query: {
        chain: "eth",
        address: "",
        format: "",
        offset: "",
        limit: "",
      },
      nftData: [],
      apiTitle: "GetContractNFTTransfers",
      apiDescription: <>

        <p>"You receive an object of NFT transfers for a given token contract address."</p>
        <p style={{ margin: "10px 0px" }}><span style={{ fontWeight: 600 }}>Address (required)</span>: Choose the contract address you want to search</p>
        <p>For example, this is the CryptoPunk address: 0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb</p>

      </>,
      columns: [
        {
          title: 'From',
          dataIndex: 'from_address',
          key: 'from_address',
          width: 150,
        },
        {
          title: 'To',
          dataIndex: 'to_address',
          key: 'to_address',
          width: 150,
        },
        {
          title: 'Block Number',
          dataIndex: 'block_number',
          key: 'block_number',
          width: 130,
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
  //   componentDidMount(){
  //     this.setState({address: Moralis.User.current().get('ethAddress')})
  //   }

  submitQuery = async (state) => {
    this.setState({ nftData: await Moralis.Web3API.token.getContractNFTTransfers(state) })

  }
  onAddressChange = (e) => {
    this.setState({ query: { ...this.state.query, address: e.target.value } })
  }
  onChainChange = (e) => {
    this.setState({ query: { ...this.state.query, chain: e } })
  }
  onFormatChange = (e) => {
    this.setState({ query: { ...this.state.query, format: e } })
  }
  onOffsetChange = (e) => {
    this.setState({ query: { ...this.state.query, offset: e.target.value } })
  }
  onLimitChange = (e) => {
    this.setState({ query: { ...this.state.query, limit: e.target.value } })
    console.log('limit changed')
  }


  render() {
    console.log(this.state.nftData)
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
            <Tooltip placement="right" title="Enter a contract address">
              <Input onChange={this.onAddressChange} />
            </Tooltip>
          </Form.Item>
          <Form.Item label="Chain" >
            <Tooltip placement="right" title="Choose the chain you wish to search">
              <Chain onChainChange={this.onChainChange} />
            </Tooltip>
          </Form.Item>
          <Form.Item label="Format">
            <Tooltip placement="right" title="(Not required) Choose the format of the token id. Available values : decimal, hex. Default value : decimal">
              <Format onFormatChange={this.onFormatChange} />
            </Tooltip>
          </Form.Item>
          <Form.Item label="Offset">
            <Tooltip placement="right" title="Choose where to search the API from. If there are 500 results and the page shows 10 but you want to search from item 50, then choose an offset">
              <Input onChange={this.onOffsetChange} />
            </Tooltip>
          </Form.Item>
          <Form.Item label="Limit">
            <Tooltip placement="right" title="Choose how many results you want to appear on the page. The max is usually 500 (default value: 9)">
              <Input onChange={this.onLimitChange} />
            </Tooltip>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Tooltip placement="right" title="You will see results appear under this button">
              <Button type="primary" htmlType="submit" style={{ width: "100%" }} onClick={() => this.submitQuery(this.state.query)}>Search {this.state.apiTitle}</Button>
            </Tooltip>
          </Form.Item>
        </Form>

        <div style={{ marginTop: 25 }}>
          <ResultsTable data={this.state.nftData} columns={this.state.columns} api={this.state.apiTitle} />
        </div>
      </div>
    )
  }
}
