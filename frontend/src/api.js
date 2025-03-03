import { cryptoAssets, cryptoData } from './data';

export function fetchAssets() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoAssets);
        }, 2000);
    });
}

// Фейковый запрос, если API недоступен
export function fakeFetchCrypto() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoData);
        }, 2000);
    });
}

export async function fetchCryptoData() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-API-KEY': 'XoXPVDRI6X+EXXPudNVTiTtoxINVa80cbIt+rrNZ8Yw='
        }
    };

    try {
        const response = await fetch('https://openapiv1.coinstats.app/coins', options);
        
        if (!response.ok) {
            throw new Error(`Ошибка API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка при загрузке данных о криптовалюте:', error);
        console.warn('Используется фейковый API');
        return await fakeFetchCrypto(); // Если API не работает, загружаем фейковые данные
    }
}