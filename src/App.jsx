import {CryptoContextProvider} from "./components/context/crypto-context.jsx";
import AppLayout from "./components/Layout/AppLayout.jsx";



export default function App(){
    return (
        <CryptoContextProvider>
            <AppLayout/>
        </CryptoContextProvider>
    )
}