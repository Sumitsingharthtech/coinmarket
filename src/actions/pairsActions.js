import axios from 'src/utils/axios';
import { API } from 'src/constants';

export const GET_TRADING_PAIRS = '@pdex/get-trading-pairs';
export const GET_CUSTOM_TRADING_PAIRS = '@pdex/get-custom-trading-pairs';

export function getTradingPairs() {
  const request = axios.get(`${API.BASE_URL}/pdex/pairs`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_TRADING_PAIRS,
      payload: response.data
    }));
  };
}

export function getCustomTradingPairs() {
  const request = axios.get(`${API.BASE_URL}/pdex/custom-pairs`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_CUSTOM_TRADING_PAIRS,
      payload: response.data
    }));
  };
}
