import axios from 'src/utils/axios';
import { API } from 'src/constants';

export const GET_TRADES = '@pdex/get-trades';
export const GET_TRADES_BY_PAIR = '@pdex/get-trades-by-pair';
export const GET_CUSTOM_TRADES_BY_PAIR = '@pdex/get-custom-trades-by-pair';
export const GET_LAST_TRADES = '@pdex/get-last-trades';
export const GET_CUSTOM_TRADES = '@pdex/get-custom-trades';

export function getTrades(limit, offset, hideSmallTrades, token, pair, failedTrades) {
  let url = failedTrades ? `${API.BASE_URL}/pdex/failed-trades?limit=${limit}&offset=${offset}` : `${API.BASE_URL}/pdex/trades?limit=${limit}&offset=${offset}`;
  if (hideSmallTrades) {
    url += '&hideSmallTrades=true';
  }
  if (token) {
    url += `&token=${token}`;
  }
  if (pair) {
    url += `&pair=${pair}`;
  }
  const request = axios.get(url);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_TRADES,
      payload: response.data
    }));
  };
}

export function getCustomTrades(limit, offset, hideSmallTrades, token, pair) {
  let url = `${API.BASE_URL}/pdex/trades-custom?limit=${limit}&offset=${offset}`;
  if (hideSmallTrades) {
    url += '&hideSmallTrades=true';
  }
  if (token) {
    url += `&token=${token}`;
  }
  if (pair) {
    url += `&pair=${pair}`;
  }

  const request = axios.get(url);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_CUSTOM_TRADES,
      payload: response.data
    }));
  };
}

export function getLastTrades() {
  const request = axios.get(`${API.BASE_URL}/pdex/trades?limit=8`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_LAST_TRADES,
      payload: response.data.result
    }));
  };
}

export function getTradesByPair(pair, limit, offset, hideSmallTrades) {
  const request = axios.get(`${API.BASE_URL}/pdex/trades?limit=${limit}&offset=${offset}&pair=${pair}&hideSmallTrades=${hideSmallTrades}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_TRADES_BY_PAIR,
      payload: { trades: response.data.result, count: response.data.count, pair }
    }));
  };
}

export function getCustomTradesByPair(pair, limit, offset, hideSmallTrades) {
  const request = axios.get(`${API.BASE_URL}/pdex/trades-custom?limit=${limit}&offset=${offset}&pair=${pair}&hideSmallTrades=${hideSmallTrades}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_CUSTOM_TRADES_BY_PAIR,
      payload: { trades: response.data.result, count: response.data.count, pair }
    }));
  };
}
