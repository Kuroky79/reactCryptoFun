import {Flex, Typography} from "antd";

export default function CoinInfo({coin}){
    return (
        <Flex style={{alignItems: 'center'}}>
            <img src={coin.icon} alt={coin.name} style={{width: 40}}/>
            <Typography.Title level={2} style={{margin: 0, marginLeft: 15}}> {coin.name}</Typography.Title>
        </Flex>
    )
}