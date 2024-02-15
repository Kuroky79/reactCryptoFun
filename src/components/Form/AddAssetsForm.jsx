import {useRef, useState} from "react";
import {Flex,Result, Select, Space, Typography, Button, Divider, Form, Checkbox, Input, InputNumber} from "antd";
import {useCrypto} from "../context/crypto-context.jsx";
import {DatePicker} from "antd/lib";
import CoinInfo from "../Modal/CoinInfo.jsx";



export default function AddAssetsForm({onClose}){
    const [form] = Form.useForm();
    const {crypto,addAsset} = useCrypto();
    const [coin, setCoin] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const assetRef = useRef();

    if (submitted){
        return (
            <Result
                style={{display: "flex",alignItems: 'center',flexDirection: 'column', marginRight: 190 }}
                status="success"
                title="New Asset Added"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
                extra={[
                    <Button type="primary" key="console" onClick={onClose}>
                        Close
                    </Button>,
                ]}
            />
        )
    }
    function onFinish(values)  {
        const newAseet= {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date(),
        }
        assetRef.current = newAseet;
        setSubmitted(true);
        addAsset(newAseet)
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