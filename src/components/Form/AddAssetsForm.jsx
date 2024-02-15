import {useState} from "react";
import {Flex, Select, Space, Typography} from "antd";
import {useCrypto} from "../context/crypto-context.jsx";

export default function AddAssetsForm(){
    const {crypto} = useCrypto();
    const [coin, setCoin] = useState(null);


    if (!coin){
        return (
            <Select style={{width: '100%'}}
                onSelect={(v)=> setCoin(crypto.find((c) => c.id === v))}
                placeholder="Select Coin"
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/> {option.data.label}
                    </Space>
                )}
            />
        )
    }else{
        return (<form>
            <Flex style={{alignItems: 'center'}}>
                <img src={coin.icon} alt={coin.name} style={{width: 40}}/>
                <Typography.Title level={2} style={{margin: 0, marginLeft: 15}}> {coin.name}</Typography.Title>
            </Flex>

        </form>)
    }


}