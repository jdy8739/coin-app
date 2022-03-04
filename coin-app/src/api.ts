const BASE_URL = 'https://api.coinpaprika.com/v1';

export const getAllCoins = () => {
    return fetch(BASE_URL + '/coins')
        .then(res => res.json());
};

export const getCoinInfo = (id: string) => {
    return fetch(BASE_URL + `/coins/${id}`)
        .then(res => res.json());
};

export const getCoinPriceInfo = (id: string) => {
    return fetch(BASE_URL + `/tickers/${id}`)
        .then(res => res.json());
};

export const getPriceFluctuation = (id: string) => {
    const end = Math.round(Date.now() / 1000);
    const start = end - 60 * 60 * 24 * 7;
    return fetch(BASE_URL + `/coins/${id}/ohlcv/historical?start=${start}&end=${end}`)
        .then(res => res.json());
};