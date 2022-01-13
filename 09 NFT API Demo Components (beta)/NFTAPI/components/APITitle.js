import React from 'react';
import { Typography } from 'antd';
const { Title, Paragraph } = Typography;

export default function APITitle (props){
        return(
            <div>
                <Title level={2} style={{textAlign:"center", margin:"10px 0px"}}>{props.title}</Title>
                {props.method && <Paragraph code copyable style={{textAlign:"center", margin:"20px 0px", fontSize:"1.2em"}}>{props.method}</Paragraph>}
                <Paragraph style={{textAlign:"center", margin:"10px 0px"}}>{props.description}</Paragraph>
            </div>
        )
}