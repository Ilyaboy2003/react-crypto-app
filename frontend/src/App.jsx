import AppLayout from './components/layout/AppLayout';
import { CryptoContextProvider } from './context/crypto-context';




export default function App() {
  return (
    // завдяки тому що я обгорнув весь вміст (<AppLayout /> в середину CryptoContextProvider, весь вміст має доступ до таких данних, як loading, crypto, assets - тобто моїх данних про монети (їх акт. курс і т.д.))
    <CryptoContextProvider> 
      <AppLayout />
    </CryptoContextProvider>
  )
}
