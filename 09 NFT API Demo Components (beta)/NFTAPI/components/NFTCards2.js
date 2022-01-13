import React, { useEffect, useState } from 'react';
import { Card, Tooltip } from 'antd';
import { FileSearchOutlined, SendOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { fixURL } from "helpers/fetcher";

const axios = require('axios').default;
const { Meta } = Card;


export default function NFTCards2 (props){
    
    const [ thedata, setTheData ] = useState('')
    const [ theProps, setTheProps ] = useState('')

    let propData = props.data.result || props.data;
    let map2;

    useEffect(() => {
        console.log('used effect')
        testFunc()
    },[]);
    
    

    const testFunc = () => {
        console.log("component 2 data: ", propData)
        if(propData){
            let x = propData.map((e, index)=>{
                return axios.get(e.token_uri)
            })
            Promise.all(x).then((values)=>{
                setTheData([...values])
                sticker(values)

            })
            
        }
    }
    const sticker = (values) => {
        map2 = values
        
        // .map((e, index)=>{
        //     let data = {...e.data}
        //     return(
        //         <div key={index}>
        //             <Card           
        //                 hoverable
        //                 style={{ width: 350, margin: 5 }}
        //                 cover={data.image_url ? <img alt="example" src={data.image_url} height="180"/> : <div style={{height:180, display:"flex", alignItems:"center", justifyContent:"center"}} className="blankImage">NO IMAGE</div>}
        //                 >
        //                 <Card.Grid style={{width:"100%"}}>
        //                     <Meta title={data.name} description={data.description} style={{textAlign:"center", height:100}}/>
        //                 </Card.Grid>
        //             </Card>
        //         </div>
        //     )
        // })

    }

    return(
        <>
            <div className="test111" style={{display:"flex", flexWrap:"wrap", marginTop:"25px", justifyContent:'center',alignContent:'center'}}>
                {thedata && thedata.map( (e, index) => (
                        <Card           
                            hoverable
                            style={{ width: 240, margin: 3 }}
                            actions={[
                                <Tooltip title="View On Blockexplorer">
                                <FileSearchOutlined
                                    onClick={() => alert("NEEDS TO BE CONNECTED")}
                                />
                                </Tooltip>,
                                <Tooltip title="Transfer NFT">
                                <SendOutlined onClick={() => alert("NEEDS TO BE CONNECTED")} />
                                </Tooltip>,
                                <Tooltip title="Sell On OpenSea">
                                <ShoppingCartOutlined onClick={() => alert("OPENSEA INTEGRATION COMING!")} />
                                </Tooltip>,
                            ]}
                            cover={e.data ? <img alt="example" src={fixURL(e.data.image_url || e.data.image)} height="180"/> : <div style={{height:180, display:"flex", alignItems:"center", justifyContent:"center"}} className="blankImage">NO IMAGE</div>}
                            >
                            <Card.Grid style={{width:"100%"}}>
                                <Meta title={e.data.name} description={e.data.description} style={{textAlign:"center", height:100}}/>
                            </Card.Grid>
                        </Card>

                    ))
                }
            </div>
        </>
    )
    
}