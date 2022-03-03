import axios from 'src/utils/axios';
import { API } from 'src/constants';

export const GET_SHIELDED_COINS_HISTORY = '@shielded-coins/get-history';
export const GET_LAST_SHIELDED_COINS_HISTORY = '@shielded-coins/get-last-history';
export const GET_LAST_SHIELDED_COINS_BY_TOKEN = '@shielded-coins/get-last-by-token';
export const GET_SHIELDED_COINS = '@shielded-coins/get-all';
export const GET_SHIELDED_COIN_EVOLUTION = '@shielded-coins/get-evolution';
export const GET_SHIELDED_COIN_USD_EVOLUTION = '@shielded-coins/get-usd-evolution';
export const GET_TOTAL_SHIELDED_COIN = '@shielded-coins/get-total';
export const GET_SHIELDED_COIN_OVERVIEW = '@shielded-coins/get-overview';


export function getShieldedCoinsHistory(limit, offset) {
  const request = axios.get(`${API.BASE_URL}/shielded-coins/history?limit=${limit}&offset=${offset}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_SHIELDED_COINS_HISTORY,
      payload: response.data
    }));
  };
}

export function getLastShieldedCoinsHistory() {
  const request = axios.get(`${API.BASE_URL}/shielded-coins/history?limit=8`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_LAST_SHIELDED_COINS_HISTORY,
      payload: response.data.result
    }));
  };
}

export function getLastShieldedCoinsByToken(token, limit, offset) {
  const request = axios.get(`${API.BASE_URL}/shielded-coins/history?limit=${limit}&offset=${offset}&token=${token}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_LAST_SHIELDED_COINS_BY_TOKEN,
      payload: { shieldedCoins: response.data.result, count: response.data.count, token }
    }));
  };
}

export function getShieldedCoins() {
  const request = axios.get(`${API.BASE_URL}/shielded-coins`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_SHIELDED_COINS,
      payload: response.data
    }));
  };
}

export function getShieldedCoinEvolution(token, start, end) {
  const request = axios.get(`${API.BASE_URL}/shielded-coins/evolution/${token}?start=${start}&end=${end}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_SHIELDED_COIN_EVOLUTION,
      payload: {
        token,
        evolution: response.data
      }
    }));
  };
}

export function getShieldedCoinUsdEvolution(token, start, end) {
  const request = axios.get(`${API.BASE_URL}/shielded-coins/usd-evolution/${token}?start=${start}&end=${end}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_SHIELDED_COIN_USD_EVOLUTION,
      payload: {
        token,
        evolution: response.data
      }
    }));
  };
}

export function getShieldedCoinOverview(token) {
  const request = axios.get(`${API.BASE_URL}/shielded-coins/overview/${token}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_SHIELDED_COIN_OVERVIEW,
      payload: {
        token,
        overview: response.data
      }
    }));
  };
}

export function getTotalShielded() {
  const request = axios.get(`${API.BASE_URL}/shielded-coins/total`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_TOTAL_SHIELDED_COIN,
      payload: response.data
    }));
  };
}
