import {Layout, Typography} from "antd";
import {useCrypto} from "../context/crypto-context.jsx";
import PortfolioChart from "./PortfolioChart.jsx";
import AssetsTable from "./AssetsTable.jsx";
const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
};

export default function AppContent(){
    const {assets, crypto} =useCrypto()
    return (
        <Layout.Content style={contentStyle}>
            <Typography.Title level={3} style={{color: '#fff',textAlign: 'left'}}>
                Portfolio: {assets.map(asset =>{
                    const coin = crypto.find(c => c.id === asset.id);
                    return asset.amount * coin.price;
            })
                .reduce((acc,value)=> (acc+=value),0).toFixed(3)}$
            </Typography.Title>
            <PortfolioChart/>
            <AssetsTable/>
        </Layout.Content>)
}