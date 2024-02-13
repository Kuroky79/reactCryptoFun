import {Layout, Card, Statistic,List,Spin,Typography, Tag} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {useContext, useEffect, useState} from "react";
import {cryptoAssets, cryptoData} from "../../data/data.js";
import {fakeFetchAssets, fakeFetchCrypto} from "../../data/api.js";
import {capitalize, percentDifference} from "../utils/utils.js";
import CryptoContext from "../context/crypto-context.jsx";
const siderStyle = {
    padding: '1rem',
};



export default function AppSider(){
    const {loading,assets,crypto} =useContext(CryptoContext)
    if (loading){
        return <Spin fullscreen/>
    }
    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map((asset) => (
                <Card key={asset.id} bordered={false} style={{marginBottom: 10}}>
                    <Statistic
                        title={capitalize(asset.id)}
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
                            {title: 'Total Profit', value: asset.totalProfit, withTag: true},
                            {title: 'Asset Amount', value: asset.amount, isPlain: true},
                            // {title: 'Difference', value: asset.growPercent}
                        ]}
                        renderItem={(item) => (
                            <List.Item style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span>{item.title}</span>
                                <span>
                                    {item.withTag && <Tag color={asset.grow ? 'green': 'red'}>{asset.growPercent}%</Tag>}
                                {item.isPlain && item.value}
                                    {!item.isPlain && <Typography.Text
                                        type={asset.grow ? 'success' : 'danger'}>{item.value.toFixed(2)}$</Typography.Text>}
                                </span>
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