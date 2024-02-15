import {Layout,Select,Space,Button,Modal,Drawer} from "antd";
import {useCrypto} from "../context/crypto-context.jsx";
import {useEffect, useState} from "react";
import CryptoInfoModal from "../Modal/CryptoInfoModal.jsx";
import AddAssetsForm from "../Form/AddAssetsForm.jsx";
const headerStyle = {
    textAlign: 'center',
    color: '#000000',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export default function AppHeader(){
    const [select,setSelect] = useState(false);
    const [modal,setModal] = useState(false);
    const [coin, setCoin] = useState(null);
    const [drawer, setDrawer] = useState(null);
    useEffect(() => {
        const keypress = event =>{
            if(event.key === '/'){
                setSelect(prev =>!prev);
            }
        }
        document.addEventListener('keypress',keypress)
        return () => document.removeEventListener('keypress',keypress)
    }, []);

    const handleOk = () => {
        setModal(false);
    };
    const handleCancel = () => {
        setModal(false);
    };
    const {crypto} = useCrypto();
    function handleSelect(value){
        console.log(value)
        setCoin(crypto.find(c=>c.id === value));
        setModal(true);
    }
    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{
                    width: 250,
                }}
                open={select}
                onSelect={handleSelect}
                onClick={()=>setSelect(prev =>!prev)}
                value="press / to open"
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
            <Button type="primary" onClick={()=>setDrawer(true)}>Add Asset</Button>
            <Modal  footer={null} open={modal}  onCancel={handleCancel}>
                <CryptoInfoModal coin={coin}/>
            </Modal>
            <Drawer title="Add Drawer" destroyOnClose onClose={()=>setDrawer(false)} open={drawer}>
                <AddAssetsForm/>
            </Drawer>
        </Layout.Header>)
}