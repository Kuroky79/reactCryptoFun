import {Layout, Card, Statistic,List,Typography} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";
import {cryptoAssets, cryptoData} from "../../data/data.js";
const siderStyle = {
    padding: '1rem',

};
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];
export default function AppSider(){
    const [loading,setLoading] = useState(false);
    const [crypto,setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        async function preload(){
            setLoading(true);
            const {result} = await cryptoData();
            const assets = await cryptoAssets();
        }
    }, []);
    return (<Layout.Sider width="25%" style={siderStyle}>
        <Card bordered={false} style={{marginBottom: 10}}>
            <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
            />
            <List
                size='small'
                bordered
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <Typography.Text mark>[ITEM]</Typography.Text> {item}
                    </List.Item>
                )}
            />
        </Card>
        <Card bordered={false}>
            <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{
                    color: '#cf1322',
                }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
            />
        </Card>
    </Layout.Sider>)
}