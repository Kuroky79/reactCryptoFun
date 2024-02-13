import {Layout} from "antd";
const headerStyle = {
    textAlign: 'center',
    color: '#000000',
    height: 60,
    padding: '1rem',
    display: 'flex',
    background: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
};
export default function AppHeader(){
    return (<Layout.Header style={headerStyle}>Header</Layout.Header>)
}