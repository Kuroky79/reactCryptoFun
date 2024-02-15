import {useState} from "react";
import {Flex,Result, Select, Space, Typography, Button, Divider, Form, Checkbox, Input, InputNumber} from "antd";
import {useCrypto} from "../context/crypto-context.jsx";
import {DatePicker} from "antd/lib";
import CoinInfo from "../Modal/CoinInfo.jsx";



export default function AddAssetsForm(){
    const [form] = Form.useForm();
    const {crypto} = useCrypto();
    const [coin, setCoin] = useState(null);
    const [submitted, setSubmitted] = useState(false);


    if (submitted){
        return (
            <Result
                style={{display: "flex",alignItems: 'center',flexDirection: 'column', marginRight: 190 }}
                status="success"
                title="New Asset Added"
                subTitle={`Added ${42} of ${coin.name} by price ${24}`}
                extra={[
                    <Button type="primary" key="console" >
                        Close
                    </Button>,
                ]}
            />
        )
    }
    function onFinish(values)  {
        console.log('Success:', values);
        setSubmitted(true);
    }

    function handleAmountChange(value){
        form.setFieldsValue({
            total: +(value * coin.price).toFixed(2),
        })
    }
    function handlePriceChange(value){
        const amount = form.getFieldValue('amount');
        form.setFieldsValue({
            total: +(amount * coin.price).toFixed(2),
        })
    }
    if (!coin){
        return (
            <Select style={{width: '60%'}}
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
                <CoinInfo coin={coin}/>
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
                    <InputNumber onChange={handlePriceChange}  style={{width: '100%', marginLeft: 20}}/>
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