import {useState} from "react";
import {Flex, Select, Space, Typography, Button, Divider, Form, Checkbox, Input, InputNumber} from "antd";
import {useCrypto} from "../context/crypto-context.jsx";
import {DatePicker} from "antd/lib";

function onFinish(values)  {
    console.log('Success:', values);
}


export default function AddAssetsForm(){
    const [form] = Form.useForm();
    const {crypto} = useCrypto();
    const [coin, setCoin] = useState(null);
    function handleAmountChange(value){
        form.setFieldsValue({
            total: value * coin.price,
        })
    }

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
        return (
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 10 }}
                style={{ maxWidth: 600 }}
                initialValues={{
                    price: +(coin.price.toFixed(2)),
                }}
                onFinish={onFinish}
            >
                <Flex style={{alignItems: 'center'}}>
                    <img src={coin.icon} alt={coin.name} style={{width: 40}}/>
                    <Typography.Title level={2} style={{margin: 0, marginLeft: 15}}> {coin.name}</Typography.Title>
                </Flex>
                <Divider/>
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            type: 'number',
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <InputNumber placeholder="Enter coin amount" onChange={handleAmountChange} style={{width: '100%', marginLeft: 20}}/>
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                >
                    <InputNumber disabled style={{width: '100%', marginLeft: 20}}/>
                </Form.Item>
                <Form.Item
                    label="Date && Time"
                    name="dateTime"
                >
                    <DatePicker showTime style={{width: '100%', marginLeft: 20}}/>
                </Form.Item>
                <Form.Item
                    label="Total"
                    name="total"
                >
                    <InputNumber disabled style={{width: '100%', marginLeft: 20}}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Asset
                    </Button>
                </Form.Item>
            </Form>
        )
    }


}