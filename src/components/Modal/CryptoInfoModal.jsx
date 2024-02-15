import {Flex, Tag, Typography,Divider} from 'antd';

export default function CryptoInfoModal({coin}){
    return (
        <>
            <Flex style={{alignItems: 'center'}}>
                <img src={coin.icon} alt={coin.name} style={{width: 40}}/>
                <Typography.Title level={2} style={{margin: 0, marginLeft: 15}}>({coin.symbol}) {coin.name}</Typography.Title>
            </Flex>
            <Divider/>
            <Typography.Paragraph>
                <Typography.Text strong>1 hour: </Typography.Text>
                <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>1 day: </Typography.Text>
                <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d}%</Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>1 week: </Typography.Text>
                <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w}%</Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Price: </Typography.Text>
                <Tag>{(coin.price).toFixed(2)}$</Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Price BTC: </Typography.Text>
                <Tag>{coin.priceBtc.toFixed(2)}$</Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Market Cap: </Typography.Text>
                <Tag>{coin.marketCap.toFixed(2)}$</Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>contractAddress: </Typography.Text>
                <Tag>{coin.contractAddress}$</Tag>
            </Typography.Paragraph>
        </>
    )
}