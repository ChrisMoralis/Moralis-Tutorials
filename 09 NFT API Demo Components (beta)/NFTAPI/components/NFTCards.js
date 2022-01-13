import React from 'react';
import { Card, Tag, Table, Collapse } from 'antd';
import AddressRender from "./AddressRender"
import NFTCards2 from "../components/NFTCards2";

const { Meta } = Card;
const { Panel } = Collapse;

export default function NFTCards(props) {

    const data = props.data.result;
    const columns = [
        {

            dataIndex: "attributes",
            key: "key",
            render: attributes => (
                <>
                    {attributes.map(attrib => {
                        return (
                            <Tag color={"green"} >{attrib}</Tag>
                        )
                    })}
                </>
            )
        }
    ]

    if (data) {
        // console.log(props)
        // if(data.length > 1 && data[0].metadata === null) {console.log('need to manually fetch metadata'); return null}
        if(data.length > 1 && data[0].metadata === null) {
            console.log('needed to manually fetch metadata - switched to component 2'); 
            return <NFTCards2 data={props.data.result} key={Math.floor(Math.random() * 100)}/>
        }

        let attributes = [];
        const metadata = data.map((e, index) => {
            let parsedData;
            if (e.metadata) {
                parsedData = JSON.parse(e.metadata)
                if (parsedData.attributes && Array.isArray(parsedData.attributes)) {
                    if (typeof parsedData.attributes[0] === "object") {
                        attributes = []
                    }
                    else attributes = parsedData.attributes
                } else
                    attributes = []

            }
            // console.log(attributes)

            return ({
                ...parsedData,
                minter_address: e.minter_address,
                token_address: e.token_address,
                token_id: e.token_id,
                attributes: attributes ? attributes : "",
                key: e.token_id,
                contract_type: e.contract_type ? e.contract_type : "",
                token_hash: e.token_hash ? e.token_hash : "",
                token_uri: e.token_uri ? e.token_uri : "",
                block_number_minted: e.block_number_minted ? e.block_number_minted : "",
            })

            // else if(e.description){
            //     return({
            //         name:e.name, 
            //         description:e.description, 
            //         image:e.image || e.image_url,
            //         minter_address: e.minter_address ? e.minter_address:"",
            //         token_address: e.token_address ? e.token_address : "",
            //         token_id: e.token_id ? e.token_id : "",
            //     })
            // }
            // else {
            //     return({
            //         name: "",
            //         description:"", 
            //         image:"",
            //         minter_address: "",
            //         token_address: "Oops, not available yet",
            //         token_id: "Oops, not available yet",
            //     })

            // }

        })

        let map;
        if (metadata.length > 0) {
            map = metadata.map((e, index) => {
                let desc;
                if (e.description) { desc = e.description } else { desc = "There is no description" };
                if (desc && desc.length > 100) { desc = `${e.description.substring(0, 100)}...` }
                else if (desc === null) { desc = "there is no description with this NFT" }
                return (
                    <div key={index}>
                        <Card key={index}
                            hoverable
                            style={{ width: 350, margin: 5 }}
                            cover={e.image ? <img alt="example" src={e.image} height="180" /> : <div style={{ height: 180, display: "flex", alignItems: "center", justifyContent: "center" }} className="blankImage">NO IMAGE</div>}
                        >
                            <Card.Grid style={{ width: "100%" }}>
                                {/* <Meta title={e.name} description={desc} style={{textAlign:"center", height:100}}/> */}
                                <Meta title={e.name} style={{ textAlign: "center" }} />
                                {metadata &&
                                    <div style={{ marginTop: 5, paddingTop: 5, display: "flex", justifyContent: "center" }} className="metadataTable">
                                        <Table columns={columns} dataSource={[metadata[index]]} pagination={false} />
                                    </div>
                                }
                                <Collapse style={{ width: "100%", maxWidth: "1800px" }} accordion >
                                    <Panel header={e.name + " Metadata"} key="1" style={{ justifyContent: "center" }}>
                                        {e.description && <div style={{ margin: "10px 0px" }}>
                                            <p>Description:</p>
                                            <Meta description={e.description} className='meta3' />
                                        </div>}
                                        {e.token_id && <div style={{ margin: "10px 0px" }}>
                                            <p>Token Id:</p>
                                            <Meta description={e.token_id} />
                                        </div>}
                                        {e.token_address && <div style={{ marginBottom: 10 }}>
                                            <p>Token Address</p>
                                            <Meta description={e.token_address} />
                                        </div>}
                                        {e.block_number_minted && <div style={{ marginBottom: 10 }}>
                                            <p>Block Number Minted</p>
                                            <Meta description={e.block_number_minted} />
                                        </div>}
                                        {e.token_address && <div style={{ marginBottom: 10 }}>
                                            <p>Token Address</p>
                                            <Meta description={e.token_address} />
                                        </div>}
                                        {e.token_uri && <div style={{ marginBottom: 10 }}>
                                            <p>Token URI</p>
                                            <Meta description={e.token_uri} />
                                        </div>}
                                    </Panel>
                                </Collapse>

                                {props.minter &&
                                    <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #eee" }}>

                                        <p style={{ textAlign: "center" }}>Minter Address:</p>
                                        {/* <Address avatar copyable size={7} style={{justifyContent:"center"}} address={e.minter_address}/> */}
                                        <AddressRender size={10} address={e.minter_address} style={{ margin: "auto" }} />
                                    </div>
                                }
                            </Card.Grid>
                        </Card>


                    </div>
                )
            }
            );
        }
        // console.log(metadata);
        return (
            <div className="test111" style={{ display: "flex", flexWrap: "wrap", marginTop: "25px", justifyContent: 'center', alignContent: 'center' }}>
                {map ? map : ""}
            </div>
        )
    }
    return (
        <div></div>
    )
}