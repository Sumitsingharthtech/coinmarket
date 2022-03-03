import axios from 'src/utils/axios';
import { API } from 'src/constants';

export const GET_SHIELDED_COIN_OVERVIEW = '@shielded-coin/get-overview';
export const GET_SHIELDED_COIN_AGGREGATED_USD_AMOUNT = '@shielded-coin/get-aggregated-usd-amounts';
export const GET_SHIELDED_COIN_COIN_SUMMARY = '@shielded-coin/get-coin-summary';

export function getShieldedCoinOverview() {
  const request = axios.get(`${API.BASE_URL}/shielded-coins/overview`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_SHIELDED_COIN_OVERVIEW,
      payload: response.data
    }));
  };
}

export function getShieldedCoinAggregatedUsdAmounts(start, end) {
  const request = axios.get(`${API.BASE_URL}/shielded-coins/usd-evolution?start=${start}&end=${end}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_SHIELDED_COIN_AGGREGATED_USD_AMOUNT,
      payload: response.data
    }));
  };
}

export function getCoinSummary(coin) {
  const request = axios.get(`${API.BASE_URL}/shielded-coins/summary/${coin}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_SHIELDED_COIN_COIN_SUMMARY,
      payload: response.data
    }));
  };
}
