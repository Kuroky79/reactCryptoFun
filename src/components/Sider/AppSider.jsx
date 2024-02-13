import {Layout, Card, Statistic,List,Spin,Typography} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";
import {cryptoAssets, cryptoData} from "../../data/data.js";
import {fakeFetchAssets, fakeFetchCrypto} from "../../data/api.js";
import {percentDifference} from "../utils/utils.js";
const siderStyle = {
    padding: '1rem',
};



export default function AppSider(){
    const [loading,setLoading] = useState(false);
    const [crypto,setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        async function preload(){
            setLoading(true);
            const {result} = await fakeFetchCrypto();
            const assets = await fakeFetchAssets();
            setCrypto(result);
            setAssets(assets.map(asset => {
                const coin = result.find((c) => c.id === asset.id);
                return {
                    grow: asset.price < coin.price,
                    growPercent: percentDifference(asset.price, coin.price),
                    totalAmount: asset.amount * coin.price,
                    totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                    ...asset
                }
            }));
            setLoading(false);
        }
        preload();
    }, []);

    if (loading){
        return <Spin fullscreen/>
    }
    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map((asset) => (
                <Card key={asset.id} bordered={false} style={{marginBottom: 10}}>
                    <Statistic
                        title={asset.id}
                        value={asset.totalAmount}
                        precision={2}
                        valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322'}}
                        prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined/>}
                        suffix="$"
                    />
                    <List
                        size='small'
                        bordered
                        dataSource={[
                            {title: 'Total Profit', value: asset.totalProfit},
                            {title: 'Asset Amount', value: asset.amount, isPlain: true},
                            {title: 'Difference', value: asset.growPercent}
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <span>{item.title}</span>
                                {item.isPlain && <span>{item.value}</span>}
                                {!item.isPlain && <span>{item.value.toFixed(2)}$</span>}
                            </List.Item>
                        )}
                    />
                </Card>
            ))}

        {/*<Card bordered={false}>*/}
        {/*    <Statistic*/}
        {/*        title="Idle"*/}
        {/*        value={9.3}*/}
        {/*        precision={2}*/}
        {/*        valueStyle={{*/}
        {/*            color: '#cf1322',*/}
        {/*        }}*/}
        {/*        prefix={<ArrowDownOutlined />}*/}
        {/*        suffix="%"*/}
        {/*    />*/}
        {/*</Card>*/}
    </Layout.Sider>)
}