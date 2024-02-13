import { Layout } from 'antd';
import AppHeader from "./components/Layout/AppHeader.jsx";
import AppSider from "./components/Sider/AppSider.jsx";
import AppContent from "./components/Content/AppContent.jsx";



export default function App(){
    return (
        <Layout>
            <AppHeader/>
            <Layout>
                <AppSider/>
                <AppContent/>
            </Layout>
        </Layout>
    )
}