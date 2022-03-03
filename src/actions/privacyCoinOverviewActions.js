import axios from 'src/utils/axios';
import { API } from 'src/constants';

export const GET_PRIVACY_COIN_OVERVIEW = '@privacy-coin/get-overview';
export const GET_PRIVACY_COIN_MARKET_CAP = '@privacy-coin/get-market-cap';
export const GET_PRIVACY_COIN_USD_EVOLUTION = '@privacy-coin/get-usd-evolution';

export function getPrivacyCoinOverview() {
  const request = axios.get(`${API.BASE_URL}/privacy-coin/overview`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_PRIVACY_COIN_OVERVIEW,
      payload: response.data
    }));
  };
}

export function getPrivacyCoinMarketCap(start, end) {
  const request = axios.get(`${API.BASE_URL}/privacy-coin/market-cap?start=${start}&end=${end}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_PRIVACY_COIN_MARKET_CAP,
      payload: response.data
    }));
  };
}

export function getPrivacyCoinUsdEvolution(start, end) {
  const request = axios.get(`${API.BASE_URL}/privacy-coin/usd-evolution?start=${start}&end=${end}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_PRIVACY_COIN_USD_EVOLUTION,
      payload: response.data
    }));
  };
}
