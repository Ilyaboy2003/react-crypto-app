import { createContext, useState, useEffect, useContext } from "react"
import { fetchCryptoData, fetchAssets } from '../api';
import { percentDifference } from '../utils'

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
})

export function CryptoContextProvider({ children }) {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])
    
    function mapAssets(assets, result) {
        return assets.map((asset) => {
            const coin = result.find((c) => c.id == asset.id)
            return {
                grow: asset.price < coin.price,
                growPercent: percentDifference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price, //кол-во криптоволюты умноженное на текущ. рыночную стоим. (сколько на данные момент денег)
                totalProfit: asset.amount * coin.price - asset.amount * asset.price, // кол-во денег на данные момент сравниваеться с стоим. за которую криптовалюта покупалась (итоговый заработок)
                name: coin.name,
                ...asset,
            }
        })
    }

    useEffect(() => {
        async function preload() {
            setLoading(true)
            const { result } = await fetchCryptoData()
            const assets = await fetchAssets()

            setAssets(mapAssets(assets, result))
            setCrypto(result)
            setLoading(false)
        }
        preload()
    }, [])

    // function addAsset(newAsset) {
    //     setAssets((prev) => mapAssets([...prev, newAsset], crypto))
    // }

    function addAsset(newAsset) {
        setAssets((prev) => {
            const assetExists = prev.some(asset => asset.id === newAsset.id);
            
            if (assetExists) {
                return mapAssets(
                    prev.map(asset => 
                        asset.id === newAsset.id 
                            ? { 
                                ...asset, 
                                amount: asset.amount + newAsset.amount, 
                                price: (asset.amount * asset.price + newAsset.amount * newAsset.price) / (asset.amount + newAsset.amount), // средняя цена покупки
                                totalAmount: (asset.amount + newAsset.amount) * (crypto.find(c => c.id === asset.id)?.price || asset.price), // пересчет totalAmount
                                totalProfit: ((asset.amount + newAsset.amount) * (crypto.find(c => c.id === asset.id)?.price || asset.price)) - ((asset.amount + newAsset.amount) * asset.price) // пересчет totalProfit
                            }
                            : asset
                    ),
                    crypto
                );
                
            } else {
                return mapAssets([...prev, newAsset], crypto);
            }
            
        });
    }

    return (
        <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
            {children}
        </CryptoContext.Provider>
    )
}

export default CryptoContext

export function useCrypto() {
    return useContext(CryptoContext)
}