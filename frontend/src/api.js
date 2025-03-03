import { cryptoAssets } from './data'

export function fetchAssets() {
    return new Promise (resolve => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 2000)
    })
}

export async function fetchCryptoData() {
    const options = {
        method: 'GET', //Это HTTP-метод, который указывает серверу, что мы хотим получить данные, а не отправить что-то.
        headers: {
            accept: 'application/json', //Это говорит серверу: «Я ожидаю получить ответ в формате JSON». Без этого сервер мог бы отправить ответ в другом формате, например, XML или HTML.
            'X-API-KEY': 'XoXPVDRI6X+EXXPudNVTiTtoxINVa80cbIt+rrNZ8Yw='
        } // Это API-ключ — своего рода пароль, который позволяет использовать API.
    };

    try {
        const response = await fetch('https://openapiv1.coinstats.app/coins', options); // в итоге в переменной return храняться данные полученые после запроса на сервер.
        const data = await response.json(); // response.json() — это метод, который превращает ответ в JSON.
        //await заставляет код дождаться, пока JSON-данные будут загружены и преобразованы в объект. Если не использовать await, то в data будет Promise, а не готовые данные.
        return data; // data теперь содержит готовые данные о криптовалютах в виде объекта JavaScript.
    } catch (error) {
        console.error('Ошибка при загрузке данных о криптовалюте:', error);
        return { coins: [] }; // Возвращаем пустой массив, чтобы избежать крашей
    }
}