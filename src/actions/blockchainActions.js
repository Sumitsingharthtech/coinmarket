import axios from 'src/utils/axios';
import { API } from 'src/constants';

export const GET_BLOCKCHAIN = '@blockchain/get-blockchain';
export const GET_BLOCKCHAIN_OVERVIEW = '@blockchain/get-overview';
export const GET_TOKENS = '@blockchain/get-tokens';
export const GET_CUSTOM_TOKENS = '@blockchain/get-custom-tokens';
export const GET_CUSTOM_TOKEN = '@blockchain/get-custom-token';

export function getBlockchain() {
  const request = axios.get(`${API.BASE_URL}/blockchain`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_BLOCKCHAIN,
      payload: response.data
    }));
  };
}

export function getBlockchainOverview() {
  const request = axios.get(`${API.BASE_URL}/blockchain/transactions-count`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_BLOCKCHAIN_OVERVIEW,
      payload: response.data
    }));
  };
}

export function getTokens() {
  const request = axios.get(`${API.BASE_URL}/blockchain/tokens`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_TOKENS,
      payload: response.data
    }));
  };
}

export function getCustomTokens() {
  const request = axios.get(`${API.BASE_URL}/blockchain/custom-tokens`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_CUSTOM_TOKENS,
      payload: response.data
    }));
  };
}

export function getCustomToken(tokenId) {
  const request = axios.get(`${API.BASE_URL}/blockchain/custom-tokens/${tokenId}`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_CUSTOM_TOKEN,
      payload: { id: tokenId, token: response.data }
    }));
  };
}
