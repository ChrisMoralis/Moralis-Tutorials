import React, { Component } from 'react';
import { Collapse } from 'antd';
import SearchNFTs from "./NFTAPI/SearchNFTs.js";
import GetNFTs from "./NFTAPI/GetNFTs.js";
import GetNFTsForContract from "./NFTAPI/GetNFTsForContract.js";
import GetNFTTransfers from "./NFTAPI/GetNFTTransfers.js";
import GetNFTTransfersByBlock from "./NFTAPI/GetNFTTransfersByBlock.js";
import GetAllTokenIds from "./NFTAPI/GetAllTokenIds.js";
import GetContractNFTTransfers from "./NFTAPI/GetContractNFTTransfers.js";
import GetNFTLowestPrice from "./NFTAPI/GetNFTLowestPrice.js";
import GetNFTMetadata from "./NFTAPI/GetNFTMetadata.js";

const { Panel } = Collapse;

export default class NFTAPI extends Component {

    render() {
        console.log(this.state)
        return (
            <div style={{ width: "90%", maxWidth: "1800px" }}>
                <Collapse  accordion>
                    <Panel header="SearchNFTs " key="1">
                        <SearchNFTs />
                    </Panel>
                    <Panel header="GetNFTs" key="2">
                        <GetNFTs />
                    </Panel>
                    <Panel header="GetNFTsForContract" key="3">
                        <GetNFTsForContract />
                    </Panel>
                    <Panel header="GetNFTTransfers" key="4">
                        <GetNFTTransfers />
                    </Panel>
                    <Panel header="GetNFTTransfersByBlock" key="5">
                        <GetNFTTransfersByBlock />
                    </Panel>
                    <Panel header="GetAllTokenIds" key="6">
                        <GetAllTokenIds />
                    </Panel>
                    <Panel header="GetContractNFTTransfers" key="7">
                        <GetContractNFTTransfers />
                    </Panel>
                    <Panel header="GetNFTLowestPrice" key="8">
                        <GetNFTLowestPrice />
                    </Panel>
                    <Panel header="GetNFTMetadata" key="9">
                        <GetNFTMetadata />
                    
                    </Panel>
                    <Panel header="GetNFTOwners" key="10">
                    HAVEN'T CONNECTED
                    </Panel>
                    <Panel header="GetNFTTrades" key="11">
                    HAVEN'T CONNECTED
                    </Panel>
                    <Panel header="GetNftTransfersFromToBlock" key="12">
                    HAVEN'T CONNECTED
                    </Panel>
                    <Panel header="GetTokenAddressTransfers" key="13">
                    HAVEN'T CONNECTED
                    </Panel>
                    <Panel header="GetTokenAllowance" key="14">
                    HAVEN'T CONNECTED
                    </Panel>
                    <Panel header="GetTokenIdMetadata" key="15">
                    HAVEN'T CONNECTED
                    </Panel>
                    <Panel header="GetTokenIdOwners" key="16">
                    HAVEN'T CONNECTED
                    </Panel>
                    <Panel header="GetWalletTokenIdTransfers" key="17">
                    HAVEN'T CONNECTED
                    </Panel>
                </Collapse>
            </div>

        )
    }
}
