import React from 'react';
import { Table } from 'antd';
import { getEllipsisTxt } from "../../../helpers/formatters";

export default function ResultsTable (props){

    const columns = props.columns
    const data = props.data.result || props.data;
    const table1 = props.api === "GetNFTTransfers" || 
    props.api === "GetNFTTransfersByBlock" || 
    props.api === "GetContractNFTTransfers";
    const table2 = props.api === "GetNFTMetadata" 

 
    if(!data ) return null;

    if(table1){
        console.log(props)
        console.log(data)
        const map = data.map((e, index)=>{
            return({
                key: index,
                from_address: getEllipsisTxt(e.from_address, 6),
                to_address: getEllipsisTxt(e.to_address, 6),
                block_number: e.block_number,
                token_address: e.token_address,
                transaction_hash: e.transaction_hash,
            })
        })
        return(
            <div className="test111" style={{display:"flex", flexWrap:"wrap"}}>
                {map ? <Table columns={columns} dataSource={map} /> : ""}
            </div>
        )
    }

    if(table2){
        console.log('table2')
        const e = props.data
        const table2data = [{
            key: 1,
            name: e.name,
            symbol: e.symbol,
            token_address: e.token_address,
            contract_type: e.contract_type,                
            synced_at: e.synced_at,                
        }]  
        console.log(table2data)
        return (
            <div className="test111" style={{display:"flex", flexWrap:"wrap"}}>
                {<Table columns={columns} dataSource={table2data} /> }
            </div>
        )
 
    }

        return null
}